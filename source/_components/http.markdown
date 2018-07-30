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

The `http` component serves all files and data required for the Home Assistant
frontend. You only need to add this to your configuration file if you want to
change any of the default settings.

<p class='note warning'>
It is HIGHLY recommended that you set the `api_password`,
especially if you are planning to expose your installation to the internet.
</p>

<p class='note'>
Don't use option `server_host` on a hass.io installation!
</p>

```yaml
# Example configuration.yaml entry
http:
  api_password: YOUR_PASSWORD
```

{% configuration %}
api_password:
  description: Protect Home Assistant with a password.
  required: false
  type: string
server_host:
  description: "Only listen to incoming requests on specific IP/host. By default it will accept all IPv4 connections. Use `::0` if you want to listen to (and only) IPv6."
  required: false
  type: string
  default: 0.0.0.0
server_port:
  description: Let you set a port to use.
  required: false
  type: int
  default: 8123
base_url:
  description: "The URL that Home Assistant is available on the internet. For example: `hass-example.duckdns.org:8123`. The iOS app finds local installations, if you have an outside URL use this so that you can auto-fill when discovered in the app."
  required: false
  type: string
  default: "*the local IP address*"
ssl_certificate:
  description: Path to your TLS/SSL certificate to serve Home Assistant over a secure connection.
  required: false
  type: string
ssl_peer_certificate:
  description: Path to the client/peer TLS/SSL certificate to accept secure connections from.
  required: false
  type: string
ssl_key:
  description: Path to your TLS/SSL key to serve Home Assistant over a secure connection.
  required: false
  type: string
cors_allowed_origins:
  description: "A list of origin domain names to allow [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) requests from. Enabling this will set the `Access-Control-Allow-Origin` header to the Origin header if it is found in the list, and the `Access-Control-Allow-Headers` header to `Origin, Accept, X-Requested-With, Content-type, X-HA-access`. You must provide the exact Origin, i.e. `https://www.home-assistant.io` will allow requests from `https://www.home-assistant.io` but __not__ `http://www.home-assistant.io`."
  required: false
  type: list
use_x_forwarded_for:
  description: "Enable parsing of the `X-Forwarded-For` header, passing on the client's correct IP address in proxied setups. You must also whitelist trusted proxies using the `trusted_proxies` setting below for this to work. Non-whitelisted requests with this header will be considered IP spoofing attacks, and the header will, therefore, be ignored."
  required: false
  type: boolean
  default: false
trusted_proxies:
  description: "List of trusted proxies, consisting of IP addresses or networks, that are allowed to set the `X-Forwarded-For` header.  This is required when using `use_x_forwarded_for` because all requests to Home Assistant, regardless of source, will arrive from the reverse proxy IP address. Therefore in a reverse proxy scenario, this option should be set with extreme care."
  required: false
  type: list
trusted_networks:
  description: "List of trusted networks, consisting of IP addresses or networks, that are allowed to bypass password protection when accessing Home Assistant.  If using a reverse proxy with the `use_x_forwarded_for` option enabled, requests proxied to Home Assistant with a trusted `X-Forwarded-For` header will appear to come from the IP given in that header instead of the proxy IP."
  required: false
  type: list
ip_ban_enabled:
  description: Flag indicating whether additional IP filtering is enabled.
  required: false
  type: boolean
  default: false
login_attempts_threshold:
  description: "Number of failed login attempt from single IP after which it will be automatically banned if `ip_ban_enabled` is true. By default it will not add new automatic bans."
  required: false
  type: int
  default: -1
{% endconfiguration %}

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
    - https://www.home-assistant.io
  use_x_forwarded_for: true
  trusted_proxies:
    - 127.0.0.1
    - ::1
  trusted_networks:
    - 127.0.0.1
    - ::1
    - 192.168.0.0/24
    - fd00::/8
  ip_ban_enabled: true
  login_attempts_threshold: 5
```

The [Set up encryption using Let's Encrypt](/blog/2015/12/13/setup-encryption-using-lets-encrypt/)
blog post gives you details about the encryption of your traffic using free
certificates from [Let's Encrypt](https://letsencrypt.org/).

Or use a self signed certificate following the instructions here
[Self-signed certificate for SSL/TLS](/docs/ecosystem/certificates/tls_self_signed_certificate/).

## {% linkable_title APIs %}

On top of the `http` component is a [REST API](/developers/rest_api/),
[Python API](/developers/python_api/) and
[WebSocket API](/developers/websocket_api/) available. There is also support for
[Server-sent events](/developers/server_sent_events/).

The `http` platforms are not real platforms within the meaning of the
terminology used around Home Assistant. Home Assistant's
[REST API](/developers/rest_api/) sends and receives messages over HTTP.

## {% linkable_title HTTP sensors %}

To use those kind of [sensors](/components/sensor.http/) or
[binary sensors](components/binary_sensor.http/) in your installation no
configuration in Home Assistant is needed. All configuration is done on the
devices themselves. This means that you must be able to edit the target URL or
endpoint and the payload.
The entity will be created after the first message has arrived.

All [requests](/developers/rest_api/#post-apistatesltentity_id) need to be sent
to the endpoint of the device and must be **POST**.

## {% linkable_title IP filtering and banning %}

If you want to apply additional IP filtering, and automatically ban brute force
attempts, set `ip_ban_enabled` to `true` and the maximum number of attempts.
After the first ban, an `ip_bans.yaml` file will be created in the root
configuration folder.
It will have the banned IP address and time in UTC when it was added:

```yaml
127.0.0.1:
  banned_at: '2016-11-16T19:20:03'
```

After a ban is added a Persistent Notification is populated to the Home
Assistant frontend.

<p class='note warning'>
Please note, that sources from `trusted_networks` won't be banned automatically.
</p>

## {% linkable_title Hosting files %}

If you want to use Home Assistant to host or serve static files then create a
directory called `www` under the configuration path (`/config` on Hass.io,
`.homeassistant` elsewhere). The static files in `www/` can be accessed by the
following URL `http://your.domain:8123/local/`, for example `audio.mp3` would
be accessed as `http://your.domain:8123/local/audio.mp3`.

<p class='note'>
  If you've had to create the `www/` folder for the first time, you'll need to restart Home Assistant.
</p>
