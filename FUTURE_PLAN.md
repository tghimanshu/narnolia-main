# Future Plan - Phase 2

This document outlines the roadmap for the next phase of development for the Narnolia Portfolio Application. Phase 1 focused on core functionality, data visualization, and documentation. Phase 2 aims to enhance user experience, performance, and security.

## 1. User Authentication & Personalization
*   **User Login/Signup:** Implement a user authentication system (e.g., JWT, OAuth) to allow users to create accounts.
*   **Personalized Dashboard:** Allow logged-in users to save favorite portfolios and track their specific investments.
*   **Alerts & Notifications:** Enable users to set alerts for significant NAV changes or new portfolio launches.

## 2. Advanced Analytics & Visualization
*   **Comparative Analysis:** Add a feature to compare two or more portfolios side-by-side on various metrics (Risk, Return, Beta, Sharpe Ratio).
*   **Interactive Charts:** Upgrade Chart.js implementation to allow more interactivity, such as zooming, panning, and custom date range selection.
*   **PDF Reports:** Generate downloadable PDF reports for portfolio performance and factsheets dynamically.

## 3. Technical Improvements
*   **State Management:** Introduce a state management library like Redux or Context API for better handling of global state (user data, cached API responses).
*   **Caching:** Implement server-side caching (e.g., Redis) for API responses to reduce load on the external Narnolia API and improve response times.
*   **Testing:**
    *   **Unit Tests:** Add unit tests for backend API logic using Jest/Mocha.
    *   **Component Tests:** Add testing for React components using React Testing Library.
    *   **E2E Tests:** Implement End-to-End testing with Cypress or Selenium.

## 4. UI/UX Enhancements
*   **Responsive Design Polish:** Further refine the mobile experience to ensure all charts and tables are perfectly responsive.
*   **Dark Mode:** Implement a system-wide dark mode preference.
*   **Loading States:** Add better skeleton screens or loading spinners for data fetching states.

## 5. Deployment & CI/CD
*   **Dockerization:** Containerize the application (frontend and backend) using Docker for consistent deployment environments.
*   **CI/CD Pipeline:** Set up a Continuous Integration/Continuous Deployment pipeline (e.g., GitHub Actions, Jenkins) to automate testing and deployment.

## 6. Security
*   **Environment Variables:** Ensure all sensitive keys (API credentials) are strictly managed via environment variables and not committed to the repo.
*   **Rate Limiting:** Implement rate limiting on the backend API to prevent abuse.
*   **Input Validation:** Add robust input validation for all API endpoints.
