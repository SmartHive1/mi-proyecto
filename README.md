# Smart Hive

Sistema de monitoreo inteligente de colmenas para apicultura de precisión.

## Tecnologías

- **React 18** + **Vite** (sin TypeScript, todo en `.jsx`)
- **Tailwind CSS** para estilos
- **React Router DOM** para navegación
- **Recharts** para gráficos
- **Lucide React** para iconos

## Estructura del proyecto

```
smart-hive/
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Layout.jsx       # Contenedor principal con sidebar
│   │   │   │   └── Navbar.jsx       # Sidebar con navegación
│   │   │   ├── BeeIcon.jsx          # Ícono SVG compartido
│   │   │   └── RutaProtegida.jsx    # Guard de rutas privadas
│   │   ├── contexts/
│   │   │   └── UsuarioContext.jsx   # Estado global del usuario
│   │   ├── lib/
│   │   │   └── mockData.js          # Datos de ejemplo
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ColmenaresPage.jsx
│   │   │   ├── AnalisisPage.jsx
│   │   │   ├── PrediccionesPage.jsx
│   │   │   ├── NotificacionesPage.jsx
│   │   │   └── ConfiguracionPage.jsx
│   │   ├── App.jsx                  # Rutas principales
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Estilos globales + Tailwind
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── nginx.conf                       # Configuración para el servidor del profe
```

## Credenciales de prueba

- **Usuario:** admin@smarthive.com
- **Contraseña:** SmartHive2024

## Desarrollo local

```bash
cd frontend
npm install
npm run dev
```

## Build para producción

```bash
cd frontend
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos listos para NGINX.

## Deploy con NGINX

1. Ejecutar el build: `npm run build`
2. Copiar el contenido de `dist/` a `/var/www/smart-hive/dist/` en el servidor
3. Copiar `nginx.conf` a la configuración de NGINX (por ejemplo `/etc/nginx/sites-available/smart-hive`)
4. Activar el sitio y recargar NGINX:
   ```bash
   ln -s /etc/nginx/sites-available/smart-hive /etc/nginx/sites-enabled/
   nginx -t
   systemctl reload nginx
   ```

La aplicación quedará disponible en `http://app3.academia.ar`
