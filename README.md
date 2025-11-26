# Photo Gallery

A modern photo gallery application built with Next.js 16, featuring image uploads via Cloudinary and a PostgreSQL database powered by Prisma 7.

## Features

- 📸 Photo upload and management with Cloudinary integration
- 💬 Comment system for photos
- 🗄️ PostgreSQL database with Prisma ORM
- 🎨 Styled with Tailwind CSS and Ant Design components
- ⚡ Built with Next.js 16 App Router
- 🔄 Real-time updates with React 19

## Tech Stack

- **Framework:** Next.js 16.0.4
- **React:** 19.2.0
- **Database:** PostgreSQL
- **ORM:** Prisma 7.0.1 with pg adapter
- **Image Storage:** Cloudinary
- **Styling:** Tailwind CSS 4 + Ant Design 6
- **Language:** TypeScript

## Prerequisites

- Node.js 20+ 
- PostgreSQL database
- Cloudinary account

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd photo-gallery
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=photo_gallery

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Set up the database

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev
```

Or reset the database if needed:

```bash
npx prisma migrate reset
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Photo Model
- `id`: String (CUID)
- `title`: String
- `imageData`: Text (Cloudinary URL)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `comments`: Comment[] (relation)

### Comment Model
- `id`: String (CUID)
- `content`: Text
- `photoId`: String (foreign key)
- `photo`: Photo (relation)
- `createdAt`: DateTime

## API Routes

### Photos
- `GET /api/photos` - Get all photos with comments
- `POST /api/photos` - Create a new photo

### Comments
- `POST /api/photos/[id]/comments` - Add a comment to a photo

## Project Structure

```
photo-gallery/
├── prisma/
│   ├── schema.prisma          # Prisma schema definition
│   └── migrations/            # Database migrations
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   └── photos/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── CommentSection.tsx
│   │   ├── PhotoCard.tsx
│   │   └── PhotoUpload.tsx
│   ├── lib/
│   │   ├── cloudinary.ts     # Cloudinary configuration
│   │   └── prisma.ts         # Prisma client instance
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── prisma.config.ts          # Prisma configuration
└── package.json
```

## Development

### Prisma Studio

Open Prisma Studio to view and edit your database:

```bash
npx prisma studio
```

### Build for production

```bash
npm run build
npm start
```

## Notes

- This project uses Prisma 7 with the PostgreSQL adapter (`@prisma/adapter-pg`)
- The database schema is configured to use a custom schema named `photo_gallery`
- Cloudinary is used for image storage and transformation
- The application uses Next.js 16 App Router with React Server Components

## License

MIT
