---
description: Instructions on how to integrate Exicom Spin EV chargers over Bluetooth Low Energy with Home Assistant.
ha_release: "2026.11"
ha_domain: exicom_spin_ble
---

The **Spin EV Charger** {% term integration %} connects Home Assistant to [Exicom](https://www.exicom.in/) Spin EV chargers over Bluetooth Low Energy.

The charger is read directly through Home Assistant's [Bluetooth](/integrations/bluetooth) stack. There is no cloud service and no vendor account involved.

## Supported devices

The following device has been verified to work with this integration:

- Exicom Spin AC wall charger

The charger advertises its serial number as its Bluetooth name, in the form `123456789012_ab12`. Some units advertise it with a leading space, which Home Assistant ignores when matching.

## Prerequisites

- A Bluetooth adapter or an [ESPHome Bluetooth proxy](https://esphome.io/projects/?type=bluetooth) in range of the charger. The proxy must have active connections enabled, because the charger is read over a GATT connection rather than from its advertisements.
- No other Bluetooth client connected to the charger during setup. The charger accepts **one Bluetooth client at a time**, so close the vendor phone app before adding the integration.

{% include integrations/config_flow.md %}

Home Assistant discovers chargers that are in range and advertising. If your charger is not offered automatically, add the integration manually and pick it from the list of discovered devices. Setup connects to the charger and reads a value from it, so a charger that is out of range or already claimed by another client cannot be added.

## Configuration options

{% configuration_basic %}
Bluetooth connection:
  description: "How the integration uses the charger's single Bluetooth slot. **Reconnect each poll** (the default) gives the slot up between polls, which leaves the vendor phone app usable. **Stay connected** holds the slot for Home Assistant, which makes polling faster and less prone to failure, but locks every other client out of the charger, the phone app included."
{% endconfiguration_basic %}

Changing this option reloads the integration.

## Supported functionality

### Sensors

The integration creates the following sensors:

- **State**: What the charger is doing. One of *Available*, *Starting up*, *Starting*, *Charging*, *Paused by vehicle*, *Paused by charger*, *Finishing*, *Idle*, *Fault*, or *Out of service*.
- **Power**: Power currently being delivered, in watts (W).
- **Current**: Current currently being delivered, in amperes (A).
- **Session energy**: Energy delivered during the current or most recent charging session, in kilowatt-hours (kWh). This value resets when a new session starts.
- **Lifetime energy**: Total energy the charger has delivered over its life, in kilowatt-hours (kWh). Use this sensor when adding the charger to the [Energy dashboard](/home-energy-management).

### Binary sensors

- **Plug**: On while a vehicle is plugged in. The charger cannot tell while it is starting up or out of service, so the sensor is off then.
- **Problem**: On while the charger reports at least one active alarm, such as a mains fault or an open earth wire.

### Switches

- **Charging**: Starts and stops a charging session. The switch is on while a session is open, including while it is paused by the vehicle or by the charger, since a paused session resumes without a command. A vehicle must be plugged in for charging to start.

## Data updates

The integration {% term polling polls %} the charger over Bluetooth. The interval follows what the charger is doing:

- Every 60 seconds while a charging session is open, which includes sessions paused by the vehicle or by the charger, since those can resume without a command.
- Every 5 minutes otherwise, so that a slot handed back between polls leaves the phone app long uncontested stretches.

The charger is also read again about 2 seconds after a command, once it has had time to report the new state. The interval is not configurable. Entities become unavailable when the charger cannot be reached, for example when it is out of range or another Bluetooth client holds its slot.

## Known limitations

### Bluetooth connections

- The charger accepts only **one Bluetooth client at a time**. While Home Assistant is talking to it, the vendor phone app cannot connect, and vice versa. Which side wins in between polls is what the **Bluetooth connection** option decides.
- Each charger needs a free active connection slot on the Bluetooth adapter or proxy that reaches it. A charger set to **Reconnect each poll** only uses a slot while it is being read, while a charger set to **Stay connected** occupies one for as long as it is configured.

### Charger control

- Setting the charging current is not supported.
- The charger refuses to start charging with no vehicle plugged in, and refuses to stop when no session is open. The charger does not say why it refused, so Home Assistant shows the same error for every refusal.
- A command needs the charger's Bluetooth slot, the same as a poll. While the vendor phone app holds the slot, commands fail.

## Troubleshooting

{% details "No charger is found during setup" %}

### Symptom: "No Spin EV charger was found over Bluetooth"

Setup reports that no charger was found.

#### Resolution

To resolve this issue, try the following steps:

1. Check that the charger is powered on.
2. Close the vendor phone app, and stop any other tool that may be connected to the charger.
3. Confirm the charger appears in **Settings** > **Connectivity** > **Bluetooth** > **Advertisement monitor**, with a name in the form `123456789012_ab12`.
4. Move an ESPHome Bluetooth proxy closer to the charger, or place a local Bluetooth adapter near it.
5. Make sure the proxy has active connections enabled. A passive-only adapter can see the charger advertise but cannot read from it.

{% enddetails %}

{% details "The charger cannot be connected to" %}

### Symptom: "Failed to connect"

Setup finds the charger but fails to read from it.

#### Description

Another Bluetooth client already holds the charger's single slot, or the charger is at the edge of range.

#### Resolution

To resolve this issue, try the following steps:

1. Close the vendor phone app and try again.
2. Check **Settings** > **Connectivity** > **Bluetooth** > **Connection monitor** and confirm the adapter or proxy has a free active connection slot.
3. Move the charger, the proxy, or the adapter so they are closer together.

{% enddetails %}

{% details "The charger refuses to start or stop charging" %}

### Symptom: "The charger refused the command"

Turning the **Charging** switch on or off reports that the charger refused the command.

#### Resolution

To resolve this issue, try the following steps:

1. To start charging, check that the vehicle is plugged in and that the **State** sensor does not show *Starting up*.
2. To stop charging, check that the **State** sensor shows a session in progress. If no session is open, there is nothing to stop.

{% enddetails %}

{% details "The sensors become unavailable" %}

### Symptom: All charger sensors show as unavailable

The charger was set up successfully, but its sensors later become unavailable.

#### Resolution

To resolve this issue, try the following steps:

1. Check whether the vendor phone app, or another client, is connected to the charger. It is holding the slot that Home Assistant needs.
2. Verify that the adapter or proxy that reaches the charger still has free active connection slots.
3. If the charger is reached through a proxy at the edge of its range, move the proxy closer, or prefer an Ethernet-connected proxy.
4. Set the **Bluetooth connection** option to **Stay connected**, which keeps the slot claimed rather than competing for it at every poll.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
