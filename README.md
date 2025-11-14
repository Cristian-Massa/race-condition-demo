# Demo Técnica: Condición de Carrera

Este proyecto contiene una funcionalidad para **agregar y retirar fondos** de una cuenta bancaria placeholder. La función está diseñada para soportar **multi-threading** y manejar correctamente las condiciones de carrera.

### Comportamiento de la función
- La cuenta **no puede quedar con saldo negativo**.
- Las operaciones se gestionan mediante **versionado de datos**:
  - Si al obtener un documento se obtiene una versión y al actualizarla la versión ha cambiado, el proceso **se cancela**.
  - En caso de cancelación, se lanza un **custom exception handler** que activa una función utilitaria (`retry.ts`).
- La función de reintento (`retry.ts`) permite reintentar la actualización de datos.
  - Si se superan el número máximo de reintentos, se lanza un error indicando **demasiados intentos** y el proceso finaliza.

---

## Arquitectura del Proyecto

El proyecto está basado en **arquitectura por dominios**:

```
project-root/

├─ database/

│  └─ local.db

├─ drizzle/ # Archivos del ORM

├─ scripts/ # Seed de la base de datos

├─ src/

│  ├─ modules/

│  │  ├─ accounts/

│  │  │  ├─ exceptions/ # Capa de dominio

│  │  │  ├─ interfaces/ # Capa de presentación

│  │  │  ├─ repositories/ # Capa de persistencia

│  │  │  ├─ schemas/ # Capa de persistencia

│  │  │  └─ services/ # Lógica de dominio

│  │  ├─ database/

│  │  │  ├─ exceptions/

│  │  │  └─ db.ts

│  │  └─ shared/

│  │     ├─ interfaces/ # Interfaces compartidas

│  │     ├─ types/ # Tipos compartidos

│  │     └─ utils/ # Funciones utilitarias: retry, is-uuid, question

│  └─ main.ts

├─ .env

├─ .gitignore

└─ drizzle.config.ts # Configuración del ORM

```
---
## ⚙️ Configuración Inicial

**Crear el archivo de entorno**:
```bash
   .env
```
Configurar la variable de entorno DATABASE_URL apuntando a:

file:./database/local.db

Instalamos dependencias:

```
npm i
```

Generamos la base de datos:

```
generate:db
```

Ejecutar Drizzle para crear la base de datos y generar los clientes:

```bash
npx drizzle-kit push
npx drizzle-kit generate
```

### Antes de iniciar la app:
🚀 Probar el Proyecto
Crear una cuenta de prueba:

```
npm run seed:account
```

## Iniciar la aplicación:

```
npm start
```
### La aplicación solicitará los siguientes datos:

```
accountId

transaction type (deposit o withdraw)

amount
```
## ⚠️ Nota:
El flujo normal de la consola no generará condiciones de carrera, ya que los inputs se procesan secuencialmente.

## 🧪 Prueba de Concurrencia (Condición de Carrera)
Para simular múltiples transacciones simultáneas y activar el manejo de versiones:

```
Editar ./src/main.ts.

Comentar el bloque while principal.

Descomentar el bloque inferior que utiliza Promise.all.
```
- Esto permitirá ejecutar múltiples operaciones concurrentes sobre la misma cuenta, probando:

- Manejo de versionado de datos

- Reintentos automáticos (retry.ts)

- Evitar inconsistencias en el saldo de la cuenta



## ⚠️ Importante:
Es necesario tener instalado 
- Node js
- Npm
- Sqlite
