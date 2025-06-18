# Shelleh Bridge Frontend (React + Vite)

This is the frontend for the **Shelleh Bridge** web application, built with React and Vite. The application enables users to connect, share skills, send requests, and communicate, with role-based features for both regular users and administrators.

## Description

The app supports two user roles:

### Regular Users
- Sign up and log in
- View and manage personal profiles
- Explore skills and submit service requests
- Read and send messages to other users

### Admin Users
- Access an admin dashboard
- Manage available skills (add/update/delete)
- Oversee user activities

Authentication is required to access features, and user sessions are stored using `localStorage`.

## User Requirements

1. Register or log in with an email and password  
2. Access role-specific features  
3. Manage personal profiles and skills  
4. Send messages and interact with other users  

## Technologies Used

- React 18  
- Vite  
- React Router DOM  
- Bootstrap 5 / React-Bootstrap  
- Axios  
- LocalStorage  

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/               # Page-level components
├── styles/              # Custom CSS and styling
├── App.jsx              # App configuration and routing
└── main.jsx             # Entry point for React app
```

## Getting Started

```bash
# 1. Navigate into the frontend project
cd frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
