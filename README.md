# Full Stack Terminal Application

This application is a small terminal with a set of commands that interface with a backend powered by Node.js with Express and a front end built on React.js, using Tailwind CSS for styling.

## Commands
1. **help**
   - **Description:** Displays a list of available commands and their brief descriptions.
   - **Output:**
     ```
     Available commands:
     - help: Show available commands
     - about: Display information about this CLI
     - fetch-price [coin]: Fetch the current price of a specified cryptocurrency
     - upload: Opens the file explorer to allow uploading CSV files only.
     - draw [file] [columns]: Draws the chart of specified columns of the file present in the draw-chart directory.
     ```

2. **about**
   - **Description:** Shows information about the CLI, including its version and purpose.
   - **Output:**
     ```
     CLI Version 1.0
     This is a front-end CLI created as a part of the Full Stack Hiring test. It simulates various command-line functionalities.
     ```

3. **fetch-price [pair]**
   - **Description:** Fetches the current average price of a specified cryptocurrency pair.
   - **API:** `https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT`
   - **Output:**
     ```
     The current price of [pair] is [price].
     ```

4. **upload**
   - **Description:** Uploads the selected file to the draw-chart directory on the backend.
   - **File:** [file]
   - **Output:**
     ```
     [file] has been uploaded successfully.
     ```

5. **draw [file] [columns]**
   - **Description:** Draws a SimpleLineChart using only the specified columns of the specified file.
   - **Tool:** [Recharts](https://recharts.org/)
   - **Output:**
     ```
     Drawing chart based on [file]...
     Chart drawn successfully.
     ```

6. **delete [file]**
   - **Description:** Deletes a specified file from the draw-chart directory.
   - **Output:**
     ```
     [file] has been deleted successfully.
     ```

## Installation
### Frontend
- To run the frontend, navigate to the frontend directory and execute:
  ```
  npm install
  npm start
  ```

### Backend
- To run the backend, navigate to the backend directory and execute:
  ```
  npm install
  npm start
  ```
### Additional Information
- The backend uses the CSV reader library for handling CSV uploads.
