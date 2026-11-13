# Portafolio de Marion Zuloaga

Portafolio full stack desarrollado con Angular, TypeScript, Tailwind CSS, Sass,
NestJS y PostgreSQL.

## Requisitos

- Node.js 18 o superior
- npm
- Docker (recomendado para PostgreSQL)

## Inicio local

```bash
npm run install:all
docker compose up -d
cp backend/.env.example backend/.env
```

En dos terminales:

```bash
npm run dev:backend
npm run dev:frontend
```

La web estará disponible en `http://localhost:4200` y la API en
`http://localhost:3000/api`.

## Configuración pendiente

- Revisar fechas, formación y descripciones antes de publicar.
- Configurar las variables de entorno de producción y desactivar
  `synchronize` mediante `NODE_ENV=production`.
