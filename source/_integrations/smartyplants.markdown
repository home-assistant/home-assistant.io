---
description: Instructions on how to integrate SmartyPlants plant sensors with Home Assistant.
ha_release: 2026.11
ha_domain: smartyplants
---

The **SmartyPlants** {% term integration %} connects your SmartyPlants plant sensors to Home Assistant. Each sensor measures soil moisture, temperature, humidity, and light for the plant it is attached to. SmartyPlants combines those readings with the plant's species to produce a health score and a fertilizing countdown.

Each sensor appears as a {% term device %} with its readings as {% term entities %}. The device is named after the plant the sensor is attached to. If the sensor isn't attached to a plant, it uses the sensor's name instead. You can put them on a dashboard, chart them over time, and build automations, such as a reminder to water a plant when its soil dries out, a warning when a sensor's battery runs down, or a grow light that turns on after a dim day.

## Supported devices

The integration works with any SmartyPlants soil sensor that reports to the SmartyPlants cloud. Sensors are taken from your account, so there is nothing to pair in Home Assistant. Every sensor on your account appears here, including any that is not yet attached to a plant.

## Prerequisites

- The SmartyPlants app, which is where sensors and plants are set up.
- A SmartyPlants account with at least one sensor.
- An API key, created in the app under **Settings**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key created in the SmartyPlants app under **Settings**. It identifies your account to Home Assistant."
Webhook secret:
  description: "Optional, and only set while adding the integration. The signing secret shown by the SmartyPlants app after you add Home Assistant's webhook URL. Home Assistant must be reachable from the internet to receive pushed updates, so leave this empty to use polling only. See [Live updates with a webhook](#live-updates-with-a-webhook)."
{% endconfiguration_basic %}

### Live updates with a webhook

The integration polls every minute. To have readings arrive immediately as well:

1. During setup, copy the webhook URL shown on the second step.
2. In the SmartyPlants app, add that URL as your Home Assistant webhook.
3. Paste the signing secret the app gives you back into the setup dialog.

Pushed updates are verified against that secret, so an update that is not correctly signed is rejected. Polling continues either way as a fallback, so the integration still works if a push is missed.

The secret is set while adding the integration and cannot be changed afterwards. To use a different one, remove the integration and add it again.

{% note %}
Home Assistant must be reachable from the internet for a webhook to be delivered. If it is not, leave the secret empty and the integration polls instead.
{% endnote %}

## Supported functionality

Each plant with a sensor attached provides the following entities.

### Sensors

- **Temperature**
  - **Description**: Air temperature at the plant, in the unit set on your SmartyPlants account.
- **Humidity**
  - **Description**: Relative humidity at the plant.
- **Soil moisture**
  - **Description**: Moisture measured in the soil.
- **Illuminance**
  - **Description**: Light reaching the plant, in lux.
- **Light quality**
  - **Description**: A score from 0 to 100 for how suitable the light is for this species.
- **Health score**
  - **Description**: A score from 0 to 100 for the overall condition of the plant.
- **Fertilize in**
  - **Description**: Days until fertilizing is due.
- **Battery**
  - **Description**: Sensor battery level.
  - **Remarks**: Diagnostic entity.

## SmartyPlants automation examples

The readings are most useful when something acts on them for you. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Remind me to water a plant

Soil moisture falls slowly, so a short dip below the threshold is usually noise rather than a dry plant. Waiting an hour before notifying avoids a reminder that has already fixed itself.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Monstera Soil moisture
  - **Below**: 25
  - **For at least**: 1 hour
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a watering reminder" %}

{% example %}
automation: |
  alias: "Monstera needs water"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.monstera_soil_moisture
      below: 25
      for:
        hours: 1
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The Monstera's soil is dry. Time to water it."
{% endexample %}

{% enddetails %}

### Automation: Tell me when a sensor stops reporting

A sensor that goes offline stops reporting, and its entities become unavailable. A flat battery is the usual reason.

- **Trigger**: State changed
  - **Entity**: Monstera Soil moisture
  - **To**: Unavailable
  - **For at least**: 30 minutes
- **Action**: Create persistent notification

{% details "YAML example for a sensor that stopped reporting" %}

{% example %}
automation: |
  alias: "SmartyPlants sensor stopped reporting"
  triggers:
    - trigger: state
      entity_id: sensor.monstera_soil_moisture
      to: "unavailable"
      for:
        minutes: 30
  actions:
    - action: persistent_notification.create
      data:
        title: "Plant sensor offline"
        message: "The Monstera sensor has stopped reporting. Check its battery."
{% endexample %}

{% enddetails %}

### Automation: Top up the light on a dim day

**Light quality** scores the light the plant actually received against what its species needs.
Checking before sunset avoids turning a lamp on for a plant that has run out of daylight anyway.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Fern Light quality
  - **Below**: 40
  - **For at least**: 2 hours
- **Condition**: Sun
  - **After**: Sunrise
  - **Before**: Sunset
- **Action**: Turn on light
  - **Target**: Grow lamp

{% details "YAML example for topping up the light" %}

{% example %}
automation: |
  alias: "Top up light for the fern"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.fern_light_quality
      below: 40
      for:
        hours: 2
  conditions:
    - condition: sun
      after: sunrise
      before: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.grow_lamp
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} SmartyPlants every minute. If a webhook is configured, readings are also pushed as they arrive, and the poll acts as a fallback.

A sensor that the SmartyPlants cloud reports as offline has its entities marked unavailable, rather than continuing to show readings that no longer describe the plant.

## Known limitations

- Plant photos from the SmartyPlants app are not shown in Home Assistant.
- The integration is read-only. Renaming a plant or assigning a sensor is done in the SmartyPlants app.
- Sensors are read once when the integration starts. A sensor added in the SmartyPlants app appears after you reload the integration.
- Plants that have no sensor attached are not shown.
- The webhook secret cannot be changed once the integration is added.

## Troubleshooting

### The integration cannot connect

Check that the API key is still valid in the SmartyPlants app under **Settings**. If it was revoked or regenerated, delete the integration and add it again with the new key.

### The API key is refused even though it is correct

An API key can be restricted to particular IP addresses. If the restriction does not cover the address your Home Assistant connects from, every request is refused.

The address must be the public one your Home Assistant reaches the internet from, not its address on your local network. The SmartyPlants app shows the address of the last accepted request for each key, which is the value to allow.

### Readings are shown as unavailable

SmartyPlants is reporting the sensor as offline. Check the **Battery** entity on the device. A flat battery or a sensor out of range is the usual cause.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

If you set up a webhook, also remove the Home Assistant webhook URL in the SmartyPlants app. If you no longer need the API key, delete it there too.
