
# Requirements

- [Node.js](https://nodejs.org/en/) (v8.9.4 or higher)
- [Docker](https://www.docker.com/) (v18.03.1-ce or higher)

# Installation

1. Clone the repository

    ```bash
    git clone
    ```
2. Install dependencies

    ```bash
    npm install
    ```
3. Run Docker

    ```bash
    docker-compose up -d
    ```

The app should be running at [http://localhost:3050](http://localhost:3050).

# Config

To setup ssh go to server/env.js. The following ssh variables are available:

- `SSH_USERNAME` - The the username of the ssh machine.
- `SSH_PASSWORD` - The password of the ssh machine.
