---
layout: page
title: "Caddy Server reverse proxy"
description: "Configure Caddy Server as a reverse proxy to Home Assistant."
date: 2017-08-22 22:20
sidebar: true
comments: false
sharing: true
footer: true
---

Configure [Caddy Server](https://caddyserver.com/) for use as a reverse proxy to Home Assistant.

```
hass.example.org {
    proxy / localhost:8123 {
        websocket
        transparent
    }
}
```
