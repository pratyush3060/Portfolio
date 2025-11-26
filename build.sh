#!/bin/bash
set -e

echo "Building for separate deployment architecture..."
echo "This script is for local testing only."
echo "On Render, each service builds independently."

echo ""
echo "Building client..."
cd client
npm install
npm run build
cd ..

echo ""
echo "Installing server dependencies..."
cd server
npm install
cd ..

echo ""
echo "Build complete!"
echo "Client build: client/build/"
echo "Server ready: server/"
