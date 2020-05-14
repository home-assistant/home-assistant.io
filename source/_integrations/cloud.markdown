---
title: Home Assistant Cloud
description: Enable the Home Assistant Cloud integration.
ha_release: '0.60'
ha_category:
  - Voice
ha_iot_class: Cloud Push
ha_codeowners:
  - '@home-assistant/cloud'
ha_domain: cloud
---

The Home Assistant Cloud allows you to quickly integrate your local Home Assistant with various cloud services like Amazon Alexa and Google Assistant. [Learn more.](/cloud)

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry to enable the cloud component
cloud:
```

Once activated, go to the configuration panel in Home Assistant and create an account and log in. If you are not seeing the **Configuration** panel, make sure you have the following option enabled in your `configuration.yaml` file.

```yaml
config:
```
### Google Assistant configuration
Name

Aliases for exposed enities can be added by secifiyin a list of names to the ```aliases:``` attribute.

Room
```yaml
# Example configuration.yaml
google_actions:
        entity_config:
            light.bedroom_lamp:
              name: "Bedroom Lamp"
              aliases:
                - "My favourite lamp"
                - "Bedroom"
              room: "Bedroom"
            light.living_room_lamp:
              name: "Living room Lamp"
              aliases:
                - "The fancy lamp"
              room: "Living room"
```
