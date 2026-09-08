---
title: Sofar
description: Instructions on how to integrate a Sofar solar inverter with Home Assistant over Modbus TCP.
ha_category:
  - Energy
ha_release: 2026.9
ha_iot_class: Local Polling
ha_codeowners:
  - '@darkrain-nl'
ha_domain: sofar
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - select
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: silver
---

The **Sofar** {% term integration %} connects Home Assistant to a Sofar Solar inverter over Modbus TCP, either directly to an inverter with a network port, or through a Modbus TCP bridge for inverters that only expose RS485.

## Use cases

The **Sofar** integration brings your inverter's own measurements into Home Assistant, so the solar system becomes something you can build automations on rather than something you check in a vendor app:

- Putting your solar production on the [Energy dashboard](/docs/energy/). Feed the inverter's own production, import, export, and battery energy totals into Home Assistant's Energy dashboard, measured at the inverter rather than estimated.
- Running appliances on surplus solar. Start the dishwasher or washing machine once the inverter reports more production than the house is using, and raise or lower a car charger's rate as production rises and falls.
- Automating around the battery. Use the battery's state of charge to decide when to run heavy loads, when to hold charge back for the evening, and when to warn that the reserve is nearly gone.
- Noticing problems the same day they happen. The fault binary sensors and the system state sensor turn a silent underperforming string or a tripped inverter into a notification, instead of something you find weeks later in the monthly yield.
- Keeping an eye on the hardware. Inverter, heatsink, and module temperatures, plus battery state of health and charge cycles, show how the installation is aging.
- Stopping and resuming the inverter remotely. Put the inverter into its waiting state for grid work or an export ban, then bring it back, without going to the unit.

## Supported devices

During setup, the integration reads the inverter's serial number and uses it to automatically detect the inverter model and its register map. It currently recognizes newer-generation Sofar inverters, including:

- PV-only (grid-tied) inverters.
- Hybrid inverters with battery storage.

If the inverter answers but its serial number isn't recognized, setup fails and you'll need to wait for support for your model to be added.

## Prerequisites

- The inverter needs to be reachable over the network from Home Assistant, either because it has its own Modbus TCP port, or because it's connected through a Modbus TCP bridge (for example, a serial-to-network adapter wired to its RS485 port).
- Modbus needs to be enabled on the inverter, if it has a setting for this.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the inverter, or of the Modbus TCP bridge it's connected through."
Port:
  description: "The Modbus TCP port to connect to. The default is `502`."
Modbus unit ID:
  description: "The inverter's Modbus unit ID, also called its Modbus device address. The default is `1`."
{% endconfiguration_basic %}

During setup, the integration also detects whether the inverter has EPS (Emergency Power Supply) wiring for an off-grid backup output, and polls its registers only if it does.

## Reconfiguration

If the inverter becomes reachable somewhere else on the network, for example after a DHCP lease change or when you replace the Modbus TCP bridge it's connected through, you can update the connection settings without removing and re-adding the integration:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **Sofar** integration.
2. Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Update the **Host**, **Port**, or **Modbus unit ID** as needed.
4. Select **Submit** to save the new settings.

The integration reads the serial number again and only accepts the new settings if they lead to the same inverter, so reconfiguring can't accidentally point an entry at a different device and take its history with it.

## Supported functionality

The **Sofar** integration provides the following entities.

### Binary sensors

- **Active power limit enabled**: Whether the inverter is currently applying the active power limit, rather than generating unrestricted. Set by the [Set active power limit](/actions/sofar.set_active_power_limit/) action, which leaves the limit itself stored but unused while this is off. Disabled by default.
- **Faults**: One diagnostic binary sensor per fault category, such as grid, battery, thermal, or communication. Each one turns on if any underlying fault bits in that category are currently active. Faults are grouped by category rather than by vendor register, since a single register can hold faults from more than one category at once. Combiner box, string fuse, input fuse, and AFCI (Arc-Fault Circuit Interrupter) faults are disabled by default, since PV and hybrid inverters don't have that hardware. The integration's diagnostics download includes the complete, decoded list of every currently active fault.

### Buttons

- **RTC sync**: Writes the current date and time to the inverter's clock.
- **IV curve scan**: Starts a scan of the PV strings' I-V curves. Only shown for inverters with battery storage.

### Select

- **Charger use mode**: The battery charger's operating mode, such as self use, time of use, or feed-in priority. Only shown for inverters with battery storage.
- **EPS mode**: Turns the EPS/backup output off and on, and whether it's allowed to cold-start from battery power alone. Only shown for inverters wired for EPS/backup power.

### Sensors

The **Sofar** integration reads a large number of sensors from the inverter. Only the sensors relevant to your inverter's type and configuration are added.

- **System state**: The inverter's operating state, including fault conditions.
- **Temperatures**: Inverter, heatsink, and module temperatures.
- **Device information**: The status of the last real-time clock sync.
- **Grid and output measurements**: Frequency, and active, reactive, and apparent power, both at the inverter's output and at the point of common coupling (PCC). Total household load and external solar production, as reported by the inverter, are also included. Per-phase voltage, current, power, and power factor are available for inverters with multiple phases.
- **Off-grid (EPS/backup) measurements**: The same kind of readings for the EPS/backup output. Only shown for inverters wired for EPS/backup power.
- **PV strings**: Power for each solar panel string, plus voltage and current if you need more detail. Each string the inverter supports gets its own device, connected via the inverter. Only shown for PV-capable inverters.
- **Battery**: Voltage, current, power, temperature, state of charge, state of health, and charge cycles for each battery pack, plus combined power, state of charge, and state of health totals. Each pack gets its own device, connected via the inverter, and only packs that respond are added. A pack added later appears on its own, without reloading the integration. Only shown for inverters with battery storage.
- **Battery configuration**: The battery parameters configured on the inverter, such as capacity, protocol, cell type, and voltage and current limits. Only shown for inverters with battery storage.
- **Energy totals**: Import, export, load consumption, solar generation, and battery charge/discharge energy, both for today and all-time.
- **Current settings**: The feed-in limit, the active power limit, and the passive-mode setpoints as they're currently stored on the inverter, so you can read back what the actions below have set.

The overall totals and the readings most people need are enabled by default. Per-phase detail, daily energy counters, the battery configuration, and the current settings are disabled. To use one of them, enable it from the entity's settings.

### Switch

The integration adds one switch, named after the inverter itself, that stops and resumes its operation remotely. Turning it off puts the inverter into its waiting state rather than cutting power to it.

The inverter's power limits and its passive-mode setpoints each span several registers that it only accepts written together, so they are actions rather than entities. All of them require an administrator.

{% include integrations/actions.md %}

## Sofar automation examples

Your inverter measures far more about your solar production than any monthly report shows. Here are a few ideas to get you started.

The entity IDs below are named after the inverter, so replace `sofar` with your own inverter's name.

{% include docs/paste_yaml_tip.md %}

### Automation: get a notification when the inverter reports a fault

An installation on the roof is easy to forget about, and an inverter that has stopped producing costs you money every sunny hour. This automation sends a notification as soon as the inverter raises a fault or drops out of normal grid-connected operation, so you find out the same day instead of weeks later in the monthly yield.

- **Trigger**: **Grid fault**, **PV fault**, **Battery fault**, or **Thermal fault** turned on
- **Trigger**: **System state** changed to **Recoverable fault** or **Permanent fault**
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a fault notification" %}

{% example %}
automation: |
  alias: "Sofar inverter fault"
  triggers:
    - trigger: state
      entity_id:
        - binary_sensor.sofar_grid_fault
        - binary_sensor.sofar_pv_fault
        - binary_sensor.sofar_battery_fault
        - binary_sensor.sofar_thermal_fault
      from: "off"
      to: "on"
    - trigger: state
      entity_id: sensor.sofar_system_state
      to:
        - "recoverable_fault"
        - "permanent_fault"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Sofar inverter fault"
        message: >
          The inverter reported a fault. Download the integration's
          diagnostics for the decoded list of everything active.
{% endexample %}

{% enddetails %}

### Automation: run an appliance on surplus solar

Appliances that don't care when they run are the cheapest way to use your own production instead of selling it. This automation starts the dishwasher once the inverter has been producing more than the house is using for ten minutes, which is long enough to know it isn't a passing gap in the clouds.

- **Trigger**: Template, true while **PV power total** stays more than 1.5 kW above **Active power load system** for 10 minutes
- **Action**: Turn on switch
  - **Target**: Dishwasher

{% details "YAML example for running an appliance on surplus solar" %}

{% example %}
automation: |
  alias: "Dishwasher on surplus solar"
  triggers:
    - trigger: template
      value_template: >
        {{ states('sensor.sofar_pv_power_total') | float(0)
           - states('sensor.sofar_active_power_load_system') | float(0)
           > 1.5 }}
      for:
        minutes: 10
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

### Automation: warn when the battery reserve runs low

The battery is worth the most in the evening, when the panels have stopped and the grid is expensive. This automation notifies you when the battery drops below a fifth of its capacity, so you can decide whether to hold the rest back or let heavy loads keep running.

- **Trigger**: **Battery state of charge total** below 20
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low battery warning" %}

{% example %}
automation: |
  alias: "Sofar battery reserve low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.sofar_battery_state_of_charge_total
      below: 20
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Home battery is low"
        message: >
          The battery is below 20%. Heavy loads will start drawing
          from the grid.
{% endexample %}

{% enddetails %}

## Data updates

The **Sofar** {% term integration %} {% term polling polls %} the inverter's live readings every 5 seconds. Values that rarely change, such as the device information and the battery configuration, are polled every 60 seconds instead, so each poll stays short.

## Known limitations

- Only Modbus TCP connections are supported. Direct serial (RTU) connections aren't supported yet.
- Only newer-generation Sofar inverters are recognized. Older, legacy models aren't supported yet.

## Troubleshooting

### Cannot connect to the inverter

1. Make sure the inverter (or the Modbus TCP bridge it's connected through) is powered on and reachable on the network.
2. Confirm the host and port are correct, and that nothing else is holding open the same Modbus connection.
3. Check that Modbus is enabled on the inverter, if it has a setting for this.
4. If it still fails, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), reproduce the failure, and include the log in the issue report, together with the host, port, and Modbus unit ID you used.

### Inverter isn't recognized

The integration only recognizes inverter models it knows the register map for. If setup fails with an unrecognized inverter error, your model isn't supported yet.

Because setup didn't finish, there's nothing to download {% term diagnostics %} data from yet. Include the first ten characters of your inverter's serial number and the model name from its label in the issue report instead. Together, those identify which register map the inverter uses. The rest of the serial number isn't needed.

### Entities are missing for your inverter

If the integration set up successfully but entities you expect aren't there, such as battery or EPS/backup sensors on a hybrid inverter, the inverter is reporting that it doesn't serve those registers.

Download the {% term diagnostics %} data and include it in the issue report. It lists which register blocks the inverter reports it supports, which shows whether the model genuinely lacks that hardware or the integration is reading it wrongly.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
