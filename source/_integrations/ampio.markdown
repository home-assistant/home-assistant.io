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

Each Ampio object gets its own device, named as in the Ampio app. That device sits under the device of its physical module, and each module device links to the M-SERV hub device. The M-SERV's own objects sit directly under the hub. The module devices are the same for both Ampio account types. With an administrator account they carry the module name, model, serial, and firmware version from the M-SERV's module catalog. With a standard account they are named after the module's bus address until you rename them. A module gets a device only when at least one of its objects becomes an entity.

Objects belonging to output modules (relays, dimmers, blinds, RGBW, DALI) are not exposed as entities.

## Prerequisites

- The Ampio M-SERV must be reachable from the Home Assistant host on its MQTT port (`1883`).
- You need the credentials of an Ampio account on the M-SERV. A standard user account is recommended. An administrator account, which signs in as `admin`, also provides per-module device information and faster state updates.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "Hostname or IP address of the Ampio server (M-SERV). Defaults to `ampio.local`."
Username:
  description: "Your Ampio account username. The administrator account signs in as `admin`."
Password:
  description: "Your Ampio account password."
{% endconfiguration_basic %}

During the flow, the integration checks the credentials, reads the M-SERV's identity, and checks that the username matches the account type that the M-SERV reports. Home Assistant supports one Ampio M-SERV. To change the address, the account, or the password, delete the integration and add it again. If you add it again within 30 days, Home Assistant restores your entities with their entity IDs and the names you gave them.

## Replacing the M-SERV

If the configured address answers as a different M-SERV, the integration does not set up and shows an error. This also happens after you replace the M-SERV hardware. To use the new M-SERV:

1. Restore your Ampio Designer project onto the new M-SERV.
2. Delete the Ampio integration in Home Assistant.
3. Add the Ampio integration again with the address of the new M-SERV.

If you add the integration again within 30 days, Home Assistant restores your entities with their entity IDs and the names you gave them.

## Supported functionality

### Sensors

Each recognized sensor channel becomes a sensor entity with the matching device class, unit, and suggested precision. The measurement type comes from the channel's type and interpretation as the M-SERV reports them, so renaming a channel in Ampio Designer changes only the entity's name. The entity takes its name from the object's device. An object without a name gets a device named `Object <id>`, and its entity is named after the measurement.

Only channels that are configured and visible in Ampio Designer are exposed. The M-SERV marks placeholder and duplicate channels as hidden, and the integration filters those out, so the entity list matches what the Ampio apps show.

## Data updates

The integration is push-based. The M-SERV publishes every object state change to its MQTT broker, and the integration turns each publish into a state update, so there is no polling and no refresh interval to configure.

When the connection to the M-SERV drops, all entities become unavailable, and the integration reconnects automatically and restores them once the broker is reachable again. If the M-SERV rejects the stored credentials, the entry shows an authentication error.

## Known limitations

- Changes made in Ampio Designer (added, removed, or reconfigured channels) are picked up when the integration is reloaded.
- Channels with a measurement type the integration does not recognize are not exposed.
- The Ampio cloud is not used. The integration only talks to the local M-SERV broker.
- If you move an object to another module in Ampio Designer, its device stays under the old module.
- If Ampio Designer leaves an object without a bus address, the integration skips that object and logs its ID. The other objects load normally.
- Home Assistant supports one Ampio M-SERV.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
