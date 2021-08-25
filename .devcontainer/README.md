<p align="center">
  <img src="https://github.com/utahstate/launchpad-node/blob/master/docs/assets/node-launchpad-logo.png" alt="Node.js Launchpad logo">
</p>

<h1 align="center">Node.js Launchpad</h1>

A project starter for Node.js projects configured with common USU project dependencies and VS Code integrations to make development awesome.

This repo employs Dev Containers and VS Code integration to provide an easy to use and fully configured development environment for Node.js projects.

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

---

- [Objective and Purpose](#objective-and-purpose)
  - [OS Agnostic](#os-agnostic)
  - [Oracle Instant Client](#oracle-instant-client)
  - [Runtime Environment](#runtime-environment)
- [Contributing](#contributing)
- [Usage](#usage)
  - [Host Requirements](#host-requirements)
    - [Docker Runtime](#docker-runtime)
    - [Visual Studio Code](#visual-studio-code)
    - [USU Staff VPN Connection](#usu-staff-vpn-connection)
      - [Notes](#notes)
  - [Container Startup](#container-startup)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

---

## Objective and Purpose

The Node.js Launchpad is intended to reduce configuration and dependencies on the host environment for Node.js project development.

### OS Agnostic

The Node.js Launchpad runs anywhere Docker runs. Due to all development taking place inside the container, the host OS is irrelevant. Use Mac, Windows, or any flavor of Linux without having to worry about path, line endings, or conflicting dependencies.

### Oracle Instant Client

Frequently a project will require a database connection to the Oracle Banner database which requires the Oracle Instant Client to be installed and configured in the host environment. This installation is prone to PATH issues and other conflicts.

### Runtime Environment

The launchpad uses as the same Node.js Instant Client base image that is used in production containers to provide identical Instant Client accessibility and configuration.

The development container is further enhanced to offer Node.js developer tools for linting, debugging, launch configuration, code snippet execution and more.

---

## Contributing

Contributions are welcome. Please read the [Contributing Guide](./CONTRIBUTING.md).

For suggestions and improvements, start a discussion with a [GitHub Issue](https://github.com/utahstate/launchpad-node/issues/).

---

## Usage

The launchpad is intended to be forked and to form a starter for a new project or to be integrated into an existing project.

### Host Requirements

Requirements on the host OS are minimal.

#### Docker Runtime

Install [Docker Desktop](https://www.docker.com/products/docker-desktop) on the host using your preferred installation method. The Docker service must be accessible to the logged in user account.

#### Visual Studio Code

Install [Visual Studio Code](https://code.visualstudio.com/) on the host using your preferred installation method. Once installed, the [Remote-Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) must also be installed.

#### USU Staff VPN Connection

In order to install the Oracle Instant Client base images from Harbor, the host must be connected to USU Staff VPN.

##### Notes

Dev containers are supported by Visual Studio Code. Support for additional text editors is not planned.

### Container Startup

Open the project directory (the one containing the `.devcontainer` directory) in VS Code. VS Code will recognize the `.devcontainer` configuration and ask to re-open the project in the container. Click yes. If the container has not already been built, the container will be built based on the configuration defined in the `.devcontainer` directory.

Control over the dev container is found in the VSCode Command Palette (Ctrl+Shift+P) under the prefix 'Remote-Containers' where several commands exist for starting, building, and rebuilding the container.

The dev container may also be started or stopped from the Docker Desktop UI (beware this will make VSCode unhappy).

TODO: More information about the container configuration
https://code.visualstudio.com/docs/python/python-tutorial#_configure-and-run-the-debugger
https://code.visualstudio.com/docs/python/debugging
https://code.visualstudio.com/learn/develop-cloud/containers
https://github.com/microsoft/vscode-remote-try-python
https://github.com/microsoft/vscode-dev-containers/tree/main/containers/python-3

---

## Team

The current project lead is [Richard Macdonald](https://github.com/thewidgetsmith)

[List of all project contributors](https://github.com/utahstate/launchpad-node/graphs/contributors)

---

## FAQ

- **Do we have any frequently asked questions?**
    - Not yet, but we should leave this here as a placeholder.

---

## Support

Node.js Launchpad is developed and maintained by the IT Enterprise Integrations team.

- Slack us at <a href="https://usu.slack.com/app_redirect?channel=usu_it" target="_blank">Slack#usu_it</a>

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2021 © <a href="http://www.usu.edu/copyright/" target="_blank">Utah State University</a>.
