source $IIMB_HOME/bin/activate;

if verify_ssh iimb; then
    ssh iimb 'mkdir -p ~/server/streaks';

    # Copy important directories
    scp -r $IIMB_HOME/server/streaks/ iimb:~/server/;
    scp -r $IIMB_HOME/server/shared/ iimb:~/server/streaks/;

    # Copy necessary files
    scp $IIMB_HOME/server/requirements.txt iimb:~/server/streaks/requirements.txt;

    # Check if $1 is "debug", and if so then don't daemonize the server.
    if [ "$1" == "debug" ]; then
        ssh iimb 'kill -9 `lsof -t -i:13002`; source .setup-env; cd server/streaks; pip install -r requirements.txt; gunicorn main:app -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:13002 --workers 2';
    else    
        ssh iimb 'kill -9 `lsof -t -i:13002`; source .setup-env; cd server/streaks; pip install -r requirements.txt; gunicorn main:app -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:13002 --workers 2 --daemon';
    fi
fi
