#!/bin/bash

# Description: Shortcut for calling functions in the auth bin directory. 
# Usage: auth <function_name> <function_arguments>
function auth() {
    if [ -z "$1" ]; then
        echo "Usage: auth <function_name> <function_arguments>"
        return
    fi

    cmd_path=$IIMB_HOME/server/auth/bin/$1.sh
    shift;

    /bin/bash $cmd_path $@;
}
