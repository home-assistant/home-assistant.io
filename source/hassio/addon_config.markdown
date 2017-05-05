---
layout: page
title: "Add-On Configuration"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
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
 - `/data/options.json` contains the user configuration. You can use `jq` inside your shell script to parse this data.

```bash
echo '{ "target": "beer" }' | jq -r ".target"
```

## {% linkable_title Add-on Docker file %}

All add-ons are based on Alpine Linux 3.5. Hass.io will automatically substitute the right base image based on the machine architecture. The Dockerfile is also required to have a VERSION environment variable which we will substitute with the version of the add-on.

```
FROM %%BASE_IMAGE%%

ENV VERSION %%VERSION%%
ENV LANG C.UTF-8

# Install requirements for add-on
RUN apk add --no-cache jq

# Copy data for add-on
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

## {% linkable_title Add-on config %}

The config for an add-on is stored in `config.json`.

```json
{
  "name": "xy",
  "version": "1.2",
  "slug": "folder",
  "description": "long descripton",
  "startup": "before|after|once",
  "boot": "auto|manual",
  "ports": {
    "123/tcp": 123
  },
  "map": ["config", "ssl", "addons", "backup"],
  "options": {},
  "schema": {},
  "image": "repo/{arch}-my-custom-addon"
}
```

### {% linkable_title Options / Schema %}

The `options` dict contains all available options and their default value. Set the default value to `null` if the value is required to be given by the user before the add-on can start. Only non-nested arrays are supported.

```json
{
  "message": "custom things",
  "logins": [
    { "username": "beer", "password": "123456" },
    { "username": "cheep", "password": "654321" }
  ],
  "random": ["haha", "hihi", "huhu", "hghg"],
  "link": "http://blebla.com/"
}
```

The `schema` looks like `options` but describes how we should validate the user input. For example:

```json
{
  "message": "str",
  "logins": [
    { "username": "str", "password": "str" }
  ],
  "random": ["str"],
  "link": "url"
}
```

We support:
- str
- bool
- int
- float
- email
- url
