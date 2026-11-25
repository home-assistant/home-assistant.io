---
description: Integrate Switcher devices.
ha_release: 0.93
ha_domain: switcher_kis
---

The **Switcher** {% term integration %} allows you to control your [Switcher devices](https://www.switcher.co.il/) locally, without a cloud connection.

Use it to bring your water heater, plugs, shutters, lights, and air conditioner into Home Assistant. For example, you can heat water before you wake up, close the shutters at sunset, cool the bedroom before bedtime, or track how much power your water heater uses.

## Supported devices

The following devices are known to be supported by the integration:

- Switcher Power Plug
- Switcher Touch (from firmware 1.51)
- Switcher V2 (Espressif chipset - from firmware 3.21)
- Switcher V2 (Qualcomm chipset - from firmware 72.32)
- Switcher V4
- Switcher Mini
- Switcher Breeze
- Switcher Runner
- Switcher Runner Mini
- Switcher Runner S11
- Switcher Runner S12
- Switcher Light SL01
- Switcher Light SL01 Mini
- Switcher Light SL02
- Switcher Light SL02 Mini
- Switcher Light SL03
- Switcher Heater

## Prerequisites

Before the integration can find a device, you need to connect it to your network using the Switcher app.

To enhance security, certain Switcher devices require a token for operation. The following devices require a token:

- Switcher Runner S11
- Switcher Runner S12
- Switcher Light SL01
- Switcher Light SL01 Mini
- Switcher Light SL02
- Switcher Light SL02 Mini
- Switcher Light SL03
- Switcher Heater

To integrate your token-based Switcher devices with Home Assistant, you'll need the following information:

- **The username of your Switcher Account**: To find the username, open the Switcher app.
- **Local control key token**: To find the local control key token, browse to the
  [Switcher GetKey API][token], enter your Switcher account username (which is an email address), and press
  **Send Me The Code**.

  The token will be sent to you by email. It will look something like this: `zvVvd7JxtN7CgvkD1Psujw==`

[token]: https://switcher.co.il/GetKey/

{% include integrations/config_flow.md %}

## Supported functionality

The entities the integration creates depend on the type of Switcher device.

### Buttons

For Switcher Breeze the integration provides the following buttons:

- For devices that are also controlled in other ways or often go out of sync with Switcher Breeze, there are **Assume on** and **Assume off** buttons. Use them to tell Switcher Breeze if your device is currently running or not, without sending a new command to the device.
- For devices that do not support swing status for the vertical swing, the integration provides separate **Vertical swing on** and **Vertical swing off** buttons.

### Climate

For Switcher Breeze, the integration provides a {% term climate %} entity to control the air conditioner connected to the Switcher Breeze. The Switcher Breeze controls the air conditioner with infrared commands, using the remote you selected for the air conditioner in the Switcher app. The available options depend on what that remote supports:

- **HVAC mode**: **Off**, plus the modes the remote supports: **Cool**, **Heat**, **Fan only**, **Dry**, and **Heat/Cool** (the auto mode of the air conditioner).
- **Target temperature**: Set in whole degrees Celsius, within the range the remote supports. Available only in modes that support temperature control.
- **Fan mode**: **Low**, **Medium**, **High**, and **Auto**, if the remote supports fan levels in the current mode.
- **Swing mode**: **Vertical** or **Off**, if the remote supports turning the vertical swing on and off with one command. For remotes that use separate commands, use the **Vertical swing on** and **Vertical swing off** buttons instead.
- **Current temperature**: The room temperature measured by the Switcher Breeze.

### Covers

For Switcher cover control devices (Switcher Runner, Switcher Runner Mini, Switcher Runner S11, Switcher Runner S12) the integration allows you to control its covers open/close state, set specific covers position and get information about the cover direction (UP/DOWN/STOP).

### Lights

For Switcher light control devices (Switcher Runner S11, Switcher Runner S12, and Switcher Lights), the integration allows you to control its lights on/off state.

### Sensors

For Switcher power control devices (Switcher Power Plug, Switcher Touch, Switcher V2/V4, Switcher Mini, Switcher Heater), the integration provides the following sensors:

- **Shutdown time**: The date and time when the device will turn off, either by auto shutdown or by a timer. The sensor is **Unknown** when no timer is running. Not available for Switcher Power Plug.
- **Auto-off**: The auto shutdown time limit configured on the device, shown in minutes by default. This sensor is disabled by default. Not available for Switcher Power Plug.
- **Electric current**: The electric current in amperes, for example 12.5 A.
- **Power consumption**: The power consumption in watts, for example 2756 W.

For Switcher Breeze, the integration provides the following sensor:

- **Current temperature**: The current temperature in degrees Celsius, for example 25.0 °C.

### Switches

For Switcher power control devices (Switcher Power Plug, Switcher Touch, Switcher V2/V4, Switcher Mini, Switcher Heater), the integration provides a switch to turn the device on and off.

For Switcher cover control devices (Switcher Runner, Switcher Runner Mini, Switcher Runner S11, Switcher Runner S12), the integration allows you to control its child lock state; ON means locked, and OFF means unlocked.

{% include integrations/actions.md %}

## Switcher automation examples

Switcher devices work well with automations. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Heat water before you wake up

Have hot water ready in the morning, without leaving the water heater on all night. On weekdays at 6:00, this automation turns on the water heater for 45 minutes. The water heater then turns itself off.

- **Trigger**: Time: at 06:00 on weekdays
- **Action**: Turn on with timer
  - **Target**: Water heater (`switch.switcher_kis_boiler`)
  - **Timer**: 45

{% details "YAML example for heating water before you wake up" %}

{% example %}
automation: |
  alias: "Heat water before waking up"
  triggers:
    - trigger: time
      at: "06:00:00"
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: switcher_kis.turn_on_with_timer
      target:
        entity_id: switch.switcher_kis_boiler
      data:
        timer_minutes: 45
{% endexample %}

{% enddetails %}

### Automation: Close the shutters at sunset

Close the shutters when the sun goes down.

- **Trigger**: Sun: at sunset
- **Action**: Close cover
  - **Target**: Living room shutter (`cover.living_room_shutter`)

{% details "YAML example for closing the shutters at sunset" %}

{% example %}
automation: |
  alias: "Close the shutters at sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.living_room_shutter
{% endexample %}

{% enddetails %}

### Automation: Cool the bedroom before bedtime

Start cooling the bedroom before you go to bed. Every day at 21:30, this automation sets the air conditioner to cool to 24 °C.

- **Trigger**: Time: at 21:30
- **Action**: Set thermostat target temperature
  - **Target**: Bedroom air conditioner (`climate.bedroom_air_conditioner`)
  - **Temperature**: 24
  - **HVAC mode**: Cool

{% details "YAML example for cooling the bedroom before bedtime" %}

{% example %}
automation: |
  alias: "Cool the bedroom before bedtime"
  triggers:
    - trigger: time
      at: "21:30:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.bedroom_air_conditioner
      data:
        temperature: 24
        hvac_mode: cool
{% endexample %}

{% enddetails %}

### Automation: Keep the air conditioner state in sync using a power sensor

If the Switcher Breeze misses a command from the air conditioner's own remote, the state in Home Assistant can go out of sync. If you measure the power use of the air conditioner, for example with a smart plug or an energy meter, you can use it to correct the state automatically. When the power use rises, this automation presses the **Assume on** button. When the power use drops, it presses the **Assume off** button. These buttons only update the state in Home Assistant and do not send a command to the air conditioner.

Adjust the power thresholds to match your air conditioner. Choose a turn-off threshold below the power the air conditioner uses when only the fan is running, so the state does not change while the air conditioner pauses cooling.

- **Triggers**:
  - Numeric state: Air conditioner power above 30 W for 2 minutes, with the trigger ID `on`
  - Numeric state: Air conditioner power below 10 W for 5 minutes, with the trigger ID `off`
- **Action**: Choose
  - **Option 1**: Triggered by `on`
    - **Action**: Press button
      - **Target**: Bedroom air conditioner Assume on (`button.bedroom_air_conditioner_assume_on`)
  - **Option 2**: Triggered by `off`
    - **Action**: Press button
      - **Target**: Bedroom air conditioner Assume off (`button.bedroom_air_conditioner_assume_off`)

{% details "YAML example for keeping the air conditioner state in sync" %}

{% example %}
automation: |
  alias: "Sync air conditioner state with power use"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.air_conditioner_power
      above: 30
      for:
        minutes: 2
      id: "on"
    - trigger: numeric_state
      entity_id: sensor.air_conditioner_power
      below: 10
      for:
        minutes: 5
      id: "off"
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: "on"
          sequence:
            - action: button.press
              target:
                entity_id: button.bedroom_air_conditioner_assume_on
        - conditions:
            - condition: trigger
              id: "off"
          sequence:
            - action: button.press
              target:
                entity_id: button.bedroom_air_conditioner_assume_off
{% endexample %}

{% enddetails %}

### Show the remaining time as a countdown

The **Shutdown time** sensor shows when the device will turn off. If you prefer a countdown in `HH:MM:SS` format, you can create a [template sensor](/integrations/template/) based on the **Shutdown time** sensor. The example below updates every 5 seconds and shows `00:00:00` when no timer is running. Replace `sensor.water_heater_shutdown_time` with the entity ID of your **Shutdown time** sensor.

Add the following to your {% term "`configuration.yaml`" %}:

{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
template:
  - triggers:
      - trigger: time_pattern
        seconds: "/5"
      - trigger: state
        entity_id: sensor.water_heater_shutdown_time
    sensor:
      - name: "Water heater remaining time"
        unique_id: water_heater_remaining_time
        icon: mdi:av-timer
        state: >
          {% set entity = 'sensor.water_heater_shutdown_time' %}
          {% set s = 0 %}
          {% if has_value(entity) %}
            {% set left = states(entity) | as_datetime - now() %}
            {% set s = [left.total_seconds() | int, 0] | max %}
          {% endif %}
          {{ '%02d:%02d:%02d' % (s // 3600, s % 3600 // 60, s % 60) }}
```

## Data updates

Switcher devices push their state to Home Assistant. Each device broadcasts its current status on the local network every few seconds, and the integration updates the entities as soon as a broadcast is received. There is no polling.

If Home Assistant does not receive a broadcast from a device for 30 seconds, the device's entities are marked as unavailable. They become available again as soon as the next broadcast is received.

## Known limitations

- The integration relies on broadcasts from the Switcher devices, so Home Assistant and the devices need to be on the same local network. If they are on different networks, like separate VLANs or subnets, you need to forward the broadcast traffic between them. For details, see [Devices are not discovered or become unavailable](#devices-are-not-discovered-or-become-unavailable).
- The Switcher Breeze picks up commands from the air conditioner's own remote to keep its state up to date. If it misses a command, for example because the remote was not pointed toward it, the state in Home Assistant can go out of sync. Use the **Assume on** and **Assume off** buttons to correct it. To correct it automatically, see [Keep the air conditioner state in sync using a power sensor](#automation-keep-the-air-conditioner-state-in-sync-using-a-power-sensor).
- The Switcher Breeze climate entity is only created if the integration supports the air conditioner remote selected in the Switcher app. If the remote is not supported, a warning is logged and no climate entity is created.
- The **Set auto-off** and **Turn on with timer** actions, and the **Shutdown time** and **Auto-off** sensors, are not available for the Switcher Power Plug.
- Switcher lights can only be turned on and off. Brightness and color control are not supported.
- The integration does not support changing device settings that are only available in the Switcher app, like schedules.

## Troubleshooting

### Devices are not discovered or become unavailable

The integration discovers devices and receives their state from UDP broadcasts sent by the devices on the local network, and sends commands to the devices over TCP.

- Make sure the device is connected to your network using the Switcher app.
- Make sure the Home Assistant host's firewall allows incoming traffic on UDP ports 10002, 10003, 20002 & 20003 and outgoing connections to the Switcher device(s) on TCP ports 9957 & 10000.
- Broadcasts do not cross network boundaries. If Home Assistant and the Switcher device(s) are not on the same network (for example, on different VLANs or subnets), you need to forward the broadcast traffic between the two networks.

### Unable to control the device

If you completed the integration setup but are still unable to control the device, make sure your device's firmware is up-to-date.

### Home Assistant asks to re-authenticate

When a device that requires a token is discovered and no token is configured, Home Assistant asks you to re-authenticate the integration. Enter your Switcher account username and the local control key token, as described in the [prerequisites](#prerequisites).

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
