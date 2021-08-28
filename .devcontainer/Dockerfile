# [Choice] Node.js version: 16, 14, 12, 10
ARG VARIANT="14-buster-slim"
FROM harbor.usu.edu/base-images/node-instantclient:${VARIANT}

# Copy scripts to execute
COPY .devcontainer/scripts/*.sh .devcontainer/scripts/*.env /tmp/scripts/

# [Option] Install zsh
ARG INSTALL_ZSH="true"

# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="true"

# Install needed packages, nvm and setup non-root user. Use a separate RUN statement to add your own dependencies.
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    # Remove imagemagick due to https://security-tracker.debian.org/tracker/CVE-2019-10131
    && apt-get purge -y imagemagick imagemagick-6-common \
    # Install common packages, non-root user and install nvm
    && bash /tmp/scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true"

# Setup default nodejs tools
ENV NPM_GLOBAL=/usr/local/share/npm-global
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

RUN bash /tmp/scripts/node-debian.sh "${USERNAME}" \
    # Configure global npm install location, use group to adapt to UID/GID changes
    && if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
    && usermod -a -G npm ${USERNAME} \
    && umask 0002 \
    && mkdir -p ${NPM_GLOBAL} \
    && touch /usr/local/etc/npmrc \
    && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
    && chmod g+s ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && sudo -u ${USERNAME} npm config -g set prefix ${NPM_GLOBAL}

# Install eslint
RUN su ${USERNAME} -c "umask 0002 && npm install -g eslint" \
    && npm cache clean --force > /dev/null 2>&1

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>""

# Final clean up, remove scripts
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* /root/.gnupg /tmp/scripts
