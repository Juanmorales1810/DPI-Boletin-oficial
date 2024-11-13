from sqlmodel import SQLModel, Field
from datetime import datetime, date
from pydantic import EmailStr

class Boletin(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    email: EmailStr
    fecha: datetime = None
    tipoPublicacion: str
    contenido:str
    precio: float
    duracionPublicacion: int
    nombre_archivo: str | None = None 
    path_archivo : str | None = None
    fechaPublicacion: datetime= None #este campo obtendra en que fecha sera publicado el boletin oficial