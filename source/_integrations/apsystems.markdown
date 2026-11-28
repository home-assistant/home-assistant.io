---
description: Control and monitor your APsystems microinverters and energy storage systems locally without the cloud
ha_release: 2024.6
ha_domain: apsystems
---

The **APsystems** {% term integration %} supports two product lines, both over
their local API and without any cloud connection:

- The [APsystems EZ1](https://emea.apsystems.com/diy/ez1/) microinverter.
- The [APsystems Lake series](https://emea.apsystems.com/lake-6/), an energy storage
  system.

Add each device separately and pick the device generation that matches your
hardware in the setup form. The port defaults to 8050 for the EZ1 and to 80 for
the Lake series.

## EZ1 microinverters

It also allows you to set the output limit to anything above 30 watts.

### Sensors

#### Numerical sensors

| Sensor ID | Unit | Description
|---|---| ---|
| total_power | W | Total current output of the inverter
| lifetime_production_p1 | kWh | Lifetime production of first input
| lifetime_production_p2 | kWh | Lifetime production of second input
| lifetime_production | kWh | Lifetime production of both inputs combined
| total_power_p1 | W | Current input on first input
| total_power_p2 | W | Current input on second input
| today_production | kWh | Today's production of both inputs combined
| today_production_p1 | kWh | Today's production of first input
| today_production_p2 | kWh | Today's production of second input

#### Binary sensors

| Sensor ID  | Description
|---|---|
| off_grid_status | On when the inverter is not connected to the power grid
| dc_1_short_circuit_error_status | Short circuit detected on first input
| dc_2_short_circuit_error_status | Short circuit detected on second input
| output_fault_status | Output because of any error deactivated

### Settings

| Setting ID | Type | Description
|---|---|---|
| inverter_status | switch | Enables or disables the inverter's output
| output_limit | number | Sets the max output of the inverter

### Flash Endurance

There has been a discussion about the inverter's lifetime being shortened when using the `output_limit` setting excessively. APsystems officially confirmed this to me while also acknowledging that newer hardware versions don't have this issue, while older ones should be updated at most every 300 seconds. Newer inverters have a serial number starting with `Ex701` and thus aren't at risk of flash wear when setting the `output_limit` more frequently than every 300 seconds.

### Prerequisites

Make sure the local API is activated and set to **Continuously**. For that, connect to the inverter via Bluetooth using the app and go to **Settings** > **Local Mode**, set the switch **Enable Local Mode** to on, and make sure to set this to **Continuously**.

{% note %}
If **Settings** > **Local Mode** is not visible in the APsystems app, the device is probably still connected to the APsystems cloud.

To make **Settings** > **Local Mode** available:

1. Open the APsystems app on your mobile device.
2. Sign out of your APsystems cloud account in the app.
3. If the app specifically asks you to remove the device from the cloud so that you can use it locally, follow the on-screen steps.
4. After you are signed out, reconnect to the inverter directly via Bluetooth.

When you are connected via Bluetooth only, **Settings** > **Local Mode** should be visible in the app.
{% endnote %}

## Lake series energy storage

### Prerequisites

- The device is on the same network as Home Assistant and answers HTTP on port 80.
- The device is set up in the APsystems app. The integration reads and controls the
  device, it does not provision it.
- The behavior described below follows the vendor's *Local API V1.5.2*  
  (November 2026).

### Sensors

| Entity | Description
|---|---|
| Battery SOC | State of charge of the battery
| Battery Capacity | Capacity reported by the device
| Battery Temperature | Temperature of the battery cells
| Device Temperature | Temperature of the device itself
| Battery Side Power | Power flowing into or out of the battery
| On-grid Side Power | Power on the grid-connected side
| Off-grid Side Power | Power on the backup output
| Battery Accumulated Charge Energy | Total energy charged into the battery
| Battery Accumulated Discharge Energy | Total energy discharged from the battery
| On-grid Side Accumulated Input Energy | Total energy taken from the grid
| On-grid Side Accumulated Output Energy | Total energy fed into the grid
| Off-grid Side Accumulated Input Energy | Total energy taken from the backup output
| Off-grid Side Accumulated Output Energy | Total energy delivered to the backup output
| Battery Status | Idle, charging, discharging, heating, shutdown, no communication, or fault
| Signal Strength | Signal strength of the device's connection

A negative power value means the energy flows towards the grid or into the
battery; positive means it flows towards the house.

### Binary sensors

The 14 alarm entities report the flags the device sets: high and low
temperature, overvoltage and undervoltage, overcurrent, communication error,
internal error, shutdown, capacity calibration, grid abnormal, off-grid short
circuit, off-grid overcurrent, device system error, and device temperature
protection. They are all diagnostic entities.

### Controls

| Entity | Type | Description
|---|---|---|
| Device Operating Mode | select | AI, Self-consumption, Time-of-Use, or Backup
| Backup SOC | number | Lower state-of-charge limit for backup, 15-90 %
| Economy Mode | switch | Device power-saving mode
| Time-of-Use Plan | text | Schedule used when the operating mode is Time-of-Use
| Instant Manual Control | select | Charge, Discharge, or Standby
| Instant Manual Control Power | number | 20-2500 W
| Instant Manual Control Duration | number | 1-1440 minutes
| Send Instant Manual Control | button | Starts the one-time run
| Stop Instant Manual Control | button | Ends the one-time run

### Time-of-use plan

The schedule is exposed as a single `text` entity. The device stores it as an
array of rules whose number is not fixed, so each rule is one line of text
instead of a fixed set of entities.

Each rule has five fields, separated by `|`, and rules are separated by `;`:

```text
07:00-09:00|charge|1500|12345|1;17:00-21:00|discharge|2000|12345|1
```

| Field | Description
|---|---|
| Start and end | `HH:MM-HH:MM`, within the same day
| Function | `charge`, `discharge`, or `self` for self-consumption
| Power | `0`-`2500` W. Use `-` for self-consumption, which carries no power
| Weekdays | `1` is Monday and `7` is Sunday. Accepts `12345`, `1-5`, or `1,3,5`
| Enabled | `1` or `0`

Up to six rules fit into the entity state. The device itself accepts more, so
remove the least important rules first if you reach the limit.

If the value cannot be parsed, the entity rejects it and the plan on the device
stays unchanged. A power value on a self-consumption rule is dropped and
reported as a repair issue, because the device does not store one.

### Instant manual control

The three instant manual control entities only stage a request. Nothing is sent
to the device until **Send Instant Manual Control** is pressed, so a half-filled
request never restarts the run. A rejected request keeps the staged values; a
run that ends on its own clears them.

The integration reads the mode back after the request and reports an error if
the one-time run did not start, instead of showing a success that did not happen.

### Limitations

- **AI mode** can only be enabled from the APsystems app. It appears in the
  operating mode list so the entity matches the device, but selecting it reports
  an error.
- **No dashboard** is created. The entities are meant to be placed in your own
  dashboard.

{% include integrations/config_flow.md %}
