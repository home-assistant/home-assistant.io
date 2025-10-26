---
title: Growatt
description: Instructions on how to integrate your Growatt server solar inverter within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_domain: growatt_server
ha_platforms:
  - number
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: integration
---

The Growatt integration allows you to retrieve data from Growatt inverters. During setup, you can choose from various regional endpoint servers:

- For users in China: https://openapi-cn.growatt.com/
- For users in North America: https://openapi-us.growatt.com/
- For users in other regions: https://openapi.growatt.com/
- SMTEN server: http://server.smten.com/

Selecting the appropriate server for your region improves the reliability and performance of data collection.

Once integrated, the sensor logs into your Growatt account and retrieves your plants. If you have multiple plants, you can select which one to integrate. The integration then retrieves the inverters associated with the selected plant and generates sensors for these inverters, as well as overall plant sensors.

## Authentication

The integration supports two authentication methods:

- **Username and password**: Use your Growatt account credentials to authenticate.
- **API token**: Use an API token for more secure and stable authentication using the official Growatt API (only MIN/TLX inverters currently supported).

### Obtaining an API token

To obtain an API token for your Growatt account:

1. Log in to your Growatt account on the [Growatt server](https://server.growatt.com/).
2. Navigate to **Settings** > **Account Management** > **API Key**.
3. Generate or retrieve your API token.
4. Use this token during the integration setup in Home Assistant.

Using an API token is recommended for MIN/TLX inverters as it uses the official Growatt V1 API, which offers better stability, support and feature growth.

## Prerequisites

- Growatt account
- Login credentials to that Growatt account, you will need them during setup of the integration

{% include integrations/config_flow.md %}

## Inverter controls

When using API token authentication with MIN/TLX inverters, the integration provides additional control entities:

{% important %}
These controls directly modify your inverter's operational settings. Only change these values if you understand their impact on your system. Incorrect settings may damage your battery, reduce system efficiency, or void your warranty. Use at your own risk.
{% endimportant %}

### Numbers

- **Charge power**
  - **Description**: Set the charge power as a percentage (0-100%)
- **Charge stop SOC**
  - **Description**: Set the state of charge at which charging should stop (0-100%)
- **Discharge power**
  - **Description**: Set the discharge power as a percentage (0-100%)
- **Discharge stop SOC**
  - **Description**: Set the state of charge percentage at which discharging should stop (0-100%)

### Switches

- **AC charge**
  - **Description**: Enable or disable AC charging

## Actions

The integration provides the following actions for managing Time-of-Use (TOU) battery schedules on MIN inverters:

### Action `growatt_server.update_time_segment`

Configure individual time segments (1-9) with battery operation mode, time range, and enable/disable state for automated battery charging and discharging schedules.

{% important %}
This action modifies your inverter's TOU scheduling settings. Incorrect configuration may affect your battery's charging/discharging behavior and energy costs. Ensure you understand your electricity tariff structure before making changes.
{% endimportant %}

**Data attributes:**

- **device_id** *(string, optional)*: The device ID of the inverter. Required only when multiple devices are present
- **segment_id** *(integer, required)*: Time segment number (1-9)
- **batt_mode** *(string, required)*: Energy priority mode for the system:
  - `load_first`: Prioritize powering home loads from available energy sources (solar/battery), discharge battery when needed to meet home consumption
  - `battery_first`: Prioritize charging the battery from available sources (solar/grid)  
  - `grid_first`: Prioritize exporting energy to grid from available sources (solar/battery), will discharge battery for grid export
  
  {% note %}
  The battery mode controls when and why discharge occurs. The actual discharge rate is controlled by the **Discharge power** number entity (0-100%).
  {% endnote %}
- **start_time** *(time, required)*: Start time for the segment (HH:MM format)
- **end_time** *(time, required)*: End time for the segment (HH:MM format)
- **enabled** *(boolean, required)*: Whether this time segment is active

### Action `growatt_server.read_time_segments`

Read the current configuration of all 9 time segments from the inverter. This action returns the complete TOU schedule configuration.

**Data attributes:**

- **device_id** *(string, optional)*: The device ID of the MIN inverter. Required only when multiple devices are present

## Examples

### Off-peak charging schedule

Charge the battery during cheap electricity hours (e.g., midnight to 6 AM):

```yaml
action: growatt_server.update_time_segment
data:
  segment_id: 1
  batt_mode: "battery_first"
  start_time: "00:00"
  end_time: "06:00"
  enabled: true
  # For multiple devices, add device_id: "MIN12345"
```

{% note %}
Remember to also set the **Charge power** number entity (0-100%) to control the charging power rate during this time period.
{% endnote %}

### Peak hour export schedule

Export battery power to grid during expensive electricity hours (e.g., 4 PM to 8 PM):

```yaml
action: growatt_server.update_time_segment
data:
  segment_id: 2
  batt_mode: "grid_first"
  start_time: "16:00"
  end_time: "20:00"
  enabled: true
```

{% note %}
Remember to also set the **Discharge power** number entity (0-100%) to control the discharge power rate during this time period.
{% endnote %}

### Daytime home priority schedule

Prioritize home consumption during typical usage hours (e.g., 6 AM to 10 PM):

```yaml
action: growatt_server.update_time_segment
data:
  segment_id: 3
  batt_mode: "load_first"
  start_time: "06:00"
  end_time: "22:00"
  enabled: true
```

### Reading current TOU configuration

Check your current time segment settings:

```yaml
action: growatt_server.read_time_segments
```
