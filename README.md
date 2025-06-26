🌐 Project Overview
A modern, responsive frontend for a Student Management System built with Next.js that:

Manages student records

Generates training certificates (PNG/PDF/ZIP)

Displays team information with interactive contact options

Connects to a Spring Boot backend API

📂 Project Structure
frontend/
├── app/                   # Next.js 13+ app router
│   ├── dashboard/         # Admin dashboard pages
│   ├── contact/           # Contact and team pages
│   └── layout.js          # Root layout
├── components/            # Reusable UI components
│   ├── Certificate/       # Certificate generation
│   ├── Forms/            # All form components
│   └── UI/               # Generic components
├── context/               # API and application state
│   └── api-context.js     # Axios API configuration
├── public/                # Static assets
│   ├── certificates/      # Certificate templates
│   ├── images/            # Team photos/logos
│   └── samples/           # Sample documents
└── styles/                # Global styles

⚡ Key Features
Dynamic Certificate Generation

PNG, PDF, and ZIP export options

Customizable templates

Bulk processing

Admin Dashboard

Student record management

Data visualization

Responsive design

Team Management

Interactive contact cards

Direct WhatsApp/email/phone links

Animated presentation


🚀 Getting Started
Prerequisites
Node.js v18+

npm/yarn/pnpm

Installation

# Clone repository
git clone https://github.com/your-repo/student-management-system.git
cd student-management-system/frontend

# Install dependencies
npm install

# Run development server
npm run dev

The application will be available at http://localhost:3000

API Endpoints
Method	Endpoint	Description
GET	/api/students	Fetch all students
POST	/api/students	Add new student
GET	/api/certificates/generate	Generate certificates
more....

🧩 Components Breakdown
1. Certificate Generation
Components: CertificateTemplate, BulkCertificateGenerator

Tech: html-to-image, jsPDF, JSZip

Features:

Real-time preview

Quality adjustment

Batch processing

2. Team Management
Component: TeamCard

Tech: Framer Motion, React Icons

Features:

Hover animations

Direct contact links

Responsive grid

🔧 Troubleshooting Guide
Symptom	Solution
Certificate generation fails	Check browser console for CORS errors
API calls not working	Verify backend is running on port 8080
Missing styles	Run npm install tailwindcss
Animation issues	Ensure Framer Motion is v12+
