---
layout: page
title: "International Space Station"
description: "Know if or when ISS will be above your home location"
date: 2016-12-18 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: nasa.png
ha_category: Binary Sensor
ha_release: 0.36
redirect_from: /components/sensor.iss/
---

The `iss` platform uses the
[Open Notify API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
to let you know if the station is above your home location.
This means that ISS is 10° above the horizon of your home.

You can check in the attributes of the sensor to see the timestamp for the next
rise of the station, its current coordinates, and the number of people in space.

To add ISS binary sensor to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: iss
```

{% configuration %}
show_on_map:
  description: Option to show the position of the ISS on the map.
  required: optional
  default: false
  type: string
{% endconfiguration %}

<p class='note warning'>
If you set `show_on_map: true` then the location attributes are named `latitude` and `longitude`.
The default name of the location attributes is `lat` and `long` to avoid showing them on the map.
</p>

### {% linkable_title Show position on map with camera platform %}

The [generic camera platform](/components/camera.mjpeg/) offers
the possibility to show the location of the ISS on Google Maps.

{% raw %}
```yaml
# Example configuration.yaml entry
camera:
  - platform: generic
    name: ISS
    still_image_url: http://staticmap.openstreetmap.de/staticmap.php?center={{ states.binary_sensor.iss.attributes.lat }},{{ states.binary_sensor.iss.attributes.long }}&zoom=4&size=865x512&maptype=mapnik&markers={{ states.binary_sensor.iss.attributes.lat }},{{ states.binary_sensor.iss.attributes.long }},lightblue
     limit_refetch_to_url_change: true
```
{% endraw %}
