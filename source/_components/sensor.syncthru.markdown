---
layout: page
title: "Samsung SyncThru Printer"
description: "Instructions how to integrate a Samsung printer providing SyncThru within Home Assistant."
date: 2018-02-19 23:33
sidebar: true
comments: false
sharing: true
footer: true
logo: # where do I place this
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.63.3
---

The Samsung SyncThru Printer platform allows you to read current data off your local Samsung printer.

It usually provides information about the device's state, the left amount of ink or toner and the state of paper trays.
The platform automatically monitors every supported component part.

If you wish not to include certain monitored values specify the values that you would like to see in the front-end via the `monitored_conditions` setting.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: syncthru
    resource: http://my-printer.address
    name: My Awesome Printer
    monitored_conditions:
        - toner_black
        - output_tray_0
```


{% configuration %}
  resource:
    description: The address for connecting to the printer. Equal to the SyncThru Webservice address.
    required: true
    default: false
    type: url
  name:
    description: A user specified name for the printer. Defaults to "Samsung Printer" and the friendly name will be the name of the printer model.
    required: false
    default: Samsung Printer
    type: string
  monitored_conditions:
    description: Conditions to display in the frontend.
    required: false
    default: all values
    type: list
    keys:
      toner_black:
      toner_cyan:
      toner_magenta:
      toner_yellow:
      drum_black:
      drum_cyan:
      drum_magenta:
      drum_yellow:
      tray_1:
      tray_2:
      tray_3:
      tray_4:
      tray_5:
      output_tray_0:
      output_tray_1:
      output_tray_2:
      output_tray_3:
      output_tray_4:
      output_tray_5:
{% endconfiguration %}
