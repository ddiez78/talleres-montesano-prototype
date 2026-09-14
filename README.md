# Talleres Montesano — Prototipo web

Prototipo HTML/CSS/JS autocontenido, mobile-first (~375px). Copy cerrado + brandbook.

**Tagline:** Oficio de siempre. Taller de ahora.

## Cómo verlo

```bash
cd /workspace/montesano/prototype
python3 -m http.server 8080
# → http://localhost:8080
```

## Estructura

```
prototype/
├── index.html
├── styles.css
├── script.js
├── README.md
└── img/
    ├── hero-taller.png
    ├── servicio-mecanica.png
    ├── servicio-chapa-pintura.png
    ├── comodidad.png
    ├── fachada-nave.png
    └── logo/
        ├── logo-horizontal.svg   ← header
        ├── logo-horizontal.png
        ├── mark.svg              ← favicon
        └── mark.png
```

## Marca

| Token | Valor |
|-------|-------|
| Carbón | `#1A1F24` |
| Verde CTA | `#1FA87A` |
| Azul | `#0C4A7C` |
| Negro | `#121417` |
| Papel | `#F4F2EE` |
| Fuente | Manrope |

## Contacto

- Tel: 913 410 820 (`tel:+34913410820`)
- WhatsApp: https://wa.me/34614017148
- Email: talleresmonesano@hotmail.com
- C/ Puerto de San Glorio 29, 28919 Leganés

## Notas

- Formulario solo frontend; CTA «Enviar y pedir cita».
- Horario dentro de Sobre nosotros.
- Accesibilidad: skip link, labels, focus-visible, prefers-reduced-motion.
