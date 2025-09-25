# Delivery Management System

A **Delivery Management System** built with **Next.js 13**, **React**, **Redux**, **Tailwind CSS**, and **Node.js** backend.  
Supports **Admin** and **Partner** dashboards with authentication, role-based routing, and state management.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Installation](#installation)

---

## Features

- **Role-based Authentication** (Admin / Partner)  
- **Login / Logout functionality**  
- **Client-side state management** using Redux and Context API  
- **Persistent login** via localStorage  
- **Automatic redirects** based on user role  
- **Dashboard pages** for Admin (`/dash`) and Partner (`/part`)  
- **Loader component** for handling loading states  
- **Tailwind CSS styling** for responsive and modern UI  
- Integration with **Leaflet.js** for maps (if needed in dashboard)  

---

## Tech Stack

- **Frontend:** Next.js 13 (App Router), React, Redux Toolkit, Tailwind CSS  
- **Backend:** Node.js, Express.js, PostgreSQL (or any API)  
- **State Management:** Redux + React Context API  
- **Authentication:** JWT-based  
- **Styling:** Tailwind CSS  
- **Maps:** Leaflet.js  

---

## Project Structure

```
/app
├─ layout.tsx # Root layout with ClientProviders
├─ page.tsx # Login page
├─ ClientProviders.tsx # Redux + Auth context provider
└─ dash/ # Admin dashboard
└─ part/ # Partner dashboard
/components
└─ Loader.tsx # Loading spinner component
/context
└─ AuthContext.tsx # Authentication context
/lib
└─ api.ts # Axios instance for API calls
/store
├─ index.ts # Redux store
└─ slices/authSlice.ts # Auth slice for Redux
```

## Installation

<h2>🛠️ Installation Steps:</h2>

<p>1. cd Server</p>

<p>2. Install dependencies for Server</p>

```
npm install
```

<p>3. Start Server</p>

```
npm start
```

<p>4. Open Separate terminal for Client</p>

<p>5. cd Client</p>

<p>6. Install dependencies for Client</p>

```
npm install
```

<p>7. Run Client</p>

```
npm run dev
```


