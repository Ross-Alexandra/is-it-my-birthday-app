# V2
## Setup
### Requirements
- Python v3.8+,
- Node v18.15.0+,
- Docker & Docker compose (or an mysql database instance running locally)
- Android Studio (for mobile app development)
- JRE 17+ (for mobile app development)

### Installation
> Note, the following commands are for a unix-like environment; if you are using
 a windows machine, it is recommended to use the WSL (Windows Subsystem for
 Linux). Using WSL will likely cause significant issues with mobile app
 development however, so if you are making changes to the mobile app, it is
 recommended to not use windows environment.

> Note, the following commands all assume that you are currently in the
  v2 directory. If you are reading this after a migration away from having
  a v2 directory, then these commands will assume that you are in the root.

1. Clone the repository
2. Install the python dependencies
```bash
pip install -r server/requirements.txt
```
> Note, it is recommended to use a virtual environment when working with Python.
since the "server" is split into multiple separate services, you should create
a single virtual environment for all of them. This can be done by creating a
virtual environment in the root directory, and then installing the requirements
file from the root directory. This will install all of the requirements for
all of the services.

3. Install the node dependencies
```bash
cd web;
npm install;
```

### Running the web application
#### First time running
Before you start, you should make yourself familiar with the scripts which are
created in both the `bin/` directory, and the `*/bin/` directories within each
service. These scripts are used for various tasks, such as starting and deploying
the services.

To automatically add these scripts to your path (for the current session), you
can run the following command:
```bash
source bin/activate;
```

If this command succeeds, you will see `(iimb)` at the beginning of your terminal.
This means that not only are the scripts available to you, but you should also
be able to run them from any directory.

> Note, all following sections will assume that you have already run the above
  command, and that you have the `(iimb)` at the beginning of your terminal.
#### Services
This application's backend is split into multiple services, which are all
required to be running in order for the application to function. Currently,
you will need to start each service separately. This can be done by running
the following commands:

##### Authentication service
```bash
auth dev;
```

##### Database service
The default database setup uses a docker container, which can be started by
running the following command:
```bash
database dev -d;
```

This will start the docker container in the background, and will allow you to
use the database service. If you already have a mysql database running locally,
you will need to either run the database on the port & host defined in
`database/docker-compose.dev.yml`.

##### Leaderboard service (streaks)
```bash
streaks dev;
```

##### Web service
```bash
web dev;
```

### First steps
#### Database seeding
The application runs fine without any data, but it is recommended to seed the
database with some initial data. This can be done by running the following
command:
```bash
database seed;
```

### Running the mobile application
#### First time running
The mobile application is built on top of the web stack using Capacitor.
This means that you will need to have the web app, and all of its dependencies
installed & running before you can run the mobile app.

To run the mobile app, you will need to have Android Studio installed, and you
will need to have an android emulator created. To setup an emulator, you can
run the following command:
```bash
mobile open;
```

This will open the android studio project, from there you can create a new
emulator by opening the device manager, and creating a new virtual device.
Once you have created a virtual device, you can run the following command to
start the app on the emulator:
```bash
mobile dev;
```