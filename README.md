<div align="center">

# 🎬 MovieBox Stream — Frontend

<p align="center">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  </a>
  <a href="https://redux-toolkit.js.org/">
    <img src="https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux"/>
  </a>
  <a href="https://www.framer.com/motion/">
    <img src="https://img.shields.io/badge/Framer_Motion-12.x-EF0082?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
  </a>
  <a href="https://www.themoviedb.org/">
    <img src="https://img.shields.io/badge/Data-TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB"/>
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-F7DF1E?style=for-the-badge" alt="MIT"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=flat-square&logo=netlify" alt="Netlify"/>
  <img src="https://img.shields.io/badge/Auth-Google_OAuth-4285F4?style=flat-square&logo=google" alt="Google OAuth"/>
  <img src="https://img.shields.io/badge/Theme-Dark_%2F_Light-111111?style=flat-square" alt="Theme"/>
</p>

<br/>

**A modern, fully responsive cinema streaming frontend built with React 19 + Vite.**
Seamlessly integrated with TMDB for live movie & TV data, and powered by a custom
Node.js backend for authentication, favorites, and cloud avatar management.

<br/>

<p align="center">
  <a href="https://moviebox-stream.netlify.app">
    <img src="https://img.shields.io/badge/🚀 Live Demo-Visit Site-success?style=for-the-badge" alt="Live"/>
  </a>
  &nbsp;
  <a href="https://github.com/ABDUL-REHMAN392/moviebackend">
    <img src="https://img.shields.io/badge/🔗 Backend Repo-View API-blue?style=for-the-badge" alt="Backend"/>
  </a>
  &nbsp;
  <a href="https://github.com/ABDUL-REHMAN392/moviebackend/issues/new?labels=bug">
    <img src="https://img.shields.io/badge/🐛 Report Bug-Open Issue-red?style=for-the-badge" alt="Bug"/>
  </a>
</p>

</div>


## 📌 Table of Contents

- [Overview](#-overview)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Pages & Routes](#-pages--routes)
- [State Management](#-state-management)
- [Components](#-components)
- [Local Setup](#-local-setup)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)


## ✨ Overview

**MovieBox Stream Frontend** is the complete UI layer of a full-stack cinema platform. It delivers a fast, animated, and accessible experience — letting users browse trending content, watch trailers, manage their favorites, and customize their profiles. Built on React 19 with Vite for lightning-fast dev and production builds.

| ✅ Feature | Description |
|:--|:--|
| **Live TMDB Data** | Real-time trending, upcoming, and search results |
| **Auth Flow** | Email/password + Google OAuth 2.0 |
| **Favorites Engine** | Add, remove, and persist favorites via backend |
| **Dark / Light Theme** | Full theme toggle with persistent state |
| **Smooth Animations** | Framer Motion for transitions and micro-interactions |
| **Responsive Design** | Mobile-first layout with Tailwind CSS |
| **Protected Routes** | Private route guard for authenticated pages |
| **Session Handling** | Auto-logout banner on token expiry |


## 🏗️ Project Structure

All source code lives inside `src/` following a clean, feature-separated architecture.

```
moviebox/
│
├── public/
│   ├── _redirects                  # Netlify SPA routing fix
│
├── src/
│   ├── api/
│   │   └── axios.js                # Axios instance with interceptors
│   │
│   ├── component/
│   │   ├── Backdrop.jsx            # Full-screen hero backdrop
│   │   ├── Carousel.jsx            # Auto-sliding hero carousel
│   │   ├── Cast.jsx                # Cast grid for SinglePage
│   │   ├── Companies.jsx           # Production companies display
│   │   ├── DayWeekToggle.jsx       # Trending time window toggle
│   │   ├── ErrorMessage.jsx        # Reusable error UI
│   │   ├── FeedBack.jsx            # Feedback / contact section
│   │   ├── Footer.jsx              # Site footer
│   │   ├── Form.jsx                # Shared auth form wrapper
│   │   ├── Header.jsx              # Nav + auth dropdown + theme toggle
│   │   ├── LoginInterface.jsx      # Login modal
│   │   ├── MediaScroller.jsx       # Horizontal scrollable card row
│   │   ├── PosterInfo.jsx          # Movie/TV metadata + actions
│   │   ├── PrivateRoute.jsx        # Auth guard for protected pages
│   │   ├── Recommended.jsx         # Recommended media row
│   │   ├── ShowCard.jsx            # Individual media card
│   │   ├── ShowMenu.jsx            # Mobile navigation drawer
│   │   ├── SignupInterface.jsx     # Signup modal
│   │   ├── SkeletonSinglePage.jsx  # Loading skeleton for SinglePage
│   │   └── TrailerButton.jsx       # YouTube trailer launcher
│   │
│   ├── pages/
│   │   ├── AuthFailure.jsx         # OAuth failure redirect handler
│   │   ├── AuthSuccess.jsx         # OAuth success + token extractor
│   │   ├── Favorites.jsx           # Saved favorites page
│   │   ├── Home.jsx                # Main landing page
│   │   ├── NotFound.jsx            # 404 page
│   │   ├── PrivacyPolicy.jsx       # Privacy policy page
│   │   ├── Profile.jsx             # User profile management
│   │   ├── Search.jsx              # Search results page
│   │   └── SinglePage.jsx          # Movie / TV detail page
│   │
│   ├── redux/
│   │   ├── authSlice.js            # Auth state + async thunks
│   │   ├── conditionSlice.js       # UI state (theme, modals, menu)
│   │   └── favoritesSlice.js       # Favorites state + async thunks
│   │
│   ├── UI/
│   │   └── Layout.jsx              # Root layout with Header + Footer
│   │
│   ├── App.jsx                     # Router + session expiry banner
│   ├── main.jsx                    # React entry point + Redux Provider
│   ├── store.js                    # Redux store configuration
│   └── index.css                   # Global styles + Tailwind directives
│
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

### Component Hierarchy

```
App
 └── RouterProvider
      └── Layout (Header + Footer)
           ├── Home
           │    ├── Carousel
           │    ├── MediaScroller (Trending Movies)
           │    ├── MediaScroller (Trending TV)
           │    ├── MediaScroller (Upcoming)
           │    └── FeedBack
           │
           ├── SinglePage
           │    ├── Backdrop
           │    ├── PosterInfo
           │    ├── Cast
           │    ├── Companies
           │    └── Recommended
           │
           ├── Search
           ├── Favorites        ← PrivateRoute
           ├── Profile          ← PrivateRoute
           ├── AuthSuccess
           └── AuthFailure
```


## 🚀 Key Features

### 🎠 Hero Carousel

| Feature | Detail |
|:--|:--|
| Auto-Slide | Cycles through trending movies every few seconds |
| Backdrop Display | Full-screen TMDB backdrop images with smooth transitions |
| Trailer Launch | Inline YouTube trailer modal via TMDB video API |
| Skeleton Loading | Minimum 800ms skeleton to prevent layout flash |
| Genre Badges | Live genre mapping from TMDB genre IDs |

### 🔒 Authentication

| Feature | Detail |
|:--|:--|
| Local Auth | Email + password login/register via backend API |
| Google OAuth | One-click Google sign-in via Passport.js redirect flow |
| Token Storage | JWT stored in `localStorage` + sent via Axios interceptor |
| Session Expiry | Auto-logout + top banner notification on 401 response |
| Provider Guard | Login/signup modals hidden for OAuth users |

### ⭐ Favorites

| Feature | Detail |
|:--|:--|
| Add / Remove | Instant toggle with optimistic UI feedback |
| Persistent | Synced to backend MongoDB via REST API |
| Count Display | Live movie & TV show count in header/profile |
| Filtering | Filter favorites by `movie` or `tv` type |
| Private Route | Favorites page protected — redirects to login if unauthenticated |

### 🎨 Theming

| Feature | Detail |
|:--|:--|
| Dark / Light | Full toggle with distinct color palettes for each |
| Persistent State | Theme stored in Redux — survives navigation |
| Tailwind Classes | Conditional class switching via `darkTheme` selector |


## 🛠️ Tech Stack

| Layer | Technology | Version |
|:--|:--|:--|
| UI Library | React | 19.x |
| Build Tool | Vite | 7.x |
| Styling | Tailwind CSS | 4.x |
| State Management | Redux Toolkit + React Redux | 2.x / 9.x |
| Routing | React Router DOM | 7.x |
| Animations | Framer Motion | 12.x |
| HTTP Client | Axios | 1.x |
| Icons | React Icons | 5.x |
| Notifications | React Toastify | 11.x |
| Prop Validation | Prop Types | 15.x |
| Movie Data | TMDB API (v3 Read Token) | — |
| Linting | ESLint | 9.x |


## 📄 Pages & Routes

| Route | Page | Auth | Description |
|:--|:--|:--:|:--|
| `/` | `Home` | Public | Carousel + trending + upcoming sections |
| `/:type/:id` | `SinglePage` | Public | Movie/TV detail, cast, trailer, recommendations |
| `/search` | `Search` | Public | TMDB search results with live query |
| `/favorites` | `Favorites` | 🔒 | User's saved movies & TV shows |
| `/profile` | `Profile` | 🔒 | Edit profile, change avatar, delete account |
| `/auth/success` | `AuthSuccess` | Public | Google OAuth callback — extracts JWT from URL |
| `/auth/failure` | `AuthFailure` | Public | Google OAuth error fallback |
| `/privacy-policy` | `PrivacyPolicy` | Public | Privacy policy page |
| `/*` | `NotFound` | Public | 404 fallback page |


## 🗃️ State Management

The app uses **Redux Toolkit** with three slices:

### `authSlice`

```js
// State shape
{
  user: null | { name, email, profilePicture, authProvider, ... },
  isAuthenticated: false,
  loading: false,
  error: null
}

// Async Thunks
loginUser(credentials)       // POST /auth/login
registerUser(userData)        // POST /auth/register
fetchUserProfile()            // GET  /auth/profile
updateProfile(data)           // PUT  /auth/profile
uploadProfilePicture(file)    // PUT  /auth/profile-picture
removeProfilePicture()        // DELETE /auth/profile-picture
deleteAccount()               // DELETE /auth/account
logoutUser()                  // POST /auth/logout
```

### `favoritesSlice`

```js
// State shape
{
  items: [],          // Array of favorite media objects
  loading: false,
  error: null,
  counts: { movies: 0, tvShows: 0, total: 0 }
}

// Async Thunks
fetchFavorites()                          // GET /favorites
addFavorite({ tmdbId, mediaType })        // POST /favorites/add
removeFavorite({ tmdbId, mediaType })     // DELETE /favorites/remove/:tmdbId/:mediaType
clearAllFavorites()                       // DELETE /favorites/clear
```

### `conditionSlice`

```js
// State shape
{
  darkTheme: true,       // Global theme toggle
  Menu: false,           // Mobile nav drawer visibility
  showLogin: false,      // Login modal visibility
  showSignup: false      // Signup modal visibility
}

// Synchronous Actions
toggleTheme()
displayMenu()
showLogin() / hideLogin()
showSignup() / hideSignup()
```


## 🧩 Components

| Component | Purpose |
|:--|:--|
| `Header` | Sticky nav with auth dropdown, favorites count, theme toggle, mobile menu |
| `Carousel` | Auto-sliding backdrop hero with skeleton, trailer modal, genre/rating badges |
| `MediaScroller` | Horizontal scrollable row of `ShowCard` items, fetches from TMDB |
| `ShowCard` | Individual movie/TV card with hover overlay and poster image |
| `DayWeekToggle` | Pill-style toggle to switch trending time window (day / week) |
| `SinglePage` | Full detail view: backdrop, poster, overview, cast, trailer, recommendations |
| `Backdrop` | Full-width hero backdrop image with gradient overlay |
| `PosterInfo` | Poster + metadata: rating, genres, runtime, overview, favorite/trailer actions |
| `Cast` | Horizontally scrollable cast member grid |
| `Recommended` | "More Like This" row fetched from TMDB recommendations endpoint |
| `TrailerButton` | Launches YouTube iframe modal from TMDB video data |
| `SkeletonSinglePage` | Animated loading placeholder for SinglePage |
| `LoginInterface` | Email/password login form + Google OAuth button |
| `SignupInterface` | Registration form with validation |
| `Form` | Shared form wrapper used by Login and Signup |
| `PrivateRoute` | Redirects unauthenticated users to home with login prompt |
| `ShowMenu` | Slide-in mobile navigation drawer |
| `FeedBack` | Contact / feedback section in Home |
| `Footer` | Site footer with links |
| `ErrorMessage` | Reusable error state UI component |
| `Companies` | Production company logos/names from TMDB |


## ⚙️ Local Setup

### Prerequisites

| Requirement | Link |
|:--|:--|
| Node.js v18+ | [nodejs.org](https://nodejs.org/) |
| TMDB Read Access Token | [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) |
| MovieBox Backend running | [Backend Repo](https://github.com/ABDUL-REHMAN392/moviebackend) |

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/ABDUL-REHMAN392/MovieBox.git
cd MovieBox

# 2. Install dependencies
npm install

# 3. Create and fill .env (see below)

# 4. Start dev server
npm run dev
```

Dev server output:
```
  VITE v7.x  ready in ~300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Build for Production

```bash
npm run build
# Output goes to /dist — deploy to Netlify, Vercel, etc.
```


## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# TMDB API — use Read Access Token (Bearer), NOT the v3 API key
VITE_TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9...your_tmdb_read_access_token

# Backend API base URL
VITE_API_BASE_URL=http://localhost:8080/api
```

 ⚠️ All Vite env vars must be prefixed with `VITE_` to be accessible in the browser.

 ⚠️ The `VITE_TMDB_TOKEN` should be your **Read Access Token** (long Bearer string), not the short v3 API key.


## 🌐 Deployment

### Netlify (Recommended)

| Field | Value |
|:--|:--|
| Build Command | `npm run build` |
| Publish Directory | `dist` |
| Node Version | `18` |

**Required:** Add a `public/_redirects` file to support React Router:

```
/*    /index.html   200
```

 This file is already included in the repo. Add all `VITE_*` variables in the **Environment Variables** section of Netlify's site settings.

### Vercel

```bash
vercel --prod
```

 Set `VITE_TMDB_TOKEN` and `VITE_API_BASE_URL` in the Vercel dashboard under **Project Settings → Environment Variables**.


## 🗺️ Roadmap

```
✅ Phase 1 — Core (Done)
   ├─ Hero carousel with trailers
   ├─ Trending / upcoming media sections
   ├─ Movie & TV detail pages
   ├─ Search functionality
   ├─ Auth modals (login / signup)
   ├─ Google OAuth flow
   ├─ Favorites with backend sync
   ├─ Profile management + avatar upload
   └─ Dark / light theme

🔄 Phase 2 — In Progress
   ├─ Skeleton loaders for all sections
   ├─ Improved error boundaries
   └─ Accessibility improvements (ARIA, keyboard nav)

📅 Phase 3 — Planned
   ├─ Watchlist feature
   ├─ User reviews & star ratings
   ├─ Infinite scroll for search results
   └─ Advanced filters (genre, year, rating)

🔮 Phase 4 — Future
   ├─ Social features (following, activity feed)
   ├─ Recommendation engine (ML-based)
   ├─ PWA support (offline mode)
   └─ Unit & integration tests (Vitest + Testing Library)
```


## 🤝 Contributing

Contributions are welcome!

```bash
# Fork → Clone → Branch → Commit → PR

git checkout -b feature/your-feature
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

**Commit convention:**
```
feat:     New feature
fix:      Bug fix
docs:     Documentation
refactor: Code restructuring
style:    UI / styling changes
test:     Tests
chore:    Build/config changes
```


## 👨‍💻 Author

<div align="center">

### Abdulrehman
*Full Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-ABDUL--REHMAN392-181717?style=for-the-badge&logo=github)](https://github.com/ABDUL-REHMAN392)
[![Gmail](https://img.shields.io/badge/Gmail-abdulrehmanrafique01@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abdulrehmanrafique01@gmail.com)

*Agar ye project helpful laga, please ⭐ zaroor do!*

**© 2024 Abdulrehman**

</div>
