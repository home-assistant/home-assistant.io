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

The `http` component serves all files and data required for the Home Assistant frontend. You only need to add this to your configuration file if you want to change any of the default settings.

```yaml
# Example configuration.yaml entry
http:
  api_password: YOUR_PASSWORD
  server_port: 12345
  development: 1
  ssl_certificate: /etc/letsencrypt/live/hass.example.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/hass.example.com/privkey.pem
```

Configuration variables:

- **api_password** (*Optional*): Protect Home Assistant with a password
- **server_port** (*Optional*): Let you set a port to use. Defaults to 8123.
- **development** (*Optional*): Disable caching and load unvulcanized assets. Useful for Frontend development.
- **ssl_certificate** (*Optional*): Path to your TLS/SSL certificate to serve Home Assistant over a secure connection.
- **ssl_key** (*Optional*): Path to your TLS/SSL key to serve Home Assistant over a secure connection.

