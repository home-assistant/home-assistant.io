---
title: Energy Tracker
description: Automatically send meter readings from Home Assistant to your Energy Tracker account.
ha_category:
  - Energy
ha_release: 2025.12
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@energy-tracker'
ha_domain: energy_tracker
ha_platforms:
  - diagnostics
ha_integration_type: service
---

The **Energy Tracker** {% term integration %} makes it easy for you to monitor and analyze your home's energy usage by automatically sending meter readings from your Home Assistant sensors to your [Energy Tracker](https://www.energy-tracker.best-ios-apps.de) account.

Energy Tracker is a popular energy monitoring service, trusted by over 100,000 people, that helps you track your electricity, gas, and water consumption over time. With clear charts and insights, you can better understand your usage patterns and find ways to save energy.

By connecting Energy Tracker with Home Assistant, you can automate the submission of your meter readings. This means you no longer need to enter data manually—your readings are sent automatically, so you always have up-to-date information and can easily spot trends or unusual usage. This integration helps you take control of your energy habits and make smarter decisions for your home.

## Prerequisites

Before configuring the integration, you need:

1. An [Energy Tracker account](https://www.energy-tracker.best-ios-apps.de)
2. A **Personal Access Token** from your Energy Tracker account:
   1. Log in to your Energy Tracker account.
   2. Navigate to **API** > **Access Tokens**.
   3. Create a new Personal Access Token.
   4. Copy and save the token securely.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Account name:
    description: "A descriptive name for your Energy Tracker account."
Personal Access Token:
    description: "Your Personal Access Token from Energy Tracker. You can create one in your Energy Tracker account under **API** > **Access Tokens**."
{% endconfiguration_basic %}

You can add multiple Energy Tracker accounts by repeating the setup process.

## Getting your device ID

To send meter readings, you need your **Standard Measuring Device ID**:

### Via Energy Tracker web interface

1. Log into your Energy Tracker account.
2. Go to your device details.
3. Copy the Standard Measuring Device ID.
4. Remove the `std-` prefix from the ID.
5. The final ID should be in UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

### Via API (recommended)

1. Log into your Energy Tracker account.
2. Navigate to **API** > **Documentation**.
3. Use the API endpoint to retrieve your devices.
4. The IDs returned are already in the correct format.

## Actions

### Action: `energy_tracker.send_meter_reading`

Sends a meter reading from a Home Assistant sensor to Energy Tracker.

- **Data attribute**: `entry_id`
  - **Description**: The Energy Tracker account entry ID to use for sending the meter reading.
  - **Optional**: No
- **Data attribute**: `device_id`
  - **Description**: The standard measuring device ID in UUID format from your Energy Tracker account.
  - **Optional**: No
- **Data attribute**: `source_entity_id`
  - **Description**: The entity ID of the Home Assistant sensor that provides the meter reading.
  - **Optional**: No
- **Data attribute**: `allow_rounding`
  - **Description**: Whether to round the value to match the meter precision. Defaults to `true`.
  - **Optional**: Yes

### Supported entity types

The action accepts meter readings from:

- Sensors (`sensor.*`)
- Input numbers (`input_number.*`)
- Number entities (`number.*`)

The entity state must be numeric and not `unavailable` or `unknown`.

## Automation examples

### Daily electricity reading

Send your electricity meter reading daily at 23:55:

{% raw %}
```yaml
- alias: "Send daily electricity reading"
  triggers:
    - trigger: time
      at: "23:55:00"
  conditions:
    - "{{ states('sensor.electricity_meter') != 'unavailable' }}"
    - "{{ states('sensor.electricity_meter') != 'unknown' }}"
  actions:
    - action: energy_tracker.send_meter_reading
      data:
        entry_id: "01234567890abcdef01234567890abcd"
        device_id: "deadbeef-dead-beef-dead-beefdeadbeef"
        source_entity_id: sensor.electricity_meter
```
{% endraw %}

### Gas meter on state change

Send gas meter reading when the sensor value changes:

{% raw %}
```yaml
- alias: "Send gas reading on change"
  triggers:
    - trigger: state
      entity_id: sensor.gas_meter
  conditions:
    - "{{ trigger.to_state.state not in ['unavailable', 'unknown'] }}"
  actions:
    - action: energy_tracker.send_meter_reading
      data:
        entry_id: "01234567890abcdef01234567890abcd"
        device_id: "12345678-1234-5678-1234-567812345678"
        source_entity_id: sensor.gas_meter
```
{% endraw %}

## Data updates

Meter readings are sent on-demand via action calls. The integration does not poll Energy Tracker for data.

## Troubleshooting

### Authentication errors

If you see authentication errors after setup:

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
2. Find your Energy Tracker integration.
3. Click the {% icon "mdi:dots-vertical" %} menu and select **Reconfigure**.
4. Enter a new Personal Access Token.

### Device not found

Verify your device ID:

- Must be in UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
- Should **not** include the `std-` prefix.
- Check the ID in your Energy Tracker account or via API.

### Debug logging

Enable detailed logging by adding to your {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.energy_tracker: debug
```

Then check {% my logs title="**Settings** > **System** > **Logs**" %} for detailed information.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
