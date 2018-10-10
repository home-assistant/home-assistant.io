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

Synology NAS are the perfect companion to running Home Assistant. But by default, the DSM Reverse Proxy does not configure its NGINX settings to allow WebSocket, and some extra configuration will be required to get the Home Assistant frontend working with the DSM.

### {% linkable_title Template change %}

To allow WebSocket by default for all service exposed by NGINX, you can enable it in the template file located in `/usr/syno/share/nginx/Portal.mustache`. Please be really careful in editing this file since you may break access to the DSM UI. Please backup this file before any edition.

Open `/usr/syno/share/nginx/Portal.mustache` and add the followings in the `Location` section:

```
        proxy_set_header        Upgrade             $http_upgrade;
        proxy_set_header        Connection          "upgrade";
        proxy_read_timeout      86400;
```

Then restart the NGINX daemon:

```bash
sudo synoservicecfg --restart nginx
```

This will restart the running HTTP service, not only reverse proxy, as a single instance of NGINX runs everything.

You can find more information [here](https://github.com/orobardet/dsm-reverse-proxy-websocket).

#### {% linkable_title HTTP Configuration %}

- Copy the Home Assistant specific Reverse Proxy settings from the existing `/etc/nginx/app.d/server.ReverseProxy.conf` file to `/usr/local/etc/nginx/conf.d/http.HomeAssistant.conf`.
- Include these lines in the location declaration:

```
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
```
