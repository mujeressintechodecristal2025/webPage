# Fundación Mujeres sin Techo de Cristal

🌐 **Sitio web:** [www.fundacionmujeressintechodecristal.org](https://www.fundacionmujeressintechodecristal.org)

Plataforma web de la Fundación Mujeres sin Techo de Cristal — ONG colombiana dedicada al empoderamiento integral de mujeres en situación de vulnerabilidad en el Eje Cafetero.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite 5 |
| Estilos | Tailwind CSS 3.4 |
| Estado | TanStack Query |
| Forms | React Hook Form + Zod |
| SEO | react-helmet-async + JSON-LD Structured Data |
| Backend | Spring Boot 3.3 + Java 21 (Fase 2) |
| BD | PostgreSQL 16 + Redis 7 (Fase 2) |
| Deploy | GitHub Pages + GitHub Actions |
| Dominio | www.fundacionmujeressintechodecristal.org |

---

## Estructura del Proyecto

```
mstc-platform/
├── frontend/          ← React SPA (Fase 1 - En producción)
│   ├── src/
│   │   ├── features/public/
│   │   │   ├── components/sections/   ← Secciones del Home
│   │   │   ├── components/            ← Navbar, Footer, WhatsApp, etc.
│   │   │   ├── pages/                 ← HomePage, GaleriaPage, Transparencia, Privacidad
│   │   │   └── layouts/              ← PublicLayout
│   │   ├── shared/
│   │   │   ├── components/            ← SEO, Button, NotFoundPage
│   │   │   ├── config/assets.ts       ← Rutas centralizadas de imágenes
│   │   │   └── utils/                 ← cn (classnames)
│   │   ├── App.tsx                    ← Rutas + Code Splitting (lazy loading)
│   │   └── index.css                  ← Tailwind + utilidades custom
│   ├── public/
│   │   ├── images/                    ← Logo + galería organizada por categoría
│   │   │   ├── talleres/             ← 8 fotos programa Mujer Emprende
│   │   │   ├── capacitaciones/       ← 4 fotos capacitaciones psicosociales
│   │   │   ├── grupales/             ← 5 fotos beneficiarias y equipo
│   │   │   └── logo/                 ← Logo fundación
│   │   ├── documentos/               ← PDFs de transparencia (DIAN)
│   │   ├── robots.txt                ← Directivas para crawlers
│   │   └── sitemap.xml               ← Mapa del sitio para Google
│   └── index.html                     ← SEO completo + Open Graph + JSON-LD
├── backend/           ← Spring Boot (Fase 2 - En desarrollo)
├── infrastructure/    ← Docker Compose (PostgreSQL + Redis + MinIO)
└── .github/workflows/ ← CI/CD GitHub Actions
```

---

## Desarrollo Local

### Frontend
```bash
cd mstc-platform/frontend
npm install
npm run dev        # → http://localhost:3000
npm run build      # → dist/ (producción)
```

### Backend (Fase 2)
```bash
cd mstc-platform/infrastructure
docker compose up -d   # PostgreSQL + Redis + MinIO

cd ../backend
./gradlew bootRun
```

---

## Deploy

El sitio se despliega automáticamente con cada push a `main`:

1. GitHub Actions ejecuta `tsc && vite build`
2. Publica `dist/` en GitHub Pages
3. Disponible en www.fundacionmujeressintechodecristal.org

---

## Páginas del Sitio

| Ruta | Contenido |
|------|-----------|
| `/` | Home (Hero, Nosotros, Proyectos, Testimonios, Impacto, Cómo Ayudar, Contacto) |
| `/galeria` | Galería de fotos con filtros por categoría + lightbox |
| `/transparencia` | Documentos legales y financieros descargables |
| `/politica-de-privacidad` | Política de tratamiento de datos (Ley 1581/2012) |

---

## Funcionalidades Implementadas

- ✅ Diseño responsive (mobile-first)
- ✅ Formulario de contacto → envía por WhatsApp o Gmail directo (sin Formspree)
- ✅ Donaciones por Nequi (318 830 7155)
- ✅ Galería de fotos con tabs por categoría y lightbox
- ✅ Botón flotante de WhatsApp
- ✅ Botón sticky de donación
- ✅ SEO completo (meta tags por página, JSON-LD, Open Graph, sitemap)
- ✅ Code splitting / lazy loading por ruta
- ✅ Accesibilidad: skip-to-content, aria-labels, focus-visible, roles semánticos
- ✅ Paleta de colores magenta/púrpura cohesiva
- ✅ Sección de transparencia con PDFs reales de la DIAN

---

## Programas de la Fundación

| Programa | Descripción | Duración |
|----------|-------------|----------|
| Mujer Emprende | Diseño de modas, patronaje y confección | 3 meses |
| Capacitaciones Psicosociales | Salud mental, autoestima y habilidades socioemocionales | 3 meses |
| Estrategias para Emprendedores | Emprendimiento empresarial + estrategias psicosociales | Activo |

---

## Información de la Fundación

- **NIT:** 901.907.058-9
- **Representante legal:** Mónica Jhoana Ospina
- **Sede:** Campestre D los Olivos Mz 6 Cs 17 Piso 2, Dosquebradas, Risaralda
- **Cobertura:** Risaralda y Quindío
- **Correo:** mujeressintechodecristal2025@gmail.com
- **WhatsApp:** 318 830 7155 · 321 573 3425
- **Nequi (donaciones):** 318 830 7155
- **Facebook:** [Fundación MSTC](https://web.facebook.com/profile.php?id=61572277466220)
- **Fundada:** 2021

---

## Fases del Proyecto

- [x] **Fase 1:** Sitio institucional público (en producción)
- [ ] **Fase 2:** Blog + Donaciones en línea + Catálogo de emprendimientos
- [ ] **Fase 3:** Panel administrativo
- [ ] **Fase 4:** Perfiles de emprendedoras

---

## Desarrollador

**Cristian Camilo Romero Cárdenas**  
📧 ccrc83@gmail.com

---

## Licencia

© 2025–2026 Fundación Mujeres sin Techo de Cristal. Todos los derechos reservados.
