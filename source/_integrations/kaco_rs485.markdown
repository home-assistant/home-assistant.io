---
title: KACO RS485
description: Instructions on how to integrate KACO Powador solar inverters with Home Assistant over RS485.
ha_category:
  - Energy
ha_release: '2026.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@g4bri3lDev'
ha_domain: kaco_rs485
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: hub
ha_quality_scale: silver
---

The **KACO RS485** {% term integration %} connects Home Assistant to [KACO new energy](https://kaco-newenergy.com/) Powador solar inverters over their RS485 serial bus and shows what they are producing. These inverters have no network port and no cloud service, so the serial bus is the only way to read them.

Up to 32 inverters can share one bus, and they're all set up together.

## Use cases

Powador inverters of this generation predate network connectivity. Without the serial bus, the only way to see what they are producing is to walk up to each one and read its display. The KACO RS485 integration reads the bus for you: it puts each inverter's production on the Energy dashboard, lets you run appliances while there is surplus, and tells you the same day when an inverter stops producing.

## Supported devices

KACO Powador inverters that use the KACO serial protocol, which covers the xi range, including the Powador 6400xi and 8000xi.

Newer KACO inverters, including the blueplanet, TL3, and NX3 families, speak a different protocol on the same wire. They aren't supported here; use the [KACO Modbus](/integrations/kaco_modbus/) integration instead. If nothing but these answers during setup, Home Assistant reports which addresses they are. If they share a bus with supported inverters, they are skipped without comment.

## Prerequisites

- An RS485 connection between the inverters and Home Assistant. This can be a USB RS485 adapter plugged into the machine running Home Assistant, or an [ESPHome](/integrations/esphome/) device configured as a serial proxy, which lets the inverters be somewhere else on your network.
- Every inverter needs its own address in the range 1 to 32. The address is set on the inverter itself, in its display menu under **Inverter address**.
  - On inverters offering both RS232 and RS485, the **Interface** menu entry must be set to RS485 first.
  - Don't confuse this with the **Sym-Bus** address, which is a separate setting in the same menu, also numbered 1 to 32, used for phase balancing between inverters. Setting that one has no effect here.
- Nothing else may be polling the bus. RS485 allows a single controller, and a second one corrupts everyone's traffic. If a KACO data logger, such as a Powador-proLOG, is attached, disconnect it first.

{% include integrations/config_flow.md %}

Home Assistant asks for the serial port and then scans the bus for inverters. The scan asks all 32 addresses, so it takes a while on a bus with few inverters on it: every address with nothing attached costs a reply timeout.

{% note %}
These inverters are powered by their solar panels. After dusk they stop answering entirely, so run setup in daylight.
{% endnote %}

{% configuration_basic %}
Port:
  description: "The serial port the inverters are wired to. The list shows the ports Home Assistant has detected, including USB adapters and ESPHome serial proxies."
{% endconfiguration_basic %}

Every inverter the scan finds is added. To leave one out, disable its device after setup, which also removes it from the polling cycle.

## Supported functionality

Each inverter on the bus becomes its own device, named for the model it reports and its address, for example **KACO Powador 6400xi (1)**.

### Sensors

- **AC power**: The power the inverter is currently feeding into the grid.
- **Daily yield**: Energy produced since midnight, in watt-hours. This is the one to add to the [Energy dashboard](/docs/energy/); see [Add production to the Energy dashboard](#add-production-to-the-energy-dashboard) below.
- **Total yield**: The inverter's lifetime energy counter, in kilowatt-hours.
- **Status**: What the inverter is currently doing, such as MPP tracking, waiting, or one of its fault conditions.

## Examples

### Add production to the Energy dashboard

Add each inverter's **Daily yield** as a solar production source, following [integrating your solar panels](/docs/energy/solar-panels/).

Use **Daily yield** rather than **Total yield**. Both are energy counters read from the inverter itself, so neither needs a Riemann sum, but their resolution differs by a factor of a thousand. Daily yield is reported in watt-hours. Total yield is reported in whole kilowatt-hours with no decimals, so on a 6400xi it advances about once per hour of good sun, which quantizes the dashboard's hourly bars to 1 kWh and flattens the morning ramp.

Total yield does survive Home Assistant being down, where a daily counter loses any day Home Assistant missed. If that matters more to you than intraday resolution, use Total yield instead.

## Data updates

The **KACO RS485** {% term integration %} {% term polling polls %} every inverter on the bus every 30 seconds.

Requests are spaced one second apart, including between inverters. The hardware requires this: transmitting while a slow reply is still on the wire corrupts the request that follows it. Each inverter therefore costs about two seconds of every cycle, so disabling one you don't need shortens the cycle for the rest.

## Known limitations

These inverters don't report a serial number, so Home Assistant identifies the bus by its serial port. This means:

- The same port can only be added once.
- If the adapter or proxy changes, you have to remove the integration and add it again. Local USB adapters are stored by their stable `/dev/serial/by-id` path, so replugging one into a different socket is fine.

Inverter settings can't be changed from Home Assistant. The integration only reads.

## Troubleshooting

### No inverters answered during setup

1. Check the time of day. These inverters go completely silent after dusk and answer nothing until the sun is back on the panels.
2. Check that the A and B wires aren't swapped, which is the most common wiring fault and produces the same silence.
3. Check each inverter has an address set, in its display menu.
4. Disconnect any data logger on the same bus. Two controllers can't share it.

### An inverter is unavailable while the others are fine

The inverter stopped answering its polls. Overnight this is expected and it comes back by itself in the morning. During the day, check that its address is still set and unique: two inverters sharing an address answer over each other and neither can be read reliably.

### The port can't be opened

For a USB adapter, check it's still plugged in. For an ESPHome serial proxy, check the device is online.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
