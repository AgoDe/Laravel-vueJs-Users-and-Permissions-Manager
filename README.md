# UPManager  
**User and Permission Management System**

## Overview

UPManager is web application designed for user and permission management. It features a modern dashboard, comprehensive user controls, and secure authentication.

## Technologies Used

- **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API), [Vuetify](https://vuetifyjs.com/), [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/)
- **Backend:** [Laravel](https://laravel.com/) (API), [Sanctum](https://laravel.com/docs/10.x/sanctum) for authentication
- **Database:** [PostgreSQL](https://www.postgresql.org/)

## Key Features

- **Dashboard:** View real-time statistics and charts about user registrations and activity.
- **User List:** Browse and search user accounts, with the ability to edit users (restricted to authorized roles).
- **Role-Based Access Control:** Manage permissions and restrict access to features based on user roles.
- **Authentication:** Secure login and session management via Laravel Sanctum.
- **Modern UI/UX:** Responsive and accessible interface built with Vuetify.
- **State Management:** Efficient state handling using Pinia.
- **Routing:** Protected and dynamic routes with Vue Router.

## Setup and Installation

Before you start, make sure you have **PHP**, **Composer**, and **Node.js** installed on your system.

### 1. Backend Setup (`UPManager-api`)

1. Open your terminal and navigate to the backend directory:
    ```bash
    cd UPManager-api
    ```
2. Install PHP dependencies:
    ```bash
    composer install
    ```
3. Run database migrations:
    ```bash
    php artisan migrate
    ```
4. Seed the database with initial data:
    ```bash
    php artisan db:seed
    ```
5. Generate the application key:
    ```bash
    php artisan key:generate
    ```
6. Start the backend server:
    ```bash
    php artisan serve
    ```
    The backend will be running on [http://localhost:8000](http://localhost:8000).

### 2. Frontend Setup (`UPManager-frontend`)

1. Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd UPManager-frontend
    ```
2. Install JavaScript dependencies:
    ```bash
    npm install
    ```
3. Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend will be running on [http://localhost:3000](http://localhost:3000).

### 3. API Testing

In the project directory, you’ll find a JSON file for [Postman](https://www.postman.com/) to test and verify backend API endpoints.  
Import this collection into Postman to easily perform authenticated requests and test user flows.

---

## 4. Test Users

To test role-based access controls and application features, you can use the following pre-configured user accounts:

| Role   | Email                 | Password  |
|--------|-----------------------|-----------|
| Admin  | admin@example.com     | password  |
| Editor | editor@example.com    | password  |
| Viewer | viewer@example.com    | password  |

- **Admin:** Can manage users and permissions.
- **Editor:** Can modify data but cannot manage users.
- **Viewer:** Can only view data.

Use these credentials on the login page to experience the app with different user permissions.

Now you’re ready to start using **UPManager**!  