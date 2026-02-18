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
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Deployment

Configured for AWS Amplify deployment via `amplify.yml` at the repo root.
