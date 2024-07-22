---
title: UniFi Network
description: Instructions on how to configure UniFi Network integration with UniFi Network application by Ubiquiti.
ha_category:
  - Hub
  - Image
  - Presence detection
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
  - button
  - device_tracker
  - diagnostics
  - image
  - sensor
  - switch
  - update
ha_integration_type: hub
---

[UniFi Network](https://www.ui.com/download-software/) by [Ubiquiti Networks, inc.](https://www.ui.com/) is a software that binds gateways, switches and wireless access points together with one graphical front end.

There is currently support for the following device types within Home Assistant:

- [Button](#button)
- [Image](#image)
- [Presence detection](#presence-detection)
- [Actions](#actions)
- [Switch](#switch)
- [Sensor](#sensor)
- [Firmware updates](#firmware-updates)

{% include integrations/config_flow.md %}

The user needs administrator privileges in order to control switches.

### Extra configuration of the integration

All configuration options are offered from the front end. Enter what UniFi Network {% term integration %} you want to change options on and press the cog wheel. Some advanced options are available when "Advanced Mode" is enabled on your user profile page.

### Configuring Users

The UniFi Network application allows you to create multiple users on it besides the main administrator. If all you want to use is the device tracker then it is recommended that you create a limited user that has `read-only` permissions for the UniFi Network device tracker. If you want blocking of network access, POE control, or firmware upgrades as well you would need to have 'admin' permissions.

### UniFi OS

For UniFi OS a local-only user needs to be created. A user who uses the Ubiquiti cloud will not work. You can do this in the manage users section on the UniFi OS dashboard. Make sure to give it the right permissions for the functions you want to use. Note the Dream Machine Pro and Cloud Key Gen2 plus updated to UniFi OS needs the port to be 443. For some self hosted servers the port will be 8443.

### Conflicts with MQTT

The UniFi Network application can either be a UniFi OS console device (like the Cloud Key), or as software on any Linux system. If you run the UniFi Network application on the same operating system as Home Assistant there may be conflicts in ports if you have the MQTT {% term integration %} as well.

It is recommended that you run the UniFi Network application in a dedicated virtual machine to avoid that situation.

## Button

The Button entities will only be available and usable if the integration has a UniFi Network account with administrator privileges.

### Power cycle PoE

Use the **Power cycle PoE** button entity to power cycle one specific PoE port to cause the connected device to restart.

### Restart UniFi device

Use the **Restart UniFi device** button entity to restart the entire UniFi device. In case the device is a PoE switch, the PoE supply is not affected.

### WLAN regenerate password
Use the **WLAN regenerate password** button entity to generate and apply a new password to the specified WLAN (Wireless Local Area Network). Use the **WLAN regenerate password** button entity to generate and apply a new password to the specified WLAN (Wireless Local Area Network). **It will be randomly generated with 20 characters, consisting of lowercase letters, uppercase letters, and digits.**

## Image

Provides QR Code images that can be scanned to easily join a specific WLAN. Entities are disabled by default. This feature requires admin privileges.

## Presence detection

This platform allows you to detect presence by looking at devices connected to a [Ubiquiti](https://ui.com/) [UniFi Network](https://ui.com/cloud-gateways) application. By default devices are marked as away 300 seconds after they were last seen.

### Troubleshooting and Time Synchronization

If tracked devices continue to show "Home" when not connect/present and show connected in the UniFi Controller, disable 802.11r Fast Roaming.  When enabled, it has been observed on the various UniFi Controller versions, failure to declare disconnected clients.

Presence detection depends on accurate time configuration between Home Assistant and the UniFi Network application.

If Home Assistant and the UniFi Network application are running on separate machines or VMs ensure that all clocks are synchronized. Failing to have synchronized clocks will lead to Home Assistant failing to mark a device as home.

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)

## Actions

### Action unifi.reconnect_client

Try to get a wireless client to reconnect to the network.

| Data attribute | Optional | Description                                                                 |
| ---------------------- | -------- | --------------------------------------------------------------------------- |
| `device_id`            | No       | String representing a device ID related to a UniFi Network {% term integration %} .     |

### Action unifi.remove_clients

Clean up clients on the UniFi Network application that has only been associated with the Network application for a short period of time. The difference between first seen and last seen needs to be less than 15 minutes and the client can not have a fixed IP, hostname or name associated with it.

## Switch

### Block network access for clients

Allow control of network access to clients configured in the {% term integration %} options by adding MAC addresses. Items in this list will have a Home Assistant switch created, using the UniFi Device name, allowing for blocking and unblocking.

### PoE port control

Provides per-port PoE control. Entities are disabled by default. This feature requires admin privileges.

### Control DPI Traffic Restrictions

Entities appear automatically for each restriction group. If there are no restrictions in a group, no {% term entity %} will be visible. Toggling the switch in Home Assistant will enable or disable all restrictions inside a group.

### Control Port forward functonality

Entities appear for each port forwarding rule. 

### Control WLAN availability

Entities appear for each WLAN. Changing the state of WLAN will trigger a reconfiguration of affected access points, limiting access to all WLANs exposed by the access point.

## Sensor

### Bandwidth sensor

Get entities reporting receiving and transmitting bandwidth per network client. These sensors are disabled by default. To enable the bandwidth sensors, on the UniFi integration page, select **Configure**, go to page 3/3 and enable the bandwidth sensors.

### Wlan clients sensor

Entities reporting connected clients to a WLAN.

### Uptime sensor

Get entities reporting uptime per network client or UniFi Network device.

### Power Outlet sensor

Get entities reporting the power utilization for outlets that support metrics (such as the AC outlets on the USP-PDU-Pro).

### Device temperature sensor

Get entities reporting the general temperature of a UniFi Network device.

### Device state

Get entities reporting the current state of a UniFi Network device.

### Device CPU

Get entities reporting the current CPU utilization of a UniFi Network device.

### Device memory

Get entities reporting the current memory utilization of a UniFi Network device.

### Port Bandwidth sensor

Get entities reporting receiving and transmitting bandwidth per port. These sensors are disabled by default. To enable the bandwidth sensors, on the UniFi integration page, select **Configure**, go to page 3/3 and enable the bandwidth sensors.

## Firmware updates

This will show if there are firmware updates available for the UniFi network devices connected to the controller. If the configured user has admin privileges, the firmware upgrades can also be installed directly from Home Assistant.


## Removing a device in Home Assistant

Integration populates both UniFi devices as well as network clients into Home Assistant. In certain edge cases entities are left lingering even if they are not present in UniFi network anymore. This can lead to an accumulation of entries in the device registry.

To manually remove a device entry, go to the Device Info page and select "Delete" from the Device Info menu.

Only clients/devices which are no longer known by UniFi since the startup or reload of the UniFi integration can be removed.

![4d4ca937-17bb-4902-9949-2ea83e3c2c0c](https://github.com/home-assistant/home-assistant.io/assets/21991867/c926f5c7-18af-47b5-b888-30cc8511d76a)


## Debugging integration

If you have problems with the UniFi Network application or {% term integration %} you can add debug prints to the log.

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
