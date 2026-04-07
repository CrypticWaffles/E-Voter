# E-Voter

A civic engagement web platform where users watch legislative video content, cast yes/no votes, and see how their state voted compared to the rest of the country.

## Features

- **Video library** — Browse legislative debates and hearings. Each card shows the current yes/no vote split at a glance.
- **ZIP-aware voting** — Users enter their ZIP code before voting. The app resolves it to a state via the Zippopotam.us API and stores it for future visits.
- **Live results** — After submitting a vote, the page instantly replaces the voting form with a yes/no progress bar showing updated totals.
- **National analytics** — A dedicated results page aggregates all votes by state, showing each state's split in a sortable table with progress bars.
- **Feedback** — Users can submit open-ended feedback at any time.
- **Auto-seeding** — The database seeds itself with sample videos on first launch; no manual SQL required.

## Screenshots

**Homepage**
![Homepage](doc/images/Screenshot%202026-04-07%20162344.png)

**Video Library**
![Video Library](doc/images/Screenshot%202026-04-07%20162229.png)

**National Results**
![National Results](doc/images/Screenshot%202026-04-07%20162310.png)

**Feedback**
![Feedback](doc/images/Screenshot%202026-04-07%20162321.png)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Sails.js v1.5 |
| Frontend | EJS templates, Bootstrap 5 |
| Database | sails-disk |
| HTTP Client | Axios |
| Build | Grunt.js |

## Getting Started

### Demo
Demo available here: [Demo](https://e-voter-5tp3.onrender.com)

### Prerequisites

- [Node.js](https://nodejs.org/) v22.13+

### Installation

```sh
git clone https://github.com/crypticwaffles/themiddlesrepo.git
cd themiddlesrepo
npm install
node app.js
```

The app starts at `http://localhost:1337/`. On first launch, Sails runs migrations and seeds the database with 3 sample videos automatically.

## Application Structure

```
api/
  controllers/
    VideoController.js    # List videos with vote tallies; serve play page
    VoteController.js     # Submit votes; aggregate results by state
    LocationController.js # ZIP code lookup + persistence
    FeedbackController.js # User feedback submission
  models/
    Video.js              # title, url
    Vote.js               # VideoId, zipId, choice (boolean)
    Location.js           # zip, state, county
    Feedback.js           # message
config/
  routes.js               # URL → controller/view mapping
  bootstrap.js            # Database seeder (runs on lift)
  datastores.js           # Database adapter config (sails-disk)
views/
  layouts/layout.ejs      # Shared navbar and page shell
  pages/
    homepage.ejs
    videoList.ejs         # Video cards with live vote splits
    videoPlay.ejs         # Video player, ZIP input, voting, inline results
    analytics.ejs         # National results — overall totals + state breakdown
    feedback.ejs
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Homepage |
| `GET` | `/video/list` | Video library with vote tallies |
| `GET` | `/video/play/:id` | Video player and voting UI |
| `POST` | `/vote` | Submit a vote; returns `{ yesVotes, noVotes }` |
| `GET` | `/analytics` | National results aggregated by state |
| `GET` | `/api/location?zip=` | Resolve ZIP → city/state and persist |
| `GET` | `/feedback` | Feedback page |
| `POST` | `/feedback` | Submit feedback |
