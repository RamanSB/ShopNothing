# ShopNothing
A market place for users to purchase nothing. Full Stack MERN project. 

The deployed project can be found here: https://upbeat-shirley-7b067b.netlify.app

Please note the products you are not actually purchasing any products in this project, nothing will be delivered. This is just a sample project that demonstrates a few concepts; stripe-api (checkout session), JWT & other MERN stack features...

## Improvements
1) Use a silent refresh token (a second long-lived token that is stored in cookie, this is used to generate an access-token (short-lived token))
2) Check if User is signed in (by checking JWT) rather than using react state.
3) Responsive Design (Use of media queries to support devices of varying dimensions).
4) Use Redux to manage state (instead of context objects?)


## What Did I Learn
1) How to integrate stripe API to accept payments.
2) How to deploy to front-end to netlify & back-end to heroku. Note: dotenv variables should be stated in heroku's environment variables.
3) Usage of some typescript types library i.e. for Express (Request, Response, NextFunction...)
4) Using an api/ directory in front-end where api calls are centralized (no need to make api calls in several different places manually, define once in a service and re-use)
5) React Router v6: <Routes> <Route path="" element={}/>
6) Persisting global application state to localStorage prior to redirecting URL to another domain. Re-reading the globalState from localStorage after redirection returns.
7) Set-Cookie attributes 'sameSite='none'' is essential. CORS related issue for cookie sotrage
  
