---
title: AVM FRITZ!Box Tools
description: Instructions on how to integrate AVM FRITZ!Box based routers into Home Assistant.
ha_category:
  - Binary Sensor
  - Presence Detection
  - Sensor
  - Update
ha_release: '0.10'
ha_domain: fritz
ha_config_flow: true
ha_codeowners:
  - '@mammuth'
  - '@AaronDavidSchneider'
  - '@chemelli74'
  - '@mib1185'
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - button
  - device_tracker
  - diagnostics
  - sensor
  - switch
  - update
ha_ssdp: true
ha_integration_type: integration
---

The AVM FRITZ!Box Tools integration allows you to control your [AVM FRITZ!Box](https://en.avm.de/products/fritzbox/) based router.

There is support for the following platform types within Home Assistant:

- **Device tracker** - presence detection by looking at connected devices.
- **Binary sensor** - connectivity status.
- **Button** - reboot, reconnect, firmware_update.
- **Sensor** - external IP address, uptime and network monitors.
- **Switch** - call deflection, port forward, parental control and Wi-Fi networks.
- **Update** - firmware status of the device.
{% include integrations/config_flow.md %}

<div class='note'>
Both TR-064 and UPnP need to be enabled in the FRITZ!Box ( Home Network -> Network -> Network settings -> Access Settings in the Home Network ) for Home Assistant to login and read device info.
</div>

## Username

The configuration in the UI asks for a username. Starting from FRITZ!OS 7.24 the FRITZ!Box creates a random username for the admin user if you didn't set one yourself. This can be found after logging into the FRITZ!Box and visiting System -> FRITZ!Box Users -> Users. The username starts with `fritz` followed by four random numbers. Under properties on the right it says `created automatically`. Prior to FRITZ!OS 7.24 the default username was `admin`.

## Services

Currently supported services are Platform specific:

- `fritz.cleanup`

### Platform Services

#### Service `fritz.cleanup`

Remove all stale devices from Home Assistant.
A device is identified as stale when it's still present on Home Assistant but not on the FRITZ!Box.

| Service data attribute | Optional | Description                                                                                                    |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `device_id`            | no       | Only act on a specific  router                                                                                 |

#### Service `fritz.set_guest_wifi_password`

Set a new password for the guest wifi.
The password must be between 8 and 63 characters long.
If no password is given, it will be auto-generated.

| Service data attribute | Optional | Description                                                                                                    |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `device_id`            | no       | Only act on a specific  router                                                                                 |
| `password`             | yes      | New password for the guest wifi                                                                                |
| `length`               | yes      | Length of the auto-generated password. (_default 12_)                        |

## Integration Options

It is possible to change some behaviors through the integration options.
These can be changed at **AVM FRITZ!Box Tools** -> **Configure** on the Integrations page.

- **Consider home**: Number of seconds that must elapse before considering a disconnected device "not at home".
- **Enable old discovery method**: Needed on some scenarios like no mesh support (fw <= 6.x), mixed brands network devices or LAN switches.

## Additional info

### Parental control

Parental control switches can be used to enable and disable internet access of individual devices. If a device has internet access it will be enabled, otherwise it will be disabled. You can also find the current blocking state of the individual devices in the UI of the FRITZ!Box under `Internet` -> `Filters` -> `Parental Controls` -> `Device Block`

Parental control switches are designed for advanced users, thus they are disabled by default. You need to enable the wanted entities manually.

### Device Tracker

**Note**: If you don't want to automatically track newly detected devices, disable the integration system option `Enable new added entities`.

### Port Forward

Due to security reasons, AVM implemented the ability to enable/disable a port forward rule only from the host involved in the rule.
As a result, this integration will create entities only for rules that have your Home Assistant host as a destination.

**Note 1**: On your FRITZ!Box, enable the setting `Permit independent port sharing for this device` for the device which runs HA (`Internet` -> `Permit Access` -> `<Name of HA device>`)

**Note 2**: Only works if you have a dedicated IPv4 address (it won't work with DS-Lite)

## Example Automations and Scripts

### Script: Reconnect / get new IP

The following script can be used to easily add a reconnect button to your UI. If you want to reboot your FRITZ!Box, you can use `fritz.reboot` instead.

```yaml
fritz_box_reconnect:
  alias: "Reconnect FRITZ!Box"
  sequence:
    - service: button.press
      target:
        entity_id: button.fritzbox_7530_reconnect

```

### Automation: Reconnect / get new IP every night

```yaml
automation:
- alias: "Reconnect FRITZ!Box"
  trigger:
    - platform: time
      at: "05:00:00"
  action:
    - service: button.press
      target:
        entity_id: button.fritzbox_7530_reconnect

```

### Automation: Phone notification with Wi-fi credentials when guest Wi-fi is created

```yaml
automation:
  - alias: "Guests Wi-fi Turned On -> Send Password To Phone"
    trigger:
      - platform: state
        entity_id: switch.fritzbox_7530_wifi_myssid
        to: "on"
    action:
      - service: notify.notify
        data:
          title: "Guest Wi-Fi is enabled"
          message: "Password: ..."

```
