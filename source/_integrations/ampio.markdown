---
title: Ampio
description: Instructions on how to integrate Ampio Smart Home with Home Assistant.
ha_category:
  - Hub
  - Sensor
ha_release: 2026.9
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@pszypowicz'
ha_domain: ampio
ha_integration_type: hub
ha_platforms:
  - sensor
ha_quality_scale: bronze
---

The **Ampio** {% term integration %} connects Home Assistant to an [Ampio Smart Home](https://ampio.com/) installation through its M-SERV controller. It talks directly to the M-SERV's local MQTT broker, so sensor values arrive as soon as the Ampio bus reports them, and no cloud account is involved.

## Supported devices

The integration exposes the sensor channels configured in your Ampio installation. Confirmed sources of sensor data:

- **M-SENS** environmental sensors: temperature, humidity, absolute and relative pressure, illuminance, loudness, air quality index, and CO2.
- Any other Ampio module whose channels report one of those measurements.

Every entity is attached to a device representing its physical Ampio module, and each module device links to the M-SERV hub device. The grouping is identical for both Ampio account types: with an administrator account the devices carry the module name, model, serial, and firmware version from the M-SERV's module catalog, while with a standard account they are named after the module's bus address until you rename them.

Objects belonging to output modules (relays, dimmers, blinds, RGBW, DALI) are not exposed as entities.

## Prerequisites

- The Ampio M-SERV must be reachable from the Home Assistant host on its MQTT port (`1883`).
- You need the credentials of an Ampio account on the M-SERV. A standard user account is recommended; an administrator account additionally provides per-module device information and faster state updates.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Hostname or IP address of the Ampio server (M-SERV). Defaults to `ampio.local`."
Username:
  description: "Your Ampio account username."
Password:
  description: "Your Ampio account password."
{% endconfiguration_basic %}

During the flow, the integration verifies the credentials and reads the M-SERV's identity, so the same controller cannot be added twice. Running the flow again for an already-configured M-SERV updates the stored connection details on the existing entry, which is also how you update a changed address or password.

## Supported functionality

### Sensors

Each recognized sensor channel becomes a sensor entity with the matching device class, unit, and suggested precision. The measurement type comes from the channel's type and interpretation as the M-SERV reports them, so renaming a channel in Ampio Designer changes only the entity's name. The entity is named after the object name from your Ampio configuration, and after the measurement when the object has no name.

Only channels that are configured and visible in Ampio Designer are exposed. The M-SERV marks placeholder and duplicate channels as hidden, and the integration filters those out, so the entity list matches what the Ampio apps show.

## Data updates

The integration is push-based. The M-SERV publishes every object state change to its MQTT broker, and the integration turns each publish into a state update; there is no polling and no refresh interval to configure.

When the connection to the M-SERV drops, all entities become unavailable, and the integration reconnects automatically and restores them once the broker is reachable again. If the M-SERV rejects the stored credentials, the entry shows an authentication error.

## Known limitations

- Changes made in Ampio Designer (added, removed, or reconfigured channels) are picked up when the integration is reloaded.
- Channels with a measurement type the integration does not recognize are not exposed.
- The Ampio cloud is not used. The integration only talks to the local M-SERV broker.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
