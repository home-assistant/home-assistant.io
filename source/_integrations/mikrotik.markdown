---
title: Mikrotik
description: Instructions on how to integrate MikroTik/RouterOS based devices into Home Assistant.
ha_category:
  - Hub
  - Presence Detection
ha_release: 0.44
ha_codeowners:
  - '@engrbm87'
ha_config_flow: true
ha_domain: mikrotik
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
---

The `mikrotik` platform offers presence detection by looking at connected devices to a [MikroTik RouterOS](https://mikrotik.com) based router.

There is currently support for the following device types within Home Assistant:

- Presence Detection

## Prerequisites

You have to enable accessing the RouterOS API on your router to use this platform.

Terminal:

```bash
/ip service
set api disabled=no port=8728
```

Web Frontend:

Go to **IP** -> **Services** -> **API** and enable it.

Make sure that port 8728 or the port you choose is accessible from your network.

{% include integrations/config_flow.md %}

## Use a certificate

To use SSL to connect to the API (via `api-ssl` instead of `api` service) further configuration is required at RouterOS side. You have to upload or generate a certificate and configure `api-ssl` service to use it. Here is an example of a self-signed certificate:

```bash
/certificate add common-name="Self signed demo certificate for API" days-valid=3650 name="Self signed demo certificate for API" key-usage=digital-signature,key-encipherment,tls-server,key-cert-sign,crl-sign
/certificate sign "Self signed demo certificate for API"
/ip service set api-ssl certificate="Self signed demo certificate for API"
/ip service enable api-ssl
```

If everything is working fine you can disable the pure `api` service in RouterOS:

```bash
/ip service disable api
```

## The user privileges in RouterOS

To use this device tracker you need restricted privileges only. To enhance the security of your MikroTik device create a "read only" user who is able to connect to API  and perform ping test only:

```bash
/user group add name=homeassistant policy=read,api,!local,!telnet,!ssh,!ftp,!reboot,!write,!policy,test,!winbox,!password,!web,!sniff,!sensitive,!romon,!dude,!tikapp
/user add group=homeassistant name=homeassistant
/user set password="YOUR_PASSWORD" homeassistant
```
