# Front-end Project: E-commerce

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

This is a project for the Integrify Academy Frontend module. The task was to create an e-commerce website using API endpoints from [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/).

## Table of contents
- [Technologies](#technologies)
- [Features](#features)
- [Project overview](#project-overview)
- [Running the project](#running-the-project)
- [Deployment](#deployment)
- [To do](#to-do)

## Technologies

- Typescript
- React
- Redux toolkit (+ RTK query)
- Jest
- MUI
- SASS

## Features

(* not implemented in UI/optional)

### User (unregistered/not logged in)
- able to view all product listings (all or by category)
- able to sort(by price) and filter products
- able to view single product page
- able to register
- able to log in
	#### Logged in user
	- able to view own account details
	- *able to modify email, password, name and avatar(?) for self
	- able to log out
	- *able to delete account
	- able to create cart
	- able to update cart
	- able to check out cart
	#### Admin
  - able to modify products (create, update, delete)
  - *able to view all users (all details but password)
  - *able to delete users
  - *able to modify user roles

### Product: 
- can be viewed as list (all/by category)
- can be viewed individually
- can be sorted (by price)
- can be filtered
- can be added to cart(by logged in user)
- can be created, modified and deleted (by admin)

### Category:
- can be viewed as list

### Cart:
- can be created
- can be modified (add cart item, update cart item quantity, delete cart item)
- can be checked out
- can be deleted

## Project overview

### Folder structure

- vertical structure

````
.
├── README.md
├── readme_images
├── public
|
├── src
|   ├── index.tsx
|   ├── App.tsx
|   ├── app
|   |   ├── store.ts
|   |   ├ ...
|   ├── shared
|   |   ├ ...
|   ├── features
|       ├── products
|       |   ├ ...
|       ├── users
|       |   ├ ...
|       ├── credentials
|       |   ├ ...
|       ├── cart
|       |   ├ ...
|       ├── categories
|           ├ ...
├── .gitignore
├── .tsconfig
├── package.json
````

### Functions

- needs to be updated

![Diagram](readme_images/E-commerceDiagram.png)

### Flowchart

![Flowchart](readme_images/E-commerceFlowchart.png)

## Running the project

Requirements: Node

After cloning the project run `npm install` in project directory.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Launches the test runner in the interactive watch mode

## Deployment

Deployed with Netlify at [courageous-palmier-3375a6.netlify.app](courageous-palmier-3375a6.netlify.app)

## To do (final week)
- UI
	- urgent
		- [x] admin functionalities: create product
		- [x] hide cart icon when not logged in
		- [x] hide admin page
		- [x] change no matches alert (+ redux)
	- fixes
		- [ ] create product success and error message
		- [ ] product updated success message
		- [ ] reset after checkout
		- [ ] edit product quantity in cart with input field
		- [ ] registration link on login page
		- [ ] show several pictures in single product page
	- small fixes
		- [ ] reposition filter button
		- [ ] AppBar heading: styling and link
		- [x] default profile image is oval
		- [ ] footer position
		- [ ] style: after profile logout + after registering + not authorized
		- [ ] headings for several pages
	- to develop further (optional)
		- [ ] reusable components e.g. dialog, unauthorized page...
		- [ ] better exception handling & ErrorPage
		- [ ] cart style
		- [ ] product card style and content
		- [ ] products page mobile layout
		- [ ] dropdown menu for category change in product page
		- [ ] pagination
		- [ ] ability to choose avatar or product images (now hardcoded)
		- [ ] admin functionalities: manage users
		- [ ] component testing
- redux
	- to develop further
		- [ ] Error to AxiosError
		- [ ] RTK query: tests for retreiving single product
		- [ ] refine tests
		- [ ] better error messages for UI
		- [ ] store persist
		- [ ] rename credentialsReducer?
- general
	- [ ] deployment
	- [ ] cleanup/lint
	- [ ] revise README
