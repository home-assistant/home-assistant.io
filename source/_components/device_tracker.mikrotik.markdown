---
layout: page
title: "MikroTik"
description: "Instructions on how to integrate MikroTik/RouterOS based devices into Home Assistant."
date: 2017-04-28 16:03
sidebar: true
comments: false
sharing: true
footer: true
logo: mikrotik.png
ha_category: Presence Detection
ha_release: 0.44
---

The `mikrotik` platform offers presence detection by looking at connected devices to a [MikroTik RouterOS](http://mikrotik.com) based router.

## {% linkable_title Configuring `mikrotik` device tracker %}

You have to enable accessing the RouterOS API on your router to use this platform.

Terminal:

```bash
/ip service
set api disabled=no port=8728
```

Web Frontend:

Go to **IP** -> **Services** -> **api** and enable it.

Make sure that port 8728 or the port you choose is accessible from your network.


To use a MikroTik router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: mikrotik
    host: IP_ADDRESS
    username: ROUTEROS_USERNAME
    password: ROUTEROS_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your MikroTik device.
  required: true
  type: string
username:
  description: The username of a user on the MikroTik device.
  required: true
  type: string
password:
  description: The password of the given user account on the MikroTik device.
  required: true
  type: string
port:
  description: RouterOS API port.
  required: false
  default: 8728 (or 8729 if SSL is enabled)
  type: integer
ssl:
  description: Use SSL to connect to the API.
  required: false
  default: false
  type: boolean
method:
  description: Override autodetection of device scanning method. Can be `wireless` to use local wireless registration, `capsman` for capsman wireless registration, or `ip` for DHCP leases.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Use a certificate %}

To use SSL to connect to the API (via `api-ssl` instead of `api` service) further configuration is required at RouterOS side. You have to upload or generate a certificate and configure `api-ssl` service to use it. Here is an example of a self-signed certificate:

```bash
/certificate add common-name="Self signed demo certificate for API" days-valid=3650 name="Self signed demo certificate for API" key-usage=digital-signature,key-encipherment,tls-server,key-cert-sign,crl-sign
/certificate sign "Self signed demo certificate for API"
/ip service set api-ssl certificate="Self signed demo certificate for API"
/ip service enable api-ssl
```

Then add `ssl: true` to `mikrotik` device tracker entry in your `configuration.yaml` file.

If everything is working fine you can disable the pure `api` service in RouterOS:

```bash
/ip service disable api
```

## {% linkable_title The user privileges in RouterOS %}

To use this device tracker you need restricted privileges only. To enhance the security of your MikroTik device create a "read only" user who is able to connect to API only:

```bash
/user group add name=homeassistant policy=read,api,!local,!telnet,!ssh,!ftp,!reboot,!write,!policy,!test,!winbox,!password,!web,!sniff,!sensitive on,!dude,!tikapp
/user add group=homeassistant name=homeassistant
/user set password="YOUR_PASSWORD" homeassistant
```

## {% linkable_title Using the additional configuration to the `mikrotik` device tracker entry in your `configuration.yaml` file: %}

```yaml
device_tracker:
  - platform: mikrotik
    host: 192.168.88.1
    username: homeassistant
    password: YOUR_PASSWORD
    ssl: true
    port: 8729
    method: capsman
```

See the [device tracker component page](/components/device_tracker/) for instructions on how to configure the people to be tracked.
