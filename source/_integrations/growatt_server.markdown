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

The **Growatt** {% term integration %} enables you to retrieve data from Growatt inverters. During setup, you can choose from various regional endpoint servers:

- For users in China:

  ```text
  https://openapi-cn.growatt.com/
  ```

- For users in North America:

  ```text
  https://openapi-us.growatt.com/
  ```

- For users in Australia and New Zealand:

  ```text
  https://openapi-au.growatt.com/
  ```

- For users in other regions:

  ```text
  https://openapi.growatt.com/
  ```

- SMTEN server:

  ```text
  http://server.smten.com/
  ```

- Era server (Atess Power):

  ```text
  http://ess-server.atesspower.com/
  ```

Selecting the appropriate server for your region or service provider improves the reliability and performance of data collection.

Once configured, the integration connects to your Growatt account. If you have multiple plants, you can select which one to integrate. It will then create entities for your plant and inverters, allowing you to monitor energy production and control settings in Home Assistant.

## Prerequisites

- Growatt account
- Login credentials or API token for your Growatt account, you will need them during setup of the integration

{% include integrations/config_flow.md %}

## Authentication

The integration supports two authentication methods:

- **Username and password**: Use your Growatt account credentials to authenticate.
- **API token**: Use an API token for more secure and stable authentication using the official Growatt API. This is the preferred method - check compatibility with your inverter below.

### Obtaining an API token

To obtain an API token for your Growatt account:

1. Log in to your Growatt account on the [Growatt server](https://server.growatt.com/).
2. Navigate to **Settings** > **Account Management** > **API Key**.
3. Generate or retrieve your API token.
4. Use this token during the integration setup in Home Assistant.

If your inverter supports API token, this authentication method is recommended as it uses the official Growatt API, which offers better stability, support and feature growth.

### Compatibility

#### Classic API

When using username and password authentication the Growatt integration uses the same API as the ShinePhone app. Hence, if your inverter can be controlled via the ShinePhone app, the Growatt integration can access the same data.

#### API token

Authentication using API token is currently supported for the following inverters. For the integration to support additional models, they must first be supported by the [Growatt Python library](https://github.com/indykoning/PyPi_GrowattServer).

**MIC 600-3300TL-X Series**: 600TL-X, 750TL-X, 800TL-X, 1000TL-X, 1500TL-X, 2000TL-X, 3000TL-X, 3300TL-X

**MIN 2500-6000TL-X Series**: 2500TL-X, 3000TL-X, 3600TL-X, 4200TL-X, 4600TL-X, 5000TL-X, 6000TL-X

**MIN 2500-6000TL-XE Series**: 2500TL-XE, 3000TL-XE, 3600TL-XE, 4200TL-XE, 4600TL-XE, 5000TL-XE, 6000TL-XE

**MIN 2500-6000TL-XH Series**: 2500TL-XH, 3600TL-XH, 4200TL-XH, 4600TL-XH, 5000TL-XH, 6000TL-XH

**MIN 2500-6000TL-XA Series**: 2500TL-XA, 3000TL-XA, 3600TL-XA, 4200TL-XA, 4600TL-XA, 5000TL-XA

**MIN 3000-7600TL-XH US Series**: 3000TL-XH US, 3800TL-XH US, 5000TL-XH US, 6000TL-XH US, 7600TL-XH US, 8200TL-XH US, 9000TL-XH US, 10000TL-XH US, 11400TL-XH US

**MOD 3-10KTL3-XH Series**: 3000TL3-XH, 4000TL3-XH, 5000TL3-XH, 6000TL3-XH, 7000TL3-XH, 8000TL3-XH, 9000TL3-XH, 10KTL3-XH

**MID 11-30KTL3-XH Series**: 11KTL3-XH, 12KTL3-XH, 13KTL3-XH, 15KTL3-XH, 17KTL3-XH, 20KTL3-XH, 25KTL3-XH, 30KTL3-XH

## Known limitations

### Rate limiting with username/password authentication

The classic API (username/password authentication) has strict rate limits that can result in your account being locked out for up to 24 hours if these limits are exceeded. To avoid this issue, use one of the following options:

- **Option 1: Your inverter supports API token**: Use token authentication instead, as this uses the official Growatt V1 API that does not have this limitation.
- **Option 2: Your inverter doesn't support API token**: Avoid all unnecessary integration reloads, as a reload triggers re-login via Growatt classic API.

## Inverter controls

When using API token authentication, the integration provides additional control entities:

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
   - Consider switching to API token authentication if you have a supported inverter.
   - Avoid frequent integration reloads, which can trigger rate limits.

3. **Prevent lockouts during Home Assistant restarts**:
   - If you experience frequent lockouts, temporarily disable the integration before restarting Home Assistant.
   - To disable: Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the Growatt integration, click the three dots {% icon "mdi:dots-vertical" %} menu, and select **Disable**.
   - Re-enable after Home Assistant has fully restarted.

## Removing the integration

{% include integrations/remove_device_service.md %}
