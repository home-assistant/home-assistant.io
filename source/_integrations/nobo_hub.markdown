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
  - select
  - sensor
ha_integration_type: hub
---

Integrates [Nobø Ecohub](https://www.glendimplex.no/produkter/varmestyring/11123610/noboe-hub/c-77/p-330)
into Home Assistant. This integration is not officially supported or endorsed by Glen Dimplex Nordic AS,
and the authors/maintainers are not official partners of Glen Dimplex Nordic AS.

To configure the integration, you need the 3 last digits of the serial number of your hub. The serial number is located
on the back of the hub. If the hub is on a different network than Home Assistant (i.e., IoT VLAN or another routable network from Home Assistant), you also need to provide the IP address of the hub.

{% include integrations/config_flow.md %}

# Heaters

Each zone containing floor or wall mounted heaters is represented as an HVAC entity. Adding and removing zones
and heaters must be done using the Nobø Energy mobile app. 

## Operation modes

Currently, you can see and change operation and preset for zones and set eco/comfort temperatures if you have
a thermostat that supports remote control of the temperature settings.

The possible operation modes are as follows:

- "Auto" - In this mode, the zone is in the default setting and preset shows which state the zone is in right now
  (according to calendar setup).
- "Heat" - In this mode the zone is overridden and in the state selected by the preset ("Away", "Eco"
  or "Comfort").

This can be utilized the following ways:

- Changing preset to "Away", "Eco", or "Comfort" will automatically change operation mode to "Heat".
- Changing preset to none will automatically change operation to "Auto" and update preset.
- Changing operation to "Auto" will automatically update preset.
- Changing operation to "Heat" will set preset to "Comfort".

### Preset override duration

By default, all overrides (when operation is not in "Auto" mode) are constant. It is possible to change this
to let overrides end when the week profile changes next (same as duration "Now" in the Nobø Energy mobile app)
in the integration configuration.

### Week profiles

The week profiles are retrieved from the hub. It is possible to change the current week profile for a zone
using a selector. Week profiles must be created and edited using the Nobø Energy mobile app.

### No preset "Off"

Nobø heaters do not support preset "Off". This is not a limitation of the integration, but a safety mechanism in the
Nobø system (perhaps related to frozen pipes due to frost in Nordic regions). 
"Away" temperature is fixed to 7°C and cannot be altered. On/off receivers will be off when the zone is in "Away" status.

To turn heaters completely off, follow these steps (this is a workaround solution): 
1. In the Nobø Energy mobile app, create a week profile.
    - In this profile, set all days to state off. 
2. To turn a zone off, select this week profile for the zone. 
3. To turn a zone on again, switch to the normal week profile for the zone.

For more information, see the [Nobø Ecohub manual](https://help.nobo.no/en/user-manual/before-you-start/what-is-a-weekly-program/).

## Global override

To override all zones to a given preset (except the zones configured to not respect global override), use the global
override selector. Global override duration respects the same configuration as preset override duration.  

# Nobø Switch

Each Nobø Switch (SW4) is represented as a temperature sensor. If a switch is linked to a zone, the temperature is
also available as the current temperature of the HVAC entity.
