---
description: Instructions on how to integrate an E3/DC home power station with Home Assistant over Modbus TCP.
ha_release: "2026.12"
ha_domain: e3dc
---

The **E3/DC** {% term integration %} connects Home Assistant to an E3/DC home power station from HagerEnergy over Modbus TCP. It reads the power flows between solar, battery, house, grid and wallboxes.

## Use cases

- Seeing where your power goes. Solar production, battery charging and discharging, house consumption and grid import and export are all live sensors.
- Running appliances on surplus solar. Start a heavy load once the solar power exceeds what the house uses.
- Noticing when backup power is not ready. The emergency power sensor shows whether the house would stay powered in a grid failure.

## Supported devices

The integration supports E3/DC home power stations whose Modbus interface uses the E3/DC protocol ("Simple Mode"), such as the S10 E, S10 E PRO, S10 X, S20 X PRO and E3/DC one, and the systems running the Q10 and P10 firmware lines.

## Unsupported devices

The SunSpec protocol mode of the Modbus interface is not supported. E3/DC systems reached only over the RSCP protocol are not supported either.

## Prerequisites

1. On the power station, go to **Main menu** > **Smart Functions** > **Smart Home** > **Modbus**.
2. Turn **Modbus** on, and set **Protocol** to **E3DC**.
3. Note the port. The default is `502`.

The power station answers Modbus requests only from devices in its own subnet.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the power station."
Port:
  description: "The Modbus TCP port set in the power station's Smart Home menu. The default is `502`."
{% endconfiguration_basic %}

{% note %}
Home Assistant can share a Modbus connection between integrations. Another integration that already talks to the same power station shares the connection instead of opening a second one.
{% endnote %}

## Supported functionality

### Sensors

The power station device has these sensors:

- **PV power**, **Battery power**, **House power**, **Grid power**, **Additional feeder power**, **Wallbox power** and **Wallbox solar power**, in watts. Battery power is positive while charging. Grid power is positive while importing and negative while feeding in.
- **Battery**: the battery's state of charge.
- **Self-sufficiency** and **Self-consumption**, in percent.
- **Emergency power**: whether emergency power is active, inactive, not available or not supported. On the S10 E and S10 E PRO, **Motor switch off** means the emergency power motor switch is not in its on position.

## Data updates

The integration polls the power flows every 5 seconds.

## Known limitations

The power station has no energy counters over Modbus. To use it on the Energy dashboard, create [Integral](/integrations/integration/) helpers from the power sensors.

## Troubleshooting

### The device is not an E3/DC power station

Setup reports this when register 40001 does not hold the E3/DC identifier. Check that **Protocol** is set to **E3DC** in the power station's **Smart Home** > **Modbus** menu, not **SUN_SPEC**.

### Failed to connect

- Check that Modbus is turned on and the port matches.
- Check that Home Assistant is in the same subnet as the power station.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service_steps.md %}

After removing the integration, turn Modbus off in the power station's **Smart Home** menu if nothing else uses it.
