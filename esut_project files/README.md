# ESUT Computer Science Department Platform

A comprehensive information platform for ESUT Computer Science students and lecturers.

## Features

### Phase 1 - Authentication ✅
- Student registration with registration number
- Login/Logout functionality
- Lecturer, HOD, and Admin roles
- Session management
- Password hashing with bcrypt

### Planned Features
- Announcements feed
- Results management
- Marketing forum
- Textbook exchange
- Decision room for management

## Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Session**: Express-session
- **Security**: bcryptjs for password hashing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE esut_cs_platform;
```

2. Run the schema file:
```bash
mysql -u root -p esut_cs_platform < database/schema.sql
```

Or manually execute the SQL in `database/schema.sql`

### Step 3: Environment Configuration

1. Copy the `.env` file and update it with your credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=esut_cs_platform
SESSION_SECRET=your_random_secret_key_here
PORT=3000
NODE_ENV=development
```

**Important**: Change `SESSION_SECRET` to a long random string!

### Step 4: Create Admin Account

After running the schema, you need to create an admin account:

```sql
-- First, generate a password hash
-- You can use an online bcrypt generator or this Node.js code:
```

Run this in Node.js to generate password hash:
```javascript
const bcrypt = require('bcryptjs');
const password = 'admin123'; // Change this!
bcrypt.hash(password, 10).then(hash => console.log(hash));
```

Then insert into database:
```sql
INSERT INTO users (reg_number, password_hash, full_name, email, level, user_role) 
VALUES ('ADMIN001', 'YOUR_GENERATED_HASH', 'System Administrator', 'admin@esut.edu.ng', '400L', 'admin');
```

### Step 5: Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3000`

## File Structure

```
esut-cs-platform/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   └── authController.js    # Authentication logic
├── database/
│   └── schema.sql          # Database schema
├── middleware/
│   └── authMiddleware.js   # Authentication middleware
├── public/
│   ├── index.html          # Main platform page
│   ├── login.html          # Login page
│   ├── signup.html         # Signup page
│   ├── auth-styles.css     # Auth pages styles
│   ├── login.js            # Login functionality
│   ├── signup.js           # Signup functionality
│   ├── styles.css          # Main platform styles
│   └── script.js           # Main platform JavaScript
├── routes/
│   └── authRoutes.js       # Authentication routes
├── .env                    # Environment variables
├── package.json            # Dependencies
├── server.js               # Main server file
└── README.md               # This file
```

## API Endpoints

### Authentication

**Register (Student)**
- **POST** `/api/auth/register`
- Body: `{ reg_number, password, full_name, email, phone, level }`

**Login**
- **POST** `/api/auth/login`
- Body: `{ reg_number, password }`

**Logout**
- **POST** `/api/auth/logout`

**Get Current User**
- **GET** `/api/auth/me`
- Requires authentication

**Change Password**
- **POST** `/api/auth/change-password`
- Body: `{ current_password, new_password }`
- Requires authentication

## User Roles

1. **Student** - Can view announcements, post in marketing/textbook forums
2. **Lecturer** - Can post announcements, view all content
3. **HOD** - All lecturer permissions + manage department, post results
4. **Admin** - Full system access

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- Session-based authentication
- Protected routes with middleware
- SQL injection prevention with parameterized queries
- XSS protection through input validation

## Database Schema

### Users Table
- Registration number (unique)
- Password (hashed)
- Full name, email, phone
- Level (100L - 400L)
- User role (student, lecturer, hod, admin)
- Profile picture
- Timestamps

### Other Tables (Phase 2+)
- Posts (announcements, marketing, textbooks)
- Comments
- Results
- Notifications
- Lecturers (additional lecturer info)

## Next Steps (Phase 2)

1. Implement posting system
2. Add comments functionality
3. File upload for images/PDFs
4. Results management
5. Real-time notifications
6. Profile management
7. Search functionality

## Testing

### Test Student Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "reg_number": "CS/2020/001",
    "password": "student123",
    "full_name": "John Doe",
    "email": "john@example.com",
    "level": "200L"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "reg_number": "CS/2020/001",
    "password": "student123"
  }'
```

## Troubleshooting

### Database Connection Error
- Check MySQL is running: `sudo systemctl status mysql`
- Verify credentials in `.env` file
- Ensure database exists: `SHOW DATABASES;`

### Port Already in Use
- Change PORT in `.env` file
- Or kill process: `lsof -ti:3000 | xargs kill`

### Session Issues
- Clear browser cookies
- Check SESSION_SECRET is set in `.env`

## Contributing

This is a university project. For issues or suggestions, contact the development team.

## License

MIT

## Contact

ESUT Computer Science Department
Technology for Service
