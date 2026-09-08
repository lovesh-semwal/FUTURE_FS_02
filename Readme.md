# ClientTrack

ClientTrack is a full-stack Client Lead Management System (Mini CRM) that helps businesses collect, manage, track, and convert leads submitted through a website.

## Features

- Secure admin login with JWT authentication
- Public contact form for lead submission
- Dashboard with lead analytics
- Lead status tracking: New → Contacted → Converted
- Search and filter leads
- Add follow-up notes to leads
- Automatic timestamps
- Delete leads

## Tech Stack

Frontend:

- React
- Vite
- Tailwind CSS
- Axios
- Recharts

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

ClientTrack/
├── Frontend/
└── Backend/

## Getting Started

### 1. Clone the Repository

git clone <your-github-repository-url>
cd ClientTrack

### 2. Start Backend

cd Backend
npm install
npm run dev

### 3. Start Frontend

Open another terminal:

cd Frontend
npm install
npm run dev

### 4. Environment Variables

Create a .env file inside the Backend folder:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Author

Lovesh Semwal
