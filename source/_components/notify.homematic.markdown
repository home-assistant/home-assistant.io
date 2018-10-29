---
layout: page
title: "Homematic Notifications"
description: "Instructions on how to notify Homematic devices."
date: 2018-10-03 11:44
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Notifications
ha_release: 0.81
---

The `homematic` notification platform enables invoking Homematic devices.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
notify:
  - name: my_hm
    platform: homematic
    address: NEQXXXXXXX
    channel: 2
    param: "SUBMIT"
    value: "1,1,108000,8"
```

{% configuration %}
address:
  description: The address of your Homematic device. The address is the serial number of the device shown in the CCU in the `devices` section in the column `serial number`.
  required: true
  type: string
channel:
  description: The channel of your Homematic device. 
  required: true
  type: integer
param:
  description: An additional parameter for the Homematic device. 
  required: true
  type: string
interface:
  description: Set the name of the interface from the config.
  required: false
  type: string
value:
  description: This is the value that is set on the device. Its device specific.
  required: true
  type: string
{% endconfiguration %}

### {% linkable_title Usage %}

`homematic` is a notify platform and can be controlled by calling the notify service [as described here](/components/notify/).

Only the `data` part of the event payload is processed. This part can specify or override the value given as configuration variable:

```json
{
  "data": {
    "address": "NEQXXXXXXX",
    "channel": 2,
    "param": "SUBMIT",
    "value": "1,1,108000,8"
  }
}
```

It is possible to provide a template in order to compute the value:

{% raw %}
```json
{
  "data": {
    "value": "1,1,108000{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},2{% endif %}"
  }
}
```
{% endraw %}

You can also specify the event payload using a group notification (instead of specifying the value for the notify itself):

{% raw %}
```yaml
notify:
  - name: my_hm
    platform: homematic
    address: NEQXXXXXXX
  - name: group_hm
    platform: group
    services:
      - service: my_hm
        data:
          data:
            value: "1,1,108000{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},2{% endif %}"

alert:
  temperature:
    name: Temperature too high
    done_message: Temperature OK
    entity_id: binary_sensor.temperature_too_high
    can_acknowledge: True
    notifiers:
      - group_hm
```
{% endraw %}

Please note that the first `data` element belongs to the service `my_hm`, while the second one belongs to the event payload.
