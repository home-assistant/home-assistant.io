---
description: Instructions on how to integrate a Sofar solar inverter with Home Assistant over Modbus TCP or a serial RS485 connection.
ha_release: 2026.9
ha_domain: sofar
---

The **Sofar** {% term integration %} connects Home Assistant to a Sofar Solar inverter over Modbus. You can reach the inverter over the network (Modbus TCP), either directly or through a Modbus TCP bridge, or over a serial port wired to its RS485 terminals (Modbus RTU).

## Use cases

The **Sofar** integration brings your inverter's own measurements into Home Assistant, so the solar system becomes something you can build automations on rather than something you check in a vendor app:

- Putting your solar production on the [Energy dashboard](/docs/energy/). Feed the inverter's own production, import, export, and battery energy totals into Home Assistant's Energy dashboard, measured at the inverter rather than estimated.
- Running appliances on surplus solar. Start the dishwasher or washing machine once the inverter reports more production than the house is using, and raise or lower a car charger's rate as production rises and falls.
- Automating around the battery. Use the battery's state of charge to decide when to run heavy loads, when to hold charge back for the evening, and when to warn that the reserve is nearly gone.
- Noticing problems the same day they happen. The fault binary sensors, the fault event, and the system state sensor turn a silent underperforming string or a tripped inverter into a notification, instead of something you find weeks later in the monthly yield.
- Keeping an eye on the hardware. Inverter, heatsink, and module temperatures, plus battery state of health and charge cycles, show how the installation is aging.
- Stopping and resuming the inverter remotely. Put the inverter into its waiting state for grid work or an export ban, then bring it back, without going to the unit.

## Supported devices

The integration supports Sofar inverters that use the current-generation Modbus register map, including HYD hybrid inverters and KTL-X and KTLM PV inverters. During setup, the integration reads the inverter's serial number to detect its type and the registers that apply to it.

The integration recognizes these serial-number prefixes directly:

- `SP1`, `SP2`, `ZP1`, and `ZP2` for three-phase HYD hybrid models.
- `SM2E` and `ZM2E` for single-phase HYD hybrid models.
- `SH1` for HYD5-8KTL-3P hybrid models.
- `SH3E`, `SS2E`, `ZS2E`, `SQ1ES1`, and `SS1` for KTL-X, KTLM, and related PV models.
- `SA1`, `SB1`, `SC1`, `SD1`, `SF4`, `SL1`, and `SJ2` for additional current-generation PV models.

If the serial number starts with another prefix, the integration asks the inverter which registers it serves instead. From that answer, it works out whether the inverter is single-phase or three-phase, whether it's a hybrid or PV-only model, and how many PV strings it has. This means you can usually set up current-generation models that aren't on the list above, too.

Some serial-number prefixes are also used by older Sofar models, so the marketed model name or serial prefix alone does not always identify the register generation. If the inverter answers but neither its serial number nor the registers it serves identify a supported model, setup fails.

## Unsupported devices

Older Sofar inverters that use the legacy Modbus register map aren't supported. These devices use different register ranges from the current-generation inverters, even when their serial-number prefix is similar or identical.

## Prerequisites

Depending on how you connect the inverter, you need one of the following:

- **Network (Modbus TCP)**: The inverter has its own Modbus TCP port, or its RS485 port is wired to a Modbus TCP bridge or a data logger stick that speaks Modbus TCP.
- **Serial port (Modbus RTU)**: The inverter's RS485 terminals are wired to a USB-to-RS485 adapter on your Home Assistant host. Alternatively, an ESPHome serial proxy with an RS485 interface can share the port with Home Assistant over the network. To set one up, refer to [Setting up an ESPHome serial proxy](/integrations/serial/#setting-up-an-esphome-serial-proxy).

Modbus also needs to be enabled on the inverter, if it has a setting for this.

{% include integrations/config_flow.md %}

When you add the integration, choose how the inverter is reached: **Network (Modbus TCP)** or **Serial port (Modbus RTU)**. The settings that follow depend on your choice.

{% configuration_basic %}
Host:
  description: "The hostname or IP address of the inverter, or of the Modbus TCP bridge it's connected through. Only shown for a network connection."
Port:
  description: "The Modbus TCP port to connect to. The default is `502`. Only shown for a network connection."
Serial port:
  description: "The serial port the inverter's RS485 bus is wired to. Ports shared over the network by an ESPHome serial proxy are listed alongside the local ones. Only shown for a serial connection."
Baud rate:
  description: "The speed of the RS485 bus, as set on the inverter. The default is `9600`, which matches the Sofar default. Only shown for a serial connection."
Modbus unit ID:
  description: "The inverter's Modbus unit ID, also called its Modbus device address. The default is `1`."
{% endconfiguration_basic %}

{% note %}
Home Assistant can share a Modbus connection between integrations when their connection settings are compatible. If another integration already uses the same serial port or bridge with different settings, such as another baud rate, setup fails with a connection error.
{% endnote %}

During setup, the integration also detects whether the inverter has EPS (Emergency Power Supply) wiring for an off-grid backup output, and polls its registers only if it does.

## Reconfiguration

You can update the connection settings without removing and adding the integration again. For example, in the following situations:

- The inverter gets a new IP address after a DHCP lease change.
- You replace the Modbus TCP bridge it's connected through.
- You rewire it to another serial port.
- You move it between a network and a serial connection.

To update the connection settings:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **Sofar** integration.
2. Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Reconfigure**.
3. Choose how the inverter is reached from now on: **Network (Modbus TCP)** or **Serial port (Modbus RTU)**.
4. Enter the connection settings. For a network connection, these are the **Host**, **Port**, and **Modbus unit ID**. For a serial connection, these are the **Serial port**, **Baud rate**, and **Modbus unit ID**. 
   - If you keep the same connection type, the current settings are filled in for you. 
   - If you switch, only the **Modbus unit ID** carries over.
5. Select **Submit** to save the new settings.

The integration reads the serial number again and only accepts the new settings if they lead to the same inverter, so reconfiguring can't accidentally point an entry at a different device and take its history with it.

## Supported functionality

The **Sofar** integration provides the following entities.

The inverter's power limits and its passive-mode setpoints each span several registers that it only accepts written together, so they are actions rather than entities. All of them require an administrator.

### Binary sensors

- **Active power limit enabled**: Whether the inverter is currently applying the active power limit, rather than generating unrestricted. Set by the [Set active power limit](/actions/sofar.set_active_power_limit/) action, which still writes the limit while this is off, but the inverter ignores it until it's enabled again. Disabled by default.
- **Faults**: One diagnostic binary sensor per fault category, such as grid, battery, thermal, or communication. Each one turns on if any underlying fault bits in that category are currently active. Faults are grouped by category rather than by vendor register, since a single register can hold faults from more than one category at once. Combiner box, string fuse, input fuse, and AFCI (Arc-Fault Circuit Interrupter) faults are [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity), since PV and hybrid inverters don't have that hardware. The integration's diagnostics download includes the complete, decoded list of every currently active fault.

### Buttons

- **RTC sync**: Writes the current date and time to the inverter's clock.
- **IV curve scan**: Starts a scan of the PV strings' I-V curves. Only shown for inverters with battery storage.

### Events

- **Fault**: Reports each fault the inverter records in its own fault log, by name, such as **Grid overvoltage** or **AC output hardware overcurrent**. You can use it to start an automation. Each fault shows its **Category**, its **Fault ID**, which is the fault code listed in your inverter's manual, and **Occurred at**, the time the inverter recorded it. It doesn't report when a fault clears. Only shown for inverters that keep a fault log.
  - The fault log is more detailed than the alarm history in the Sofar app. It also records brief faults that the inverter clears by itself, so you may see faults here that the app doesn't show.
  - Recent faults the inverter recorded while Home Assistant couldn't reach it are reported once the connection is back. Faults that were already in the log when you added the integration aren't reported.
  - **Occurred at** uses the inverter's own clock. If the time looks wrong, select the **RTC sync** button to correct the clock.

### Selects

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
- **Battery configuration**: The battery parameters configured on the inverter, such as capacity, protocol, cell type, and voltage and current limits. This includes the state of charge at which the battery stops charging, the levels at which it stops discharging on-grid and off-grid, and the level at which off-grid discharging resumes. Only shown for inverters with battery storage.
- **Energy totals**: Import, export, load consumption, solar generation, and battery charge/discharge energy, both for today and all-time.
- **Current settings**: The feed-in limit, the active power limit, and the passive-mode setpoints as they're currently stored on the inverter, so you can read back what the actions below have set.

The readings most people need are enabled by default. Per-phase detail, the reactive power totals, daily energy counters, the battery configuration, and the current settings are disabled. To use one of them, enable it from the entity's settings.

### Switches

The integration adds one switch, named after the inverter itself, that stops and resumes its operation remotely. Turning it off puts the inverter into its waiting state rather than cutting power to it.

{% include integrations/actions.md %}

## Sofar automation examples

Your inverter measures far more about your solar production than any monthly report shows. Here are a few ideas to get you started.

The entity IDs below are named after the inverter, so replace `sofar` with your own inverter's name.

{% include docs/paste_yaml_tip.md %}

### Automation: get a notification when the inverter reports a fault

An installation on the roof is easy to forget about, and an inverter that has stopped producing costs you money every sunny hour. This automation sends a notification as soon as the inverter raises a fault or drops out of normal grid-connected operation, so you find out the same day instead of weeks later in the monthly yield.

- **Trigger**: State changed
  - **Entity**: Sofar grid fault sensor, Sofar pv fault sensor, Sofar battery fault sensor, Sofar thermal fault sensor
  - **From**: Off
  - **To**: On
- **Trigger**: State changed
  - **Entity**: Sofar system state sensor
  - **To**: Recoverable fault, Permanent fault
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
          The inverter reported a fault. Check the Fault entity's
          history, or download the integration's diagnostics, to see
          which fault it was.
{% endexample %}

{% enddetails %}

### Automation: run an appliance on surplus solar

Appliances that don't care when they run are the cheapest way to use your own production instead of selling it. This automation starts the dishwasher once the inverter has been producing more than the house is using for 10 minutes, which is long enough to know it isn't a passing gap in the clouds.

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

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Sofar battery state of charge total
  - **Below**: `20`
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

A PV inverter switches off when there's no sunlight, so its entities are unavailable at night. If Home Assistant starts while the inverter is off, the integration still loads as long as the Modbus TCP bridge or serial port is reachable. Its entities stay unavailable until the inverter answers again.

## Known limitations

- Serial connections use 8 data bits, no parity, and 1 stop bit (8N1), which is what Sofar inverters use on their RS485 port. Only the baud rate can be changed.

## Troubleshooting

If these steps don't help, [open an issue on GitHub](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&integration_name=Sofar&integration_link=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Fsofar) and include the details listed for your symptom.

### Cannot connect to the inverter

1. Make sure the inverter is powered on. If it's connected through a Modbus TCP bridge or an ESPHome serial proxy, make sure that device is also powered on and reachable on your network.
2. For a network connection, confirm the host and port are correct, and that nothing else is holding open the same Modbus connection.
3. For a serial connection, confirm the serial port is correct.
4. Check that Modbus is enabled on the inverter, if it has a setting for this.
5. If it still fails, include the connection type, the connection settings, and the Modbus unit ID in the issue report. If the integration is already added, also enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), reproduce the failure, and include the log.

### Inverter isn't answering

#### Description

If setup reports that the adapter is reachable but the inverter behind it didn't answer, Home Assistant reached the Modbus TCP bridge or serial port, but the inverter didn't reply.

#### Resolution

1. A PV inverter switches off when there's no sunlight. If you're setting it up after dark, try again in daylight.
2. Confirm the **Modbus unit ID** matches the one set on the inverter. The default is `1`.
3. For a serial connection, or a Modbus TCP bridge wired to the inverter's RS485 port, confirm the baud rate matches the one set on the inverter. Check the RS485 wiring: if A and B are swapped, the inverter doesn't answer.
4. Check that Modbus is enabled on the inverter, if it has a setting for this.
5. If it still doesn't answer, include the connection type, the connection settings, and the Modbus unit ID in the issue report.

### Inverter isn't recognized

#### Description

The integration identifies the inverter by its serial number or by the registers it reports it serves. If setup fails with an unrecognized inverter error, neither matches a supported model. The inverter might use the older register map, or your model may not be supported yet.

#### Resolution

Because setup didn't finish, the integration isn't added yet, so the **Download diagnostics** option isn't shown. Include the first 10 characters of your inverter's serial number and the model name from its label in the issue report instead. Together, those identify which register map the inverter uses. The rest of the serial number isn't needed.

### Entities are missing for your inverter

#### Description

If the integration set up successfully but entities you expect aren't there, such as battery or EPS/backup sensors on a hybrid inverter, the inverter is reporting that it doesn't serve those registers.

#### Resolution

Download the {% term diagnostics %} data and include it in the issue report. It lists which register blocks the inverter reports it supports, which shows whether the model genuinely lacks that hardware or the integration is reading it wrongly.

To download it, go to {% my integrations title="**Settings** > **Devices & services**" %} and find the **Sofar** integration. Select the three-dot menu {% icon "mdi:dots-vertical" %} and choose **Download diagnostics**.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

### To remove a battery pack

Battery packs appear as separate devices under the inverter. A pack you physically remove stays listed until you delete its device. Packs the inverter still reports can't be deleted, and a pack you reconnect is added back on the next update. The inverter and its PV strings can't be deleted individually, since PV strings come from the inverter model rather than from a reading.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Sofar** integration card.
2. From the list of devices, find the battery pack you want to remove.
3. Next to the battery pack, select the three dots {% icon "mdi:dots-vertical" %} menu. Then, select **Delete**.
