---
description: Instructions on how to integrate a WAFE heat recovery ventilation unit with Home Assistant over Modbus TCP.
ha_release: 2027.1
ha_domain: wafe
---

The **WAFE** {% term integration %} connects Home Assistant to a WAFE heat recovery ventilation unit with the ACE2 controller, such as the WAFE 201 E. It talks to the unit over Modbus TCP on your local network. No cloud account is needed.

A heat recovery unit replaces the stale air in your home with fresh outdoor air, and transfers the heat of the outgoing air to the incoming air. The integration shows what the unit measures: the four air temperatures, the CO2 level, the fan speeds, the airflow it aims for and what it is doing.

## Use cases

- **Knowing your air quality.** Put the CO2 level and the air temperatures on a dashboard.
- **Seeing how well the unit recovers heat.** Compare the outdoor, supply, extract and exhaust temperatures.
- **Noticing when the ventilation stops.** Get a notification when the fans stand still for a while, for example because standby was left on or the scheduler has no plan.

## Supported devices

The integration supports WAFE units with the ACE2 controller that are connected to your network with an Ethernet cable. It was tested on a WAFE 201 E. Other ACE2 models, such as the WAFE 200, WAFE 350 E and the WAFE 1000/1100 series, use the same register map and are expected to work.

The manufacturer, WAFE s.r.o., has been in bankruptcy since December 2023. The integration talks to the unit locally and does not depend on the manufacturer or its cloud.

## Prerequisites

- The unit is connected to your network with an Ethernet cable.
- You know the unit's IP address. Give the unit a fixed address in your router, so it doesn't change.
- No other Modbus client is connected to the unit. The unit serves only one Modbus client at a time. If you set up the unit before with the [Modbus](/integrations/modbus/) integration in YAML, remove that configuration first and restart Home Assistant.

For general help with Modbus devices, refer to [Setting up a device integration that uses Modbus](/connectivity/modbus/#setting-up-a-device-integration-that-uses-modbus).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address or hostname of the unit on your network."
Port:
  description: "The Modbus TCP port of the unit. The default is `502`."
{% endconfiguration_basic %}

The integration reads the unit during setup to check that it answers. It names the unit after its model, for example **WAFE W201**.

## Supported functionality

### Sensors

- **Outdoor temperature**: The temperature of the outdoor air entering the unit (T1).
- **Supply temperature**: The temperature of the fresh air the unit blows into your rooms (T2).
- **Extract temperature**: The temperature of the room air the unit takes out (T3). It is close to your indoor temperature.
- **Exhaust temperature**: The temperature of the air the unit blows outside (T4). The lower it is compared to the extract temperature, the more heat the unit recovers.
- **Carbon dioxide**: The CO2 level of the extracted room air, in ppm. In intelligent mode the unit ventilates more when it rises.
- **Target airflow**: The airflow the unit currently aims for, in m³/h. In manual mode this is the manual airflow, in intelligent mode it follows the CO2 level, during a boost it is the maximum, and in standby it is 0. The unit does not measure the airflow it actually delivers. If a fan already runs at its maximum speed, the real airflow is lower than this value.
- **Fan 1 speed** and **Fan 2 speed**: The speeds of the unit's two fans, in rpm. They drop to 0 when the fans stop. The unit refreshes them about every 30 seconds. Which of the two is the supply fan is not documented by the manufacturer.
- **State**: What the unit is doing: **Ventilation**, **Manual**, **Standby** or **Holiday**.

The temperatures are measured inside the unit, so they can differ from the temperature in your rooms or outside.

## WAFE automation examples

{% include docs/paste_yaml_tip.md %}

The entity IDs below assume the unit is named **WAFE W201**. Replace them with your own.

### Automation: Notify when the ventilation stops

This automation sends a notification when both fans have been standing still for 30 minutes, whatever the reason, for example standby, holiday mode or a scheduler without a plan.

{% details "YAML example for a stopped ventilation notification" %}

{% example %}
automation: |
  alias: "Ventilation stopped"
  triggers:
    - trigger: template
      value_template: >
        {{ states('sensor.wafe_w201_fan_1_speed') | int(-1) == 0
           and states('sensor.wafe_w201_fan_2_speed') | int(-1) == 0 }}
      for:
        minutes: 30
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The ventilation fans have been standing still for 30 minutes."
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} the unit every 5 seconds. A poll is one short Modbus request on your local network. Home Assistant only records a new state when a value changes, so the history does not grow when nothing happens.

A change made in the MyWAFE app shows up in Home Assistant within 5 seconds of the unit applying it. The unit itself takes 10 to 25 seconds to receive a change from the manufacturer's cloud. The fans need up to a minute to reach a new speed, and the unit refreshes the fan speeds about every 30 seconds.

## Known limitations

- The unit serves only one Modbus client at a time. While the [Modbus](/integrations/modbus/) integration in YAML or another tool is connected to it, this integration cannot connect.
- The unit does not measure the airflow it delivers. **Target airflow** is what it aims for.
- This integration does not show the filter status, error messages or the weekly plan. Use the MyWAFE app for them.

## Troubleshooting

{% details "Can't connect to the unit" %}

### Symptom: "No WAFE unit answered at this address"

When you set up the integration, the form shows the message "No WAFE unit answered at this address". After setup, the same problem makes all entities of the unit unavailable.

#### Description

Home Assistant cannot reach the unit at the configured address, or another Modbus client is already connected to it. The unit serves only one Modbus client at a time.

#### Resolution

1. Check that the unit is powered on and that its Ethernet cable is plugged in.
2. Check the IP address in your router. If it changed, remove the integration and add it again with the new address.
3. Make sure no other Modbus client is connected to the unit, such as a `modbus:` entry for the same address in your YAML configuration. Remove it and restart Home Assistant.
4. If it still fails, enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), reproduce the problem, and [open an issue on GitHub](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&integration_name=WAFE&integration_link=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Fwafe) with the log.

{% enddetails %}

{% details "Another WAFE unit answers at the address" %}

### Symptom: "A different WAFE unit answers at the configured address"

The integration fails to set up and shows the message "A different WAFE unit answers at the configured address".

#### Description

The unit at the configured address reports another ID than the unit you set up, for example because your router gave its IP address to another WAFE unit.

#### Resolution

Give the unit a fixed IP address in your router, then remove the integration and add it again.

{% enddetails %}

{% details "The unit has no ID" %}

### Symptom: "The unit did not report its ID"

Setup stops with the message "The unit did not report its ID".

#### Description

Home Assistant uses the unit's ID to tell units apart, so it cannot set up a unit that reports none.

#### Resolution

Check that the unit has the ACE2 controller. If it does, open an issue with the unit's model and firmware version.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
