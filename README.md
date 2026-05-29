# 🎮 Game Survey Campus

Aplicación móvil desarrollada con Ionic + Angular para realizar encuestas gamer dentro de un campus universitario.
El proyecto permite registrar preferencias de videojuegos, capturar evidencia fotográfica, obtener ubicación GPS, consumir APIs externas de videojuegos y visualizar estadísticas mediante un dashboard interactivo.

## 📱 Características principales

### ✅ Autenticación de usuarios

La aplicación implementa autenticación mediante Firebase Authentication utilizando:

* Registro de usuarios
* Inicio de sesión
* Cierre de sesión
* Acceso como invitado

#### Tecnologías usadas:

* Firebase Auth
* Ionic
* Angular

### 📝 Gestión de Encuestas

#### Los usuarios pueden:

* Crear encuestas
* Editar encuestas
* Visualizar detalles
* Explorar registros realizados

#### Cada encuesta almacena:

* Nombre o alias
* Edad aproximada
* Rol
* Videojuego favorito
* Plataforma
* Género favorito
* Comentario
* Fecha y hora
* Ubicación GPS
* Lugar del campus
* Evidencia fotográfica

### 📍 Ubicación GPS

La aplicación utiliza Capacitor Geolocation para registrar automáticamente:

* Latitud
* Longitud
* Fecha
* Hora

Además, el usuario puede seleccionar el lugar aproximado del campus:

* Biblioteca
* Cafetería
* Patio Central
* Laboratorio
* Entrada Principal

### 📷 Cámara y Galería

#### La aplicación permite:

* Tomar fotografías usando la cámara del dispositivo
* Seleccionar imágenes desde galería

Las imágenes se almacenan en Supabase Storage.

### 🎮 Consumo de API de Videojuegos

La aplicación consume la API externa RAWG para obtener información automática del videojuego ingresado.

#### Información obtenida:

* Nombre del juego
* Imagen de portada
* Género
* Plataforma
* Descripción
* Rating

La búsqueda se ejecuta automáticamente al ingresar el nombre del videojuego favorito.

#### API utilizada:

* RAWG API

### 📊 Dashboard Estadístico

La aplicación incluye un tablero de visualización con estadísticas en tiempo real.

Características:

* Total de encuestas
* Géneros favoritos
* Plataformas más utilizadas
* Visualización mediante gráficos

Tecnologías:

* Chart.js
* ng2-charts

### ☁️ Firebase Hosting

El proyecto puede desplegarse en Firebase Hosting para visualizar el dashboard y la aplicación desde navegador web.

### 🛠️ Tecnologías utilizadas

#### Frontend

* Ionic 8
* Angular 20
* TypeScript
* SCSS

#### Backend y servicios

* Firebase Authentication
* Firebase Hosting
* Supabase Database
* Supabase Storage

#### APIs y plugins

* RAWG API
* Capacitor Camera
* Capacitor Geolocation

#### Visualización

* Chart.js
* ng2-charts

### 📂 Estructura principal del proyecto

```bash
src/app/
│
├── pages/
│   ├── login/
│   ├── encuestas/
│   ├── encuesta-form/
│   ├── encuesta-detalle/
│   └── dashboard/
│
├── services/
│   ├── encuesta.service.ts
│   ├── firebase.ts
│   ├── api-juegos.ts
│   └── auth.service.ts
│
└── shared/
    └── app-icons.ts
```

## ⚙️ Instalación del proyecto

#### 1. Clonar repositorio

``` bash
git clone https://github.com/WilmerRamos21/Game-Survey-Campus.git
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Ejecutar aplicación
``` bash
ionic serve
```

## 📦 Dependencias principales

``` bash
npm install firebase
npm install @supabase/supabase-js
npm install chart.js ng2-charts
npm install @capacitor/camera
npm install @capacitor/geolocation
```

## 📱 Compilación Android
``` bash
ionic build
npx cap sync android
npx cap open android
```

## 🌐 Deploy en Firebase Hosting

#### Inicializar hosting
``` bash
firebase init hosting
```

#### Build del proyecto
``` bash
ionic build
```

#### Deploy
``` bash
firebase deploy
```

## 👨‍💻 Autores

Proyecto desarrollado como aplicación académica para encuestas gamer universitarias utilizando Ionic Framework.

## 🎯 Objetivo del proyecto

Desarrollar una aplicación híbrida multiplataforma que integre:

* autenticación,
* consumo de APIs,
* geolocalización,
* cámara,
* almacenamiento en la nube,
* dashboard estadístico,
* y despliegue web.

Todo utilizando tecnologías modernas de desarrollo móvil híbrido.
