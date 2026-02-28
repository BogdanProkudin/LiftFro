# CLAUDE.md — GymTrack Frontend

## Project

GymTrack web client — gym tracking application.
Two fullstack developers work in vertical slices. Each developer owns their feature end-to-end.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Architecture**: Feature-Sliced Design (FSD)
- **UI**: Tailwind CSS + shadcn/ui
- **State**: Zustand (client), TanStack React Query (server)
- **Forms**: React Hook Form + Zod
- **Types**: Auto-generated from backend Swagger via `orval` (`src/generated/api-types.ts`)
- **Language**: TypeScript (strict mode)

---

## FSD Architecture — STRICT RULES

### Layer Hierarchy

```
app → pages → widgets → features → entities → shared
```

**A layer can ONLY import from layers BELOW it. Never import UP. This is the #1 rule.**

### Layer Responsibilities

| Layer       | Contains                                                                                | Can import from                            | Must NOT                                                        |
| ----------- | --------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- |
| `app/`      | Next.js routing, layouts, providers                                                     | pages, widgets, features, entities, shared | Contain business logic                                          |
| `pages/`    | Page composition (assembles widgets)                                                    | widgets, features, entities, shared        | Contain complex logic, only compose                             |
| `widgets/`  | Self-contained UI blocks (sidebar, workout-logger, calendar-view)                       | features, entities, shared                 | Import from other widgets or pages                              |
| `features/` | User actions = mutations (useCreateWorkout, useAddSet, StartButton)                     | entities, shared                           | Render complex UI, only action hooks + small trigger components |
| `entities/` | Business objects = GET queries + types + display components (ExerciseCard, WorkoutCard) | shared                                     | Contain mutations (POST/PATCH/DELETE)                           |
| `shared/`   | UI primitives (shadcn), utils, hooks, api-client, config, assets                        | nothing (bottom layer)                     | Contain any business logic                                      |

### Slice Structure

Every slice follows the same internal structure:

```
<layer>/<slice-name>/
├── ui/            # React components
├── model/         # Types, stores (Zustand), computed logic
├── api/           # API calls (entities only: GET queries)
└── index.ts       # Barrel export — public API of this slice
```

- Always import through `index.ts` — never reach into internal files
- `model/` in widgets can contain Zustand stores for local widget state
- `api/` in entities contains React Query hooks for GET requests

### Common Violations to Catch

- ❌ `widgets/sidebar` importing from `widgets/workout-logger` → widgets cannot import each other
- ❌ `entities/exercise/api/` containing `createExercise()` mutation → mutations belong in `features/`
- ❌ `shared/lib/` containing workout volume calculation → that's business logic, belongs in `entities/workout/model/`
- ❌ `features/workout/ui/` rendering a full complex form → extract to `widgets/`, feature should only export action hook + trigger button
- ❌ `app/(main)/dashboard/page.tsx` containing inline JSX with data fetching → import `DashboardPage` from `pages/dashboard/`
- ❌ Importing from `../../entities/exercise/model/exercise.types` → import from `@/entities/exercise`

---

## TypeScript Rules

- **Strict mode** — no exceptions
- **No `any`** — use `unknown` + type guards. If `any` is truly unavoidable, add `// eslint-disable-next-line` with a comment explaining why
- **`interface`** for object shapes, **`type`** for unions, intersections, mapped types
- **Explicit return types** on all functions except React components and hooks
- **`const` over `let`**, never `var`
- **Optional chaining** (`?.`) and **nullish coalescing** (`??`) — no manual `if (x !== null && x !== undefined)`
- **Exhaustive switches** — always handle all enum/union cases, use `never` for default
- **No non-null assertions** (`!`) unless justified with a comment
- **No type casting** (`as`) unless from `unknown` with prior validation
- API types come from `src/generated/api-types.ts` — never write API types manually, regenerate with `pnpm generate:api`

---

## Component Rules

- **Functional components only** — no class components
- **Server Components by default** — add `'use client'` only when needed (state, effects, event handlers, browser APIs)
- **Push `'use client'` as deep as possible** — wrap only the interactive part, not the whole page
- **Max 200 lines per component file** — extract sub-components if longer
- **Max 3 levels of JSX nesting** — extract to sub-component if deeper
- **No inline styles** — Tailwind classes only
- **Use `cn()`** from `shared/lib/cn.ts` for conditional classes (clsx + tailwind-merge)
- **No `index.tsx` for components** — name the file after the component: `workout-card.tsx` not `index.tsx`
- **Props interface** must be defined above the component, named `<ComponentName>Props`
- **Destructure props** in function signature
- **No `React.FC`** — use plain function declarations: `export function WorkoutCard({ workout }: WorkoutCardProps) {}`

---

## Data Fetching Rules

- **React Query for ALL API calls** — no `useEffect` + `fetch` patterns
- **Query keys**: use factory from `shared/config/query-keys.ts` — never hardcode strings
- **Mutations**: use `useMutation` from React Query, always in `features/` layer
- **Optimistic updates**: required for real-time-feeling interactions (adding sets, liking, toggling done)
- **Error handling**: every `useMutation` must have `onError` callback with toast notification
- **Loading states**: every page has `loading.tsx` (skeleton), every data component uses `isLoading` from query
- **Stale time**: set appropriate `staleTime` — exercise library (5min), dashboard (30s), active workout (0)
- **Prefetching**: use `prefetchQuery` in Server Components for initial page data
- **No waterfall requests** — use `useQueries` for parallel fetches, or prefetch in layout

---

## Styling Rules

- **Tailwind only** — no CSS modules, no styled-components, no inline `style={}`
- **shadcn/ui** components live in `shared/ui/` — import from `@/shared/ui/button` etc.
- **Design tokens** in `tailwind.config.ts` — colors, spacing, border-radius are configured there
- **Responsive**: mobile-first approach. Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- **Dark mode**: via CSS variables and `class` strategy — components must work in both themes
- **No magic color values** — use design tokens: `text-primary`, `bg-muted`, `border-border`
- **Touch targets**: minimum 44px on interactive elements (buttons, links, checkboxes)
- **Spacing consistency**: use Tailwind scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64) — no arbitrary values like `p-[13px]`

---

## Naming Conventions

- **Files**: `kebab-case.tsx` (`workout-logger.tsx`, `use-rest-timer.ts`, `exercise.types.ts`)
- **Components**: PascalCase (`WorkoutLogger`, `SetRow`, `ExerciseCard`)
- **Hooks**: camelCase with `use` prefix (`useRestTimer`, `useWorkoutStore`, `useDebounce`)
- **Functions/variables**: camelCase (`getWorkouts`, `isLoading`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_SETS`, `API_BASE_URL`, `QUERY_KEYS`)
- **Types/Interfaces**: PascalCase (`WorkoutSet`, `ExerciseFilter`, `DashboardSummary`)
- **Booleans**: prefix with `is`, `has`, `can`, `should` (`isOpen`, `hasAccess`, `canEdit`)
- **Event handlers**: `handle` prefix (`handleClick`, `handleSubmit`, `handleSetDone`)
- **Render helpers**: `render` prefix (`renderSetRow`, `renderEmptyState`)
- **Folders in FSD**: kebab-case matching the business domain (`workout-logger`, `exercise-picker`, `rest-timer`)

---

## Accessibility (a11y)

- **Semantic HTML**: `<button>` for actions, `<a>` for navigation, `<main>`, `<nav>`, `<section>`
- **No `<div>` as button** — if it's clickable, it must be `<button>` or `<a>`
- **All images**: `alt` text required (via `next/image`)
- **Form inputs**: always associated `<label>` (shadcn handles this, but verify custom inputs)
- **Focus management**: modals trap focus, dialog returns focus on close
- **Keyboard navigation**: all interactive elements reachable via Tab, Escape closes modals
- **Color contrast**: minimum 4.5:1 ratio for text
- **aria-labels**: on icon-only buttons, svg icons, and non-obvious interactive elements
- **Skip links**: main content skip link on every page

---

## Performance Rules

- **Lazy load** heavy components with `dynamic()` from Next.js (`const Chart = dynamic(() => import(...), { ssr: false })`)
- **Images**: always `next/image` with explicit dimensions or `fill`, prefer WebP
- **Bundle size**: no single chunk >200KB — monitor with `@next/bundle-analyzer`
- **No barrel file re-exports of entire libraries** — import specific functions: `import { format } from 'date-fns'` not `import * as dateFns`
- **Memoize** expensive computations with `useMemo`, expensive components with `React.memo` — but don't premature-optimize
- **Virtualize** long lists (>50 items) with `@tanstack/react-virtual`
- **Debounce** search inputs (300ms), resize handlers (150ms)
- **No layout shifts** — reserve space for dynamic content (skeletons, fixed heights)

---

## Security Rules

- **No `dangerouslySetInnerHTML`** unless content is sanitized with DOMPurify
- **No `eval()`**, `Function()` constructor, or dynamic `import()` with user input
- **Secrets**: never in client code — use `NEXT_PUBLIC_` only for non-sensitive values
- **XSS**: React escapes by default — never bypass JSX escaping
- **Auth tokens**: store in httpOnly cookies or in-memory (Zustand) — never localStorage
- **File uploads**: validate MIME type and size on frontend before sending
- **User input**: validate with Zod before submitting to API
- **External links**: add `rel="noopener noreferrer"` to `target="_blank"` links

---

## Git & PR Rules

### Branch Naming

```
feat/<slice-name>       — feat/workout-logger, feat/exercise-library
fix/<description>       — fix/rest-timer-overflow, fix/auth-redirect
refactor/<scope>        — refactor/exercise-entity, refactor/sidebar-widget
chore/<scope>           — chore/update-deps, chore/tailwind-config
```

### Commit Messages (Conventional Commits)

```
feat(workout): add set logging with optimistic UI
fix(auth): handle expired refresh token redirect
refactor(exercises): extract filter logic to custom hook
chore(deps): bump next to 15.x
test(programs): add e2e for quick-build flow
style(dashboard): fix stat card spacing on mobile
```

- Scope must match FSD slice or module name
- Lowercase, imperative mood, <72 chars
- Body: explain WHY, not WHAT

### PR Rules

- Title = Conventional Commits format
- Description: **What**, **Why**, **How**, **Screenshots** (for UI changes)
- Max 500 lines changed — split larger work
- Must pass CI (lint, type-check, build, tests)
- Self-review checklist:
  - [ ] No `console.log` left
  - [ ] No commented-out code
  - [ ] No `TODO` without issue link
  - [ ] New pages have `loading.tsx` + `error.tsx`
  - [ ] FSD imports go only downward
  - [ ] Responsive on 375px / 768px / 1024px / 1440px
  - [ ] Works in both light and dark mode
  - [ ] No hardcoded strings (i18n ready)

---

## Testing Rules

- **E2E**: Playwright for critical user journeys (auth, workout, programs)
- **Colocation**: test files in `__tests__/` next to source
- **Visual regression**: screenshot comparison for key pages
- **Accessibility**: axe-core automated checks in CI
- **No unit tests for simple components** — focus E2E on user flows
- **Every new page**: must be covered by at least one E2E scenario

---

## Review Priority (what to check first)

1. **FSD violations** — wrong layer imports, business logic in wrong layer
2. **Type safety** — `any`, missing types, unsafe casts
3. **Security** — XSS, token handling, user input validation
4. **Performance** — unnecessary re-renders, missing lazy loading, bundle size
5. **Accessibility** — missing aria-labels, keyboard nav, color contrast
6. **Data fetching** — missing error/loading states, waterfall requests, no optimistic updates
7. **Naming** — unclear names, convention violations
8. **Dead code** — unused imports, commented-out code, unreachable branches
9. **Responsive** — missing breakpoints, overflow, touch targets
10. **Dark mode** — hardcoded colors, missing CSS variable usage
