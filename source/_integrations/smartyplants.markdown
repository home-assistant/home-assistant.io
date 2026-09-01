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

The **SmartyPlants** {% term integration %} connects your SmartyPlants plant
sensors to Home Assistant. Each sensor measures soil moisture, temperature,
humidity and light for the plant it is attached to, and SmartyPlants combines
those readings with the plant's species to produce a health score and a
fertilising countdown.

Every plant appears as a {% term device %} with its readings as
{% term entities %}, so you can put them on a dashboard, chart them over time,
and build automations such as a reminder to water a plant when its soil dries
out.

Readings are fetched from the SmartyPlants cloud every minute. You can
optionally configure a webhook so updates arrive the moment a sensor reports,
rather than waiting for the next poll.

## Prerequisites

- A SmartyPlants account with at least one sensor.
- An API key, created in the SmartyPlants app under **Settings**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Server:
  description: "The SmartyPlants server to connect to. Leave the default unless you were given a different address."
API key:
  description: "The API key created in the SmartyPlants app under **Settings**. It identifies your account to Home Assistant."
Webhook secret:
  description: "Optional. The signing secret shown by the SmartyPlants app after you add Home Assistant's webhook URL. Leave it empty to use polling only."
{% endconfiguration_basic %}

## Live updates with a webhook

By default the integration polls every minute. To have readings arrive
immediately instead:

1. During setup, copy the webhook URL shown on the second step.
2. In the SmartyPlants app, add that URL as your Home Assistant webhook.
3. Paste the signing secret the app gives you back into the setup dialog.

Pushed updates are verified against that secret, so an update that is not
correctly signed is rejected. Polling continues either way as a fallback, so
the integration still works if a push is missed.

<div class='note'>
Home Assistant must be reachable from the internet for a webhook to be
delivered. If it is not, leave the secret empty and the integration will poll.
</div>

## Supported devices

The integration works with any SmartyPlants soil sensor that reports to the
SmartyPlants cloud. Sensors are discovered from your account, so there is
nothing to pair in Home Assistant: whatever appears in the SmartyPlants app
appears here.

## Supported functionality

Each plant with a sensor attached provides the following entities.

| Entity | Description |
| ------ | ----------- |
| Temperature | Air temperature at the plant, in your account's preferred unit. |
| Humidity | Relative humidity at the plant. |
| Soil moisture | Moisture measured in the soil. |
| Illuminance | Light reaching the plant, in lux. |
| Light quality | A 0–100 score for how suitable the light is for this species. |
| Health score | A 0–100 overall score for the plant. |
| Fertilise in | Days until fertilising is due. |
| Battery | Sensor battery level. Diagnostic. |

## Data updates

The integration {% term polling polls %} SmartyPlants every minute. If a
webhook is configured, readings are also pushed as they arrive and the poll acts
as a fallback.

A sensor the SmartyPlants cloud reports as offline has its entities marked
unavailable, rather than continuing to show readings that no longer describe
the plant.

## Use cases

- Get a notification when a plant's soil dries out, instead of checking the
  app.
- Put every plant's health score on a dashboard and see at a glance which one
  needs attention.
- Chart soil moisture against your watering habits to work out whether a plant
  is being over- or under-watered.
- Turn a grow light on when a plant has had too little light for the day.
- Be told when a sensor's battery is running down, before it stops reporting.

## Examples

Notify when a plant needs watering:

```yaml
automation:
  - alias: "Monstera needs water"
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
```

Announce when a sensor stops reporting:

```yaml
automation:
  - alias: "SmartyPlants sensor stopped reporting"
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
          message: >-
            The Monstera sensor has stopped reporting. Check its battery.
```

Turn on a grow light when light has been low:

```yaml
automation:
  - alias: "Top up light for the fern"
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
```

## Known limitations

- Plant photos from the SmartyPlants app are not shown in Home Assistant.
- The integration is read-only. Renaming a plant or assigning a sensor is done
  in the SmartyPlants app.
- Sensors are read once when the integration starts. A sensor added in the
  SmartyPlants app appears after you reload the integration.
- Plants that have no sensor attached are not shown.

## Troubleshooting

### The integration cannot connect

Check that the API key is still valid in the SmartyPlants app under
**Settings**. If it was revoked or regenerated, delete the integration and add
it again with the new key.

### Readings are shown as unavailable

SmartyPlants is reporting the sensor as offline. Check the **Battery** entity
on the device: a flat battery or a sensor out of range is the usual cause.

{% include integrations/remove_device_service.md %}
