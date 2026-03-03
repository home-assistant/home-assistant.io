---
title: Dovado
description: How to integrate Dovado within Home Assistant.
ha_category:
  - Notifications
  - Sensor
  - System monitor
ha_release: 0.87
ha_iot_class: Local Polling
ha_domain: dovado
ha_platforms:
  - notify
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Dovado** {% term integration %} manages communication with the [Dovado](https://www.dovado.com/) router.

There is currently support for the following device types within Home Assistant:

- [Notifications](/integrations/dovado/#notifications)
- [Sensor](/integrations/dovado/#sensor)

To add a Dovado {% term integration %} to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
dovado:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your Dovado username.
  required: true
  type: string
password:
  description: Your Dovado password.
  required: true
  type: string
host:
  description: The IP address of your router.
  required: false
  type: string
  default: Home Assistant's default gateway
port:
  description:  The port number of your router.
  required: false
  type: integer
  default: 6435
{% endconfiguration %}

## Notifications

The `dovado` notify platform allows you to send SMS from your [Dovado](https://www.dovado.com/) router, if it supports it.

To add the Dovado {% term integration %} to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: dovado
```

### Usage

This is a notify platform and thus can be controlled by calling the notify action [as described here](/integrations/notify/). It will send an SMS notification to a single phone number in the notification **target**.

```yaml
# Example automation notification entry
automation:
  - alias: "The sun has set"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: notify.dovado
        data:
          message: "The sun has set"
          target: "+14151234567"
```

## Sensor

The `dovado` sensor platform let you monitor your [Dovado](https://www.dovado.com/) router.

To add a Dovado sensor to your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: dovado
    sensors:
      - network
```

{% configuration %}
sensors:
  description: Conditions to display in the frontend. Only accepts the values listed here.
  required: true
  type: list
  keys:
    network:
      description: Creates a sensor for Network State (3G, 4G, etc.).
    signal:
      description: Creates a sensor for the signal strength.
    download:
      description: Creates a sensor for download speed.
    upload:
      description: Creates a sensor for download speed.
    sms:
      description: Creates a sensor for number of unread text messages.
{% endconfiguration %}
