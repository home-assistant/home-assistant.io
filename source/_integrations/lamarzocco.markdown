---
title: La Marzocco
description: Instructions on how to integrate your La Marzocco coffee machine with Home Assistant.
ha_release: 2024.2
ha_category:
  - Switch
  - Update
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: lamarzocco
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_codeowners:
  - '@zweckj'
ha_integration_type: device
---

This integration interacts with [La Marzocco coffee machines](https://lamarzocco.com/it/en/) through calls to the LaMarzocco cloud API and (optionally) local API calls, which include a WebSocket connection for (near) real-time updates. 

To be able to configure your machine in Home Assistant, your machine needs to be added to your account using the official La Marzocco app first. Currently, only login with username & password is supported. If you are currently using a social login, you need to create a new LaMarzocco account and transfer your machine to it to be able to use this integration.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your username you use to log into the La Marzocco app."
  required: true
  type: string
Password:
  description: "Password you use to log into the La Marzocco app."
  required: true
  type: string
Host:
  description: "IP address of your machine in your local network. If not set, no local connections will be used."
  required: false
  type: boolean
{% endconfiguration_basic %}


## Buttons

| Button name | Description | Available for machines |
|-------------|-------------| ---------------------- |
| Start backflush | Starts the backflush process on your machine. You got 15 seconds to turn the paddle after activation. | all |


## Numbers

| Number name | Description | Available for machines | Remarks |
|-------------|-------------| ---------------------- | ------- |
| Coffee target temperature | Temperature the coffee boiler is set to | GS3 AV, GS3 MP | - |
| Steam target temperature | Temperature the steam boiler is set to | GS3 AV, GS3 MP | - |
| Tea water duration | Dose hot water (in seconds) | GS3 AV, GS3 MP | - |
| Dose | Doseage (in ticks) for each key | GS3 AV | GS3 has this multiple times, one for each physical key (1-4), and the entities are disabled by default |
| Prebrew on time | Time prebrew wets the puck | Linea Micra, Linea Mini, GS3 AV | GS3 has this multiple times, one for each physical key (1-4), and the entities are disabled by default |
| Prebrew off time | Time prebrew waits before turning on the pump | Linea Micra, Linea Mini, GS3 AV | GS3 has this multiple times, one for each physical key (1-4), and the entities are disabled by default |
| Preinfusion time | Duration of preinfusion | Linea Micra, Linea Mini, GS3 AV | GS3 has this multiple times, one for each physical key (1-4), and the entities are disabled by default |


## Switches

| Switch name | Description | Available for machines |
|-------------|-------------| ---------------------- |
| Main        | Allows to turn machines on-/off | all |
| Auto on/off | Allows to enable/disable the auto on/off schedule | all |
| Steam boiler | Allows to enable/disable the steam boiler | all |

## Binary sensors

| Binary sensor name | Description | Available for machines | Remarks |
|-------------|-------------| ---------------------- | ------- |
| Water tank empty | Indicates whether the water tank needs a refill. | all | - |
| Brewing active | Is on if you are in the process of making coffee. | all | Only available when the *Host* was set during component configuration. |

## Sensors

| Sensor name | Description | Available for machines | Remarks |
|-------------|-------------| ---------------------- | ------- |
| Current coffee temperature | Current temperature of the coffee boiler | all | - |
| Current steam temperature| Current temperature of the steam boiler | all | - |
| Total coffees made | Counter for total coffees made| all | - |
| Total flushes made | Counter for total flushes done | all | - |
| Shot timer | Time the current brew is running | all | Only available when the *Host* was set during component configuration. |

## Updates

| Update name | Description | Available for machines |
|-------------|-------------| ---------------------- |
| Gateway firmware | Firmware status of the gateway | all |
| Machine firmware | Firmware status of the machine | all |

## Selects

| Select name | Description | Options | Available for machines | 
|-------------|-------------| ------------------------| ---------------------- |
| Prebrew/-infusion mode | Whether to use prebrew, preinfusion, or neither | Disabled, Prebrew, Preinfusion | Linea Micra, Linea Mini, GS3 AV |
| Steam level | The level your steam boiler should run at | 1,2,3 | Linea Micra |

## Calendar

The integration exposes a calendar for the auto on/off schedule set for the machine. The schedule will be displayed recurringly: If you set the machine to start up on Mondays at 8:00, and shut down at 9:00, you will get events for all Mondays in your calendar. On days when you have the auto on/off feature disabled, you won't get an event in the calendar. Also, if you have the auto on/off feature disabled globally (for example, through the switch "Auto on/off"), there will be no events in the calendar.
