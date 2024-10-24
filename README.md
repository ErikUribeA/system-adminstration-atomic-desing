
# Proyecto de Administración de Vacantes y Compañías

Este proyecto es una plataforma administrativa para gestionar vacantes y compañías, desarrollado con **Next.js** y siguiendo la metodología de **Atomic Design**. Su objetivo es ofrecer una interfaz modular y escalable, manteniendo un código limpio y reutilizable.

## Estructura del Proyecto

La estructura sigue el enfoque de Atomic Design, organizando los componentes en átomos, moléculas, organismos y plantillas:

```
src/
│
├── app/
│   ├── layout.tsx       # Layout principal de la aplicación
│   ├── page.tsx         # Página principal de la aplicación
│   ├── providers.tsx    # Provider que envuelve el children
│   ├── registry.tsx     # Archivo para evitar que los estilos se carguen detrás
│   ├── style.sass       # Archivo de estilos
│
├── store/               # Lógica de estado usando Zustand
├── theme/               # Configuración de temas y colores
├── types/               # Definiciones de tipos TypeScript
│
├── ui/
│   ├── atoms/           # Componentes básicos e indivisibles
│   ├── forms/           # Formularios reutilizables
│   ├── molecules/       # Componentes formados por átomos
│   ├── organisms/       # Componentes complejos formados por moléculas
│   ├── templates/       # Plantillas de páginas o secciones
│   └── theme/           # Configuraciones de tema como colores y fuentes

```

## Tecnologías Utilizadas

- **Next.js 14**
- **React 18**
- **Sass** y **Styled-Components** para los estilos

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Funcionalidades

- **Panel de Administración**: Cambia entre la vista de vacantes y compañías.
- **Formularios Modales**: Para agregar y editar vacantes o compañías.
- **Listados**: Muestra tarjetas con detalles, y opciones para editar o eliminar.

