# How to run 

Start in the backend directory at `backend/`. Follow these steps:

1. `npm i` to install all dependencies.
1. `DEBUG=backend:* npm start` to start the express server on port 8000. 
1. Go into the directory `frontend/` and `npm i` to install dependencies.
1. `npm start` to start the frontend React server. If asked to start on a different port than port 3000, press Y for Yes.

# How this is buit

Frontend is React, formik, YUP schema validation while the backend is expressJS. There's only 1 backend API endpoint that does the credit card validation with Luhn algorithm. The frontend makes a single API call to this backend API when you click on the "PAY NOW" button on the form.

# CORS
The frontend runs on port 3001 whilst the backend runs on port 8000. I installed `cors` library in the backend directory `backend/` in order to bypass the CORS cross origin issue between the frontend and backend ports. In production, the domain name or port number is required to be the same.

# Credit Card Form: Different UI States

When the frontend starts up, you should see an empty credit card form:

![Empty credit card form](/screenshots/credit_card_form.png)

If you enter the incorrect credit card nubmer, then the button text remains at "PAY NOW" in red and there's an error message at the bottom of the form. 

![Invalid credit card form](/screenshots/invalid-credit-card.png)

If you enter the correct credit card nunber, then the button text changes from "PAY NOW" to "PAID" in blue and there's a confirmation message at the bottom.

![Valid credit card form](/screenshots/valid-credit-card.png)