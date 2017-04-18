---
layout: page
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

- **api_password** (*Optional*): Protect Home Assistant with a password.
- **server_port** (*Optional*): Let you set a port to use. Defaults to 8123.
- **development** (*Optional*): Disable caching and load unvulcanized assets. Useful for Frontend development.
- **ssl_certificate** (*Optional*): Path to your TLS/SSL certificate to serve Home Assistant over a secure connection.
- **ssl_key** (*Optional*): Path to your TLS/SSL key to serve Home Assistant over a secure connection.

On top of the `http` component is a [REST API](/developers/rest_api/) and a [Python API](/developers/python_api/) available.

The `http` platforms are not a real platform within the meaning of the terminology used around Home Assistant. Home Assistant's [REST API](/developers/rest_api/) is consuming and proceeding messages received over HTTP. 

To use those kind of sensors in your installation no configuration in Home Assistant is needed. All configuration is done on the devices themselves. This means that you must be able to edit the target URL or endpoint and the payload. The entity will be created after the first message has arrived.

All [requests](/developers/rest_api/#post-apistatesltentity_id) needs to be sent to the endpoint of the device and must be **POST**.
