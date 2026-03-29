# Teleinfo Integration Documentation

## High-Level Description

The **Teleinfo** integration reads data from the French electricity metering system known as **Télé-Information Client (TIC)**. This protocol is used by **Linky** smart meters (and older electronic meters) deployed by **Enedis**, the French electricity distribution network operator.

The integration connects to a Teleinfo USB adapter plugged into the meter's TIC output and reads real-time electricity consumption data, including energy indexes for each tariff period, apparent power, instantaneous current, and tariff information.

This is a **local polling** integration — all data is read directly from the serial port with no cloud dependency.

## Installation Instructions

### Prerequisites

1. A **Linky meter** (or compatible electronic meter) with the TIC output enabled.
2. A **Teleinfo USB adapter** connected to the meter's TIC terminals (I1 and I2).
3. The USB adapter plugged into the Home Assistant host.

### Setup via USB Discovery

1. Plug the Teleinfo USB adapter into a USB port on your Home Assistant host.
2. Home Assistant will automatically detect supported USB devices (FTDI FT2232 `0403:6015` or Silicon Labs CP2102 `10C4:EA60`).
3. A discovery notification will appear — click **Configure** and confirm the setup.

### Setup via Manual Configuration

1. Go to **Settings > Devices & Services > Add Integration**.
2. Search for **Teleinfo**.
3. Enter the **serial port** path (e.g., `/dev/ttyUSB0` or a `/dev/serial/by-id/` path).
4. The integration will attempt to read a Teleinfo frame to validate the connection.

## Removal Instructions

1. Go to **Settings > Devices & Services**.
2. Find the **Teleinfo** integration entry.
3. Click the three-dot menu and select **Delete**.
4. The integration and all associated entities will be removed.

## Configuration Parameters

This integration has no configurable options after setup. The polling interval and serial settings are determined by the integration.

## Installation Parameters

| Parameter | Description |
|-----------|-------------|
| **Serial port** | The path to the serial port connected to the Teleinfo USB adapter (e.g., `/dev/ttyUSB0` or `/dev/serial/by-id/usb-...`). |

## Data Update

The integration polls the serial port every **10 seconds** to read a complete Teleinfo frame. Each poll:

1. Opens the serial port at **1200 baud** (historique mode), 7-bit, even parity.
2. Waits for a **STX** (0x02) byte marking the start of a frame.
3. Reads until **ETX** (0x03) marking the end of the frame.
4. Decodes the frame using the `pyteleinfo` library to extract label-value pairs.

A **10-second overall timeout** is enforced to prevent blocking. If no data is received or the frame is incomplete, the coordinator raises `UpdateFailed` and entities become unavailable.

## Examples

### Energy Dashboard

Add the energy index sensors to the **Energy Dashboard** for tracking electricity consumption:

1. Go to **Settings > Dashboards > Energy**.
2. Under **Electricity Grid > Consumption**, click **Add Consumption**.
3. Select the appropriate index sensors based on your tariff:
    - **Tempo tariff**: Add all six index sensors (blue/white/red day, peak/off-peak).
4. The dashboard will display consumption over time by tariff period.

### Automation: High Power Alert

```yaml
automation:
  - alias: "High power consumption alert"
    trigger:
      - platform: numeric_state
        entity_id: sensor.teleinfo_XXXXXXXXXXXX_apparent_power
        above: 6000
    action:
      - service: notify.mobile_app
        data:
          title: "High Power Usage"
          message: "Apparent power is above 6000 VA"
```

### Automation: Tomorrow's Tempo Color

```yaml
automation:
  - alias: "Notify tomorrow's Tempo color"
    trigger:
      - platform: time
        at: "18:00:00"
    condition:
      - condition: not
        conditions:
          - condition: state
            entity_id: sensor.teleinfo_XXXXXXXXXXXX_tomorrow_color
            state: "unknown"
    action:
      - service: notify.mobile_app
        data:
          title: "Tempo Color Tomorrow"
          message: "Tomorrow is a {{ states('sensor.teleinfo_XXXXXXXXXXXX_tomorrow_color') }} day"
```

## Known Limitations

- **Tempo tariff only**: The integration currently only supports the **Tempo** tariff option (BBR). Other tariff options (Base, HC/HP, EJP) are not yet supported.
- **Historique mode only**: Only the legacy 1200 baud "historique" TIC mode is supported. The newer "standard" mode (9600 baud) available on some Linky meters is not yet implemented.
- **Single-phase only**: The integration reads single-phase Teleinfo labels. Three-phase installations are not supported.
- **Synchronous serial I/O**: Serial port reads are performed in an executor thread. The `pyteleinfo` library does not support async I/O natively.

## Supported Devices

### Meters

- **Linky smart meters** (deployed by Enedis in France) with the TIC output enabled in historique mode.
- **Older electronic meters** with TIC output (pre-Linky) in historique mode.

### USB Adapters

The integration auto-discovers the following USB adapters:

| Adapter Chip | USB VID:PID | Examples |
|-------------|-------------|----------|
| FTDI FT2232 | `0403:6015` | GCE Electronics Teleinfo USB, Cartelectronic |
| Silicon Labs CP2102 | `10C4:EA60` | Various Teleinfo USB dongles |

Any serial adapter connected to the meter's TIC output can also be configured manually.

## Supported Functions

### Teleinfo Labels Read

| Teleinfo Label | Sensor | Description |
|---------------|--------|-------------|
| `ADCO` | — | Meter identifier (used as device unique ID) |
| `BBRHCJB` | Index: blue day off-peak | Energy index for blue day off-peak hours (Wh) |
| `BBRHPJB` | Index: blue day peak | Energy index for blue day peak hours (Wh) |
| `BBRHCJW` | Index: white day off-peak | Energy index for white day off-peak hours (Wh) |
| `BBRHPJW` | Index: white day peak | Energy index for white day peak hours (Wh) |
| `BBRHCJR` | Index: red day off-peak | Energy index for red day off-peak hours (Wh) |
| `BBRHPJR` | Index: red day peak | Energy index for red day peak hours (Wh) |
| `PAPP` | Apparent power | Instantaneous apparent power (VA) |
| `IINST` | Instantaneous current | Instantaneous current draw (A) |
| `PTEC` | Current tariff period | Active tariff period code |
| `DEMAIN` | Tomorrow color | Tempo color for the next day |

### Sensor Types

- **Energy sensors** (6): Total increasing counters for each tariff/period combination. Device class: `energy`, unit: Wh.
- **Apparent power** (1): Instantaneous measurement. Device class: `apparent_power`, unit: VA.
- **Current** (1): Instantaneous measurement. Device class: `current`, unit: A.
- **Tariff period** (1): Text sensor showing the current tariff period code.
- **Tomorrow color** (1): Text sensor showing the Tempo color for the next day.

## Troubleshooting

### Serial Port Not Found

- Verify the USB adapter is plugged in: `ls /dev/ttyUSB*` or `ls /dev/serial/by-id/`.
- Check `dmesg` for USB detection messages.
- If using Home Assistant OS, the device should be automatically passed through. For container installs, ensure the device is mapped (e.g., `--device=/dev/ttyUSB0`).

### Permission Denied on Serial Port

- The user running Home Assistant needs read access to the serial device.
- On Linux, add the user to the `dialout` group: `sudo usermod -aG dialout homeassistant`.
- Restart Home Assistant after changing group membership.

### Timeout Waiting for Teleinfo Data

- Ensure the meter's TIC output is enabled (contact Enedis if needed).
- Check wiring between the meter's I1/I2 terminals and the USB adapter.
- Verify the adapter is set to historique mode (1200 baud) if it has a mode switch.

### "Failed to Decode Teleinfo Frame" Error

- This typically indicates corrupted data on the serial line.
- Check for electrical interference or loose connections.
- Try a shorter cable between the meter and the adapter.

### USB Device Not Auto-Detected

- Only FTDI FT2232 (`0403:6015`) and Silicon Labs CP2102 (`10C4:EA60`) adapters are auto-discovered.
- For other adapters, use the manual configuration flow and enter the serial port path directly.

## Use Cases

- **Energy monitoring**: Track real-time and historical electricity consumption through the Energy Dashboard.
- **Tariff tracking**: Monitor which Tempo tariff period is active and plan consumption accordingly.
- **Cost optimization**: Use the tomorrow color sensor to shift high-consumption tasks (laundry, heating) to blue (cheapest) days.
- **Power alerts**: Set up automations to notify when apparent power exceeds thresholds, helping avoid breaker trips.
- **Consumption analysis**: Use the six energy indexes to compare peak vs. off-peak usage across blue, white, and red Tempo days.
