---
title: "Entity integration platform options"
description: "Shows how to customize polling interval for any integration via configuration.yaml."
---

{% important %}
These options are being phased out and are only available for single platform integrations.
{% endimportant %}

Some integrations or platforms (those that are based on the [entity](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/entity.py) class) allow various extra options to be set.

## Entity namespace

By setting an entity namespace, all entities will be prefixed with that namespace. That way, `light.bathroom` can become `light.holiday_house_bathroom`.

```yaml
# Example configuration.yaml entry
light:
  - platform: your_lights
    entity_namespace: holiday_house
```

## Scan interval

Platforms that require polling will be polled in an interval specified by the main integration. For example, a light will check every 30 seconds for a changed state. It is possible to overwrite this scanning interval for any platform that is being polled by specifying a `scan_interval` configuration key. In the example below, we set up the `your_lights` platform but tell Home Assistant to poll the devices every 10 seconds instead of the default 30 seconds.

```yaml
# Example configuration.yaml entry to poll your_lights every 10 seconds.
light:
  - platform: your_lights
    scan_interval: 10
```
