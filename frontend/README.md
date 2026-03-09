# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Local Development with Backend

1. Start MongoDB (ensure it's running)
2. From `backend` folder, start the server:
   ```
   npm.cmd install
   npm.cmd start
   ```
   Backend runs on `http://localhost:5000` with CORS allowing:
   - `http://localhost:5173` (dev mode)
   - `http://localhost:4173` (preview mode)

3. In a new terminal, from `frontend` folder, start development:
   ```
   npm.cmd run dev
   ```
   Frontend runs on `http://localhost:5173`

4. Test with preview build (closest to production):
   ```
   npm.cmd run build
   npm.cmd run preview
   ```
   Opens on `http://localhost:4173` - still can access local backend via CORS

## Deploy Frontend to GitHub Pages

From `frontend` folder:
```
npm.cmd run deploy
```
This builds and pushes frontend to GitHub Pages at `https://sudheerimmidisetti.github.io/Project-Space`

**Note:** GitHub Pages frontend (HTTPS) cannot access local backend (HTTP) due to browser mixed-content policy. See "Production Deployment" below for full setup.

## Production Deployment (When Ready)

To deploy both frontend and backend to production services:

1. Deploy backend to a service (Render, Railway, DigitalOcean, etc.)
   - If using Render, deploy from repo root using `render.yaml`
   - Set environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `FRONTEND_URL=https://sudheerimmidisetti.github.io/Project-Space`
     - `ALLOWED_ORIGINS=https://sudheerimmidisetti.github.io`

2. From `frontend`, deploy with guarded production URL:
   ```
   npm.cmd run deploy:prod -- https://<your-backend-service>.onrender.com
   ```
   - Validates HTTPS and blocks localhost
   - Creates `.env.production` with your backend URL
   - Builds and pushes to GitHub Pages

This ensures your frontend always points to the correct backend URL.
