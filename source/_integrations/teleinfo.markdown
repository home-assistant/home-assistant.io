---
title: Teleinfo
description: Read electricity consumption data from French Linky smart meters using the Télé-Information Client (TIC) protocol.
ha_release: 2026.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@esciara'
ha_domain: teleinfo
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: silver
ha_category: []
---

The **Teleinfo** {% term integration %} reads data from the French electricity metering system known as Télé-Information Client (TIC). This protocol is used by Linky smart meters and older electronic meters deployed by [Enedis](https://www.enedis.fr/), the French electricity distribution network operator.

By connecting a Teleinfo USB adapter to your meter's TIC output, you can monitor real-time electricity consumption data directly in Home Assistant. This includes energy indexes for each tariff period, apparent power, instantaneous current, and tariff information. All data is read locally from the serial port, with no cloud dependency.

## Supported devices

### Meters

- Linky smart meters (deployed by Enedis in France) with the TIC output enabled in historique mode
- Older electronic meters with TIC output (pre-Linky) in historique mode

### USB adapters

The integration auto-discovers the following USB adapters:

- **FTDI FT2232** (USB VID:PID `0403:6015`): GCE Electronics Teleinfo USB, Cartelectronic
- **Silicon Labs CP2102** (USB VID:PID `10C4:EA60`): Various Teleinfo USB dongles

You can also manually configure any serial adapter connected to the meter's TIC output.

## Prerequisites

Before setting up this integration, make sure you have the following:

1. A Linky meter (or compatible electronic meter) with the TIC output enabled.
2. A Teleinfo USB adapter connected to the meter's TIC terminals (I1 and I2).
3. The USB adapter plugged into your Home Assistant host.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Serial port:
    description: "The path to the serial port connected to the Teleinfo USB adapter (for example, `/dev/ttyUSB0` or a `/dev/serial/by-id/` path)."
{% endconfiguration_basic %}

## Supported functionality

The **Teleinfo** integration provides the following {% term entities %}.

### Sensors

The sensors created depend on your electricity contract type. The integration automatically detects your contract and creates only the relevant sensors.

#### Common sensors (all contracts)

- **Apparent power** (`PAPP`)
  - **Description**: Instantaneous apparent power (VA).
  - **Device class**: `apparent_power`

- **Instantaneous current** (`IINST`)
  - **Description**: Instantaneous current draw (A). Disabled by default.
  - **Device class**: `current`

- **Current tariff period** (`PTEC`)
  - **Description**: The active tariff period code.

#### Base contract

- **Base index** (`BASE`)
  - **Description**: Total energy index (Wh). Total increasing counter.
  - **Device class**: `energy`

#### HC (Heures Creuses) contract

- **Off-peak index** (`HCHC`)
  - **Description**: Energy index for off-peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **Peak index** (`HCHP`)
  - **Description**: Energy index for peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

#### EJP contract

- **Normal hours index** (`EJPHN`)
  - **Description**: Energy index for normal hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **Peak mobile hours index** (`EJPHPM`)
  - **Description**: Energy index for peak mobile hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **EJP warning** (`PEJP`)
  - **Description**: Minutes before the next EJP peak period. Disabled by default.
  - **Device class**: `duration`

#### Tempo (BBR) contract

- **Blue day off-peak index** (`BBRHCJB`)
  - **Description**: Energy index for blue day off-peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **Blue day peak index** (`BBRHPJB`)
  - **Description**: Energy index for blue day peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **White day off-peak index** (`BBRHCJW`)
  - **Description**: Energy index for white day off-peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **White day peak index** (`BBRHPJW`)
  - **Description**: Energy index for white day peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **Red day off-peak index** (`BBRHCJR`)
  - **Description**: Energy index for red day off-peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **Red day peak index** (`BBRHPJR`)
  - **Description**: Energy index for red day peak hours (Wh). Total increasing counter.
  - **Device class**: `energy`

- **Tomorrow color** (`DEMAIN`)
  - **Description**: The Tempo color for the next day. Disabled by default.

## Examples

### Energy dashboard

You can add the energy index sensors to the energy dashboard to track your electricity consumption over time:

1. Go to {% my energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Electricity grid** > **Consumption**, select **Add consumption**.
3. Select the appropriate index sensors based on your tariff. For the Tempo tariff, add all six index sensors (blue, white, and red day peak and off-peak).

### Automation: high power alert

```yaml
- alias: "High power consumption alert"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.teleinfo_XXXXXXXXXXXX_apparent_power
      above: 6000
  actions:
    - action: notify.mobile_app_<device_name>
      data:
        title: "High power usage"
        message: "Apparent power is above 6000 VA"
```

### Automation: tomorrow's Tempo color

{% raw %}
```yaml
- alias: "Notify tomorrow's Tempo color"
  triggers:
    - trigger: time
      at: "18:00:00"
  conditions:
    - condition: not
      conditions:
        - condition: state
          entity_id: sensor.teleinfo_XXXXXXXXXXXX_tomorrow_color
          state: "unknown"
  actions:
    - action: notify.mobile_app_<device_name>
      data:
        title: "Tempo color tomorrow"
        message: >-
          Tomorrow is a
          {{ states(
            'sensor.teleinfo_XXXXXXXXXXXX_tomorrow_color'
          ) }} day
```
{% endraw %}

## Data updates

The **Teleinfo** integration {% term polling polls %} data from the serial port every 10 seconds. Each poll opens the serial port at 1200 baud (historique mode), reads a complete Teleinfo frame, and decodes the label-value pairs using the `pyteleinfo` library.

If no data is received or the frame is incomplete within the 10-second timeout, the entities become unavailable until the next successful read.

## Known limitations

### Historique mode only
 
Only the legacy 1200 baud historique TIC mode is supported. The newer "standard" mode (9600 baud) available on some Linky meters is not yet implemented.

### Single-phase only

The integration reads single-phase Teleinfo labels. Three-phase installations are not supported.

## Troubleshooting

### Serial port not found

- Make sure the USB adapter is plugged in. You can verify by checking for `/dev/ttyUSB*` or `/dev/serial/by-id/` devices.
- If you are using Home Assistant OS, the device should be automatically passed through. For container installations, make sure the device is mapped (for example, `--device=/dev/ttyUSB0`).

### Permission denied on serial port

- The user running Home Assistant needs read access to the serial device.
- On Linux, add the user to the `dialout` group: `sudo usermod -aG dialout homeassistant`.
- Restart Home Assistant after changing group membership.

### Timeout waiting for Teleinfo data

- Make sure the meter's TIC output is enabled (contact Enedis if needed).
- Check the wiring between the meter's I1/I2 terminals and the USB adapter.
- If your adapter has a mode switch, verify it is set to historique mode (1200 baud).

### "Failed to decode Teleinfo frame" error

This typically indicates corrupted data on the serial line. Check for electrical interference or loose connections, and try using a shorter cable between the meter and the adapter.

### USB device not auto-detected

Only FTDI FT2232 (`0403:6015`) and Silicon Labs CP2102 (`10C4:EA60`) adapters are auto-discovered. For other adapters, use the manual configuration flow and enter the serial port path directly.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
