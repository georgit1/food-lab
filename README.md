# FoodLab App

![FoodLab Mockups](/public/mockup.png)

## Overview

Welcome to FoodLab, your personalized nutrition companion! FoodLab is a feature-rich food app designed to help you manage and monitor your nutrition intake. Whether you're a fitness enthusiast, health-conscious individual, or just curious about your nutrient consumption, FoodLab has you covered.

## Features

### 1. Access Levels

- **No Account Access:** Explore the app with limited access.
- **Logged In Access:** Unlock additional features, pages, and the ability to create and manage personal foods.

### 2. Food Database

- **Predefined Foods:** Explore a rich database of predefined foods with detailed nutrient data.
- **Personal Foods:** Create, update, or delete your own foods.

### 3. Nutrient Calculation

- **Personalized Calculations:** Calculate nutrient needs based on biometric data and activity levels.
- **Detailed Nutrient Data:** Access comprehensive nutrient information for each food item.

### 4. Details Page

- **In-Depth Information:** Click on a specific food to view detailed nutrient information.

### 5. Meal Management

- **Create Meals:** Combine multiple food items into a meal.
- **CRUD Operations:** Manage your meals with Create, Read, Update, and Delete operations.

### 6. Compare Foods

- **Nutrient Comparison:** Select two food items and compare their nutrient content.
- **Additional Calculations:** Calculate additional values based on the selected foods such as score and health rating.

### 7. Food Calculator Page

- **Total Nutrient Calculation:** Select food items and meals to calculate overall nutrient values.
- **Visual Representation:** View nutrient data with tables and charts for easy understanding.

## Demo App

Explore the features of FoodLab by trying out the [Demo App](https://food-lab1.vercel.app).

## Getting Started

### Prerequisites

**Node version 19.x.x**

### Cloning the repository

```shell
git clone https://github.com/georgit1/food-lab.git
```

### Install packages

```shell
npm i
```

### Setup .env file

```js
DATABASE_URL=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

NEXT_PUBLIC_ADMIN_ID=
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
