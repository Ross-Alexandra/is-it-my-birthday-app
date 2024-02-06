#!/bin/bash

# Description: Shortcut for calling functions in the mobile bin directory. 
# Usage: mobile <function_name> <function_arguments>
function mobile() {
    if [ -z "$1" ]; then
        echo "Usage: mobile <function_name> <function_arguments>"
        return
    fi

    cmd_path=$IIMB_HOME/web/bin/mobile/$1.sh
    shift;

    /bin/bash $cmd_path $@;
}
