---
description: Integration to control Gree air conditioners using an infrared emitter and to receive commands from a Gree remote using an infrared receiver.
ha_release: '2026.10'
ha_domain: gree_infrared
---

The **Gree Infrared** {% term integration %} lets you control a compatible Gree air conditioner using any infrared emitter previously configured in Home Assistant. It can also keep the entities in sync when you have an infrared receiver set up, so they follow along when you use the physical Gree remote.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the air conditioner but there is no feedback channel to confirm the current state. The integration therefore uses assumed states. It remembers the last known state and restores it after a restart.

## How you can use the integration

After setup, you can control your Gree air conditioner from Home Assistant the same way you would with its remote, and make it part of your automations. For example, you can:

- Cool the bedroom before you go to bed.
- Turn the air conditioner off when everyone leaves home, so it does not cool an empty house.
- Turn the air conditioner off when a window opens.
- Keep using the physical remote. With an infrared receiver, the climate entity follows the changes you make with it.

## Supported devices

The integration supports compatible Gree air conditioners that can be controlled via the standard Gree air conditioner infrared protocol.

Gree manufactures air conditioners sold under many brand names. Units branded Onida, Sinclair, and others use the same infrared protocol and work with this integration.

## Prerequisites

{% include integrations/infrared_controlled.md %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Infrared emitter:
  description: "The infrared emitter entity to use for sending commands to your air conditioner. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter. It is required."
Infrared receiver:
  description: "The infrared receiver entity to use for receiving commands from your Gree remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver. It is optional and keeps the entities in sync with the physical remote."
Supported modes:
  description: "The operating modes your air conditioner supports. Select at least one of **Cool**, **Heat**, **Dry**, **Fan only**, and **Auto**. Check your remote or the manual of your unit to see which modes it has. Not all Gree models support heat. Selecting a mode your unit does not have breaks nothing. Your air conditioner simply does not respond to it."
{% endconfiguration_basic %}

## Reconfiguring the integration

If you replace your infrared emitter, add a receiver later, or want to change the modes of your air conditioner, you can update the device without removing and re-adding the integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **Gree Infrared** integration and select it.
3. Next to the device you want to change, select the three dots {% icon "mdi:dots-vertical" %} menu and choose **Reconfigure**.
4. Change the options and select **Submit**.

The same rules as during setup apply: an infrared emitter and at least one supported mode are required. If you remove the receiver, the entities stop following the physical remote. If you remove the mode your air conditioner is currently in, its climate entity shows **Off** until you select another mode.

## Supported functionality

A climate entity and three switch entities are created for each Gree air conditioner device you set up.

- **Gree AC**
  - **Description**: Represents the Gree air conditioner and allows you to control it using infrared commands.
  - **Supported features**: Turn on, turn off, set HVAC mode, set target temperature, and set fan mode.
- **Turbo**
  - **Description**: Enables or disables turbo mode, which runs the unit at maximum output.
- **Panel light**
  - **Description**: Turns the front panel light on or off. Shown under **Configuration** on the device page.
- **Xtra fan**
  - **Description**: Enables or disables extra fan mode to help remove moisture from the coils. Gree remotes label this button **X-Fan** or **Blow**. Shown under **Configuration** on the device page.

The switches are named to match the [Gree](/integrations/gree/) integration, which controls the same features over Wi-Fi.

### Supported modes

The climate entity offers the modes you selected during setup, in addition to **Off**. Turning the air conditioner on resumes the mode it was last in.

- **Cool**: Cools to a set temperature.
- **Heat**: Heats to a set temperature. Not all Gree air conditioner models have it.
- **Dry**: Dehumidify mode.
- **Fan only**: Fan circulation without heating or cooling.
- **Auto**: The unit chooses between heating and cooling automatically.

### Fan speeds

- **Auto**: The unit selects the speed automatically.
- **Low**: Low fan speed.
- **Medium**: Medium fan speed.
- **High**: High fan speed.

### Temperature range

Supported range: 16 °C to 30 °C in 1 °C steps.

### Physical remote state tracking

If you also have an infrared receiver entity (from an IR blaster that can also listen), you can optionally select it during setup. When selected, the integration decodes signals from the physical Gree air conditioner remote and updates the entities to match, so the mode, fan speed, target temperature, and the turbo, panel light, and extra fan switches stay in sync.

## Gree Infrared automation examples

The following examples show how to automate a Gree air conditioner. For more ideas, refer to the climate platform [actions reference](/integrations/climate/#list-of-actions).

{% include docs/paste_yaml_tip.md %}

### Automation: Cooling the bedroom before bedtime

- **Trigger**: Time: 21:30
- **Condition**: Numeric state: **Home** zone is above 0
- **Action**: Set thermostat target temperature
  - **Target**: Gree AC (`climate.gree_ac`)
  - **Temperature**: 24
  - **HVAC mode**: Cool

{% details "YAML example for cooling the bedroom before bedtime" %}

{% example %}
automation: |
  alias: "Cool the bedroom before bedtime"
  triggers:
    - trigger: time
      at: "21:30:00"
  conditions:
    - condition: numeric_state
      entity_id: zone.home
      above: 0
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.gree_ac
      data:
        # Use 75 instead if Home Assistant uses Fahrenheit.
        temperature: 24
        hvac_mode: cool
{% endexample %}

{% enddetails %}

### Automation: Turning off the air conditioner when a window opens

- **Trigger**: Window opened
  - **Target**: Bedroom window (`binary_sensor.bedroom_window`)
- **Action**: Set thermostat HVAC mode
  - **Target**: Gree AC (`climate.gree_ac`)
  - **HVAC mode**: Off

{% details "YAML example for turning off the air conditioner when a window opens" %}

{% example %}
automation: |
  alias: "Turn off the air conditioner when the window opens"
  triggers:
    - trigger: window.opened
      target:
        entity_id: binary_sensor.bedroom_window
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.gree_ac
      data:
        hvac_mode: "off"
{% endexample %}

{% enddetails %}

## Known limitations

- The climate entity and the switches for the air conditioner use assumed state. Home Assistant cannot verify the actual state of the unit and instead tracks the last known state.
- Even with physical remote state tracking enabled, the receiver reports what the remote sent, not what the unit is actually doing, so the two can still drift apart, for example if something blocks the line of sight.
- Changing the target temperature or the fan speed while the air conditioner is off is remembered rather than sent. It is applied with the next command that turns the unit on.
- With physical remote state tracking, commands from the remote for a mode you did not select during setup are ignored, so the entity does not switch to a mode it cannot control.
- Every Gree command carries the whole state of the unit, so operating one entity also resends the others. Turning a switch on or off resends the current mode, target temperature, and fan speed, and changing the climate entity resends the turbo, panel light, and extra fan settings.
- Toggling a switch while the air conditioner is off does not turn the unit on. The frame that is sent carries the switch you changed along with the off state.
- A disabled entity does not remember its part of that state across a restart. If you disable the climate entity, toggling a switch sends the off state with the default mode, target temperature, and fan speed, which can turn a running unit off. With physical remote state tracking, this lasts until the receiver picks up the next command from the remote. Keep the climate entity enabled if you use the switches.

## Troubleshooting

### The climate entity does not update when I use the physical remote

If you use an ESPHome `remote_receiver` as your infrared receiver and the climate state does not update when you press buttons on the physical Gree remote, the receiver is probably splitting each command into two signals it cannot decode.

The Gree protocol sends each command as two IR frames separated by a gap of about 20.1 ms. The ESPHome `remote_receiver` component defaults to an `idle` timeout of 10 ms, which treats that gap as the end of a transmission and breaks the command into two separate signals.

To fix this, in your existing ESPHome `remote_receiver` configuration, set `idle` to about `25ms` so both frames are captured as a single signal:

```yaml
remote_receiver:
  idle: 25ms
```

### The air conditioner does not respond to commands

If the climate entity changes in Home Assistant but your air conditioner does not react, the infrared signal is probably not reaching the unit. Make sure the infrared emitter points at the receiver window of the unit and that nothing blocks the path between them. For more steps, refer to [The device does not respond to commands](/integrations/infrared/#the-device-does-not-respond-to-commands).

If the unit reacts to most commands but not to one mode, your model probably does not have that mode. Check your remote or the manual of your unit.

### Reporting an issue

If you need to report an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), then reload the integration. Reproduce the issue, disable debug logging, and attach the automatically downloaded debug log to your report.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
