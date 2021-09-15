#### Production Environment for Deployment ####
FROM harbor.usu.edu/base-images/node-instantclient:16-buster-slim

# Set labels
LABEL logging.format="json"

# Set container timezone
ENV TZ=America/Denver
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create and set app directory
RUN /bin/mkdir -p /app/src
WORKDIR /app

# Copy app source files to image
COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY README.md /app/README.md
COPY LICENSE /app/LICENSE
COPY public /app/public
COPY src /app/src

# Disable package auditing
# Dependency auditing should be performed
# on the developer machine before deployment.
RUN npm config set audit false

# Install production dependencies
RUN npm install --production

EXPOSE 3000

# Run
CMD ["npm", "run", "start"]
