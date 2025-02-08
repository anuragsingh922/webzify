# **Webzify**

## **Project Overview**

This project is a **MERN stack-based theme selection system** that allows users to select their website preferences from dropdowns and view relevant template images based on assigned tags. The frontend dynamically fetches and updates images from the backend without requiring a page refresh.

## **Tech Stack**

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Package Manager**: npm

## **Features**

✅ Two dropdown menus for selecting website preferences:

- **Website Type**: E-commerce, Service-Based, Informative
- **Design Tone**: Professional, Playful and Chill, Relax

✅ Displays **approved** template images based on user selections.  
✅ Real-time updates without page refresh.  
✅ Responsive UI with smooth transitions.

## **Folder Structure**

```
/project-root
│── /client  (Frontend - React)
│── /server  (Backend - Node.js & Express)
│── README.md  (Project Documentation)
```

---

## **Installation & Start (Single Command)**

Run the following command from the project root to install dependencies and start both frontend & backend:

```sh
cd server && npm install && cd ../client && npm install && cd ../server && npm start & cd ../client && npm run dev
```

- **Client (Frontend)** runs on **http://localhost:3000/**
- **Server (Backend)** runs on **http://localhost:5000/**

---

## **API Endpoints**

### **For Users**

| Method | Endpoint                   | Description                                        |
| ------ | -------------------------- | -------------------------------------------------- |
| GET    | `/api/images/get-approved` | Fetch approved images based on dropdown selections |

### **For Admins**

| Method | Endpoint                             | Description              |
| ------ | ------------------------------------ | ------------------------ |
| POST   | `/api/images/get-approved/new-image` | Add a new image          |
| PATCH  | `/api/images/get-approved`           | Update an existing image |
| DELETE | `/api/images/get-approved`           | Delete an image          |

---

## **Database Schema (MongoDB)**

**Collection Name**: `images`

| Field         | Data Type | Description                                  |
| ------------- | --------- | -------------------------------------------- |
| `_id`         | ObjectId  | Auto-generated unique identifier             |
| `imageUrl`    | String    | URL of the uploaded image                    |
| `websiteType` | String    | "Ecommerce", "Service-Based", "Informative"  |
| `designTone`  | String    | "Professional", "Playful and Chill", "Relax" |
| `status`      | String    | "Approved" / "Pending"                       |
| `uploadDate`  | Date      | Timestamp when the image was uploaded        |

---

## **Contributors**

👤 Anurag

For any questions or issues, feel free to contact me on **[LinkedIn](https://www.linkedin.com/in/anuragsingh922/)** or via **[Email](mailto:anuragjadu922@gmail.com) `anuragjadu922@gmail.com`**
