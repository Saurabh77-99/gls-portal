#!/bin/bash
set -e

echo "🚀 Running GLS Portal CI/CD Tests Locally..."
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() {
    echo -e "\n${YELLOW}📋 Step: $1${NC}"
    echo "----------------------------------------"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Set environment variables for build
export NODE_ENV=production
export MONGODB_URI="mongodb://localhost:27017/test"
export JWT_SECRET="dummy-jwt-secret-for-build"

# Step 1: Install Dependencies
print_step "Installing dependencies"
if pnpm install --frozen-lockfile; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 2: Run Lint
print_step "Running ESLint"
if pnpm run lint; then
    print_success "Linting passed"
else
    print_error "Linting failed"
    exit 1
fi

# Step 3: Type Check
print_step "Running TypeScript type check"
if pnpm exec tsc --noEmit; then
    print_success "Type check passed"
else
    print_error "Type check failed"
    exit 1
fi

# Step 4: Build
print_step "Building Next.js application"
if pnpm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

echo -e "\n${GREEN}🎉 All CI/CD steps completed successfully!${NC}"
echo "Your code is ready to be pushed to GitHub."