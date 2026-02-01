# Task Flow

> **Engineering Productivity.**

Task Flow is a strict, type-safe progressive web application designed for professionals who need zero-friction task management. Unlike generic to-do lists, Task Flow emphasizes strict deadline tracking and visual discipline using a high-contrast Neo-Brutalism/Professional design system.

---

## ⚡️ Key Capabilities

### 1. **Typed Architecture**
Built entirely in **TypeScript**, preserving data integrity across the entire application state. Every task, event, and database transaction aligns with strict interfaces defined in `src/types.ts`.

### 2. **Native Storage Engine**
We bypass heavier wrappers like Dexie or LocalForage. Task Flow implements a raw, Promise-based wrapper around the browser's **IndexedDB** API (`src/db.ts`), demonstrating low-level mastery of client-side storage mechanisms.

### 3. **Deadline Logic**
The application actively monitors task urgency:
*   tasks due within **3 days** trigger an **URGENT (Amber)** warning.
*   tasks due within **1 week** are marked **CAUTION (Yellow)**.
*   Expired tasks are immediately flagged **CRITICAL (Red)**.

### 4. **Resilient Connectivity**
A robust Service Worker strategy (`sw.js`) ensures the application shell loads instantly, regardless of network status. The UI proactively informs users of connection drops via a non-intrusive bottom banner.

---

## 🛠 Project Structure

```bash
src/
├── components/      # UI Modules (QuoteWidget, InputBar, TaskBoard)
├── db.ts            # Native IndexedDB implementation
├── types.ts         # TypeScript Interfaces
├── index.css        # Professional Design Tokens
└── App.tsx          # Application Logic
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

1.  **Clone & Install**
    ```bash
    git clone <repo>
    cd task-flow
    npm install
    ```

2.  **Ignite Engine**
    ```bash
    npm run dev
    ```

3.  **Deployment Build**
    ```bash
    npm run build
    npx vite preview
    ```

---

*Engineered with React, TypeScript, and Vite.*
