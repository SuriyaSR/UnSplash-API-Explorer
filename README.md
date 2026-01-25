# 🌿 Unsplash Image Explorer
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-teal)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
[![CI](https://github.com/SuriyaSR/UnSplash-API-Explorer/actions/workflows/docker-image.yml/badge.svg)](https://github.com/SuriyaSR/UnSplash-API-Explorer/actions/workflows/docker-image.yml)
[![Docker Pulls](https://img.shields.io/docker/pulls/suriyasr/unsplash-api-explorer)](https://hub.docker.com/r/suriyasr/unsplash-api-explorer)
[![Docker Image Size](https://img.shields.io/docker/image-size/suriyasr/unsplash-api-explorer/latest)](https://hub.docker.com/r/suriyasr/unsplash-api-explorer)

A **React + TypeScript + Vite** application to explore images from the **Unsplash API**.<br>
This project is currently in **active development** with a focus on performance-first UI, clean architecture, and scalable patterns.<br>
Core features like **debounced search, infinite scrolling, virtualized rendering and smooth modal previews** are implemented, with more enhancements planned.

## 🔄 CI/CD + Deployment
This project uses **GitHub Actions** to automatically:

✅ Build the Docker image<br>
✅ Push the latest image to **Docker Hub** on every push/merge to `master`

The app is deployed on **AWS EC2 using Docker and Watchtower** automatically pulls and redeploys the latest image whenever a new version is pushed to Docker Hub.

## 🌍 Live Demo

- **Vercel (Frontend Demo):** https://unsplashimageexplorer.vercel.app
- **AWS EC2 (Docker Deployment):** http://13.60.190.29/
- **Docker Hub Image:** https://hub.docker.com/r/suriyasr/unsplash-api-explorer

> Note: AWS EC2 demo may be stopped occasionally to manage costs.

## 🚀 Current Features

- Search Unsplash images with **debounced input**  
- **Infinite scroll** for seamless browsing  
- Responsive **grid layout** using Tailwind CSS
- Virtualized rendering using **React Virtuoso** (smooth scrolling + fewer DOM nodes)
- Photo cards showing photographer details + Unsplash links
- Optimized rendering using **memoized components** (React.memo, useMemo, useCallback)
- Image modal view using **React Portal** (lightbox experience)


## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Data Fetching | Axios, React Query |
| UI Performance | React Virtuoso (virtualization), memoization |
| Modal Rendering | React Portal |
| API | Unsplash REST API |
| DevOps | Docker, Docker Hub, GitHub Actions |
| Deployment | AWS EC2 + Watchtower |


## 🛠️ Setup & Running Locally

1. **Clone the repository**
```bash
git clone https://github.com/SuriyaSR/UnSplash-API-Explorer.git
cd UnSplash-API-Explorer
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file in the root:**
```bash
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
```

4. **Start development server**
```bash
npm run dev
```

Open in browser:
```bash
http://localhost:5173
```

## 🐳 Run with Docker (Recommended)
```bash
docker pull suriyasr/unsplash-api-explorer:latest
docker run -p 8080:80 suriyasr/unsplash-api-explorer:latest
```

Open in browser:
```bash
http://localhost:8080
```

## ⚡ Planned Features

- Category filters (Nature, Travel, Technology, etc.)
- Dark mode toggle
- Bookmark favorite images locally
- Unit & integration testing (React Testing Library + Jest/Vitest)
- Skeleton loaders + progressive image loading enhancements

## 📌 Notes
Unsplash API key is required to run the app. <br>
This is a frontend app, so any `VITE_*` variables are bundled during build.
