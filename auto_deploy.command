#!/bin/bash
cd "$(dirname "$0")"
echo "------------------------------------------"
echo "🚀 WorkNest Auto-Deployment Script"
echo "------------------------------------------"
echo ""
echo "1. Checking Git status..."
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit for WorkNest"
fi

echo ""
echo "2. Please go to https://github.com/new and create a repository named 'WorkNest'."
echo "3. Copy the URL of your new repository (e.g., https://github.com/username/WorkNest.git)"
echo ""
read -p "Enter your GitHub Repository URL: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ Error: No URL provided. Deployment cancelled."
    exit 1
fi

echo ""
echo "4. Linking to GitHub and Pushing..."
git remote remove origin 2>/dev/null
git remote add origin "$repo_url"
git branch -M main
git push -u origin main

echo ""
echo "------------------------------------------"
echo "✅ Code is now on GitHub!"
echo "Next steps: Connect this repo to Vercel and Render."
echo "------------------------------------------"
read -p "Press Enter to close..."
