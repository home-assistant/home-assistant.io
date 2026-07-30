---
title: Nature Remo
description: Instructions on how to integrate Nature Remo smart remote controllers with Home Assistant.
ha_release: 2026.8
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: nature_remo
ha_platforms:
  - sensor
ha_codeowners:
  - '@tnj'
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Nature Remo** {% term integration %} connects the smart remote
controllers made by [Nature](https://nature.global/) to Home Assistant
through the [Nature Remo Cloud API](https://developer.nature.global/).
The Remo series are infrared remote hubs with built-in environment
sensors, popular for controlling air conditioners, TVs, and lights. The
Remo E series is a separate product line: it has no infrared hardware and
is instead an ECHONET Lite controller that reads and controls ECHONET
Lite devices — most commonly a residential smart meter.

## Supported devices

The integration talks to the Nature cloud, so every Remo registered in the
Nature Home app is picked up automatically — including devices in multiple
homes on the same account. It has been verified with:

- Nature Remo 3
- Nature Remo mini
- Nature Remo (1st generation)
- Nature Remo Lapis
- Nature Remo E lite (ECHONET Lite controller)

Other models — infrared hubs such as the Nature Remo 2 and Remo nano, and
the Nature Remo E controller — use the same cloud API and are expected to
work. Note that the Remo nano has no built-in sensors, so it provides no
sensor entities.

## Prerequisites

1. Set up your Remo devices in the **Nature Home** app first; the
   integration only sees what the Nature cloud knows about.
2. Sign in at [home.nature.global](https://home.nature.global/) with your
   Nature account and generate an **access token**. Store it somewhere
   safe — the token is shown only once.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Access token:
  description: "The personal access token generated at [home.nature.global](https://home.nature.global/). One token gives access to all homes and devices of the account."
{% endconfiguration_basic %}

## Data updates

The integration {% term polling polls %} the Nature cloud every 60 seconds
(two API requests per cycle). The Nature API allows 30 requests per
5 minutes **per account**, shared by every API client using the same
account, so configure the integration only once per account.

## Sensors

Remo hubs expose their built-in sensors (availability varies by model):

- **Temperature**
- **Humidity**
- **Illuminance** — the raw brightness level the device reports; Nature
  does not document a physical unit for it.
- **Last motion** — the timestamp of the most recent motion detection.

Remo E and Remo E lite expose their smart-meter readings, ready for the
[energy dashboard](/docs/energy/):

- **Instantaneous power**
- **Cumulative energy purchased**
- **Cumulative energy sold**

## Possible use cases

- Track temperature and humidity of every room that has a Remo, without
  extra hardware.
- Feed your purchased and sold energy into the energy dashboard through a
  Remo E lite.
- Use the last-motion timestamp to detect that a room has been empty for a
  while.

## Example automations

{% details "Warn when a room gets hot" %}

{% raw %}

```yaml
automation:
  - alias: "Warn when the living room gets hot"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.living_remo_temperature
        above: 28
        for: "00:10:00"
    actions:
      - action: notify.notify
        data:
          message: >-
            Living room is at
            {{ states('sensor.living_remo_temperature') }} °C.
```

{% endraw %}

{% enddetails %}

## Known limitations

- The Nature cloud has no push channel, so all data arrives by polling;
  state changes can take up to a minute to appear.
- Motion is reported only as the timestamp of the last detection. A
  real-time motion binary sensor is not possible with this API.
- Hubs running older firmware do not report an online/offline flag; an
  unplugged hub is only noticeable through readings that stop updating.

## Troubleshooting

### The entry fails with "Access token is invalid or was revoked"

Home Assistant could not authenticate against the Nature cloud, because
the access token was revoked or belongs to an account that no longer
exists. Generate a new token at
[home.nature.global](https://home.nature.global/), delete the Nature Remo
entry, and set the integration up again with the new token.

### Log messages about the rate limit

The 30-requests-per-5-minutes budget is shared across everything using
your Nature account. If you see rate-limit errors, check for a second
Home Assistant instance, scripts, or other integrations polling the same
account, and remove the duplicates.

### A device shows no sensor entities

Not every Remo model has every sensor: the Remo nano has none, only the
Remo E family provides smart-meter readings, and humidity requires a model
with a humidity sensor. Readings the device has never reported do not
create entities.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can revoke the access token at
[home.nature.global](https://home.nature.global/) if it is no longer used.
