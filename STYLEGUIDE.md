# Women Techmakers Bamenda Community Backend Coding Style Guide

Welcome to the Women Techmakers Bamenda (WTM Bamenda) community's backend coding style guide. This document outlines the coding conventions and best practices to follow when contributing to our backend projects. Consistency in coding style helps maintain code readability and makes collaboration smoother.

## Table of Contents
- [General Guidelines](#general-guidelines)
- [JavaScript](#javascript)
- [Node.js and Express.js](#nodejs-and-expressjs)
- [Database](#database)
- [API Design](#api-design)
- [Testing](#testing)
- [Naming Conventions](#naming-conventions)
- [Version Control](#version-control)
- [Dependencies](#dependencies)
- [Additional Resources](#additional-resources)

## General Guidelines

- Write clean, readable, and maintainable code.
- Keep your code DRY (Don't Repeat Yourself) by reusing code when applicable.
- Use meaningful variable and function names.
- Avoid commented-out code in the repository; use version control for historical code.

## JavaScript

- Follow [ESLint](https://eslint.org/) rules for JavaScript code quality.
- Use semicolons at the end of statements.
- Use single quotes for strings unless interpolating variables.
- Use `const` for variables that do not need reassignment, `let` for variables that do.
- Use arrow functions for concise anonymous functions.

   ```javascript
   // Good
   const age = 30;
   const name = 'Alice';

   // Avoid
   var x = 10;

## Node.js and Express.js

- Adhere to the [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) guidelines.
- Organize your code into separate modules and follow the CommonJS module pattern.
- Use Express.js for RESTful APIs and follow RESTful conventions for routes and HTTP methods.

   ```javascript
    // Example of a RESTful route
   app.get('/api/users', (req, res) => {
   // ...
   });

## Database

- Use an ORM (Object-Relational Mapping) or a database library to interact with the database.
- Document the database schema and update it as needed.

## API Design

- Follow API design best practices, including versioning, proper HTTP status codes, and clear documentation.
- Document your APIs using tools like [Swagger](https://swagger.io/) or [API Blueprint](https://apiblueprint.org/).
- Include information on request and response payloads, authentication, and endpoints.

## Testing

- Write unit tests using a testing framework like [Jest](https://jestjs.io/).
- Aim for a high test coverage to ensure code reliability.

## Naming Conventions

- Use descriptive and meaningful names for variables, functions, and files.
- Follow naming conventions like camelCase or snake_case consistently.

## Version Control

- Use [Git](https://git-scm.com/) for version control.
- Create feature branches for each new feature or bug fix.
- Write meaningful commit messages that summarize the changes.

## Dependencies

- Document and keep track of project dependencies in a `package.json` file.
- Regularly update dependencies to benefit from security patches and new features.

## Additional Resources

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
  
