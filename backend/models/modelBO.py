from sqlmodel import SQLModel, Field
from datetime import datetime
from pydantic import EmailStr

class Boletin(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str = Field(index=True)
    email: EmailStr
    fecha: datetime = None
    tipoPublicacion: str = Field(index=True)
    contenido:str
    precio: float
    duracionPublicacion: int
    nombreArchivo: str | None 
    pathArchivo : str | None 
    fechaPublicacion: datetime= Field(default=None, index=True) #este campo obtendra en que fecha sera publicado el boletin oficial