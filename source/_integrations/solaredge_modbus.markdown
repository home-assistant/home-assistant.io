---
title: SolarEdge Modbus
description: Instructions on how to integrate a SolarEdge solar inverter with Home Assistant over Modbus TCP.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.10
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: solaredge_modbus
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
ha_integration_type: device
ha_zeroconf: true
ha_quality_scale: bronze
---

The **SolarEdge Modbus** {% term integration %} connects Home Assistant to your SolarEdge solar inverter over your own network, using the Modbus TCP interface built into the inverter. There is no account, no API key, and no cloud service involved, so your solar production keeps arriving in Home Assistant even when your internet connection is down.

Because it talks to the inverter directly, readings arrive every few seconds instead of every few minutes. That makes it a good source for the [Energy dashboard](#energy-dashboard) and for automations that respond to what your panels are producing right now.

If you would rather use SolarEdge's cloud service, for example to see how each individual panel is doing, use the [SolarEdge](/integrations/solaredge/) integration instead. You can use both at the same time.

## Supported devices

This integration has been tested with, or reported to work on, the following inverters:

- SE4K
- SE5000H
- SE8000H
- SE10K
- SE10000H
- SE15K
- SE17K

Both single-phase and three-phase inverters are covered by that list. Any SolarEdge inverter that offers Modbus TCP should work, whether or not it is listed.

Your inverter reports itself as a part number, such as `SE17K-RW0T0BNN4`. The part before the dash is the model, and the rest describes the region it was built for and the options it was built with. An inverter of the same model as one in the list therefore works the same way, regardless of what comes after the dash.

Modbus TCP is available on inverters that have a network connection. If you cannot find the setting on your inverter, updating the inverter firmware usually adds it.

An inverter without a network port can be reached over RS485 instead, either wired to a serial port on the machine running Home Assistant, or through a Modbus TCP bridge such as a serial-to-network adapter.

## Unsupported devices

The following devices are not supported:

- SolarEdge EV chargers, such as the SE-EV-SA-US-40P. They answer as a Modbus device, but serve no measurements. Home Assistant tells you when it finds one during setup.

## Prerequisites

An inverter is reached over your network or over RS485, and either way Modbus has to be turned on at the inverter itself first. How you get there depends on whether your inverter has a display.

{% details "Inverters without a display" %}

Newer inverters have no display and are configured with SolarEdge's SetApp. You do not need the app or an installer account for this: the inverter serves the same settings page over an access point of its own.

1. Move the inverter's red ON/OFF/P switch to **P** for less than five seconds, then release it. The inverter starts its own Wi-Fi access point.
2. Connect to that access point. Its network name and password are printed on the sticker on the inverter.
3. Open `http://172.16.0.1` in your browser.
4. Go to **Site Communication**, and enable **Modbus (TCP)**.

The same setting is under **Site Communication** in the SetApp mobile app, if you have it.

{% enddetails %}

{% details "Inverters with a display" %}

1. Press and hold **OK**, the button on the right, to open the menu.
2. Enter the password `12312312` by pressing **Up**, **Down**, **OK**, **Up**, **Down**, **OK**, **Up**, **Down**.
3. Go to **Communication** > **LAN**, and enable **Modbus TCP**.

{% enddetails %}

Enabling Modbus TCP sets the port to `1502`. The device ID of the inverter is `1`, unless you gave it another one yourself.

For a network connection, you also need the hostname or IP address of the inverter. Giving it a fixed address in your router keeps Home Assistant pointed at the right device.

{% tip %}
SolarEdge may stop supporting Modbus over Wi-Fi in a future firmware version. Connecting the inverter to your network with an Ethernet cable is the more reliable choice.
{% endtip %}

For an RS485 connection, set the protocol of the inverter's RS485 port to **SunSpec (Non-SE Logger)** in the same communication settings, note its baud rate (`115200` unless it was changed), and know which serial port of your machine the bus is wired to.

{% include integrations/config_flow.md %}

Setting up starts by picking how the inverter is reached, **Network (Modbus TCP)** or **Serial (RS485)**. A discovered inverter skips that question: it announced itself over the network.

For a network connection:

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your SolarEdge inverter, or of the Modbus TCP bridge it is connected through. For example, `192.168.1.100`."
Port:
  description: "The port the inverter listens on for Modbus requests. The SolarEdge default is `1502`."
Device ID:
  description: "The Modbus device ID of the inverter, as configured on the inverter itself. The SolarEdge default is `1`. You only need to change this if your inverter was given another ID, for example because several inverters share one connection."
{% endconfiguration_basic %}

For a serial connection:

{% configuration_basic %}
Serial port:
  description: "The serial port the inverter's RS485 bus is wired to. For example, `/dev/ttyUSB0`."
Baud rate:
  description: "The baud rate of the RS485 bus, as configured on the inverter. The SolarEdge default is `115200`."
Device ID:
  description: "The Modbus device ID of the inverter, as configured on the inverter itself. The SolarEdge default is `1`. Inverters chained on one bus each need their own."
{% endconfiguration_basic %}

The above configuration can also be adjusted later via {% my integrations title="**Settings** > **Devices & services**" %}, select {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

## Supported functionality

Your inverter is added as a device, with any energy meter or battery wired to it as a device of its own beneath it. Home Assistant reads the serial numbers during setup and uses those to recognize the hardware, so moving an inverter to another address does not create a second device, and replacing a meter does not hand the new one the old one's history.

### Inverter sensors

- **Power**: The AC power the inverter is feeding into your home right now. The [Energy dashboard](#energy-dashboard) uses this one for live power flow.
- **Energy**: The total energy the inverter has produced since it was installed. This is the sensor to use for solar production on the [Energy dashboard](#energy-dashboard).
- **Current**: The AC current the inverter is delivering.
- **Current phase A**, **Current phase B**, **Current phase C**: The current per phase. Only added for inverters that report per phase.
- **DC power**: The power coming in from your solar panels.
- **DC current**: The current coming in from your solar panels.
- **Temperature**: The temperature of the inverter's heatsink. The inverter reports no temperature while it is asleep, so this is unknown at night.
- **Status**: What the inverter is doing: **Off**, **Sleeping**, **Starting**, **Producing**, **Throttled**, **Shutting down**, **Fault**, or **Standby**. In automations and templates, a state goes by its own value rather than the name shown here, so **Shutting down** is `shutting_down`.

The following sensors are added, but disabled. They are useful for troubleshooting or for a detailed look at your installation, and there are a lot of them, so they stay out of the way until you need them. To use one, enable it in the entity's settings.

- **Voltage**, and per phase **Voltage phase A-B**, **Voltage phase B-C**, **Voltage phase C-A**, **Voltage phase A-N**, **Voltage phase B-N**, and **Voltage phase C-N**: The AC voltage. Which of these your inverter reports depends on how it is wired.
- **DC voltage**: The voltage coming in from your solar panels.
- **Frequency**: The frequency of the grid the inverter is connected to.
- **Apparent power**, **Reactive power**, and **Power factor**: How the inverter's output relates to the grid.

### Meter sensors

An energy meter measures what passes through it, which is what the inverter cannot see: what your home takes from the grid, and what it sends back. Every meter attached to the inverter gets a device named after its place on it, **Meter 1** through **Meter 3**, with its own sensors.

- **Power**, **Apparent power**, **Reactive power**, and **Power factor**: What the meter measures right now, and how that relates to the grid.
- **Energy imported** and **Energy exported**: The totals since the meter was installed. These are the sensors for the grid on the [Energy dashboard](#energy-dashboard).
- **Current** and **Frequency**: The current through the meter, and the frequency of the grid it sits on.
- **Per phase**: Power, current, imported and exported energy for each phase the meter measures. A split-phase meter has two phases rather than three.

The voltages a meter reports are added but disabled, the same way the inverter's are. Which of them exist depends on the meter: a delta meter has no neutral, so it measures nothing against one.

### Battery sensors

A battery attached to the inverter gets a device named after its place on it, **Battery 1** through **Battery 3**, with what it holds and what it is doing with it.

- **State of energy**: How full the battery is, as a percentage.
- **Available energy**, **Usable capacity**, and **Rated energy**: What is in the battery right now, what it can hold as configured, and what it was rated for when it was built.
- **Energy imported** and **Energy exported**: The totals charged into and discharged from the battery. These are the sensors for the battery on the [Energy dashboard](#energy-dashboard).
- **Status**: What the battery is doing: **Off**, **Standby**, **Initializing**, **Charging**, **Discharging**, **Fault**, **Preserving charge**, **Idle**, or **Power saving**.
- **State of health**: What is left of the battery's original capacity, as a percentage.
- **DC power**, **DC voltage**, and **DC current**: What flows between the battery and the inverter. Negative while it is charging.
- **Maximum charge power** and **Maximum discharge power**, and their peak counterparts: What the battery allows, continuously and in bursts.
- **Temperature** and **Maximum temperature**: How warm the pack is on average, and the warmest cell in it.

### Binary sensors

- **Problem**: On when the inverter reports a fault, so an automation can tell you the same day rather than at the end of the month.
- **Charging**: On while a battery is taking charge. Home Assistant's battery-charging triggers and conditions look at this rather than at the status sensor, so this is the one to use for them.
- **On grid**: Whether the inverter is connected to the grid. Only added for inverter firmware that reports it.

### Numbers

The inverter holds settings of its own, which this integration can change as well as read. They sit under the inverter's configuration rather than with its measurements.

- **Backup reserve**: How much of the battery is kept back for a power cut, as a percentage.
- **Storage charge limit** and **Storage discharge limit**: How fast the battery is allowed to charge and discharge.
- **Site export limit**: How much the site may feed back to the grid.
- **External production maximum**: What other production at the site can deliver, which the inverter needs to know to keep the site within its export limit.
- **Active power limit**: How much of its capacity the inverter may use, as a percentage.
- **Power factor setpoint**: The cos phi the inverter aims for. Disabled by default, since it is an installer setting that a site rarely needs to move.

### Selects

- **Storage control mode**: What the battery does. **Maximize self-consumption** keeps your own production at home, **Time of use** follows a schedule set on the inverter, **Backup only** keeps the battery for a power cut, and **Remote control** hands the decision to whatever writes the command mode below.
- **Storage default mode** and **Storage command mode**: What the battery is told to do, and what it falls back to when a remote command times out. The options range from charging out of solar or the grid to discharging to cover your own use or to export.
- **Storage AC charge policy**: Whether, and how much, the battery may charge from the grid rather than from the panels.
- **Export limitation**: How the site limits what it feeds back to the grid. **Production control** limits the inverter itself; the meter-based options measure at the connection point and need a meter, so they are only offered when one is attached. Whatever the inverter is set to is always offered, even when the hardware for it is missing, since that is what the register says.
- **Export limit type**: Whether the export limit counts per phase or as a total. Disabled by default.

{% important %}
These settings live in the inverter's flash memory, which is meant to be written now and then rather than continuously. An automation that writes one every few minutes will wear it out. Change them when something actually changes.

They can also affect what your installation is allowed to do. Export limits in particular are often part of an agreement with your grid operator, and changing them can put your site outside it, or change what you are billed.
{% endimportant %}

## Energy dashboard

Your inverter's production fits straight into the [Energy dashboard](/docs/energy/solar-panels/), next to what your home consumes.

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Solar panels**, select **Add solar production**.
3. For **Solar production energy**, select the inverter's **Energy** sensor.
4. For **Solar production power**, select the inverter's **Power** sensor. This one is optional, and it is what the live power flow card and the **Now** tab use to show your production as it happens.
5. Select **Save**.

Home Assistant records long-term statistics for the **Energy** sensor from the moment the entity appears, so the dashboard also fills in the days before you added it here.

The **Electricity grid** section needs a meter, since the inverter measures what it produces and not what your home takes from the grid or sends back to it. With a SolarEdge meter wired to the inverter, this integration provides that too:

1. Under **Electricity grid**, select **Add grid connection**.
2. For **Grid consumption**, select the meter's **Energy imported** sensor.
3. For **Return to grid**, select the meter's **Energy exported** sensor.
4. Select **Save**.

Without a meter, another energy monitor, such as one reading your utility meter, can fill those in instead.

A battery goes under **Home battery storage** in the same way:

1. Under **Home battery storage**, select **Add battery system**.
2. For **Energy charged into the battery**, select the battery's **Energy imported** sensor.
3. For **Energy discharged from the battery**, select its **Energy exported** sensor.
4. For **Battery state of charge sensor**, select its **State of energy** sensor.
5. Select **Save**.

## SolarEdge Modbus automation examples

Your inverter knows more about your solar production than a monthly report ever will. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: get a notification when the inverter reports a fault

A solar installation on the roof is easy to forget about, and an inverter that has stopped producing costs you money every sunny hour. This automation sends a notification the moment the inverter reports a fault, so you find out on the same day instead of on your next bill.

- **Trigger**: **Problem** turned on
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a fault notification" %}

{% example %}
automation: |
  alias: "Solar inverter fault"
  triggers:
    - trigger: state
      entity_id: binary_sensor.solaredge_se10000h_problem
      to: "on"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The solar inverter reports a fault and has stopped producing.
{% endexample %}

{% enddetails %}

### Automation: run the dishwasher on your own solar power

Appliances that do not care when they run are the cheapest way to use your own production instead of selling it. This automation starts the dishwasher once your panels have been producing more than 2 kW for ten minutes, which is long enough to know it is not a passing gap in the clouds.

- **Trigger**: **Power** above 2000 for 10 minutes
- **Action**: Turn on the dishwasher

{% details "YAML example for running the dishwasher on solar power" %}

{% example %}
automation: |
  alias: "Dishwasher on solar power"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.solaredge_se10000h_power
      above: 2000
      for: "00:10:00"
  actions:
    - action: switch.turn_on
      target:
        entity_id: switch.dishwasher
{% endexample %}

{% enddetails %}

## Data updates

The **SolarEdge Modbus** integration {% term polling polls %} the inverter, and anything wired to it, every 10 seconds. The inverter's settings are read every 5 minutes instead: they only move when something writes them, and every read costs a slot on a connection that has few to give.

Home Assistant keeps one Modbus connection per address and shares it between the integrations that use it. If several inverters answer on the same address with different device IDs, for example because they are chained on one Modbus TCP bridge, they share a single connection instead of each opening their own.

A [Modbus](/integrations/modbus/) setup in your {% term "`configuration.yaml`" %} is separate from this. It opens its own connection to the inverter, which counts against the number of clients the inverter accepts.

If part of the installation does not answer a poll, only its {% term entity entities %} become unavailable: a silent meter or battery leaves the inverter's sensors alone. Home Assistant does not keep showing the last known reading as if it were current.

## Known limitations

- Which of the inverter's settings exist depends on the installation. Storage settings need a battery, and the export settings need the inverter to have them enabled; what is absent is simply not added.
- SolarEdge does not document the control registers, and not every firmware exposes them the same way. What a setting does is the inverter's business, and it will refuse a value it does not accept.
- Which meters and batteries are attached is read while the entry is set up. Hardware added or unwired while Home Assistant runs is picked up the next time the entry loads, which you can trigger yourself by reloading the integration.
- Modbus gives you what the inverter itself measures. Data per optimizer or per panel is only available through SolarEdge's cloud service, which the [SolarEdge](/integrations/solaredge/) integration uses.
- An inverter accepts a limited number of Modbus TCP connections at the same time. If another system on your network already polls the inverter, Home Assistant may not be able to connect.

## Troubleshooting

### The inverter cannot be reached

If setup or a later poll cannot reach the inverter, work through the following steps:

1. Make sure the inverter is powered on and reachable on your network, for example by looking it up in your router.
2. Check that Modbus TCP is still enabled on the inverter. An inverter firmware update or a visit from your installer can turn it off again.
3. Check the port. SolarEdge uses `1502`, where Modbus devices in general often use `502`.
4. Check whether another system is already polling the inverter, and stop it while you test.

On an RS485 connection, check the baud rate and the device ID against what the inverter is set to, and that its RS485 port speaks SunSpec rather than talking to a SolarEdge logger.

### Setup says the device does not answer as a SolarEdge inverter

Something answers on that address and device ID, but it is not a SolarEdge inverter:

1. Check the device ID, which is `1` on SolarEdge inverters. Another Modbus device on the same address can answer on a different ID.
2. Check that the host belongs to the inverter, and not to another device that took over its address.

### Setup says this is a different inverter

Home Assistant recognizes your inverter by its serial number. This message means the inverter that answers is not the one this entry was set up for, usually because addresses were handed out again on your network:

1. Look up the inverter's current address, and give it a fixed address while you are there.
2. Select **Reconfigure** on the integration entry and enter the new address.

### Getting to what the inverter reports

The integration's diagnostics carry everything the inverter says about itself and about the hardware wired to it, including meters and batteries, whether or not there are entities for them. To download them, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the integration, and use {% icon "mdi:dots-vertical" %} > **Download diagnostics**. Serial numbers are redacted.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

The Modbus TCP setting stays enabled on the inverter. You can turn it off in the inverter's own settings if nothing else uses it.
