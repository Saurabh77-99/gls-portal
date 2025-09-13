## Getting Started

You will need .env.local file in the project which will have following details:

```bash
MONGODB_URI = "mongodb+srv://username:password@cluster0.jhbbojy.mongodb.net/glsplacement?retryWrites=true&w=majority"
JWT_SECRET = "your_jwt"
NODE_ENV = "development"
```

After cloning this repo, git clone `url`:

```bash
pnpm install 
```

for seeding data in mongodb database:

```bash
pnpm run seed
```

for running the project:

```bash
pnpm dev
```

