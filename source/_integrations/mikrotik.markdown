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
---

The `mikrotik` platform offers presence detection by looking at connected devices to a [MikroTik RouterOS](https://mikrotik.com) based router.

There is currently support for the following device types within Home Assistant:

- Presence Detection

## Configuring `mikrotik` hub

You have to enable accessing the RouterOS API on your router to use this platform.

Terminal:

```bash
/ip service
set api disabled=no port=8728
```

Web Frontend:

Go to **IP** -> **Services** -> **API** and enable it.

Make sure that port 8728 or the port you choose is accessible from your network.

Home Assistant offers MikroTik integration through **Configuration** -> **Integrations** -> **MikroTik**.
It also allows importing from the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mikrotik:
  - name: Mikrotik
    host: IP_ADDRESS
    username: ROUTEROS_USERNAME
    password: ROUTEROS_PASSWORD
```

{% configuration %}
name:
  description: The name of your MikroTik device.
  required: true
  default: Mikrotik
  type: string
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
verify_ssl:
  description: Use SSL to connect to the API.
  required: false
  default: false
  type: boolean
arp_ping:
  description: Use ARP ping with DHCP method for device scanning.
  required: false
  default: false
  type: boolean
force_dhcp:
  description: Force use of DHCP server list for devices to be tracked.
  required: false
  default: false
  type: boolean
detection_time:
  description: How long since the last seen time before the device is marked away, specified in seconds.
  required: false
  default: 300
  type: integer
{% endconfiguration %}

## Use a certificate

To use SSL to connect to the API (via `api-ssl` instead of `api` service) further configuration is required at RouterOS side. You have to upload or generate a certificate and configure `api-ssl` service to use it. Here is an example of a self-signed certificate:

```bash
/certificate add common-name="Self signed demo certificate for API" days-valid=3650 name="Self signed demo certificate for API" key-usage=digital-signature,key-encipherment,tls-server,key-cert-sign,crl-sign
/certificate sign "Self signed demo certificate for API"
/ip service set api-ssl certificate="Self signed demo certificate for API"
/ip service enable api-ssl
```

Then add `verify_ssl: true` to `mikrotik` device tracker entry in your `configuration.yaml` file.

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

## Using the additional configuration to the `mikrotik` entry in your `configuration.yaml` file

```yaml
mikrotik:
  - host: 192.168.88.1
    username: homeassistant
    password: YOUR_PASSWORD
    verify_ssl: true
    arp_ping: true
    force_dhcp: true
    detection_time: 30
```
