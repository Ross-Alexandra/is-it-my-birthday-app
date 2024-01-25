# Users
This app implements an extremely 1 factor password-less user system.
The user will provide an email address & username, and the app will send them
an email with a link to confirm their account.

According to this schema, the only difference between a user registering and
logging in is that the user will be asked to provide a username when registering.

## Registering
When a user registers, they will be asked to provide an email address and a username.
The app will then send them an email with a link to confirm their account.
The link will contain a token that will be used to verify the user's identity.

## Logging in
When a user logs in, they will be asked to provide an email address.
The app will then send them an email with a link to confirm their account.
The link will contain a token that will be used to verify the user's identity.
