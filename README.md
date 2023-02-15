# To-do List x Sequelize
![image](https://github.com/vdiefn/todo-sequelize/blob/main/todo-sequelize.jpg)
![image](https://github.com/vdiefn/todo-sequelize/blob/main/todo-sequelize-2.jpg)

## 功能

* 使用者可於註冊帳號後開始使用，註冊的資料包括：名字、email、密碼。

* 使用者也可以透過使用 Facebook 帳號登入。

* 該網站可以：
1. 新增代辦事項
2. 可以瀏覽代辦事項
3. 更新代辦事項
4. 刪除代辦事項


## 開發工具
- Node.js
- Express@4.16.4
- Express-handlebars@3.0.0
- dotenv@16.0.3
- Method-override@3.0.0
- Express-session@1.17.1
- Passport@0.4.1
- Passport-local@1.0.0
- Connect-flash@0.1.1
- Bcrypt.js@2.4.3
- Passport-Facebook@3.0.0
- sequelize@5.21.13
- sequelize-cli@5.5.1

## 使用資料庫
- SQL

## 開始使用
- clone專案至電腦
- 進入專案資料夾
- 專案下載完成後輸入：
```javascript
npm install
```
- 安裝完成後依序安裝開發工具
- 新增.env檔案設定環境變數，可於.env.example內看到更多環境變數的設定。
- 啟動程式請輸入：
```javacript
npm run dev
```
- 成功啟動後會於終端機看到：App is running on http://localhost:3000!
- 於瀏覽器輸入下方網址後可開始使用：
```javacript
http://localhost:3000
```
- 如欲停止運行請使用 Ctrl+C 來停止程式運作
