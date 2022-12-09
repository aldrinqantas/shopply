FROM node:14.18.1

ENV YARN_VERSION 1.22.17

RUN yarn policies set-version $YARN_VERSION

# Copy app source
COPY . /src

# Set work directory to /src
WORKDIR /src

# Install app dependencies
RUN yarn install

# Build for production
RUN yarn build

# Expose port to outside world
EXPOSE 3000

# Start command as per package.json
CMD yarn start