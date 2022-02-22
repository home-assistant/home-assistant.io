---
title: Internet Printing Protocol (IPP)
description: Instructions on how to integrate printers that support the Internet Printing Protocol (IPP) into Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.108
ha_iot_class: Local Polling
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@ctalkington'
ha_domain: ipp
---

The `Internet Printing Protocol (IPP)` integration allows you to read current data from your networked printer that supports the [Internet Printing Protocol](https://www.pwg.org/ipp/everywhere.html).

It provides information about the printer's state and remaining ink levels.

{% include integrations/config_flow.md %}

Ink levels are shown as unavailable or unknown (depending on printer type) when a printer is offline. To save the levels for displaying during an unavailability, either an automation can be used to save them into an [Input Number](/integrations/input_number) helper and displayed via template sensor or they can be updated via trigger-based template sensor. In the later case the sensor does not retain its state during a reboot of Home Assistant.

## Example for input_number-based solution

This examples creates the sensor "Canon Printer Cyan", updates its value based on the cyan ink level of a Canon TR8500 via an automation and retains its while the printer is offline and while Home Assistant is offline.

An [Input Number](/integrations/input_number) helper named input_number.canon_tr8500_cyan is needed and must created in the Configuration->Helpers menu.

An automation to update the value of the input_number.canon_tr8500_cyan is needed:

{% raw %}
```yaml
alias: 'background: save printer values'
description: ''
trigger:
  - platform: numeric_state
    entity_id: sensor.canon_tr8500_series_cyan
    above: -1
condition: []
action:  
  - service: input_number.set_value
    target:
      entity_id: input_number.canon_tr8500_cyan
    data:
      value: '{{ states(''sensor.canon_tr8500_series_cyan'') }}'  
mode: single
```
{% endraw %}

A template sensor to display the [Input Number](/integrations/input_number) as a sensor is needed:

{% raw %}
```yaml
template:
  - sensor:
    - name: "Canon Printer Cyan"      
      state: >   
        {{ states('input_number.canon_tr8500_cyan') | float}}    
      unique_id: "template_canon_printer_cyan"  
      icon: mdi:water
      unit_of_measurement: "%"
```
{% endraw %}



## Example for trigger-based template sensor solution

This examples creates the sensor "Canon Printer Cyan", updates its value based on the cyan ink level of a Canon TR8500 via a trigger and retains its value while the printer is offline.

{% raw %}

```yaml
template:
  - trigger:
      - platform: numeric_state
        entity_id: sensor.canon_tr8500_series_cyan
        above: -1
    sensor:
      - name: Canon Printer Cyan      
        unique_id: "template_canon_printer_cyan"  
        icon: mdi:water                  
        unit_of_measurement: "%"
        state: >
          {{ states("sensor.canon_tr8500_series_cyan") }}
```

{% endraw %}
