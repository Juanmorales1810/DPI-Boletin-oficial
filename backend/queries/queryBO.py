from sqlmodel import Session, select, extract, or_
from datetime import datetime
from typing import Optional
from sqlalchemy.sql import func
from io import BytesIO
from xhtml2pdf import pisa
from fastapi import UploadFile
from pypdf import PdfReader
import os
from pathlib import Path
import bleach
import inspect #es para ver si una funcion es asincrona o no
from sqlalchemy import or_


from models.modelBO import Boletin, BoletinCreate
from config.constanteshtml import ALLOWED_ATTRIBUTES, ALLOWED_TAGS, css_sanitizer


async def subir_boletin(boletinData: BoletinCreate, session: Session):
    htmlSanitizado=bleach.clean(boletinData.contenido, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRIBUTES, css_sanitizer=css_sanitizer) #sanitizacion de html, se limpia el contenido de html para evitar ataques XSS

    boletin=Boletin(
        titulo=boletinData.titulo,
        descripcion=boletinData.descripcion,
        tipoPublicacion=boletinData.tipoPublicacion,
        tipoActividad=boletinData.tipoActividad,
        contenido=htmlSanitizado, #sanitizacion de html, se limpia el contenido de html para evitar ataques XSS
        precio=boletinData.precio,
        duracionPublicacion=boletinData.duracionPublicacion,
        fecha=datetime.now(),
        fechaPublicacion=datetime.now()
    )
    try: # el try lo pongo aca para envolver el codigo que interactua con la base de datos, por si hay un error, se deshacen los cambios
        session.add(boletin)
        session.commit()
        session.refresh(boletin)
    except Exception as e:
        session.rollback()
        raise e 

    return boletin


async def cargar_pdf(session:Session, archivo: BytesIO, boletin: Boletin):
    try:
        boletin.nombreArchivo=f"{boletin.id}_boletin.pdf" #.name es un atributo de BytesIO que devuelve el nombre del archivo por ejemplo, si el archivo es "hola.pdf", devuelve "hola.pdf" y es diferente a .filename solo porque no es una instancia de UploadFile
        boletin.pathArchivo=str(await crear_path(boletin.nombreArchivo))
        session.add(boletin)
        await session.commit()
        await session.refresh(boletin)
    except Exception as e:
        await session.rollback()
        raise e
    await crear_directorio(archivo, boletin.nombreArchivo)

    return boletin
    
    
async def extraer_texto_pdf(file: UploadFile):
    contenidoPDF=await file.read()
    pdf= PdfReader(BytesIO(contenidoPDF))#pdfReader es una funcion de PyPDF2 que permite leer un archivo PDF, en este caso, BytesIO(contenidoPDF) es un archivo PDF en memoria
    textoExtraido="" #inicializo la variable textoExtraido

    for page in pdf.pages:
        textoExtraido+= page.extract_text()
    
    contadorPalabras= len(textoExtraido.split()) #split es un metodo de Python que separa una cadena de texto en palabras, por defecto, separa por espacios
    await file.seek(0)

    return textoExtraido, contadorPalabras

async def calcular_pdf(contador:int):
    precio:float=0
    precio= contador*8

    return precio



def html_a_pdf(html: str) -> BytesIO:
    pdf = BytesIO()
    pisa_status = pisa.CreatePDF(html, dest=pdf)
    if pisa_status.err:
        raise ValueError("Error al generar el PDF.")
    pdf.seek(0)  # Mover el cursor al inicio del archivo en memoria
    return pdf


async def subir_archivo(session: Session, boletin: Boletin, archivo: UploadFile, contenido: str, precioFinal: float):
    boletin.fecha=datetime.now()
    boletin.fechaPublicacion=datetime.now()
    boletin.contenido=contenido
    boletin.precio=precioFinal
    try:
        session.add(boletin)
        await session.commit()
        await session.refresh(boletin)

        boletin.nombreArchivo=f"{boletin.id}_boletin.pdf"
        boletin.pathArchivo=str(await crear_path(boletin.nombreArchivo))
        session.add(boletin)
        await session.commit()
        await session.refresh(boletin)
    except Exception as e:
        await session.rollback()
        raise e
    return boletin


async def crear_path(nombreArch:str):
    rutaDirec= Path(os.getenv("RUTA_DIRECTORIO")) / "boletines"
    rutaArch= rutaDirec / nombreArch

    return rutaArch

async def crear_directorio(archivo, nombreArch:str):
    try:
        rutaDirec= Path(os.getenv("RUTA_DIRECTORIO")) / "boletines"
        rutaArch= rutaDirec / nombreArch
        
        rutaDirec.mkdir(parents=True, exist_ok=True)
            # Verificar si archivo.read() es una función asíncrona o síncrona
        read_method = archivo.read
        if inspect.iscoroutinefunction(read_method):
            content = await read_method()
        else:
            content = read_method()

        archivo.seek(0)
        with rutaArch.open("wb") as f:
            f.write(content)

        # with rutaArch.open("wb") as f:
        #     content= await archivo.read()
        #     # if isinstance(archivo, UploadFile):
        #     #     content= await archivo.read()
        #     # else:
        #     #     content= archivo.read()
        #     f.write(content)
        #archivo.file.seek(0)#seek es un metodo de Python que mueve el cursor al inicio del archivo, lo hice ya que al leer el archivo aca, luego quedaba inutilizable para la siguiente funcnion en el router

    except Exception as e:
        print(f"Error al crear el directorio: {e}")
        raise
    return rutaArch


async def buscar_boletin_por_id(session: Session, id: int):
    try:
        query=select(Boletin).where(Boletin.id==id)
        boletin= session.exec(query).first()

    except Exception as e:
        session.rollback()

    return boletin




async def buscar_mas_tipos(session: Session, tipoPublicacion: Optional[list[str]], tituloBO: Optional[str]= None, fechaInicio: Optional[str]= None, page: int=1, pageSize: int=10):
    try:
        query= select(Boletin) #selecciona todos los boletines
        if fechaInicio:
            fechaConvertida= datetime.strptime(fechaInicio, "%Y-%m-%d")
            inicioDia=fechaConvertida.replace(hour=0, minute=0, second=0, microsecond=0) # a la fecha convertida, se le asigna el horario de inicio de dia
            finDia=fechaConvertida.replace(hour=23, minute=59, second=59, microsecond=999999)# a la fecha convertida, se le asigna el horario de fin de dia
            query= query.where(Boletin.fechaPublicacion.between(inicioDia, finDia)) #selecciona los boletines que se publicaron entre el inicio y fin del dia. Between es un metodo de SQLModel que permite seleccionar los valores que estan entre dos valores, equivale a usar el operador >= y <=
        if tipoPublicacion:
            query = query.where(Boletin.tipoPublicacion.in_(tipoPublicacion)) #Como tipoPublicacion es una lista, el in_ lo uso para que se fije si el boletin de la base de datos esta en esa lista
        if tituloBO:
            query= query.where(or_(Boletin.titulo.like(f"%{tituloBO}%"), Boletin.contenido.like(f"%{tituloBO}%")))
            # query = query.where(Boletin.titulo.like(f"%{tituloBO}%")) # con el metodo like, puedo buscar parcialmente la palabra, por ejemplo de Juan, busco ju y me devuelve de la db quien se llame Juan
            # query= query.where(Boletin.contenido.like(f"%{tituloBO}%"))
        total_query = select(func.count()).select_from(query.subquery())  # func.count() es una funcion de SQL que cuenta el numero de filas que cumple con la condicion pero sin la paginacion. select_from es un metodo de SQLModel que selecciona las filas de una tabla, en este caso, de la subconsulta que se hace con query.subquery(), una subconsulta se hace para no afectar a la consulta principal
        total_result = await session.execute(total_query) #ejecuta la consulta y devuelve el resultado, en este caso, el numero de filas que cumple con la condicion y espera un unico resultado
        total= total_result.scalar_one()

        query = query.order_by(Boletin.fechaPublicacion.desc()) #ordena los boletines por fecha de publicacion de manera descendente
        query = query.offset((page - 1) * pageSize).limit(pageSize) # offset es un metodo de SQLModel que permite saltar un numero de filas y limit es un metodo de SQLModel que limita el numero de filas que se devuelven

        result = await session.execute(query) #ejecuta toda la consulta y devuelve una lista con los resultados? Si, gracias al .all()
        boletines= result.scalars().all()
        return boletines, total #result es del tipo list[Boletin] que es una lista de objetos de la clase Boletin
    except Exception as e:
        await session.rollback()
        raise e



# async def buscar_boletines(session: Session, tipoPublicacion: str):
#     fechaHoy=datetime.now()
#     try:
#         if tipoPublicacion:
#             query= session.exec(select(Boletin).where(Boletin.tipoPublicacion==tipoPublicacion).where(extract("day", Boletin.fechaPublicacion==fechaHoy.day))).all()
#         else:
#             query= session.exec(select(Boletin)).all()
#         #en la linea de arriba use el where(extract) porque esa es la manera de acceder a una parte especifica de un tipo datetime en una consulta SQL. 
#         return query 
#     except Exception as e:
#         session.rollback()
#         raise e
