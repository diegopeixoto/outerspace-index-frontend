# Outerspace Index Frontend

![License](https://img.shields.io/github/license/diegopeixoto/outerspace-index-frontend)
![Issues](https://img.shields.io/github/issues/diegopeixoto/outerspace-index-frontend)
![Forks](https://img.shields.io/github/forks/diegopeixoto/outerspace-index-frontend)
![Stars](https://img.shields.io/github/stars/diegopeixoto/outerspace-index-frontend)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Outerspace Index Frontend is a web application built using Next.js, a powerful React framework designed for building server-side rendered (SSR) and statically generated web applications. The project is implemented with TypeScript, styled using Tailwind CSS, and leverages various modern libraries and tools to enhance the user experience and performance.

The application serves as an index for topics in the Outer Space forums, featuring interactive elements like a Like button and other social functions. It integrates with Supabase for backend services, including database management and user authentication.

## Features

- **Server-Side Rendering**: Built with Next.js to deliver fast, SSR and statically generated pages.
- **TypeScript**: Ensures type safety and improves development experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **State Management**: Managed through React's Context API.
- **Animations**: Smooth animations using Framer Motion.
- **Backend Integration**: Supabase for database management and user authentication.
- **Data Fetching**: Efficient data fetching with TanStack Query (React Query) and custom hooks.
- **Security**: Browser fingerprinting using FingerprintJS.

## Project Structure

```plaintext
outerspace-index-frontend/
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── .eslintrc.json         # ESLint configuration
├── package.json           # Project dependencies and scripts
├── src/
│   ├── app/
│   │   └── page.tsx       # Main page component
│   ├── components/        # React components directory
│   ├── context/           # Context providers directory
│   ├── hooks/             # Custom hooks directory
├── public/
│   └── assets/            # Static assets (images, etc.)
```

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/diegopeixoto/outerspace-index-frontend.git
   cd outerspace-index-frontend
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or with yarn:

   ```bash
   yarn install
   ```

   Or with pnpm:

   ```bash
   pnpm install
   ```

   Or with bun:

   ```bash
   bun install
   ```

## Usage

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### Linting and Formatting

To lint the code:

```bash
npm run lint
```

To format the code:

```bash
npm run format
```

## Configuration

### Next.js Configuration

- **Image Optimization**: Configured in `next.config.mjs` to allow loading images from specific remote patterns.

### Tailwind CSS Configuration

- Custom configurations are defined in `tailwind.config.ts`.

### TypeScript Configuration

- TypeScript settings and paths are configured in `tsconfig.json`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements, bug fixes, or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
