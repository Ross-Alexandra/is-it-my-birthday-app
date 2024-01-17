#!/bin/bash

# Description: Shortcut for calling functions in the users bin directory. 
# Usage: users <function_name> <function_arguments>
function users() {
    if [ -z "$1" ]; then
        echo "Usage: users <function_name> <function_arguments>"
        return
    fi

    cmd_path=$IIMB_HOME/users/bin/$1.sh
    shift;

    /bin/bash $cmd_path $@;
}
