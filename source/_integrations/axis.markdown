---
title: Axis
description: Integration between network devices from Axis Communications with Home Assistant.
ha_category:
  - Binary sensor
  - Camera
  - Light
  - Switch
ha_config_flow: true
ha_release: 0.45
ha_iot_class: Local Push
ha_codeowners:
  - '@Kane610'
ha_domain: axis
ha_qa_scale: platinum
ha_zeroconf: true
ha_ssdp: true
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - camera
  - diagnostics
  - light
  - switch
ha_integration_type: device
---

[Axis Communications](https://www.axis.com/) devices are surveillance cameras, speakers, access control and other security-related network connected hardware. Event API works with firmware 5.50 and newer.

{% include integrations/config_flow.md %}

{% tip %}
It is recommended that you create a user on your Axis device specifically for Home Assistant. For sensor functionality, it is enough to create a user with viewer privileges. If you want additional functional control you will need admin privileges.
{% endtip %}

## Debugging integration

If you have problems with a device or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    axis: debug
    homeassistant.components.axis: debug
```

### Troubleshooting

If you are having issues and want to report a problem, always start with making sure that you're on the latest [Axis OS version](https://www.axis.com/support/firmware).

### Troubleshooting discovery

If your device is not discovered. On your camera, go to **System Options** -> **Advanced** -> **Plain Configuration**. Change the drop-down box to `network` and click `Select Group`. If `Network Interface I0 ZeroConf` contains the `169.x.x.x` IP address, unchecked the box next to `Enabled` for this section and click `Save`.

### Reporting a problem

When creating an issue detailing a problem related to the integration make sure to share the device model and firmware as well as prepare logs. Logs might contain sensitive information so make sure to look through it before sharing.

## Binary sensor

The following sensor types are supported:

- Motion detection (Fence guard/Loitering guard/Motion guard/Object analyzer/VMD3/VMD4)
- Passive IR motion detection
- Sound detection
- Day/night mode
- Inputs and Supervised Inputs

## Camera

The Axis camera platform is configurable through integration options. Available options (device dependent) are to select what stream profile to use and what video source to show.

### Stream profile

A Stream profile makes up settings such as resolution, frame rate and compression and is configured on the device.
If this setting is disabled (default) it will use camera default stream settings.

### Video source

A Video source (view area) defines a subsection of the camera's sensor typically a more focused area of interest. Additional view areas can be configured on the device.
If this setting is disabled (default) it will use the camera default source.

## Light

Control brightness and state of IR LED lights connected to device.

## Switch

The following controllable port types are supported:

- Output
- Relay
