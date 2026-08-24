---
title: Mikrotik
description: Instructions on how to integrate MikroTik/RouterOS based devices into Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Hub
  - Presence detection
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 0.44
ha_codeowners:
  - '@engrbm87'
ha_config_flow: true
ha_domain: mikrotik
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - select
  - sensor
  - switch
  - update
ha_integration_type: device
---

The **MikroTik** {% term integration %} offers presence detection by looking at connected devices to a [MikroTik RouterOS](https://mikrotik.com) based router.

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

Go to **IP** > **Services** > **API** and enable it.

Make sure that port 8728 or the port you choose is accessible from your network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your MikroTik router."
Username:
  description: "The username used to authenticate with the RouterOS API."
Password:
  description: "The password for the username above."
Port:
  description: "The port the RouterOS API listens on. The default is `8728`. If you use SSL, the default `api-ssl` port is `8729`."
Verify SSL certificate:
  description: "When enabled, the SSL certificate presented by the router is verified. Disable this if you use a self-signed certificate."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Force scanning using DHCP:
  description: "When disabled (default), the integration detects devices from the wireless registration table (CAPSman, wireless, wifiwave2, or wifi). When enabled, it uses the DHCP lease table instead. Enable this if you also want to detect wired (non-wireless) devices connected to your router."
Enable ARP ping:
  description: "When enabled, the integration sends an ARP ping to each non-wireless device that has an active DHCP address to verify that the device is actually reachable on the network. This prevents stale DHCP leases from keeping a device marked as home after it has left."
Consider home interval:
  description: "The time in seconds a device must be unseen before it is considered away. The default is 300 seconds (5 minutes)."
{% endconfiguration_basic %}

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

## Supported functionality

The **MikroTik** {% term integration %} provides the following entities.

### Binary Sensor

The integration creates binary sensor entities when the connected device exposes that information. Not every device supports every sensor.

- **Interface**: Ethernet, Wifi, Bridge connectivity

### Sensors

The integration creates sensor entities when the connected device exposes that information. Not every device supports every sensor.

- Uptime
- Memory usage
- Disk usage
- CPU usage
- Device temperature
- Device power voltage

### Buttons

The integration creates the following button entities:

- **Restart**: Reboots the MikroTik device.
- **Shutdown**: Powers off the MikroTik device. After a shutdown, the device is no longer reachable over the network and cannot be powered back on remotely from Home Assistant.

### Select

The integration creates select entities when the connected device exposes that information. Not every device supports every select entity.

- **Poe (out)**: Set PoE out behavior for specific interface: `off`, `auto-on`, `forced-on`

### Switches

The integration creates switch entities when the connected device exposes that information. Not every device supports every sensor.

- Ethernet
- Wifi

### Update

The integration creates the following update entities:

- **RouterOS**: Updates OS firmware.
- **RouterBOARD**: Updates BOARD firmware.
