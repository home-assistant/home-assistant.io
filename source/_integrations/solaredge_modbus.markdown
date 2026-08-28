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
  - sensor
ha_integration_type: device
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

An inverter that only has an RS485 connection can be used if you connect it through a Modbus TCP bridge, such as a serial-to-network adapter wired to its RS485 port.

## Unsupported devices

The following devices are not supported:

- SolarEdge EV chargers, such as the SE-EV-SA-US-40P. They answer as a Modbus device, but serve no measurements. Home Assistant tells you when it finds one during setup.

## Prerequisites

Modbus TCP is turned off on a new inverter, so you need to enable it on the inverter itself first. How you get there depends on whether your inverter has a display.

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

You also need the hostname or IP address of the inverter on your network. Giving the inverter a fixed address in your router keeps Home Assistant pointed at the right device.

{% tip %}
SolarEdge may stop supporting Modbus over Wi-Fi in a future firmware version. Connecting the inverter to your network with an Ethernet cable is the more reliable choice.
{% endtip %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your SolarEdge inverter, or of the Modbus TCP bridge it is connected through. For example, `192.168.1.100`."
Port:
  description: "The port the inverter listens on for Modbus requests. The SolarEdge default is `1502`."
Device ID:
  description: "The Modbus device ID of the inverter, as configured on the inverter itself. The SolarEdge default is `1`. You only need to change this if your inverter was given another ID, for example because several inverters share one connection."
{% endconfiguration_basic %}

The above configuration can also be adjusted later via {% my integrations title="**Settings** > **Devices & services**" %}, select {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

## Supported functionality

Your inverter is added as a single device. Home Assistant reads its serial number during setup and uses that to recognize the inverter, so moving it to another address does not create a second device.

### Sensors

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
- **Vendor status**: The status code the inverter reports in SolarEdge's own numbering. Useful when a fault needs to be discussed with your installer.

## Energy dashboard

Your inverter's production fits straight into the [Energy dashboard](/docs/energy/solar-panels/), next to what your home consumes.

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Solar panels**, select **Add solar production**.
3. For **Solar production energy**, select the inverter's **Energy** sensor.
4. For **Solar production power**, select the inverter's **Power** sensor. This one is optional, and it is what the live power flow card and the **Now** tab use to show your production as it happens.
5. Select **Save**.

Home Assistant records long-term statistics for the **Energy** sensor from the moment the entity appears, so the dashboard also fills in the days before you added it here.

The **Electricity grid** section is a separate matter. Your inverter measures what it produces, not what your home takes from the grid or sends back to it. That needs an energy meter, such as one that reads your utility meter.

## SolarEdge Modbus automation examples

Your inverter knows more about your solar production than a monthly report ever will. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: get a notification when the inverter reports a fault

A solar installation on the roof is easy to forget about, and an inverter that has stopped producing costs you money every sunny hour. This automation sends a notification the moment the inverter reports a fault, so you find out on the same day instead of on your next bill.

- **Trigger**: State of **Status** changed to **Fault**
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a fault notification" %}

{% example %}
automation: |
  alias: "Solar inverter fault"
  triggers:
    - trigger: state
      entity_id: sensor.solaredge_se10000h_status
      to: "fault"
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

The **SolarEdge Modbus** integration {% term polling polls %} the inverter every 10 seconds.

Home Assistant keeps one Modbus connection per address and shares it between the integrations that use it. If several inverters answer on the same address with different device IDs, for example because they are chained on one Modbus TCP bridge, they share a single connection instead of each opening their own.

A [Modbus](/integrations/modbus/) setup in your {% term "`configuration.yaml`" %} is separate from this. It opens its own connection to the inverter, which counts against the number of clients the inverter accepts.

If the inverter does not answer a poll, its {% term entity entities %} become unavailable. Home Assistant does not keep showing the last known reading as if it were current.

## Known limitations

- Only the inverter itself is read. Energy meters and batteries connected to it are not included, and neither are the inverter's own settings, such as export limitation and battery charging.
- Only Modbus TCP connections are supported. A direct serial (RS485) connection to Home Assistant is not supported yet, but a Modbus TCP bridge can be used instead.
- Modbus gives you what the inverter itself measures. Data per optimizer or per panel is only available through SolarEdge's cloud service, which the [SolarEdge](/integrations/solaredge/) integration uses.
- An inverter accepts a limited number of Modbus TCP connections at the same time. If another system on your network already polls the inverter, Home Assistant may not be able to connect.

## Troubleshooting

### The inverter cannot be reached

If setup or a later poll cannot reach the inverter, work through the following steps:

1. Make sure the inverter is powered on and reachable on your network, for example by looking it up in your router.
2. Check that Modbus TCP is still enabled on the inverter. An inverter firmware update or a visit from your installer can turn it off again.
3. Check the port. SolarEdge uses `1502`, where Modbus devices in general often use `502`.
4. Check whether another system is already polling the inverter, and stop it while you test.

### Setup says the device does not answer as a SolarEdge inverter

Something answers on that address and device ID, but it is not a SolarEdge inverter:

1. Check the device ID, which is `1` on SolarEdge inverters. Another Modbus device on the same address can answer on a different ID.
2. Check that the host belongs to the inverter, and not to another device that took over its address.

### Setup says this is a different inverter

Home Assistant recognizes your inverter by its serial number. This message means the inverter that answers is not the one this entry was set up for, usually because addresses were handed out again on your network:

1. Look up the inverter's current address, and give it a fixed address while you are there.
2. Select **Reconfigure** on the integration entry and enter the new address.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

The Modbus TCP setting stays enabled on the inverter. You can turn it off in the inverter's own settings if nothing else uses it.
