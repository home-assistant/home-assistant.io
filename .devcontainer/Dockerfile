# Pinned to an exact image definition version so a rebuild of the floating
# "3.4" tag cannot change the Ruby install layout underneath us.
# Dependabot keeps this up to date.
FROM mcr.microsoft.com/devcontainers/ruby:4.1.1-3.4-trixie

ARG NODE_VERSION="lts/*"

# Fix: Remove the broken Yarn repository from the apt sources.
# This prevents 'apt-get update' from failing due to the missing GPG key.
RUN rm -f /etc/apt/sources.list.d/yarn.list
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
