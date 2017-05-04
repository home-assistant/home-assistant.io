---
layout: page
title: "Create an add-on for Hass.io"
description: "Steps on how to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Addon

### {% linkable_title Add-on folder %}

```
addon_name:
  Dockerfile
  config.json
  run.sh
```

All add-ons are based off Alpine Linux 3.5. To get the macine specific version, use `FROM %%BASE_IMAGE%%` inside your docker file. Your Docker file also needs to include this line:

```docker
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

The `options` dict have all available options with default value. If you want to set a value to requered and need to be set from user before it start the addon, set it to null.

The `schmema` look like the `options` but describe how we should validate the user input.

### {% linkable_title SSL %}

Default you can use `fullchain.pem` and `privkey.pem` from `/ssl` for you stuff. Your SSL addon should also create default this files.

### {% linkable_title Need to known %}
`/data` is a volume with a persistant store. `/data/options.json` have the user config inside. You can use `jq` inside shell script to parse this data.
