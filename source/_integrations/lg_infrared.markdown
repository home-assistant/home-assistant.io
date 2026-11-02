---
description: Integration to control LG TVs and LG split air conditioners using an infrared emitter and to receive commands from an LG remote using an infrared receiver.
ha_release: 2026.4
ha_domain: lg_infrared
---

The **LG Infrared** {% term integration %} lets you control an LG TV or a compatible LG split air conditioner using any infrared emitter previously configured in Home Assistant. It can also receive commands from an LG remote when you have an infrared receiver set up, allowing you to use the remote to trigger automations in Home Assistant.

Because the integration communicates over infrared, it operates in a one-way, fire-and-forget fashion: commands are sent to the device but there is no feedback channel to confirm the current state. The integration therefore uses assumed states.

## How you can use the integration

After setup, you can control your LG TV or air conditioner from Home Assistant the same way you would with its remote, and make it part of your automations. For example, you can:

- Turn the air conditioner off when a window opens.
- Cool a room before you get home.
- Use spare buttons on your LG TV remote, like the color buttons, to control lights or run scenes.
- Keep using the physical air conditioner remote. With an infrared receiver, the climate entity follows the changes you make with it.

## Supported devices

The integration supports:

- LG TVs that can be controlled via the standard LG infrared protocol.
- Compatible LG split air conditioners that can be controlled via the standard LG air conditioner infrared protocol.

## Prerequisites

{% include integrations/infrared_controlled.md %}

To send commands, you need an infrared emitter. To capture commands from your LG remote, you also need an infrared receiver. For example, you can use an ESPHome device with an IR LED pointed at your LG device to send commands, and an IR receiver module to capture commands from your remote.

For an air conditioner, an infrared emitter is required. The **Air conditioner** option only appears once you have at least one infrared emitter available.

{% include integrations/config_flow.md %}

The first step asks which type of LG device you want to set up: **TV** or **Air conditioner**. The remaining options depend on that choice. To set up both, add the integration twice.

{% configuration_basic %}
Infrared emitter:
  description: "The infrared emitter entity to use for sending commands to your LG device. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR emitter. It is required for an air conditioner."
Infrared receiver:
  description: "The infrared receiver entity to use for receiving commands from your LG remote. This must be an entity provided by a hardware integration (such as ESPHome) that has already been set up with an IR receiver. For a TV, received commands are available as events you can use in automations. For an air conditioner, they keep the climate entity in sync with the physical remote."
Supported modes:
  description: "The operating modes your air conditioner supports. Select at least one of **Cool**, **Heat**, **Dry**, and **Fan only**. Check your remote or the manual of your unit to see which modes it has. Selecting a mode your unit does not have breaks nothing. Your air conditioner simply does not respond to it. This option is shown for an air conditioner only."
{% endconfiguration_basic %}

For a TV, select at least one of **Infrared emitter** or **Infrared receiver**. Select both if you want to be able to send commands to your TV and react to commands from the remote.

## Reconfiguring the integration

If you replace your infrared emitter, add a receiver later, or want to change the modes of your air conditioner, you can update the device without removing and re-adding the integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the **LG Infrared** integration and select it.
3. Next to the device you want to change, select the three dots {% icon "mdi:dots-vertical" %} menu and choose **Reconfigure**.
4. Change the options and select **Submit**.

The same rules as during setup apply: an air conditioner needs an infrared emitter, and a TV needs at least one infrared emitter or receiver. The device type cannot be changed. To switch between a TV and an air conditioner, add the integration again.

If you remove the infrared emitter or receiver from a TV, the entities that depend on it are no longer provided. For example, the media player and buttons need an emitter, and the events need a receiver. You can delete those entities from the entity settings. If you remove the mode your air conditioner is currently in, its climate entity shows **Off** until you select another mode.

## Supported functionality

### TV

#### Buttons

Button entities are created when an infrared emitter is configured. Each button sends the corresponding infrared command to the TV when pressed.

- **Power on**, **Power off**
- **HDMI 1**, **HDMI 2**, **HDMI 3**, **HDMI 4**
- **Input**
- **Up**, **Down**, **Left**, **Right**, **OK**
- **Back**, **Exit**, **Home**, **Menu**
- **Info**, **Guide**
- **0** through **9**

#### Events

An event entity is created when an infrared receiver is configured. It fires an event each time an LG TV remote command is received, so you can use the remote to trigger automations in Home Assistant.

- **Received command**
  - **Description**: Fires when a command from an LG TV remote is decoded from the infrared receiver. The fired event type matches the button pressed on the remote.
  - **Event types**:
    - Navigation: `back`, `exit`, `guide`, `home`, `info`, `list`, `menu`, `nav_down`, `nav_left`, `nav_right`, `nav_up`, `ok`, `settings`
    - Inputs and channels: `channel_down`, `channel_up`, `hdmi_1`, `hdmi_2`, `hdmi_3`, `hdmi_4`, `input`
    - Playback: `fast_forward`, `pause`, `play`, `rewind`, `stop`
    - Volume and audio: `mute`, `sap`, `subtitle`, `text`, `volume_down`, `volume_up`
    - Power: `power`, `power_off`, `power_on`
    - Number keys: `num_0` through `num_9`
    - Color buttons: `blue`, `green`, `red`, `yellow`
    - Other LG commands: `aspect`, `ez_adjust`, `in_start`
    - `unknown` for any LG command that is not recognized
  - **Remarks**: Only commands using the LG infrared address are processed. Signals from other remotes are ignored.

#### Media player

A media player entity is created when an infrared emitter is configured.

- **LG TV**
  - **Description**: Represents the LG TV and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, volume up, volume down, mute, channel up, channel down, play, pause, and stop.

### Air conditioner

A climate entity is created for each LG air conditioner device you set up.

- **LG AC**
  - **Description**: Represents the LG split air conditioner and allows you to control it via IR commands.
  - **Supported features**: Turn on, turn off, set HVAC mode, set fan mode, set swing mode, and set horizontal swing mode. Set target temperature is also available when **Cool** or **Heat** is one of the supported modes you selected during setup.

#### Supported modes

The climate entity offers the modes you selected during setup. Turning the air conditioner on resumes the mode it was last in, or the first mode you selected if it has not been on yet.

- **Cool**: Cools to a set temperature.
- **Heat**: Heats to a set temperature. Not all LG air conditioner models have it.
- **Dry**: Dehumidify mode. The temperature is fixed at 24 °C by the protocol.
- **Fan only**: Fan circulation without heating or cooling.

#### Fan speeds

- **Auto**: The unit selects the speed automatically.
- **Quiet**: Lowest noise level.
- **Low**: Low fan speed.
- **Medium low**: Between low and medium.
- **Medium**: Medium fan speed.
- **Medium high**: Between medium and high.
- **High**: High fan speed.

#### Swing modes

The climate entity has two independent swing controls, one for the vertical vanes and one for the horizontal vanes. Your air conditioner might not have both.

Vertical swing positions the airflow up or down:

- **Off**: The vanes stay in their current position.
- **Lowest**, **Low**, **Middle low**, **Middle high**, **High**, **Highest**: Fixed vane positions from the lowest to the highest.
- **Swing**: The vanes move up and down continuously.

Horizontal swing positions the airflow left or right:

- **Off**: The vanes stay in their current position.
- **Left**, **Middle left**, **Middle**, **Middle right**, **Right**: Fixed vane positions from left to right.
- **Left half**, **Right half**: The vanes swing in the left or right half of the range.
- **Swing**: The vanes move left and right continuously.

#### Temperature range

Supported range: 16 °C to 30 °C in 1 °C steps.

#### Buttons

When an infrared emitter is configured, these button entities are created for the air conditioner. Each button sends a single infrared command. The protocol has no separate on and off codes for these features, so they are buttons rather than switches.

- **Jet mode**: Runs the unit at maximum power for fast cooling or heating.
- **Eco mode**: Reduces the unit's power draw. Some remotes label this button Diet.
- **Viraat mode**: Runs an extra boost mode, separate from **Jet mode**. Only LG India models offer it, so this button is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity). Enable it if your remote has a Viraat button.
- **AI mode**: Turns on the automatic AI operating mode.

To turn one of these modes off, select any other mode, such as **Cool**.

- **Toggle light**: Turns the unit's display light on or off.
- **Toggle beep**: Turns the unit's confirmation sound on or off.
- **Start Wi-Fi pairing**: Puts the unit into Wi-Fi pairing mode.
- **Diagnose**: Triggers the unit's self-diagnosis routine.
- **Toggle vertical swing**: Switches the vertical vanes between swing and off. This button is disabled by default because the climate entity's swing mode control offers the same feature with more positions. Enable it only if your model does not respond to the swing mode control.

#### Select

When an infrared emitter is configured, an **Energy limit** select entity is created for each configured air conditioner. It caps the unit's power draw at a percentage of its maximum.

- **Off**: No limit.
- **40%**, **60%**, **80%**: Cap the power draw at the selected percentage.

#### Switches

When an infrared emitter is configured, these switch entities are created for the air conditioner. Each uses a separate infrared code to turn the feature on or off.

- **Ion generator**: Turns the ionizer or plasma air-purifying feature on or off.
- **Auto clean**: Turns the self-cleaning drying cycle on or off.

#### Physical remote state tracking

If you also have an infrared receiver entity (from an IR blaster that can also listen), you can optionally select it during setup. When selected, the integration decodes signals from the physical LG air conditioner remote and updates the climate entity to match, so the mode, fan speed, target temperature, and swing modes stay in sync.

## LG Infrared automation examples

The following examples show how to automate an LG TV and an LG air conditioner. For more ideas, refer to the media player [actions reference](/integrations/media_player/#list-of-actions) and the climate platform [actions reference](/integrations/climate/#list-of-actions).

{% include docs/paste_yaml_tip.md %}

### Automation: Toggling the lights with the red button on the TV remote

- **Trigger**: Event received
  - **Target**: LG TV received command (`event.lg_tv_received_command`)
  - **Event type**: Red
- **Action**: Toggle light
  - **Target**: Living room (`light.living_room`)

{% details "YAML example for toggling the lights with the red button" %}

{% example %}
automation: |
  alias: "Toggle the living room lights with the red button"
  triggers:
    - trigger: event.received
      target:
        entity_id: event.lg_tv_received_command
      options:
        event_type:
          - red
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room
{% endexample %}

{% enddetails %}

### Automation: Turning off the air conditioner when a window opens

- **Trigger**: Window opened
  - **Target**: Living room window (`binary_sensor.living_room_window`)
- **Action**: Set thermostat HVAC mode
  - **Target**: LG AC (`climate.lg_ac`)
  - **HVAC mode**: Off

{% details "YAML example for turning off the air conditioner when a window opens" %}

{% example %}
automation: |
  alias: "Turn off the air conditioner when the window opens"
  triggers:
    - trigger: window.opened
      target:
        entity_id: binary_sensor.living_room_window
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.lg_ac
      data:
        hvac_mode: "off"
{% endexample %}

{% enddetails %}

## Known limitations

- The TV media player and button entities use assumed state, meaning Home Assistant cannot verify the actual state of the TV. Commands received from the physical remote are exposed as events only and do not update the TV entity state.
- The climate entity for the air conditioner also uses assumed state, even with physical remote state tracking enabled. The receiver reports what the remote sent, not what the unit is actually doing, so the two can still drift apart, for example if something blocks the line of sight.
- Turning on and turning off the TV both send the same IR power toggle command, as is standard with infrared remotes.
- Volume control for the TV is step-based only; there is no way to set an absolute volume level.
- For the air conditioner, the dry mode temperature is fixed at 24 °C by the LG air conditioner infrared protocol and cannot be changed. Fan only mode has no target temperature at all. Changing the target temperature in either mode is remembered for the next time you switch to cool or heat, but nothing is sent to the unit.
- Changing the fan speed while the air conditioner is off is also remembered rather than sent. It is applied with the next command that turns the unit on.
- The air conditioner button entities each send a single command and have no state. The unit does not report whether a feature is currently on or off, so features like **Jet mode** or **Eco mode** cannot be shown as active.
- The **Energy limit** select for each air conditioner also uses assumed state. It sends a discrete infrared code, but Home Assistant cannot confirm that the unit received it, so the shown option reflects the last command sent.
- The air conditioner switch entities also use assumed state. Each sends a discrete infrared code, but Home Assistant cannot confirm that the unit received it, so the shown state reflects the last command sent.

## Troubleshooting

### The TV or air conditioner does not respond to commands

If the entity changes in Home Assistant but your TV or air conditioner does not react, the infrared signal is probably not reaching the device. Make sure the infrared emitter points at the receiver window of the device and that nothing blocks the path between them. For more steps, refer to [The device does not respond to commands](/integrations/infrared/#the-device-does-not-respond-to-commands).

If your air conditioner reacts to most commands but not to one mode or button, your model probably does not have that feature. Check your remote or the manual of your unit.

### The event entity does not fire when I press a button on the TV remote

The event entity only fires for commands it receives from an LG TV remote. Signals from other remotes, including universal remotes set to another brand, are ignored.

1. Make sure you selected an infrared receiver for the TV during setup. You can't add one later. Remove the TV from the integration and add it again with the receiver selected.
2. Check that the infrared receiver entity updates when you press a button. If it does not, refer to [An infrared receiver does not pick up signals](/integrations/infrared/#an-infrared-receiver-does-not-pick-up-signals).

### Reporting an issue

If you need to report an issue, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), then reload the integration. Reproduce the issue, disable debug logging, and attach the automatically downloaded debug log to your report.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
