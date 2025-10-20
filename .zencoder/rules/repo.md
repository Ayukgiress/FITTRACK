# Repository Overview

## Project Name
FITTRACK

## Description
A web-based fitness tracker application built with React and Vite. The project includes dashboards, activity tracking, charts, user authentication, and infrastructure-as-code (AWS CDK) deployment tooling.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Chart.js, Recharts, PrimeReact, Headless UI
- **State & Forms**: React Context, React Hook Form
- **Authentication**: Google OAuth via `@react-oauth/google`, custom auth components
- **Infrastructure**: AWS CDK (TypeScript), deployment to S3 via AWS CLI
- **Tooling**: ESLint, Jest (TS + JS), TypeScript definitions, PostCSS

## Directory Structure
- **/src**: React application source (pages, components, assets, utils)
- **/dist**: Production build output
- **/infra**: AWS CDK app (TypeScript) for infrastructure provisioning
- **/lib**, **/bin**, **/cdk.out**: Generated CDK files and artifacts
- **/constants.js**, **/tailwind.config.js**, **/postcss.config.js**: Frontend configuration files

## Key Files
- **src/App.jsx**: Main application component with routing and layout logic
- **src/Pages/Dashboard.jsx**: Fitness dashboard page
- **src/Component/***: Reusable UI components (charts, forms, navigation, etc.)
- **infra/lib/infra-stack.ts**: AWS CDK stack definition
- **package.json**: Project scripts and dependencies

## Scripts
1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`
3. **Build production bundle**: `npm run build`
4. **Preview production build**: `npm run preview`
5. **Run linting**: `npm run lint`
6. **Deploy static site**: `npm run deploy` (builds then syncs `dist/` to S3 bucket; requires AWS credentials/profile `rebase-student`)

## Testing
- Jest configuration present; no dedicated test scripts defined beyond default Jest setup in `infra/test` for CDK.

## Environment & Credentials
- `.env` file present (contents not inspected). Ensure appropriate environment variables (e.g., API keys, OAuth client IDs) are configured.
- AWS CLI profile `rebase-student` referenced for deployment.

## Additional Notes
- TODO list in `TODO.md` tracks pending tasks for NavBar visibility on auth pages.
- Ensure Vite development server runs on default port; adjust proxies/backends as needed.