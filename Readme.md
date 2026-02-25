# Node + PostgreSQL: Conexión por configuración y connection string

Este proyecto es una práctica del curso Fullstack JavaScript. Implementa un servidor en Node.js que se conecta a PostgreSQL mediante dos enfoques (configuración por campos y connection string) usando `pg` y pool de conexiones. Expone dos endpoints GET (`/finanzas` y `/clientes`) que devuelven datos de tablas, y un frontend simple con Bootstrap para visualizar la información.

## 📁 Estructura del proyecto
```
proyecto/
├── backend/
│ ├── server.js
│ ├── package.json
│ └── .env
├── frontend/
│ ├── finanzas.html
│ └── clientes.html
├── sql/
│ ├── finanzas.sql
│ └── clientes.sql
└── screenshots/
├── finanzas_vista.png
└── clientes_vista.png
```
text

## 🚀 Comandos utilizados para crear el proyecto desde la terminal

A continuación se muestran los comandos ejecutados para generar la estructura y archivos. (Ajusta las rutas según tu sistema.)

### 1. Crear carpetas principales

bash
```
mkdir -p proyecto/backend proyecto/frontend proyecto/sql proyecto/screenshots
```
cd proyecto
2. Inicializar backend e instalar dependencias
```
bash
cd backend
npm init -y
npm install express pg dotenv
```
3. Crear archivo de entorno (.env)
bash
```
cat > .env << 'EOF'
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
