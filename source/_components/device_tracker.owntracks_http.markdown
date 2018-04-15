---
layout: page
title: "OwnTracks (via HTTP)"
description: "Instructions on how to use Owntracks via HTTP to track devices in Home Assistant."
date: 2017-09-28 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: owntracks.png
ha_category: Presence Detection
featured: true
ha_release: 0.55
---

OwnTracks is a free and open source application that allows you to track your location in Home Assistant. This is a platform that supports OwnTracks via their HTTP publishing method.

To integrate Owntracks tracking via HTTP in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: owntracks_http
```

For configuration options and usage instructions, read the documentation for the [OwnTracks platform](/components/device_tracker.owntracks/).

## {% linkable_title Configuring OwnTracks to submit data via HTTP %}

Open OwnTracks and go to Connection preferences:

 - Mode: Select **Private HTTP**
 - Host: [Home Assistant URL]:[port]/api/owntracks/[your name]/[device name]
 - Identification: Turn **Authentication** on, username `homeassistant` and password is your API password that you use to login to Home Assistant.
 
Host example: If I host my Home Assistant at `https://example.duckdns.org`, my name is Paulus and my phone is a Pixel I would set the host to be `https://example.duckdns.org/api/owntracks/paulus/pixel`. This will result in an entity with an ID of `device_tracker.paulus_pixel`. You can pick any name for the user and the device.

Since the battery data is available as an attribute of the device tracker entity, it can be tracked with a Template Sensor.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      pixel_battery:
        friendly_name: Pixel of Paulus
        unit_of_measurement: "%"
        value_template: '{{ states.device_tracker.paulus_pixel.attributes.battery|int }}'
        icon_template: >-
          {% set battery_level = states.device_tracker.paulus_pixel.attributes.battery|default(0)|int %}
          {% set battery_round = (battery_level / 10) |int * 10 %}
          {% if battery_round >= 100 %}
            mdi:battery
          {% elif battery_round > 0 %}
            mdi:battery-{{ battery_round }}
          {% else %}
            mdi:battery-alert
          {% endif %}
        entity_id: 
        - device_tracker.paulus_pixel
```

