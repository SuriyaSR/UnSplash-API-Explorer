# 🌿 Unsplash Image Explorer

A **React + TypeScript + Vite** application to explore images from the **Unsplash API**.  
This project is currently in **active development** with a focus on performance-first UI, clean architecture, and scalable patterns. 
Core features like **debounced search, infinite scrolling, and virtualized rendering** are implemented, with more enhancements planned.

---

## 🚀 Current Features

- Search Unsplash images with **debounced input**  
- **Infinite scroll** to load more images while scrolling  
- Responsive **grid layout** using Tailwind CSS
- Virtualized rendering using **React Virtuoso** (smooth scrolling + fewer DOM nodes)
- Photo cards showing photographer details and clickable links to Unsplash
- Optimized rendering using **memoized components** (React.memo, useMemo, useCallback)
- Image modal view using **React Portal** (lightbox experience)

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Data Fetching | Axios, React Query |
| UI Performance | React Virtuoso (virtualization), memoization |
| Modal Rendering | React Portal |
| API | Unsplash REST API |

---

## 🛠️ Setup & Running Locally

1. **Clone the repository**
```bash
git clone https://github.com/SuriyaSR/unsplash-explorer.git
cd unsplash-explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file in the root:**
```bash
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
```

4. **Run development server**
```bash
npm run dev
```

5. **Open in browser:**
```bash
http://localhost:5173
```

## ⚡ Planned Features

- Category filters (Nature, Travel, Technology, etc.)
- Dark mode toggle
- Bookmark favorite images locally
- Unit & integration testing (React Testing Library + Jest/Vitest)
- Skeleton loaders + progressive image loading enhancements
