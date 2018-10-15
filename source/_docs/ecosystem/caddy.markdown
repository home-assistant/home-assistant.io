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
## Install
For the one step installer type:
```
curl https://getcaddy.com | bash -s personal
```
Then create a file named ``Caddyfile``:
```
hass.yourdomain.org {
    proxy / yourhassinternalip:8123 {
        websocket
        transparent
    }
}
```
To run your Caddy Server type:
```
caddy -agree=true -conf=/path/to/your/Caddyfile -email youremail@example.com
```
If you encounter issues with Google TTS update your ``base_url`` to include ``https``:
```yaml
http:
  base_url: https://hass.example.org
```
## More Info
To learn more about Caddy Server go to the [Caddy Docs](https://caddyserver.com/docs)
