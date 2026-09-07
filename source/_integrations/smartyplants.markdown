---
title: SmartyPlants
description: Instructions on how to integrate SmartyPlants plant sensors with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bigbimbs'
ha_domain: smartyplants
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **SmartyPlants** {% term integration %} connects your SmartyPlants plant sensors to Home Assistant.
Each sensor measures soil moisture, temperature, humidity, and light for the plant it is attached to.
SmartyPlants combines those readings with the plant's species to produce a health score and a fertilizing countdown.

Every plant appears as a {% term device %} with its readings as {% term entities %}.
You can put them on a dashboard, chart them over time, and build automations, such as a reminder to water a plant when its soil dries out, a warning when a sensor's battery runs down, or a grow light that turns on after a dim day.

## Supported devices

The integration works with any SmartyPlants soil sensor that reports to the SmartyPlants cloud.
Sensors are taken from your account, so there is nothing to pair in Home Assistant.
Whatever appears in the SmartyPlants app appears here.

## Prerequisites

- A SmartyPlants account with at least one sensor.
- An API key, created in the SmartyPlants app under **Settings**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key created in the SmartyPlants app under **Settings**. It identifies your account to Home Assistant."
Webhook secret:
  description: "Optional. The signing secret shown by the SmartyPlants app after you add Home Assistant's webhook URL. Leave it empty to use polling only."
{% endconfiguration_basic %}

### Live updates with a webhook

By default, the integration polls every minute.
To have readings arrive immediately instead:

1. During setup, copy the webhook URL shown on the second step.
2. In the SmartyPlants app, add that URL as your Home Assistant webhook.
3. Paste the signing secret the app gives you back into the setup dialog.

Pushed updates are verified against that secret, so an update that is not correctly signed is rejected.
Polling continues either way as a fallback, so the integration still works if a push is missed.

{% note %}
Home Assistant must be reachable from the internet for a webhook to be delivered.
If it is not, leave the secret empty and the integration polls instead.
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

The readings are most useful when something acts on them for you.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Remind me to water a plant

Soil moisture falls slowly, so a short dip below the threshold is usually noise rather than a dry plant.
Waiting an hour before notifying avoids a reminder that has already fixed itself.

- **Trigger**: Numeric state of **Soil moisture** below 25 for one hour
- **Action**: Send a notification

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
    - action: notify.mobile_app_phone
      data:
        message: "The Monstera's soil is dry. Time to water it."
{% endexample %}

{% enddetails %}

### Automation: Tell me when a sensor stops reporting

A sensor that goes offline stops reporting, and its entities become unavailable.
A flat battery is the usual reason.

- **Trigger**: State of **Soil moisture** to unavailable for 30 minutes
- **Action**: Create a persistent notification

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

- **Trigger**: Numeric state of **Light quality** below 40 for two hours
- **Condition**: Sun is before sunset
- **Action**: Turn on light

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
      before: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.grow_lamp
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} SmartyPlants every minute.
If a webhook is configured, readings are also pushed as they arrive, and the poll acts as a fallback.

A sensor that the SmartyPlants cloud reports as offline has its entities marked unavailable, rather than continuing to show readings that no longer describe the plant.

## Known limitations

- Plant photos from the SmartyPlants app are not shown in Home Assistant.
- The integration is read-only. Renaming a plant or assigning a sensor is done in the SmartyPlants app.
- Sensors are read once when the integration starts. A sensor added in the SmartyPlants app appears after you reload the integration.
- Plants that have no sensor attached are not shown.

## Troubleshooting

### The integration cannot connect

Check that the API key is still valid in the SmartyPlants app under **Settings**.
If it was revoked or regenerated, delete the integration and add it again with the new key.

### The API key is refused even though it is correct

An API key can be restricted to particular IP addresses.
If the restriction does not cover the address your Home Assistant connects from, every request is refused.

The address must be the public one your Home Assistant reaches the internet from, not its address on your local network.
The SmartyPlants app shows the address of the last accepted request for each key, which is the value to allow.

### Readings are shown as unavailable

SmartyPlants is reporting the sensor as offline.
Check the **Battery** entity on the device.
A flat battery or a sensor out of range is the usual cause.

{% include integrations/remove_device_service.md %}
