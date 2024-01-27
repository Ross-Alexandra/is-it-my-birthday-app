#!/bin/bash

# Description: Shortcut for calling functions in the web bin directory. 
# Usage: web <function_name> <function_arguments>
function web() {
    if [ -z "$1" ]; then
        echo "Usage: web <function_name> <function_arguments>"
        return
    fi

    cmd_path=$IIMB_HOME/web/bin/$1.sh
    shift;

    /bin/bash $cmd_path $@;
}
