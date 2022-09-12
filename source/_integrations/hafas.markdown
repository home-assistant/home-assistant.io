---
title: HaFAS
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 2022.10
ha_domain: hafas
ha_platforms:
  - sensor
ha_integration_type: integration
ha_codeowners: 
  - '@kilimnik'
---

The `hafas` sensor will give you the departure time of the next train for the given connection. In case of a delay, the delay is also shown. Additional details are used to inform about, e.g., the type of the train, price, and if it is on time.

The integration supports fetching train tables from "Deutsche Bahn" as well as from "Verkehrsverbund Süd-Niedersachsen". 

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hafas
    profile: HAFAS_PROFILE
    from: NAME_OF_START_STATION
    to: NAME_OF_FINAL_STATION
```

{% configuration %}
profile:
  description: Defines the profile to pull train data from. Either 'DB' or 'VSN', depending on the HaFAS client to use.
  required: true
  type: string
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

The integration uses [pyhafas](https://pypi.org/project/pyhafas/) as the data source. [HaFAS](https://de.wikipedia.org/wiki/HAFAS) is a public transport management system developed by a company called [HaCon](https://www.hacon.de/).
