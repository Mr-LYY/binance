# Dmitrii Liulekin Tracker

A real-time application to track Binance trading pairs, their prices, and other details using Binance's REST API and WebSocket.

## Features

- **Real-Time Price Updates**:
  Live tracking of symbol prices through WebSocket.

- **Pagination**:
  Displays symbols in paginated format (10 symbols per page).

- **Filter Symbols**:
  Quickly find a trading pair using a text-based filter.

- **Symbol Details**:
  View additional details like order types and status by clicking on a symbol.

- **Dynamic WebSocket Subscription**:
  Automatically subscribes to symbols on the current page and unsubscribes when switching pages.

---

## Technology Stack

- **React**: UI development.
- **Redux Toolkit**: State management.
  - `@reduxjs/toolkit/query`: For API integration.
- **WebSocket**: Real-time price updates.
- **Material-UI**: Responsive and modern UI components.

---

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

   Or if you're using Yarn:

   ```bash
   yarn
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   Or:

   ```bash
   yarn dev
   ```

3. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Lints the code using ESLint.

---

## Usage

### Viewing Real-Time Prices

- Launch the app and see a table with Binance trading pairs and their real-time prices.
- Use the pagination controls to navigate through symbols.

### Filtering Symbols

- Enter a search term in the filter input box to quickly find symbols of interest.

### Viewing Symbol Details

- Click on any symbol in the table to view additional details like supported order types and the current status.
