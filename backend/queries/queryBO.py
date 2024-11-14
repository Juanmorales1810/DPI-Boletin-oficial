from sqlmodel import Session, select, extract
from datetime import datetime

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