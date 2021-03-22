---
title: Trigger Entities
description: Instructions on how to render entities using triggers.
ha_category:
  - Automation
ha_release: 2021.4.0
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_iot_class:
ha_domain: trigger_entity
ha_platforms:
  - sensor
---

Trigger Entities allow you to define entities using templates which are updated based on [automation triggers][trigger-docs]. The entity templates will have access to the [trigger variables](/docs/automation/templating/#available-trigger-data).

```yaml
trigger_entity:
  trigger:
    - platform: webhook
      webhook_id: my-super-secret-webhook-id
  sensor:
    - name: "Webhook Temperature"
      value_template: "{{ trigger.json.temperature }}"
```

_(see [below](#example-adding-webhook-data-to-home-assistant) how to test this webhook example)_

{% configuration %}
trigger:
  description: The trigger configuration for this entity. [See trigger docs][trigger-docs]
  required: true
  type: list
unique_id:
  description: The unique ID for this trigger. This will be prefixed to all unique IDs of all entities.
  required: false
  type: string
sensor:
  description: A list of sensors to create from the trigger data.
  required: true
  type: list
  keys:
    name:
      description: Name to use in the frontend.
      required: false
      type: string
    unique_id:
      description: An ID that uniquely identifies this sensor for this trigger.
      required: false
      type: string
    unit_of_measurement:
      description: "Defines the units of measurement of the sensor, if any. Sensors without are assumed to be discrete values."
      required: false
      type: string
      default: None
    value_template:
      description: Defines a template to get the state of the sensor.
      required: true
      type: template
    device_class:
      description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
      required: false
      type: device_class
      default: None
{% endconfiguration %}


## Example: adding webhook data to Home Assistant

Sometimes the easiest way to get data into Home Assistant is by having the source system send it to Home Assistant. The easiest way to do this in Home Assistant is to use a Trigger Entity configured with a webhook trigger. In our templates we will be able to access the [webhook trigger variables](/docs/automation/templating/#webhook).

```yaml
trigger_entity:
  unique_id: "webhook-environment-info"
  trigger:
    - platform: webhook
      webhook_id: my-super-secret-webhook-id
  sensor:
    - name: "Webhook Temperature"
      unique_id: "temperature"
      value_template: "{{ trigger.json.temperature }}"
```

You can test this trigger entity with the following CURL command:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"temperature": 5}' \
  http://homeassistant.local:8123/api/webhook/my-super-secret-webhook-id
```

<p class='note'>webhook URL endpoints do not require authentication so pick a randomized webhook ID.</p>

[trigger-docs]: /docs/automatin/trigger
