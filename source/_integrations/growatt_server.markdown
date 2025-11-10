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
ha_codeowners:
  - '@johanzander'
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
