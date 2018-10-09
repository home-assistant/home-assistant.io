---
layout: page
title: "OpenTherm Gateway Hub"
description: "Control your OpenTherm Gateway from Home Assistant."
date: 2018-10-07 16:23
sidebar: true
comments: false
sharing: true
footer: true
logo: opentherm.png
ha_category: Hub
ha_release: 0.81
ha_iot_class: "Local Push"
---

The `opentherm_gw` component is used to control the [OpenTherm Gateway](http://otgw.tclcode.com/) from Home Assistant.
When enabled, this component will automatically add it's [`climate` entity](/components/climate.opentherm_gw) to Home Assistant.

# {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
opentherm_gw:
  device: /dev/ttyUSB0
```

{% configuration %}
device:
  description: "Path to OpenTherm Gateway device as supported by [PySerial](https://pythonhosted.org/pyserial/url_handlers.html)."
  required: true
  type: string
climate:
  description: "Settings for the `opentherm_gw` climate entity."
  required: false
  type: map
  keys:
    name:
      description: "The name for the device within Home Assistant."
      required: false
      type: string
      default: "OpenTherm Gateway"
    precision:
      description: "The desired precision for this device. Can be used to match your actual thermostat's precision. Supported values are `0.1`, `0.5` and `1.0`."
      required: false
      type: float
      default: "`0.5` for Celsius and `1.0` for Fahrenheit."
    floor_temperature:
      description: "Some thermostats round all temperatures down to the lower value according to their precision. Default behavior for Home Assistant is to round temperatures to the nearest value. Set this to `True` to override Home Assistant and round to the lower value according to the configured `precision`."
      required: false
      type: boolean
      default: false
{% endconfiguration %}

<p class='note'>
The OpenTherm protocol is based on polling. The thermostat sends requests to the boiler at specific intervals. As a result, it may take some time for changes to propagate between Home Assistant and the thermostat.
</p>

# {% linkable_title Example %}

A full configuration example with the OpenTherm Gateway connected to a remote host running `ser2net` looks like the one below.

```yaml
# Full example configuration.yaml entry
opentherm_gw:
  device: socket://otgw.example.org:2345
  climate:
    name: Thermostat
    precision: 0.5
    floor_temperature: True
```
