<div  align="center">
  <img src="https://res.cloudinary.com/dynonary/image/upload/v1678890436/print-solution/logo.png" width="60px" alt="Logo" />
</div>

<br />
<h1 align="center">Print Solution System</h1>

> Print Solution System - Hệ thống quản lý đặt in ấn online hiệu quả, tiết kiệm.

<br />

## ℹ️ Thông tin nhóm

- 1612564 - Nguyễn Công Sơn
- 1712149 - Trần Minh Tân
- 18120410 - Phạm Quốc Khánh
- 18120475 - Trần Đức Năng
- 18120488 - Trần Phúc Nguyên
- 18120622 - Lê Văn Trung (Nhóm trưởng)
- 18120634 - Nguyễn Lê Anh Tuấn
- 18120644 - Nguyễn Cát Tường

## 🔥 Prerequisites

- `Nodejs >= 16.8.0`
- `npm >= 8.0` or `yarn >= 1.0`
- `Docker`, `docker compose v2`, `Linux or WSL` (Nếu dùng Docker để chạy)

## 🚀 Run via Docker

...

## ⚙️ Manually Run

### 💫 Frontend

**Run**

```sh
  cd frontend
  cp .env.example .env # Thay đỗi value cần thiết (nếu có)
  yarn install
  yarn dev
```

[Open http://localhost:8080](http://localhost:8000)

**Dependencies**

```js
    // React core
    "react": "^18.2.0",
    "react-dom": "^18.2.0",

    // Kết nối graphQL, Apollo server
    "@apollo/client": "^3.7.10",
    "graphql": "^16.6.0",

    // Kết nối REST API
    "axios": "^1.3.4",

    // UI Library components
    "@mui/material": "^5.11.13",
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@cads-ui/core": "^1.12.11",

    // Icon packs
    "@iconify/react": "^4.1.0",
    "@mui/icons-material": "^5.11.11",

    // State management redux, RTK query for caching REST API
    "@reduxjs/toolkit": "^1.9.3",
    "react-redux": "^8.0.5",

    // Format thời gian
    "moment": "^2.29.4",

    // SEO, tùy chỉnh head tag
    "react-helmet": "^6.1.0",

    // Bundle tool
    "vite": "^4.1.0"
```

### 🔐 Backend Services

**Run**

```sh
  cd services/<service-name>
  cp .env.example .env # Thay đỗi value cần thiết (nếu có)
  yarn install
  yarn dev
```

**Dependencies**

```js
  // Core framework for REST API
  "express": "^4.18.2",
  // Read cookie from client
  "cookie-parser": "^1.4.6",
  // Setup CORS
  "cors": "^2.8.5",
  // Read .env
  "dotenv": "^16.0.3",
  // Alias import path from ../../.. to ~/
  "module-alias": "^2.2.2",
  // Logger
  "morgan": "^1.10.0",
  "winston": "^3.8.2",
  // Auto reload dev server
  "nodemon": "^2.0.21"
```
