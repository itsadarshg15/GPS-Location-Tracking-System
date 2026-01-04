# GPS - Location Tracking System

A real-time GPS tracking application that simulates device movement and visualizes it on an interactive map.

## Overview

This project consists of two main components working together:

1.  **Producer (Python)**: A script that simulates a GPS device (`device_1`) moving around San Francisco. It pushes real-time coordinate updates to a Firebase Realtime Database.
2.  **Frontend (React)**: A modern web application built with Vite and React Map GL. It listens to the Firebase database for location updates and displays the device's movement on a Mapbox map in real-time.

## Technology Stack

### Frontend
-   **React**: UI Library
-   **Vite**: Build tool
-   **Rect Map GL (Mapbox GL)**: For rendering the interactive map
-   **Firebase SDK**: For real-time data syncing

### Producer
-   **Python**: Scripting language
-   **Firebase Admin SDK**: For secure server-side interaction with Firebase

## Prerequisites

Before running the project, ensure you have the following installed:
-   **Node.js** (v16+) and npm
-   **Python** (v3.8+)
-   **Firebase Project**: Create one at [console.firebase.google.com](https://console.firebase.google.com)
-   **Mapbox Account**: Get a public access token at [mapbox.com](https://www.mapbox.com)

## Setup & configuration

### 1. Database Setup
1.  Go to your Firebase Console.
2.  Enable **Realtime Database**.
3.  Set the rules to `read: true` for public access (or secure it as needed).

### 2. Producer Setup
The producer requires a Firebase Service Account key to write to the database.

1.  Navigate to the `producer` directory:
    ```bash
    cd producer
    ```
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configuration**:
    -   Download your **Service Account Key** JSON file from Firebase Project Settings > Service Accounts.
    -   Save it as `serviceAccountKey.json` inside the `producer` folder.
    -   Open `main.py` and update the `databaseURL` in the `firebase_admin.initialize_app` call if it differs from the default.

### 3. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configuration**:
    -   Open `.env` (or create one).
    -   Add your Mapbox token:
        ```env
        VITE_MAPBOX_TOKEN=your_mapbox_access_token_here
        ```
    -   Ensure `src/firebase.js` (or equivalent) is configured with your Firebase Web project credentials.

## Usage

### 1. Start the Producer
Run the python script to start simulating location updates:
```bash
# In producer directory
python main.py
```
You should see output like:
```text
Firebase Admin SDK initialized successfully.
Starting Location Producer...
Updating location: {'latitude': 37.77..., 'longitude': -122.41...}
```

### 2. Start the Frontend
Run the development server:
```bash
# In frontend directory
npm run dev
```
Open the provided URL (e.g., `http://localhost:5173`) in your browser.

### 3. Verification
-   The map should load focused on San Francisco.
-   A red marker should appear and move every 2 seconds as the producer script updates the coordinates.
