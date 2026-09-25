---
title: Alpha Bidet Infrared
description: Integration to control Alpha Bidet bidet seats using an infrared transmitter.
ha_category:
  - Button
  - Infrared-controlled
  - Select
ha_release: '2026.11'
ha_iot_class: Assumed State
ha_codeowners:
  - '@eseverson'
ha_domain: alpha_bidet_infrared
ha_config_flow: true
ha_platforms:
  - button
  - select
ha_integration_type: device
ha_quality_scale: bronze
---

The **Alpha Bidet Infrared** {% term integration %} lets you control an Alpha Bidet bidet seat using any infrared transmitter previously configured in Home Assistant. It sends the same infrared commands as the bidet's wireless remote.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the bidet but there is no feedback channel to confirm the current state. The integration therefore uses assumed states, and restores the last water and seat temperature it sent after a restart.

## How you can use the integration

After setup, you can start and stop a wash, run the dryer, and set the water and seat temperature from Home Assistant. For example, you can use an automation to turn the seat heating off while you are away and back on before you get home, or add the wash buttons to a dashboard.

## Prerequisites

{% include integrations/infrared_controlled.md %}

For example, you can use an ESPHome device with an IR LED pointed at your bidet.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared transmitter:
  description: The infrared transmitter entity to use for sending commands. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR transmitter. Each infrared transmitter can control one bidet.
Bidet model:
  description: The Alpha Bidet model to control, which determines the IR command set the integration uses.
{% endconfiguration_basic %}

## Supported devices

The integration supports the following Alpha Bidet models:

- JX2

The JX2's seat shape and color variants (the EW, EB, RW, and RB suffixes) use the same remote and work with the JX2 option. The IR commands were captured from the JX2's own remote, so other Alpha Bidet models are not listed until their codes have been verified. If you want another model supported, please [open an issue on the infrared-protocols repository](https://github.com/home-assistant-libs/infrared-protocols/issues) with captured IR signals from your remote.

## Supported functionality

The **Alpha Bidet Infrared** integration creates one device per bidet, with the following entities.

### Buttons

Each button sends the code for one key on the remote:

- **Rear**: Same as the **REAR** key, which starts the rear wash.
- **Front**: Same as the **FRONT** key, which starts the front wash.
- **Dry**: Same as the **DRY** key, which starts the dryer.
- **Wash and dry**: Same as the **WASH+DRY** key.
- **Easy wash**: Same as the **EASY WASH** key.
- **Stop**: Same as the **STOP** key.
- **Stop (hold)**: Same as holding the **STOP** key for about 5 seconds. The remote sends a separate code for this, so it is its own button.
- **Water/dry up** and **Water/dry down**: Same as the **HI** and **LO** keys. During a wash they raise or lower the water pressure, and during a dry cycle they raise or lower the dryer temperature.
- **Nozzle up** and **Nozzle down**: Move the nozzle one position in either direction.

### Selects

- **Water temperature**: Sets the wash water temperature to **Off**, **Low**, **Medium**, or **High**.
- **Seat temperature**: Sets the seat temperature to **Off**, **Low**, **Medium**, or **High**.

The remote sends these temperatures as absolute levels, so choosing an option sets the bidet to that level directly, whatever it was before.

## Alpha Bidet Infrared automation examples

The buttons and selects can be used in automations like any other entity. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Pre-wash when the bathroom door closes

Start the pre-wash as soon as someone closes the bathroom door, so the bowl is ready by the time it is used.

- **Trigger**: Entity: bathroom door sensor changes from **Open** to **Closed**
- **Action**: Button: press **Stop (hold)**

{% details "YAML example for a pre-wash when the door closes" %}

{% example %}
automation: |
  alias: "Pre-wash the bidet when the bathroom door closes"
  triggers:
    - trigger: state
      entity_id: binary_sensor.bathroom_door
      from: "on"
      to: "off"
  actions:
    - action: button.press
      target:
        entity_id: button.alpha_bidet_jx2_stop_hold
{% endexample %}

{% enddetails %}

### Automation: Turn the seat heating off overnight

Save power by turning the seat heating off at night and back on in the morning.

- **Trigger**: Time: 23:00, and Time: 06:00
- **Action**: Select: set **Seat temperature** to **Off** at night and **Medium** in the morning

{% details "YAML example for turning the seat heating off overnight" %}

{% example %}
automation: |
  alias: "Bidet seat heating off overnight"
  triggers:
    - trigger: time
      at: "23:00:00"
      id: night
    - trigger: time
      at: "06:00:00"
      id: morning
  actions:
    - action: select.select_option
      target:
        entity_id: select.alpha_bidet_jx2_seat_temperature
      data:
        option: "{{ 'off' if trigger.id == 'night' else 'medium' }}"
{% endexample %}

{% enddetails %}

## Known limitations

- The integration uses assumed state, meaning Home Assistant cannot read the actual state of the bidet. The water and seat temperature selects show the last level Home Assistant sent.
- Changes made with the physical remote or the bidet's control panel are not tracked, so the selects can drift from the bidet's real settings. Choosing an option again brings them back in sync.
- Water pressure, dryer temperature, and nozzle position can only be stepped up or down, because the remote sends those keys as relative steps. Home Assistant cannot set them to a specific level or tell which level is active.
- Functions that are only on the bidet's control panel, such as power, the nightlight, power saving, quiet mode, and nozzle cleaning, have no infrared code and cannot be controlled.
- The infrared transmitter needs a clear line of sight to the bidet's receiver. A blocked or missed command is not reported.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
