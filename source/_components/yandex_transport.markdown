---
title: "Yandex transport"
description: "Instructions on how to setup Yandex transport with Home Assistant."
logo: yandex.png
ha_category:
  - Transport
ha_release: 0.99
redirect_from:
 - /components/sensor.yandex_tranport/
---

The `yandex_tranport` sensor platform uses [Yandex Maps](https://maps.yandex.ru/) it will give you the time until the next departure time from a bus/tramway/etc stop.

The [Yandex Maps](https://maps.yandex.ru/) website can help to determine the id of your bus stop. You can select bus stop by clicking on the map, and look to the url:

https://yandex.ru/maps/213/moscow/?ll=37.722565%2C55.806662&masstransit%5BstopId%5D=stop__9642962&mode=masstransit&z=16.52
where stop id is: **9642962**

if you want to look only specific routes, you can add them in routes section.

## Configuration

To activate Yandex Transport, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yandex_tranport
    stop_id: YOUR_STOP_ID
```

{% configuration %}
stop_id:
  description: The ID of the transport stop to get the information for.
  required: true
  type: string
routes:
  description: A list of a specific bus/tramway/etc routes at the stop. This is the same as the bus number, e.g., `83`. If the routes with letters contain cyrillic symbols, so write them to configuration.yaml BY cyrillic.
  required: false
  type: list
name:
  description: A friendly name for this sensor.
  required: false
  default: Yandex Transport
  type: string
{% endconfiguration %}

## Full configuration example

The configuration sample below shows how an entry can look like:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: yandex_transport
    name: Bus_to_subway
    stop_id: 9639579
    routes:
      - 63
      - 179
      - 179к
      - 154
      - 591
      - 677к
```

## Options For Entities
You can configure view information about next bus using lovelace card.
To enable displaying the relative time in your `default_vew` add the following lines:
```yaml
# Example default_view entry
title: Home Assistant
views:
    cards:
      - entities:
          - entity: sensor.yandex_transport
            format: relative
        type: entities
    path: default_view
```

Data provided by https://maps.yandex.ru
