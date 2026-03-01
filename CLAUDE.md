# RIPS SaaS

## Overview
Multi-tenant SaaS platform for generating RIPS (Registros Individuales de Prestación de Servicios de Salud) for Colombian healthcare providers (IPS), compliant with Resolución 2275 de 2023.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Database**: PostgreSQL 16 (DigitalOcean) + Drizzle ORM
- **Auth**: NextAuth.js v5
- **Styling**: Tailwind CSS 4 (BRS design system - Inter font, blue primary palette)
- **Validation**: Zod
- **Icons**: Lucide React

## Project Structure
- `src/app/` - Next.js App Router pages and API routes
- `src/db/schema/` - Drizzle ORM table schemas
- `src/db/queries/` - Reusable query functions
- `src/lib/rips/` - RIPS generation engine (sections/, validators/, utils)
- `src/lib/validations/` - Zod schemas
- `src/components/` - React components (ui/, layout/, forms/, rips/, shared/)
- `src/actions/` - Server Actions
- `drizzle/` - Migrations and seed scripts

## Multi-tenancy
Shared schema with `tenant_id` column on all tenant-scoped tables. Reference data tables (DANE, CUPS, CIE-10) are global.

## Key Commands
- `npm run dev` - Development server
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed reference data (DANE, CUPS, CIE-10)

## Design System
Based on BRS project: Inter font, blue-600 primary, gray-50 background, navy (#0a2d4e) accent. Cards with rounded-2xl, shadow-sm. Buttons: btn-primary, btn-navy, btn-danger.
