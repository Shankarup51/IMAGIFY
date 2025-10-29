# 🎨 Imagify – Transform Text into Stunning Visuals

**Imagify** is a powerful MERN stack application that bridges the gap between imagination and reality. Simply describe what you envision, and watch as advanced AI technology brings your words to life through stunning, unique images.

---

## ✨ What Makes Imagify Special?

* 🤖 **AI-Powered Image Creation** – Leverages CLIPDrop API for high-quality image generation
* 🔐 **Secure User System** – JWT-based authentication ensures your data stays protected
* 📚 **Generation History** – All your prompts and creations stored safely in MongoDB
* 💰 **Token-Based System** – Integrated Razorpay payment for purchasing generation credits
* 🎭 **Beautiful Interface** – Smooth animations with Framer Motion and modern Tailwind CSS styling
* 🚀 **Full-Stack Solution** – Complete MERN implementation for seamless performance

---

## 💭 The Vision Behind Imagify

Creativity shouldn't require design expertise. Imagify democratizes visual content creation by transforming simple text descriptions into professional-quality images.

**Perfect for:**
* 🎨 Content creators seeking unique visuals
* 📖 Students working on presentations and projects
* 🧪 AI enthusiasts experimenting with generative technology
* 💼 Professionals needing quick mockups and concept art

---

## 🔧 Technology Overview

| Component | Implementation |
|-----------|----------------|
| **Frontend** | React.js with Vite |
| **Styling** | Tailwind CSS for responsive design |
| **Animations** | Framer Motion for smooth interactions |
| **Backend** | Node.js + Express.js REST API |
| **Database** | MongoDB for persistent storage |
| **Security** | JWT token authentication |
| **AI Engine** | CLIPDrop API integration |
| **Payments** | Razorpay for token purchases |

---

## 📸 Application Screenshots

*[https://drive.google.com/file/d/18m6Mb44sibkca2JnCFdzBkcsiiZRSwrZ/view?usp=drive_link]*

*[https://drive.google.com/file/d/12CqqWRf2ZIW1cPo1WtTl6XSFATNAJDvS/view?usp=sharing]*

*[https://drive.google.com/file/d/12HLaWPOxy2UbEFKxHYcdmaHF1prKdG2O/view?usp=drive_link]*

*[https://drive.google.com/file/d/1OzruReVQY-_azwXrHTjnBevCsoUp1DUZ/view?usp=sharing]*



---

## 🎯 Core Functionality

### 🖼️ AI Image Generation
Users input descriptive text prompts which are processed through the CLIPDrop API, returning beautifully generated images displayed instantly in the browser.

### 🔑 User Authentication System
Complete registration and login flow with JWT tokens, enabling personalized experiences and access to generation history for authenticated users.

### 💳 Credit Purchase System
Integrated payment solution allowing users to purchase generation tokens. The Razorpay webhook system ensures secure transaction verification and automatic credit allocation.

---

## ⚡ Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/imagify.git
cd imagify
```

### Step 2: Backend Configuration

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file with your configuration:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
CLIPDROP_API_KEY=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

Launch the backend server:
```bash
npm run dev
```

### Step 3: Frontend Setup

Open a new terminal, navigate to the client folder, and install dependencies:
```bash
cd ../client
npm install
```

Configure the environment file `.env`:
```env
VITE_SERVER_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

---

## 👨‍💻 Developer

**Umashankar** – Full-stack developer with a passion for creating innovative AI-powered applications that make technology accessible to everyone.

🔗 Connect with me on **[LinkedIn](https://www.linkedin.com/in/umashankar45/)**  
💻 Explore my projects on **[GitHub](https://github.com/Shankarup51)**

---

<div align="center">

**Built with creativity and code** 💻✨

</div>
