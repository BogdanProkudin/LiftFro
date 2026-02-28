# CLAUDE.md — GymTrack Project Rules

## Project Overview

GymTrack — gym tracking web application (Next.js frontend + NestJS backend, 2 separate repos).
Two fullstack developers work in vertical slices. Each developer owns their feature end-to-end (API + UI).

---

## Architecture Rules

### Repository Structure

- **gymtrack-api**: NestJS + Prisma + Supabase (backend)
- **gymtrack-web**: Next.js 14 App Router + FSD + shadcn/ui (frontend)
- Types are auto-generated from Swagger via `orval` — never write API types manually

### Backend (gymtrack-api)

- **Framework**: NestJS with domain modules (`src/modules/<feature>/`)
- **Database**: Prisma ORM + Supabase (PostgreSQL)
- **Auth**: JWT (15min access + 7d refresh tokens), Passport strategies
- **Validation**: Zod schemas via `ZodValidationPipe`
- **Response shape**: All responses wrapped via `ResponseTransformInterceptor` → `{ data, meta }`

### Frontend (gymtrack-web)

- **Framework**: Next.js 14 with App Router
- **Architecture**: Feature-Sliced Design (FSD) — strict layer imports:
  ```
  app → pages → widgets → features → entities → shared
  ```
  A layer can only import from layers BELOW it. Never import UP.
- **State**: Zustand for client state, React Query (TanStack Query) for server state
- **Styling**: Tailwind CSS + shadcn/ui components (in `shared/ui/`)
- **Forms**: React Hook Form + Zod validation

---

## Code Standards

### TypeScript

- Strict mode enabled — no `any` types unless absolutely necessary and commented why
- Use `interface` for object shapes, `type` for unions/intersections
- All functions must have explicit return types (except React components and hooks)
- Use `unknown` instead of `any` for uncertain types, then narrow with type guards
- Prefer `const` over `let`, never use `var`
- Use optional chaining (`?.`) and nullish coalescing (`??`) — no manual null checks

### Naming Conventions

- **Files**: kebab-case (`workout-logger.tsx`, `create-workout.dto.ts`)
- **Components**: PascalCase (`WorkoutLogger`, `SetRow`)
- **Functions/variables**: camelCase (`getWorkouts`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_SETS_PER_EXERCISE`, `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`WorkoutSet`, `ExerciseFilter`)
- **Enums**: PascalCase name, UPPER_SNAKE_CASE values (`enum MuscleGroup { CHEST, BACK }`)
- **Database tables**: snake_case (Prisma `@@map`)
- **API endpoints**: kebab-case (`/user-exercises`, `/workout-templates`)
- **Boolean variables**: prefix with `is`, `has`, `can`, `should` (`isLoading`, `hasAccess`)

### Backend Specific

- Every controller method must have Swagger decorators (`@ApiOperation`, `@ApiResponse`, `@ApiParam`)
- Every DTO must use Zod schemas for validation
- Use `@CurrentUser()` decorator to get authenticated user — never access `req.user` directly
- All database queries via Prisma — no raw SQL unless justified in comment
- Service methods should be small and focused — extract to sub-services if >50 lines
- Always use transactions for multi-table writes (`prisma.$transaction()`)
- Error handling: throw NestJS `HttpException` subclasses, not generic `Error`
- Pagination: always cursor-based (not offset) for lists
- Sensitive data (passwords, tokens): never log, never return in responses

### Frontend Specific

- Components must be functional — no class components
- Use `'use client'` directive only when needed (state, effects, browser APIs)
- Server Components by default — push `'use client'` as deep as possible
- Max component file length: 200 lines — extract sub-components if longer
- Every page must have loading skeleton (`loading.tsx`) and error boundary (`error.tsx`)
- Images: always use `next/image` with explicit `width`/`height` or `fill`
- No inline styles — use Tailwind classes only
- Prefer `cn()` utility for conditional class merging (from `shared/lib/cn.ts`)
- Use React Query for all API calls — no `useEffect` + `fetch` patterns
- Mutations must use optimistic updates where appropriate (workout sets, likes)
- All user-facing text must be translatable (prepare for i18n — no hardcoded strings ineedback

6. **Naming**: Unclear variable/function names, inconsistent conventions
7. **Dead code**: Unused imports, unreachable branches, commented-out code
8. **Hardcoded values**: Magic numbers, strings that should be constants/env
9. **Missing Swagger**: New endpoints without `@Api*` decorators
10. **Missing loading/error states**: New pages without skeletons or boundaries
