# Resume Checker Project

This project consists of a Django backend and a React frontend.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Python](https://www.python.org/downloads/) (for the backend)
- [Node.js](https://nodejs.org/) (for the frontend)

## Setup Instructions

Since `venv` (Python virtual environment) and `node_modules` (JavaScript dependencies) are not shared, you need to set them up locally after downloading this project.

### 1. Backend Setup (Django)

1.  Open your terminal and navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Create a virtual environment:

    ```bash
    python -m venv venv
    ```

3.  Activate the virtual environment:
    - **Windows:**
      ```bash
      venv\Scripts\activate
      ```
    - **macOS/Linux:**
      ```bash
      source venv/bin/activate
      ```

4.  Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5.  Run database migrations:

    ```bash
    python manage.py migrate
    ```

6.  Start the backend server:
    ```bash
    python manage.py runserver
    ```
    The backend will run at `http://127.0.0.1:8000/`.

### 2. Frontend Setup (React)

1.  Open a new terminal window and navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will typically run at `http://localhost:5173/` (check your terminal for the exact URL).

## Notes

- Make sure both the backend and frontend servers are running simultaneously in separate terminals for the application to work correctly.
- If you encounter any issues, check that you have activated the virtual environment for the backend and installed all dependencies.
