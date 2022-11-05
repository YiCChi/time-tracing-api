# Time-tracing Backend

## Dev Environment

- See [Frontend](https://github.com/YiCChi/time-tracing-client/tree/main#dev-environment) first.
- Use **docker** for development. See [install docker desktop](https://docs.docker.com/desktop/install/mac-install/) to install it.
  - If using WSL 2 backend on Windows, [enable the WSL 2 feature](https://learn.microsoft.com/en-us/windows/wsl/install) first.

## Getting Started

First, install dependencies locally:

```bash
pnpm install
```

Then, run the development server:

```bash
docker-compose up --attach api --build
# or if enabled docker compose v2
docker compose up --attach api --build
```

Open [http://localhost:4000](http://localhost:4000/user) with your browser to see the result.
