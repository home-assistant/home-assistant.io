---
layout: page
title: "Synology"
description: "Instructions on how to get Home Assistant up and running on Synology"
release_date: 2016-12-07 15:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /ecosystem/synology/
---

Synology NAS are the perfect companion to running Home Assistant.

### {% linkable_title HTTP Configuration %}

Synology will require some extra configuration to get the Home Assistant frontend working.

- Copy the Home Assistant specific Reverse Proxy settings from the existing `/etc/nginx/app.d/server.ReverseProxy.conf` to `/usr/local/etc/nginx/conf.d/http.HomeAssistant.conf`
- Include these lines in the location declaration:

```
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
```
