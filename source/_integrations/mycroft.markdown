---
title: Mycroft
description: Instructions on how to setup Mycroft AI within Home Assistant.
ha_category:
  - Notifications
  - Voice
ha_iot_class: Local Push
ha_release: 0.53
ha_domain: mycroft
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[Mycroft](https://mycroft.ai) is an open source voice assistant that allows you to send notifications and more to Mycroft from Home Assistant.

There is currently support for the following device types within Home Assistant:

- **Notifications** - Allows to deliver notifications from Home Assistant to [Mycroft AI](https://mycroft.ai/).

## Configuration

To use Mycroft in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
mycroft:
  host: 0.0.0.0
```

{% configuration %}
host:
  description: The IP address of your Mycroft instance.
  required: true
  type: string
{% endconfiguration %}  

## Using notifications

To use Mycroft for sending notifications, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
notify:
  - platform: mycroft
    name: mycroft
```  

{% configuration %}
name:
  description: Frendly name of your Mycroft instance.
  required: true
  type: string
{% endconfiguration %}  

## Examples

Send a message to Mycroft by calling `notify.mycroft` action:

```yaml
message: "Hey Mycroft. Turn on the office light. "
```
