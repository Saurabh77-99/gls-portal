## 🚀 Getting Starteddd

Follow these steps to get the project up and running on your local machine.

### 1\. Installation

First, clone the repository to your local machine:

```bash
git clone <your-repository-url>
cd <repository-folder>
```

Next, install the project dependencies using pnpm:

```bash
pnpm install
```

### 2\. Environment Variables

Create a file named `.env.local` in the root of your project and add the following variables.

```env
# Replace with your actual MongoDB connection string
MONGODB_URI="mongodb+srv://username:password@cluster0.jhbbojy.mongodb.net/glsplacement?retryWrites=true&w=majority"

# A long, random, and secure string for signing JWTs
JWT_SECRET="your_super_secure_jwt_secret_key_here"

# The API key required for all admin-level API endpoints
ADMIN_API_KEY="admin_secret_key_123"

# Set the environment (usually 'development' for local)
NODE_ENV="development"
```

### 3\. Database Seeding

Run the seed script to populate your database with initial data, including sample recruiters and students. This is essential for your first run.

```bash
pnpm run seed
```

-----

## Running the Application

Start the Next.js development server:

```bash
pnpm dev
```

The application will now be available at the following URLs:

  * **Landing & Login Page**: `http://localhost:3000`
  * **Recruiter Dashboard**: `http://localhost:3000/dashboard` (Requires login)

### 🔑 Default Credentials

Use these credentials to test the application after seeding the database.

  * **Admin API Key**
      * **Header Name**: `X-Admin-Key`
      * **Header Value**: `admin_secret_key_123`
  * **Recruiter Access Codes**
      * `admin123`
      * `recruiter2024`
      * `startup123`

-----

## 📊 Excel Data Import

You can add student data in bulk using the Excel import feature, which has two methods.

### Workflow Overview

1.  **Download Template**: Get the correctly formatted `.xlsx` template.
2.  **Fill Data**: Populate the template with student information.
3.  **Import**: Upload the file via the command line or the API.

### Method 1: Command Line Script (Recommended)

This method is robust and provides detailed feedback, making it ideal for large datasets.

1.  **Download the Template**
    Use an API client like Postman or `curl` to download the template.

    ```bash
    curl -H "X-Admin-Key: admin_secret_key_123" \
         http://localhost:3000/api/admin/import/template \
         -o template.xlsx
    ```

2.  **Fill the Template**
    Open `template.xlsx` and fill in the student data according to the format below.

3.  **Run the Import Script**
    Execute the script from your terminal, pointing to your filled Excel file.

    ```bash
    # Basic import
    pnpm run import-students students.xlsx

    # Preview changes without saving to the database
    pnpm run import-students students.xlsx --dry-run

    # Delete all existing students before importing
    pnpm run import-students students.xlsx --clear
    ```

### Method 2: Web API Endpoint

You can also upload the Excel file directly to the API.

```bash
curl -X POST "http://localhost:3000/api/admin/import/excel" \
     -H "X-Admin-Key: admin_secret_key_123" \
     -F "file=@students.xlsx" \
     -F "clearExisting=false"
```

### 📋 Excel Template Format

| Column Name | Required | Example | Description |
| :--- | :---: | :--- | :--- |
| Name | ✅ | Aarav Patel | Student's full name |
| Branch | ✅ | Computer Science & Engineering | Academic branch |
| Batch | ✅ | 2022-26 | Academic year range |
| Semester | ✅ | 7 | Current semester (1-8) |
| Specialization | ✅ | AI/ML | Area of specialization |
| CGPA | ✅ | 9.1 | Current CGPA (0-10) |
| Email | ✅ | student@gls.edu.in | Contact email |
| Phone | ✅ | +91 9123456789 | Phone number |
| Skills | ❌ | Python, React, Node.js | Comma-separated skills |
| Achievements | ❌ | Batch Topper, Hackathon Winner| Comma-separated achievements |
| Tags | ❌ | AI/ML, High CGPA | Comma-separated tags for filtering |
| Resume URL | ❌ | `https://drive.google.com/...` | Link to resume PDF |
| Profile Photo | ❌ | `https://example.com/photo.jpg`| Profile picture URL |

-----

## 🔧 API Endpoints Summary

### Public APIs

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check to confirm the server is running. |
| `POST` | `/api/auth/login` | Recruiter login with an access code. |
| `POST` | `/api/auth/logout` | Clears the JWT cookie to log out. |

### Recruiter APIs (Requires JWT Bearer Token)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/students` | Get all students with optional filters. |
| `GET` | `/api/students/search` | Search students by name. |
| `GET` | `/api/students/:id` | Get specific student details by ID. |
| `GET` | `/api/students/:id/resume` | Download a student's resume. |

### Admin APIs (Requires `X-Admin-Key` Header)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/students` | Create a new student. |
| `PUT` | `/api/admin/students` | Bulk create or update students from an array. |
| `PUT` | `/api/admin/students/:id` | Update a specific student by ID. |
| `DELETE` | `/api/admin/students/:id` | Delete a student by ID. |
| `GET` | `/api/admin/stats` | Get dashboard statistics. |
| `GET` | `/api/admin/import/template` | Download the Excel template for student import. |
| `POST` | `/api/admin/import/excel` | Upload and import an Excel file. |

-----

## 📁 Folder Structure

```
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication APIs (Recruiter)
│   │   ├── students/      # Public/Recruiter student data APIs
│   │   ├── admin/         # Admin management APIs
│   │   └── health/        # Health check endpoint
│   ├── dashboard/         # Recruiter dashboard UI (protected)
│   └── page.tsx           # Landing/Login page UI
├── lib/
│   ├── auth.ts            # JWT & password utilities
│   ├── db.ts              # MongoDB connection logic
│   └── utils.ts           # Helper & validation functions
├── models/
│   ├── Student.ts         # Mongoose schema for Students
│   ├── Recruiter.ts       # Mongoose schema for Recruiters
│   └── Admin.ts           # Mongoose schema for Admins
├── scripts/
│   ├── seed.ts            # Script to seed initial database data
│   └── importStudents.ts  # Command-line Excel import script
└── types/
    └── index.ts           # TypeScript interfaces and types
```

-----

## 🐛 Troubleshooting

  * **MongoDB Connection Failed**:
      * Verify your `MONGODB_URI` in `.env.local` is correct.
      * Ensure your current IP address is whitelisted in MongoDB Atlas network settings.
  * **Excel Import Errors**:
      * Always use the `--dry-run` flag first to catch validation errors without affecting your database.
      * Ensure the column names in your Excel file exactly match the downloaded template.
  * **Authentication Issues**:
      * Confirm `JWT_SECRET` is set in `.env.local`.
      * For admin APIs, ensure the `X-Admin-Key` header is present and its value matches `ADMIN_API_KEY`.