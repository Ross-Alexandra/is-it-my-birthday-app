echo 'Starting the users development server...'

# Setup the enviroment variables for local development of the app.
export IIMB_ENV=dev
export IIMB_DB_HOST=localhost
export IIMB_DB_USER=root
export IIMB_DB_PASSWORD=password
export IIMB_DB_NAME=iimb
export IIMB_AUTH_SECRET=secret

(cd $IIMB_HOME/users && uvicorn main:app --reload --port 8000)

# Reset the enviroment variable when we're done with the app.
export IIMB_ENV=
export IIMB_DB_HOST=
export IIMB_DB_USER=
export IIMB_DB_PASSWORD=
export IIMB_DB_NAME=
