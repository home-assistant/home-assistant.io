---
title: AVM FRITZ!Box Tools
description: Instructions on how to integrate AVM FRITZ!Box routers into Home Assistant.
ha_category:
  - Binary sensor
  - Image
  - Presence detection
  - Sensor
  - Update
ha_release: '0.10'
ha_domain: fritz
ha_config_flow: true
ha_codeowners:
  - '@AaronDavidSchneider'
  - '@chemelli74'
  - '@mib1185'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - image
  - sensor
  - switch
  - update
ha_ssdp: true
ha_integration_type: integration
related:
  - docs: /common-tasks/general/#enabling-or-disabling-entities
    title: Enabling or disabling entities
---

The AVM FRITZ!Box Tools integration allows you to control your [AVM FRITZ!Box](https://en.avm.de/products/fritzbox/) router and have presence detection for connected network devices.

There is support for the following platform types within Home Assistant:

- **{% term "Device tracker" %}** - presence detection by looking at connected devices.
- **{% term "Binary sensor" %}** - connectivity status.
- **{% term Image %}** - QR code for Guest Wi-Fi.
- **{% term Button %}** - reboot, reconnect, firmware update.
- **{% term Sensor %}** - external IP address, uptime and network monitors.
- **{% term Switch %}** - call deflection, port forward, parental control and Wi-Fi networks.
- **{% term Update %}** - firmware status of the device.

{% include integrations/config_flow.md %}

{% important %}
Both the TR-064 (_Permit access for apps_) and UPnP (_Transmit status information over UPnP_) protocol needs to be enabled in the FRITZ!Box under **Home Network** > **Network** > **Network settings** > **Access Settings in the Home Network** for Home Assistant to login and read device info.
{% endimportant %}

## Username

It is recommended to create a separate user to connect Home Assistant to your FRITZ!Box. To create a user, in the FRITZ!Box go to **System** > **FRITZ!Box Users** > **Users** > **Add User**. Make sure the user has the **FRITZ!Box Settings** permission.

{% note %}
If you still want to use the predefined user, please note that as of FRITZ!OS 7.24, the FRITZ!Box creates a random username for the admin user if you didn't set one yourself. This can be found after logging into the FRITZ!Box and visiting **System** > **FRITZ!Box Users** > **Users**. The username starts with `fritz` followed by four random numbers. Under properties on the right it says `created automatically`. Prior to FRITZ!OS 7.24, the default username was `admin`.
{% endnote %}

## Actions

Available {% term actions %}: `set_guest_wifi_password`

### Action `set_guest_wifi_password`

Set a new password for the guest wifi. The password Length must be between 8 and 63 characters long.

| Data attribute | Required | Description |
| --- | --- | --- |
| `device_id` | yes | Only act on a specific router |
| `password` | no | New password for the guest wifi (_will be auto-generated if not defined_) |
| `length` | no | Length of the auto-generated password. (_default 12_) |

## Integration options

It is possible to change some behaviors through the integration options.
To change the settings, go to {% my integrations title="**Settings** > **Devices & services**" %}. Select the **AVM FRITZ!Box Tools** integration, then select **Configure**.

### Consider home

Number of seconds that must elapse before considering a disconnected device "not at home".

### Enable old discovery method

Needed on some scenarios like no mesh support (_FritzOS <= 6.x_) or mixed brands network devices or LAN switches.

## Additional information

### Parental control switches

Parental control {% term switches %} can be used to enable and disable internet access of individual devices. You can also find the current blocking state of the individual devices in the UI of the FRITZ!Box under **Internet** > **Filters** > **Parental Controls** > **Device Block**.

### Device tracker

**Note**: If you don't want to automatically track newly detected devices, disable the {% term integration %} system option `Enable new added entities`.

### Port forward switches

Due to security reasons, AVM implemented the ability to enable/disable a port forward rule only from the host involved in the rule. As a result, this integration will create entities only for rules that have your Home Assistant host as a destination.

**Note 1**: On your FRITZ!Box under **Internet** > **Permit Access**, enable the setting `Permit independent port sharing for this device` for the device which runs HA.

**Note 2**: Only works if you have a dedicated IPv4 address (_it won't work with DS-Lite_)

### WiFi switches

WiFi {% term switches %} are created for each SSID the FRITZ!Box is serving. With these switches, one can activate and deactivate each single SSID.

**Note 1**: In a mesh setup, the WiFi settings are adopted by each mesh repeater (_**Home Network > Mesh > Mesh Settings > Automatically Adopting Settings from the Mesh**_)

**Note 2**: For mesh repeaters, these switches are disabled by default, but can be enabled. When your mesh is based on a WiFi connection between the mesh master and the mesh repeater, the WiFi switches won't be created for the mesh repeater either.

## Example Automations and Scripts

### Script: Reconnect / get new IP

The following {% term script %} can be used to easily add a reconnect button to your UI. If you want to reboot your FRITZ!Box, you can use `fritz.reboot` instead.

```yaml
fritz_box_reconnect:
  alias: "Reconnect FRITZ!Box"
  sequence:
    - action: button.press
      target:
        entity_id: button.fritzbox_7530_reconnect

```

### Automation: Reconnect / get new IP every night

```yaml
automation:
- alias: "Reconnect FRITZ!Box"
  triggers:
    - trigger: time
      at: "05:00:00"
  actions:
    - action: button.press
      target:
        entity_id: button.fritzbox_7530_reconnect

```

### Automation: Phone notification with Wi-Fi credentials when guest Wi-Fi is created

```yaml
automation:
  - alias: "Guests Wi-Fi Turned On -> Send Password To Phone"
    triggers:
      - trigger: state
        entity_id: switch.fritzbox_7530_wifi_myssid
        to: "on"
    actions:
      - action: notify.notify
        data:
          title: "Guest Wi-Fi is enabled"
          message: "Password: ..."

```

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs stop the debug logging again (_download of debug log file will start automatically_). Further _if still possible_, please also download the {% term diagnostics %} data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

### Device presence detection is not working as expected

Check if one of the following cases applies:

- You see a device as still present, even if it is offline or disconnected for more than the configured [consider home](#consider-home) seconds.
- You're using additional network equipment like a network switch or Wi-Fi access point other than an AVM Fritz!Repeater or other AVM components, but not configured as a [mesh](https://en.avm.de/service/knowledge-base/dok/FRITZ-Box-7590/3329_Mesh-with-FRITZ/) in your home network.

If one of the above cases applies to your setup, try [enabling the old discovery method](#enable-old-discovery-method) in the [integration options](#integration-options). This might resolve the issue.
