ARG VARIANT=2.6
FROM mcr.microsoft.com/vscode/devcontainers/ruby:${VARIANT}

# Install node
COPY .nvmrc /tmp/.nvmrc
RUN \
  su vscode -c \
    "source /usr/local/share/nvm/nvm.sh && nvm install $(cat /tmp/.nvmrc) 2>&1"

# Set an environment variable to be able to detect we are in dev container
ENV DEVCONTAINER=true

# Locale env vars
ENV \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# Install git, process tools
RUN apt update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
        ack \
        git \
        locales \
        procps \
    && echo "en_US UTF-8" > /etc/locale.gen \
    && locale-gen en_US.UTF-8 \
    && echo 'export PS1="\\w\$ "' > /root/.bashrc \
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install the specific version of bundler we need
COPY Gemfile.lock ./
RUN gem install bundler -v `awk 'c&&c--;/BUNDLED WITH/{c=1}' Gemfile.lock`
