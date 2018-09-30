---
layout: page
title: "myStrom Switch"
description: "Instructions on how to integrate myStrom switches into Home Assistant."
date: 2015-11-25 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mystrom.png
ha_category: Switch
ha_release: 0.9
ha_iot_class: "Local Polling"
---


The `mystrom` switch platform allows you to control the state of your [myStrom](https://mystrom.ch/en/) switches. The built-in sensor is measuring the power consumption while the switch is on. 

## {% linkable_title Setup %}

Make sure that you have enabled the REST API under **Advanced** in the web frontend of the switch.

<p class='img'>
  <img src='{{site_root}}/images/components/mystrom/mystrom-advanced.png' />
</p>


## {% linkable_title Configuration %}

To use your myStrom switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: mystrom
    host: IP_ADRRESS
```

{% configuration %}
host:
  description: "The IP address of your myStrom switch, e.g., `http://192.168.1.32`."
  required: true
  type: string
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: myStrom Switch
{% endconfiguration %}

Check if you are able to access the device located at `http://IP_ADRRESS`. The details about your switch is provided as a JSON response.

```bash
$ curl -X GET -H "Content-Type: application/json" http://IP_ADDRESS/report
{
	"power":	0,
	"relay":	false
}
```

or change its state:

```bash
$ curl -G -X GET http://IP_ADDRESS/relay -d 'state=1'
```

### {% linkable_title Get the current power consumption %}

The switch is measuring the current power consumption. To expose this as a sensor use a [`template` sensor](/components/sensor.template/).

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      power:
        friendly_name: "Current Power"
        unit_of_measurement: "W"
        value_template: "{{ states.switch.office.attributes.current_power_w }}"
```
{% endraw %}

