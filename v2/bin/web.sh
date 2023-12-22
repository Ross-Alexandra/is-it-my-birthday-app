# Description: Executes npm commands from the web directory as if you were in the
#   web directory.
# Usage: web <npm_command as if it were npm run prefixed>
function web() {
    (cd $IIMB_HOME/web && npm run $@)
}
