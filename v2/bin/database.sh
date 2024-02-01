#!/bin/bash

# Description: Shortcut for calling functions in the database bin directory. 
# Usage: database <function_name> <function_arguments>
function database() {
    if [ -z "$1" ]; then
        echo "Usage: database <function_name> <function_arguments>"
        return
    fi

    cmd_path=$IIMB_HOME/database/bin/$1.sh
    shift;

    /bin/bash $cmd_path $@;
}

alias db=database
