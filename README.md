# group-buying service

## Objective and Motivation


The repo provides the backend system for **group-buying** system.

The **group-buying** system is aims to address the challenges faced during office group purchases. It is designed to effectively handle the intricacies of splitting bills during group buying.

The **group-buying** system includes features such as an office group purchase expense splitting system. Users can create a list of frequently used store menus. Group members can select their desired items, set a deadline for order submission, and the organizer can verify if payments have been received from group members. Additionally, users can view the status of past orders.

[enter the website](http://138.2.12.55:3000/)

---

## Installation


```bash
# clone repo
git clone https://github.com/charis-wang/group-buying-service.git

# change directory to the folder of repo
cd group-buying-service 

# install required modules
npm install
```

---

## Usage

```bash
npm start
```

---

## Features

- Related to account
  |method|URL|description|
  |---- |----  |---- |
  |POST|/account/signup/|user registration|
  |POST|/account/login |user login|
  |POST|/account/logout |user logout|
  |GET|/account/info|to get user info upon login|
  |GET|/account/myOrders|looking up orders of the user ｜

- Related to shops
  |method|URL|description|
  |---- |----  |---- |
  |GET|/shop|fetching the shop|
  |GET|/shop/shop_options|fetching options of whole shops|

- Related to menus
  |method|URL|description|
  |---- |----  |---- |
  |GET|/menu|fetching menu|

- Related to orders
  |method|URL|description|
  |---- |----  |---- |
  |POST|/order/create|creating an group-buying order|
  |GET|/order|fetching the group-buying order|
  |GET|/order/update|updating group-buying order status|
  |POST|/order/order_item|adding the item(s) to shopping cart|
  |GET|/order/order_item|fetching the item(s) to shopping cart|
  |DELETE|/order/order_item|deleting the item(s) to shopping cart|
  |POST|/order/payment_status|updating personal order payment status|

- Related to editing shop with its menu
  |method|URL|description|
  |---- |----  |---- |
  |POST|/shop_with_menu|update the shop with its menu|
  |DELETE|/shop_with_menu| delete the shop with its menu|

---

## 動機與目的

此專案為提供**group-buying**系統之後端。

**group-buying**系統 以解決辦公室團購時的困擾為出發點，希望團購時能有效處理分帳瑣事，因而著手建立辦公室團購分帳系統。

**group-buying**系統可自行建立常用店家菜單，團員能自行點選所需品項，設定團購收單截止時間，主揪能確認是否收到團員的款項，各使用者也能查看歷史訂單狀態。

[進入網站](http://138.2.12.55:3000/)

---

## 安裝


```bash
# 下載repo
git clone https://github.com/charis-wang/group-buying-service.git

# 切換至repo之資料夾
cd group-buying-service 

# 安裝所需模組
npm install
```

---

## 使用方法

```bash
npm start
```

---



## 功能列表



- account
  
  | 方法 | URL | 描述 |
  |---- |----  |---- |
  |POST|/account/signup/|使用者註冊|
  |POST|/account/login |使用者登入|
  |POST|/account/logout |使用者登出|
  |GET|/account/info|取得使用者登入資訊|
  |GET|/account/myOrders|查看使用者店家|

- shops
  
  | 方法 | URL | 描述 |
  |---- |----  |---- |
  |GET|/shop|查看一店家|
  |GET|/shop/shop_options|查看所有可選擇之店家|

- menus

  | 方法 | URL | 描述 |
  |---- |----  |---- |
  |GET|/menu|查看菜單|

- orders
  
  | 方法 | URL | 描述 |
  |---- |----  |---- |
  |POST|/order/create|建立團購表單|
  |GET|/order|瀏覽一團購表單|
  |GET|/order/update|更新團購表單之狀態|
  |POST|/order/order_item|將指定品項加入購物車|
  |GET|/order/order_item|查看購物車之品項|
  |DELETE|/order/order_item|刪除購物車之品項|
  |POST|/order/payment_status|更新團員訂購後之付款裝態|

- shop with its menu
  
  | 方法 | URL | 描述 |
  |---- |----  |---- |
  |POST|/shop_with_menu|更新一商店及菜單|
  |DELETE|/shop_with_menu|刪除單一商店及菜單|
