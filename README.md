# LAURA MARTINEZ BODAS

## Desarrollo local (sin deploy)

Si ves este error:

```bash
npm error Missing script: "dev"
```

generalmente significa que `npm` se está ejecutando fuera de la carpeta del proyecto o que no se instalaron dependencias aún.

### Pasos correctos

1. Entra a la carpeta que contiene este `package.json`.
2. Instala dependencias.
3. Levanta el servidor de desarrollo.

```bash
cd "C:\Users\57318\Desktop\LANDIN PALMIRA\LAURA MARTINEZ BODAS"
npm install
npm run dev
```

Luego abre:

- http://localhost:3000

Next.js recarga cambios automáticamente al guardar archivos (hot reload).

### Verificación rápida

Para confirmar que estás en la carpeta correcta:

```bash
npm run
```

Deberías ver el script `dev` disponible.
