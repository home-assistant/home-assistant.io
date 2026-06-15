---
title: PowerShades
description: Instructions on how to integrate PowerShades motorized shades with Home Assistant.
ha_category:
  - Button
  - Cover
  - Sensor
ha_release: 2026.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@vemboy200'
ha_domain: powershades
ha_platforms:
  - button
  - cover
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: platinum
ha_dhcp: true
---

The **PowerShades** {% term integration %} allows you to control [PowerShades](https://powershades.com) motorized shades. It communicates with the shade controller directly over your local network using UDP, so no cloud connection is required.

This integration is tested with PoE and Wi-Fi PowerShades controllers. Support for the RF hub may be limited or non-existent. If you have RF shades, it is recommended to use a [Bond](/integrations/bond/) bridge to connect them to Home Assistant instead. If you already have a PowerShades RF hub and would like to help test this integration with it, please [open an issue](https://github.com/home-assistant/core/issues).

## Supported devices

Any PoE or Wi-Fi PowerShades shade with UDP communication enabled, on the same local network as Home Assistant.

## Prerequisites

It is currently unknown whether UDP communication is enabled by default on every PowerShades controller. If discovery doesn't find your shade, and entering its IP address manually results in a "cannot connect" error, you may need to enable UDP on the device itself.

### Finding your shade's IP address

Discovery will usually find shades on your network automatically. If you need to enter an IP address manually, you can find it in one of these ways:

- **Via the PowerShades app (recommended)**: Open the official PowerShades app, navigate to your shade, select **Enable Configuration**, and confirm the prompt. The assigned IP address is shown further down the screen.
- **Via your router**: Check your router's list of connected devices for one made by "Wideband Labs LLC" — this is your PowerShades device.

{% include integrations/config_flow.md %}

If your shade's IP address changes later (for example, after a DHCP reassignment), open the integration entry and select **Reconfigure** to update it without losing your entities.

## Supported functionality

### Cover

Each shade is represented as a cover entity, which supports:

- **Open** and **close** the shade fully.
- **Set position**, to move the shade to a specific position between 0% and 100%.
- **Stop**, to stop the shade while it is moving.

### Buttons

In addition to the cover entity, each shade gets the following buttons:

- **Toggle shade**: opens or closes the shade depending on its current position, or stops it if it is moving.
- **Identify** (diagnostic entity): makes the shade's motor wiggle, so you can tell which physical shade an entity corresponds to.
- **Jog up** / **Jog down**, **Step up** / **Step down**, **Set upper limit** / **Set lower limit**, and **Clear limits** (configuration entity): used to calibrate the shade's travel limits. A typical workflow is to jog the shade close to the desired position, use step to fine-tune it, and then set the limit.

### Sensors

Battery percentage and battery voltage are available as diagnostic entity sensors. These are disabled by default and can be enabled from the device page.

## Actions

In addition to the standard cover actions (`cover.open_cover`, `cover.close_cover`, `cover.stop_cover`, and `cover.set_cover_position`), the PowerShades integration provides the following actions. All actions target a PowerShades cover entity.

| Action | Description |
| ------ | ----------- |
| `powershades.toggle_shade` | Toggles the shade between open and closed positions (stops it if moving). |
| `powershades.jog_up` | Moves the shade up continuously until it reaches a limit or is stopped. Useful when setting limits. |
| `powershades.jog_down` | Moves the shade down continuously until it reaches a limit or is stopped. Useful when setting limits. |
| `powershades.step_up` | Moves the motor up one step, for trimming limits. |
| `powershades.step_down` | Moves the motor down one step, for trimming limits. |
| `powershades.set_upper_limit` | Sets the upper limit (fully open position) for a PowerShades device. |
| `powershades.set_lower_limit` | Sets the lower limit (fully closed position) for a PowerShades device. |
| `powershades.clear_limits` | Clears both the upper and lower limits for a PowerShades device. |
| `powershades.set_shade_name` | Renames a PoE shade on the device itself. The Home Assistant device name is updated to match. |

### Action: Set shade name

The `powershades.set_shade_name` action takes one additional field:

| Data attribute | Optional | Description |
| --------------- | -------- | ----------- |
| `name` | No | The new shade name, 1-50 ASCII characters. |

## Automation examples

Open a shade in the morning:

{% details "YAML example for opening a shade in the morning" %}

{% example %}
automation: |
  alias: "Open bedroom shade"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.bedroom_shade
  mode: single
{% endexample %}

{% enddetails %}

Close shades at dusk:

{% details "YAML example for closing shades at dusk" %}

{% example %}
automation: |
  alias: "Close shades at dusk"
  triggers:
    - trigger: state
      entity_id:
        - sensor.sun_next_dusk
  conditions:
    - condition: state
      entity_id: cover.bedroom_shade
      state: "open"
  actions:
    - action: cover.close_cover
      target:
        entity_id:
          - cover.bedroom_shade
  mode: single
{% endexample %}

{% enddetails %}

## Data updates

The shade pushes its status to Home Assistant in real time whenever Home Assistant is the one controlling it (the "UDP master"). On top of that, Home Assistant {% term polling polls %} the shade every 10 seconds (every 5 seconds while the position is unknown), so changes made by another controller — such as the PowerShades app or a Control4 system — are also picked up.

The integration's `iot_class` is `local_push`, but its behavior has elements of all three of the relevant IoT class categories:

- **Local push**: while Home Assistant is the "UDP master", the shade pushes its status roughly every 10 seconds on its own, and also sends an extra push the instant it reaches its target position — so Home Assistant learns a move finished without waiting for the next poll.
- **Local polling**: the 10-second poll is what catches position changes made by another controller. Without it, those changes would go unnoticed until the next Home Assistant-issued command.
- **Assumed state**: the shade only ever reports a raw position (0-100%). Home Assistant always infers whether that means opening, closing, open, or closed from how the position changes over time, even for moves Home Assistant itself started.

All communication is local, and data does not leave your network.

## Known limitations

- PowerShades devices send replies and asynchronous move feedback only to the **last controller that sent them a command** (the "UDP master"). Avoid running PowerShades Config.NET or another driver at the same time as Home Assistant — control still works, but live position feedback may intermittently lag until the next poll.
- This can also affect other hubs that communicate over UDP (for example, Control4) and rely solely on push data — they may end up with an outdated view of the shade's state.
- The shade's reported state (for example, opening, closing, opened, or closed) is inferred by Home Assistant and may not always be accurate. See [Data updates](#data-updates) for details.
- If a shade is moved by another controller, Home Assistant does not know that controller's target position. It assumes the shade is heading toward fully open (100%) or fully closed (0%). If the other controller stops the shade partway, Home Assistant continues showing opening/closing for up to ~15 seconds until it detects the position has stopped changing, then falls back to open or closed.
- The shade must be on the same network subnet as Home Assistant, or UDP broadcast traffic must be routed between subnets.
- Only PoE and Wi-Fi shades are fully supported. For RF PowerShades, use a [Bond](/integrations/bond/) bridge.

## Troubleshooting

### Cannot connect, or the cover entity is unavailable

This means Home Assistant cannot communicate with the shade. Check the following:

- The shade is powered on and connected to your network.
- Home Assistant can reach UDP port 42 on the shade, and UDP broadcasts are routed between subnets if Home Assistant and the shade are on different ones.
- The IP address entered is correct and not already used by another config entry. If the shade's IP address has changed, open its integration entry and select **Reconfigure** to update it.

### Enabling debug logging

To get more detailed logs:

- Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the PowerShades integration.
- Select the three-dot {% icon "mdi:dots-vertical" %} menu in the top right corner and select **Enable debug logging**.
- Reproduce the issue, then return to the same menu and select **Disable debug logging** to download the logs.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
