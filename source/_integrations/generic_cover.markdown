---
title: Generic Cover
description: Instructions on how to integrate Generic Cover into Home Assistant.
ha_category:
  - Cover
ha_release: 2025.1
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_codeowners:
  - '@bsunderhus'
ha_domain: generic_cover
ha_platforms:
  - cover
ha_integration_type: device
ha_config_flow: true
---

The **Generic Cover** {% term integration %} allows you to create {% term cover %} {% term entities %} that are controlled by two separate switches: one for opening/up movement and one for closing/down movement. This is particularly useful for DIY covers, blinds, or shutters that use relay switches for directional control.

## Supported devices

The Generic Cover integration works with any covers that use any of the following elements:

- Two separate switches for directional control (open/close or up/down)
- Relay-controlled motorized blinds, shutters, or curtains
- DIY cover solutions with motor controllers
- Garage doors with separate open/close controls
- Projector screens with directional switches

## Prerequisites

Before setting up the Generic Cover integration, you need the following:

1. Two working switch {% term entities %} in Home Assistant that control your cover's movement
2. Knowledge of how long it takes for your cover to complete a full open or close cycle
3. If using tilt functionality, knowledge of the tilt cycle duration

{% include integrations/config_flow.md %}

## Configuration options

{% configuration_basic %}
Name:
  description: A friendly name for your cover.
Open switch entity:
  description: The switch entity used to open/raise the cover.
Close switch entity:
  description: The switch entity used to close/lower the cover.
Duration:
  description: Time in seconds for a complete open or close cycle.
Tilt duration:
  description: Time in seconds for a complete tilt cycle. Leave empty if tilt functionality is not needed.
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Generic Cover** integration provides the following {% term entities %}.

#### Covers

- **Generic Cover**
  - **Description**: A cover entity that can be opened, closed, and positioned using two switches.
  - **Features**: Open, close, stop, position control, and optional tilt support.
  - **Position tracking**: Automatically tracks cover position based on movement duration.
  - **State restoration**: Position and tilt state are restored after Home Assistant restart.

## Examples

### Basic cover control

```yaml
automations:
  - alias: "Open covers at sunrise"
    triggers:
      - trigger: sun
        event: sunrise
    actions:
      - action: cover.open_cover
        target:
          entity_id: cover.living_room_blinds

  - alias: "Close covers at sunset"
    triggers:
      - trigger: sun
        event: sunset
    actions:
      - action: cover.close_cover
        target:
          entity_id: cover.living_room_blinds
```

### Position-based control

```yaml
automations:
  - alias: "Set cover to 50% at midday"
    triggers:
      - trigger: time
        at: "12:00:00"
    actions:
      - action: cover.set_cover_position
        target:
          entity_id: cover.living_room_blinds
        data:
          position: 50
```

### Use case examples

#### Motorized blinds

Control motorized blinds with separate up/down relay switches:

- **Open switch**: Connected to "up" relay
- **Close switch**: Connected to "down" relay
- **Duration**: Time for blinds to go from fully closed to fully open

#### Garage door

Control a garage door with directional switches:

- **Open switch**: Garage door open button/relay
- **Close switch**: Garage door close button/relay
- **Duration**: Time for door to fully open or close

#### Projector screen

Control a motorized projector screen:

- **Open switch**: Screen retract switch
- **Close switch**: Screen extend switch
- **Duration**: Time for full extension/retraction cycle

## Data updates

The Generic Cover integration operates using:

- **Switch state monitoring**: Continuously monitors the state of both open and close switches
- **Timer-based position calculation**: Updates position every second during movement
- **Event-driven updates**: Position changes are calculated based on switch activation events
- **No polling**: The integration does not {% term polling poll %} external devices, relying on switch state changes

## Known limitations

- **Position accuracy depends on timing**: Position tracking relies on consistent movement timing and may drift over time.
- **No position feedback**: The integration cannot verify the actual cover position. It only estimates based on timing.
- **Manual recalibration needed**: Periodic manual full open/close cycles may be required to maintain accuracy.
- **Switch dependency**: Proper operation requires reliable switch {% term entities %} that accurately report state changes.

## Troubleshooting

### Symptom: Cover position becomes inaccurate over time

#### Description

The cover's reported position in Home Assistant doesn't match its actual physical position.

#### Resolution

1. Verify your duration settings match the actual movement time by timing a full open/close cycle.
2. Manually open or close the cover fully to allow the integration to recalibrate.
3. Consider adding physical limit switches or position sensors for better accuracy.
4. Check if the cover movement speed is consistent. Variable speeds can cause drift.

### Symptom: Switches activate unexpectedly

#### Description

The open or close switches turn on without user interaction, causing unexpected cover movement.

#### Resolution

1. Check switch entity states in **{% my developer_tools title="Developer Tools" %}** > **States**.
2. Ensure switches are properly configured as momentary or toggle based on your hardware.
3. Review {% term automations %} and scripts that might be triggering the switches.
4. Check for interference or electrical issues with the switch hardware.

### Symptom: Position doesn't update during movement

#### Description

The cover position remains unchanged even when the cover is moving.

#### Resolution

1. Verify that both switch {% term entities %} report state changes correctly in **{% my developer_tools title="Developer Tools" %}**.
2. Check that the duration setting is appropriate (not too short or too long).
3. Review Home Assistant logs for error messages under **{% my logs title="Settings > System > Logs" %}**.
4. Ensure the switches actually control the cover movement.

### Symptom: Cover operates in the wrong direction

#### Description

Pressing **open** closes the cover or vice versa.

#### Resolution

1. Go to **{% my integrations title="Settings > Devices & Services" %}**.
2. Find your Generic Cover integration and select **Configure**.
3. Swap the open and close switch entity assignments.
4. Test the cover operation after reconfiguring.

## Removing the integration

{% include integrations/remove_device_service.md %}

After removing the integration, the cover {% term entity %} will no longer be available in Home Assistant. Any {% term automations %} or scripts referencing the cover will need to be updated or removed.
