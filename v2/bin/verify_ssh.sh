function verify_ssh() {
    if ssh -q $1 exit; then
        :
    else
        echo -e "\033[0;31mSSH connection to $1 is not configued. Please add the following to your ~/.ssh/config file:
Host $1
    HostName <server_ip>
    User <user_name>
    IdentityFile <private_key_file>

And then run the following command:
ssh-copy-id -i <public_key_file> <user_name>@<server_ip>\033[0m
"

        return 1;
    fi
}
