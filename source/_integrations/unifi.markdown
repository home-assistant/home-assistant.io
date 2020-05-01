---
title: Ubiquiti UniFi
description: Instructions on how to configure UniFi integration with UniFi Controller by Ubiquiti.
ha_category:
  - Hub
  - Presence Detection
  - Switch
  - Sensor
ha_release: 0.81
ha_iot_class: Local Push
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@kane610'
ha_domain: unifi
---

[UniFi](https://unifi-sdn.ubnt.com/) by [Ubiquiti Networks, inc.](https://www.ubnt.com/) is a software that binds gateways, switches and wireless access points together with one graphical front end.

There is currently support for the following device types within Home Assistant:

- [Presence Detection](#presence-detection)
- [Switch](#switch)
- [Sensor](#sensor)

## Configuration

Home Assistant offers UniFi integration through **Configuration** -> **Integrations** -> **UniFi Controller**. Follow the instructions to get it set up.

The user needs administrator privileges in order to control switches.

### Extra configuration of the integration

All configuration options are offered from the front end. Enter what UniFi integration you want to change options on and press the cog wheel.

### Configuring Users

The UniFi controller allows you to create multiple users on it besides the main administrator. If all you want to use is the device tracker then it is recommended that you create a limited user that has `read-only` permissions for the UniFi device tracker. If you want blocking of network access or POE control as well you would need to have 'admin' permissions.

### Unifi-os

For Unifi-os a local-only user needs to be created. A user who uses the Ubiquiti cloud will not work. You can do this in the manage users section on the Unifi-os dashboard. Make sure to give it the right permissions for the functions you want to use. 

### Conflicts with MQTT

The UniFi controller can either be a dedicated hardware device (UniFi's cloud key), or as software any Linux system. If you run the UniFi controller on the same operating system as Home Assistant there may be conflicts in ports if you have the MQTT integration as well.

It is recommended that you run the UniFi controller in a dedicated virtual machine to avoid that situation.

## Presence detection

This platform allows you to detect presence by looking at devices connected to a [Ubiquiti](https://ubnt.com/) [UniFi](https://www.ubnt.com/enterprise/#unifi) controller.

### Troubleshooting and Time Synchronization

Presence detection depends on accurate time configuration between Home Assistant and the UniFi controller.

If Home Assistant and the UniFi controller are running on separate machines or VMs ensure that all clocks are synchronized. Failing to have synchronized clocks will lead to Home Assistant failing to mark a device as home.

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)

## Switch

### Block network access for clients

Allow control of network access to clients configured in the integration options by adding MAC addresses. Items in this list will have a Home Assistant switch created, using the UniFi Device name, allowing for blocking and unblocking.

### Control clients powered by POE

Entities appear automatically for each connected POE client. If no POE client device is in operation, no entity will be visible. Note: UniFi infrastructure devices such as access points and other switches are not (yet) supported, even if they are powered over ethernet themselves.

Note that POE control actually configures the network port of the switch which the client is connected to.

## Sensor

### Bandwidth sensor

Get entities reporting receiving and transmitting bandwidth per network client.

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
