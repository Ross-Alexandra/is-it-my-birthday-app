function verify_ssh() {
    if ssh -q iimb exit; then
        :
    else
        echo -e "\033[0;31mSSH connection to iimb is not configued. Please add the following to your ~/.ssh/config file:
Host iimb
    HostName <your_iimb_server_ip>
    User <your_general_iimb_server_username>
    IdentityFile <your_iimb_server_private_key_file>

And then run the following command:
ssh-copy-id -i <your_iimb_server_public_key_file> <your_general_iimb_server_username>@<your_iimb_server_ip>\033[0m
"

        return 1;
    fi

    if ssh -q iimb_noreply exit; then
        :
    else
        echo -e "\033[0;31mSSH connection to iimb_noreply is not configued. Please add the following to your ~/.ssh/config file:
Host iimb_noreply
    HostName <your_iimb_noreply_server_ip>
    User no-reply (or whatever user you have configured)
    IdentityFile <your_iimb_noreply_server_private_key_file>

And then run the following command:
ssh-copy-id -i <your_iimb_noreply_server_public_key_file> no-reply@<your_iimb_noreply_server_ip>\033[0m
"

        return 1;
    fi

    return 0;
}
