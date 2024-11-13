from sqlmodel import Session, select
from datetime import datetime

from models.modelBO import Boletin


def subir_boletin(boletin: Boletin, session: Session):

    boletin.fecha=datetime.now()
    boletin.fechaPublicacion=datetime.now()

    session.add(boletin)
    session.commit()
    session.refresh(boletin)
    return boletin