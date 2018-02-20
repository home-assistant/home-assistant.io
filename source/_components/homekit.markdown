---
layout: page
title: "HomeKit"
description: "Instructions how to setup the HomeKit component in Home Assistant."
date: 2018-02-20 17:30
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Voice
ha_release: 0.64
ha_iot_class:  "Local Polling"
logo: home-assistant.png
---

The `HomeKit` component allows you to forward entities from Home Assistant to Apple `Home` app and `Siri`, so they could be controlled from there as well.

{% configuration %}
  homekit:
    description: HomeKit configuration.
    required: true
    type: map
    keys:
      pincode:
        description: Pin code required during setup of HomeKit Home Assistant accessory. The format needs to be 'XXX-XX-XXX' where X is a number between 1 and 9.
        required: false
        type: string
        default: '"123-45-678"'
        format: 
      port:
        description: Port for the HomeKit extension.
        required: false
        type: int
        default: 51826
{% endconfiguration %}

## {% linkable_title Setup %}

To enable the `HomeKit` component in Home Assistant, add the following to your configuration file:

```yaml
# Example for HomeKit setup
homekit:
  pincode: '123-45-678'
```

<p class='note'>It is not recommended to choose '123-45-678' as your pin code!</p>

After Home Assistant has started, all supported entities (see the [list](#supported-components) below which entities are already integrated) will be exposed to be added to `HomeKit`. To add them:
1. Open the `Home` App.
2. Choose `Add Accessory` and then `Don't Have a Code or Can't Scan?`.
3. The `Home Assistant` Bridge should be listed there. Select it and follow the instructions to complete setup.

After the setup is complete you should be able to control your Home Assistant Components through `Home`.
* For bugs: You can check the [known-issues](#known-issues) section or open an issue on [github](https://github.com/home-assistant/home-assistant/issues).

## {% linkable_title Known issues %}

| Issue | Solution |
| ----- | -------- |
| Z-Wave components are not available in `Home`. | (See note under [supported components](#supported-components)) |

## {% linkable_title Supported Components %}

The following components are currently supported:

| Component | Type Name | Description |
| --------- | --------- | ----------- |
| cover | Window | All covers that support `set_cover_position`. |
| sensor | TemperatureSensor | All sensors that have `Celsius` as their `unit_of_measurement`. |

<p class='note'>Currently only devices that are setup when Home Assistant is started can be added to `HomeKit`. This means that especially `Z-Wave` components are currently not supported, since they will only be setup afterwards. We are working on a solution to this problem.</p>
