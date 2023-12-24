1. user can login with username password and google
2. once logged in i am able to get token both at backend and frontend
3. protect pages using middleware
4. if user is admin show admin home page and nav,
   if user is seller show seller home page and nav
   if user is buyer show buyer home page and nav
   if user is public/not logged in show public home page and nav
5. when access token is not valid get new access token using refresh token
6. when logged out invalidate access and refresh token
7. rotate refresh token