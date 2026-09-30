# TanStack Query Assignment

Part A (MCQs) is answered in answers.txt at the root of this repo.

Part B is the two hands-on exercises from the assignment's starter project (https://drive.google.com/file/d/1GjvpSiRzEJM_LYWDaZHNXMeyxfSouYmr), each its own small Vite app:

- exercise-1/ - Product Listing with Caching, Loading States, and Query Keys
- exercise-2/ - User Management with Mutations, Invalidation, and Optimistic Updates

The starter shipped as plain JavaScript with a single main.jsx TODO file per exercise. TypeScript was added on top (typescript, tsconfig, @types packages), and each exercise's logic is split into api/hooks/components files rather than left in one file. The provided index.html, package.json (dependencies), README.md and styles.css from the starter were kept and built against.

Each exercise has its own README with the requirements, verification steps, and implementation notes (which real API it hits, the SIMULATE_* flags for demoing error states, and the optimistic delete sequence).

## Running either exercise

cd into exercise-1 or exercise-2, npm install, then npm run dev. Open the React Query DevTools icon at the bottom of the page to inspect the query cache.
