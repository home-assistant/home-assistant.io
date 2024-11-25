---
title: La Marzocco
description: Instructions on how to integrate your La Marzocco coffee machine with Home Assistant.
ha_release: 2024.2
ha_category:
  - Binary sensor
  - Calendar
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: lamarzocco
ha_platforms:
  - binary_sensor
  - button
  - calendar
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_bluetooth: true
ha_dhcp: true
ha_codeowners:
  - '@zweckj'
ha_integration_type: device
---

This integration interacts with [La Marzocco](https://lamarzocco.com/it/en/) coffee machines through calls to the La Marzocco cloud API. Optionally, local API calls, which include a WebSocket connection for (near) real-time updates and a Bluetooth connection, can be utilized for local connections.

If your Home Assistant host can perform [DHCP discovery](https://www.home-assistant.io/integrations/dhcp/), your machine will be discovered automatically. Otherwise, if your machine is in Bluetooth range to your Home Assistant host and the [Bluetooth](/integrations/bluetooth) integration is fully loaded, the machine will be discovered as well.

## Prerequisites

- To be able to configure your machine in Home Assistant, your machine needs to be added to your account using the official La Marzocco app first.
- Only login with username & password is supported. If you are currently using a social login, you need to create a new La Marzocco account and transfer your machine to it to be able to use this integration.


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

# Available platforms & entities

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
| Smart standby time | Time until the machine will automatically stand by (if enabled) | all | - |


## Switches

| Switch name | Description | Available for machines |
|-------------|-------------| ---------------------- |
| Main        | Allows to turn machines on-/off | all |
| Steam boiler | Allows to enable/disable the steam boiler | all |
| Smart standby enabled | Whether smart standby is on (machine will automatically stand by after given time) | all |

## Binary sensors

| Binary sensor name | Description | Available for machines | Remarks |
|-------------|-------------| ---------------------- | ------- |
| Water tank empty | Indicates whether the water tank needs a refill. | all | - |
| Brewing active | Is on if you are in the process of making coffee. | all | Only available when the *Host* was set during component configuration. |
| Backflush enabled | Is on if you started the backflushing process. | all | - |

## Sensors

| Sensor name | Description | Available for machines | Remarks |
|-------------|-------------| ---------------------- | ------- |
| Current coffee temperature | Current temperature of the coffee boiler | all | When the machine reaches temperature, this will be approximately 3 degrees higher than the `Coffee target temperature`, due to different measurement points. |
| Current steam temperature| Current temperature of the steam boiler | Linea Micra, GS3 AV, GS3 MP | - |
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
| Smart standby mode | The smart standby mode, that decides from which events the timer to standby will run. | Last brewing, Power on | all |

## Supported devices

Currently, only devices from the **"Home"** range are supported:

- Linea Mini
- Linea Mini R
- Linea Micra
- GS3 AV
- GS3 MP

## Possible use-cases

- Control your machine through voice, allowing you to change boiler temperatures quickly without opening the app.
- Control your smart coffee scales (tare/timer start) when a brew starts.
- Turn on lights next to the machine while a brew is running.

## Automations

Get started with these automation examples.

### Turn steamboiler on when machine is turned on

I often drink milk beverages in the morning and espresso in the afternoon, but forget to re-enable the steamboiler again, so this automation ensures that the steam boiler is always turned on, when the machine is turned on.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: Turn steamboiler on when machine is turned on
description: Ensure the steamboiler is on, when the machine gets turned on
triggers:
  - trigger: state
    entity_id:
      - switch.mr000000
    from: "off"
    to: "on"
conditions:
  - condition: state
    entity_id: switch.mr000000_steam_boiler
    state: "off"
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.mr000000_steam_boiler
    data: {}
mode: single

```
{% endraw %}
{% enddetails %}
  
## Known Limitations

- Only La Marzocco native app accounts are supported, social logins (Google, Apple & WeChat) are not supported
- Currently it is only possible to view the schedules configured in the La Marzocco Home app, but not to edit the schedules from Home Assistant. You can, of course, build Home Assistant native automations to reflect the same functionality in Home Assistant.

## Troubleshooting

{% details "Problem: Connection to machine is not possible" %}

Check the La Marzocco Home app to see if you can connect to your machine there. If not, remove the machine and add it again (follow the instructions in the La Marzocco App).
{% enddetails %}

{% details "Real time updates are not available" %}

Check the La Marzocco Home app to see if your machine is connected to Wi-Fi. Ensure Home Assistant can reach the machine. Ensure you configured the host option in the integration options.
{% enddetails %}

