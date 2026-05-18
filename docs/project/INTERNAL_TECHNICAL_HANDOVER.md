# FBR Z E-Invoicing Portal - Internal Technical and Project Handover

Date: 18 May 2026

## 1. Executive Summary

FBR Z E-Invoicing Portal is a web-based digital invoicing system built for FBR invoice creation, validation, submission readiness, customer/product management, offline queue handling, and invoice PDF generation.

The project is currently deployed with:

- Frontend on Vercel
- Backend API on Render
- PostgreSQL database through Neon
- Source code hosted on GitHub

The application is currently suitable for demo, internal review, and live browser QA. Final production readiness depends on PRAL/FBR sandbox token validation, production token setup, and final client UAT.

## 2. Live Links

Frontend:

```text
https://fbr-einvoicing.vercel.app/
```

Backend API:

```text
https://fbr-einvoicing.onrender.com
```

Backend health check:

```text
https://fbr-einvoicing.onrender.com/health
```

Expected health response:

```json
{"ok":true,"service":"fbr-einvoicing-api"}
```

GitHub repository:

```text
https://github.com/hyperionml-nu/fbr-einvoicing
```

## 3. Demo Login

Current demo credentials:

```text
Email: admin@fbr.com
Password: admin123
```

Important: demo admin login is intended for staging/demo use only. Before production handover, real database-backed user management should be used and demo login should be disabled.

## 4. Technology Stack

Frontend:

- React
- Create React App build pipeline
- Custom CSS modules/pages
- Axios/fetch-based API service layer
- jsPDF-based invoice PDF generation

Backend:

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication

Deployment:

- Vercel for frontend hosting
- Render for backend hosting
- Neon PostgreSQL for database
- GitHub for source control and deployment source

## 5. Project Structure

Current high-level structure:

```text
fbr-z-einvoicing/
  apps/
    frontend/
    backend/
  packages/
    reference-api/
  README.md
  package.json
  render.yaml
```

Important application roots:

```text
Frontend: apps/frontend
Backend: apps/backend
Reference API package: packages/reference-api
```

## 6. Frontend Status

The frontend has been modernized and polished across the main application pages.

Completed frontend areas:

- Login page modernization and accessibility cleanup
- Dashboard modernization
- Sidebar/app shell refinement
- Add Invoice page modernization
- Invoice Registry responsive cleanup
- Upload Invoice page responsive cleanup
- Offline Queue responsive cleanup
- Invoice Preview responsive cleanup
- Products page modernization
- Customers page modernization
- Company Profile page modernization
- Settings page modernization
- Sandbox page modernization
- Services page modernization
- Staff page modernization
- Support page modernization
- Responsive QA pass across tablet and mobile views
- Dropdown containment fixes across updated pages
- PDF invoice alignment and Techionik branding fixes

Frontend deployment configuration:

```text
Vercel Root Directory: apps/frontend
Build Command: npm run build
Output Directory: build
Environment Variable: REACT_APP_API_BASE_URL=https://fbr-einvoicing.onrender.com
```

## 7. Backend Status

The backend has been hardened, organized, and deployed successfully.

Completed backend areas:

- Express API setup
- TypeScript build pipeline
- Prisma schema and migrations
- Neon/PostgreSQL integration
- JWT-based login
- Demo admin credential support
- Authentication middleware enforcement on business routes
- Company Profile APIs
- Customer APIs
- Product mapping APIs
- Invoice APIs
- Dashboard APIs
- Offline Queue APIs
- FBR Settings/Token APIs
- Sandbox scenario APIs
- Services APIs
- Staff APIs
- Swagger/API documentation route
- Render deployment setup
- Render health check verification

Backend deployment configuration:

```text
Render Root Directory: apps/backend
Build Command: npm install && npm run build
Start Command: npm run start
Health Check Path: /health
```

## 8. Security Notes

Completed security-related improvements:

- Removed frontend login bypass behavior
- Enforced authentication on protected business APIs
- Confirmed unauthenticated protected routes return authorization errors
- Kept `.env` files out of GitHub
- Used environment variables for deployment secrets
- FBR tokens are handled through backend settings and are not exposed as plaintext through public APIs

Production recommendations:

- Disable demo login before production release
- Replace demo admin credentials with real user accounts
- Rotate JWT and encryption secrets before final handover
- Review Render/Vercel project access permissions
- Enable proper role-based permissions if multiple user roles are required
- Keep FBR sandbox/production tokens only in secure backend environment settings

## 9. Environment Variables

Required backend environment variables:

```text
DATABASE_URL
JWT_SECRET
JWT_EXPIRES_IN
ADMIN_EMAIL
ADMIN_PASSWORD
ADMIN_FULL_NAME
ADMIN_WORKSPACE_NAME
ALLOW_DEV_ADMIN_LOGIN
FBR_BASE_URL
FBR_REFERENCE_API_TOKEN
FBR_REFERENCE_CACHE_TTL_SECONDS
FBR_REFERENCE_USE_MOCKS
FBR_ENVIRONMENT
FBR_SANDBOX_TOKEN
FBR_PRODUCTION_TOKEN
FBR_REFERENCE_INVOICE_LOOKUP_URL
FBR_SETTINGS_ENCRYPTION_KEY
FBR_OUTBOUND_IP
FBR_INVOICE_USE_MOCKS
```

Required frontend environment variable:

```text
REACT_APP_API_BASE_URL
```

Do not commit real environment values to GitHub.

## 10. FBR Integration Status

Current status:

- Mock mode is enabled for demo and development.
- Backend is prepared for FBR sandbox and production tokens.
- Sandbox scenario page exists for validation workflow.
- Settings page supports token/environment readiness display.
- Final live FBR validation depends on valid PRAL token and IP whitelisting.

Pending before production:

- Add real PRAL sandbox token.
- Disable mock mode when live testing starts.
- Verify all required sandbox scenarios.
- Confirm production token issuance process.
- Configure production token and switch environment only after approval.

## 11. Testing and QA Status

Completed checks:

- Backend production build passed.
- Frontend production build passed.
- Render backend deployment passed.
- Backend `/health` endpoint verified live.
- Live backend login verified through deployed Render API.
- Protected API smoke tests passed for:
  - Company Profile
  - Customers
  - Products
  - Dashboard Summary
  - Offline Queue Status
  - Settings/Token Status
- Frontend deployed successfully on Vercel.

Recommended next QA:

- Full live browser QA on the Vercel frontend.
- Login from deployed frontend.
- Dashboard API data load.
- Add Invoice seller autofill.
- Customer autocomplete.
- Product autocomplete.
- Invoice PDF download.
- Submit/queue behavior.
- Settings and Sandbox live readiness checks.

## 12. Known Limitations

- Mock mode is still enabled for FBR-related behavior.
- Real FBR sandbox token validation is pending.
- Production FBR submission is pending.
- Render free instance may sleep when inactive, causing first request delay.
- Final client UAT has not yet been completed.

## 13. Deployment Workflow

Recommended workflow:

1. Push changes to GitHub `main`.
2. Render auto-deploys backend changes from `apps/backend`.
3. Vercel auto-deploys frontend changes from `apps/frontend`.
4. Confirm backend health:

```text
https://fbr-einvoicing.onrender.com/health
```

5. Confirm frontend:

```text
https://fbr-einvoicing.vercel.app/
```

6. Run smoke tests after each production deployment.

## 14. Next Steps

Recommended next work:

1. Run full live frontend QA on deployed Vercel URL.
2. Verify Add Invoice flow against deployed backend.
3. Test invoice PDF download from live frontend.
4. Add real FBR sandbox token when available.
5. Run sandbox scenarios with live FBR settings.
6. Prepare client UAT checklist.
7. Disable demo login before production release.
8. Finalize production deployment checklist.

