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
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
ha_dhcp: true
related:
  - docs: /docs/organizing/areas/#creating-an-area
    title: Areas in Home Assistant
  - docs: /docs/automation/
    title: Automations
---

The **Nobø Ecohub** {% term integration %} connects Home Assistant to your [Nobø Ecohub](https://en.nobo.no/product/nobo-hub), a Norwegian heating controller from Glen Dimplex Nordic AS. The hub manages electric panel heaters, floor heating, and on/off receivers grouped into zones, and lets you follow weekly heating schedules with eco, comfort, and away setpoints.

With this integration, you can control your heating zones, switch between week profiles, and read temperatures from any connected Nobø Switch—all locally over your network, without depending on a cloud service.

This integration is not officially supported or endorsed by Glen Dimplex Nordic AS, and the authors and maintainers are not official partners of Glen Dimplex Nordic AS.

## How you can use this integration

The Nobø Ecohub is mainly used in homes and cabins with electric heating in the Nordic region. Typical things you can do with this integration are:

- Control heating zones directly from your dashboard, with the same eco, comfort, and away presets you have in the Nobø Energy mobile app.
- Switch the active week profile for a zone from an automation. For example, switch a cabin to its weekend profile when you leave for a trip on Friday.
- Trigger a global override (such as away or eco) when everyone leaves home, and clear it again when someone returns.
- Use the temperature reading from a Nobø Switch as a trigger in your automations, or display it on a dashboard alongside other room sensors.
- Coordinate the Nobø heaters with other heat sources, such as a heat pump, by switching presets or week profiles based on outdoor temperature, electricity price, or solar production.
- Turn heaters fully off in a zone, for example to switch off cabin heating outside of the heating season. See [Turning a zone fully off](#turning-a-zone-fully-off) for the recommended approach.

## Supported devices

The integration is built around the Nobø Ecohub and supports the devices that the hub itself manages:

- **Nobø Ecohub**: The bridge between your Nobø system and Home Assistant. Each zone you have configured in the hub is exposed in Home Assistant.
- **Heaters and on/off receivers**: Floor and wall-mounted heaters, and any on/off receivers in a zone, are controlled through their zone's climate entity. Heaters with a built-in thermostat that supports remote control let you change the zone's eco and comfort temperatures from Home Assistant.
- **Nobø Switch (SW4)**: Exposed as a temperature {% term sensor %}. If the switch is linked to a zone in the Nobø Energy app, its temperature is also shown as the current temperature of that zone.

Individual heaters, switches, and zones must be added and configured using the Nobø Energy mobile app. Home Assistant reads whatever the hub already knows about.

Each zone is added as a device in Home Assistant, and its zone name is offered as a suggested [area](/docs/organizing/areas/#creating-an-area). You can accept the suggestion to group the zone's entities with the rest of that room, or pick a different area.

## Prerequisites

Before adding the integration, make sure the following is in place:

- Your Nobø Ecohub is powered up and connected to your network.
- Your zones, heaters, and any Nobø Switches are set up in the Nobø Energy mobile app, and you can control them from the app.
- You know the last 3 digits of your hub's serial number. The full 12-digit serial number is printed on a label on the back of the hub.
- If your hub is on a different network than Home Assistant, for example on an IoT VLAN, make sure that network is routable from Home Assistant and that you know the hub's IP address.

{% include integrations/config_flow.md %}

In most cases, the hub is discovered automatically on your network, and you only need to enter the 3-digit serial number suffix. If the hub is not discovered, choose **Manual** in the device list and enter the full 12-digit serial number together with the hub's IP address.

{% configuration_basic %}
Discovered hubs:
  description: "Select the Nobø Ecohub discovered on your local network, or choose **Manual** to enter the details by hand."
Serial number suffix (3 digits):
  description: "The last 3 digits of the serial number printed on the back of your Nobø Ecohub. Used to confirm that you own the discovered hub."
Serial number (12 digits):
  description: "The full 12-digit serial number printed on the back of your Nobø Ecohub. Only required when adding the hub manually."
IP address:
  description: "The IP address of your Nobø Ecohub. Only required when adding the hub manually, for example when the hub is on a different network than Home Assistant."
{% endconfiguration_basic %}

## Reconfiguration

You can update the IP address without removing and re-adding the integration.

This is useful when:

- The hub has moved to a new network and the stored IP address no longer reaches it.
- You want to switch between internal and external addresses (for example, when the hub is reachable on multiple subnets).

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **Nobø Ecohub** integration, select the three dots menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Enter the new IP address.
4. Select **Submit** to save.

## Configuration options

The integration provides one configuration option that you can change later under {% my integrations title="**Settings** > **Devices & services**" %} by selecting **Configure** on the Nobø Ecohub entry:

{% configuration_basic %}
Override type:
  description: "Controls how long overrides stay active when you change the preset of a zone or trigger a global override. Select **Constant** to keep the override until you clear it manually, or **Now** to end the override at the next week profile change (the same as duration **Now** in the Nobø Energy app). The default is **Constant**."
{% endconfiguration_basic %}

## Supported functionality

The integration creates entities for every zone in the hub, a global override selector for the hub itself, and a temperature sensor for every Nobø Switch and thermostat that reports a temperature. Each zone also gets a switch to exclude it from the global override.

### Climate entities

Each zone in your hub is exposed as a climate entity. You can use it to set the HVAC mode, change the preset, and adjust the eco and comfort target temperatures.

- **HVAC modes**:
  - **Auto**: The zone follows the active week profile. The preset reflects the state the zone is currently in.
  - **Heat**: The zone is overridden and stays in the selected preset (away, eco, or comfort) until the override ends.
  - **Off**: Shown only when the current week profile sets the zone to off. You cannot select this mode manually. See [Turning a zone fully off](#turning-a-zone-fully-off).
- **Presets**: **None**, **Comfort**, **Eco**, and **Away**. In **Away**, the setpoint is fixed at 7°C for frost protection and cannot be changed, and any on/off receivers in the zone are switched off.
- **Target temperatures**: Eco (low) and comfort (high) setpoints, between 7°C and 30°C, in steps of 1°C. You can change these setpoints on any zone, but a new value only takes effect if the zone contains a thermostat that supports remote control of its eco or comfort temperature.

The HVAC mode and preset are linked, so a change to one updates the other:

- Selecting a preset of **Away**, **Eco**, or **Comfort** switches the HVAC mode to **Heat**.
- Selecting preset **None** switches the HVAC mode to **Auto** and updates the preset to match the active week profile.
- Selecting HVAC mode **Auto** clears the override and updates the preset to match the active week profile.
- Selecting HVAC mode **Heat** sets the preset to **Comfort**.

### Select entities

- **Week profile**: Per zone. Lets you change which week profile is active. Week profiles must be created and edited in the Nobø Energy mobile app. The selector lists the profiles the hub currently knows about.
- **Global override**: One per hub. Overrides every zone to the selected preset, except zones that have **Disable global overrides** turned on. The available options are **None**, **Away**, **Eco**, and **Comfort**. The global override uses the same override type as preset changes.

### Sensor entities

- **Temperature**: One per device that reports a temperature, such as a Nobø Switch (SW4) or a thermostat with a temperature sensor. The reading is in degrees Celsius. If the device is linked to a zone, the same temperature is also shown as the current temperature on that zone's climate entity.

### Switch entities

- **Disable global overrides**: Per zone. This configuration entity controls whether the zone reacts to the hub's **Global override** selector. When turned on, the zone ignores the global override and keeps following its own week profile and presets; when off, the zone follows the global override. This mirrors the **Disable global overrides** setting for the zone in the Nobø Energy mobile app.

## Examples

A few practical ways to use the integration:

- Activate away mode when nobody is home: use a state change on your home and away group or a person {% term entity %} as the trigger, and have the automation select **Away** on the global override selector. When someone returns, change the global override back to **None** to follow the normal week profiles again.
- Preheat before arrival: when you start the drive to a cabin, set the relevant zones to preset **Comfort**. On arrival, switch them back to preset **None** to let the week profile take over again.
- Pause heating when the heat pump can carry the load: when your heat pump is producing enough heat, switch the Nobø zones to preset **Eco** to avoid double-heating. Switch back to **None** when the heat pump stops.
- Show room temperatures on a dashboard: add the temperature sensors from your Nobø Switches to a dashboard alongside your other room sensors to keep an eye on every zone at a glance.

### Following presence with the global override

This pair of automations sets the global override to **Away** when everyone leaves home, and clears it again when the first person returns so every zone goes back to its normal week profile. Replace `group.family` with your own presence group or person {% term entity %}, and `select.my_eco_hub_global_override` with the name of your hub's global override selector.

{% example %}
automation: |
  - alias: "Nobø: set away when everyone leaves"
    triggers:
      - trigger: state
        entity_id: group.family
        from: "home"
    actions:
      - action: select.select_option
        target:
          entity_id: select.my_eco_hub_global_override
        data:
          option: "away"
  - alias: "Nobø: clear away when someone comes home"
    triggers:
      - trigger: state
        entity_id: group.family
        to: "home"
    actions:
      - action: select.select_option
        target:
          entity_id: select.my_eco_hub_global_override
        data:
          option: "none"
{% endexample %}

### Turning a zone fully off

The Nobø system does not expose an off preset, because the away preset doubles as frost protection and is fixed at 7°C. To turn a zone fully off, for example outside of the heating season or while a cabin is empty for a longer time, use a dedicated week profile:

1. In the Nobø Energy mobile app, create a new week profile and set every day to state off.
2. To turn a zone off, switch that zone to the new week profile. You can do this from Home Assistant by changing the **Week profile** select entity for the zone.
3. To turn the zone on again, switch back to your normal week profile.

To automate this, use a `select.select_option` action on the zone's week profile selector. Replace `select.cabin_week_profile` with the week profile selector for your zone, and `Off` with the exact name of the profile you created in the Nobø Energy app.

{% example %}
action: |
  - action: select.select_option
    target:
      entity_id: select.cabin_week_profile
    data:
      option: "Off"
{% endexample %}

The climate entity for the zone shows HVAC mode **Off** while the active week profile keeps the zone off. On/off receivers in the zone are switched off, and heaters with their own thermostat are no longer driven by the hub.

For more background on week profiles, see the [Nobø Ecohub manual](https://help.nobo.no/en/user-manual/before-you-start/what-is-a-weekly-program/).

## Data updates

The integration uses a local push connection to your Nobø Ecohub. When you set up the integration, Home Assistant opens a persistent TCP connection to the hub and registers for live updates. Any change made on the hub—for example, when a week profile changes state, when the temperature reported by a Nobø Switch changes, or when someone presses a Nobø Switch—is pushed to Home Assistant within seconds.

The current preset of a zone can also change on its own, when the active week profile moves from one scheduled state to the next. The hub does not send an event for this. To keep the zone's preset accurate, the integration re-checks the active week profile against the clock every 60 seconds. This check is local and does not add any traffic to the hub.

If the connection to the hub is lost, for example because the hub's IP address has changed, the integration tries to rediscover the hub on your local network using a UDP broadcast and reconnects automatically when it finds the hub again. This rediscovery only works if Home Assistant and the hub are on the same network segment.

## Known limitations

The integration cannot manage the configuration of your Nobø system. The following must be done in the Nobø Energy mobile app:

- Registering or deregistering Nobø devices: Heaters, on/off receivers, and Nobø Switches have to be paired with and removed from the hub in the Nobø Energy app.
- Creating or deleting zones: Zones, including their name and which devices belong to them, are defined in the Nobø Energy app.
- Creating, updating, or deleting week profiles: Week profile schedules can only be edited in the Nobø Energy app. In Home Assistant, you can only select which existing profile is active for a zone.

## Troubleshooting

### Setup fails with "Failed to connect - check serial number"

The hub was reachable on the network, but it rejected the serial number you entered. Re-check the last 3 digits of the serial number on the label on the back of the hub and try again. If you set up the hub manually, also check that the full 12-digit serial number matches.

### Setup fails with "Failed to connect - check IP address"

Home Assistant could not open a connection to the IP address you entered. Make sure that:

- The hub is powered up and connected to your network.
- The IP address is correct. To confirm the hub is reachable, check {% my logs title="**Settings** > **System** > **Logs**" %} for connection errors, or ping the hub's IP address from another device on your network.
- No firewall rule blocks the traffic between Home Assistant and the hub, especially if the hub is on a different VLAN.

### The hub becomes unavailable after its IP address changes

The integration tries to rediscover the hub automatically when it cannot reach the stored IP address. This uses a UDP broadcast that only works on the same network segment.

- If Home Assistant and the hub are on the same network, the integration usually picks up the new IP address on its own.
- If the hub is on a different network, the rediscovery does not reach it. In that case, update the stored address using [Reconfiguration](#reconfiguration).

To avoid this issue, give the hub a static IP address or a DHCP reservation on your router.

### Setting a target temperature does not seem to do anything

The eco and comfort setpoints always update, but they only take effect on zones that include a thermostat that supports remote control of the temperature setpoints. Zones that contain only on/off receivers or heaters without this support keep following their own temperature settings and ignore the new setpoint.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
