source $IIMB_HOME/bin/activate;

export LOCAL_IP=$(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}');
echo "Hosting the web server on: $LOCAL_IP";

export VUE_APP_AUTH_URL="http://10.0.2.2:8000";
export VUE_APP_STREAKS_URL="http://10.0.2.2:8001";
export VUE_APP_ENV=development;
export VUE_APP_IS_MOBILE=true;

function kill_node() {
    echo "\nKilling node and npm\n";
    export LOCAL_IP=
    export VUE_APP_AUTH_URL=
    export VUE_APP_STREAKS_URL=
    export VUE_APP_ENV=

    pkill node;
    pkill npm;
    exit 0;
}

web npm dev -- --port 8080 --host 0.0.0.0 >> /dev/null &
web npm dev:android;
echo "please open: 'chrome://inspect' in Google Chrome";

trap kill_node SIGINT;

while :; do
    sleep 1;
done
