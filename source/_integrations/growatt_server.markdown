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
ha_integration_type: hub
ha_codeowners:
  - '@johanzander'
---

The **Growatt** {% term integration %} enables you to retrieve data from Growatt inverters and control certain inverter settings.

Once configured, the integration connects to your Growatt account and creates entities for your plant and inverters, allowing you to monitor energy production and control settings in Home Assistant. You can select from various regional server endpoints during setup to ensure optimal connectivity for your account location.

If you have multiple plants registered in your Growatt account, you can select which one to integrate during the setup process.

## Prerequisites

- A Growatt system and account
- Login credentials (username and password) or API token for your Growatt account

{% include integrations/config_flow.md %}

During setup, you'll be asked to provide the following parameters:

{% configuration_basic %}
Server:
  description: "Select the server region that matches your Growatt account location. See the **Server regions** section below for available options."
Username:
  description: "Your Growatt account username (typically your email address). Required when using username and password authentication."
Password:
  description: "Your Growatt account password. Required when using username and password authentication."
API token:
  description: "Your Growatt API token used for authentication. Required when using API token authentication."
Plant:
  description: "Select which plant to integrate if you have multiple plants registered in your Growatt account."
{% endconfiguration_basic %}

### Server regions

The **Server** parameter offers the following options:

- **North America**: For accounts registered in the United States or Canada. Uses `https://openapi-us.growatt.com/`
- **Australia/New Zealand**: For accounts registered in Australia or New Zealand. Uses `https://openapi-au.growatt.com/`
- **China**: For accounts registered in China. Uses `https://openapi-cn.growatt.com/`
- **Other regions**: Default option to be used for all locations worldwide except those listed above. Uses `https://openapi.growatt.com/`
- **SMTEN server**: For SMTEN-branded systems. Uses `http://server.smten.com/`
- **Era server (Atess Power)**: For Atess Power systems. Uses `http://ess-server.atesspower.com/`

Selecting the correct server region for your account location improves the reliability and performance of data collection.

## Authentication

The integration supports two authentication methods:

- **Username and password**: Use your Growatt account credentials for authentication.
- **API token**: Use an API token for authentication. This is the officially supported method by Growatt and offers better security, more features, and improved stability. Not all inverter models are supported yet—check the **Compatibility** section below to confirm your inverter is supported.

### Obtaining an API token

You can generate an API token using either the web interface or the ShinePhone mobile app.

{% details "Generate API token via web interface" %}

1. Log in to your Growatt account on the [Growatt server](https://server.growatt.com/).
2. Navigate to **Settings** > **Account Management** > **API Key**.
3. Select **Generate** or **Retrieve** to get your API token.
4. Copy the token and use it during the integration setup in Home Assistant.

{% enddetails %}

{% details "Generate API token via ShinePhone mobile app" %}

1. Download and install the **ShinePhone** app from the [App Store (iOS)](https://apps.apple.com/us/app/shinephone/id1500039308) or [Google Play Store (Android)](https://play.google.com/store/apps/details?id=com.growatt.shinephone).
2. Log in with your Account Manager username (visitor accounts cannot generate API tokens).
3. Go to the **Me** tab.
4. Select your username.
5. Select **API Token**.
6. Select **Reopen** to generate a new API token.
7. Copy the token and use it during the integration setup in Home Assistant.

{% enddetails %}

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

## Actions

The integration provides the following actions for managing Time-of-Use (TOU) battery schedules on MIN inverters:

### Action: Update time segment

The `growatt_server.update_time_segment` action configures individual time segments (1-9) with battery operation mode, time range, and enable/disable state for automated battery charging and discharging schedules.

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

### Action: Read time segments

The `growatt_server.read_time_segments` action reads the current configuration of all 9 time segments from the inverter and returns the complete TOU schedule configuration.

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

## Troubleshooting

### API token authentication shows "No plant found" error

If you're getting a "No plant found" error when using API token authentication, but username/password authentication works correctly, the problem is often related to how the API token was created.

Some people have reported that API tokens generated via the web interface do not work properly, while tokens generated in the ShinePhone mobile app work correctly.

Try the following steps:

1. Generate a new API token using the **ShinePhone mobile app** instead of the web interface.
2. Reconfigure the Growatt integration in Home Assistant to use the new API token. See the **Obtaining an API token** section above for detailed instructions on generating and using a token via the mobile app.
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

### Enable debug logging

To help diagnose issues, enable debug logging:

1. Add the following to your {% term "`configuration.yaml`" %} file:

   ```yaml
   logger:
     logs:
       homeassistant.components.growatt_server: debug
   ```

2. Restart Home Assistant.
3. Try to set up or reload the integration.
4. Check the logs under {% my logs title="**Settings** > **System** > **Logs**" %}.

For more information about debug logging, see [debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

### Reporting issues

If you encounter problems with the integration that you cannot resolve using the troubleshooting steps above:

1. Enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) for the integration.
2. Reload the integration from {% my integrations title="**Settings** > **Devices & services**" %}, select **Growatt**, open the three dots menu {% icon "mdi:dots-vertical" %}, then select **Reload**.
3. Wait for the issue to occur or try to reproduce it.
4. Download the logs from {% my logs title="**Settings** > **System** > **Logs**" %}.
5. If possible, also download the [diagnostics](/integrations/diagnostics) data for the integration.
6. [Report the issue](https://github.com/home-assistant/core/issues) on GitHub, including:
   - The debug logs
   - The diagnostics data
   - Your inverter model
   - Screenshots
   - A clear description of the problem
   - Steps to reproduce the issue

Providing debug logs will help resolve your issue much faster.

## Removing the integration

{% include integrations/remove_device_service.md %}
