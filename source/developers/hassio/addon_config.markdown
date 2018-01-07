---
layout: page
title: "Add-On Configuration"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /hassio/addon_config/
---

Each add-on is stored in a folder. The file structure looks like this:

```
addon_name/
  Dockerfile
  config.json
  run.sh
```

## {% linkable_title Add-on script %}

As with every Docker container, you will need a script to run when the container is started. A user might run many add-ons, so it is encouraged to try to stick to Bash scripts if you're doing simple things.

When developing your script:

 - `/data` is a volume for persistent storage.
 - `/data/options.json` contains the user configuration. You can use `jq` inside your shell script to parse this data. However, you might have to install `jq` as a separate package in your container (see `Dockerfile` below).

```bash
CONFIG_PATH=/data/options.json

TARGET="$(jq --raw-output '.target' $CONFIG_PATH)"
```

So if your `options` contain
```json
{ "target": "beer" }
```
then there will be a variable `TARGET` containing `beer` in the environment of your bash file afterwards.

## {% linkable_title Add-on Docker file %}

All add-ons are based on Alpine Linux 3.6. Hass.io will automatically substitute the right base image based on the machine architecture. Add `tzdata` if you need run in a different timezone. `tzdata` Is is already added to our base images.

```
ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

# Install requirements for add-on
RUN apk add --no-cache jq

# Copy data for add-on
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

If you don't use local build on device or our build script, make sure that the Dockerfile have also a set of labels include:
```
LABEL io.hass.version="VERSION" io.hass.type="addon" io.hass.arch="armhf|aarch64|i386|amd64"
```

It is possible to use own base image with `build.json` or if you do not need support for automatic multi-arch building you can also use a simple docker `FROM`.

### {% linkable_title Build Args %}

We support the following build arguments by default:

| ARG | Description |
|-----|-------------|
| BUILD_FROM | Hold image for dynamic builds or buildings over our systems.
| BUILD_VERSION | Add-on version (read from `config.json`).
| BUILD_ARCH | Hold current build arch inside.

## {% linkable_title Add-on config %}

The config for an add-on is stored in `config.json`.

```json
{
  "name": "xy",
  "version": "1.2",
  "slug": "folder",
  "description": "long description",
  "arch": ["amd64"],
  "url": "website with more information about add-on (ie a forum thread for support)",
  "startup": "application",
  "boot": "auto",
  "ports": {
    "123/tcp": 123
  },
  "map": ["config:rw", "ssl"],
  "options": {},
  "schema": {},
  "image": "repo/{arch}-my-custom-addon"
}
```

| Key | Required | Description |
| --- | -------- | ----------- |
| name | yes | Name of the add-on
| version | yes | Version of the add-on
| slug | yes | Slug of the add-on
| description | yes | Description of the add-on
| arch | no | List of supported arch: `armhf`, `aarch64`, `amd64`, `i386`. Default all.
| url | no | Homepage of the addon. Here you can explain the add-ons and options.
| startup | yes | `initialize` will start addon on setup of Hass.io. `system` is for things like databases and not dependent on other things. `services` will start before Home Assistant, while `application` is started afterwards. Finally `once` is for applications that don't run as a daemon.
| webui | no | A URL for web interface of this add-on. Like `http://[HOST]:[PORT:2839]/dashboard`, the port needs the internal port, which will be replaced with the effective port. It is also possible to bind the proto part to a config options with: `[PROTO:option_name]://[HOST]:[PORT:2839]/dashboard` and he lookup if they is True and going to `https`.
| boot | yes | `auto` by system and manual or only `manual`
| ports | no | Network ports to expose from the container. Format is `"container-port/type": host-port`.
| host_network | no | If that is True, the add-on run on host network.
| host_ipc | no | Default False. Allow to share the IPC namespace with others.
| host_dbus | no | Default False. Map Host dbus service into add-on.
| devices | no | Device list to map into the add-on. Format is: `<path_on_host>:<path_in_container>:<cgroup_permissions>`. i.e. `/dev/ttyAMA0:/dev/ttyAMA0:rwm`
| auto_uart | no | Default False. Auto mapping all UART/Serial device from host into add-on.
| hassio_api | no | This add-on can access to Hass.io REST API. It set the host alias `hassio`.
| homeassistant_api | no | This add-on can access to Hass.io Home-Assistant REST API proxy. Use `http://hassio/homeassistant/api`.
| privileged | no | Privilege for access to hardware/system. Available access: `NET_ADMIN`, `SYS_ADMIN`, `SYS_RAWIO`, `SYS_TIME`, `SYS_TIME`
| map | no | List of maps for additional Hass.io folders. Possible values: `config`, `ssl`, `addons`, `backup`, `share`. Defaults to `ro`, which you can change by adding `:rw` to the end of the name.
| environment | no | A dict of environment variable to run add-on.
| audio | no | Boolean. Mark this add-on to use internal an audio system. The available environment variables are `ALSA_INPUT` and `ALSA_OUTPUT` which provide internal information to access alsa.
| gpio | no | Boolean. If this is set to True, `/sys/class/gpio` will map into add-on for access to GPIO interface from kernel. Some library need also `/dev/mem` and `SYS_RAWIO` for read/write access to this device.
| stdin | no | Boolean. If that is enable, you can use the STDIN with Hass.io API.
| legacy | no | Boolean. If the docker image have no hass.io labels, you can enable the legacy mode to use the config data.
| options | yes | Default options value of the add-on
| schema | yes | Schema for options value of the add-on. It can be `False` to disable schema validation and use custom options.
| image | no | For use with Docker Hub.
| timeout | no | Default 10 (second). The timeout to wait until the docker is done or will be killed.
| tmpfs | no | Mount a tmpfs file system in `/tmpfs`. Valide format for this option is : `size=XXXu,uid=N,rw`. Size is mandatory, valid units (`u`) are `k`, `m` and `g` and `XXX` has to be replaced by a number. `uid=N` (with `N` the uid number) and `rw` are optional.

### {% linkable_title Options / Schema %}

The `options` dictionary contains all available options and their default value. Set the default value to `null` if the value is required to be given by the user before the add-on can start, and it show it inside default values. Only nested arrays and dictionaries are supported with a deep of two size. If you want make a option optional, put `?` to the end of data type, otherwise it will be a required value.

```json
{
  "message": "custom things",
  "logins": [
    { "username": "beer", "password": "123456" },
    { "username": "cheep", "password": "654321" }
  ],
  "random": ["haha", "hihi", "huhu", "hghg"],
  "link": "http://example.com/",
  "size": 15,
  "count": 1.2
}
```

The `schema` looks like `options` but describes how we should validate the user input. For example:

```json
{
  "message": "str",
  "logins": [
    { "username": "str", "password": "str" }
  ],
  "random": ["match(^\w*$)"],
  "link": "url",
  "size": "int(5,20)",
  "count": "float",
  "not_need": "str?"
}
```

We support:
- str
- bool
- int / int(min,) / int(,max) / int(min,max)
- float / float(min,) / float(,max) / float(min,max)
- email
- url
- port
- match(REGEX)

## {% linkable_title Add-on extended build %}

Additional build options for an add-on is stored in `build.json`. This file will be read from our build systems.

```json
{
  "build_from": {
    "armhf": "homeassistant/armhf-base:latest"
  },
  "squash": false,
  "args": {
    "my_build_arg": "xy"
  }
}
```

| Key | Required | Description |
| --- | -------- | ----------- |
| build_from | no | A dictionary with the hardware architecture as the key and the base Docker image as value.
| squash | no | Default `False`. Be carfully with this option, you can not use the image for caching stuff after that!
| args | no | Allow to set additional Docker build arguments as a dictionary.
