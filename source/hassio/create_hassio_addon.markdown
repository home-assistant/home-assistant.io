---
layout: page
title: "Create an add-on for Hass.io"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Add-ons are docker container they run a script and do some things. User are able to set a add-on specific options.

### {% linkable_title Add-on folder %}

```
addon_name:
  Dockerfile
  config.json
  run.sh
```

All add-ons are based on Alpine Linux 3.5. You can use `FROM %%BASE_IMAGE%%` inside your docker file to build the right arch or for automatic build with our scripts.

Your Docker need also a env variable `VERSION` with the version of the add-on. With our build system include this line:
```
ENV VERSION %%VERSION%%
```

As a user might run many add-ons, it is encouraged to try to stick to Bash scripts if you're doing simple things.

### {% linkable_title Add-on config %}

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

The `options` dict have all available options with default value. If you want to set a value to requered and need to be set from user before it start the addon, set it to null. We support arrays for single deeps.

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

The `schmema` look like the `options` but describe how we should validate the user input. For example above:

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

### {% linkable_title SSL %}

Default you can use `fullchain.pem` and `privkey.pem` from `/ssl` for you stuff. Your SSL addon should also create default this files.

### {% linkable_title Need to know %}
`/data` is a volume with a persistant store. `/data/options.json` have the user config inside. You can use `jq` inside shell script to parse this data.
