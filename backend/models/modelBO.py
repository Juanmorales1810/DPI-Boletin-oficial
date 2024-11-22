from sqlmodel import SQLModel, Field
from pydantic import BaseModel
from datetime import datetime
from pydantic import EmailStr

class Boletin(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    titulo: str = Field(index=True)
    descripcion: str
    tipoPublicacion: str = Field(index=True)
    tipoActividad: str
    contenido:str
    precio: float
    duracionPublicacion: int
    nombreArchivo: str | None 
    pathArchivo : str | None 
    fecha: datetime = None #este campo obtendra la fecha en la que se subio el boletin
    fechaPublicacion: datetime= Field(default=None, index=True) #este campo obtendra en que fecha sera publicado el boletin oficial

class BoletinCreate(BaseModel):
    titulo: str
    descripcion: str
    tipoPublicacion: str
    tipoActividad: str
    contenido: str
    precio: float
    duracionPublicacion: int