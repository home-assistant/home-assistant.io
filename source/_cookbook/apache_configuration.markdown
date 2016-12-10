---
layout: page
title: "Apache Configuration"
description: "Configure Apache to work with home assistant as a subdomain"
date: 2016-06-20 13:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Infrastructure
---

This example demonstrates how you can configure Apache to act as a proxy for home assistant.

This is useful if you want to have:

 * a subdomain redirecting to your home assistant instance
 * several subdomain for several instance
 * HTTPS redirection

#### {% linkable_title Subdomain %}

So you already have a working Apache server available at example.org.
Your home assistant is correctly working on this web server and available at localhost:8123

To be able to access to your home assistant instance by using https://home.example.org, add to following file into `/etc/httpd/conf/extra/hass.conf`

```text
<VirtualHost *:443>
  ProxyPreserveHost On
  ProxyRequests Off
  ServerName home.example.org
  ProxyPass /api/websocket ws://localhost:8123/api/websocket
  ProxyPassReverse /api/websocket ws://localhost:8123/api/websocket
  ProxyPass / http://localhost:8123/
  ProxyPassReverse / http://localhost:8123/
</VirtualHost>
```

and make sure that this file is read by Apache's main configuration file `/etc/httpd/conf/httpd.conf`

```text
...
Include conf/extra/hass.conf
...
```

If you don't want HTTPS, you can change `<VirtualHost *:443>` to `<VirtualHost *:80>` or better consider redirecting all HTTP to HTTPS.


#### {% linkable_title Multiple Instance %}

You already have home assistant running on localhost:8123 and available at home.example.org as describe before.
The configuration file for this home assistant is available in `/home/alice/.homeassistant/configuration.yaml`

You want another instance available at https://countryside.example.org

You can either :
 * Create a new user, `bob`, to hold the configuration file in `/home/bob/.homeassistant/configuration.yaml` and run home assistant as this new user
 * Create another configuration directory in `/home/alice/.homeassistan2/configuration.yaml` and run home assistant using `hass --config /home/alice/.homeassistant2/`

In both solution, change port number used by modifying `configuration.yaml`

```yaml
http:
  server_port: 8124
  ...
```

Start home assistant: Now, you have another instance running on localhost:8124

To access this instance by using https://countryside.example.org add to `/etc/httpd/conf/extra/hass.conf`

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

#### {% linkable_title HTTP to HTTPS redirection %}

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
