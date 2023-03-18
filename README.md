<div  align="center">
  <img src="https://res.cloudinary.com/dynonary/image/upload/v1678890436/print-solution/logo.png" width="60px" alt="Logo" />
</div>

<br />
<h1 align="center">Print Solution System</h1>

> Print Solution System - Hệ thống quản lý đặt in ấn online hiệu quả, tiết kiệm.

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

## 📃 Auto run via Shell Script

> 🐧 Bắt buộc dùng qua terminal của **`Linux, Unix, WSL`**

```sh
  cd scripts
  # Chạy lệnh bên dưới nếu chưa install (re-install) package
  chmod +x ./auto-run.sh
  ./auto-run.sh

  # Hoặc nếu đã install
  chmod +x ./pm2-start.sh
  ./pm2-start.sh
```

- Sau khi đã start các server, sử dụng **[`pm2`](https://pm2.keymetrics.io/docs/usage/quick-start/)** để quản lý trạng thái.

```sh
  pm2 list # Hiển thị danh sách các services
  pm2 kill # Xóa tất cả services
  pm2 stop all # Dừng tất cả service đang chạy
  pm2 reset all # Reset tất cả
  pm2 restart all # Restart all service sau khi stop
  pm2 [option] [service-name] # Áp dụng cho từng service
```

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
  cd services/[service-name]
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
  // Apollo server for GraphQL server
  "@apollo/server": "^4.5.0",
  "graphql": "^16.6.0",
  // Websocket for subscription graphql
  "ws": "^8.8.0",
  "graphql-ws": "^5.9.0",
  // GraphQL with Typescript
  "type-graphql": "^2.0.0-beta.1",
  "@graphql-tools/schema": "^9.0.17",
  "class-validator": "^0.14.0",
  "reflect-metadata": "^0.1.13",
  // Auto reload dev server
  "nodemon": "^2.0.21",
  "ts-node-dev": "^2.0.0",
  "tsc-alias": "^1.8.3",
  "tsconfig-paths": "^4.1.2"
```
