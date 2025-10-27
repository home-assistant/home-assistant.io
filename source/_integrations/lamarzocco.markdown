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
ha_iot_class: Cloud Push
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
ha_quality_scale: platinum
---

This integration interacts with [La Marzocco](https://lamarzocco.com/it/en/) coffee machines through calls to the La Marzocco cloud API.

If your Home Assistant host can perform [DHCP discovery](https://www.home-assistant.io/integrations/dhcp/), your machine will be discovered automatically. Otherwise, if your machine is in Bluetooth range to your Home Assistant host and the [Bluetooth](/integrations/bluetooth) integration is fully loaded, the machine will be discovered as well.

## Prerequisites

- To be able to configure your machine in Home Assistant, your machine needs to be added to your account using the official La Marzocco app first.
- Only login with username & password is supported. If you are currently using a social login, you need to create a new La Marzocco account and transfer your machine to it to be able to use this integration.


{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "Your username you use to log into the La Marzocco app."
Password:
  description: "Password you use to log into the La Marzocco app."
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Use Bluetooth:
  description: Allows you to manually disable Bluetooth communication with the machine (if available). This can be used to avoid longer timeouts, e.g., when your machine is only sometimes in range.
{% endconfiguration_basic %}

## Data updates

By default, this integration will receive push updates from the cloud about its general status. If that is not possible it will query the cloud every 15 seconds for an update of general machine information, every 15 minutes for new statistics, every 30 minutes for updated schedules and every 8 hours for a firmware update.

# Available platforms & entities

{% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} = La Marzocco Cloud
<iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> = Bluetooth

## Buttons

| Button name | Description | Available for machines | Controllable through |
|-------------|-------------| ---------------------- | -------------------- |
| **Start backflush** | Starts the backflush process on your machine. You got 15 seconds to turn the paddle after activation. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | 


## Numbers

| Number name | Description | Available for machines | Controllable through | Remarks |
|-------------|-------------| ---------------------- |--------------------- | ------- |
| **Coffee target temperature** | Temperature the coffee boiler is set to | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> | - |
| **Smart standby time** | Time until the machine will automatically stand by (if enabled) | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Preinfusion time** | Duration of preinfusion | `Linea Micra`, `Linea Mini`, `Linea Mini R` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | only available when machine is in mode `Preinfusion` |
| **Prebrew time on** | Duration which prebrew will be on | `Linea Micra`, `Linea Mini`, `Linea Mini R` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | only available when machine is in mode `Prebrew` |
| **Prebrew time off** | Duration which prebrew will wait | `Linea Micra`, `Linea Mini`, `Linea Mini R` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | only available when machine is in mode `Prebrew` |

## Switches

| Switch name | Description | Available for machines | Controllable through |
|-------------|-------------| ---------------------- | -------------------- |
| **Main**      | Allows to turn machines on-/off | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> |
| **Steam boiler** | Allows to enable/disable the steam boiler | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} |
| **Smart standby enabled** | Whether smart standby is on (machine will automatically stand by after given time) | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> |

## Binary sensors

| Binary sensor name | Description | Available for machines |  Retrievable from | Remarks |
|------------------- |-------------| ---------------------- | ----------------- | ------- |
| **Water tank empty** | Indicates whether the water tank needs a refill. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Brewing active** | Is on if you are in the process of making coffee. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Backflush enabled** | Is on if you started the backflushing process. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %}| - |
| **WebSocket connected** | Track your connection to the cloud WebSocket for real time updates. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %}| Disabled by default. |

## Sensors

| Sensor name | Description | Available for machines |  Retrievable from | Remarks |
|------------------- |-------------| ---------------------- | ----------------- | ------- |
| **Coffee boiler ready time** | Indicates when the coffee boiler will be ready for brewing. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Steam boiler ready time** | Indicates when the steam boiler will be ready for brewing. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Brew start time** | If a brew is running, tells the exact start time of that brew. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Total coffees made** | How many coffees have been made in total. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Total flushes done** | How often the machine has been flushed. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |
| **Last cleaning time** | Indicates when the machine was last cleaned with a **Backflush**. | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} | - |

## Updates

| Update name | Description | Available for machines | Retrievable from |
|-------------|-------------| ---------------------- |---------------- | 
| **Gateway firmware** | Firmware status of the gateway |  `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} |
| **Machine firmware** | Firmware status of the machine |  `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} |

## Selects

| Select name | Description | Options | Available for machines | Controllable through |
|-------------|-------------| --------| ---------------------- | -------------------- |
| **Prebrew/-infusion mode** | Whether to use prebrew, preinfusion, or neither | `Disabled`, `Prebrew`, `Preinfusion` | `Linea Micra`, `Linea Mini`, `GS3 AV` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} |
| **Steam level** | The level your steam boiler should run at | `1`,`2`,`3` | `Linea Micra`, `Linea Mini R` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon> |
| **Smart standby mode** | The smart standby mode, that decides from which events the timer to standby will run. | `Last brewing`, `Power on` | `all` | {% icon "material-symbols:cloud-outline" title="La Marzocco Cloud" %} <iconify-icon inline title="Bluetooth" icon="material-symbols:bluetooth"></iconify-icon>  |

## Supported devices

Currently, only devices from the **"Home"** range are supported:

- `Linea Mini`
- `Linea Mini R`
- `Linea Micra`
- `GS3 AV`
- `GS3 MP`

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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

{% details "Problem: Connection to machine is not possible" %}

Check the La Marzocco Home app to see if you can connect to your machine there. If not, remove the machine and add it again (follow the instructions in the La Marzocco App).
{% enddetails %}
