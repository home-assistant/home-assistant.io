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

The Generic Cover integration allows you to create cover entities that are controlled by two separate switches - one for opening/up movement and one for closing/down movement. This is particularly useful for DIY covers, blinds, or shutters that use relay switches for directional control.

{% include integrations/config_flow.md %}

## Features

- **Two-switch control**: Separate switches for open and close operations
- **Position tracking**: Automatically tracks cover position based on movement duration
- **Tilt support**: Optional tilt functionality with separate tilt duration configuration
- **State restoration**: Position and tilt state are restored after Home Assistant restart
- **Safety interlocking**: Prevents simultaneous open and close operations
- **Configurable timing**: Set custom durations for full open/close and tilt cycles

## Configuration

The Generic Cover integration can be configured through the UI by going to **{% my integrations title="Settings > Devices & Services" %}** and clicking the **Add Integration** button, then searching for "Generic Cover".

### Configuration Parameters

- **Name**: A friendly name for your cover
- **Open switch entity**: The switch entity used to open/raise the cover
- **Close switch entity**: The switch entity used to close/lower the cover  
- **Duration**: Time in seconds for a complete open or close cycle (default: 30 seconds)
- **Tilt duration**: Time in seconds for a complete tilt cycle (optional, default: 5 seconds)

## How It Works

The integration operates by:

1. **Monitoring switch states**: Tracks when open/close switches are activated
2. **Calculating positions**: Uses timing to estimate current position (0-100%)
3. **Preventing conflicts**: Ensures only one switch can be active at a time
4. **Tracking progress**: Updates position continuously during movement

### Position Calculation

- Position 0% = fully closed
- Position 100% = fully open
- Position updates every second during movement
- Final position is based on movement duration vs. configured cycle time

### Tilt Functionality

When tilt duration is configured:

- Tilt position is calculated as a percentage of cover position
- Each tilt step represents a small increment of the total cover movement
- Tilt commands move the cover in small increments for precise positioning

## Example Use Cases

### Motorized Blinds

Control motorized blinds with separate up/down relay switches:

- **Open switch**: Connected to "up" relay
- **Close switch**: Connected to "down" relay  
- **Duration**: Time for blinds to go from fully closed to fully open

### Garage Door

Control a garage door with directional switches:

- **Open switch**: Garage door open button/relay
- **Close switch**: Garage door close button/relay
- **Duration**: Time for door to fully open or close

### Projector Screen

Control a motorized projector screen:

- **Open switch**: Screen retract switch
- **Close switch**: Screen extend switch
- **Duration**: Time for full extension/retraction cycle

## Automation Examples

### Basic Cover Control

```yaml
automation:
  - alias: "Open covers at sunrise"
    trigger:
      platform: sun
      event: sunrise
    action:
      service: cover.open_cover
      target:
        entity_id: cover.living_room_blinds

  - alias: "Close covers at sunset"  
    trigger:
      platform: sun
      event: sunset
    action:
      service: cover.close_cover
      target:
        entity_id: cover.living_room_blinds
```

### Position-Based Control

```yaml
automation:
  - alias: "Set cover to 50% at midday"
    trigger:
      platform: time
      at: "12:00:00"
    action:
      service: cover.set_cover_position
      target:
        entity_id: cover.living_room_blinds
      data:
        position: 50
```

## Troubleshooting

### Cover Position Drift

If cover position becomes inaccurate over time:

1. Verify your duration settings match actual movement time
2. Manually open/close cover fully to recalibrate
3. Consider physical stops or limit switches for better accuracy

### Switch Conflicts  

If switches activate unexpectedly:

1. Check switch entity states in Developer Tools
2. Ensure switches are properly configured as momentary or toggle as needed
3. Verify no automation conflicts are triggering switches

### Position Not Updating

If position doesn't change during movement:

1. Check that switch entities report state changes correctly
2. Verify duration is set appropriately (not too short)
3. Check Home Assistant logs for any error messages

## Technical Notes

- Position tracking uses internal timers and switch state monitoring
- The integration automatically handles switch turn-off after movement completion  
- State persistence ensures position survives Home Assistant restarts
- Interlocking prevents damage from simultaneous switch activation

For more advanced cover control scenarios, consider the Template Cover integration for custom templated behavior.
