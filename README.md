# React Task Management Application

A professional, full-featured task management application built with React. The application allows authenticated users to create, manage, filter, sort, and organize their daily tasks through a clean, responsive, and intuitive interface.

## 🔗 Live Demo

**Coming soon**

## ✨ Features

### 🔐 Authentication & Protected Routes

* Secure authentication flow for user access.
* Protected routes ensure that only authenticated users can access their task management features.

### ✅ Task Management

* Create new tasks.
* View existing tasks.
* Update task information.
* Delete tasks.
* Mark tasks as complete or incomplete.

### 🔎 Filtering, Searching & Sorting

* Filter tasks based on completion status.
* Search tasks using text input.
* Sort tasks alphabetically.
* Sort tasks by date.

### 🛡️ Input Validation

* Client-side validation for task input.
* Maximum input-length restrictions.
* Sanitization of user-provided content to help prevent unsafe data from being stored or rendered.

### 📱 Responsive Design

The interface is designed to provide a consistent experience across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Desktop screens

### ♿ Accessibility & User Experience

* Visible focus states for interactive elements.
* Hover and interaction states provide visual feedback.
* Responsive layouts improve usability across screen sizes.

---

## 🛠️ Technologies Used

| Technology          | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| **React 18**        | Frontend UI library                             |
| **React Router v7** | Application routing and protected routes        |
| **Vite**            | Development server and production build tooling |
| **CSS Modules**     | Component-scoped styling                        |
| **JavaScript**      | Application logic                               |
| **Google Fonts**    | Typography using Playfair Display               |

### React Concepts Used

The application demonstrates several core React concepts, including:

* Functional components
* React Hooks
* `useReducer` for centralized state management
* Custom Hooks
* Component composition
* Conditional rendering
* Controlled form inputs
* React Router
* State-driven UI updates

---

## 🚀 Getting Started

Follow the instructions below to run the project locally.

### Prerequisites

Before installing the project, make sure you have the following installed:

* [Node.js](https://nodejs.org/) version 18 or higher
* npm, which is included with Node.js
* Git

You can verify your installed versions with:

```bash
node --version
npm --version
git --version
```

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/D-Edwards03/todo-list.git
```

#### 2. Navigate into the project directory

```bash
cd todo-list
```

#### 3. Install dependencies

```bash
npm install
```

#### 4. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, typically:

```text
http://localhost:5173
```

Open the URL in your browser to use the application.

---

## 📜 Available Scripts

The following npm scripts are available:

### `npm run dev`

Starts the Vite development server.

```bash
npm run dev
```

Use this command during development. Vite provides fast module updates as changes are made to the application.

### `npm run build`

Creates an optimized production build.

```bash
npm run build
```

The generated production files are placed in the `dist` directory.

### `npm run preview`

Runs a local server using the production build.

```bash
npm run preview
```

This is useful for verifying the production build locally before deployment.

---

## 🎨 Design Decisions

### CSS Modules

CSS Modules were chosen to keep component styles isolated from the rest of the application.

Styles are colocated with their respective components where appropriate, which helps:

* Prevent global class-name collisions.
* Keep styles organized.
* Improve component maintainability.
* Make it easier to understand which styles belong to each component.

### Typography & Visual Design

The application uses **Playfair Display** to create an elegant and professional visual style.

Interactive elements include:

* Hover states
* Visual transitions
* Scale transformations
* Focus indicators

These interactions provide users with visual feedback while navigating the application.

### Custom Hooks

Custom Hooks are used to extract reusable application logic.

For example, the `useDebounce` Hook helps control how frequently search/filter input is processed while the user is typing.

This can improve the user experience by avoiding unnecessary processing for every individual keystroke.

---

## 📸 Screenshots

### Desktop View

![Desktop View](./src/assets/Desktop.png)

### Mobile View

![Mobile View](./src/assets/Mobile.png)

---

## 🔮 Future Improvements

The following features could be added in future versions:

### Drag-and-Drop Reordering

Allow users to manually prioritize tasks by dragging them into a custom order.

### Dark Mode

Implement a global theme system that allows users to switch between light and dark themes.

### Task Categories & Tags

Allow users to organize tasks using categories or tags such as:

* Work
* Personal
* Urgent
* School

### Automated Testing

Introduce automated unit, component, and integration tests to improve reliability and reduce regressions.

### Enhanced Task Management

Potential future functionality includes:

* Task due dates.
* Task priorities.
* Recurring tasks.
* Notifications/reminders.
* More advanced filtering options.

---

## 📄 License

This project is distributed under the **MIT License**.

See the [`LICENSE`](./LICENSE) file for the complete license text.

---

## 📬 Contact

**GitHub:** [@D-Edwards03](https://github.com/D-Edwards03)

