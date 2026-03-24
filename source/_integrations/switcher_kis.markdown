---
title: Switcher
description: Integrate Switcher devices.
ha_category:
  - Climate
  - Cover
  - Sensor
  - Switch
ha_release: 0.93
ha_iot_class: Local Push
ha_codeowners:
  - '@thecode'
  - '@YogevBokobza'
ha_domain: switcher_kis
ha_platforms:
  - button
  - climate
  - cover
  - diagnostics
  - light
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: hub
ha_quality_scale: silver
---

The **Switcher** {% term integration %} allows you to control your [Switcher Devices](https://www.switcher.co.il/).

Supported devices:

- Switcher Power Plug
- Switcher Touch (from firmware 1.51)
- Switcher V2 (Espressif chipset - from firmware 3.21)
- Switcher V2 (Qualcomm chipset - from firmware 72.32)
- Switcher V4
- Switcher Mini
- Switcher Breeze
- Switcher Runner
- Switcher Runner S11
- Switcher Runner S12
- Switcher Light SL01
- Switcher Light SL01 Mini
- Switcher Light SL02
- Switcher Light SL02 Mini
- Switcher Light SL03
- Switcher Heater

Devices that require a token:

- Switcher Runner S11
- Switcher Runner S12
- Switcher Light SL01
- Switcher Light SL01 Mini
- Switcher Light SL02
- Switcher Light SL02 Mini
- Switcher Light SL03
- Switcher Heater

If you completed the integration setup but are still unable to control the device, please make sure your device's firmware is up-to-date.

## Prerequisites

Before the integration can find a device, you need to connect it to your network using the Switcher app.

To enhance security, certain Switcher devices require a token for operation. In order to integrate your token-based Switcher devices with Home Assistant, you'll need the following information:

- **The username of your Switcher Account**: To find the username, open the Switcher app.
- **Local control key token**: To find the local control key token, browse to the
  [Switcher GetKey API][token], enter your Switcher account username (which is an email address), and press
  **Send Me The Code**.

  The token will be sent to you by email. It will look something like this: `zvVvd7JxtN7CgvkD1Psujw==`

[token]: https://switcher.co.il/GetKey/

{% include integrations/config_flow.md %}

## Buttons

For Switcher Breeze the integration provides the following buttons:

- For devices that are also controlled in other ways or often go out of sync with Switcher Breeze, there are `Assume on` & `Assume off` buttons which you can use to can tell Switcher Breeze if your device is currently running or not without sending a new command to the device.

- For devices which do not support swing status for the vertical swing, the integration provides separate `Vertical swing on` & `Vertical swing off` buttons.

## Covers

For Switcher cover control devices (Switcher Runner, Switcher Runner S11, Switcher Runner S12) the integration allows you to control its covers open/close state, set specific covers position and get information about the cover direction (UP/DOWN/STOP).

## Lights

For Switcher light control devices (Switcher Runner S11, Switcher Runner S12, and Switcher Lights), the integration allows you to control its lights on/off state.
  
## Sensors

For Switcher power control devices (Switcher Power Plug, Switcher Touch, Switcher V2/V4, Switcher Heater) the integration provides the following sensors:
| Sensor Name         | Description                                            | Example           |
| ------------------- | ------------------------------------------------------ | ----------------- |
| `Auto Shutdown`*    | The auto shutdown time limit configured on the device  | 01:30:00          |
| `Remaining Time`*   | Time remaining to shutdown (auto or timer)             | 01:29:41          |
| `Electric Current`  | The electric current in amps                           | 12.5 A            |
| `Power Consumption` | The power consumption in watts                         | 2756 W            |

*Currently not supported for Switcher Power Plug

For Switcher Breeze the integration provides the following sensor:
| Sensor Name           | Description                                            | Example           |
| --------------------- | ------------------------------------------------------ | ----------------- |
| `Current temperature` | The current temperature in celsius                     | 25.0 °C           |

## Switches

For Switcher cover control devices (Switcher Runner, Switcher Runner S11, Switcher Runner S12), the integration allows you to control its child lock state; ON means locked, and OFF means unlocked.

## Actions

For Switcher power control devices (Switcher Touch, Switcher V2/V4, Switcher Mini, Switcher Heater) the integration provides the following actions:

### Action: Set auto off

The `switcher_kis.set_auto_off` action sets the auto-off configuration setting for the device.

Meaning the device will turn itself off when reaching the auto-off configuration limit.

| Data attribute | Mandatory | Description                                                                            | Example                    |
| ------------- | --------- | -------------------------------------------------------------------------------------- | -------------------------- |
| `entity_id`   | Yes       | Name of the entity id associated with the integration, used for permission validation  | switch.switcher_kis_boiler |
| `auto_off`    | Yes       | Time period string containing hours and minutes                                        | "02:30"                    |

### Action: Turn on with timer

The `switcher_kis.turn_on_with_timer` action turns on the switcher device with a timer.

Meaning the device will turn itself off when timer ends.
Note: This does not affect the auto off timer.

| Data attribute  | Mandatory | Description                                             | Example                    |
| --------------- | --------- | ------------------------------------------------------- | -------------------------- |
| `entity_id`     | Yes       | Name of the entity id associated with the integration   | switch.switcher_kis_boiler |
| `timer_minutes` | Yes       | Integer containing timer minutes (valid range 1 to 150) | 90                         |

### Action: Get schedules

The `switcher_kis.get_schedules` action retrieves all schedules configured on the device.

This action returns response data — use `response_variable` to capture the result.

Each schedule in the returned list contains:

| Field         | Description                                         | Example            |
| ------------- | --------------------------------------------------- | ------------------ |
| `schedule_id` | Schedule slot ID (0–7)                              | "0"                |
| `recurring`   | Whether the schedule repeats on selected days       | true               |
| `days`        | List of weekday names the schedule runs on          | ["monday","friday"]|
| `start_time`  | Schedule start time in HH:MM format                 | "07:00"            |
| `end_time`    | Schedule end time in HH:MM format                   | "07:30"            |
| `duration`    | Human-readable duration string                      | "0:30:00"          |

Example — retrieve schedules and send a notification:

```yaml
sequence:
  - action: switcher_kis.get_schedules
    target:
      entity_id: switch.switcher_boiler
    response_variable: result
  - action: notify.mobile_app_my_phone
    data:
      message: >
        {% if result[0].schedules %}
          Next schedule: {{ result[0].schedules[0].start_time }}
        {% else %}
          No schedules configured.
        {% endif %}
```

### Action: Create schedule

The `switcher_kis.create_schedule` action creates a new schedule on the device. The device supports up to 8 schedule slots (IDs 0–7).

Omit `days` to create a one-time schedule that runs once on the next matching time. Include one or more weekday names to create a recurring schedule.

| Data attribute | Mandatory | Description                                                                  | Example                     |
| -------------- | --------- | ---------------------------------------------------------------------------- | --------------------------- |
| `entity_id`    | Yes       | Name of the entity id associated with the integration                        | switch.switcher_kis_boiler  |
| `start_time`   | Yes       | Schedule start time in HH:MM format                                          | "07:00"                     |
| `end_time`     | Yes       | Schedule end time in HH:MM format (must be after start_time)                 | "07:30"                     |
| `days`         | No        | List of weekday names (monday–sunday). Leave empty for a one-time schedule.  | ["monday", "friday"]        |

Example — create a recurring weekday morning schedule:

```yaml
action: switcher_kis.create_schedule
target:
  entity_id: switch.switcher_boiler
data:
  start_time: "07:00"
  end_time: "07:30"
  days:
    - monday
    - tuesday
    - wednesday
    - thursday
    - friday
```

### Action: Delete schedule

The `switcher_kis.delete_schedule` action deletes a schedule from the device by its slot ID. Use the `get_schedules` action to find the ID of the schedule you want to remove.

| Data attribute | Mandatory | Description                                           | Example                    |
| -------------- | --------- | ----------------------------------------------------- | -------------------------- |
| `entity_id`    | Yes       | Name of the entity id associated with the integration | switch.switcher_kis_boiler |
| `schedule_id`  | Yes       | ID of the schedule slot to delete (0–7)               | "0"                        |

Example:

```yaml
action: switcher_kis.delete_schedule
target:
  entity_id: switch.switcher_boiler
data:
  schedule_id: "0"
```

## Notes

Make sure that Home Assistant host's firewall allows incoming traffic on UDP ports 10002, 10003, 20002 & 20003 and outgoing connections to Switcher device(s) on TCP ports 9957 & 10000.
If Home Assistant and the Switcher device(s) are not on the same network, you will also need to have their traffic properly forwarded between the two networks.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
