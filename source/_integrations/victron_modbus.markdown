---
title: Victron Modbus
description: Instructions on how to integrate a Victron energy meter or Victron P1Link with Home Assistant over Modbus.
ha_categories:
  - energy.meters_monitoring
ha_release: '2026.12'
ha_iot_class: Local Polling
ha_codeowners:
  - '@ldoes'
ha_domain: victron_modbus
ha_platforms:
  - sensor
ha_config_flow: true
ha_zeroconf: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Victron Modbus** {% term integration %} connects Home Assistant to a [Victron Energy](https://www.victronenergy.com/) energy meter or P1Link, and shows what your home is drawing from and returning to the grid. The device is read directly over your local network, so no cloud account or <abbr title="Victron Remote Monitoring">VRM</abbr> portal is involved.

An energy meter usually sits where your home connects to the grid, so it sees every watt going in or out. That makes it a natural source for:

- Putting your grid import and export on the [Energy dashboard](/docs/energy/). The meter's imported and exported energy totals are the grid consumption and return-to-grid figures the dashboard needs.
- Running appliances on surplus solar. When the meter reports that you are exporting, start the dishwasher, the washing machine, or a car charger, instead of selling that energy cheaply.
- Protecting your main fuse. The per-phase current shows how close each phase is to its limit, so you can hold back a heavy load before the fuse trips.

An energy meter can also measure a single part of your installation, such as a solar inverter or a heat pump. See [Meters that don't measure the grid](#meters-that-dont-measure-the-grid).

## Supported devices

The integration supports these Victron devices:

- VM-3P75CT: three-phase energy meter with current transformers of up to 75 A.
- VM-3P5A: three-phase energy meter for standard 5 A current transformers.
- P1Link: reads a smart meter through its P1 port.

During setup, the integration reads the device's product ID to detect which model it is, and its serial number to identify it.

## Unsupported devices

GX devices, such as the Cerbo GX, aren't supported. To read a GX device and everything connected to it, including the energy meters it reads, use the [Victron GX](/integrations/victron_gx/) integration. A meter that your GX device reads can be added to this integration as well: both can read it at the same time.

## Prerequisites

- The device needs to be connected to the same network as Home Assistant.
- Home Assistant needs to be able to reach the device over Modbus <abbr title="User Datagram Protocol">UDP</abbr> on port `502`.

{% include integrations/config_flow.md %}

If a device is discovered, confirm it when Home Assistant asks. To add a device by hand, for example when your network blocks discovery, enter its address. You can find the address in your router's list of connected devices.

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the device."
{% endconfiguration_basic %}

The model is detected automatically, so you don't need to select it. The device is listed under its model and serial number, such as **VM-3P75CT (HQ2345ABCDE)**, so you can tell several devices of the same model apart.

## Configuration options

The integration has no options to set after setup. If the device gets a different <abbr title="Internet Protocol">IP</abbr> address, for example after a router restart, Home Assistant updates it automatically the next time the device is discovered. If discovery doesn't work on your network, you can update the address yourself without removing and re-adding the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **Victron Modbus** integration.
2. Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Enter the new **Host**.
4. Select **Submit** to save the new settings.

The integration only accepts the new address if it leads to the same device.

## Supported functionality

### Sensors

The integration adds a sensor for each of the following readings that your device reports. Per-phase sensors are only added for the phases the device is configured for: on a single-phase installation, for example, only the L1 sensors are added.

- **Total power**: The power flowing through the meter, summed over all phases. It is positive while you draw power from the grid, and negative while you return power to it.
- **Total imported energy**: The meter's lifetime counter of energy drawn from the grid. Add this to the [Energy dashboard](/docs/energy/) as grid consumption.
- **Total exported energy**: The meter's lifetime counter of energy returned to the grid. Add this to the Energy dashboard as return to grid.
- **Frequency**: The grid frequency, in steps of 0.001 Hz if the meter's firmware provides that, and of 0.01 Hz otherwise. Only shown for the VM-3P75CT and VM-3P5A.
- **Voltage PE-N**: The voltage between protective earth and neutral, which stays close to 0 V in a healthy installation; a higher value points to an earthing fault. Only shown for the VM-3P75CT and VM-3P5A. This diagnostic sensor is disabled by default. To use it, enable it from the entity's settings.

For each phase, L1, L2, and L3, the integration also adds sensors named after the phase, such as **Voltage phase L1**:

- **Voltage phase**: The voltage of the phase.
- **Current phase**: The current through the phase.
- **Power phase**: The power flowing through the phase, positive while drawing from the grid.
- **Imported energy phase** and **Exported energy phase**: The lifetime energy counters of the phase.

These descriptions assume the meter measures the grid connection. For a meter in another place, imported means energy flowing through the meter in the direction it is installed for, and exported means energy flowing the other way.

### Meters that don't measure the grid

An energy meter can measure any part of your installation, for example the output of a solar inverter, a generator, or a single large load. The integration doesn't need to know where the meter is: its sensors are the same in every place. You decide what they mean when you add them to the [Energy dashboard](/docs/energy/):

- Grid connection: Under **Electricity grid**, add **Total imported energy** as grid consumption and **Total exported energy** as return to grid.
- Solar inverter: Under **Solar panels**, add the energy counter that increases while the inverter produces.
- Heat pump, car charger, or other load: Under **Individual devices**, add **Total imported energy**.

Which counter increases while a solar inverter produces depends on which way the meter is wired. To find out, check the **Total power** sensor in the middle of a sunny day. If it is negative, the inverter's production counts as exported energy, so add **Total exported energy** as solar production. If it is positive, add **Total imported energy**.

You can rename the device and its sensors to match their role, for example to `Solar inverter`. Renaming doesn't change the readings or their history.

## Victron Modbus automation examples

The entity IDs below are named after the device, so replace `vm_3p75ct` with your own device's name, such as `vm_3p5a` or `p1link`.

{% include docs/paste_yaml_tip.md %}

### Automation: run an appliance on surplus solar

Energy you return to the grid is usually worth far less than energy you buy. This automation starts the dishwasher once you have been returning more than 1.5 kW to the grid for 10 minutes, which is long enough to know it isn't a passing gap in the clouds.

- **Trigger**: **Total power** below -1500 for 10 minutes
- **Action**: Turn on switch
  - **Target**: Dishwasher

{% details "YAML example for running an appliance on surplus solar" %}

{% example %}
automation: |
  alias: "Dishwasher on surplus solar"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.vm_3p75ct_total_power
      below: -1500
      for:
        minutes: 10
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

### Automation: pause the car charger before a phase overloads

A car charger and an electric oven on the same phase can trip the main fuse. This automation turns the car charger off when the current on any phase stays above 23 A, a margin below a 25 A main fuse, for 30 seconds.

- **Trigger**: **Current phase L1**, **Current phase L2**, or **Current phase L3** above 23 for 30 seconds
- **Action**: Turn off switch
  - **Target**: Car charger

{% details "YAML example for protecting the main fuse" %}

{% example %}
automation: |
  alias: "Pause car charger on phase overload"
  triggers:
    - trigger: numeric_state
      entity_id:
        - sensor.vm_3p75ct_current_phase_l1
        - sensor.vm_3p75ct_current_phase_l2
        - sensor.vm_3p75ct_current_phase_l3
      above: 23
      for:
        seconds: 30
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.car_charger
{% endexample %}

{% enddetails %}

## Data updates

The **Victron Modbus** {% term integration %} {% term polling polls %} the power readings, total and per phase, every second, so they follow changes in your home almost immediately. That is useful for automations that react to surplus solar. The other readings, such as voltage, current, frequency, and the energy counters, change slowly and are polled every 10 seconds.

The power, the grid totals, and the phase readings are read separately. If one of them can't be read, only its sensors become unavailable until the next successful update. The energy counters are an exception: they keep their last value while the device is unreachable, so your energy statistics don't get gaps.

## Known limitations

- The integration only uses Modbus UDP on port `502`, with Modbus unit ID `1`. These are the settings the supported devices use.
- A device needs to report a serial number to be set up, because the integration uses it to recognize the device. Every device needs a unique serial number: two devices that report the same serial number can't both be added.
- Some meters announce themselves on more than one address, for example on Ethernet and on Wi-Fi. The integration keeps the address a device was set up with until that address stops answering.
- The sensors that are added, and the firmware features that are used, such as the grid frequency in steps of 0.001 Hz, are decided when the integration starts. If your installation changes, for example from a single-phase to a three-phase connection, or after you update the meter's firmware, reload the integration to pick up the changes. To do so, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Victron Modbus** integration, select the three-dot menu {% icon "mdi:dots-vertical" %}, and choose **Reload**. Sensors for readings the device no longer reports remain listed as unavailable until you remove them.

## Troubleshooting

If these steps don't help, [open an issue on GitHub](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&integration_name=Victron%20Modbus&integration_link=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Fvictron_modbus) and include the details listed for your symptom.

{% details "Can't connect to the device" %}

### Symptom: "Failed to connect"

When setting up the integration, the form shows the message "Failed to connect".

#### Description

The integration couldn't reach the device over Modbus UDP. The device may be off, its IP address may have changed, or something on your network may block UDP port `502`.

#### Resolution

1. Make sure the device is powered on and connected to your network.
2. Confirm the host is correct. If the device's IP address changed, [reconfigure the integration](#configuration-options) to update it.
3. Check that nothing on your network, such as a firewall or a separate network, blocks UDP port `502` between Home Assistant and the device.
4. If it still fails, include the model of the device in the issue report. If the integration is already added, also enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), reproduce the failure, and include the log.

{% enddetails %}

{% details "The device is not supported" %}

### Symptom: "The device at this address is not a supported Victron device"

When setting up the integration, the form shows the message "The device at this address is not a supported Victron device."

#### Description

The device answered, but reported a product ID that the integration doesn't know.

#### Resolution

Check that the device is one of the [supported devices](#supported-devices). If it is, include its model name and firmware version in the issue report.

{% enddetails %}

{% details "The device doesn't report a serial number" %}

### Symptom: "The device doesn't report a serial number, which is needed to recognize it"

When setting up the integration, the form shows the message "The device doesn't report a serial number, which is needed to recognize it."

#### Description

The integration recognizes a device by its serial number, so a device that reports an empty serial number can't be added.

#### Resolution

Include the model name and firmware version of the device in the issue report.

{% enddetails %}

{% details "Some sensors are unavailable" %}

### Symptom: Some sensors are unavailable while others still update

Some of the device's sensors show as unavailable, while the others keep updating.

#### Description

The device answered, but part of its readings couldn't be read.

#### Resolution

Enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), wait for the sensors to become unavailable, and include the log in the issue report. The log shows which part of the device failed to read.

{% enddetails %}

{% details "Sensors are briefly unavailable" %}

### Symptom: Sensors are briefly unavailable, or the device sometimes doesn't answer

Sensors go unavailable for a moment now and then. This happens most often when the device is connected over Wi-Fi.

#### Description

Modbus over UDP has no retransmission, and a Wi-Fi connection can lose requests. The integration repeats a request that times out up to three times, but on a poor connection even that can fail.

#### Resolution

1. If the device has an Ethernet port, connect it with a cable.
2. Improve the Wi-Fi signal at the device, or move the device or your access point closer together.
3. If it still happens, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), reproduce the problem, and include the log in your issue report.

While a reading is unavailable, the energy totals keep their last value, so your energy statistics don't get gaps.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
