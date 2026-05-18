# Vercel Frontend Deployment Handover

Project: FBR Z E-Invoicing Portal

GitHub repository:

```text
https://github.com/hyperionml-nu/fbr-einvoicing
```

Live backend API:

```text
https://fbr-einvoicing.onrender.com
```

Backend health check:

```text
https://fbr-einvoicing.onrender.com/health
```

Expected response:

```json
{"ok":true,"service":"fbr-einvoicing-api"}
```

## Vercel Project Setup

1. Open the Vercel dashboard.
2. Click **Add New** > **Project**.
3. Import the GitHub repository:

```text
hyperionml-nu/fbr-einvoicing
```

4. Configure the frontend project:

```text
Project Name: fbr-einvoicing-frontend
Framework Preset: Create React App
Root Directory: apps/frontend
Install Command: npm install
Build Command: npm run build
Output Directory: build
Production Branch: main
```

5. Add the environment variable:

```text
REACT_APP_API_BASE_URL=https://fbr-einvoicing.onrender.com
```

Add it for Production, Preview, and Development if Vercel shows environment checkboxes.

6. Click **Deploy**.

## Login For Demo Verification

```text
Email: admin@fbr.com
Password: admin123
```

## Post-Deployment Smoke Test

After Vercel deployment finishes, verify:

1. Login works with the demo admin credentials.
2. Dashboard loads without API errors.
3. Invoice Registry loads submitted invoices.
4. Add Invoice opens and seller details can load.
5. Customers and Products pages fetch backend data.
6. Settings page can read token/readiness status.
7. Offline Queue page loads queue status.
8. PDF download still works from invoice preview/list flow.

## Notes

- The frontend is a Create React App project, so frontend environment variables must start with `REACT_APP_`.
- The backend is already deployed on Render.
- The root page of the backend may show `Cannot GET /`; this is normal because the backend is an API service.
- Use `/health` to verify backend availability.
