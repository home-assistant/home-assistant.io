# Pinned so that an upstream rebuild cannot change the Ruby install layout
# underneath us, which is what broke this build before.
#
# The tag is <image definition>-<ruby>-<debian>. The leading 4.1.1 is the version
# of the image build recipe in devcontainers/images, not a Ruby version: bumping
# it is what swapped RVM for ruby-build. Ruby and Debian are the parts after it.
#
# To bump, pick a newer tag from the same 3.4-trixie line:
#   curl -s https://mcr.microsoft.com/v2/devcontainers/ruby/tags/list \
#     | tr ',' '\n' | grep -- '-3.4-trixie'
# Avoid tags like 4.1.1-4.0-trixie or 4.1.1-3.3-trixie, which change Ruby.
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
