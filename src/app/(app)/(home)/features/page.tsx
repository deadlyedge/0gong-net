const featuresContent = [
  {
    title: "User Registration & Multi-Tenant Support",
    description:
      "Allows users to register, authenticate, and create their own stores within the platform.",
  },
  {
    title: "Product Listing & Filtering",
    description:
      "Browse digital goods with powerful filtering, sorting, and pagination features.",
  },
  {
    title: "Shopping Cart & Stripe Checkout",
    description:
      "Seamless shopping cart experience integrated with Stripe payment gateway for secure transactions.",
  },
  {
    title: "Review & Rating System",
    description:
      "Users can leave reviews and ratings for products to help others make informed decisions.",
  },
  {
    title: "Admin Panel with Payload CMS",
    description:
      "Manage content, users, and products efficiently through a robust admin interface powered by Payload CMS.",
  },
  {
    title: "Responsive UI",
    description:
      "Built with Tailwind CSS and Radix UI components to ensure a smooth experience across devices.",
  },
  {
    title: "Type-Safe API with tRPC",
    description:
      "Client-server communication is type-safe and efficient using tRPC.",
  },
];

const Page = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Platform Features</h1>
      <ul className="space-y-6">
        {featuresContent.map(({ title, description }) => (
          <li key={title} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
