# Feedback Analysis Web Application

## Overview

This web application allows users to register, provide feedback on products or services, and view in-depth analyses. The system leverages artificial intelligence to determine whether the feedback is positive, negative, or neutral, providing detailed insights on key aspects of the feedback.

## Features

- **User Registration & Login:** Secure authentication using JWT.
- **Feedback Submission:** Users can easily submit feedback through a dynamic form.
- **Dashboard:** View past feedback and related analyses in a user-friendly interface.
- **Sentiment Analysis:** Automatic sentiment categorization of feedback with detailed insights.
- **Visual Analytics:** Display results in the form of graphs and reports for better understanding.

## Technologies Used

### Front-End

- **Angular** + **TypeScript**
  - User registration and login pages.
  - Dynamic user dashboard for viewing past feedback and analyses.
  - Angular services to communicate with the backend REST API.
  - Data binding and reusable components for a seamless user experience.

### Back-End

- **Node.js** + **Express.js**
  - RESTful API for user management and feedback handling.
  - JWT for secure user authentication.
  - Middleware for security (Helmet.js and CORS).

### Artificial Intelligence

- **AWS Lambda** + **Sentiment Analysis API**
  - AWS Lambda to integrate AI for sentiment analysis using services like AWS Comprehend or Azure Cognitive Services.
  - Use of AWS S3 for storage of processed feedback reports and generated files.

### Database

- **AWS RDS (PostgreSQL/MySQL)**
  - Storage for user data and feedback entries.
  - Use of SQL queries to filter feedback based on specific criteria.
  - ORM like Prisma for database management.

### Deployment

- **Hosting:**
  - Frontend on **AWS S3** for static content management, with **AWS CloudFront** as CDN for global distribution.
  - Backend on **AWS EC2** or **AWS Elastic Beanstalk**.
  
- **Continuous Integration/Continuous Deployment:**
  - **GitHub Actions** for CI/CD to automate deployment processes.

## Architecture

1. **Client (Angular):** Users access the app, authenticate, and provide feedback through an intuitive interface.
2. **Backend API (Node.js + Express.js):** Receives and processes feedback requests, forwarding analysis requests to AWS Lambda.
3. **AWS Lambda + AI Service:** Processes feedback and interacts with the sentiment analysis API, sending results back to the backend.
4. **Database (AWS RDS):** Stores all feedback and analysis results.
5. **Storage (AWS S3):** Saves automatically generated content, such as analysis reports, for user access.

## Development Steps

1. **Project Setup:**
   - Configure Angular project with Angular CLI.
   - Set up Node.js backend with Express.js.

2. **Authentication Implementation:**
   - Use JWT for user management.
   - Create registration and login modules in the frontend.

3. **Feedback Management:**
   - Implement backend CRUD operations for feedback.

4. **Sentiment Analysis:**
   - Set up AWS Lambda to process feedback and invoke the AI service.

5. **Database Connection:**
   - Configure AWS RDS and connect the backend for storing feedback and results.

6. **Deployment and Automation:**
   - Host frontend on AWS S3 and backend on AWS EC2/Elastic Beanstalk.
   - Utilize GitHub Actions for automated deployments.

## Benefits of This Project

- **Full-Stack Capability:** Demonstrates end-to-end development skills from UI to database management and AI integration.
- **Cloud-Native Architecture:** Shows ability to create scalable applications using AWS services.
- **AI and Data Analysis:** Utilizes advanced technologies for extracting valuable insights from user feedback.
- **User Experience & Visual Analytics:** Offers a clear and engaging user interface with visual representations of data.

## Cost Considerations

AWS provides many services under a free tier, including Lambda, S3, RDS with PostgreSQL, and EC2, allowing you to develop this project without additional costs initially. Note that AWS Comprehend may incur costs for advanced analyses, but alternative free options like open-source models hosted on EC2 can be explored for initial development.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
