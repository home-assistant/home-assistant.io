FROM ruby:2.6

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Use Bash as the default shell
ENV SHELL=/bin/bash 

# Set an environment variable to be able to detect we are in dev container
ENV DEVCONTAINER=true

# Locale env vars
ENV \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

# Install git, process tools
RUN apt update \
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
RUN gem install bundler -v 2.0.1

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog
