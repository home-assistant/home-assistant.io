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
  - light
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

1. Login to your _Local Portal_ on your UniFi OS device, and select **Users**.
    - **Note**: This **must** be done from the UniFi OS by accessing it directly by IP address (i.e. _Local Portal_), not via `unifi.ui.com` or within the UniFi Network app.
2. Go to **Admins & Users** from the left hand side menu or [IP address]/admins/users e.g. 192.168.1.1/admins/users.
3. Select **Add New Admin**.
4. Check **Restrict to local access only** and fill out the fields for your user. Select **Full Management** for **Network**. **OS Settings** are not used, so they can be set to **None**.
5. In the bottom right, select **Add**.

![UniFi OS User Creation](/images/integrations/unifi/user.png)

{% include integrations/config_flow.md %}

## Device support

Each object in your UniFi Network controller is represented as a device in Home Assistant. The sections below describe exactly which entities are created for each object type.

{% note %}
**Permissions**: The sections below assume the configured user has full administrator access. Users with limited permissions will receive fewer entities; in many cases a read-only sensor is created instead of a controllable switch or button.
{% endnote %}

### UniFi Network devices

Each UniFi device (gateway, switch, access point, etc.) registered to the controller gets a device in Home Assistant with the following:

- **State sensor** - Reports the operational state of the device as reported by the controller (for example, connected, upgrading, or disconnected).
- **Uptime sensor** - Reports the time elapsed since the device last restarted.
- **CPU utilization sensor** - Reports current CPU load as a percentage.
- **Memory utilization sensor** - Reports current RAM usage as a percentage.
- **Temperature sensor** - Reports the device's internal temperature. Only available on hardware that exposes this metric.
- **Firmware update** - Shows when a firmware upgrade is available for the device. If the configured user has admin privileges, the update can be installed directly from Home Assistant.
- **Restart button** - Triggers a full reboot of the device. On PoE switches, the PoE supply remains active throughout the restart. Requires admin privileges.

#### Access points with LED ring support

On compatible access points that support LED ring customization, an additional entity is created:

- **LED light** - Controls the LED ring on the access point. Supports on/off, brightness, and color. Requires admin privileges.

{% note %}
LED changes may take over 5 seconds to apply while the device adopts its new configuration. The Home Assistant UI updates optimistically before the device confirms the change.
{% endnote %}

### Switch ports

Each physical port on a UniFi switch gets the following entities. All port entities are disabled by default.

- **PoE switch** - Enables or disables Power over Ethernet on the port. Only present on PoE-capable ports. Requires admin privileges.
- **Port enable switch** - Enables or disables the port entirely, cutting all traffic through it. Requires admin privileges.
- **Power cycle PoE button** - Cuts and immediately restores power to the PoE port, forcing the connected device to restart. Only present on PoE-capable ports. Requires admin privileges.
- **Port bandwidth sensors (RX and TX)** - Report current receive and transmit throughput for the port in Mbit/s. These sensors are disabled by default and must be enabled via the integration's **Configure** option on page 3/3, or individually via the entity registry.
- **Port link speed sensor** - Reports the negotiated link speed for the port in Mbit/s.

### Smart power outlets

On UniFi smart power devices that support per-outlet power metering (such as the USP-PDU-Pro), each outlet gets the following:

- **Outlet power sensor** - Reports the current power draw of the outlet in watts.

### Network clients

Every client device seen by the controller — wired or wireless — gets a device in Home Assistant with the following:

- **Device tracker** - Tracks whether the client is currently connected to the network. A client is considered `home` while actively connected, and transitions to `not_home` after a configurable period of inactivity (300 seconds by default).
- **Uptime sensor** - Reports the time elapsed since the client last connected or reconnected.
- **Bandwidth sensors (RX and TX)** - Report current receive and transmit throughput for the client in Mbit/s. Disabled by default; enable via the integration's **Configure** option on page 3/3.
- **Link speed sensor** - Reports the negotiated connection speed between the client and its switch or gateway port in Mbit/s. Only available for wired clients with an active connection. Disabled by default.
- **Block network access switch** - Blocks or unblocks the client's access to the network. This switch is only created for clients whose MAC addresses have been added to the integration's block list in the integration options. Requires admin privileges.

#### Presence detection

Presence detection works by monitoring which clients are actively connected to the controller. There are several conditions that can affect its reliability:

- **802.11r Fast Roaming** - When enabled, some versions of UniFi Network fail to correctly mark wireless clients as disconnected when they leave. If tracked devices remain `home` after leaving, disable Fast Roaming in your UniFi Network wireless settings.
- **MAC address randomization** - Most modern smartphones randomize their MAC address per network by default. Because the integration tracks clients by MAC address, a device using a randomized MAC will appear as a new, unknown client on each connection. Disable MAC randomization in the device's Wi-Fi settings for each relevant network to ensure consistent tracking.
- **Clock synchronization** - Presence detection depends on Home Assistant and the UniFi Network controller having synchronized clocks. If they run on separate machines or VMs, ensure NTP is correctly configured on both. Clock skew will cause unreliable `home`/`not_home` transitions.

### WLANs

Each wireless network (SSID) configured in UniFi Network gets a device in Home Assistant with the following:

- **Client count sensor** - Reports the number of clients currently associated with the WLAN.
- **WLAN enable switch** - Enables or disables the WLAN. Toggling this triggers a reconfiguration of all access points broadcasting the SSID, which may cause a brief interruption for connected clients. Requires admin privileges.
- **Regenerate password button** - Generates and immediately applies a new random password to the WLAN. The password is 20 characters long and consists of mixed-case letters and digits. Requires admin privileges.
- **QR code image** - Provides a scannable QR code that joins the WLAN when scanned by a mobile device. Disabled by default. Requires admin privileges.

### DPI restriction groups

Each Deep Packet Inspection (DPI) restriction group configured in UniFi Network gets the following:

- **Group enable switch** - Enables or disables all traffic restrictions within the group simultaneously. No entity is created for groups that contain no restrictions.

### Port forwarding rules

Each port forwarding rule configured in UniFi Network gets the following:

- **Rule enable switch** - Enables or disables the port forwarding rule.

### Traffic rules

Each traffic rule configured in UniFi Network gets the following:

- **Rule enable switch** - Enables or disables the traffic rule.

### Policy-based routing rules

Each policy-based routing (PBR) rule configured in UniFi Network gets the following:

- **Rule enable switch** - Enables or disables the PBR rule.

### Zone-based firewall policies

Each zone-based firewall policy configured in UniFi Network gets the following:

- **Policy enable switch** - Enables or disables the firewall policy.

## Actions

### Action: Reconnect client

The `unifi.reconnect_client` action instructs the controller to force a wireless client to reconnect to the network. This is useful in automations to recover a client with a stale or dropped connection without needing to interact with the client device itself.

| Data attribute | Optional | Description |
| --- | --- | --- |
| `device_id` | No | The Home Assistant device ID of the wireless client to reconnect. |

### Action: Remove clients

The `unifi.remove_clients` action removes transient client records from the controller and the Home Assistant device registry. This is useful for periodically cleaning up short-lived or probe-only client entries.

A client is eligible for removal only if all of the following are true:

- The time between its `first_seen` and `last_seen` timestamps is less than 15 minutes.
- It has no fixed IP address, hostname, or name assigned in UniFi Network.
- It is no longer known to the controller since the last startup or reload of the integration.

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
