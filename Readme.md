# Ejercicio Práctico — Node.js + `pg`: conexión por configuración y por connection string

Práctica del curso Fullstack JavaScript. Implementa un servidor en Node.js que se conecta a PostgreSQL mediante **dos enfoques distintos** usando el paquete `pg` con pool de conexiones, expone dos endpoints GET y presenta los datos en un frontend simple con Bootstrap.

---

## 📁 Estructura del proyecto

```
proyecto/
├── backend/
│   ├── server.js        ← servidor Express con ambos pools
│   ├── package.json
│   └── .env             ← credenciales de conexión (no subir a GitHub)
├── frontend/
│   ├── index.html       ← página principal (finanzas + clientes)
│   ├── finanzas.html    ← vista individual de finanzas (tabla)
│   ├── clientes.html    ← vista individual de clientes (lista)
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js      ← fetch a los dos endpoints
└── sql/
    ├── finanzas.sql     ← script INSERT para finanzas_personales
    └── clientes.sql     ← script INSERT para clientes
```

---

## ⚙️ Los dos enfoques de conexión

La tarea exige demostrar dos formas de conectarse a PostgreSQL con `pg`. Ambas usan **pool de conexiones** y conviven en el mismo `server.js`.

### Enfoque 1 — Pool por configuración de campos

Se pasan los datos de conexión como propiedades individuales del objeto. Usado en el endpoint `/finanzas`.

```js
const poolConfig = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
```

### Enfoque 2 — Pool por connection string

Se pasa una sola cadena de texto con toda la información de conexión en formato URI. Usado en el endpoint `/clientes`.

```js
const poolString = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

Ambas formas son equivalentes en resultado, pero la connection string es más compacta y habitual en entornos de despliegue (por ejemplo, en servicios cloud como Railway o Render).

---

## 📡 Endpoints disponibles

| Método | Ruta        | Pool usado            | Tabla consultada       | Respuesta                  |
|--------|-------------|-----------------------|------------------------|----------------------------|
| GET    | `/finanzas` | Por configuración     | `finanzas_personales`  | JSON, código `200` o `500` |
| GET    | `/clientes` | Por connection string | `clientes`             | JSON, código `200` o `500` |

Ambos endpoints:
- Crean la tabla automáticamente si no existe (`CREATE TABLE IF NOT EXISTS`).
- Insertan datos de ejemplo si la tabla está vacía.
- Responden con `Content-Type: application/json`.
- Aplican manejo de errores con `try/catch`.

---

## 🚀 Instalación y uso

### 1. Requisitos previos

- Node.js instalado (`node --version` para verificar)
- PostgreSQL corriendo localmente
- Base de datos `tarea01M07` creada

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

Esto instala Express, pg y dotenv según el `package.json`. La carpeta `node_modules` no está en el repositorio (está en `.gitignore`), pero `npm install` la recrea automáticamente.

### 3. Configurar el archivo `.env`

El archivo `backend/.env` debe tener este formato con tus credenciales reales:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=tarea01M07
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/tarea01M07
```

> ⚠️ No subas este archivo a GitHub. Ya está incluido en el `.gitignore`.

### 4. Iniciar el servidor

```bash
npm start
```

El servidor quedará disponible en `http://localhost:3000`.

### 5. Abrir el frontend

Abre directamente en el navegador los archivos HTML desde la carpeta `frontend/`:

- `frontend/index.html` → vista combinada con tabla de finanzas y tarjetas de clientes
- `frontend/finanzas.html` → vista individual de finanzas en formato tabla
- `frontend/clientes.html` → vista individual de clientes en formato lista

---

## 🗄️ Scripts SQL

Los archivos en `sql/` contienen los `INSERT` de datos de ejemplo. Los endpoints los ejecutan automáticamente, pero también puedes correrlos manualmente desde tu cliente SQL (por ejemplo, DBeaver o TablePlus) si necesitas poblar las tablas de forma independiente.

---

## 🖼️ Capturas de pantalla

Las capturas de las vistas funcionando se encuentran en la carpeta `screenshots/`.

---

## 📄 Notas

Proyecto con fines educativos — Módulo 7.
Autor Jorge Bosch | Aprendiz Fullstack JavaScript