# Intelligent Personal Finance Manager 💰

This is a full-stack AI-powered web application designed to help users manage their personal finances smartly and efficiently. The app includes features like:

- Authentication
- Transaction management
- Receipt uploading and AI extraction
- Savings & expense tracking
- EMI calculation
- Email notifications

## 📁 Folder Structure

/finance-app  
  /client        # Frontend (Next.js)  
  /backend       # Backend (Node.js, Express)

## 🛠️ Technologies Used

- Frontend: Next.js, Tailwind CSS  
- Backend: Node.js, Express, MongoDB  
- AI: OpenAI API  
- Email: Nodemailer  
- Auth: JWT  

## ⚙️ Setup Instructions

### 🔐 Environment Variables

1. Backend `.env` file (`/backend/.env`)

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret
In utils/sendEmails
EMAIL_USER=youremail@gmail.com  
EMAIL_PASS=your_email_password_or_app_password

2. Frontend `.env.local` file (`/client/.env.local`)
OPENAI_API_KEY=your_openai_api_key (in .env file)
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

## 🚀 Run the App

Backend:

cd backend  
npm install  
npm run dev

Frontend:

cd client  
npm install  
npm run dev

## 💌 Email Setup

In the `sendEmail.js` file (in the backend), email is sent using `nodemailer`.

Make sure the following are in your `.env` file:

EMAIL_USER=youremail@gmail.com  
EMAIL_PASS=your_email_password_or_app_password

> ⚠️ If you are using Gmail, make sure to enable "Less secure apps" or generate an **App Password** if you have 2-step verification enabled.

