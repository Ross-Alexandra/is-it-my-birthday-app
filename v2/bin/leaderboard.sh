#!/bin/bash

# Description: Shortcut for calling functions in the leaderboard bin directory. 
# Usage: leaderboard <function_name> <function_arguments>
function leaderboard() {
    if [ -z "$1" ]; then
        echo "Usage: leaderboard <function_name> <function_arguments>"
        return
    fi

    cmd_path=$IIMB_HOME/server/leaderboard/bin/$1.sh
    shift;

    /bin/bash $cmd_path $@;
}

# Shortcut for calling functions in the leaderboard bin directory.
alias lb=leaderboard
