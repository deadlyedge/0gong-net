# 0gong-net

0gong-net is a modern e-commerce platform for digital goods, information products, and virtual items. Built with Next.js, React, and Payload CMS, it offers a multi-tenant architecture allowing users to create their own stores and sell digital products seamlessly.

## Features

- User registration and authentication with multi-tenant support (each user can have their own store)
- Product listing with filtering, sorting, and pagination
- Shopping cart and checkout integration with Stripe payment gateway
- Review and rating system for products
- Admin panel powered by Payload CMS for content and user management
- Responsive UI built with Tailwind CSS and Radix UI components
- API powered by tRPC for type-safe client-server communication

## Technology Stack

- Next.js (React framework)
- React 19
- Payload CMS
- tRPC
- Stripe API
- Tailwind CSS
- TypeScript
- Zod for schema validation
- React Hook Form for form management

## Getting Started

### Prerequisites

- Node.js (recommended version)
- MongoDB (for Payload CMS database)
- Stripe account for payment processing

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/0gong-net.git
cd 0gong-net
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables (e.g., MongoDB URI, Stripe keys) in `.env` file.

4. Run database migrations and seed initial data:

```bash
npm run db:fresh
npm run db:seed
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app` - Next.js app routes and pages
- `src/modules` - Feature modules (auth, products, checkout, reviews, tenants, etc.)
- `src/components` - Reusable UI components
- `src/collections` - Payload CMS collections definitions
- `src/lib` - Utility functions and API clients
- `src/trpc` - tRPC client and server setup

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements and bug fixes.

## License

This project is private and not licensed for public use.

## TODO

- [ ] Implement user profile page
- [ ] Add product search functionality
- [ ] Improve error handling and user feedback
- [ ] Optimize performance for large datasets
- [ ] Add unit and integration tests
- [ ] Implement internationalization (i18n) support
- [ ] Add more detailed documentation and code comments
- [ ] Find a better way to accept payments
- [ ] "take fees" need more test
