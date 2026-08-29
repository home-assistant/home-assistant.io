---
title: Sunsynk
description: Instructions on how to integrate Sunsynk inverters within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2026.10
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jamesridgway'
ha_domain: sunsynk
ha_platforms:
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Sunsynk** {% term integration %} gets data from the [Sunsynk](https://www.sunsynk.org) cloud and shows it in Home Assistant.

Sunsynk makes hybrid solar inverters and batteries. The inverter sends its data to the Sunsynk cloud. You can see this data in the Sunsynk Connect app and on the [Sunsynk Connect](https://sunsynk.net) website. This integration reads the same data.

## Prerequisites

- A Sunsynk inverter that is connected to the Sunsynk cloud with a Wi-Fi or Ethernet data logger.
- A Sunsynk Connect account. Use the same email address and password that you use in the Sunsynk Connect app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: The email address of your Sunsynk Connect account.
Password:
  description: The password of your Sunsynk Connect account.
{% endconfiguration_basic %}

The integration adds all inverters of the account. Each inverter is a device in Home Assistant. If you do not want an inverter, you can disable the device.

## Supported devices

The integration supports all Sunsynk inverters that send data to the Sunsynk cloud.

## Supported functionality

The integration creates the sensors below for each inverter. The sensors are read-only.

### Solar

- **Solar power** (W): The power that the solar panels produce now.
- **Solar energy today** (kWh): The energy that the solar panels produced today.
- **Solar energy total** (kWh): The energy that the solar panels produced since installation.

### Grid

- **Grid power** (W): The power that flows between the grid and the inverter now. The sign is the same as in the Sunsynk Connect app.
- **Grid import today** (kWh): The energy that came from the grid today.
- **Grid import total** (kWh): The energy that came from the grid since installation.
- **Grid export today** (kWh): The energy that went to the grid today.
- **Grid export total** (kWh): The energy that went to the grid since installation.
- **Grid frequency** (Hz): The frequency of the grid. This sensor is disabled by default.

### Battery

- **Battery power** (W): The power that flows between the battery and the inverter now. The sign is the same as in the Sunsynk Connect app.
- **Battery state of charge** (%): The charge level of the battery.
- **Battery charge today** (kWh): The energy that went into the battery today.
- **Battery charge total** (kWh): The energy that went into the battery since installation.
- **Battery discharge today** (kWh): The energy that came out of the battery today.
- **Battery discharge total** (kWh): The energy that came out of the battery since installation.
- **Battery voltage** (V), **Battery current** (A) and **Battery temperature** (°C): These sensors are disabled by default.

### Load

- **Load power** (W): The power that your home uses now.
- **Load energy today** (kWh): The energy that your home used today.
- **Load energy total** (kWh): The energy that your home used since installation.

## Data updates

The integration polls the Sunsynk cloud every 5 minutes. The inverter sends new data to the cloud every 5 minutes, so a shorter interval does not give newer data.

## Actions

This integration does not provide additional actions.

## Sunsynk automation examples

The sensors of this integration are useful in the energy dashboard and in automations.
Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Energy dashboard

Use these sensors in the [energy dashboard](/docs/energy/):

| Energy dashboard setting         | Sensor                  |
| -------------------------------- | ----------------------- |
| Grid consumption                 | Grid import total       |
| Return to grid                   | Grid export total       |
| Solar production                 | Solar energy total      |
| Energy going into the battery    | Battery charge total    |
| Energy coming out of the battery | Battery discharge total |

### Automation: Notify when the battery is low

Send a notification when the battery state of charge drops below 20%.

- **Trigger**: Numeric state: Battery state of charge below 20
- **Action**: Send a notification

{% details "YAML example for a low battery notification" %}

{% example %}
automation: |
  alias: "Notify when the battery is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.inverter_battery_state_of_charge
      below: 20
  actions:
    - action: notify.notify
      data:
        message: "The battery is at {{ states('sensor.inverter_battery_state_of_charge') }}%."
{% endexample %}

{% enddetails %}

### Automation: Use excess solar power

Turn on a water heater when the solar panels produce more than 3 kW for 10 minutes. Turn it off again when solar power drops below 1 kW.

- **Trigger**: Numeric state: Solar power above 3000 for 10 minutes
- **Action**: Turn on the water heater switch

{% details "YAML example for using excess solar power" %}

{% example %}
automation: |
  alias: "Use excess solar power"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.inverter_solar_power
      above: 3000
      for:
        minutes: 10
      id: "on"
    - trigger: numeric_state
      entity_id: sensor.inverter_solar_power
      below: 1000
      for:
        minutes: 10
      id: "off"
  actions:
    - action: "switch.turn_{{ trigger.id }}"
      target:
        entity_id: switch.water_heater
{% endexample %}

{% enddetails %}

## Known limitations

- The integration reads data only. It cannot change settings on the inverter.
- The data comes from the Sunsynk cloud. If the inverter loses its internet connection, the data does not update.
- Sunsynk limits the number of API requests. Do not use the same account in other tools that poll the API often.

## Troubleshooting

### The integration cannot connect

Make sure that Home Assistant has an internet connection and that [Sunsynk Connect](https://sunsynk.net) is online.

### The password is no longer valid

If you change the password of your Sunsynk Connect account, Home Assistant asks you to enter the new password. Go to **{% my integrations title="Settings > Devices & services" %}**, select the Sunsynk integration and select **Reconfigure**.

### The values do not match the Sunsynk Connect app

The integration and the app read the same data from the cloud. A small difference is possible because the integration polls every 5 minutes.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
