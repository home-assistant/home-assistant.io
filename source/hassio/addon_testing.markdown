---
layout: page
title: "Local add-on testing"
description: "Instructions how to test your add-on locally."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

The fastest way to develop add-ons is by adding them to your local add-on repository. To access your local add-on repository, install either the [Samba add-on] or [SSH add-on].

Right now add-ons will only work with images that are stored on Docker Hub (using `image` from add-on config). We're working on enabling local add-ons to be built on the device.

## {% linkable_title Local run %}

You can build an try the addon on your developer machine also. Move all addon stuff into a temp folder. Replace in the Dockerfile: `%%VERSION%%` with your version and `%%BASE_IMAGE%%` with:

- armhf: `resin/armhf-alpine:3.5`
- aarch64: `resin/aarch64-alpine:3.5`
- amd64: `resin/amd64-alpine:3.5`
- i386: `resin/i386-alpine:3.5`

Use `docker` to build the test addon: `docker build -t local/my-test-addon .`

Create a new folder for data and add a test _options.json_ file. After that you can run your add-on with: `docker run --rm -v /tmp/my_test_data:/data -p PORT_STUFF_IF_NEEDED local/my-test-addon`

## {% linkable_title Logs %}

All stdout and stderr is redirected to the Docker logs. The logs can be fetched from the add-on page inside the Hass.io panel in Home Assistant.

[Samba add-on]: /addons/samba/
[SSH add-on]: /addons/ssh/
