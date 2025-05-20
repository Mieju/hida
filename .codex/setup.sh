#!/bin/bash
set -e

# Install backend dependencies
cd "$(dirname "$0")/../backend"
npm install --no-progress

# Install frontend dependencies
cd ../frontend
npm install --no-progress
