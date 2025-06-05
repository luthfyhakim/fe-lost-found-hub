# Lost and Found Hub

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About the Project

Lost and Found Hub is a platform designed to help users report and find lost items efficiently. Built with Next.js, it leverages modern web technologies to deliver a seamless user experience.

## Technical Documentation

This section provides a deeper dive into the technical aspects of the Lost and Found Hub project.

### Project Structure

The project follows a modular structure to ensure scalability and maintainability:

```
fe-lost-and-found-hub/
├── app/                # Application pages and components
├── public/             # Static assets
├── components/         # Reusable UI components
├── lib/                # Utility functions and helpers
├── services/           # API service functions
├── .env.example        # Example environment variables file
├── next.config.ts      # Next.js configuration
├── README.md           # Project documentation
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

### Key Technologies

- **Next.js**: Framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed programming language for better code quality.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for API requests.
- **Zustand**: Global State management.

### Environment Variables

The project uses environment variables to manage sensitive data. Create a `.env.local` file in the root directory and define the following variables:

```
NEXT_PUBLIC_API_URL=<backend_api_url>
```

### Deployment Configuration

For production builds, use the following command:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Ensure the environment variables are correctly set in your hosting platform. For Vercel, you can configure them in the project settings.

For further technical details, refer to the inline comments and documentation within the codebase.

## Demo Video

Check out the demo video showcasing the features and functionality of Lost and Found Hub:

[Watch the Demo Video](https://drive.google.com/file/d/1xWqCIhhQ7KOlT7xrzbwv8QqAg5T2IGoc/view?usp=sharing)

## Live Website

You can access the live version of the Lost and Found Hub here:

[Lost and Found Hub Online](https://lostandfound.luthfyhakim.space/)

## Backend Repository

The backend for this project is available on GitHub. You can find it here:

[Lost and Found Hub Backend](https://github.com/luthfyhakim/be-lost-found-hub)

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager
- [pnpm](https://pnpm.io/) or [bun](https://bun.sh/) (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/luthfyhakim/fe-lost-found-hub
cd fe-lost-found-hub
```

2. Install dependencies:

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

Using bun:

```bash
bun install
```

### Running the Development Server

Start the development server with one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Editing the Code

You can start editing the project by modifying the `app/page.tsx` file. The application supports hot-reloading, so your changes will be reflected immediately.

## Learn More

To learn more about Next.js and its features, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive guide to Next.js.
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial for beginners.

You can also explore [the Next.js GitHub repository](https://github.com/vercel/next.js) for additional insights and contribute to the project.

## Deployment

The easiest way to deploy this application is through [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform created by the Next.js team.

For detailed deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Feel free to fork the repository, create a new branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
