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

 
#### It is recomended that you read the script at [getcaddy.com](https://getcaddy.com/) before proceeding and understand the risks

#### It can be potentially dangerous to send a command straight to bash please make sure you trust the source before running this command

Once you are ready to proceed with the installer type:
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

Make sure to forward ports: `80` and `443` on your router so that the SSL certificates can be generated

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

For more info on port forwarding visit: [portforward.com](https://portforward.com/router.htm) and select your router to find a guide specific to your router