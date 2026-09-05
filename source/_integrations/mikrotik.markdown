---
title: MikroTik
description: Instructions on how to integrate MikroTik/RouterOS based devices into Home Assistant.
ha_category:
  - Button
  - Hub
  - Presence detection
  - Sensor
  - Update
ha_release: 0.44
ha_codeowners:
  - '@engrbm87'
ha_config_flow: true
ha_domain: mikrotik
ha_iot_class: Local Polling
ha_platforms:
  - button
  - device_tracker
  - sensor
  - update
ha_integration_type: device
---

The **MikroTik** {% term integration %} offers presence detection and device management for [MikroTik](https://mikrotik.com) routers, switches, and Cloud Hosted Routers (CHR) running RouterOS.

Common use cases include:

- Track connected devices for presence detection to trigger automations when family members arrive home or leave.
- Monitor router health, such as CPU, memory, and disk usage, or device temperature and power voltage.
- Get notified about RouterOS and RouterBOARD firmware updates and install them from Home Assistant.
- Enable or disable specific Ethernet or Wi-Fi interfaces, or <abbr title="Power over Ethernet">PoE</abbr> output on interfaces that support it.
- Restart or shut down the router as part of an automation.

## Supported devices

This integration works with any device running MikroTik RouterOS, including physical routers and switches as well as the Cloud Hosted Router (CHR) virtual appliance, on RouterOS versions 6 and 7.

Some entities depend on hardware and firmware capabilities and are only created when the router reports the corresponding data:

- The **RouterBOARD** update entity is only available on physical devices that have a RouterBOARD. It doesn't appear on the Cloud Hosted Router (CHR) or other RouterOS installations without one.
- Wireless-related entities depend on which wireless system the router uses: `CAPsMAN`, or the `wireless`, `wifiwave2`, or `wifi` package.

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

### Update

The integration creates the following update entities:

- **RouterOS**: Updates OS firmware.
- **RouterBOARD**: Updates BOARD firmware.

## MikroTik automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when a family member arrives home

- **Trigger**: State changed
  - **Entity**: John's phone
  - **To**: Home
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a presence detection notification" %}

{% example %}
automation: |
  alias: "Notify when a family member arrives home"
  triggers:
    - trigger: state
      entity_id: device_tracker.johns_phone
      to: "home"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "John is home."
{% endexample %}

{% enddetails %}

### Automation: Turn off the guest Wi-Fi at bedtime

- **Trigger**: Time
  - **At time**: `22:00:00`
- **Action**: Turn off switch
  - **Target**: Guest Wi-Fi (`switch.guest_wifi`)

{% details "YAML example for turning off the guest Wi-Fi at bedtime" %}

{% example %}
automation: |
  alias: "Turn off the guest Wi-Fi at bedtime"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.guest_wifi
{% endexample %}

{% enddetails %}

## Data updates

The **MikroTik** {% term integration %} {% term polling polls %} the router's RouterOS API every 10 seconds for device, interface, and system information.

## Known limitations

- Presence detection only tracks clients connected to the router configured in the {% term integration %}. If your network has multiple MikroTik devices, such as a separate wireless access point or a CAPsMAN cluster, add each device as its own integration entry to track the devices connected to it.
- The RouterBOARD update entity is only created on devices that report RouterBOARD information. It's not available on the Cloud Hosted Router (CHR) or other installations without a RouterBOARD.
- Tracking isn't limited to MikroTik-branded devices, but not every connected client is tracked. By default, only wireless clients are tracked, using the router's wireless registration table. Wired clients are tracked only when **Force scanning using DHCP** is enabled, and then only those that have a DHCP lease. Devices with a manually configured static IP address aren't tracked.

## Troubleshooting

### A wired device shows as not home while it's connected

#### Resolution

By default, only wireless clients are tracked. If a wired device that has a DHCP lease shows as `not_home` while it's connected, enable the **Force scanning using DHCP** [configuration option](#configuration-options) so the integration also tracks devices from the router's DHCP lease table. Optionally enable **Enable ARP ping** as well so the integration verifies that those devices are still reachable instead of trusting the lease. A wired device with a manually configured static IP address has no DHCP lease and can't be tracked.

### Setup fails with a connection or authentication error

#### Resolution

1. Make sure the RouterOS API service is enabled and reachable on the configured port, as described under [Prerequisites](#prerequisites).
2. Make sure the username and password are correct and that the user has at least the `read`, `api`, and `test` [privileges](#the-user-privileges-in-routeros).
3. If you use the `api-ssl` service, make sure **Verify SSL certificate** matches your certificate setup.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
