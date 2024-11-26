from sqlmodel import SQLModel, create_engine
from dotenv import load_dotenv
import os

load_dotenv()
#DATABASE_URL = "sqlite:///database.db"
engine = create_engine(os.getenv("DATABASE_URL"), echo=True)



def init_db():
    SQLModel.metadata.create_all(engine)