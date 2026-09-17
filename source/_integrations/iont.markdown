---
title: IONT
description: Instructions on how to integrate an IONT EV charger with Home Assistant over Modbus TCP.
ha_category:
  - Car
  - Energy
ha_release: 2026.11
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Electrotom'
ha_domain: iont
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **IONT** {% term integration %} connects Home Assistant to your [IONT](https://iont.tech) EV charger over your own network, using the Modbus TCP interface built into the charger. There is no account, no API key, and no cloud service involved, so your charging data keeps arriving in Home Assistant even when your internet connection is down.

Because it talks to the charger directly, readings arrive every few seconds. That makes it a good source for the [Energy dashboard](#energy-dashboard) and for automations that steer charging on what your solar panels produce right now.

## Use cases

- **Watching a charging session.** Power, energy delivered so far, and what the vehicle is doing, as it happens.
- **Putting charging on the [Energy dashboard](#energy-dashboard).** Each connector's lifetime energy as an individual device.
- **Reacting to the charger.** A finished session or a vehicle error is a state you can automate on.

## Supported devices

Any IONT charging station with Modbus TCP enabled, AC or DC, with one or more connectors. Every connector the charger reports is added as a device of its own.

## Prerequisites

Modbus TCP has to be enabled on the charger:

1. Open the charger's administration interface in your browser. Its address is the one you will enter in Home Assistant.
2. Go to **Protocols** and enable **Modbus TCP**.

The charger listens on port `502`. Giving it a fixed address in your router keeps Home Assistant pointed at the right device.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your IONT charger. For example, `192.168.1.60`."
Port:
  description: "The port the charger listens on for Modbus requests. The default is `502`."
{% endconfiguration_basic %}

The above configuration can also be adjusted later via {% my integrations title="**Settings** > **Devices & services**" %}, select {% icon "mdi:dots-vertical" %} and select **Reconfigure**.

## Supported functionality

Your charger is added as a device, with each connector as a device of its own beneath it. All of them are read-only sensors.

### Charger sensors

- **Available power**: The charging power available right now, after every limit the charger applies.
- **Status**: What the charger is doing: **Starting**, **Operational**, **Out of order**, **Maintenance**, **Authorization not possible**, or **Deactivated**. In automations and templates, a state goes by its own value rather than the name shown here, so **Out of order** is `out_of_order`.
- **Charging strategy**: How the charger distributes power across its connectors: **Normal**, **Eco**, or **Boost**. Under eco the charger waits for surplus power before it charges.
- **User power limit**: The charging power ceiling configured on the charger.

The following sensors are added, but disabled. They describe the installation rather than the day, so they stay out of the way until you need them. To use one, enable it in the entity's settings.

- **Main breaker current** and **Charger breaker current**: The circuit breaker limits configured on the charger.
- **Uptime**: How long the charger has been running.

### Connector sensors

- **Charging state**: What the connector is doing: **Not charging**, **Charging single-phase**, **Charging three-phase**, **Charging DC**, **Paused**, or **Charging done**.
- **Vehicle state**: What is on the cable: **Not connected**, **Connected**, **Ready to charge**, **Needs ventilation**, or **Error**.
- **Power**: The power flowing into the vehicle right now.
- **Session energy**: The energy delivered in the current session.
- **Last session energy**: The energy delivered in the most recent finished session.
- **Total energy**: The lifetime reading of the connector's energy meter. This is the sensor to use on the [Energy dashboard](#energy-dashboard). It holds its last value while the charger is offline, so the statistics keep no gap.
- **Battery**: The vehicle's battery state of charge. Only added for DC connectors, since an AC charger does not talk to the battery.
- **Authorized by**: What authorized the current session: an RFID card, a timer, a remote command, free charging, Modbus, MQTT, or OCPP.
- **Current L1**, **Current L2**, **Current L3**: The current per phase.

The following sensors are added, but disabled. They are useful for troubleshooting and there are a lot of them.

- **Voltage L1**, **Voltage L2**, **Voltage L3**: The voltage per phase.
- **Frequency L1**, **Frequency L2**, **Frequency L3**: The mains frequency per phase.
- **Power limit**: The charging power ceiling configured for this connector.
- **Inner temperature** and **Ambient temperature**: Temperatures at the connector, where the hardware measures them. A connector that does not reports `0`.

## Energy dashboard

Each connector's charging fits into the [Energy dashboard](/docs/energy/individual-devices/) as an individual device:

1. Go to {% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}.
2. Under **Individual devices**, select **Add device**.
3. Select the connector's **Total energy** sensor.
4. Select **Save**.

## IONT automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: get a notification when the vehicle reports an error

- **Trigger**: **Vehicle state** changed to **Error**
- **Action**: Send a notification message

{% details "YAML example for a vehicle error notification" %}

{% example %}
automation: |
  alias: "Charger reports a vehicle error"
  triggers:
    - trigger: state
      entity_id: sensor.connector_1_vehicle_state
      to: "error"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The charger reports a vehicle or cable error on connector 1."
{% endexample %}

{% enddetails %}

### Automation: get a notification when charging is done

- **Trigger**: **Charging state** changed to **Charging done**
- **Action**: Send a notification message

{% details "YAML example for a charging-done notification" %}

{% example %}
automation: |
  alias: "Car is charged"
  triggers:
    - trigger: state
      entity_id: sensor.connector_1_charging_state
      to: "charging_done"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The car has finished charging."
{% endexample %}

{% enddetails %}

## Data updates

The **IONT** integration {% term polling polls %} the charger every 10 seconds. The charger, its settings, and each connector are read on their own, so a connector that does not answer a poll only makes its own {% term entities %} unavailable, and the rest keep updating.

Home Assistant keeps one Modbus connection per address and shares it between the integrations that use it. A [Modbus](/integrations/modbus/) setup in your {% term "`configuration.yaml`" %} is separate from this and opens its own connection to the charger.

## Known limitations

- The charger reports no serial number over Modbus, so Home Assistant recognizes it by its address. Moving the charger to another address needs a reconfigure of the entry, and two entries cannot point at the same address.
- The integration reads the charger; controlling charging from Home Assistant is not part of it yet.
- How many connectors the charger has is read when the entry loads. A connector added or removed later shows up after reloading the integration.
- The charger does not announce itself on the network, so it is not discovered automatically.

## Troubleshooting

### The charger cannot be reached

1. Make sure the charger is powered on and reachable on your network, for example by opening its administration interface.
2. Check that Modbus TCP is still enabled on the charger.
3. Check the port. The charger uses `502` unless it was changed.

### Setup says the device does not answer as an IONT charger

Something answers on that address, but it does not present as an IONT charger. Check that the host belongs to the charger and not to another Modbus device that took over its address.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Modbus TCP stays enabled on the charger. You can turn it off in the charger's administration interface if nothing else uses it.
