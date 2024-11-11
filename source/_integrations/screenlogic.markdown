---
title: Pentair ScreenLogic
description: Instructions on how to integrate a ScreenLogic gateway within Home Assistant.
ha_release: '2021.4'
ha_category:
  - Binary sensor
  - Climate
  - Hub
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_config_flow: true
ha_dhcp: true
ha_codeowners:
  - '@dieselrabbit'
  - '@bdraco'
ha_domain: screenlogic
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - light
  - number
  - sensor
  - switch
ha_integration_type: integration
---

The Pentair ScreenLogic integration allows you to integrate your Pentair IntelliTouch or EasyTouch pool controller with Home Assistant via the [Pentair ScreenLogic](https://www.pentair.com/products/residential/pool-spa-equipment/pool-automation/screenlogic2_interfaceforintellitouchandeasytouchautomationsystems.html) gateway.

{% include integrations/config_flow.md %}

## Options

ScreenLogic options are set via **Settings** > **Devices & services** > **Pentair ScreenLogic** > **Options**.

-= Seconds between scans - How many seconds between each polling of the ScreenLogic gateway.

## Actions

### `screenlogic.set_color_mode`

Sets the operation of any connected color-capable lights.

| Data attribute | Optional | Description                                                                         |
| ---------------------- | -------- | ----------------------------------------------------------------------------------- |
| `config_entry`         | no       | Integration entry_id of the ScreenLogic instance you wish to set the color mode on. |
| `color_mode`           | no       | The color mode to set. Valid values are listed below.                               |

### `screenlogic.start_super_chlorination`

Begins super chlorination, running for the specified period or 24 hours if none is specified.

| Data attribute | Optional | Description                                                                               |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `config_entry`         | no       | Integration entry_id of the ScreenLogic instance you wish to start super chlorination on. |
| `runtime`              | yes      | Number of hours to run super chlorination for. Defaults to 24 hours.                      |

### `screenlogic.stop_super_chlorination`

Stops super chlorination.

| Data attribute | Optional | Description                                                                              |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `config_entry`         | no       | Integration entry_id of the ScreenLogic instance you wish to stop super chlorination on. |

## Reference

### Color modes

| color_mode   | Name         | Description                                                                                               |
| ------------ | ------------ | --------------------------------------------------------------------------------------------------------- |
| `all_off`    | All Off      | Turns all light circuits off.                                                                             |
| `all_on`     | All On       | Turns all light circuits on to their last mode.                                                           |
| `color_set`  | Color Set    | Sets light circuits to their pre-set colors as set in the pool controller.                                |
| `color_sync` | Color Sync   | Synchronize all IntelliBrite, SAm, SAL, or FIBERworks color changing lights and synchronize their colors. |
| `color_swim` | Color Swim   | Cycles through white, magenta, blue and green colors. (Emulates Pentair SAm color changing light.)        |
| `party`      | Party        | Rapid color changing building the energy and excitement.                                                  |
| `romance`    | Romance      | Slow color transitions creating a mesmerizing and calming effect.                                         |
| `caribbean`  | Caribbean    | Transitions between a variety of blues and greens.                                                        |
| `american`   | American     | Patriotic red, white and blue transition.                                                                 |
| `sunset`     | Sunset       | Dramatic transitions of orange, red and magenta tones.                                                    |
| `royal`      | Royal        | Richer, deeper, color tones.                                                                              |
| `save`       | Save Color   | Save the exact colors that are being displayed.                                                           |
| `recall`     | Recall Color | Recall the saved colors.                                                                                  |
| `blue`       | Blue         | Fixed color: Blue                                                                                         |
| `green`      | Green        | Fixed color: Green                                                                                        |
| `red`        | Red          | Fixed color: Red                                                                                          |
| `white`      | White        | Fixed color: White                                                                                        |
| `magenta`    | Magenta      | Fixed color: Magenta                                                                                      |
| `thumper`    | Thumper      | Toggles the solenoid thumper on MagicStream laminars.                                                     |
| `next_mode`  | Next Mode    | Cycle to the next color mode.                                                                             |
| `reset`      | Reset        | Reset light modes.                                                                                        |
| `hold`       | Hold         | Hold light transitions.                                                                                   |
