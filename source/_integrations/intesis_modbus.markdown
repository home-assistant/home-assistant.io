---
description: Instructions on how to integrate air conditioners connected to an Intesis Modbus gateway into Home Assistant.
ha_release: 2026.12
ha_domain: intesis_modbus
related:
  - url: https://www.intesis.com
    title: Intesis
  - docs: /integrations/serial/#setting-up-a-serial-connection-in-home-assistant
    title: Setting up a serial connection in Home Assistant
  - docs: /integrations/climate/
    title: Climate
---

The **Intesis Modbus** {% term integration %} lets you control an air conditioner that is connected to an [Intesis](https://www.intesis.com) Modbus gateway. The gateway is wired to the air conditioner's own control bus and makes the unit available over Modbus RTU. Home Assistant talks to the gateway locally over a serial connection, without a cloud service.

Use case: Turn the air conditioner on and off, and change its mode, target temperature, and fan speed from Home Assistant, for example to lower the temperature at night or when nobody is home.

## Supported devices

The following devices are known to be supported by the integration:

- Intesis INMBSMHI001R000, the Modbus RTU gateway for a single Mitsubishi Heavy Industries indoor unit

## Unsupported devices

The following devices are not supported by the integration:

- Intesis Modbus gateways for other air conditioner brands (INMBSDAI001R000, INMBSPAN001R000, INMBSTOS001R000, INMBSLGE001R000, INMBSHIT001R000, and INMBSSAM001R000). The integration recognizes them during setup and stops with a message naming the brand.
- Intesis Modbus gateways for multiple indoor units, such as INMBSMHI048O000 and INMBSMHI128O000
- Intesis gateways that use the IntesisHome cloud. Use the [IntesisHome](/integrations/intesishome/) integration for those.

## Prerequisites

{% include integrations/serial_connected.md %}

- The gateway's EIA-485 port is wired to an RS-485 adapter.
- You know how the DIP switches on the gateway are set. The gateway only reads them when it powers up, so power it off and on again after changing one.
  - **Modbus slave address** (SW3): a number from 1 to 63. The factory default is 1.
  - **Baud rate** (SW3 and SW4): the factory default is 9600. The gateway always uses 8 data bits, no parity, and 2 stop bits.
  - **Temperature format** (SW4): degrees Celsius, tenths of a degree Celsius, or degrees Fahrenheit. The integration detects this setting.
  - **Termination resistor** (SW4): turn it on when the gateway is at the end of the RS-485 line.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Serial port:
    description: "The serial port of the RS-485 adapter that the gateway is wired to."
Baud rate:
    description: "The speed set on the DIP switches of the gateway. The factory default is `9600`."
Modbus unit ID:
    description: "The Modbus slave address set on the DIP switches of the gateway. The factory default is `1`."
Unit has a swing vane:
    description: "Whether the indoor unit has a motorized vane. The gateway can't report this, so the option is prefilled based on the vane position the gateway last reported. Turn it off for a unit without a vane, and the climate entity won't offer swing modes."
{% endconfiguration_basic %}

## Supported functionality

The **Intesis Modbus** integration provides the following entities.

### Climate

- **Air conditioner**
  - **Description**: Controls the indoor unit connected to the gateway. You can turn it on and off and set the mode, the target temperature, the fan speed, and the swing mode. It also shows the current temperature measured by the unit.
  - **Modes**: Heat/cool, heat, dry, fan only, and cool. Heat/cool is the automatic mode of the unit, which heats or cools as needed to reach the target temperature.
  - **Fan speeds**: Auto, low, medium, and high. Units with four fan speeds also offer powerful.
  - **Swing modes**: Swing and positions 1 to 4. Only available if you selected **Unit has a swing vane** during setup.
  - **Remarks**: The target temperature is limited to the range the unit reports, typically 16&nbsp;°C to 30&nbsp;°C. Home Assistant always works in degrees Celsius with the gateway, whatever temperature format the gateway uses, and shows temperatures in the unit of your Home Assistant settings.

## Intesis Modbus automation examples

Because the air conditioner is a regular climate entity, you can use it in any automation that works with thermostats.
Here is an idea to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Lowering the temperature at night

Heating a room less at night saves energy. This automation lowers the target temperature of the air conditioner every evening.

- **Trigger**: Time: at 22:00
- **Action**: Set thermostat target temperature
  - **Target**: Living room air conditioner (`climate.living_room_air_conditioner`)
  - **Target temperature**: 18

{% details "YAML example for lowering the temperature at night" %}

{% example %}
automation: |
  alias: "Lower the living room temperature at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.living_room_air_conditioner
      data:
        temperature: 18
{% endexample %}

{% enddetails %}

## Data updates

The **Intesis Modbus** integration {% term polling polls %} the gateway every 15 seconds. After you change a setting from Home Assistant, the integration reads the gateway again right away.

Changes made with the remote controller of the air conditioner show up in Home Assistant after the next poll.

## Known limitations

- The gateway doesn't report whether the unit is currently heating or cooling. The climate entity shows the selected mode, but not the current activity.
- The integration doesn't discover gateways. You need to add each gateway manually.
- The integration doesn't support gateways reached through Modbus TCP.
- The integration never changes the Modbus slave address or the baud rate of the gateway. Change them with the DIP switches.

## Troubleshooting

{% details "Can't set up the gateway" %}

### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect".

#### Description

Home Assistant didn't receive an answer from the gateway on the selected serial port.

#### Resolution

1. Make sure the gateway is powered on.
2. Check the RS-485 wiring. If the A and B wires are swapped, the gateway doesn't answer.
3. Make sure the **Baud rate** and **Modbus unit ID** match the DIP switches of the gateway.
4. Make sure the termination resistor is on if the gateway is at the end of the RS-485 line.

### Symptom: "The serial port is already in use with other settings"

When trying to set up the integration, the form shows this message.

#### Description

Another integration already uses the same serial port with a different baud rate. All devices on one RS-485 line have to use the same settings.

#### Resolution

Set the **Baud rate** to the one the other devices on that line use, and set the DIP switches of the gateway to match.

### Symptom: "The gateway is still starting up"

When trying to set up the integration, the form shows a message that the gateway is still starting up.

#### Description

After it powers up, the gateway needs about two minutes before it reports any values. Until then, the integration can't detect the temperature format the gateway uses.

#### Resolution

Wait a few minutes, then submit the form again.

### Symptom: "This is a ... gateway"

Setup stops with a message that names another air conditioner brand.

#### Description

The gateway identified itself as a model for a brand that the integration doesn't support yet.

#### Resolution

There is no workaround. Refer to the list of [supported devices](#supported-devices).

### Symptom: "The device on this port did not identify itself as a supported Intesis gateway"

Setup stops with this message.

#### Description

A device answered on the serial port, but it isn't a supported gateway. This happens with gateways for multiple indoor units, or when the **Modbus unit ID** belongs to another device on the same line.

#### Resolution

1. Make sure the **Modbus unit ID** is the address of the gateway.
2. Check that your gateway is in the list of [supported devices](#supported-devices).

{% enddetails %}

{% details "The air conditioner shows as unknown or unavailable" %}

### Symptom: The climate entity is unknown after the gateway powers up

After a power cut or after power cycling the gateway, the climate entity has no state and shows no temperatures.

#### Description

The gateway needs about two minutes to start up. During that time, it doesn't report any values yet.

#### Resolution

Wait a few minutes. The values appear on their own.

### Symptom: The climate entity is unavailable

The climate entity is unavailable, either all the time or from time to time.

#### Description

The gateway stopped answering. Home Assistant keeps trying, and the entity becomes available again as soon as the gateway answers.

#### Resolution

1. Make sure the gateway is powered on.
2. Check the RS-485 wiring and the termination resistor.
3. Make sure the RS-485 adapter is still connected to the system that runs Home Assistant.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
