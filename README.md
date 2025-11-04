Advanced App Store (React + Tailwind frontend, Express backend)
=============================================================

Quick start (run backend and frontend locally):

Prerequisites:
  - Node.js (16+)
  - npm

Backend:
  cd backend
  npm install
  npm start
  # backend runs on http://localhost:4000
  # endpoints: GET /apps  POST /apps

Frontend:
  cd frontend
  npm install
  npm start
  # frontend runs on http://localhost:3000 (it fetches backend at http://localhost:4000)

Notes:
  - apps are stored in backend/apps.json (the backend writes new posts there)
  - Images are remote placeholder images (via.placeholder.com) so you don't need local image files.
