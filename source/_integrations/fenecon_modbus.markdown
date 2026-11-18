---
title: Fenecon Modbus
description: Instructions on how to integrate a FENECON energy management system (FEMS) with Home Assistant over Modbus TCP.
ha_categories:
  - energy.solar_batteries
ha_release: 2026.12
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@Tomson124'
ha_domain: fenecon_modbus
ha_platforms:
  - sensor
ha_integration_type: device
---

The **Fenecon Modbus** {% term integration %} connects Home Assistant to your [FENECON](https://fenecon.de) home battery system over your own network. It reads the FENECON energy management system (FEMS), which is based on the open source energy management platform [OpenEMS](https://openems.io), through its Modbus TCP interface. There is no account, no password, and no cloud service involved, so your readings keep arriving in Home Assistant even when your internet connection is down.

The FEMS knows how much power your solar panels produce, how full your battery is, what your home consumes, and what you take from or send to the grid. This integration brings all of that into Home Assistant every 10 seconds.

## Use cases

- **Putting your whole system on the [Energy dashboard](#energy-dashboard).** Solar production, grid import and export, and battery charge and discharge all come from one device.
- **Seeing your power flow as it happens.** Readings arrive every few seconds, which is fast enough to react to a cloud passing over your roof.
- **Running appliances on your own power.** An automation can start the washing machine or the dishwasher when you are sending a lot of power to the grid, instead of at a fixed time.
- **Noticing when something is wrong.** The FEMS reports warnings and faults, so an automation can tell you on the same day.

## Supported devices

This integration has been tested with the following systems:

- FENECON Home 10

Any FENECON system with a FEMS that offers the read-only Modbus TCP interface should work, whether or not it is listed.

## Prerequisites

The FEMS only answers Modbus TCP requests when the **FEMS App Modbus/TCP lesend** (the read-only Modbus TCP app) is installed and active on it. This app is an add-on that you can get through FENECON or your installer. Once it is active, the FEMS listens on port `502`.

You also need the hostname or IP address of the FEMS. Giving it a fixed address in your router keeps Home Assistant pointed at the right device.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your FEMS. For example, `192.168.1.100`. You can find it in your router."
Port:
  description: "The port the FEMS listens on for Modbus TCP requests. The default is `502`."
Unit ID:
  description: "The Modbus unit ID of your FEMS. The default is `1`. You only need to change this if the Modbus TCP app on your FEMS was set up with another ID."
{% endconfiguration_basic %}

## Supported functionality

Your FEMS is added as a device, named after its model, such as **FENECON Home 10**. Home Assistant reads the serial number of the FEMS during setup and uses it to recognize the system. The device page also shows the OpenEMS version the FEMS runs.

The integration only reads data. It does not change any setting on your FEMS.

### Sensors

The power sensors follow the OpenEMS sign convention:

- **Battery power** is positive while the battery discharges, and negative while it charges.
- **Grid power** is positive while you take power from the grid, and negative while you send power to it.

The following sensors are enabled by default:

- **System state**: The overall state the FEMS reports: **OK**, **Info**, **Warning**, or **Fault**. In automations and templates, a state goes by its own value, so **Fault** is `fault`.
- **Grid mode**: Whether the system is connected to the grid: **On-grid**, **Off-grid**, or **Off-grid with generator**. In automations and templates, these are `on_grid`, `off_grid`, and `off_grid_genset`.
- **Battery**: How full the battery is, as a percentage.
- **Battery power**: The power flowing into or out of the battery right now.
- **Battery AC discharge power**: The power the battery system delivers on its AC side right now. Negative while it charges.
- **Grid power**: The power exchanged with the grid right now.
- **Production power**: The total power your solar installation produces right now.
- **AC production power** and **DC production power**: The production split into AC-coupled and DC-coupled sources. A system with only DC-coupled solar panels shows `0` for AC production.
- **Consumption power**: The power your home consumes right now.
- **Battery charge energy** and **Battery discharge energy**: The total AC energy charged into and discharged from the battery.
- **Battery DC charge energy** and **Battery DC discharge energy**: The total DC energy charged into and discharged from the battery.
- **Grid import energy** and **Grid export energy**: The total energy taken from and sent to the grid.
- **Production energy**, **AC production energy**, and **DC production energy**: The total energy produced, and the same split into AC-coupled and DC-coupled sources.
- **Consumption energy**: The total energy your home has consumed.
- **Battery capacity**: The usable capacity of your battery. This is a diagnostic sensor.

The following sensors are added, but disabled. They are useful for a detailed look at your installation, and there are a lot of them, so they stay out of the way until you need them. To use one, [enable it](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity) in the entity's settings.

- **Battery power L1**, **Battery power L2**, and **Battery power L3**: The battery power per phase.
- **Grid power L1**, **Grid power L2**, and **Grid power L3**: The grid power per phase.
- **AC production power L1**, **AC production power L2**, and **AC production power L3**: The AC production power per phase.
- **Consumption power L1**, **Consumption power L2**, and **Consumption power L3**: The consumption per phase.
- **Battery reactive power**: The reactive power of the battery system.
- **Grid peak import power** and **Grid peak export power**: The highest power the FEMS has recorded for taking power from the grid and for sending power to it. Peak export power is shown as a negative value.
- **Production peak power**: The highest production the FEMS has recorded.
- **Consumption peak power**: The highest consumption the FEMS has recorded.
- **Off-grid time**: The total time the system has run without a grid connection.
- **System time**: The current time of the FEMS.

## Energy dashboard

Your FEMS provides everything the [Energy dashboard](/docs/energy/) needs.

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Electricity grid**, select **Add grid connection**.
   - For **Grid consumption**, select the **Grid import energy** sensor.
   - For **Return to grid**, select the **Grid export energy** sensor.
3. Under **Solar panels**, select **Add solar production**.
   - For **Solar production energy**, select the **Production energy** sensor.
   - For **Solar production power**, select the **Production power** sensor. This one is optional, and it is what the live power flow card uses to show your production as it happens.
4. Under **Home battery storage**, select **Add battery system**.
   - For **Energy charged into the battery**, select the **Battery charge energy** sensor.
   - For **Energy discharged from the battery**, select the **Battery discharge energy** sensor.
   - For **Battery state of charge sensor**, select the **Battery** sensor.
5. Select **Save**.

## Fenecon Modbus automation examples

Your FEMS knows at every moment where your power comes from and where it goes. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Get a notification when the FEMS reports a fault

A battery system in the basement is easy to forget about. This automation sends a notification as soon as the FEMS reports a fault, so you find out on the same day.

- **Trigger**: State changed
  - **Entity**: FENECON Home 10 System state
  - **To**: Fault
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a fault notification" %}

{% example %}
automation: |
  alias: "FEMS fault"
  triggers:
    - trigger: state
      entity_id: sensor.fenecon_home_10_system_state
      to: "fault"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Your FENECON system reports a fault.
{% endexample %}

{% enddetails %}

### Automation: Run the dishwasher on your own solar power

Appliances that do not care when they run are an easy way to use your own production instead of sending it to the grid. This automation starts the dishwasher once you have been sending more than 2 kW to the grid for ten minutes. Because grid power is negative while you send power to the grid, the threshold is below `-2000`.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: FENECON Home 10 Grid power
  - **Below**: `-2000`
  - **For at least**: `00:10:00`
- **Action**: Turn on switch
  - **Target**: Dishwasher switch

{% details "YAML example for running the dishwasher on solar power" %}

{% example %}
automation: |
  alias: "Dishwasher on solar power"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.fenecon_home_10_grid_power
      below: -2000
      for: "00:10:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

## Data updates

The **Fenecon Modbus** integration {% term polling polls %} all data from the FEMS every 10 seconds. The model, serial number, and OpenEMS version are read once when the integration starts.

If the FEMS does not answer, all {% term entity entities %} become unavailable until it answers again. Home Assistant does not keep showing the last known reading as if it were current.

## Known limitations

- The integration is read-only. It cannot change settings on the FEMS or control the battery.
- The connection settings cannot be changed after setup. If the address of your FEMS changes, refer to [The FEMS has a new IP address](#the-fems-has-a-new-ip-address).
- Which values are filled in depends on your installation. For example, a system without AC-coupled solar shows `0` for the AC production sensors, and a single-phase system does not report values per phase.

## Troubleshooting

{% details "The FEMS cannot be reached" %}

### Symptom: "Failed to connect"

When trying to set up the integration, the form shows the message "Failed to connect", or an entry that worked becomes unavailable and stays that way.

#### Description

Nothing answers on the address and port the integration uses. The FEMS may be off the network, or the Modbus TCP app may not be active.

#### Resolution

1. Make sure the FEMS is powered on and reachable on your network, for example by looking it up in your router.
2. Check that the **FEMS App Modbus/TCP lesend** is installed and active on your FEMS. If you are not sure, ask FENECON or your installer.
3. Check the port. The default is `502`.

{% enddetails %}

{% details "The device does not provide the OpenEMS Modbus/TCP interface" %}

### Symptom: The form reports that the device does not provide the OpenEMS Modbus/TCP interface

Setup reaches something on that address, and then reports that the device does not provide the OpenEMS Modbus/TCP interface.

#### Description

Something answers on that address and port, but it does not answer the way a FEMS does. Another Modbus device on your network may be using that address.

#### Resolution

1. Check that the host belongs to your FEMS.
2. Check the unit ID. The default is `1`.
3. Check that the **FEMS App Modbus/TCP lesend** is active on your FEMS.

{% enddetails %}

{% details "The FEMS has a new IP address" %}

### Symptom: The entities are unavailable after a network change

Your FEMS received a new IP address, for example after a router change, and the integration can no longer reach it.

#### Description

Home Assistant recognizes your FEMS by its serial number. When you add it again with the new address, the existing entry is updated instead of creating a second device.

#### Resolution

1. Look up the new address of the FEMS in your router, and give it a fixed address while you are there.
2. Go to {% my integrations title="**Settings** > **Devices & services**" %} and add the **Fenecon Modbus** integration again with the new address.
3. The form reports that the device is already configured. Home Assistant has updated the existing entry with the new address and keeps the history of your sensors.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

The Modbus TCP app stays active on your FEMS. If nothing else uses it, you can ask FENECON or your installer to deactivate it.
