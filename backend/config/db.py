from sqlmodel import SQLModel, create_engine
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()
#DATABASE_URL = "sqlite:///database.db"
# engine = create_engine(os.getenv("DATABASE_URL"), echo=True)



# def init_db():
#     SQLModel.metadata.create_all(engine)

async_engine = create_async_engine(os.getenv("DATABASE_URL"), echo=True, future=True)
async_session = async_sessionmaker(bind=async_engine, expire_on_commit=False, class_=AsyncSession)

async def init_db():
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session():
    async with async_session() as session:
        yield session