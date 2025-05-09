---
title: Mikrotik
description: Instructions on how to integrate MikroTik/RouterOS based devices into Home Assistant.
ha_category:
  - Hub
  - Presence detection
ha_release: 0.44
ha_codeowners:
  - '@engrbm87'
ha_config_flow: true
ha_domain: mikrotik
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: integration
---

The `mikrotik` platform offers presence detection by looking at connected devices to a [MikroTik RouterOS](https://mikrotik.com) based router.

There is currently support for the following device types within Home Assistant:

- Presence detection

## Prerequisites

You have to enable accessing the RouterOS API on your router to use this platform.

RouterOS uses a ping test to determine client presence, make sure you are not blocking this on the client (Windows firewall default behavior), as this will result in the provided `device_tracker` having the state `not_home`.

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

To use this device tracker, you only need limited privileges. To enhance the security of your MikroTik device, create a "read only" group with solely API and ping test permissions and add a user to that group:

```bash
/user
group add name=homeassistant policy=read,api,test
add group=homeassistant name=homeassistant
```

You will be prompted to set a password for the newly created user. Depending on your RouterOS version and configuration, you might need to set a password yourself:

```bash
/user set [find username=homeassistant] password=PASSWORD
```
