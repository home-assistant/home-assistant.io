---
layout: page
title: "Publishing your add-on"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

At the end, all add-ons are simple docker container. You can use our build scripts for automate the hole process our you can build your own docker image and push it manual do a docker hub. Inside your addon `config.json` can you use:
```json
{
  "image": "myhub/image-addon-name"
}
{
  "image": "myhub/image-{arch}-addon-name"
}
```

To specify from where it will load the addon by user installation. With `{arch}` inside image name, you can build your addon for multible architectures.


## {% linkable_title Custom Add-ons %}

You need a docker hub account. It is also possible to use our own docker registrator.

## {% linkable_title Core Add-ons %}
