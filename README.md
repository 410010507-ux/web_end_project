# 活動報名與名單管理系統

主題：活動管理（Events）＋報名名單管理（Registrations），完成前後端串接並提供完整 CRUD 操作。

## 功能概覽

### Events

* 建立活動（Create）
* 取得活動列表（Read all）
* 取得單筆活動（Read single）
* 更新活動（Update）
* 刪除活動（Delete）

### Registrations

* 對指定活動新增報名（Create）
* 取得指定活動的報名清單（Read all by event）
* 更新報名狀態（Update）
* 刪除報名資料（Delete）

---

## 技術選型

### 前端（Frontend）

* React + Vite
* react-router-dom
* axios
* CSS

### 後端（Backend）

* Node.js + Express
* mongoose
* dotenv
* cors、morgan

### 資料庫（Database）

* MongoDB

---

## 專案結構

```
web_end_project/
  frontend/
    src/
      api/
        client.js
        events.api.js
        registrations.api.js
      components/
      pages/
        EventsListPage.jsx
        EventCreatePage.jsx
        EventEditPage.jsx
        EventDetailPage.jsx
        RegistrationsPage.jsx
      router/
      styles/
      App.jsx
      main.jsx
  backend/
    src/
      config/
        db.js
      controllers/
        eventController.js
        registrationController.js
      middlewares/
      models/
        Event.js
        Registration.js
      routes/
        eventRoutes.js
        registrationRoutes.js
      app.js
      server.js
  docs/
    api-spec.md
    architecture.md
    flowchart.md
  README.md
```

---

## 環境需求

* Node.js
* npm
* MongoDB Atlas

---

## 安裝與執行

### 1) Clone 專案

```bash
git clone https://github.com/410010507-ux/web_end_project.git
cd web_end_project
```

### 2) 後端設定與啟動（backend）

進入後端資料夾並安裝套件：

```bash
cd backend
npm install
```

建立 `backend/.env`：

```env
PORT=4000
MONGO_URI=你的Mongo連線字串
```

啟動後端（開發模式）：

```bash
npm run dev
```

成功啟動後會看到類似：

* MongoDB connected
* Server running on [http://localhost:4000](http://localhost:4000)

健康檢查（瀏覽器或 Postman）：

* `GET http://localhost:4000/api/health`

### 3) 前端設定與啟動（frontend）

開另一個終端機：

```bash
cd frontend
npm install
```

建立 `frontend/.env`：

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

啟動前端：

```bash
npm run dev
```

Vite 會顯示本機網址，例如：

* `http://localhost:5174/`（你的畫面目前就是 5174）

---

## 使用方式（操作流程）

1. 進入「活動列表」查看所有活動
2. 點「新增活動」建立活動
3. 進入活動「查看」頁面，可看到活動資訊與報名名單區塊
4. 在該活動頁面新增報名，並可更新報名狀態（registered / cancelled）或刪除報名
5. 回到活動列表可編輯或刪除活動

---

## API 概要（後端端點）

> Base URL：`http://localhost:4000/api`

### Health

* `GET /health`：API 是否正常

### Events

* `POST /events`
* `GET /events`
* `GET /events/:id`
* `PUT /events/:id`
* `DELETE /events/:id`

### Registrations

* `POST /events/:eventId/registrations`
* `GET /events/:eventId/registrations`
* `PUT /registrations/:id`
* `DELETE /registrations/:id`

完整規格與範例請見：`docs/api-spec.md`

---

## 統一回應格式

成功：

```json
{
  "success": true,
  "message": "OK",
  "data": {},
  "error": null
}
```

失敗：

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "details": ["..."]
  }
}
```

---

## 資料庫設計（MongoDB Collections）

### Event

* title（String, required）
* description（String）
* date（Date, required）
* location（String, required）
* quota（Number, required, min 1）
* status（published / closed）
* timestamps（createdAt/updatedAt）

### Registration

* eventId（ObjectId ref Event, required, index）
* name（String, required）
* email（String, required, lowercase）
* phone（String）
* note（String）
* status（registered / cancelled）
* unique index：`(eventId, email)` 
* timestamps（createdAt/updatedAt）

---

## 文件與展示

* API 規格文件：`docs/api-spec.md`
* 架構說明：`docs/architecture.md`
* CRUD 流程圖：`docs/flowchart.md`

