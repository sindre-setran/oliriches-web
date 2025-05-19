# Next.js 15 + Sanity Boilerplate

A boilerplate setup for a website built with **Next.js 14** and **Sanity** as a CMS. This repository is meant to serve as a base for new projects, making it easy to start development with a structured setup.

## Features

- **Next.js 14** (App Router) with **TypeScript** for building fast and modern websites
- **Sanity CMS** integration for flexible and scalable content management as well as GROQ-powered webhooks to trigger rebuilds on content updates
- Basic folder and file structure for a scalable project
- Environment variables for easy configuration

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 18+)
- **NPM** or **Yarn**
- **Sanity CLI** (run `npm install -g @sanity/cli` if not already installed)

### 1. Clone the Repository

Clone this boilerplate repository to create a new project:

```bash
git clone <repository-url> my-new-project
cd my-new-project
```

Replace `<repository-url>` with the URL of this boilerplate repository. `my-new-project` can be any name you choose for your new project folder.

#### Remove Existing Git History

To start with a completely fresh Git history and remove the connection to the original repository:

1. **Delete the `.git` directory**:
   ```bash
   rm -rf .git
   ```

Now you're ready to start development without any connections to the original boilerplate repository.

### 2. Install Dependencies

```bash
# with npm
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project. Add the following environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
SANITY_REVALIDATE_SECRET=your_revalidate_secret
NEXT_PUBLIC_BASE_URL=default_site_url
```

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID. You can find this in your Sanity project settings.
- `NEXT_PUBLIC_SANITY_DATASET`: The Sanity dataset you're using (e.g., `production`, `staging`, etc.).
- `SANITY_REVALIDATE_SECRET`: Secret token for Sanity webhooks
- `NEXT_PUBLIC_BASE_URL`: The base URL of your Next.js application.

> **Note**: For security, never commit your `.env.local` file to version control.

### 4. Sanity Setup

1. Create a new Sanity project and copy the project ID into `.env.local`.
2. Configuring Sanity webhooks:
   - Go to the API section of your Sanity project on sanity.io/manage
   - Click "Create webhook"
   - Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
   - Dataset: Choose desired dataset or leave at default "all datasets"
   - Trigger on: "Create", "Update", and "Delete"
   - Filter: Leave empty
   - Projection: {\_type, "slug": slug.current}
   - Status: Enable webhook
   - HTTP method: POST
   - HTTP Headers: Leave empty
   - API version: v2021-03-25
   - Include drafts: No
   - Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random secret if you haven't yet, for example by running `Math.random().toString(36).slice(2)` in your console)
   - Save the cofiguration
   - Add the secret to Vercel

### 5. Run the Development Server

Now you’re ready to start the development server:

```bash
# back in the root directory
cd ..
npm run dev
```

This should start both the Next.js server and the Sanity Studio if configured. Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/admin](http://localhost:3000/admin) to see your application.

---

## Deployment

This project can be deployed on **Vercel**, **Netlify**, or any other platform that supports Next.js.

1. Set up your Sanity API token and project details as environment variables in your deployment platform.
2. Deploy the Next.js app and configure the necessary environment variables on your chosen platform.
