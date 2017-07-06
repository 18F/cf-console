# Dockerizing Notes

## Table of Contents

- [Quick-Start](#quick-start)
  - [Requirements](#quick-start-requirements)
  - [Running](#quick-start-running)
- [Full Setup](#full-setup)
  - [Requirements](#full-setup-requirements)
  - [Running](#full-setup-running)
  - [Running One-Offs](#full-setup-running-one-offs)
    - [Frontend One-Offs](#frontend-one-offs)
    - [Backend One-Offs](#backend-one-offs)
    - [UAA One-Offs](#uaa-one-offs)
    - [CF One-Offs](#cf-one-offs)
- [Tear Down](#tear-down)

## Quick Start

For quick and low impact changes (e.g. typos, changes to **existing** styling)
or for a quick glance at the dashboard, you can follow this quick start
section to start the frontend testing server.
For all others changes, use the [full setup guide](#full-setup).

### Quick-Start: Requirements

- [docker-compose](https://docs.docker.com/compose/install/)

### Quick-Start: Running

```sh
docker-compose up frontend_testing_server
```

It will say the server is up when everything is done. At the point, you can
navigate to `http://localhost:8001` and see the testing server.

## Full Setup

After running the Full Setup instructions, you will have a
local cloud foundry deployment (with UAA), the dashboard, a redis service
instance, mailcatcher for testing e-mails, and npm watch running so that you can
automatically recompile your frontend changes.

### Full Setup: Requirements

You will need to install:

- [PCFDev](https://docs.pivotal.io/pcf-dev/#installing)
- [docker-compose](https://docs.docker.com/compose/install/)

### Full Setup: Running

From the root of the repository:

```sh
# Start PCFDev and create the UAA client for you.
# There are two user accounts created automatically.
# The credentials are in the output.
./devtools/setup_local.sh
# Start the app.
docker-compose up app frontend watch -d
```

You can navigate to three components:

| Component        | Address           | Description  |
| ------------- |:-------------:| -----:|
| The Dashboard      | http://localhost:8002 | This is what this repository contains.<br/>By using PCF Dev, there are two users created automatically by default. <!-- TODO: Put text about creds -->|
| The mailcatcher view      | http://localhost:8025      |   Useful for debugging e-mails. There are invite flows that send e-mails. This UI captures them |
| HTML VNC Viewer | http://localhost:6901/?password=vncpassword      | Useful for seeing Javascript Karma Tests and Selenium Tests running.<br/>Based on [this](https://github.com/ConSol/docker-headless-vnc-container) container |

### Full Setup: Running One-Offs

Running one-offs is especially important if you don't have the proper tools
installed on your computer. With Docker, you can use the appropriate
executable in a container.

#### Frontend One-Offs

Format: `docker-compose run --rm frontend <COMMAND>`

Examples
- Add dependency: `docker-compose run --rm frontend npm install <dep> --save`
- Frontend unit tests: `docker-compose run --rm frontend npm run test-unit`
- Frontend functional tests (w/o visual debugging):
`docker-compose run --rm frontend npm run test-functional`

For more possible commands, refer to the package.json.

##### Visual Debugging
Once the `frontend` service is up and running (via
`docker-compose up frontend -d`), you can use the docker-compose `exec` command
to attach to the existing container. While viewing the container via HTML
VNC Viewer (refer to the table above), you will see the container's Chrome
browser open and execute the commands.

Format: `docker-compose exec frontend bash -c "<COMMAND>"`

Examples:
- Frontend functional tests: `docker-compose exec frontend bash -c "npm run test-functional"`

##### Updating the node version.

Currently, we need to append to the PATH at container build time, so that
node and npm are in the PATH at container runtime. Change the `NODE_VERSION` in
the Dockerfile in the `devtools/node` directory. Then rebuild the image with:
`docker-compose build frontend_dev_tools`

#### Backend One-Offs

Format: `docker-compose run --rm backend <COMMAND>`

Examples:
- Add dependency: `docker-compose run --rm backend glide get github.com/some/repo`
- Run `./codecheck.sh`: `docker-compose run --rm backend ./codecheck.sh`

#### UAA One-Offs
<!-- TODO -->

#### CF One-Offs
<!-- TODO -->

## Tear Down

You can run: `docker-compose down` to tear down the services.

If you want to start fresh which removes containers and **volumes**, run `./devtools/clean.sh`. It also removes the vendored dependencies for Go (i.e. `vendor`) and Javascript (i.e. `node_modules`)


<!-- TODO Update this -->
You will first need to ensure that `../cg-style` exists relative
to your cg-dashboard checkout and contains a checkout of
[`cg-style`](https://github.com/18F/cg-style).

1. `docker-compose build`
1. `docker-compose run app ./setup-npm-link.sh`
1. Visit `localhost:8001` (or `app.cgdashboard.docker` if using `dinghy`)

## Other stuff:

* Removed `host` property of `server.connection` config in `static_src/test/server/index.js`

## TODO:

* add a test verifying that `.nvmrc` specifies the same node version
  as the `Dockerfile`.