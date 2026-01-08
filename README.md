# Online Business Card System

https://github.com/user-attachments/assets/49bdf6d6-fdbb-4c45-a270-e09b8cfa63ac

## Overview

This project is an **online business card system** that allows users to register and share their information instantly.  
Each business card is **valid only for the current day** and automatically becomes inaccessible the next day.

The system is designed with a **mobile-first approach**, assuming usage primarily on smartphones.

---

## Features

- User registration and business card creation
- Business cards with a same-day expiration
- Sharing business cards via URL
- Mobile-optimized UI
- Persistent data storage using Supabase

---

## Technical Highlights & Design Decisions

- **Many-to-many relationship design with Supabase**  
  User skills are managed using an intermediate table, enabling a scalable and extensible data structure.

- **Data transformation for frontend usage**  
  Data retrieved from Supabase is transformed into a frontend-friendly format to simplify UI rendering.

- **Expiration logic implementation**  
  Business cards include an expiration date, and expired records are excluded from retrieval and display.

- **Test-oriented component design**  
  UI behavior is tested using Vitest and React Testing Library to ensure reliability.

---

## Tech Stack

- TypeScript
- React
- Vite
- Vitest
- React Testing Library
- Supabase
- Firebase
- Chakra UI

---
