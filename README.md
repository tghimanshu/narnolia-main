# Narnolia Portfolio Application

This is a comprehensive web application for viewing and analyzing Narnolia Investment Portfolios. It consists of a React.js frontend and an Express.js backend.

## Purpose

The main purpose of this application is to provide users with a platform to:
- View various Narnolia investment model portfolios.
- Analyze the performance of these portfolios over different timeframes (3M, 1Y, 3Y, 5Y, Max).
- Compare portfolio performance against benchmarks (like Nifty 100).
- See detailed breakdowns of portfolio holdings and sector allocations.
- Access detailed information about each portfolio, including risk profile, minimum investment, and expected returns.

## Architecture

The project follows a standard client-server architecture:
- **Backend**: Node.js with Express. It handles API requests, authentication with the Narnolia external API, and serves the static frontend files.
- **Frontend**: React.js. It provides the user interface for browsing portfolios and visualizing data using charts (Chart.js).

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd narnolia
    ```

2.  **Install Backend Dependencies:**
    Navigate to the root directory and run:
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the client directory and run:
    ```bash
    cd client
    npm install
    ```

4.  **Build the Frontend:**
    From the `client` directory, build the React app:
    ```bash
    npm run build
    ```
    This will generate the production build in `client/build`, which the backend serves.

5.  **Configuration:**
    Ensure `config.json` is present in the root directory. This file stores authentication details and API keys required for the external Narnolia API.
    *Note: The application attempts to automatically authenticate and update this file.*

## Usage Guide

### Running the Application

To start the server (and serve the built frontend):

1.  Navigate to the root directory.
2.  Run the start command:
    ```bash
    node index.js
    ```
3.  The server will start on port 5000.
4.  Open your browser and navigate to `http://localhost:5000`.

### Development

To run the frontend in development mode (with hot reloading):
1.  Navigate to `client` directory:
    ```bash
    cd client
    npm start
    ```
2.  The React app will typically run on `http://localhost:3000`. You may need to configure a proxy in `client/package.json` to point to the backend server (default port 5000) for API requests to work correctly during development.

## API Documentation

The backend exposes several API endpoints to support the frontend:

- **`GET /api/getpfs`**:
    - **Purpose**: Retrieves the list of all available model portfolios.
    - **Response**: JSON array of portfolio objects.

- **`GET /api/getnavs/:time`**:
    - **Purpose**: Retrieves Net Asset Value (NAV) details for portfolios.
    - **Parameters**: `time` (e.g., '3m', '1y', '3y', '5y', 'max').
    - **Response**: JSON array of NAV data points.

- **`GET /:id`**:
    - **Purpose**: Serves the React application (handled by client-side routing) for a specific portfolio view.

- **`GET /`**:
    - **Purpose**: Serves the main React application.

## Frontend Components

Key components in the React application:

- **`App`**: Main entry point, handles routing.
- **`Portfolios`**: Displays the dashboard with all portfolios.
- **`SinglePortFolio`**: Displays detailed view for a selected portfolio, including charts and statistics.

## License

ISC
