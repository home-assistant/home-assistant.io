---
title: Deutsche Bahn
description: Instructions on how to integrate timetable data for traveling in Germany within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: deutsche_bahn
ha_platforms:
  - sensor
ha_integration_type: integration
---

<div class='note warning'>
  This integration is pending removal from Home Assistant and will be no longer available as of Home Assistant 2022.11.
</div>

The `deutsche_bahn` sensor will give you the departure time of the next train for the given connection. In case of a delay, the delay is also shown. Additional details are used to inform about, e.g., the type of the train, price, and if it is on time.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: deutsche_bahn
    from: NAME_OF_START_STATION
    to: NAME_OF_FINAL_STATION
```

{% configuration %}
from:
  description: The name of the start station.
  required: true
  type: string
to:
  description: The name of the end/destination station.
  required: true
  type: string
offset:
  description: Do not display departures leaving sooner than this number of seconds. Useful if you are a couple of minutes away from the stop. The formats "HH:MM" and "HH:MM:SS" are also supported.
  required: false
  type: time
  default: 00:00
only_direct:
  description: Only show direct connections.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

This sensor stores a lot of attributes which can be accessed by other sensors, e.g., a [template sensor](/integrations/template).

{% raw %}

```yaml
# Example configuration.yaml entry
template:
  - sensor:
    - name : "Next departure"
      state: "{{ state_attr('sensor.munich_to_ulm', 'next') }}"
```

{% endraw %}

The data is coming from the [bahn.de](https://www.bahn.de/p/view/index.shtml) website.
