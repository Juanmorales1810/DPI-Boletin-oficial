from sqlmodel import Session, select, extract, or_
from datetime import datetime
from typing import Optional

from models.modelBO import Boletin


async def subir_boletin(boletin: Boletin, session: Session):

    boletin.fecha=datetime.now()
    boletin.fechaPublicacion=datetime.now()

    session.add(boletin)
    session.commit()
    session.refresh(boletin)
    return boletin

async def buscar_boletines(session: Session, tipoPublicacion: str):
    fechaHoy=datetime.now()
    if tipoPublicacion:
        query= session.exec(select(Boletin).where(Boletin.tipoPublicacion==tipoPublicacion).where(extract("day", Boletin.fechaPublicacion==fechaHoy.day))).all()
    else:
        query= session.exec(select(Boletin)).all()
    #en la linea de arriba use el where(extract) porque esa es la manera de acceder a una parte especifica de un tipo datetime en una consulta SQL. 
    return query 


async def buscar_mas_tipos(session: Session, tipoPublicacion: Optional[list[str]], nombre: Optional[str]= None, fechaInicio: Optional[str]= None):
    #fechaHoy = datetime.now()
    
    query= select(Boletin) #selecciona todos los boletines
    if tipoPublicacion or nombre or fechaInicio:
        if fechaInicio:
            fechaConvertida= datetime.strptime(fechaInicio, "%Y-%m-%d")
            query = query.where(extract("day", Boletin.fechaPublicacion) == fechaConvertida.day)
        if tipoPublicacion:
            query = query.where(Boletin.tipoPublicacion.in_(tipoPublicacion))
        if nombre:
            query = query.where(Boletin.nombre == nombre)
        result = session.exec(query).all()
    else:
        return []
    return result