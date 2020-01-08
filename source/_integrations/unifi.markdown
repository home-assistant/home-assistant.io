---
title: Ubiquiti UniFi
description: Instructions on how to configure UniFi integration with UniFi Controller by Ubiquiti.
logo: ubiquiti.png
ha_category:
  - Hub
  - Presence Detection
  - Switch
ha_release: 0.81
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@kane610'
---

[UniFi](https://unifi-sdn.ubnt.com/) by [Ubiquiti Networks, inc.](https://www.ubnt.com/) is a software that binds gateways, switches and wireless access points together with one graphical front end.

There is currently support for the following device types within Home Assistant:

- [Presence Detection](#presence-detection)
- [Switch](#switch)

## Configuration

Home Assistant offers UniFi integration through **Configuration** -> **Integrations** -> **UniFi Controller**.

Enter `host address`, `user name` and `password` and then continue to select which `site` you want to connect to Home Assistant. The user needs administrator privileges in order to control POE switches.

### Extra configuration for device tracker

You can augment the behavior of UniFi device tracker by adding

```yaml
# Example configuration.yaml entry
unifi:
  controllers:
    - host: unifi
      site: My site
      ssid_filter:
        - 'HomeSSID'
        - 'IoTSSID'
```

{% configuration %}
host:
  description: Same address as relevant config entry, needed to identify config entry.
  type: string
  required: true
  default: None
site:
  description: Same site as relevant config entry, needed to identify config entry.
  type: string
  required: true
  default: None
block_client:
  description: A list of Clients MAC Addresses that can be blocked from the network.
  type: list
  required: false
  default: None
detection_time:
  description: How long since the last seen time before the device is marked away, specified in seconds.
  type: integer
  required: false
  default: 300
dont_track_clients:
  description: enable to not allow device tracker to track clients.
  type: boolean
  required: false
  default: false
dont_track_devices:
  description: enable to not allow device tracker to track devices.
  type: boolean
  required: false
  default: false
dont_track_wired_clients:
  description: enable to not allow device tracker to track wired clients.
  type: boolean
  required: false
  default: false
ssid_filter:
  description: Filter the SSIDs that tracking will occur on.
  type: list
  required: false
  default: None
{% endconfiguration %}

### Configuring Users

The UniFi controller allows you to create multiple users on it besides the main administrator. If all you want to use is the device tracker then it is recommended that you create a limited user that has `read-only` permissions for the Unifi device tracker. If you want blocking of network access or POE control as well you would need to have 'admin' permissions.

### Conflicts with MQTT

The Unifi controller can either be a dedicated hardware device (UniFi's cloud key), or as software any Linux system. If you run the Unifi controller on the same operating system as Home Assistant there may be conflicts in ports if you have the MQTT integration as well.

It is recommended that you run the Unifi controller in a dedicated virtual machine to avoid that situation.

## Presence detection

This platform allows you to detect presence by looking at devices connected to a [Ubiquiti](https://ubnt.com/) [UniFi](https://www.ubnt.com/enterprise/#unifi) controller.

### Troubleshooting and Time Synchronization

Presence detection depends on accurate time configuration between Home Assistant and the UniFi controller.

If Home Assistant and the UniFi controller are running on separate machines or VMs ensure that all clocks are synchronized. Failing to have synchronized clocks will lead to Home Assistant failing to mark a device as home.

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)

## Switch

### Block network access for clients

Allow control of network access to clients configured in the `configuration.yaml` file by adding a list of the MAC addresses. Items in this list will have a Home Assistant switch created, using the Unifi Device name, allowing for blocking and unblocking.

### Control clients powered by POE

Entities appear automatically for each connected POE client. If no POE client device is in operation, no entity will be visible. Note: Unifi infrastructure devices such as access points and other switches are not (yet) supported, even if they are powered over ethernet themselves.

Note that POE control actually configures the network port of the switch which the client is connected to.

## Debugging integration

If you have problems with UniFi or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    aiounifi: debug
    homeassistant.components.unifi: debug
    homeassistant.components.device_tracker.unifi: debug
    homeassistant.components.switch.unifi: debug
```
