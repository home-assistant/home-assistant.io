---
title: International Space Station (ISS)
description: Know if or when ISS will be above your home location
ha_category:
  - Binary Sensor
ha_iot_class: Cloud Polling
ha_release: 0.36
ha_domain: iss
ha_platforms:
  - binary_sensor
---

The `iss` platform uses the
[Open Notify API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
to let you know if the station is above your home location.
This means that ISS is 10° above the horizon of your home.

You can check in the attributes of the sensor to see the timestamp for the next
rise of the station, its current coordinates, and the number of people in space.

## Configuration

To add ISS binary sensor to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: iss
```

{% configuration %}
name:
  description: The name for this sensor in the frontend.
  required: false
  type: string
  default: ISS
show_on_map:
  description: Option to show the position of the ISS on the map.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<div class='note warning'>

If you set `show_on_map: true` then the location attributes are named `latitude` and `longitude`.
The default name of the location attributes is `lat` and `long` to avoid showing them on the map.

</div>

### Show position on map with camera platform

The [generic camera platform](/integrations/mjpeg) offers
the possibility to show the location of the ISS on OpenStreetMap.

{% raw %}

```yaml
# Example configuration.yaml entry
  - platform: iss
    show_on_map: true
    
camera:
  - platform: generic
    name: ISS
    still_image_url: http://staticmap.openstreetmap.de/staticmap.php?center={{ state_attr('binary_sensor.iss', 'lat') }},{{ state_attr('binary_sensor.iss', 'long') }}&zoom=4&size=865x512&maptype=mapnik&markers={{ state_attr('binary_sensor.iss', 'lat') }},{{ state_attr('binary_sensor.iss', 'long') }},lightblue
    limit_refetch_to_url_change: true
```

{% endraw %}
