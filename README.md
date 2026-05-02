# 📚 StudyNotion - Full-Stack Ed-Tech Platform

StudyNotion is a versatile and highly scalable **ed-tech platform** designed to provide a seamless learning and teaching experience. Built with the **MERN stack**, it empowers instructors to share their knowledge and students to enhance their skills through structured courses.

---

## 🌟 Key Features

### 👨‍🎓 For Students
- **Authentication**: Secure signup and login with **OTP-based email verification**.
- **Course Exploration**: Browse courses by categories and view detailed descriptions.
- **Cart & Checkout**: Seamless course enrollment using **Razorpay payment gateway**.
- **Learning Dashboard**: Track progress across enrolled courses.
- **Interactive Player**: High-quality video player for course content with section-wise organization.
- **Ratings & Reviews**: Share feedback on courses to help others.

### 👨‍🏫 For Instructors
- **Course Management**: Comprehensive tools to create, edit, and manage courses.
- **Media Upload**: Integration with **Cloudinary** for secure video and image storage.
- **Instructor Dashboard**: Visual insights into course performance, student enrollment, and total earnings using **Chart.js**.
- **Content Hierarchy**: Organize courses into Sections and Subsections for better structure.

### 🛠️ General
- **Profile Management**: Update profile details, change avatars, and manage account settings.
- **Search & Discovery**: Find courses easily through categories.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

### 🔒 API Security & Performance
- **Helmet**: Sets secure HTTP headers for the Express API (with cross-origin resource policy aligned for CORS).
- **Rate limiting**: Global limit on `/api` routes; stricter limits on authentication routes (login, signup, OTP, password reset, Clerk sync).
- **Pagination**: List endpoints support `?page=` and `?limit=` and return a `pagination` object (`currentPage`, `totalPages`, `totalItems`, `hasNextPage`, `hasPrevPage`). The instructor “My Courses” view includes previous/next controls.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Navigation**: React Router DOM
- **Forms**: React Hook Form
- **UI Components**: React Icons, Swiper, Video-react

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & Bcrypt (Optional Clerk integration)
- **Communication**: Nodemailer (via Gmail)
- **Security / middleware**: Helmet, express-rate-limit (`trust proxy` enabled for reverse proxies such as Vercel)

### Services & Tools
- **Payment Gateway**: Razorpay
- **Cloud Storage**: Cloudinary
- **Deployment Ready**: Configured for platforms like Vercel and Netlify.

---

## 📂 Project Structure

```text
StudyNotion_Full-Stack-App/
├── frontend/             # React Frontend (Vite)
│   ├── public/           # Static assets
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Main application pages
│       ├── services/     # API integration logic
│       └── slices/       # Redux state management
├── backend/              # Node/Express Backend
│   ├── config/           # Database and Cloud configurations
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Auth, rate limiting
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoints
│   └── utils/            # Helpers (e.g. pagination, image upload)
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MukeshKumarCoder/StudyNotion_Full-Stack-App.git
cd StudyNotion_Full-Stack-App
```

### 2️⃣ Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGODB_URL=your_mongodb_url
   PORT=4000
   JWT_SECRET=your_jwt_secret
   CLOUD_NAME=your_cloudinary_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   MAIL_HOST=smtp.gmail.com
   MAIL_USER=your_email
   MAIL_PASS=your_email_password
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

#### Paginated list endpoints (examples)
Query parameters are optional; sensible defaults apply if omitted.

| Endpoint | Default `limit` (max) | Notes |
| -------- | -------------------- | ----- |
| `GET /api/course/getAllCourses` | 12 (50) | Published courses, includes `pagination` |
| `GET /api/course/getInstructorCourses` | 10 (50) | Requires `Authorization: Bearer <token>` |
| `GET /api/course/showAllCategories` | 50 (100) | |
| `GET /api/course/getReviews` | 30 (100) | |

Example: `GET /api/course/getAllCourses?page=2&limit=12`

### 3️⃣ Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Mukesh Kumar**  
- [GitHub](https://github.com/MukeshKumarCoder)
- [LinkedIn](https://www.linkedin.com/in/mukeshkumar-coder/)

---
*Developed with ❤️ as a project for learning MERN Stack.*
