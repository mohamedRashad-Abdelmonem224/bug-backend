# Bug Slayers Backend API

Professional Express.js + MongoDB backend for Bug Slayers company portfolio.

## Features

✅ **Admin Authentication** - JWT-based login system  
✅ **Rate Limiting** - Protection against brute force and spam  
✅ **CORS Security** - Whitelist-based origin control  
✅ **MongoDB Integration** - Mongoose ORM for data management  
✅ **Error Handling** - Centralized error handler middleware  
✅ **Environment Configuration** - Secure .env variable management  

---

## Installation

### Requirements
- Node.js 16+
- MongoDB (local or cloud)

### Setup

```bash
# Clone repository
git clone https://github.com/mohamedRashad-Abdelmonem224/bug-backend.git
cd bug-backend

# Install dependencies
npm install

# Create .env file (copy from below)
cp .env.example .env

# Seed admin account (first time only)
npm run seed

# Start server
npm start          # Production
npm run dev        # Development (with nodemon)
```

## Environment Variables

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=5000
JWT_SECRET=your-secret-key-here
ADMIN_USER=admin
ADMIN_PASS=your-secure-password
CONTACT_NOTIFY_EMAIL=your-email@example.com
CONTACT_NOTIFY_PHONE=+1234567890
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

---

## API Endpoints

### Admin Routes (`/api/admin`)

#### Login
```
POST /api/admin/login
```
**Rate Limited:** 5 attempts per 15 minutes

**Request:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Projects (Protected)
```
GET /api/admin/projects
Headers: Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "65f...",
    "title": "Project Name",
    "description": "...",
    "image": "url",
    "link": "url",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Create Project (Protected)
```
POST /api/admin/projects
Headers: Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "New Project",
  "description": "Description",
  "image": "https://...",
  "link": "https://..."
}
```

#### Delete Project (Protected)
```
DELETE /api/admin/projects/:id
Headers: Authorization: Bearer <token>
```

#### Get Contact Messages (Protected)
```
GET /api/admin/contacts
Headers: Authorization: Bearer <token>
```

---

### Projects Routes (`/api/projects`)

#### Get All Projects
```
GET /api/projects
```

**Response:** Array of all projects

#### Create Project (Requires Admin Token)
```
POST /api/projects
Headers: Authorization: Bearer <token>
```

---

### Services Routes (`/api/services`)

#### Get All Services
```
GET /api/services
```

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Service Name",
    "description": "...",
    "icon": "...",
    "createdAt": "..."
  }
]
```

---

### Team Routes (`/api/team`)

#### Get All Team Members
```
GET /api/team
```

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Member Name",
    "position": "Developer",
    "image": "url",
    "bio": "...",
    "createdAt": "..."
  }
]
```

---

### Blog Routes (`/api/blog`)

#### Get All Blog Posts
```
GET /api/blog
```

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Blog Title",
    "content": "...",
    "author": "Author Name",
    "image": "url",
    "createdAt": "..."
  }
]
```

#### Get Single Post
```
GET /api/blog/:id
```

---

### Contact Routes (`/api/contact`)

#### Submit Contact Form
```
POST /api/contact
```

**Rate Limited:** 30 requests per hour

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "message": "Message sent successfully"
}
```

---

## Security Features

### 🔐 Rate Limiting
- **Login attempts:** 5 per 15 minutes
- **Contact form:** 30 per hour
- **General API:** 100 per minute

### 🔒 CORS Protection
Only whitelisted origins can access the API. Configure in `.env`:
```env
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### 🔑 JWT Authentication
- All admin routes require valid JWT token
- Token expires after 8 hours
- Tokens are verified using `JWT_SECRET`

### 🛡️ Password Security
- Admin passwords hashed with bcryptjs
- Salting rounds: 10

---

## Error Handling

All errors follow this format:
```json
{
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `429` - Too Many Requests (Rate Limited)
- `500` - Server Error

---

## Database Models

### Admin
```javascript
{
  username: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  title: String,
  description: String,
  image: String (URL),
  link: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Service
```javascript
{
  title: String,
  description: String,
  icon: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Team Member
```javascript
{
  name: String,
  position: String,
  image: String (URL),
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Post
```javascript
{
  title: String,
  content: String,
  author: String,
  image: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Message
```javascript
{
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Example Frontend Integration

### JavaScript/Fetch
```javascript
// Login
const loginResponse = await fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'password123'
  })
})
const { token } = await loginResponse.json()
localStorage.setItem('token', token)

// Get Projects with Token
const projectsResponse = await fetch('http://localhost:5000/api/admin/projects', {
  headers: { 'Authorization': `Bearer ${token}` }
})
const projects = await projectsResponse.json()

// Submit Contact Form
await fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    phone: '+1234567890',
    message: 'Hello'
  })
})
```

---

## Development

### Start Development Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Directory Structure
```
├── controllers/      # Route handlers
├── models/          # Mongoose schemas
├── middlewares/     # Express middlewares
├── routes/          # API routes
├── seeds/           # Database seeders
├── server.js        # Main entry point
├── .env             # Environment variables
└── package.json     # Dependencies
```

---

## Deployment

### Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-secret"
git push heroku main
```

### Environment Variables on Production
Ensure all `.env` variables are set on your hosting platform.

---

## License

ISC

---

## Support

For issues or questions, contact: codex7314@gmail.com

---

**Last Updated:** August 2024  
**Version:** 1.0.0
