from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import Annotated

from models.modelBO import Boletin
from config.db import engine
from queries.queryBO import subir_boletin, buscar_boletines

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

@routerBO.get("/buscar-tipo-publicacion/{tipoPublicacion}")
async def buscarTipoPublicacion(tipoPublicacion: str, session: SessionDep):
    busquedas= await buscar_boletines(session, tipoPublicacion)
    if not busquedas:
        raise HTTPException(status_code=404, detail="No se encontraron boletines")
    # listaBoletines=[]
    # for busqueda in busquedas:
    #     listaBoletines.append(busqueda.dict())
    return busquedas#listaBoletines