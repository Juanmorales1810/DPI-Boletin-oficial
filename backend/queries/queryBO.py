from sqlmodel import Session, select, extract, or_
from datetime import datetime
from typing import Optional
from sqlalchemy.sql import func

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


async def buscar_mas_tipos(session: Session, tipoPublicacion: Optional[list[str]], nombreBO: Optional[str]= None, fechaInicio: Optional[str]= None, page: int=1, pageSize: int=10):
    query= select(Boletin) #selecciona todos los boletines
    if fechaInicio:
        fechaConvertida= datetime.strptime(fechaInicio, "%Y-%m-%d")
        inicioDia=fechaConvertida.replace(hour=0, minute=0, second=0, microsecond=0) # a la fecha convertida, se le asigna el horario de inicio de dia
        finDia=fechaConvertida.replace(hour=23, minute=59, second=59, microsecond=999999)# a la fecha convertida, se le asigna el horario de fin de dia
        query= query.where(Boletin.fechaPublicacion.between(inicioDia, finDia)) #selecciona los boletines que se publicaron entre el inicio y fin del dia. Between es un metodo de SQLModel que permite seleccionar los valores que estan entre dos valores, equivale a usar el operador >= y <=
    if tipoPublicacion:
        query = query.where(Boletin.tipoPublicacion.in_(tipoPublicacion))
    if nombreBO:
        query = query.where(Boletin.nombre.like(f"%{nombreBO}%")) # con el metodo like, puedo buscar parcialmente la palabra, por ejemplo de Juan, busco ju y me devuelve de la db quien se llame Juan

    total_query = select(func.count()).select_from(query.subquery())  # Contar total de resultados
    total = session.exec(total_query).one()
        
    query = query.order_by(Boletin.fechaPublicacion.desc()) #ordena los boletines por fecha de publicacion de manera descendente
    query = query.offset((page - 1) * pageSize).limit(pageSize)

    result = session.exec(query).all() #ejecuta toda la consulta y devuelve una lista con los resultados? Si, gracias al .all()
    
    return result, total #result es del tipo list[Boletin] que es una lista de objetos de la clase Boletin