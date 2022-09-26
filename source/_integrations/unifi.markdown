---
title: UniFi Network
description: Instructions on how to configure UniFi Network integration with UniFi Network application by Ubiquiti.
ha_category:
  - Hub
  - Presence Detection
  - Sensor
  - Switch
  - Update
ha_release: 0.81
ha_iot_class: Local Push
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@Kane610'
ha_domain: unifi
ha_ssdp: true
ha_platforms:
  - device_tracker
  - diagnostics
  - sensor
  - switch
  - update
ha_integration_type: integration
---

[UniFi Network](https://www.ui.com/software/) by [Ubiquiti Networks, inc.](https://www.ui.com/) is a software that binds gateways, switches and wireless access points together with one graphical front end.

There is currently support for the following device types within Home Assistant:

- [Presence Detection](#presence-detection)
- [Switch](#switch)
- [Sensor](#sensor)
- [Firmware updates](#firmware-updates)

{% include integrations/config_flow.md %}

The user needs administrator privileges in order to control switches.

### Extra configuration of the integration

All configuration options are offered from the front end. Enter what UniFi Network integration you want to change options on and press the cog wheel. Some advanced options are available when "Advanced Mode" is enabled on your user profile page.

### Configuring Users

The UniFi Network application allows you to create multiple users on it besides the main administrator. If all you want to use is the device tracker then it is recommended that you create a limited user that has `read-only` permissions for the UniFi Network device tracker. If you want blocking of network access, POE control, or firmware upgrades as well you would need to have 'admin' permissions.

### UniFi OS

For UniFi OS a local-only user needs to be created. A user who uses the Ubiquiti cloud will not work. You can do this in the manage users section on the UniFi OS dashboard. Make sure to give it the right permissions for the functions you want to use. Note the Dream Machine Pro and Cloud Key Gen2 plus updated to UniFi OS needs the port to be 443.

### Conflicts with MQTT

The UniFi Network application can either be a UniFi OS console device (like the Cloud Key), or as software on any Linux system. If you run the UniFi Network application on the same operating system as Home Assistant there may be conflicts in ports if you have the MQTT integration as well.

It is recommended that you run the UniFi Network application in a dedicated virtual machine to avoid that situation.

## Presence detection

This platform allows you to detect presence by looking at devices connected to a [Ubiquiti](https://ui.com/) [UniFi Network](https://unifi-network.ui.com/) application. By default devices are marked as away 300 seconds after they were last seen.

### Troubleshooting and Time Synchronization

Presence detection depends on accurate time configuration between Home Assistant and the UniFi Network application.

If Home Assistant and the UniFi Network application are running on separate machines or VMs ensure that all clocks are synchronized. Failing to have synchronized clocks will lead to Home Assistant failing to mark a device as home.

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)

## Services

### Service unifi.reconnect_client

Try to get a wireless client to reconnect to the network.

| Service data attribute | Optional | Description                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `device_id`            | No       | String representing a device ID related to a UniFi Network integration.     |

### Service unifi.remove_clients

Clean up clients on the UniFi Network application that has only been associated with the Network application for a short period of time. The difference between first seen and last seen needs to be less than 15 minutes and the client can not have a fixed IP, hostname or name associated with it.

## Switch

### Block network access for clients

Allow control of network access to clients configured in the integration options by adding MAC addresses. Items in this list will have a Home Assistant switch created, using the UniFi Device name, allowing for blocking and unblocking.

### Control clients powered by POE

Entities appear automatically for each connected POE client. If no POE client device is in operation, no entity will be visible. Note: UniFi infrastructure devices such as access points and other switches are not (yet) supported, even if they are powered over ethernet themselves.

Note that POE control actually configures the network port of the switch which the client is connected to.

### Control DPI Traffic Restrictions

Entities appear automatically for each restriction group. If there are no restrictions in a group, no entity will be visible. Toggling the switch in Home Assistant will enable or disable all restrictions inside a group.

## Sensor

### Bandwidth sensor

Get entities reporting receiving and transmitting bandwidth per network client.

### Uptime sensor

Get entities reporting uptime per network client.

## Firmware updates

This will show if there are firmware updates available for the UniFi network devices connected to the controller. If the configured user has admin privileges, the firmware upgrades can also be installed directly from Home Assistant.

## Debugging integration

If you have problems with the UniFi Network application or integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    aiounifi: debug
    homeassistant.components.unifi: debug
    homeassistant.components.device_tracker.unifi: debug
    homeassistant.components.switch.unifi: debug
```

## FAQ

### Understanding UniFi Naming (UniFi Network application is the UniFi Controller)

Network management has always been Ubiquiti's main product and so UniFi for a while was always synonymous with their "UniFi Controller" application. However, UniFi has started branching and releasing other apps, like Protect, Talk and Access. As a result, Ubiquiti has started rebranding "UniFi Controller" as the "UniFi Network" application. [This post on the UniFi community](https://community.ui.com/questions/Clarifying-UniFi-Hardware-and-Software-Terminology/2557963a-e79d-4157-a78c-36d3f7b383fb) explains it pretty well. **This main UniFi Integration is _only_ for the UniFi Network application.**
