source $IIMB_HOME/bin/activate;

export VUE_APP_AUTH_URL=https://api.isitmybirth.day/auth;
export VUE_APP_STREAKS_URL=https://api.isitmybirth.day/streaks;
export VUE_APP_ENV=production;
export VUE_APP_IS_MOBILE=true;

web npm build;
web npm build:android;

export VUE_APP_AUTH_URL=;
export VUE_APP_STREAKS_URL=;
export VUE_APP_ENV=;
export VUE_APP_IS_MOBILE=;