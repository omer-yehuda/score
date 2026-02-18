# Score Tracker

A mobile-first score tracking application for card games, board games, and any multi-player game.

## Features

- Track scores for 2-6 players
- Add and remove rounds dynamically
- Choose between "low score wins" or "high score wins" mode
- Real-time winner highlighting with trophy indicator
- Handles tied scores (multiple winners)
- End game dialog with winner announcement
- Mobile-responsive design

## Tech Stack

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Material UI 5** for modern UI components

## Getting Started

```bash
cd ap-score-app

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Deployment

This app uses Next.js static export (`output: 'export'`) for deployment on AWS Amplify.

### AWS Amplify Settings

- **Base directory:** `ap-score-app`
- **Build command:** `pnpm build`
- **Output directory:** `out`
- **Node.js version:** 18+
