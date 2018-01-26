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

<p class='note warning'>
It is HIGHLY recommended that you set the `api_password`, especially if you are planning to expose your installation to the internet.
</p>

<p class='note'>
Don't use option `server_host` on a hass.io installation!
</p>

```yaml
# Example configuration.yaml entry
http:
  api_password: YOUR_PASSWORD
```

Configuration variables:

- **api_password** (*Optional*): Protect Home Assistant with a password.
- **server_host** (*Optional*): Only listen to incoming requests on specific IP/host (default: accept all)
- **server_port** (*Optional*): Let you set a port to use. Defaults to 8123.
- **base_url** (*Optional*): The URL that Home Assistant is available on the internet. For example: `hass-example.duckdns.org:8123`. Defaults to the local IP address. The iOS app finds local installations, if you have an outside URL use this so that you can auto-fill when discovered in the app.
- **ssl_certificate** (*Optional*): Path to your TLS/SSL certificate to serve Home Assistant over a secure connection.
- **ssl_key** (*Optional*): Path to your TLS/SSL key to serve Home Assistant over a secure connection.
- **cors_allowed_origins** (*Optional*): A list of origin domain names to allow [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) requests from. Enabling this will set the `Access-Control-Allow-Origin` header to the Origin header if it is found in the list, and the `Access-Control-Allow-Headers` header to `Origin, Accept, X-Requested-With, Content-type, X-HA-access`. You must provide the exact Origin, i.e. `https://home-assistant.io` will allow requests from `https://home-assistant.io` but __not__ `http://home-assistant.io`.
- **use_x_forwarded_for** (*Optional*): Enable parsing of the `X-Forwarded-For` header, passing on the client's correct IP address in proxied setups. You should only enable this in a trustworthy network environment, as clients passing that header could easily spoof their source IP address. Defaults to False.
- **trusted_networks** (*Optional*): List of trusted networks, consisting of IP addresses or networks, that are allowed to bypass password protection when accessing Home Assistant. It should be noted that if you use a reverse proxy, all requests to Home Assistant, regardless of source, will arrive from the reverse proxy IP address. Therefore in a reverse proxy scenario, this option should be used with extreme care.
- **ip_ban_enabled** (*Optional*): Flag indicating whether additional IP filtering is enabled. Defaults to False.
- **login_attempts_threshold** (*Optional*): Number of failed login attempt from single IP after which it will be automatically banned if `ip_ban_enabled` is True. Defaults to -1, meaning that no new automatic bans will be added.

The sample below shows a configuration entry with possible values: 

```yaml
# Example configuration.yaml entry
http:
  api_password: YOUR_PASSWORD
  server_port: 12345
  ssl_certificate: /etc/letsencrypt/live/hass.example.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/hass.example.com/privkey.pem
  cors_allowed_origins:
    - https://google.com
    - https://home-assistant.io
  use_x_forwarded_for: True
  trusted_networks:
    - 127.0.0.1
    - ::1
    - 192.168.0.0/24
    - 2001:DB8:ABCD::/48
  ip_ban_enabled: True
  login_attempts_threshold: 5
```

The [Set up encryption using Let's Encrypt](/blog/2015/12/13/setup-encryption-using-lets-encrypt/) blog post gives you details about the encryption of your traffic using free certificates from [Let's Encrypt](https://letsencrypt.org/).

Or use a self signed certificate following the instructions here [Self-signed certificate for SSL/TLS](/docs/ecosystem/certificates/tls_self_signed_certificate/).

On top of the `http` component is a [REST API](/developers/rest_api/), [Python API](/developers/python_api/) and [WebSocket API](/developers/websocket_api/) available. There is also support for [Server-sent events](/developers/server_sent_events/).

The `http` platforms are not real platforms within the meaning of the terminology used around Home Assistant. Home Assistant's [REST API](/developers/rest_api/) sends and receives messages over HTTP. 

To use those kind of [sensors](/components/sensor.http/) or [binary sensors](components/binary_sensor.http/) in your installation no configuration in Home Assistant is needed. All configuration is done on the devices themselves. This means that you must be able to edit the target URL or endpoint and the payload. The entity will be created after the first message has arrived.

All [requests](/developers/rest_api/#post-apistatesltentity_id) need to be sent to the endpoint of the device and must be **POST**.

If you want to use Home Assistant to host or serve static files then create a directory called `www` under the `.homeassistant` configuration path. The static files in `.homeassistant/www/` can be accessed by the following URL `http://your.domain:8123/local/`.

If you want to apply additional IP filtering, and automatically ban brute force attempts, set `ip_ban_enabled` to `True` and the maximum number of attempts. After the first ban, an `ip_bans.yaml` file will be created in the root configuration folder. It will have the banned IP address and time in UTC when it was added: 

```yaml
127.0.0.1:
  banned_at: '2016-11-16T19:20:03'
```

After a ban is added a Persistent Notification is populated to the Home Assistant frontend. 

<p class='note warning'>
Please note, that sources from `trusted_networks` won't be banned automatically. 
</p>
