# ☕ Serverless CoffeeShop Manager

A **serverless coffee inventory management web application** built with **React (Vite)**, **AWS Lambda**, **API Gateway**, **DynamoDB**, and **AWS Amplify**.  
Designed to streamline inventory tracking for small businesses with **real-time CRUD operations, analytics, and cloud deployment**.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Demo](#demo)
- [Setup & Installation](#setup--installation)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## Features

- **Full CRUD Operations:** Add, view, edit (price only), and delete coffee items.  
- **Search & Sorting:** Quickly find items and sort by name, price, or stock.  
- **Analytics Dashboard:** Visual representation of inventory trends.  
- **Serverless Backend:** AWS Lambda + DynamoDB for scalable and cost-efficient backend.  
- **Frontend Deployment:** Hosted on AWS Amplify for fast, reliable access.  
- **CORS Handling:** Fully functional API integration across frontend and backend.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | AWS Lambda, API Gateway |
| Database | AWS DynamoDB |
| Deployment | AWS Amplify |
| Other | Serverless Architecture, REST APIs, JSON |

---

## Architecture
Amplify  →  API Gateway → Lambda Functions → DynamoDB 

- **React Frontend:** User interface, search, sorting, analytics, and CRUD forms.  
- **API Gateway:** Exposes serverless endpoints for frontend communication.  
- **Lambda Functions:** Handles business logic for CRUD operations.  
- **DynamoDB:** Stores coffee inventory data in a scalable, low-maintenance NoSQL database.  

---

## Demo

**Live App:** https://main.d2gxmbwi92c52j.amplifyapp.com/  

**Screenshots / GIFs:**  
1. Add & Edit Coffee Item  
2. Search & Sort Inventory  
3. Analytics Dashboard  

---

## Setup & Installation

**Prerequisites:** Node.js, npm, AWS account  

1. Clone the repository:  
```bash
git clone https://github.com/Yash-R09/serverless-coffee-shop.git
cd serverless-coffee-shop

2. Install Dependencies:
cd frontend
npm install

3. Configure AWS Amplify (if deploying locally):
amplify init
amplify push

4.Run Locally:
npm run dev

## Future Enhancements
• Add Authentication & Role-Based Access (AWS Cognito)
• Serverless notifications for low stock items
• Improved analytics with AWS QuickSight
• CI/CD for automated deployments

---

## Author
Yash - www.linkedin.com/in/yash-rasal-660703387
