# 🚀 TechLingo
**Master Python using your C++ knowledge.**

TechLingo is a full-stack learning platform designed to help C++ developers transition to Python effortlessly. Instead of starting from scratch, it translates **algorithmic thinking**—mapping C++ concepts (like pointers, memory, and vectors) directly to Python's dynamic syntax.

Built with a **Decoupled Architecture** (Vite + Express) for scalability, performance, and clean code separation.

---

## ✨ Features

* 📅 **7-Day Interactive Roadmap** – A structured path to master Python in a week.
* 🧠 **Mental Models** – Visualizes how `std::vector` relates to Python `lists`, or how `pointers` map to `references`.
* ⚔️ **Side-by-Side Code Comparison** – See the C++ code and the exact Python equivalent instantly.
* ✅ **Interactive Practice** – Solve challenges with instant feedback and "mark as complete" tracking.
* 🔐 **Secure Authentication** – JWT-based signup and login system.
* 🎨 **Modern UI** – Built with Tailwind CSS, Framer Motion, and Glassmorphism design.

---

## 🌐 Live Demo

Try the application live here:

* **Frontend (App):** 👉 [https://tech-lingo.vercel.app](https://tech-lingo.vercel.app)
* **Backend API:** 👉 [https://techlingo-backend.onrender.com](https://techlingo-backend.onrender.com)

---

## 🧠 How It Works

TechLingo uses a **Monorepo-style structure** where the frontend and backend are developed together but deployed independently.

1. **User Interface:** The **React (Vite)** frontend handles the roadmap, authentication, and interactive lessons.
2. **API Layer:** All logic flows through a centralized **Express.js** backend.
3. **Content Delivery:** Lessons and practice questions are served dynamically via API endpoints.
4. **Progress Tracking:** User progress is stored in **MongoDB** and synced across sessions.

---

## 🛠️ Tech Stack

### **Frontend (Client)**

* ⚛️ **React + Vite** – Blazing fast SPA performance.
* 🎨 **Tailwind CSS** – Beautiful, responsive styling.
* 🛣️ **React Router** – Seamless client-side navigation.
* 🔌 **Fetch API** – Lightweight native data fetching.

### **Backend (Server)**

* 🟢 **Node.js & Express** – Robust REST API architecture.
* 🍃 **MongoDB** – Flexible document storage for user data.
* 🔐 **JWT (JSON Web Tokens)** – Stateless, secure authentication.
* 🛡️ **CORS** – Strictly configured security for cross-origin requests.

---


## 🚀 Deployment Architecture

We use a modern **Micro-Deployment** strategy:

1. **Frontend:** Deployed on **Vercel** for global CDN edge caching.
2. **Backend:** Deployed on **Render** as a web service.
3. **Communication:** The frontend communicates with the backend via secure REST calls, protected by strict CORS policies (allowing only production and local domains).

---

## 🔒 Privacy & Security

* ❌ **No Data Selling:** User progress is stored solely for the learning experience.
* 🛡️ **Encrypted Passwords:** All user passwords are hashed using **Bcrypt** before storage.
* 🔑 **Secure API:** Endpoints are protected via JWT verification middleware.

---

## 🙌 Author

**Yash Pawde**

Built with ❤️ to make switching languages easier for developers.

---

## 🏷️ Disclaimer

This project is for educational purposes. All trademarks (C++, Python) belong to their respective owners.
