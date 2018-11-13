---
layout: page
title: "Mikrotik"
description: "Instructions on how to integrate Mikrotik/Routerboard based routers into Home Assistant."
date: 2017-04-28 16:03
sidebar: true
comments: false
sharing: true
footer: true
logo: mikrotik.png
ha_category: Presence Detection
ha_release: 0.44
---


The `mikrotik` platform offers presence detection by looking at connected devices to a [Mikrotik Routerboard](http://routerboard.com) based router.

You need to enable the RouterOS API to use this platform.

Terminal:

```bash
/ip service
set api disabled=no port=8728
```

Web Frontend:

Go to **IP** -> **Services** -> **API** and enable it.

Make sure that port 8728 or the port you choose is accessible from your network.

To use a Mikrotik router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mikrotik
    host: IP_ADDRESS
    username: ADMIN_USERNAME
    password: ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router.
  required: true
  type: string
username:
  description: The username of an user with administrative privileges.
  required: true
  type: string
password:
  description: The password for your given admin account.
  required: true
  type: string
port:
  description: Mikrotik API port.
  required: false
  default: 8728 (or 8729 if ssl is true)
  type: integer
ssl:
  description: Use api_ssl service instead of api.
  required: false
  default: false
  type: boolean
method:
  description: Override autodetection of device scanning method. Can be `wireless` to use local wireless registration, `capsman` for capsman wireless registration, or `ip` for DHCP leases.
  required: false
  type: string
{% endconfiguration %}

To use api_ssl service further configuration is required at RouterOS side. You have to upload or generate a certificate for api\-ssl service. Here is an example for a self signed certificate:

```bash
/certificate add common-name="Self signed demo certificate for API" days-valid=3650 name="Self signed demo certificate for API" key-usage=digital-signature,key-encipherment,tls-server,key-cert-sign,crl-sign
/certificate sign "Self signed demo certificate for API"
/ip service set api-ssl certificate="Self signed demo certificate for API"
/ip service enable api-ssl
```
If everything is working you can disable the pure api service:

```bash
/ip service disable api
```
See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
