# DPI-Boletin-oficial

Proyecto para el gobierno de San Juan para el manejo y gestión del boletín oficial de la provincia

## Monorepo con Backend y Frontend

Este repositorio contiene un proyecto con un backend en Python (usando FastAPI) y un frontend en React. Ambos pueden ser iniciados desde la carpeta raíz utilizando un solo comando.

## Tecnologías

-   Backend:
    -   Python (versión 3.7)
    -   FastAPI (versión 0.70.0)
    -   SQLite (versión 3.35.5)
    -   uvicorn (versión 0.15.0)
-   Frontend:
    -   [Next.js](https://nextjs.org/docs) (versión 15.0.2 )
    -   [React](https://19.react.dev/) (versión 19)
    -   [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) (versión 1.9.5)

## Estructura del Proyecto

```javascript
/
|-- backend/
| |-- main.py
| -- (otros archivos de backend)
|
|-- frontend/
| |-- package.json
| -- (otros archivos de frontend)
|
|-- .gitignore
|-- package.json
|-- README.md
```

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

-   Python (versión 3.7 o superior)
-   Node.js (versión 18 o superior)
-   npm (gestor de paquetes de Node.js)

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/Juanmorales1810/DPI-Boletin-oficial
    cd DPI-Boletin-oficial
    npm install
    ```

2. Instala las dependencias del frontend:

    ```bash
    cd frontend
    npm install
    ```

3. Crea y activa un entorno virtual para el backend, luego instala las dependencias:
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\Activate`
    pip install -r requirements.txt
    ```

## Inicialización

Para iniciar ambos servidores (backend y frontend) simultáneamente desde la carpeta raíz, ejecuta el siguiente comando:

```bash
npm start
```
