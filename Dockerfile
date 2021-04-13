ARG VARIANT=2
FROM mcr.microsoft.com/vscode/devcontainers/ruby:${VARIANT}

ARG NODE_VERSION="lts/*"
RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"

# Locale env vars
ENV \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# Install tools
RUN \
  apt update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      ack \
  && echo "en_US UTF-8" > /etc/locale.gen \
  && locale-gen en_US.UTF-8

# Install the specific version of bundler we need
COPY Gemfile.lock ./
RUN gem install bundler -v `awk 'c&&c--;/BUNDLED WITH/{c=1}' Gemfile.lock`