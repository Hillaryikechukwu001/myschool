# QUICK START GUIDE - ESUT CS Platform

## ⚡ Fast Setup (5 minutes)

### 1. Extract Files
Extract the `esut-platform-phase1.tar.gz` file to your project directory

### 2. Install Node.js Packages
```bash
npm install
```

### 3. Setup MySQL Database

**Option A - Using MySQL Command Line:**
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE esut_cs_platform;
quit;
```

```bash
mysql -u root -p esut_cs_platform < database/schema.sql
```

**Option B - Using phpMyAdmin:**
1. Create new database named `esut_cs_platform`
2. Import `database/schema.sql` file

### 4. Configure Environment
Edit the `.env` file with your details:
```env
DB_PASSWORD=your_mysql_password_here
SESSION_SECRET=change_this_to_random_long_string
```

### 5. Create Admin Account
Generate password hash:
```bash
node utils/hashPassword.js admin123
```

Copy the generated hash and run this SQL:
```sql
USE esut_cs_platform;
INSERT INTO users (reg_number, password_hash, full_name, email, level, user_role) 
VALUES ('ADMIN001', 'PASTE_HASH_HERE', 'System Admin', 'admin@esut.edu.ng', '400L', 'admin');
```

### 6. Start Server
```bash
npm start
```

### 7. Access Application
Open browser and go to:
- Main site: http://localhost:3000
- Login: http://localhost:3000/login.html
- Signup: http://localhost:3000/signup.html

## 🎯 Test It Out

### Register a Student:
1. Go to http://localhost:3000/signup.html
2. Fill in:
   - Full Name: Test Student
   - Reg Number: CS/2024/001
   - Level: 200L
   - Password: test123
3. Click "Create Account"

### Login:
1. Go to http://localhost:3000/login.html
2. Use: CS/2024/001 / test123
3. You'll be redirected to the main platform

## 📂 Project Structure
```
esut-platform/
├── config/          # Database connection
├── controllers/     # Business logic
├── database/        # SQL schema
├── middleware/      # Auth protection
├── public/          # Frontend files (HTML, CSS, JS)
├── routes/          # API endpoints
├── utils/           # Helper scripts
├── .env             # Configuration (EDIT THIS!)
├── package.json     # Dependencies
└── server.js        # Main server
```

## ⚙️ Common Issues

**Issue: Can't connect to database**
- Solution: Check MySQL is running, verify .env credentials

**Issue: Port 3000 already in use**
- Solution: Change PORT in .env to 3001 or kill process

**Issue: Session not working**
- Solution: Clear browser cookies, check SESSION_SECRET in .env

## 🔑 Default Credentials

After creating admin:
- Reg Number: ADMIN001
- Password: (whatever you used in hashPassword.js)

## 📞 Next Steps

1. ✅ Test login/signup
2. ✅ Create admin account
3. ⏭️ Phase 2: Add posting functionality
4. ⏭️ Phase 3: Results management
5. ⏭️ Phase 4: Comments & interactions

## 🚀 For Development

Use nodemon for auto-reload:
```bash
npm run dev
```

## 💡 Tips

- Always use HTTPS in production
- Change SESSION_SECRET before deployment
- Keep .env file secure (never commit to git)
- Backup database regularly

---

**Need help?** Check README.md for detailed documentation.
