---
layout: page
title: "Homematic Signal Generator"
description: "Instructions on how to invoke Homematic's signal generator from Home Assistant."
date: 2018-09-27 20:15
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Notifications
ha_release: 0.79
---

The `homematic_signalgen` notification platform enables invoking Homematic's signal generator.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
notify:
  - name: my_hm
    platform: homematic_signalgen
    address: NEQXXXXXXX
    value: "1,1,108000,8"
```

{% configuration %}
address:
  description: The address of your homematic signal generator. The address is the serial number of the device shown in the CCU in the `devices` section in the column `serial number`.
  required: true
  type: string
value:
  description: This string specifies which file to play. It has the form `<loudness>,<repetitions>,<length>,<track_1>,...,<track_n>`. `<loudness>` is a value between 0 and 1. The parameter `<repetitions>` defines how often the tracks should be played. `<length>` determines the lenght of the playback in seconds (108000 is the maximum). The value `1,1,108000,8,7` for example says that the track 8 and 7 should be played with their full length (maximum length) with no repetitions and full loudness.
  required: true
  type: string
{% endconfiguration %}

### {% linkable_title Usage %}

`homematic_signalgen` is a notify platform and can be controlled by calling the notify service [as described here](/components/notify/).

Only the `data` part of the event payload is processed. This part can specify or override the value given as configuration variable:

```json
{
  "data": {
    "value": "1,1,108000,8"
  }
}
```

It is possible to provide a template in order to compute the tracks to play:

```json
{
  "data": {
    "value": "1,1,108000{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.oeqxxxxxxx_state', 'on') %},2{% endif %}"
  }
}
```

You can also specify the event payload using a group notification (instead of specifying the value for the notify itself):

```yaml
notify:
  - name: my_hm
    platform: homematic_signalgen
    address: NEQXXXXXXX
  - name: group_hm
    platform: group
    services:
      - service: my_hm
        data:
          data:
            value: "1,1,108000{% if is_state('binary_sensor.fensterkontakt1ogbad_state', 'on') %},1{% endif %}{% if is_state('binary_sensor.fensterkontaktdachbad_state', 'on') %},2{% endif %}"

alert:
  temperature:
    name: Temperature too high
    done_message: Temperature OK
    entity_id: binary_sensor.temperature_too_high
    can_acknowledge: True
    notifiers:
      - group_hm
```

Please note that the first `data` element belongs to the `service` `my_hm` while the second one belongs to the event payload.
