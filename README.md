# Library Management System

## Features

- Master Data Management
  - Books (CRUD operations)
  - Students (CRUD operations)
- Transaction Management
  - Borrow books
  - Return books
  - Multiple books per transaction
- History
  - View lending history
  - Track book status and loan duration

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm or yarn
- Backend API server running on `http://localhost:3001`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

2.5 **Setup ENV**
- Create .env file
- Copy the env.example value
- Set API_URL as your setting (default will be http://localhost:3001/api) 

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev
   ```

4. **Access the application**
   
   Open your browser and visit [`http://localhost:3000`](http://localhost:3000)

## Project Structure
```
src/
├── components/         # Reusable components
│   ├── DynamicForm.jsx
│   ├── DynamicTable.jsx
│   └── TransactionForm.jsx
├── pages/             # Page components
│   ├── MasterBukuPages.jsx
│   ├── MasterMahasiswaPages.jsx
│   ├── TransaksiPages.jsx
│   └── HistoryPages.jsx
└── App.jsx            # Main application component
```

## API Endpoints

The application expects the following API endpoints to be available:

### Master Data
- `GET /master/buku`
- `POST /master/buku`
- `PUT /master/buku/:id`
- `DELETE /master/buku/:id`
- `GET /master/mahasiswa`
- `POST /master/mahasiswa`
- `PUT /master/mahasiswa/:id`
- `DELETE /master/mahasiswa/:id`

### Transactions
- `GET /transaksi`
- `POST /transaksi`
- `PUT /transaksi/:id/return`

### History
- `GET /history`

## Technologies Used

- **React** - Frontend library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router DOM** - Routing library

