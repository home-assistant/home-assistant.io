---
title: EnergyID
description: Instructions on how to integrate EnergyID into Home Assistant to send your sensor data to the EnergyID platform.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Push
ha_domain: energyid
ha_integration_type: service
ha_release: 2023.10
ha_config_flow: true
ha_codeowners:
  - '@JrtPec'
  - '@Molier'
ha_quality_scale: silver
---

The **EnergyID** {% term integration %} allows you to send data from your Home Assistant sensors to [EnergyID](https://www.energyid.eu/), a cloud-based energy management platform. This enables you to use EnergyID's tools for analysis, reporting, and insights based on data collected by your Home Assistant instance.

This integration uses EnergyID's Incoming Webhook API.

## Prerequisites

1. **EnergyID Account:** You need an active account on [EnergyID](https://www.energyid.eu/).
2. **Provisioning Credentials:** You must generate a **Provisioning Key** and **Provisioning Secret** from your EnergyID portal. These are used by Home Assistant to identify itself to EnergyID when establishing a connection.
   - For detailed instructions on generating these credentials, refer to the [official EnergyID Incoming Webhooks documentation](https://help.energyid.eu/en/developer/incoming-webhooks/).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Provisioning Key:
  description: The key from your EnergyID portal under Device Provisioning or Webhook settings.
Provisioning Secret:
  description: The secret associated with your Provisioning Key.
Device Name:
  description: A name to identify this Home Assistant connection in your EnergyID portal's webhook list.
{% endconfiguration_basic %}

## Configuration steps

The setup consists of three main steps:

1. **Connect to EnergyID**: Enter your Provisioning Key and Secret.
2. **Claim Device** (Conditional): If this is a new connection, you'll need to claim it in your EnergyID account:
   - Follow the provided **Claim URL** or enter the **Claim Code** on the EnergyID website.
   - Select which EnergyID record (property or site) should receive data from this Home Assistant instance.
3. **Finalize Setup**: Confirm the device name for this connection.

Once configured, a diagnostic status sensor will appear to monitor the connection.

## Managing sensor mappings

After initial setup, you need to configure which Home Assistant sensors should send data to EnergyID:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the EnergyID integration card and click **Configure**.
3. Choose from the following options:

### Add new sensor mapping

- **Home Assistant Sensor**: Select the sensor entity whose data you want to send.
- **EnergyID Metric Key**: Enter the key that EnergyID should use for this data.
  - Use [predefined keys](https://help.energyid.eu/en/developer/incoming-webhooks/#predefined-properties) like `el` (electricity), `pv` (solar), `gas`, or `temp` (temperature).
  - You can also use custom keys (for example, `temp.livingroom`).
  - Keys should not contain spaces.

### Manage existing mappings

- View a list of all your current sensor mappings.
- For each mapping, you can:
  - **Update EnergyID Key**: Change the metric key for the selected sensor.
  - **Delete Mapping**: Stop sending data from this sensor.

## Status sensor

The integration creates a diagnostic sensor named "EnergyID Status" with these attributes:

- **State**: Number of currently active sensor mappings.
- **claimed**: Whether the instance is successfully linked to your EnergyID account.
- **last_sync**: Timestamp of the last successful data synchronization.
- **webhook_endpoint**: The URL used to send data.
- **mapped_entities**: Dictionary of configured entity-to-key mappings.
- **webhook_policy**: Details received from EnergyID (such as uploadInterval).

## Data upload

- The integration listens for state changes of your mapped sensors.
- When a mapped sensor's state changes, its new value and the change timestamp are recorded.
- Data is pushed to EnergyID in batches based on the `uploadInterval` policy (typically every 60 seconds).
- Authentication tokens are managed automatically.

## Known limitations

- **Webhook Policy Changes**: If EnergyID updates your webhook policy, you may need to reload the integration through {% my integrations title="**Settings** > **Devices & services**" %}.
- **Timestamp Accuracy**: The integration uses the `last_updated` timestamp from Home Assistant states, so ensure your system time is accurate.

## Troubleshooting

{% details "Connection issues" %}
If the status sensor shows the device is not claimed or data is not synchronizing:

1. Ensure your EnergyID account is active.
2. Check that the device is properly claimed in your EnergyID portal.
3. Reload the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Find the EnergyID integration card, click the {% icon "mdi:dots-vertical" %} menu, and select **Reload**.
{% enddetails %}

{% details "Missing data in EnergyID" %}
If data isn't appearing in your EnergyID account:

1. Confirm the status sensor shows the device is claimed.
2. Verify your mapped sensor is delivering valid numerical values (not unknown or unavailable).
3. Check the sensor's unit matches what EnergyID expects for the given metric key.
4. Allow up to 5 minutes for data to appear in EnergyID after a state change.
{% enddetails %}

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}