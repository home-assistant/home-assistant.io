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

The Growatt integration enables you to retrieve data from Growatt inverters. During setup, you can choose from various regional endpoint servers:

- For users in China:

  ```text
  https://openapi-cn.growatt.com/
  ```

- For users in North America:

  ```text
  https://openapi-us.growatt.com/
  ```

- For users in other regions:

  ```text
  https://openapi.growatt.com/
  ```

- SMTEN server:

  ```text
  http://server.smten.com/
  ```

Selecting the appropriate server for your region improves the reliability and performance of data collection.

Once configured, the integration connects to your Growatt account. If you have multiple plants, you can select which one to integrate. It will then create entities for your plant and inverters, allowing you to monitor energy production and control settings in Home Assistant.

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

Using an API token is recommended for MIN/TLX inverters as it uses the official Growatt API, which offers better stability, support and feature growth.

## Prerequisites

- Growatt account
- Login credentials to that Growatt account, you will need them during setup of the integration

{% include integrations/config_flow.md %}

## Known limitations

### Rate limiting with username/password authentication

The classic API (username/password authentication) has strict rate limits that can result in your account being locked out for up to 24 hours if exceeded. To avoid this issue:

- **For MIN/TLX inverter users**: Use API token authentication instead, which uses the official Growatt V1 API that does not have this limitation.
- **For all other users**: Avoid all unnecessary integration reloads, as a reload triggers re-login via Growatt classic API.

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

## Troubleshooting

### Account locked or authentication failing

If you're experiencing authentication failures or account lockouts:

1. **Accept new terms and conditions**: Open the ShinePhone mobile app and log in with your Growatt account. You may need to accept updated terms and conditions before the integration can access your account successfully.

2. **Account locked due to rate limiting**: If you're using username/password authentication and your account has been locked due to rate limiting:
   - Wait for the lockout period to expire (up to 24 hours).
   - Consider switching to API token authentication if you have a MIN/TLX inverter.
   - Avoid frequent integration reloads, which can trigger rate limits.

3. **Prevent lockouts during Home Assistant restarts**:
   - If you experience frequent lockouts, temporarily disable the integration before restarting Home Assistant.
   - To disable: Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the Growatt integration, click the three dots {% icon "mdi:dots-vertical" %} menu, and select **Disable**.
   - Re-enable after Home Assistant has fully restarted.

## Removing the integration

{% include integrations/remove_device_service.md %}
