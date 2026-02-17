# Medico - Medical Management System

Medico is a comprehensive medical management system that provides separate interfaces for healthcare providers (admins) and patients to manage medical records, prescriptions, and reports.

## 🚀 Features

### For Healthcare Providers (Admin)
- **Patient Management**: Register new patients and manage patient information
- **Dashboard**: View and update patient details in real-time
- **Prescription Management**: Create, edit, and delete prescriptions
- **Medical Reports**: Upload, manage, and organize patient medical reports
- **Secure Access**: Role-based authentication system

### For Patients (User)
- **Personal Dashboard**: View personal medical information
- **Prescription Access**: View current medication prescriptions
- **Report Viewer**: Access and download medical reports
- **Secure Portal**: Private access to personal health data


## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps for frontend

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_URI=http://localhost:<Port-Number>
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

### Installation Steps for backend

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT = <Port-Number>
   MONGO_URI = <MongoDb Connection String>
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
## 📋 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎯 Usage Guide

### Initial Setup
1. **Access the Application**: Open your browser and navigate to `http://localhost:3000`
2. **Role Selection**: Choose between "Healthcare Provider" or "Patient" role
3. **Authentication**:
   - **Healthcare Providers**: Login with admin credentials
   - **Patients**: Automatic login with patient role

### For Healthcare Providers

#### Patient Registration
1. Navigate to Patient Registration page
2. Fill in patient details:
   - Patient ID (unique identifier)
   - Full Name
   - Age and Gender
   - Contact Information (Address, Email, Phone)
3. Submit to register new patient

#### Patient Dashboard
1. Enter Patient UID on verification page
2. Access comprehensive patient information
3. Update individual fields with real-time saving
4. Manage prescriptions and medical reports

#### Prescription Management
- Add new prescriptions with medication details
- Edit existing prescriptions
- Delete prescriptions when needed
- View prescription history

#### Medical Reports
- Upload medical reports (PDF, PNG, JPG, JPEG)
- Organize reports with custom names
- Edit report information
- Delete reports as needed

### For Patients

#### Patient Dashboard
1. Enter your Patient UID
2. View personal medical information
3. Access prescriptions and medical reports
4. Read-only access to health data

#### Prescription Access
- View current medication prescriptions
- See dosage and instructions
- No editing capabilities (read-only)

#### Medical Reports
- View available medical reports
- Download reports in original format
- Organized by report name and upload date

## 🔐 Authentication & Security

- **Role-based Access Control**: Separate interfaces for admins and patients
- **Token-based Authentication**: JWT tokens for secure API calls
- **Patient UID Verification**: Required for accessing patient data
- **Local Storage**: Secure storage of authentication tokens

## 🎨 Styling & UI

- **Component-specific CSS**: Each component has dedicated stylesheet
- **Responsive Design**: Mobile-friendly interfaces
- **Consistent Icons**: SVG icons throughout the application
- **Loading States**: Visual feedback for async operations
- **Error Handling**: User-friendly error messages

## 🔄 State Management

- **React Context**: For authentication and global state
- **Local State**: Component-specific state using useState hook
- **API Integration**: Axios for HTTP requests
- **Loading States**: Comprehensive loading indicators


## 📦 Dependencies

### Main Dependencies
- `react` - Frontend framework
- `react-router-dom` - Routing
- `axios` - HTTP client
- `context API` - State management

### Development Dependencies
- Create React App toolchain
- Testing utilities
- Build optimization tools

## 🔧 Configuration

### Environment Variables
- `REACT_APP_URI`: Backend API base URL
- `PORT` : Port where backend must run
- `MONGO_URI` : MongoDB database url

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Requires JavaScript enabled

