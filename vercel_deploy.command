#!/bin/bash
cd "$(dirname "$0")"
echo "------------------------------------------"
echo "🚀 Vercel Direct Deployment"
echo "------------------------------------------"
echo ""
echo "1. Installing and checking Vercel..."
npx -y vercel --version


echo ""
echo "3. Starting Deployment..."
echo "Follow the prompts in this window (press Enter for defaults)."
echo ""
npx -y vercel --prod --yes

echo ""
echo "------------------------------------------"
echo "✅ Deployment Finished!"
echo "------------------------------------------"
read -p "Press Enter to close..."
