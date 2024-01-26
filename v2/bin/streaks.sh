#!/bin/bash

# Description: Shortcut for calling functions in the streaks bin directory. 
# Usage: streaks <function_name> <function_arguments>
function streaks() {
    if [ -z "$1" ]; then
        echo "Usage: streaks <function_name> <function_arguments>"
        return
    fi

    cmd_path=$IIMB_HOME/server/streaks/bin/$1.sh
    shift;

    /bin/bash $cmd_path $@;
}

# Shortcut for calling functions in the streaks bin directory.
alias lb=streaks
