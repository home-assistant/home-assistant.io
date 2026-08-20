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
ha_quality_scale: silver
---

[UniFi Network](https://www.ui.com/download-software/) by [Ubiquiti Networks, inc.](https://www.ui.com/) is a software that binds gateways, switches and wireless access points together with one graphical front end.

With this {% term integration %}, you can bring your UniFi Network into Home Assistant to automate and monitor your network. Common use cases include:

- Use connected clients as presence detection to trigger automations when family members arrive home or leave.
- Control Wi-Fi availability on a schedule, for example to disable guest networks overnight or pause kids' Wi-Fi during homework time.
- Monitor bandwidth usage and uptime of clients and network devices.
- Control PoE power on individual switch ports to remotely restart connected devices like cameras or access points.
- Toggle firewall rules, port forwarding, or traffic rules as part of broader home automations.
- Get notified about firmware updates and install them from Home Assistant.

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

You need a local user created in your UniFi OS Console. Ubiquiti SSO cloud users will **not** work. Using an administrator or a user with full read/write access is recommended to get the most out of the integration, but it is not required. The entities that are created automatically adjust based on the permissions of the user you use.

1. Sign in to your UniFi OS device.
2. Go to **Admins & Users** from the left-hand side menu.
3. Select **Create New**.
4. Check **Admin**, then check **Restrict to local access only** and fill out the fields for your user. Select **Full Management** for **Network**. **OS Settings** are not used, so they can be set to **None**.
5. In the bottom right, select **Create**.

There is currently support for the following device types within Home Assistant:

- [Button](#button)
- [Image](#image)
- [Light](#light)
- [Presence detection](#presence-detection)
- [Actions](#actions)
- [Switch](#switch)
- [Sensor](#sensor)
- [Firmware updates](#firmware-updates)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your UniFi Network application."
Username:
  description: "The username of the local UniFi Network user."
Password:
  description: "The password of the local UniFi Network user."
Port:
  description: "The port your UniFi Network application is running on. Defaults to `443`."
Verify SSL:
  description: "Whether to verify the SSL certificate of the UniFi Network application. Keep this enabled unless you are using a self-signed certificate in a trusted environment and understand the security risk of disabling certificate verification."
Site ID:
  description: "The site ID of the UniFi Network site to manage. Only shown if your UniFi Network application has more than one site."
{% endconfiguration_basic %}

{% note %}
**Permissions**: The below sections on the features available to your Home Assistant instance assume you have full
write access to each device. If the user you are using has limited access to some devices, you will get fewer entities
and in many cases, get a read-only sensor instead of an editable switch {% term entity %}.
{% endnote %}

## Configuration options

All configuration options are offered from the front end. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **UniFi Network** integration, and select **Configure**.

{% configuration_basic %}
Track network clients:
  description: "Create device tracker entities for network clients for presence detection."
Include wired network clients:
  description: "Also track wired clients, not just wireless clients."
Track network devices:
  description: "Create device tracker entities for Ubiquiti network devices such as access points and switches."
Select SSIDs to track wireless clients on:
  description: "Only track wireless clients connected to the selected SSIDs. Leave empty to track clients on all SSIDs."
Time in seconds from last seen until considered away:
  description: "Number of seconds since last seen before a client is considered away. Defaults to `300` seconds."
Disable UniFi Network wired bug logic:
  description: "Disable the workaround for a UniFi Network bug that sometimes reports wired clients as wireless."
Ignore Wi-Fi clients with private (randomized) MAC addresses:
  description: "Skip Wi-Fi clients that connect with a locally administered MAC address (like private or randomized Wi-Fi addresses), so no entities are created for them. Wired clients are not affected, and clients you select under **Create entities from network clients** are still included. Disabled by default."
Network access controlled clients:
  description: "Select clients whose network access you want to control via switches by adding their MAC addresses."
Allow control of DPI restriction groups:
  description: "Enable switches to control DPI (Deep Packet Inspection) restriction groups."
Bandwidth usage sensors for network clients:
  description: "Create bandwidth usage sensors for network clients. Disabled by default."
Uptime sensors for network clients:
  description: "Create uptime sensors for network clients. Disabled by default."
Create entities from network clients:
  description: "Select which network clients to create entities from."
{% endconfiguration_basic %}

## Button

The Button entities will only be available and usable if the integration has a UniFi Network account with administrator privileges.

### Power cycle PoE

Use the **Power cycle PoE** button entity to power cycle one specific PoE port to cause the connected device to restart.

### Restart UniFi device

Use the **Restart UniFi device** button entity to restart the entire UniFi device. In case the device is a PoE switch, the PoE supply is not affected.

### WLAN regenerate password
Use the **WLAN regenerate password** button entity to generate and apply a new password to the specified WLAN (Wireless Local Area Network). **It will be randomly generated with 20 characters, consisting of lowercase letters, uppercase letters, and digits.**

## Image

Provides QR Code images that can be scanned to easily join a specific WLAN. Entities are disabled by default. This feature requires admin privileges.

## Presence detection

This platform allows you to detect presence by looking at devices connected to a [Ubiquiti](https://ui.com/) [UniFi Network](https://ui.com/cloud-gateways) application. By default devices are marked as away 300 seconds after they were last seen.

### Troubleshooting and Time Synchronization

If tracked devices continue to show "Home" when not connected/present and show connected in the UniFi Controller, disable 802.11r Fast Roaming. When enabled, various UniFi Controller versions have been observed to fail to declare clients disconnected.

Presence detection is not compatible with Client MAC Address Randomization, enabled by default on most modern SmartPhones. This feature will need to be disabled within the client device settings, usually under the settings for the specific network. If you would rather not track these devices at all, turn on **Ignore Wi-Fi clients with private (randomized) MAC addresses** in the integration options. Home Assistant then skips these clients instead of creating device trackers that never come back.

Presence detection depends on accurate time configuration between Home Assistant and the UniFi Network application.

If Home Assistant and the UniFi Network application are running on separate machines or VMs ensure that all clocks are synchronized. Failing to have synchronized clocks will lead to Home Assistant failing to mark a device as home.

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)

{% include integrations/actions.md %}

## Switch

### Block network access for clients

Allow control of network access to clients configured in the {% term integration %} options by adding MAC addresses. Items in this list will have a Home Assistant switch created, using the UniFi Device name, allowing for blocking and unblocking.

### PoE port control

Provides per-port PoE control. Entities are disabled by default. This feature requires admin privileges.

### Port control

Provides individual control to enable or disable switch ports. Entities are disabled by default. This feature requires admin privileges.

### Control DPI Traffic Restrictions

Entities appear automatically for each restriction group. If there are no restrictions in a group, no {% term entity %} will be visible. Toggling the switch in Home Assistant will enable or disable all restrictions inside a group.

### Control WLAN availability

Entities appear for each WLAN. Changing the state of WLAN will trigger a reconfiguration of affected access points, limiting access to all WLANs exposed by the access point.

### Control Port Forwarding Rules

Entities appear for each port Forwarding Rule. The switches can be identified from icon {% icon "mdi:upload-network" %}.

### Control Traffic Rules

Entities appear for each Traffic Rule. The switches can be identified from icon {% icon "mdi:security-network" %}.

### Control Policy Engine rules

Entities appear automatically for Policy Engine rules that block internet access. Turning a switch on enables the corresponding rule in the UniFi Network application. Turning it off disables the rule. Policy Engine configurations that only define routing or Quality of Service do not appear as switches.

### Control Policy-Based Routing Rules

Entities appear for each Policy-Based Routing Rule. The switches can be identified from icon {% icon "mdi:routes" %}.

### Control Zone-Based Firewall Policies

Entities appear for each Zone-Based Firewall Policy. The switches can be identified from icon {% icon "mdi:security-network" %}.

## Sensor

### Bandwidth sensor

Get entities reporting receiving and transmitting bandwidth per network client. These sensors are disabled by default. To enable the bandwidth sensors, on the UniFi integration page, select **Configure**, go to page 3/3 and enable the bandwidth sensors.

### Wired client link speed sensor

Get entities reporting the link speed for wired network clients. This sensor shows the connection speed in megabits per second (Mbit/s) between the wired client and the network switch or gateway. These sensors are disabled by default and are only available for wired clients with an active connection.

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

### Port link speed sensor

Get entities reporting the link negotiation speed for network device ports. These sensors show the connection speed in megabits per second (Mbit/s) at which each port negotiated its link. Entities are disabled by default.

## Light

The Light entities will only be available for UniFi access points that support LED ring customization. Not all access points have this capability.

### LED control

Provides control over the LED ring on compatible UniFi access points. Entities appear automatically for devices that support LED customization. The LED state, brightness, and color can be controlled. This feature requires admin privileges.

{% note %}
Changes may take over 5 seconds to apply as the device must adopt a new configuration. The UI updates optimistically.
{% endnote %}

## Firmware updates

This will show if there are firmware updates available for the UniFi network devices connected to the controller. If the configured user has admin privileges, the firmware upgrades can also be installed directly from Home Assistant.

## Examples

### Community blueprints

The Home Assistant community has created blueprints that use the UniFi Network integration for common use cases like presence-based automations or Wi-Fi scheduling. You can browse them in the [blueprints exchange on the community forum](https://community.home-assistant.io/c/blueprints-exchange/53?tags=unifi).

## Data updates

The UniFi Network {% term integration %} uses a local push connection (WebSocket) to the UniFi Network application. This means state changes for clients, devices, and network configuration are received in near-real-time as they happen on the controller, without the need for {% term polling %}.

If the WebSocket connection is lost, the integration automatically tries to reconnect. While disconnected, entities are marked as unavailable until the connection is restored.

## Known limitations

- **Ubiquiti SSO cloud users are not supported.** You must create a local user in your UniFi OS Console. See the [Local user](#local-user) section for instructions.
- **Early Access and Release Candidate versions of UniFi Network and UniFi OS are not supported.** Only the official Stable Release channel is expected to work with this integration.
- **Presence detection is not compatible with MAC Address Randomization**, which is enabled by default on most modern smartphones. This feature must be disabled per network on the client device.
- **Changes to LED control** on access points may take over 5 seconds to apply because the device must adopt a new configuration first.
- **Lingering entities**: In some edge cases, clients or devices removed from UniFi Network may remain in the Home Assistant device registry and need to be [removed manually](#removing-a-device-in-home-assistant).

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
