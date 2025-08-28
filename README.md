# Async Race - Test Task

**Deployed UI:** [https://async-race-vite-epam.vercel.app](https://async-race-vite-epam.vercel.app)  
**Score:** 400 / 400

---

## ✅ Checklist

### 🚀 UI Deployment
- [x] Deployment Platform: Successfully deployed on Vercel.

### ✅ Requirements to Commits and Repository
- [x] Commit guidelines compliance: All commits follow Conventional Commits format.
- [x] Checklist included in README.md.
- [x] Score calculation included in README.md.
- [x] Deployment link included.

---

### Basic Structure (80 points)
- [x] Two Views: "Garage" and "Winners" (10 pts)
- [x] Garage View Content (30 pts)
    - [x] Name of view
    - [x] Car creation and editing panel
    - [x] Race control panel
    - [x] Garage section
- [x] Winners View Content (10 pts)
    - [x] Name of view
    - [x] Winners table
    - [x] Pagination
- [x] Persistent State between views (30 pts)

---

### Garage View (90 points)
- [x] Car Creation and Editing Panel. CRUD Operations (20 pts)
    - [x] Create car
    - [x] Update car
    - [x] Delete car (also removed from winners)
- [x] Color Selection (10 pts)
- [x] Random Car Creation (20 pts)
    - [x] Button to create 100 random cars
    - [x] Random name and color generation
- [x] Car Management Buttons (10 pts)
- [x] Pagination (7 cars per page) (10 pts)
- [x] EXTRA: Empty Garage Handling (20 pts)
    - [x] Friendly message when garage empty
    - [x] Page reset when last car removed

---

### Winners View (50 points)
- [x] Display Winners Table (15 pts)
- [x] Pagination (10 pts, 10 winners per page)
- [x] Table columns: Car №, image, name, wins, best time (15 pts)
- [x] Sorting functionality by wins and best time (10 pts)

---

### 🚗 Race (170 points)
- [x] Start Engine Animation (20 pts)
- [x] Stop Engine Animation (20 pts)
- [x] Responsive Animation (30 pts, works on 500px screens)
- [x] Start Race Button (10 pts)
- [x] Reset Race Button (15 pts)
- [x] Winner Announcement (5 pts)
- [x] Button States (20 pts)
    - [x] Start engine disabled when driving
    - [x] Stop engine disabled when car at start
- [x] Actions during the race (50 pts)
    - [x] Deleting or editing car
    - [x] Changing page or view
    - [x] Adding new cars
    - [x] Proper handling of race state

---

### 🎨 Prettier and ESLint Configuration (10 points)
- [x] Prettier Setup (5 pts)
    - Scripts: `format`,`ci:format`,`lint`,`lint:fix`
- [x] ESLint Configuration (5 pts) 
      ⚠️ **Notes:** Some functions exceed the recommended 40 lines:
    - `CarSvg.tsx` → 163 lines
    - `BrokenCarSvg.tsx` → 95 lines
    - `CarItemContainer.tsx` → 113 lines / 44 lines (async)  
      These are acceptable for this task; functionality is correct.

---

### 🌟 Overall Code Quality (100 points)
- [x] Modular Design
- [x] Function Modularization (≤ 40 lines per function preferred)
- [x] Minimal code duplication and magic numbers
- [x] Clear variable and function names
- [x] Extra features (custom hooks, React Router, etc.)

---

## 🛠️ Technical Implementation
- CRUD operations for cars via server mock
- Fetch API usage for server communication
- TypeScript with strict type checking
- Responsive and adaptive UI animations
- SPA implementation with persistent state
- Pagination for Garage and Winners views
- Sorting for Winners table

