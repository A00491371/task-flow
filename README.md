# Task Flow

**Task Flow** is a professional, high-performance PWA for daily task management. Built with TypeScript and React, it ensures type safety and a clean "Clean Professional" aesthetic.

## Features

*   **Daily Quotes**: Fetches inspirational quotes (cached for offline).
*   **Task Management**: Add, view, and delete tasks.
*   **Smart Deadlines**:
    *   🔴 **Red**: Overdue
    *   🟠 **Orange**: Due in <= 3 days
    *   🟡 **Yellow**: Due in <= 7 days
    *   🟢 **Green**: Safe
*   **Offline First**: Works completely offline using Native IndexedDB and Service Workers.

## Tech Stack

*   **Core**: React + TypeScript (Vite)
*   **Styling**: Vanilla CSS (CSS Variables, Professional Blue Theme)
*   **Storage**: Native IndexedDB (Wrappers in `src/db.ts`)
*   **PWA**: Web App Manifest + Custom Service Worker

## Setup & Running

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    npm run preview
    ```

## Testing Instructions

1.  **Offline Banner**: Turn off WiFi. A red banner "You are currently offline" will appear at the bottom.
2.  **PWA Install**: Look for the Install icon in the browser address bar.
3.  **Persistence**: Add tasks, close the browser, and reopen. Tasks remain (IndexedDB).
