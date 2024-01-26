source $IIMB_HOME/bin/activate;

if verify_ssh iimb; then
    # NOTE: The frontend environment variables are *never* secret, so
    #       they can be stored in the repository plaintext.
    export VUE_APP_AUTH_URL=https://api.isitmybirth.day/auth;
    export VUE_APP_STREAKS_URL=https://api.isitmybirth.day/streaks;
    export VUE_APP_ENV=production;

    (cd $IIMB_HOME/web && npm run build);
    scp -r $IIMB_HOME/web/dist iimb:~/www/isitmybirth.day;
fi
