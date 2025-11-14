# YCA API Documentation

## Overview

The Young Chakma Association (YCA) API provides a comprehensive backend service for managing users, zones, branches, news/events, and authentication. Built with Node.js, Express.js, and MongoDB.

## Base URL
```
https://your-railway-app.railway.app/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "membershipType": "student",
  "zone": "zone_id",
  "branch": "branch_id",
  "dateOfBirth": "1990-01-01",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member",
      "membershipType": "student",
      "zone": "zone_id",
      "branch": "branch_id"
    }
  }
}
```

#### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update User Details
```http
PUT /api/auth/updatedetails
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "phone": "+1234567890",
  "address": "Updated Address",
  "profileImage": "image_url"
}
```

#### Update Password
```http
PUT /api/auth/updatepassword
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

### Zone Routes (`/api/zones`)

#### Get All Zones
```http
GET /api/zones
```

**Response:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "zone_id",
      "name": "Mizoram Zonal HQ",
      "description": "Zone description",
      "headquarters": "Aizawl",
      "region": "Mizoram",
      "coordinator": {
        "name": "Coordinator Name",
        "email": "coordinator@example.com"
      },
      "branchCount": 5,
      "isActive": true
    }
  ]
}
```

#### Get Single Zone
```http
GET /api/zones/:id
```

#### Get Zone Branches
```http
GET /api/zones/:id/branches
```

#### Get Zones with Branches
```http
GET /api/zones/with-branches
```

#### Create Zone (Admin Only)
```http
POST /api/zones
Authorization: Bearer <admin_token>
```

#### Update Zone (Admin Only)
```http
PUT /api/zones/:id
Authorization: Bearer <admin_token>
```

#### Delete Zone (Admin Only)
```http
DELETE /api/zones/:id
Authorization: Bearer <admin_token>
```

### Branch Routes (`/api/branches`)

#### Get All Branches
```http
GET /api/branches
```

**Response:**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "_id": "branch_id",
      "name": "Central Branch",
      "description": "Main branch description",
      "zone": {
        "name": "Central Zone HQ",
        "headquarters": "Dhaka"
      },
      "president": {
        "name": "President Name",
        "email": "president@example.com"
      },
      "secretary": {
        "name": "Secretary Name",
        "email": "secretary@example.com"
      },
      "established": "2020-01-01",
      "memberCount": 150,
      "isActive": true
    }
  ]
}
```

#### Get Branches by Zone
```http
GET /api/branches/zone/:zoneId
```

#### Get Branches Grouped by Zones
```http
GET /api/branches/grouped-by-zones
```

#### Get Single Branch
```http
GET /api/branches/:id
```

#### Create Branch (Admin Only)
```http
POST /api/branches
Authorization: Bearer <admin_token>
```

#### Update Branch (Admin Only)
```http
PUT /api/branches/:id
Authorization: Bearer <admin_token>
```

#### Delete Branch (Admin Only)
```http
DELETE /api/branches/:id
Authorization: Bearer <admin_token>
```

### News & Events Routes (`/api/news`)

#### Get All News/Events
```http
GET /api/news?page=1&limit=10&category=announcements&type=event
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `type`: Filter by type (news/event)
- `zone`: Filter by zone
- `branch`: Filter by branch
- `search`: Search in title/content
- `sort`: Sort by (newest/oldest/popular)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [
    {
      "_id": "news_id",
      "title": "Annual General Meeting",
      "content": "Full article content...",
      "excerpt": "Short description...",
      "category": "announcements",
      "type": "event",
      "author": {
        "name": "Author Name",
        "email": "author@example.com"
      },
      "zone": {
        "name": "Central Zone"
      },
      "images": ["image1.jpg", "image2.jpg"],
      "tags": ["meeting", "annual"],
      "views": 150,
      "likes": [
        {
          "user": "user_id",
          "_id": "like_id"
        }
      ],
      "comments": [
        {
          "user": {
            "name": "Commenter Name",
            "email": "commenter@example.com"
          },
          "content": "Great event!",
          "createdAt": "2023-10-15T10:30:00Z"
        }
      ],
      "isPublished": true,
      "createdAt": "2023-10-10T09:00:00Z"
    }
  ]
}
```

#### Get Single News/Event
```http
GET /api/news/:id
```

#### Create News/Event (Admin/Executive Only)
```http
POST /api/news
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Event Title",
  "content": "Full content...",
  "excerpt": "Short description",
  "category": "announcements",
  "type": "event",
  "zone": "zone_id",
  "branch": "branch_id",
  "images": ["image1.jpg"],
  "tags": ["tag1", "tag2"],
  "isPublished": true
}
```

#### Update News/Event
```http
PUT /api/news/:id
Authorization: Bearer <token>
```

#### Delete News/Event
```http
DELETE /api/news/:id
Authorization: Bearer <token>
```

#### Like/Unlike News
```http
PUT /api/news/:id/like
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/news/:id/comments
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "content": "This is my comment"
}
```

#### Get Comments
```http
GET /api/news/:id/comments
```

## Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['member', 'executive', 'admin'], default: 'member'),
  membershipType: String (enum: ['student', 'professional']),
  zone: ObjectId (ref: 'Zone'),
  branch: ObjectId (ref: 'Branch'),
  dateOfBirth: Date,
  phone: String,
  address: String,
  profileImage: String,
  isActive: Boolean (default: true),
  createdAt: Date
}
```

### Zone Model
```javascript
{
  name: String (required),
  description: String,
  headquarters: String,
  region: String,
  coordinator: ObjectId (ref: 'User'),
  established: Date,
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  isActive: Boolean (default: true),
  createdAt: Date
}
```

### Branch Model
```javascript
{
  name: String (required),
  description: String,
  zone: ObjectId (ref: 'Zone', required),
  president: ObjectId (ref: 'User'),
  secretary: ObjectId (ref: 'User'),
  established: Date,
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  memberCount: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date
}
```

### News Model
```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String,
  category: String,
  type: String (enum: ['news', 'event']),
  author: ObjectId (ref: 'User', required),
  zone: ObjectId (ref: 'Zone'),
  branch: ObjectId (ref: 'Branch'),
  images: [String],
  tags: [String],
  views: Number (default: 0),
  likes: [{
    user: ObjectId (ref: 'User'),
    createdAt: Date (default: Date.now)
  }],
  comments: [{
    user: ObjectId (ref: 'User'),
    content: String (required),
    createdAt: Date (default: Date.now)
  }],
  isPublished: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "count": 10,
  "pagination": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Applied to all API routes

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization
- Rate limiting

## Environment Variables

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
MONGODB_URI=your-mongodb-connection-string
FRONTEND_URL=https://your-frontend-domain.com
PORT=3000
```

## Testing the API

You can test the API endpoints using tools like:
- Postman
- Insomnia
- curl commands
- Browser for GET requests

Example curl command:
```bash
curl -X GET "https://your-api-url.com/api/zones" \
  -H "Content-Type: application/json"
