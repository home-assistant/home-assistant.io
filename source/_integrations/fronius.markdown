---
title: Fronius
description: Instructions on how to connect your Fronius SolarAPI devices to Home Assistant.
ha_release: 0.96
ha_category:
  - Binary sensor
  - Energy
  - Sensor
ha_codeowners:
  - '@farmio'
ha_config_flow: true
ha_domain: fronius
ha_iot_class: Local Polling
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_dhcp: true
ha_integration_type: hub
ha_quality_scale: platinum
---

The **Fronius** {% term integration %} polls a [Fronius](https://www.fronius.com/) solar inverter or datalogger for details of a Fronius SolarNet setup and integrate it in your Home Assistant installation.

## Supported devices

The integration supports all inverters with integrated Datamanager or external "Datalogger Web" providing the Fronius SolarAPI (JSON) interface of version `v0` or `v1`. This includes among others:

- Agilo
- Eco
- Galvo
- Gen24
- IG Plus
- Primo
- Symo
- Symo Hybrid
- Tauro
- Verto (Plus) 

Devices connected to those inverters or dataloggers are supported as well.

- Energy meter (Fronius Smart Meter or S0 meter connected to the inverter)
- Ohmpilot
- Storage

## Prerequisites

You should either set a static IP or assign a static DHCP lease for the Fronius device, or alternatively access it through the local DNS name if your network is configured accordingly.

{% note %}
For Gen24 devices (delivered with Firmware >= 1.14.1) make sure to activate "Solar API" in the inverters web interface. For older devices, Solar API should be enabled by default.
{% endnote %}

## Configuration

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The host name or the IP address of the device."
    required: true
    type: string
Modbus port:
    description: "The port of the device's Modbus TCP interface. Only used when Modbus is enabled on the device, see [Modbus TCP](#modbus-tcp). The default is `502`."
    required: false
    type: integer
{% endconfiguration_basic %}

## Monitored data

Each device adds a set of sensors to Home Assistant.

- SolarNet device
  
  - Logger information

    General information about the Fronius Datalogger. Not available on "Gen24" devices.
    Updated every hour.

    - Serial number, software and hardware platforms
    - Current price of energy consumed and returned to grid and the CO₂ factor as set in the Dataloggers settings

  - Power flow

    Cumulative data of the SolarNet system.
    Updated every 10 seconds.

    - Energy produced on the current day, year and total produced energy
    - Power fed to the grid (if positive) or consumed from the grid (if negative)
    - Power load as a generator (if positive) or consumer (if negative)
    - Battery charging power (if positive) or discharging power (if negative)
    - Whether the battery is in standby, on Gen24 devices with a battery
    - Whether the system is currently supplying backup power during a grid outage, on Gen24, Tauro, and Verto devices with backup power configured
    - Photovoltaic production
    - Current relative self-consumption of produced energy
    - Current relative autonomy

- Inverter

  The energy produced on the current day, year (not for Gen24 devices), and total produced energy, power, current, voltage, frequency, and status for an individual inverter.
  Updated every minute.

- Meter

  Detailed information about power, current, and voltage, if supported, split among the phases.
  Updated every minute.

- Ohmpilot

  Detailed information about energy, power, and temperature of your Ohmpilots.
  Updated every minute.

- Storage

  Detailed information about current, voltage, state, cycle count, capacity and more about installed batteries.
  Updated every minute.

When an endpoint is not responding correctly the update interval will increase to 10 minutes (3 minutes for power flow) until valid data is received again. This reduces the number of requests to Fronius devices using night mode (shutdown when no PV power is produced).

## Modbus TCP

Most Fronius devices also provide a Modbus TCP interface using the [SunSpec](https://sunspec.org/) information models. It exposes per-string (MPP tracker) data that the Solar API does not, so the integration reads it in addition when it is available.

Modbus is optional. If it isn't enabled, or the inverter is powered down, no Modbus entities are created and the rest of the integration is unaffected. The integration checks again every hour, so entities appear on their own once the device answers.

To enable it on the device's web interface:

- Gen24, Tauro, and Verto: go to **Communication** > **Modbus** and turn on the Modbus TCP server.
- Devices with a Datamanager: go to **Settings** > **Modbus** and set **Data output via Modbus** to **TCP**. One Datamanager serves every inverter in its SolarNet ring.

{% note %}
Leave the data format setting (**float** or **int + SF**) as it is. The integration detects it automatically.
{% endnote %}

These entities are added per inverter and updated every minute:

- `MPPT <n> DC power` and `MPPT <n> DC energy` for each MPP tracker.
- `MPPT <n> DC current` and `MPPT <n> DC voltage` for each MPP tracker. Disabled by default.
- `PV energy total`: lifetime energy from the photovoltaic strings only, measured on the DC side.
- `Battery charging energy total` and `Battery discharging energy total`: on hybrid inverters that expose their battery as dedicated MPP trackers, such as Gen24 with a battery.

### Controlling the inverter over Modbus

Modbus is the only interface that lets Home Assistant change settings on the inverter; the Solar API is read-only. These setpoints are added as `number` entities, and appear under **Configuration** on the inverter's device page:

- `Power limit`: caps the inverter's output, as a percentage of its nominal power output.
- `Battery charge power limit` and `Battery discharge power limit`: cap how fast the battery may charge or discharge, as a percentage of its maximum rate.
- `Battery minimum reserve`: the state of charge the battery is not discharged below.

{% important %}
Writing has to be allowed on the device first. Go to **Communication** > **Modbus** (Gen24, Tauro, and Verto) or **Settings** > **Modbus** (Datamanager), and turn on **Inverter control via Modbus**.

Until it is, the inverter rejects every write, and the integration creates no control entities at all rather than ones that fail when used. Turn it on, then reload the integration.
{% endimportant %}

The limits are only applied while they are active, so setting one activates it. `100 %` is what "no limit" means to the device: setting a limit back to `100 %` releases it.

{% note %}
The inverter decides which control source wins. If **IO control** or **Dynamic power reduction** has a higher priority than Modbus in the DNO Editor, the inverter may refuse or ignore what Home Assistant sends.
{% endnote %}

#### The battery limits are power, not a charge level

`Battery charge power limit` limits charging _power_. It is not a "charge to 80 %" setting. The inverter exposes no maximum state of charge over Modbus at all; only the minimum reserve.

A charge ceiling can be built as an automation instead, using the battery's state of charge sensor and the charge power limit:

```yaml
automation:
  - alias: "Stop charging the battery at 80%"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.byd_battery_box_premium_hv_state_of_charge
        above: 80
    actions:
      - action: number.set_value
        target:
          entity_id: number.gen24_battery_charge_power_limit
        data:
          value: 0
  - alias: "Allow charging the battery again below 75%"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.byd_battery_box_premium_hv_state_of_charge
        below: 75
    actions:
      - action: number.set_value
        target:
          entity_id: number.gen24_battery_charge_power_limit
        data:
          value: 100
```

Discharging is limited by its own setpoint, so the battery still supplies the house while charging is held at `0 %`. Because the limit is held by Home Assistant rather than the inverter, the battery charges normally again if Home Assistant stops running.

## Energy dashboard

Recommended [energy dashboard](/docs/energy/) configuration:

- For _"Solar production"_:
  - If no battery is connected to an inverter: Add each inverters `Energy total` entity.
  - If a battery is connected to an inverter: Use [Riemann sum](/integrations/integration/) over `SolarNet Power photovoltaics` entity.
- _"Battery systems"_ energy values aren't supported directly by the Solar API. Use [Riemann sum](/integrations/integration/) to integrate `SolarNet Power battery charge` and `SolarNet Power battery discharge` into energy values (kWh).
- For _"Devices"_ use the Ohmpilots `Energy consumed` entity.

{% important %}
The [Modbus TCP](#modbus-tcp) energy values are measured on the DC side, at the MPP trackers.

`PV energy total` is the energy the panels delivered, before inverter conversion losses, so it reads higher than the inverter's `Energy total`, which is the AC energy actually fed out. For _"Solar production"_, prefer the AC value. That is the energy you can use or sell.

`Battery charging energy total` and `Battery discharging energy total` are DC values measured at the battery. They are counters read from the device rather than values integrated over time, so they don't drift and are unaffected by Home Assistant restarts. For the same reason, they don't exactly match a Riemann sum of `SolarNet Power battery charge` and `SolarNet Power battery discharge`.
{% endimportant %}

The energy meter integrated with Fronius devices can be installed (and configured) in two different installation positions: _"feed in path"_ (grid interconnection point) or _"consumption path"_.

### Feed in path meter

Recommended energy dashboard configuration for meter location in feed in path:

- For _"Grid consumption"_ use the meters `Energy real consumed` entity.
- For _"Return to grid"_ use the meters `Energy real produced` entity.

### Consumption path meter

Recommended energy dashboard configuration for meter location in consumption path:

1. Use [Riemann sum](/integrations/integration/) to integrate `SolarNet Power grid import` and `SolarNet Power grid export` entities into energy values (Wh or kWh).
2. Use these energy entities for `Grid consumption` and `Return to grid` in the energy dashboard configuration.

## Example automation

The following {% term automation %} toggles a switch when the solar production crosses certain thresholds:

```yaml
description: "Turn on switch when PV power is above 1000 W and turn it off below 50 W."
mode: single
triggers:
  - trigger: state
    entity_id:
      - sensor.solarnet_power_photovoltaics
conditions: []
actions:
  - choose:
      - conditions:
          - condition: numeric_state
            entity_id: sensor.solarnet_power_photovoltaics
            above: 1000
        sequence:
          - action: switch.turn_on
            metadata: {}
            data: {}
            target:
              entity_id: switch.swtest
      - conditions:
          - condition: numeric_state
            entity_id: sensor.solarnet_power_photovoltaics
            below: 50
        sequence:
          - action: switch.turn_off
            metadata: {}
            data: {}
            target:
              entity_id: switch.swtest

```

## Note

Fronius often provides firmware updates for the datamanager interfaces and the devices in their system, it's recommended to check and apply them regularly. This integration relies on functionality present in rather recent firmware.

## Known limitations

The Solar API is read-only, so everything this integration changes on a device goes over [Modbus TCP](#modbus-tcp), and only what the SunSpec models expose: the output power limit and the battery charge, discharge, and reserve setpoints. Every setpoint is a percentage. Fronius exposes no absolute watt setting, and no maximum state of charge.

Details about Modbus registers can be found in the device documentation or at the [Fronius website](https://www.fronius.com/).

## Troubleshooting

### Can’t set up the device

- Make sure the device is not in a power-saving mode when currently not producing energy.
- Make sure the device is connected to the network and is reachable from the Home Assistant instance.
- Check the device's settings to ensure that the **Solar API** is enabled.

### Some devices are missing after setup or restart of Home Assistant

- Make sure inverters are not in a power-saving mode when currently not producing energy - or wait until they start producing energy.

### Some entities are missing after setup

Some data, like photovoltaic production, is only provided by the Fronius device when non-zero.
When the integration is added at night, there might be no entities added providing photovoltaic related data. Entities will be added on sunrise, when the Fronius devices begin to provide more data.

### No power limit or battery setpoints

These are the `number` entities described under [Modbus TCP](#modbus-tcp).

- Check that **Inverter control via Modbus** is enabled on the device's web interface, under the same **Modbus** settings where Modbus TCP is turned on. Without it the inverter rejects every write, so the integration doesn't offer the entities.
- Reload the integration after changing the setting.

### No MPPT, PV energy, or battery energy entities

These come from the device's [Modbus TCP](#modbus-tcp) interface.

- Check that Modbus TCP is enabled on the device's web interface.
- Check that the Modbus port configured in Home Assistant matches the device. Reconfigure the integration to change it.
- Make sure the inverter is not in a power-saving mode. An inverter that is powered down doesn't answer, and the entities are added once it wakes up.

## Removing the integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
