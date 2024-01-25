source $IIMB_HOME/bin/activate;

if verify_ssh iimb; then
    scp -r $IIMB_HOME/auth iimb:~/;

    # Check if $1 is "debug", and if so then don't daemonize the server.
    if [ "$1" == "debug" ]; then
        ssh iimb 'pkill gunicorn; source .setup-env; cd auth; pip install -r requirements.txt; gunicorn main:app -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:13001 --workers 2';
    else    
        ssh iimb 'pkill gunicorn; source .setup-env; cd auth; pip install -r requirements.txt; gunicorn main:app -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:13001 --workers 2 --daemon';
    fi
fi
