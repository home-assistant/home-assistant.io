---
title: Nobø Ecohub
description: Instructions on how to integrate Nobø Ecohub into Home Assistant.
ha_category:
  - Climate
ha_release: '2022.10'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@echoromeo'
  - '@oyvindwe'
ha_domain: nobo_hub
ha_platforms:
  - climate
ha_integration_type: integration
---

Integrates [Nobø Ecohub](https://www.glendimplex.no/produkter/varmestyring/11123610/noboe-hub/c-77/p-330)
into Home Assistant. This integration is not officially supported or endorsed by Glen Dimplex Nordic AS,
and the authors/maintainers are not official partners of Glen Dimplex Nordic AS.

To configure the integration, you need the 3 last digits of the serial number of your hub. These are located
on the back of the hub. If the hub is on a different local network than Home Assistant, you also need the
IP address of the hub.

{% include integrations/config_flow.md %}

## Operation modes

As for now you can see and change operation and preset for zones and set eco/comfort temperatures if you have
a supported thermostat.

The possible operation modes are as follows:

- "Auto" - In this mode, the zone is in the normal setting and preset shows which state the zone is in right now
  (according to calendar setup).
- "Heat" - In this mode the zone in the override setting and in the state selected by preset ("Away", "Eco"
  or "Comfort").

This can be utilized the following ways:

- Changing preset to "Away", "Eco", or "Comfort" will automatically change operation to "Heat".
- Changing preset to none will automatically change operation to "Auto" and update preset.
- Changing operation to "Auto" will automatically update preset.
- Changing operation to "Heat" will set preset to "Comfort".

### No preset "Off"

Nobø heaters does not support preset "Off". This is not a limitation in the integration, but a safety mechanism in the
Nobø  system (maybe they don't want you to accidentally turn off all your heaters and get frozen pipes). "Away"
temperature is fixed to 7°C and cannot be altered. On/off receivers will be off when the zone is in "Away" status.

For more information, see the [Nobø Ecohub manual](https://help.nobo.no/en/user-manual/before-you-start/what-is-a-weekly-program/).
