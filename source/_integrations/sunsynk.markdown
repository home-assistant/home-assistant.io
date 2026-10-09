---
title: Sunsynk
description: Instructions on how to integrate Sunsynk inverters within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: '2026.10'
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

The **Sunsynk** {% term integration %} gets data from [Sunsynk](https://www.sunsynk.org) inverters and shows it in Home Assistant.

Sunsynk makes hybrid solar inverters and batteries. The integration can get the data in two ways:

- **Sunsynk Connect account**: The inverter sends its data to the Sunsynk cloud. You can see this data in the Sunsynk Connect app and on the [Sunsynk Connect](https://sunsynk.net) website. The integration reads the same data from the cloud.
- **Modbus TCP gateway**: The integration reads the data directly from the inverter on your local network. It does not use the cloud.

## Prerequisites

### Sunsynk Connect account

- A Sunsynk inverter that is connected to the Sunsynk cloud with a Wi-Fi or Ethernet data logger.
- A Sunsynk Connect account. Use the same email address and password that you use in the Sunsynk Connect app.

### Modbus TCP gateway

- A Modbus TCP gateway on your network. The gateway connects to the RS485 port of the inverter. Many RS485 to Ethernet or RS485 to Wi-Fi converters can do this. The gateway must use Modbus TCP. RTU over TCP is not supported.
- A cable from the RS485 port of the inverter to the gateway. On the RS485 port, pin 1 is B and pin 2 is A.
- Set the gateway to 9600 baud, 8 data bits, no parity, and 1 stop bit.
- On the inverter, go to **Advanced** > **Multi-Inverter**. Make sure that **Modbus SN** is not `00`. Use this value as the unit ID. A firmware update can set the value back to `00`.

{% warning %}
The RS485 port is inside the wiring area of the inverter. The wiring area can have dangerous voltages. Before you open the inverter, follow the safety procedure in the installation manual of your inverter model. Only a qualified person must do this work. If you are not sure, ask your installer to connect the cable.
{% endwarning %}

Home Assistant can find the Sunsynk data logger on your network. The data logger has the hostname `e-linter`. When it is found, Home Assistant shows a **Sunsynk** discovery card. Select **Add** and enter your account details. You can also add the integration by hand.

{% include integrations/config_flow.md %}

When you add the integration, select how Home Assistant connects to your inverter.

### Sunsynk Connect account

{% configuration_basic %}
Username:
  description: The email address of your Sunsynk Connect account.
Password:
  description: The password of your Sunsynk Connect account.
{% endconfiguration_basic %}

The integration adds all inverters of the account. Each inverter is a device in Home Assistant, named **Inverter** and the serial number, or the alias you set in Sunsynk Connect. A battery is a second device, linked to its inverter, named **Battery** and the serial number of the inverter. If you do not want an inverter, you can disable the device.

### Modbus TCP gateway

{% configuration_basic %}
Host:
  description: The hostname or IP address of the Modbus TCP gateway.
Port:
  description: The TCP port of the Modbus TCP gateway. The default is 502.
Unit ID:
  description: The **Modbus SN** of the inverter. The default is 1.
{% endconfiguration_basic %}

Before the integration adds the inverter, it reads the serial number of the inverter. Add one entry for each inverter. The inverter is a device in Home Assistant, named **Inverter** and the serial number. If a battery is set up on the inverter, the battery is a second device, linked to its inverter, named **Battery** and the serial number of the inverter. Refer to [Battery](#battery).

You can add the same inverter with a Sunsynk Connect account and with a Modbus TCP gateway. Each connection then has its own devices and entities.

## Supported devices

- **Sunsynk Connect account**: All Sunsynk inverters that send data to the Sunsynk cloud.
- **Modbus TCP gateway**: The single-phase hybrid inverters of the SG01LP1 series.

## Supported functionality

The integration creates the sensors below for each inverter. The sensors are read-only. The two connections create the same sensors.

### Solar

- **Solar power** (W): The power that the solar panels produce now.
- **Solar energy today** (kWh): The energy that the solar panels produced today.
- **Solar energy total** (kWh): The energy that the solar panels produced since installation.

### Grid

- **Grid power** (W): The power that flows between the grid and the inverter now. The value is positive when you import from the grid and negative when you export. This is the same as in the Sunsynk Connect app.
- **Grid import today** (kWh): The energy that came from the grid today.
- **Grid import total** (kWh): The energy that came from the grid since installation.
- **Grid export today** (kWh): The energy that went to the grid today.
- **Grid export total** (kWh): The energy that went to the grid since installation.
- **Grid frequency** (Hz): The frequency of the grid. This sensor is disabled by default.

### Battery

The battery is a separate device in Home Assistant. It is linked to its inverter. If you add a battery later, reload the integration.

- **Sunsynk Connect account**: The integration creates the battery device only when the inverter reports a connected battery. The Sunsynk cloud reports one set of values for all battery packs of an inverter.
- **Modbus TCP gateway**: The integration creates the battery device only when a battery is set up on the inverter. If the battery mode of the inverter is set to no battery, the integration does not create the battery device.

- **Power** (W): The power that flows between the battery and the inverter now. The value is positive when the battery discharges and negative when it charges. This is the same as in the Sunsynk Connect app.
- **State of charge** (%): The charge level of the battery.
- **Charge today** (kWh): The energy that went into the battery today.
- **Charge total** (kWh): The energy that went into the battery since installation.
- **Discharge today** (kWh): The energy that came out of the battery today.
- **Discharge total** (kWh): The energy that came out of the battery since installation.
- **Voltage** (V), **Current** (A) and **Temperature** (°C): These sensors are disabled by default.

### Load

- **Load power** (W): The power that your home uses now.
- **Load energy today** (kWh): The energy that your home used today.
- **Load energy total** (kWh): The energy that your home used since installation.

## Data updates

### Sunsynk Connect account

The integration polls the Sunsynk cloud every 5 minutes. Each inverter polls on its own. If the cloud does not answer for one inverter, only the entities of that inverter become unavailable.

The inverter sends new data to the cloud every 5 minutes, so a shorter interval does not give newer data. To read the data of one inverter now, use the `homeassistant.update_entity` action on one of its entities.

### Modbus TCP gateway

The integration polls the inverter every 10 seconds. If the inverter does not reply, the entities of the inverter become unavailable until the next successful poll.

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
| Energy going into the battery    | Battery: Charge total    |
| Energy coming out of the battery | Battery: Discharge total |

### Automation: Notify when the battery is low

Send a notification when the battery state of charge drops below 20%.

- **Trigger**: Numeric state: Battery: State of charge below 20
- **Action**: Send a notification

{% details "YAML example for a low battery notification" %}

{% example %}
automation: |
  alias: "Notify when the battery is low"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.battery_1234567890_state_of_charge
      below: 20
  actions:
    - action: notify.notify
      data:
        message: "The battery is at {{ states('sensor.battery_1234567890_state_of_charge') }}%."
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
      entity_id: sensor.inverter_1234567890_solar_power
      above: 3000
      for:
        minutes: 10
      id: "on"
    - trigger: numeric_state
      entity_id: sensor.inverter_1234567890_solar_power
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
- With a Sunsynk Connect account, the data comes from the Sunsynk cloud. If the inverter loses its internet connection, the data does not update.
- Sunsynk limits the number of API requests. Do not use the same account in other tools that poll the API often.
- The Modbus TCP gateway connection supports only the single-phase hybrid inverters of the SG01LP1 series.
- The Modbus TCP gateway connection supports only Modbus TCP. It does not support RTU over TCP or a direct serial connection.

## Troubleshooting

### The integration cannot connect to Sunsynk Connect

Make sure that Home Assistant has an internet connection and that [Sunsynk Connect](https://sunsynk.net) is online.

### The integration cannot connect to the Modbus TCP gateway

1. Make sure that the host and the port are correct, and that Home Assistant can reach the gateway on your network.
2. On the inverter, make sure that **Modbus SN** is not `00` and that it is the same as the unit ID.
3. Make sure that the gateway uses 9600 baud, 8 data bits, no parity, and 1 stop bit.
4. If the inverter does not reply, swap the A and B wires at the gateway. This does not cause damage.

### The integration shows a different serial number

If the integration finds an inverter with a different serial number at the address, it does not show the data. This prevents incorrect data in the energy dashboard. Make sure that the host and the unit ID are correct. Then reload the integration.

### The password is no longer valid

If you change the password of your Sunsynk Connect account, the integration cannot log in and its entities become unavailable. Remove the integration and add it again with the new password.

### The values do not match the Sunsynk Connect app

The integration and the app read the same data from the cloud. A small difference is possible because the integration polls every 5 minutes.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
