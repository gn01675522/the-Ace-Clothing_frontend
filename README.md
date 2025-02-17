### 🗂️ 索引
- [💡 專案概述](#-專案概述)
- [🖥️ Demo: https://the-ace-clothing.netlify.app/](#️-demo-httpsthe-ace-clothingnetlifyapp)
- [📦 專案結構](#-專案結構)
- [📖 技術棧](#-技術棧)
- [✨ 核心功能](#-核心功能)
  - [⭐️ 專案未來規劃](#️-專案未來規劃)
    - [前台](#前台)
    - [後台](#後台)
- [💥 使用方式](#-使用方式)
- [📆 Time Line](#-time-line)

## 💡 專案概述

本專案為練習用作品，以服飾為主題，專注實現電商介面流程與功能，並藉以學習 React 與其相關生態系套件，也是我自學前端開發以來，第一個自主規劃及開發的專案。
目前整體功能稍嫌陽春，因後端 API 是由 Bootcamp 提供，無法全面實現心中所想。故目前正在製作後端當中，並會於其後擴展前端專案，藉以實現更為完整的功能。

## 🖥️ Demo: https://the-ace-clothing.netlify.app/

部署於 [Netlify](https://www.netlify.com/)

## 📦 專案結構

```
├── __mocks__
├── .github
├── config
├── doc
├── public
└── src
    ├── assets
    └── components ✨共用元件資料夾
    │   └── __tests__ ✨單元測試資料夾
    ├── layouts
    ├── pages
    │   └── page
    │       ├── components ✨page 專屬元件資料夾
    │       ├── page.component.tsx
    │       └── page.style.scss
    ├── routes
    ├── shared ✨共用 types、enum、interface 資料夾
    ├── store ✨Redux-toolkit 狀態管理資料夾
    ├── stylesheets
    ├── utils
    └── App.tsx

```

## 📖 技術棧

- [TypeScript](https://www.typescriptlang.org/) - JavaScript 超集，提供靜態型別檢查。
- [React.js](https://reactjs.org/) - 熱門前端函式庫。
- [React Router](https://reactrouter.com/) - React 生態系套件之一，為 React 提供靈活且方便使用的路由功能。。
- [Redux-toolkit](https://redux-toolkit.js.org/) - Redux 的官方抽象層，擁有非常強大的狀態管理功能。
- [SCSS](https://sass-lang.com/) - CSS 的擴展語言，使樣式撰寫更有結構且易於維護。
- [React Hook Form](https://react-hook-form.com/) - 提供整合性高且靈活易擴展的表單管理工具。
- [Webpack](https://webpack.js.org/) - 老牌，且高度客製化的打包工具。
- [Jest](https://jestjs.io/) - 熱門的 JavaScript 測試框架。
- [Testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) - 針對 React 設計，專注於元件的行為與互動的測試套件。
- [Github Actions](https://docs.github.com/en/actions) - Github 之自動化集成服務，提供自動化軟體的構建、測試、部署以及其他工作流程。


## ✨ 核心功能

- 商品展示與分類，User 可透過相對應的分類前往該分類之商品。
- User 可透過點擊單一產品進入商品詳情頁面，並可將其加入購物車，以及選擇數量。
- User 可以將購物車內的商品，進行數量修改或移除，並實時更新價格與數量，計算總金額。
- 提供結帳功能生成訂單，並可透過 email 方式查詢訂單。
- 提供後台管理系統，提供管理者新增或修改商品、優惠券、訂單功能。

### ⭐️ 專案未來規劃

#### 前台
- 新增會員系統，並整合目前訂單查詢功能。
- 串接金流，優化整體結帳流程。
- 介面優化。

#### 後台
- 增加各式銷售統計圖表。
- 增加員工、客戶等人員管理介面。
- 增加任務管理。

## 💥 使用方式

1. 請以下列指令進行專案 clone
```bash
$ git clone "https://github.com/gn01675522/the-Ace-Clothing_frontend.git"
```
2. 使用下列指令安裝必要套件
```bash
$ npm i
```
3. 使用下列指令開啟專案
```bash
$ npm start
```



## 📆 Time Line

<div style="border-left: 2px solid #ccc; padding-left: 10px;">
  <div style="margin-bottom: 20px;">
    <strong>2023-04-05</strong>
    <p>專案啟動，並同步學習相關技能。</p>
  </div>
  <div style="margin-bottom: 20px;">
    <strong>2023-09-27</strong>
    <p>專案第一版完成。</p>
  </div>
  <div style="margin-bottom: 20px;">
    <strong>2024-11-04</strong>
    <p>新開 repository，並將原先舊有 CRA 專案遷移至此，以及邊學習 TypeScript 邊重構整體專案。</p>
  </div>
  <div style="margin-bottom: 20px;">
    <strong>2025-01-06</strong>
    <p>遷移及重構完成。</p>
  </div>
  <div style="margin-bottom: 20px;">
    <strong>2025-01-24</strong>
    <p>學習 Github actions 以及單元測試，並進行相關建置。</p>
  </div>
  <div style="margin-bottom: 20px;">
    <strong>2025-02-15</strong>
    <p>完成基礎 Github actions 以及單元測試建置。</p>
  </div>
</div>