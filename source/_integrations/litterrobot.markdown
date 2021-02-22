---
title: Litter-Robot
description: Instructions on how to integrate a Litter-Robot WiFi-enabled, automatic, self-cleaning litter box to Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 2021.3
ha_config_flow: true
ha_quality_scale: gold
ha_codeowners:
  - '@natekspencer'
ha_domain: litterrobot
---

The Litter-Robot integration allows you to control and monitor your WiFi-enabled, automatic, self-cleaning litter box for cats.

You will need a Litter-Robot account as well as a Wi-Fi enabled Litter-Robot unit that has already been associated with your account.

There is currently support for the following device types within Home Assistant:

- Vacuum (this is the representation of your Litter-Robot litter box)

## Configuration

This integration can be configured via the UI:

1. Go to **Configuration**->**Integrations**
2. Click **+ ADD INTEGRATION** to setup a new integration
3. Search for **Litter-Robot** and click on it
4. Enter your _username_ and _password_ and click **SUBMIT**.
5. Upon successful login, you will have the opportunity to select the area that your Litter-Robot is located.
6. Click the **Finish** button.

## Entities

The following entities are created for this component:

| Entity     | Domain   | Attributes                                                                                        |
| ---------- | -------- | ------------------------------------------------------------------------------------------------- |
| Litter Box | `vacuum` | clean cycle wait time minutes<br/>is sleeping<br/>power status<br/>unit status code<br/>last seen |

All of the entities above are grouped together and identified by a single device.

## Services

In addition to the entities that are created above, some services that are built-in to the vacuum domain are utilized for additional functionality that is available in the Litter-Robot companion app.

Replace `<entity_id>` in any of the below snippets with the appropriate value of your Litter-Robot vacuum entity.

### vacuum.turn_off

Supports turning off your Litter-Robot. If the unit is currently cycling, it will interrupt the cycle and stop the bonnet where it is at the time the command is received.

```yaml
service: vacuum.turn_off
entity_id: <entity_id>
```

### vacuum.turn_on

Supports turning on your Litter-Robot, initiating a clean cycle.

```yaml
service: vacuum.turn_on
entity_id: <entity_id>
```

### vacuum.send_command

#### reset_waste_drawer

Resets the waste drawer gauge on the Litter-Robot.

```yaml
service: vacuum.send_command
data:
  entity_id: <entity_id>
  command: reset_waste_drawer
```

Alternatively, you can create a script using the snippet below that can then be reused across Home Assistant.

```yaml
alias: Reset Waste Drawer
sequence:
  - service: vacuum.send_command
    data:
      entity_id: <entity_id>
      command: reset_waste_drawer
mode: single
icon: 'mdi:refresh'
```

#### set_sleep_mode

Enables (with sleep time param) or disables sleep mode on the Litter-Robot.

| Param      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enabled    | bool   | true to enable, false to disable                                                                                                                                                                                                                                                                                                                                                                         |
| sleep_time | string | time at which the unit will enter sleep mode and prevent an automatic clean cycle for 8 hours. This param uses the 24-hour format string `%H:%M:%S`, with seconds being optional, and is based on the timezone configured for your Home Assistant installation. As such, `10:30:00` would indicate 10:30 am, whereas `22:30:00` would indicate 10:30 pm. Required if the param `enabled` is set to true. |

```yaml
service: vacuum.send_command
data:
  entity_id: <entity_id>
  command: set_sleep_mode
  params:
    enabled: true
    sleep_time: '22:30:00'
```
