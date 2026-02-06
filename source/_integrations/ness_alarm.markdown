---
title: Ness Alarm
description: Instructions on how to integrate a Ness D8x/D16x alarm system with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
ha_release: 0.85
ha_iot_class: Local Push
ha_codeowners:
  - '@nickw444'
ha_domain: ness_alarm
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: silver
ha_config_flow: true
---

The **Ness Alarm** {% term integration %} allows Home Assistant users who own a Ness D8x/D16x alarm system to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm is accomplished through an IP232 module that must be connected to the alarm.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone statuses
- Alarm control panel: Reports on alarm status, and can be used to arm/disarm the system

The module communicates via the [Ness D8x/D16x ASCII protocol](https://ia802202.us.archive.org/16/items/ness-d-8x-d-16x-serial-interface.-ascii-protocol/Ness%20D8x%20D16x%20Serial%20Interface.%20ASCII%20Protocol.pdf).

{% include integrations/config_flow.md %}

## Configuration

### UI Configuration (Recommended)

To add the Ness Alarm integration to your Home Assistant instance, use this My button:

{% my config_flow_start badge domain=page.ha_domain %}

{% details "Manual configuration steps" %}

If the above My button doesn't work, you can also perform the following steps manually:

1. Browse to your Home Assistant instance.
2. Go to **Settings** > **Devices & Services**.
3. In the bottom right corner, select the **Add Integration** button.
4. From the list, select **Ness Alarm**.
5. Follow the instructions on screen to complete the setup:
   - Enter the **Host** (IP address or hostname of your IP232 module)
   - Enter the **Port** (typically 1992 or 2401)
   - Optionally enable **Infer arming state** if you have a panel version <v5.8

{% enddetails %}

#### Managing Zones

After setting up the integration, you can add zones through the UI:

1. Go to **Settings** > **Devices & Services**.
2. Find the **Ness Alarm** integration and select **Configure**.
3. Select **Add zone** to add a new zone.
4. Enter the zone number (1-32) and select the zone type (device class).
5. The zone will appear as a separate device in Home Assistant.

You can reconfigure a zone's device class at any time by selecting the zone's configure button.

### YAML Configuration (Legacy)

{% include integrations/restart_ha_after_config_inclusion.md %}

Alternatively, you can configure the integration via YAML. Existing YAML configurations will be automatically imported to the UI on the next Home Assistant restart.

```yaml
# Example configuration.yaml entry
ness_alarm:
  host: alarm.local
  port: 2401
  infer_arming_state: false
  zones:
    - name: Garage
      id: 1
    - name: Storeroom
      id: 2
    - name: Kitchen
      id: 3
    - name: Front Entrance
      id: 4
    - name: Front Door
      id: 5
      type: door
