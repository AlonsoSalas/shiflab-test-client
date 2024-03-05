# ShiftLab Technical Assesment

## React client App

This React application provides a user interface for managing courses, students, and results. It connects to a backend server to perform CRUD operations on these entities.

## Features

- Course Management: Create, read, update, and delete courses.
- Student Management: Create, read, update, and delete students.
- Results Management: Create, read, update, and delete results.
- Integration with Backend: Connects to a backend server to perform operations on courses, students, and results.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker](https://www.docker.com/) (optional, for running with Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AlonsoSalas/shiflab-test-client.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```bash
    REACT_APP_API_BASE_URL=localhost:3000
   ```

### Running App

```bash
npm start
```

Access the application in your web browser at http://localhost:4000.

#### Technologies Used

React: A JavaScript library for building user interfaces.
React Router: For routing and navigation within the application.
Material UI: For styling and layout of the application.
