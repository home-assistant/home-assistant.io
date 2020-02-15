---
title: "Apache Proxy"
description: "Configure Apache to work with Home Assistant as a subdomain"
redirect_from: /cookbook/apache_configuration/
---

This example demonstrates how you can configure Apache to act as a proxy for Home Assistant.

This is useful if you want to have:

 * a subdomain redirecting to your Home Assistant instance
 * several subdomain for several instance
 * HTTPS redirection

#### Subdomain

So you already have a working Apache server available at example.org. Your Home Assistant is correctly working on this web server and available at `http://localhost:8123`

Enable [`mod_proxy_wstunnel`](https://httpd.apache.org/docs/2.4/mod/mod_proxy_wstunnel.html) by running if you encounter issues while serving Home Assistant through your proxy:

```bash
$ sudo a2enmod proxy_wstunnel
```

To be able to access to your Home Assistant instance by using `https://home.example.org`, add the following file to `/etc/httpd/conf/extra/` as `hass.conf`

```text
<VirtualHost *:443>
  ServerName home.example.org
  ProxyPreserveHost On
  ProxyRequests off
  ProxyPass /api/websocket ws://localhost:8123/api/websocket
  ProxyPassReverse /api/websocket ws://localhost:8123/api/websocket
  ProxyPass / http://localhost:8123/
  ProxyPassReverse / http://localhost:8123/

  RewriteEngine on
  RewriteCond %{HTTP:Upgrade} =websocket [NC]
  RewriteRule /(.*)  ws://localhost:8123/$1 [P,L]
  RewriteCond %{HTTP:Upgrade} !=websocket [NC]
  RewriteRule /(.*)  http://localhost:8123/$1 [P,L]
</VirtualHost>
```

and make sure that this file is read by Apache's main configuration file `/etc/httpd/conf/httpd.conf`

```text
...
Include conf/extra/hass.conf
...
```

If you don't want HTTPS, you can change `<VirtualHost *:443>` to `<VirtualHost *:80>` or better consider redirecting all HTTP to HTTPS.

<div class='note'>
In case you are getting occasional HTTP 504 error messages ("Gateway Timeout") or HTTP 502 messages ("Bad Gateway") when accessing the Web UI through your proxy, try adding disablereuse=on to both ProxyPass directives:
</div>

```text
<VirtualHost *:443>
  [...]
  ProxyPass /api/websocket ws://localhost:8123/api/websocket disablereuse=on
  [...]
  ProxyPass / http://localhost:8123/ disablereuse=on
  [...]
</VirtualHost>
```

#### Multiple Instance

You already have Home Assistant running on `http://localhost:8123` and available at home.example.org as describe before. The configuration file for this Home Assistant is available in `/home/alice/.homeassistant/configuration.yaml`

You want another instance available at `https://countryside.example.org`

You can either :
 * Create a new user, `bob`, to hold the configuration file in `/home/bob/.homeassistant/configuration.yaml` and run Home Assistant as this new user
 * Create another configuration directory in `/home/alice/.homeassistan2/configuration.yaml` and run Home Assistant using `hass --config /home/alice/.homeassistant2/`

In both solution, change port number used by modifying `configuration.yaml`

```yaml
http:
  server_port: 8124
  ...
```

Start Home Assistant: Now, you have another instance running on `http://localhost:8124`

To access this instance by using `https://countryside.example.org` add to `/etc/httpd/conf/extra/hass.conf`

```text
<VirtualHost *:443>
  ProxyPreserveHost On
  ProxyRequests Off
  ServerName countryside.example.org
  ProxyPass /api/websocket ws://localhost:8123/api/websocket
  ProxyPassReverse /api/websocket ws://localhost:8123/api/websocket
  ProxyPass / http://localhost:8124/
  ProxyPassReverse / http://localhost:8124/
</VirtualHost>
```

#### HTTP to HTTPS redirection

Add to your `/etc/httpd/conf/extra/hass.conf`

```text
<VirtualHost *:80>
  ServerName example.org
  ServerSignature Off

  RewriteEngine on
  RewriteCond %{HTTPS} !=on
  RewriteRule .* https://%{SERVER_NAME}%{REQUEST_URI} [NE,R,L]
</VirtualHost>
```
