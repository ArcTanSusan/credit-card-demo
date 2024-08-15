# How to run 

Start in the backend directory at `backend/`. Follow these steps:

1. `npm i` to install all dependencies.
1. `DEBUG=backend:* npm start` to start the express server on port 8000. 
1. Go to the directory `frontend.` and `npm i` to install dependencies. 
1. `npm start` to start the React server. If asked to start on a differnet port than port 3000, press Y for Yes.

# Notes

I installed the cors library in the backend directory `backend/` in order to bypass the CORS cross origin requests issue between the frontend and backend ports.