# Examen_Distribuidas_2P

Plataforma de pagos distribuidos SecurePay — Bitácora de evaluación con evidencias de autenticación JWT RS256 y observabilidad con Sentry.

| Rama | Commit |
|------|--------|
| `feature/01-refactor-solid` | `refactor(solid): segregar logica del monolito e inyectar dependencias por constructor` |
| `feature/02-auth-jwt` | `feat(jwt): implementar firmado asimetrico rs256 y middleware de validacion autonoma public-key` |
| `feature/03-observabilidad` | `feat(sentry): instrumentar backend y separar manejo de excepciones logicas 401 de fallos operacionales 500` |

---

## Fase 2 — Autenticación JWT RS256

Generar Token
![alt text](image.png)


Acceso Valido
![alt text](image-1.png)


Token Expirado
![alt text](image-2.png)

Token Invalido
![alt text](image-3.png)

---

## Fase 3 — Observabilidad Sentry

Error 500
![alt text](image-4.png)

Dashboard Error Sentry
![alt text](image-5.png)

![alt text](image-6.png)

![alt text](image-7.png)

![alt text](image-8.png)

![alt text](image-9.png)