<<<<<<< HEAD
ARG BUILD_FROM
FROM ${BUILD_FROM}

# Synchronize with homeassistant/core.py:async_stop
ENV \
    S6_SERVICES_GRACETIME=220000

WORKDIR /usr/src

## Setup Home Assistant Core dependencies
COPY requirements.txt homeassistant/
COPY homeassistant/package_constraints.txt homeassistant/homeassistant/
RUN \
    pip3 install --no-cache-dir --no-index --only-binary=:all: --find-links "${WHEELS_LINKS}" \
    -r homeassistant/requirements.txt --use-deprecated=legacy-resolver
COPY requirements_all.txt home_assistant_frontend-* homeassistant/
RUN \
    if ls homeassistant/home_assistant_frontend*.whl 1> /dev/null 2>&1; then \
        pip3 install --no-cache-dir --no-index homeassistant/home_assistant_frontend-*.whl; \
    fi \
    && pip3 install --no-cache-dir --no-index --only-binary=:all: --find-links "${WHEELS_LINKS}" \
    -r homeassistant/requirements_all.txt --use-deprecated=legacy-resolver

## Setup Home Assistant Core
COPY . homeassistant/
RUN \
    pip3 install --no-cache-dir --no-index --only-binary=:all: --find-links "${WHEELS_LINKS}" \
    -e ./homeassistant --use-deprecated=legacy-resolver \
    && python3 -m compileall homeassistant/homeassistant

# Home Assistant S6-Overlay
COPY rootfs /

WORKDIR /config
=======
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
>>>>>>> 568730a365 (Add video to energy blog post)
