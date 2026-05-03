# Mi Portafolio

Portafolio web personal construido con **React + Vite + Tailwind CSS**.

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## 📦 Build para producción

```bash
npm run build
```

El output estará en la carpeta `dist/`.

## 🌐 Deploy en Netlify

1. Sube el repositorio a GitHub
2. Entra a [netlify.com](https://netlify.com) → "New site from Git"
3. Conecta tu repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. ¡Listo!

El archivo `netlify.toml` ya está configurado automáticamente.

## ✏️ Personalización

### Agregar tu información de contacto
Abre `src/components/Contact.jsx` y edita:
```js
const email = 'tu@email.com'
const whatsapp = 'https://wa.me/51XXXXXXXXX'
const github = 'https://github.com/tuusuario'
```

### Agregar proyectos
Abre `src/components/Projects.jsx` y agrega objetos al array `projects`.

### Cambiar el color acento
El color principal es `#00d4aa`. Para cambiarlo, busca ese valor en:
- `tailwind.config.js`
- `src/index.css`

## 🧩 Agregar componentes de 21st.dev

Este proyecto usa Tailwind CSS, así que es totalmente compatible con
componentes de [21st.dev](https://21st.dev).

1. Copia el componente desde 21st.dev
2. Pégalo en `src/components/`
3. Asegúrate de instalar sus dependencias si las requiere

## 📁 Estructura

```
mi-portafolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── netlify.toml
```
