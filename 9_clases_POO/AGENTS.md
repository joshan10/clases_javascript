# AI Agent Instructions

This repository is an educational project focusing on Object-Oriented Programming (POO - Programación Orientada a Objetos) using Vanilla JavaScript and Vanilla Node.js.

## Global Context
*   **Language:** JavaScript (CommonJS for backend).
*   **Domain:** Educational Student Management System.
*   **Spoken Language:** Spanish. All variables, comments, messages, and class names MUST be in Spanish to maintain consistency with the educational materials.

## Code Conventions
*   **Backend:** Uses pure Node.js native modules (`http`, `fs`, `path`). Do **NOT** install or use external frameworks like Express.js unless explicitly requested.
*   **Frontend:** Pure vanilla HTML, CSS, and JavaScript. No React/Vue/Angular.
*   **Architecture:** The project follows a simple MVC-like structure where domains are split into:
    *   Models (`backend/modelo/*.js`): Represent the OOP schemas and entities (Persona, Estudiante, etc.). Uses `class` syntax, private fields (`#`), and inheritance (`extends`).
    *   Data (`backend/datos/estudiantes.json`): Represents the persistent layer.
    *   Controllers / Logic: Included in `app.js` and pure JS logic files (`gestionarEstudiante.js`, etc.).

## Common Commands
*   **Start the backend server:** `node backend/app.js`

## Do's and Don'ts
*   **DO** use strict OOP principles: encapsulate data with private properties (`#`) and provide getters/setters when modifying models. 
*   **DO** write clear, educational comments explaining *why* a piece of code works (in Spanish), as this is an educational project.
*   **DON'T** introduce heavy dependencies (no `npm install` necessary for standard flow).
*   **DON'T** use ES Modules (`import`/`export`) in the backend; stick to CommonJS (`require`/`module.exports`) as currently configured in `package.json`.
