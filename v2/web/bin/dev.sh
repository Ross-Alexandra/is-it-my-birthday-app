source $IIMB_HOME/bin/activate;

# Setup the environment variables for the web app.
export VUE_APP_AUTH_URL=http://localhost:8000;
export VUE_APP_STREAKS_URL=http://localhost:8001;
export VUE_APP_ENV=development;

web npm dev;

# Unset the environment variables for the web app.
export VUE_APP_AUTH_URL=
export VUE_APP_STREAKS_URL=
export VUE_APP_ENV=
