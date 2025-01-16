# Animal Finder

## Author
Cecilia Egevad

## Description
Animal Finder is a fullstack web application that helps pet owners locate their missing animals by creating and managing missing pet advertisements. Users can view listings, create posts about missing pets, and engage with the community through comments.

## Features
- **Missing Pet Listings**: Browse a comprehensive list of missing animals
- **User Authentication**: Secure login system for managing pet listings
- **Dynamic navbar**: Responsive navigation bar that adapts based on authentication status
- **Ad Management**: Create, update, and delete missing pet advertisements
- **Community Engagement**: Comment system with customizable user avatars
- **Detailed Pet Information**: Include animal type, description, name, location, date missing, and images
- **Responsive Design**: Mobile-friendly interface built with React Bootstrap

## Technologies Used
### Backend 
- ASP.NET Core Web API 
- Entity Framework 
- SQL Server (localDb) 
- Identity & JWT Authentication.

### Frontend
- React 
- React Bootstrap 
- SCSS
- React Icons 
- Axios for API communication.

### Development Tools
- Visual Studio (Backend) 
- Visual Studio Code (Frontend).

## Pages & Navigation

### Pages with Public Access
  - **Home**: Browse missing pet listings with detailed modal views.
  - **Register**: Create account with name, email, and password.
  - **Login**: Secure authentication system

### Pages for Authenticated Users**:
  - **My Animals**: Manage personal pet listings and avatar settings.
  - **Add New Animal**: Add new pet ad.
  - **Update Animal**: Edit existing pet ad.
  - **All animals**: View complete listing with commenting capability

## Getting Started
### Prerequisites
- .NET 6.0 or later
- Node.js and npm
- SQL Server LocalDB

### Installation
Clone the repository from Github.
#### Backend Setup
1. Open the backend solution in Visual Studio
2. Write "update-database" in the Package Manager Console. LocalDb AnimalDb should be created.
3. Run the application. Swagger should open in a browser.

#### Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies with "npm install"
3. Start the development server with "npm start". The app will open in your browser at http://localhost:3000

## Test Data
You can create a new account to test the application. The application also comes with pre-seeded data for testing (located in ApplicationDbContext).

### Sample Data Includes
- 5 users
- 8 missing animal posts
- 20 comments
- Various animal types (dogs, cats, turtles, etc.)

### Test Users Password
All seeded users have the same password: Password123!

### Available test accounts:
user1@example.com (John Doe)
user2@example.com (Jane Smith)
user3@example.com (Alice Johnson)
user4@example.com (Bob Brown)
user5@example.com (Charlie Davis)









