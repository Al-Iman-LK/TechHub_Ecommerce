# TechHub Electronics Store

A sophisticated full-stack e-commerce platform for technology and electronics retail, built with modern web technologies.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse latest gadgets, computers, and tech accessories
- **Advanced Search**: Filter by category, brand, price range, and ratings
- **Shopping Cart**: Add, update, and remove items with real-time updates
- **Secure Checkout**: Stripe payment integration with multiple payment methods
- **User Accounts**: Registration, login, profile management
- **Order History**: Track orders and view detailed order information
- **Product Reviews**: Read and write reviews with ratings
- **Mobile Responsive**: Optimized for all device sizes

### Admin Features ✅
- **Admin Dashboard**: Complete analytics with statistics, recent orders, and low stock alerts
- **Inventory Management**: Add, edit, delete, and manage product listings with stock tracking
- **Order Processing**: View all orders, update order statuses, and manage fulfillment
- **User Management**: View and manage customer accounts and roles
- **Analytics Dashboard**: Sales metrics, revenue tracking, and performance insights
- **Role-based Access**: Secure admin-only routes and functionality

**Admin Access:**
- Login URL: Use the regular login form at `/login`
- Email: `admin@techhub.com`
- Password: `admin123`
- Dashboard: `/admin` (accessible after admin login)

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Heroicons** - Beautiful icons
- **Stripe React** - Payment processing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Stripe** - Payment gateway
- **Bcrypt** - Password hashing
- **Helmet** - Security middleware

## ⚡ Quick Start

### For Testing (Servers Already Running)
If the development servers are already running:

1. **Customer Access**: Visit `http://localhost:5173`
   - Browse products, add to cart, test checkout
   - Register new account or login with existing account

2. **Admin Access**: 
   - Go to `http://localhost:5173/login`
   - Login with: `admin@techhub.com` / `admin123`
   - Access admin dashboard from user menu dropdown

### Sample Products
The application comes pre-loaded with 8 sample tech products including iPhones, MacBooks, headphones, and cameras.

## 📁 Project Structure

```
techhub/
├── src/                      # React frontend
│   ├── components/          # Reusable components
│   │   ├── Layout/         # Navigation, Footer
│   │   └── Auth/           # Authentication components
│   ├── contexts/           # React contexts
│   ├── pages/              # Page components
│   └── assets/             # Static assets
├── backend/                 # Node.js API
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── utils/              # Utility functions
└── docs/                    # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Stripe account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techhub
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Environment Configuration**
   
   Frontend (`.env`):
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```
   
   Backend (`backend/.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/techhub
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. **Start the development servers**
   
   Frontend:
   ```bash
   npm run dev
   ```
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```

6. **Seed the database** (optional)
   ```bash
   cd backend
   node seedProducts.js
   ```

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/products` | Get products with filters |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/orders` | Get user orders |
| POST | `/api/payment/create-intent` | Create payment intent |

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font Family**: Inter
- **Headings**: Bold, various sizes
- **Body**: Regular weight
- **Captions**: Smaller, lighter weight

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation
- XSS protection
- CORS configuration
- Secure payment processing

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the `backend` folder
3. Ensure MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer**: TechHub Development Team
- **Designer**: UI/UX Design Team

## 📞 Support

For support or questions:
- Email: support@techhub.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ for technology enthusiasts+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
