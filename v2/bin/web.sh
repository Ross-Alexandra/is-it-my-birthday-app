# Description: Executes npm commands from the web directory as if you were in the
#   web directory.
# Usage: web <npm_command as if it were npm run prefixed>
function web() {

    # Setup the environment variables for the web app.
    export VUE_APP_AUTH_URL=http://localhost:8000;
    export VUE_APP_ENV=development;

    (cd $IIMB_HOME/web && npm run $@);

    # Unset the environment variables for the web app.
    export VUE_APP_AUTH_URL=
    export VUE_APP_ENV=
}
