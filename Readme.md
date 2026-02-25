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
DB_NAME=tarea01Modulo07
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/tarea01Modulo07
EOF
```
4. Crear el servidor (server.js)


5. Crear archivos frontend
bash
```
cd ../frontend
# Crear finanzas.html y clientes.html con el contenido respectivo
```
6. Crear scripts SQL (opcional)
```
bash
cd ../sql
cat > finanzas.sql << 'EOF'
-- Script para crear y poblar finanzas_personales
CREATE TABLE IF NOT EXISTS finanzas_personales (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    monto NUMERIC(10,2) NOT NULL
);

INSERT INTO finanzas_personales (fecha, descripcion, categoria, monto) VALUES
('2025-01-15', 'Compra supermercado', 'Alimentación', 150.75),
('2025-01-16', 'Pago de luz', 'Servicios', 80.20),
('2025-01-17', 'Cena restaurante', 'Ocio', 45.90)
ON CONFLICT DO NOTHING;
EOF

cat > clientes.sql << 'EOF'
-- Script para crear y poblar clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_registro DATE DEFAULT CURRENT_DATE
);

INSERT INTO clientes (nombre, email, telefono) VALUES
('Juan Pérez', 'juan@example.com', '555-1234'),
('María Gómez', 'maria@example.com', '555-5678'),
('Carlos López', 'carlos@example.com', '555-9012')
ON CONFLICT (email) DO NOTHING;
EOF
```
## ⚙️ Instalación y configuración
Clona el repositorio

bash
```
git clone <url-del-repo>
cd proyecto
```
1. Configura la base de datos

2. Asegúrate de tener PostgreSQL instalado y corriendo.

3. Crea una base de datos (por ejemplo, tarea01Modulo07).

4. Ajusta el archivo backend/.env con tus credenciales.

5. Instala dependencias del backend

bash
cd backend
```
npm install
```
7. Inicia el servidor

bash
```
npm start
El servidor correrá en http://localhost:3000.
```
6. Poblar las tablas (si no existen)

Los endpoints (/finanzas y /clientes) crean las tablas automáticamente si no existen.

Si las tablas están vacías, se insertan datos de ejemplo al hacer la primera petición.

7. Abrir el frontend

8. Desde el explorador de archivos, abre frontend/finanzas.html y frontend/clientes.html. Deben mostrar los datos en formato tabla (finanzas) y tarjetas (clientes).

## 📡 Endpoints disponibles
Método	Ruta	Descripción
GET	/finanzas	Devuelve todos los registros de finanzas_personales (pool por configuración).
GET	/clientes	Devuelve todos los registros de clientes (pool por connection string).
🖼️ Capturas de pantalla
Las capturas de las vistas funcionando se encuentran en la carpeta screenshots.

## 📄 Licencia
Este proyecto es solo con fines educativos.
Autor | Jorge Bosch | Aprendiz Fullstack Javascript 2026
