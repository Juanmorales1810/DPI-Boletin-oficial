from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import Annotated

from models.modelBO import Boletin
from config.db import engine
from queries.queryBO import subir_boletin

routerBO = APIRouter(tags=["Operaciones Boletin Oficial"])


def get_session(): #get_session es una funcion que devuelve una sesion de la base de datos
    with Session(engine) as session:
        yield session 

SessionDep= Annotated[Session, Depends(get_session)] #SessionDep es un alias para Depends(get_session), donde Depends es una funcion de FastAPI que permite inyectar dependencias en las rutas


@routerBO.post("/crear-boletin")
def crearBoletin(boletin: Boletin, session: SessionDep):
    try:
        boletinRefrescado= subir_boletin(boletin, session)
    except Exception as e:
        session.rollback() #si ocurre un error, se deshacen los cambios
        raise HTTPException(status_code=400, detail="Error al subir el boletin")
    
    return boletinRefrescado
