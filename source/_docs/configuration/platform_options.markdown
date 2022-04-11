---
title: "Entity integration platform options"
description: "Shows how to customize polling interval for any integration via configuration.yaml."
---

<div class='note info'>
These options are being phased out and are only available for single platform integrations.
</div>

Some integrations or platforms (those that are based on the [entity](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/helpers/entity.py) class) allows various extra options to be set.

## Entity namespace

By setting an entity namespace, all entities will be prefixed with that namespace. That way `light.bathroom` can become `light.holiday_house_bathroom`.

```yaml
# Example configuration.yaml entry
light:
  - platform: your_lights
    entity_namespace: holiday_house
```

## Scan Interval

Platforms that require polling will be polled in an interval specified by the main component. For example a light will check every 30 seconds for a changed state. You can however customize this behavior for many integrations:

### YAML

It is possible to overwrite this scan interval for some platforms that are set up via YAML by specifying a `scan_interval` configuration key. In the example below we set up the `your_lights` platform but tell Home Assistant to poll the devices every 10 seconds instead of the default 30 seconds.

```yaml
# Example configuration.yaml entry to poll your_lights every 10 seconds.
light:
  - platform: your_lights
    scan_interval: 10
```

Note that not all platforms respect this configuration key.

### Platforms set up via the UI

You can disable polling completely by navigating to the integrations page and select the "System options" of your integration. Then uncheck "Enable Polling for updates".

Wait? Disable polling?! Yes :)

So, there are many different requests on, for example, changing polling rates (also known as scan interval), but also requests for polling on a schedule, or, only based on other input (e.g., triggered by a motion sensor).

Therefore, we decided to provide the maximum flexibility for any use case you can come up with. Disabling polling makes Home Assistant stop polling automatically. However, you can use the `homeassistant.update_entity` service on those entities to trigger a poll for information.

This means, once you’ve disabled polling for an integration, you can create automations and completely customize when you poll that integration from that point on. All based on your own schedule, conditions or triggers.

In the example below we configure an automation for the `your_lights` platform poll the devices every 2 minutes seconds instead of the default.

{% raw %}

```yaml
- alias: Update your_lights
  description: Update your_lights entities every 2 minutes
  trigger:
    - platform: time_pattern
      minutes: /2
  action:
    - service: homeassistant.update_entity
      data:
        entity_id: '{{ integration_entities('your_lights') }}'
  mode: single
```

{% endraw %}
