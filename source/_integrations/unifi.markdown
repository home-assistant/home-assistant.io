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

## Prerequisites

### Hardware support

This integration supports all UniFi OS Consoles that run UniFi Network. It also supports self hosted versions of UniFi Network.

### Software support

It is recommended to run latest stable versions of UniFi Network and UniFi OS.

{% important %}
**Early Access and Release Candidate versions are not supported by Home Assistant.**

Using Early Access Release Candidate versions of UniFi Network or UniFi OS can bring unexpected changes. If you choose to opt into either the Early Access or the Release Candidate release channel and anything breaks in Home Assistant, you will need to wait until that version goes to the official Stable Release channel before it is expected to work.
{% endimportant %}

### Local user

You will need a local user created in your UniFi OS Console to log in with. Ubiquiti SSO Cloud Users will **not** work.
It is recommended you use the Administrator or a user with full read/write access to get the most out of the integration,
but it is not required. The entities that are created will automatically adjust based on the permissions of the user you
use has.

1. Login to your _Local Portal_ on your UniFi OS device, and select  **Users**. 
    - **Note**: This **must** be done from the UniFi OS by accessing it directly by IP address (i.e. _Local Portal_), not via `unifi.ui.com` or within the UniFi Network app.
2. Go to **Admins & Users** from the left hand side menu or [IP address]/admins/users e.g. 192.168.1.1/admins/users.
3. Select **Add New Admin**.
4. Check **Restrict to local access only** and fill out the fields for your user. Select **Full Management** for **Network**. **OS Settings** are not used, so they can be set to **None**.
5. In the bottom right, select **Add**.

![UniFi OS User Creation](/images/integrations/unifi/user.png)

There is currently support for the following device types within Home Assistant:

- [Button](#button)
- [Image](#image)
- [Presence detection](#presence-detection)
- [Actions](#actions)
- [Switch](#switch)
- [Sensor](#sensor)
- [Firmware updates](#firmware-updates)

{% include integrations/config_flow.md %}

{% note %}
**Permissions**: The below sections on the features available to your Home Assistant instance assume you have full
write access to each device. If the user you are using has limited access to some devices, you will get fewer entities
and in many cases, get a read-only sensor instead of an editable switch {% term entity %}.
{% endnote %}

### Extra configuration of the integration

All configuration options are offered from the front end. Enter what UniFi Network {% term integration %} you want to change options on and press the cog wheel. Some advanced options are available when "Advanced Mode" is enabled on your user profile page.

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

### Control WLAN availability

Entities appear for each WLAN. Changing the state of WLAN will trigger a reconfiguration of affected access points, limiting access to all WLANs exposed by the access point.

### Control Port Forwarding Rules

Entities appear for each port Forwarding Rule. The switches can be identified from icon {% icon "mdi:upload-network" %}.

### Control Traffic Rules

Entities appear for each Traffic Rule. The switches can be identified from icon {% icon "mdi:security-network" %}.

### Control Policy-Based Routing Rules

Entities appear for each Policy-Based Routing Rule. The switches can be identified from icon {% icon "mdi:routes" %}.

### Control Zone-Based Firewall Policies

Entities appear for each Zone-Based Firewall Policy. The switches can be identified from icon {% icon "mdi:security-network" %}.

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
```
