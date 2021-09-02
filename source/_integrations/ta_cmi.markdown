---
title: Technische Alternative C.M.I.
description: Instructions on how to set up Technische Alternative C.M.I. sensors in Home Assistant.
ha_category:
  - Sensor
ha_release:  2021.10.0
ha_iot_class: Local Polling
ha_config_flow: false
ha_codeowners:
  - '@DeerMaximum'
ha_domain: ta_cmi
ha_platforms:
  - sensor
---

The `ta_cmi` sensor platform monitors the inputs and outputs of the devices connected to a C.M.I. from [Technische Alternative](https://www.ta.co.at/). It creates a separate sensor for each input and output which displays the current values.

Currently supported devices:

- UVR1611
- UVR16x2 (Tested)
- RSM610
- CAN-I/O45
- CAN-EZ2
- CAN-MTx2
- CAN-BC2
- UVR65
- CAN-EZ3
- UVR610
- UVR67

## Prerequisites

To use the integration in your installation, you need to specify the credentials of a user with `expert` rights.

## Configuration

If you want to use this integration, add the following lines to your `configuration.yaml` and it will read all inputs and outputs of the node:

```yaml
# Example configuration.yaml entry
ta_cmi:
  host: CMI_HOST
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  devices:
    - id: NODE_ID
```

Configuration variables (global):

{% configuration %}
host:
  description: The DNS name or IP Address of C.M.I. with protocol , eg `http://192.168.1.101`.
  required: true
  type: string
username:
  description: Username of the `expert` user.
  required: true
  type: string
password:
  description: Password of the `expert` user.
  required: true
  type: string
nodes:
  description: Configuration for each node.
  required: true
  type: list
{% endconfiguration %}

Configuration variables (node):

{% configuration %}
id:
  description: ID number of the CAN node. Can be looked up in the web interface of the C.M.I..
  required: true
  type: integer
fetchmode:
  description: Set to `all` to fetch all inputs and outputs of the node. Set to `defined` to fetch only inputs and outputs defined in the configuration.
  required: false
  default: all
  type: string
channels:
  description: Configuration for each input and output (channel).
  required: false
  type: list
{% endconfiguration %}

Configuration variables (channel):

{% configuration %}
id:
  description: ID number of the channel. Can be looked up in the web interface of the device.
  required: true
  type: integer
type:
  description: Set to `input` or `output` to define if it is an input or output.
  required: true
  type: string
name:
  description: Define a custom entity name.
  required: true
  type: string
device_class:
  description: Override the automatic device class.
  required: false
  type: string
{% endconfiguration %}

## Full example for the configuration

```yaml
# Example configuration.yaml entry
ta_cmi:
  host: CMI_HOST
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  devices:
    - id: NODE_ID
      fetchmode: defined
      channels:
        - type: input
          id: CHANNEL_ID
          name: CUSTOM_NAME
        - type: input
          id: CHANNEL_ID
          name: CUSTOM_NAME
          device_class: DEVICE_CLASS
        - type: output
          id: 16
          name: PWM solar pump
          device_class: power_factor
```

[taWebsite]: https://www.ta.co.at/
[DeviceClassList]: https://developers.home-assistant.io/docs/core/entity/sensor#available-device-classes