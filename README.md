# Outerspace Index Handler

## Introduction

The **Outerspace Index Handler** is a Node.js script designed to extract topic information from the forums on [outerspace.com.br](https://www.outerspace.com.br) and insert it into a Supabase database. This data is then available for display on a frontend application. The project is structured to efficiently handle web scraping, database interactions, and logging.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Development](#development)
- [Task Management](#task-management)
- [Version Control](#version-control)
- [Contributors](#contributors)
- [License](#license)

## Installation

To get started with the **Outerspace Index Handler**, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/diegopeixoto/outerspace-index.git
   cd outerspace-index
   git checkout handler
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Update the `.env` file with your configuration details.

## Usage

You can use the following scripts to manage the project:

- **Build the project**:

  ```sh
  npm run build
  ```

- **Start the project**:
  ```sh
  npm start
  ```

These commands handle the process of building, starting, and developing the project using Rollup for bundling.

## Features

The **Outerspace Index Handler** includes the following features:

- **Web Scraping**: Extracts topic information from the forums on outerspace.com.br using the `cheerio` library.
- **Database Interaction**: Inserts the extracted information into a Supabase database using `@supabase/supabase-js`.
- **Environment Configuration**: Manages sensitive information using the `dotenv` library.
- **HTTP Requests**: Fetches forum data using `node-fetch`.
- **Logging**: Logs various events and errors with the `winston` library.
- **Build and Deployment**: Bundles the project with Rollup for easy deployment.

## Project Structure

The project is organized as follows:

- **Configuration Files**:

  - `.env` and `.env.example` for environment variables.
  - `eslint.config.mjs` for ESLint configuration.
  - `rollup.config.mjs` for Rollup configuration.

- **Source Code**:

  - Located in the `src/` directory.
  - Subdirectories for configuration, services, and utilities.

- **Main Entry Point**:
  - The main script is located at `src/index.js`.

## Dependencies

### Main Dependencies

- **@supabase/supabase-js**: For interacting with the Supabase database.
- **cheerio**: For parsing and manipulating HTML.
- **dotenv**: For loading environment variables from a `.env` file.
- **node-fetch**: For making HTTP requests.
- **winston**: For logging.

### Development Dependencies

- **ESLint and Prettier**: For code linting and formatting.
- **Rollup Plugins**: For handling CommonJS, JSON, and node resolution in the build process.

## Configuration

The project uses environment variables for configuration. Make sure to update the `.env` file with your database credentials and other necessary configuration details.

## Development

For development, use the `npm run dev` script. This command will build the project and start it, enabling a seamless development workflow.

### Linting and Formatting

The project is configured with ESLint and Prettier. To check for code style issues, run:

```sh
npm run lint
```

## Task Management

Task management is integral to the project, tracking changes, improvements, and updates. Typical tasks include:

- Refactoring code
- Adding new features
- Updating dependencies

## Version Control

The project uses Git for version control. Ensure you follow best practices when committing changes, such as writing descriptive commit messages and using branches for feature development.

## Contributors

- [**Diego Peixoto**](https://github.com/diegopeixoto)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
