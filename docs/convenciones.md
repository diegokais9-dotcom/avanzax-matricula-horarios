# Convenciones del equipo

## Ramas
- `main`: versión estable. Solo recibe cambios por pull request desde `release/` o `hotfix/`.
- `develop`: integración. Recibe los pull requests de las ramas `feature/`.
- `feature/<nombre>`: una funcionalidad (por ejemplo `feature/calculo-pension`).
- `release/vX.Y`: congela una versión antes de cada apertura de ciclo.
- `hotfix/<nombre>`: corrección urgente creada desde `main`.

## Commits y títulos de pull request
Formato `tipo: descripción`, con tipo `feat`, `fix`, `docs`, `chore`, `test` o `refactor`.
Ejemplo: `feat: agregar validación de cruces de horario`.

## Reglas
- Todo cambio entra por pull request con al menos una revisión.
- El CI debe estar en verde antes de fusionar.
- Una versión estable se etiqueta con un tag (`v1.0`, `v1.0.1`).
