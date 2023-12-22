#!/bin/bash

# Description: Shortcut for calling functions in the leaderboard bin directory. 
# Usage: leaderboard <function_name> <function_arguments>
function leaderboard() {
    if [ -z "$1" ]; then
        echo "Usage: leaderboard <function_name> <function_arguments>"
        return
    fi

    /bin/bash $IIMB_HOME/leaderboard/bin/$1.sh $@;
}

# Shortcut for calling functions in the leaderboard bin directory.
alias lb=leaderboard
