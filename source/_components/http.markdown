---
layout: component
title: "HTTP"
description: "Offers a web framework to serve files."
date: 2015-12-06 21:35
sidebar: true
comments: false
sharing: true
footer: true
logo: http.png
ha_category: "Other"
---

The HTTP component serves all files and data required for the Home Assistant frontend. You only need to add this to your configuration file if you want to change any of the default settings.

```yaml
# Example configuration.yaml entry
http:
  # Optional, protect Home Assistant with a password
  api_password: XXX
  # Optional, disable caching and load unvulcanized assets
  development: 1
  # Optional, serve Home Assistant over a secure connection
  ssl_certificate: /etc/letsencrypt/live/hass.example.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/hass.example.com/privkey.pem
```
