from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from typing import Annotated, Optional

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

@routerBO.get("/buscar-tipo-publicacion")
async def buscarTipoPublicacion(session: SessionDep, tipoPublicacion: Optional[str]= None):
    busquedas= await buscar_boletines(session, tipoPublicacion)
    if not busquedas:
        raise HTTPException(status_code=204, detail="No se encontraron boletines")

    return busquedas#listaBoletines


@routerBO.get("/buscador-publicaciones")
async def obtenerMasDeUnTipoPublicacion(session: SessionDep, tipoPublicacion: list[str]=Query(None), nombre: Optional[str]=Query(None), fechaInicio: Optional[str]=Query(None)):
    busquedas= await buscar_mas_tipos(session, tipoPublicacion, nombre, fechaInicio)
    if not busquedas:
        raise HTTPException(status_code=404, detail="No se encontraron boletines")

    return busquedas