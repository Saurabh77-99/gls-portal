## Getting Started

You will need `.env.local` file in the project which will have following details:

```bash
MONGODB_URI = "mongodb+srv://username:password@cluster0.jhbbojy.mongodb.net/glsplacement?retryWrites=true&w=majority"
JWT_SECRET = "your_jwt"
NODE_ENV = "development"
```

1) Clone this repo:
```bash
git clone https://github.com/Saurabh77-99/gls-portal.git
```

2) Installing all the dependencies:
```bash
pnpm install 
```

3) for seeding data in mongodb database:
```bash
pnpm run seed
```

4) for running the project:
```bash
pnpm dev
```

