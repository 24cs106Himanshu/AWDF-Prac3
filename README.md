# CHARUSAT ITUE301 — Practical 3: API Integration and Data Rendering in React

**Student Roll Number:** 24CS106  
**Course:** Advanced Web Development Frameworks (ITUE301)  
**Subject:** Practical 3 — API Integration and Data Rendering in React  

---

## 📌 Practical Overview

This project extends the Student Portfolio application (Practicals 1 & 2) by integrating the external **GitHub REST API** to dynamically fetch, manage, filter, and render real-world public repository data.

### Key Implemented Features:
1. **GitHub REST API Integration:**
   - Endpoint: `https://api.github.com/users/USERNAME/repos?sort=updated&per_page=30`
   - Configurable username constant (`DEFAULT_GITHUB_USERNAME = "24cs106Himanshu"`) with an interactive on-page username switcher.
   - Built using standard native `fetch` with an `AbortController` cleanup in `useEffect` to prevent memory leaks and unmounted component updates.
2. **Asynchronous Lifecycle State Management (`useState` & `useEffect`):**
   - `repos`: stores fetched repository objects (initial: `[]`).
   - `isLoading`: tracks loading state (initial: `true`).
   - `error`: captures error message string or `null`.
   - `searchTerm`: tracks search query for real-time client-side filtering without redundant network requests.
   - `retryKey`: triggers immediate re-fetching when clicking Retry.
3. **Loading Component (`Spinner.jsx`):**
   - Accessible animated CSS spinner with `role="status"` and `aria-live="polite"`.
   - Displays clear progress feedback and cleanly terminates upon completion or error.
4. **Error Handling Component (`ErrorMessage.jsx`):**
   - Explicit handling for non-200 HTTP statuses (such as HTTP 404 user not found or HTTP 403 rate limit).
   - Validation against malformed or unexpected data structures.
   - Includes an interactive **🔄 Retry Request** button that resets states and re-executes the API call.
5. **Dynamic Repository Rendering (`RepoList.jsx`):**
   - Dynamically mapped using `.map()` with unique `repo.id` keys.
   - Displays:
     - Repository name linked to official GitHub URL (`target="_blank" rel="noopener noreferrer"`).
     - Star count (⭐ `stargazers_count`).
     - Description with fallback.
     - Language badge with color indicator.
     - Fork count and last updated date.
   - Graceful empty list handling when no repositories exist or match filters.
6. **Client-side Search Filtering:**
   - Controlled search input performing case-insensitive matching across repository names.
   - Pure client-side filtering without firing HTTP requests on every keystroke.
   - Displays instant summary count and clear "no results found" messaging.
7. **Single-Page Architecture & Route Preservation:**
   - Preserves `/` (Home), `/projects` (Projects API showcase), and `/contact` (Contact Form) routes without page reload.
   - Preserves Dark / Light theme toggle across all pages.

---

## 🚀 How to Run the Project

1. Open a terminal in the Practical 3 directory:
   ```bash
   cd "C:\AWDF Practicals\24CS106_AWDF_Practical-3"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:5173/
   ```

5. Run Lint checks:
   ```bash
   npm run lint
   ```

6. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Directory Structure

```text
24CS106_AWDF_Practical-3/
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
└── src/
    ├── main.jsx                 # Entry point with BrowserRouter
    ├── App.jsx                  # Root layout, theme state, Routes definition
    ├── App.css                  # Styles for themes, API search, repo cards, spinner
    ├── index.css                # Base resets and typography
    ├── components/
    │   ├── Header.jsx           # Portfolio header
    │   ├── NavBar.jsx           # NavLink navigation + theme toggle
    │   ├── About.jsx            # About Me card
    │   ├── Skills.jsx           # Dynamic skills grid
    │   ├── Spinner.jsx          # Loading indicator component
    │   ├── ErrorMessage.jsx     # Error display with Retry button
    │   ├── RepoList.jsx         # Repository cards dynamically mapped (.map)
    │   └── Footer.jsx           # Reusable footer
    └── pages/
        ├── Home.jsx             # Home route (/)
        ├── Projects.jsx         # GitHub API Integration & search route (/projects)
        ├── Contact.jsx          # Controlled form & state monitor route (/contact)
        └── NotFound.jsx         # 404 catch-all route (*)
```
