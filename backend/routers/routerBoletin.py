from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Form
from fastapi.responses import JSONResponse, Response
from sqlmodel import Session
from typing import Annotated, Optional
from pathlib import Path
from pypdf import PdfReader

from models.modelBO import Boletin
from config.db import engine
from queries.queryBO import *

routerBO = APIRouter(tags=["Operaciones Boletin Oficial"])


def get_session(): #get_session es una funcion que devuelve una sesion de la base de datos
    with Session(engine) as session:
        yield session 

SessionDep= Annotated[Session, Depends(get_session)] #SessionDep es un alias para Depends(get_session), donde Depends es una funcion de FastAPI que permite inyectar dependencias en las rutas


@routerBO.post("/crear-boletin")
async def crearBoletin(boletin: Boletin, session: SessionDep):
    try:
        boletinRefrescado= await subir_boletin(boletin, session)
    except Exception as e:
        session.rollback() #si ocurre un error, se deshacen los cambios
        raise HTTPException(status_code=400, detail=e)
    
    return boletinRefrescado

@routerBO.get("/buscador-publicaciones")
async def obtenerMasDeUnTipoPublicacion(session: SessionDep, tipoPublicacion: list[str]=Query(None), titulo: Optional[str]=Query(None), fechaInicio: Optional[str]=Query(None), page: int=Query(1, ge=1), pageSize: int=Query(10, ge=1, le=15)):
    busquedas, total= await buscar_mas_tipos(session, tipoPublicacion, titulo, fechaInicio, page, pageSize)
    if not busquedas:
        raise HTTPException(status_code=404, detail="No se encontraron boletines")
    #total= len(busquedas)
    return {"boletines": busquedas, "contador": total}


@routerBO.post("/descargar-pdf/")
async def descargar_pdf(html: str):
    try:
        pdf = html_a_pdf(html)
        headers = {
            "Content-Disposition": "attachment; filename=boletin_oficial.pdf"
        } #Content-Disposition es una cabecera HTTP que indica si el contenido debe ser mostrado en el navegador o descargado como un archivo adjunto
        return Response(content=pdf.read(), media_type="application/pdf", headers=headers) #Response es una clase de FastAPI que permite devolver una respuesta HTTP personalizada, el content tiene el contenido del archivo, media_type es el tipo de archivo y headers son las cabeceras HTTP
    except Exception as e:
        return {"error": str(e)}
    

@routerBO.post("/subir-archivo-boletin")
async def subirArchivoBoletin(session: SessionDep, nombre:str = Form(...), email:str=Form(...), tipoPublicacion: str=Form(...),file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")
    
    rutaDirec= Path("archivos") / "boletines"
    rutaArch= rutaDirec / file.filename

    if rutaArch.exists():
        raise HTTPException(status_code=400, detail="El archivo ya existe")
    
    rutaDirec.mkdir(parents=True, exist_ok=True)

    archivo={
        "nombre": file.filename,
        "path": rutaArch
    }
    boletin=Boletin(nombre=nombre, email=email, contenido="", tipoPublicacion=tipoPublicacion, precio=0, duracionPublicacion=0, nombreArchivo="", pathArchivo="") #por el momento precio esta en 0 ya que eso lo tengo que calcular luego
    textoExtraido, contador= await extraer_texto_pdf(file)
    precioFinal= await calcular_pdf(contador)
    boletinRefrescado= await subir_archivo(session, boletin, archivo, textoExtraido, precioFinal)

    return boletinRefrescado


@routerBO.post("/calcular-precio-pdf")
async def calcularPrecioPDF(file: UploadFile=File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")
    
    textoExtraido, contador= await extraer_texto_pdf(file)

    precioFinal= await calcular_pdf(contador)

    return {"textoExtraido": textoExtraido, "contadorPalabras": contador, "precioFinal": precioFinal}







# @routerBO.get("/buscar-tipo-publicacion")
# async def buscarTipoPublicacion(session: SessionDep, tipoPublicacion: Optional[str]= None):
#     busquedas= await buscar_boletines(session, tipoPublicacion)
#     if not busquedas:
#         raise HTTPException(status_code=204, detail="No se encontraron boletines")

#     return busquedas#listaBoletines

