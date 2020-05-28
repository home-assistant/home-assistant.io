---
title: OpenGarage
description: Instructions on how to integrate OpenGarage.io covers within Home Assistant.
ha_category:
  - DIY
ha_release: 0.44
ha_domain: opengarage
ha_codeowners:
  - '@danielhiversen'
---

The `opengarage` cover platform lets you control the open-source [OpenGarage.io](https://opengarage.io/) device through Home Assistant.

To add OpenGarage to your installation, go to **Configuration** >> **Integrations** in the UI and enable the Mill integration.

**Example with more detail:**
<p class='img'>
  <img src='{{site_root}}/images/integrations/opengarage/cover_opengarage_details.jpg' />
</p>

```yaml
sensor:
  platform: template
  sensors:
    garage_status:
      friendly_name: 'Honda Door Status'
      value_template: {% raw %}'{% if states.cover.honda %}
          {% if states.cover.honda.attributes["door_state"] == "open" %}
            Open
          {% elif states.cover.honda.attributes["door_state"] == "closed" %}
            Closed
          {% elif states.cover.honda.attributes["door_state"] == "opening" %}
            Opening
          {% elif states.cover.honda.attributes["door_state"] == "closing" %}
            Closing
          {% else %}
            Unknown
          {% endif %}
          {% else %}
          n/a
          {% endif %}'{% endraw %}
    garage_car_present:
      friendly_name: 'Honda in Garage'
      value_template: {% raw %}'{% if states.cover.honda %}
          {% if is_state("cover.honda", "open") %}
            n/a
          {% elif ((states.cover.honda.attributes["distance_sensor"] > 40) and (states.cover.honda.attributes["distance_sensor"] < 100)) %}
            Yes
          {% else %}
            No
          {% endif %}
          {% else %}
          n/a
          {% endif %}'

group:
  garage:
    name: Garage
    entities:
      - cover.honda
      - sensor.garage_status
      - sensor.garage_car_present

customize:
  cover.honda:
    friendly_name: Honda
    entity_picture: /local/honda.gif
  sensor.garage_car_present:
    icon: mdi:car
```

{% endraw %}
