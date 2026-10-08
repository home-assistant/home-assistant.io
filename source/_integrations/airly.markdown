---
title: Airly
description: Instructions on how to integrate Airly within Home Assistant.
ha_category:
  - Health
ha_release: 0.101
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: airly
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **Airly** {% term integration %} uses the [Airly](https://airly.org/) web service as a source for air quality data for your location.

## Setup

To generate an Airly API key, go to [Airly for developers](https://developer.airly.org/register) page.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
    description: "The API key for your Airly account."
Latitude:
    description: "The latitude of the location for which to retrieve air quality data. By default, Home Assistant uses your home location."
Longitude:
    description: "The longitude of the location for which to retrieve air quality data. By default, Home Assistant uses your home location."
{% endconfiguration_basic %}

{% note %}
Airly allows 100 data updates per day. For this reason, the more Airly instances
configured, the less frequent updates will be. For one configured Airly instance,
data will be updated every 15 minutes, for two configured instances, data will
be updated every 30 minutes, for three configured instances, data will be 
updated every 45 minutes, and so on.
{% endnote %}

## Supported functionality

The **Airly** integration provides the following entities. Which entities are created depends on the data available from the Airly measuring stations closest to your location.

### Sensors

- **Common air quality index**
  - **Description**: Shows the Common Air Quality Index (CAQI) for your location. The `level`, `description`, and `advice` attributes provide a human-readable air quality level and a recommendation from Airly.
- **PM1**
  - **Description**: Shows the concentration of particulate matter smaller than 1 micrometer in micrograms per cubic meter.
- **PM2.5**
  - **Description**: Shows the concentration of particulate matter smaller than 2.5 micrometers in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **PM10**
  - **Description**: Shows the concentration of particulate matter smaller than 10 micrometers in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Carbon monoxide**
  - **Description**: Shows the carbon monoxide concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Nitrogen dioxide**
  - **Description**: Shows the nitrogen dioxide concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Ozone**
  - **Description**: Shows the ozone concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Sulphur dioxide**
  - **Description**: Shows the sulfur dioxide concentration in micrograms per cubic meter. The `limit` and `percent` attributes show the recommended limit and the measured value as a percentage of that limit.
- **Humidity**
  - **Description**: Shows the relative humidity in percent.
- **Pressure**
  - **Description**: Shows the atmospheric pressure in hectopascals.
- **Temperature**
  - **Description**: Shows the air temperature in degrees Celsius.

## Known limitations

Airly allows 100 data updates per day. Data updates become less frequent as you add Airly integration instances, as described in [Setup](#setup).

## Troubleshooting

{% details "Can't set up the integration: no measuring stations in this area" %}

### Symptom: No Airly measuring stations in this area

When you try to set up the integration, Home Assistant shows the message "No Airly measuring stations in this area."

#### Description

Airly only provides data for locations covered by its measuring stations. During setup, the integration first looks for data at the exact coordinates you entered. If there is no data for that point, it looks for the nearest station within 5 kilometers. If neither search finds a station, setup stops with this message.

#### Resolution

1. Open the [Airly map](https://airly.org/map/) and check whether there is a measuring station near your location.
2. If there is a station nearby, set up the integration again and enter coordinates closer to that station.

{% enddetails %}

{% details "Sensors are unavailable" %}

### Symptom: Sensors become unavailable

The Airly sensors show as unavailable, or the Airly entry on the {% my integrations title="**Settings** > **Devices & services**" %} page shows **Retrying setup**. {% my logs title="**Settings** > **System** > **Logs**" %} contains a message like "An error occurred while retrieving data from the Airly API for Airly: ...".

#### Description

The integration marks its sensors as unavailable when it can't get data from Airly. The text after the colon tells you why:

- "no measuring stations in this area": The measuring station nearest to your location stopped reporting data. Stations can be offline temporarily, or they can be removed.
- `AirlyError(429, ...)`: The daily request limit of your API key has been used up. The limit is reset at midnight UTC.
- Any other text: Home Assistant can't reach the Airly service, or the service returned an error.

#### Resolution

- If the station stopped reporting, open the [Airly map](https://airly.org/map/) and check whether the station is still active. If the station is back, the sensors become available again on their own. If the station is gone, add the integration again with coordinates near another station, then remove the old entry. The location of an existing entry can't be changed. The new entry creates new sensors, so update any automations and dashboards that use the old ones.
- If the request limit has been used up, wait until midnight UTC. The sensors become available again on their own. If this happens regularly, check whether the same API key is also used by other applications or by another Home Assistant installation. To see how many requests are left, go to {% my repairs title="**Settings** > **System** > **Repairs**" %}, select the three dots {% icon "mdi:dots-vertical" %} menu, and select **System information**.
- In all other cases, check that Home Assistant can reach the internet. The integration tries again automatically.

{% enddetails %}

{% details "Some sensors are missing" %}

### Symptom: Some sensors from the sensors list are not created

Some of the sensors, for example **Carbon monoxide** or **Ozone**, don't exist for your Airly entry.

#### Description

The integration creates sensors only for the measurements that the nearest station reported when the integration was set up. Not every station measures every value.

#### Resolution

If the station started reporting additional values later, reload the integration. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Airly**, select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reload**.

{% enddetails %}

{% details "Home Assistant asks for a new API key" %}

### Symptom: Authentication failed for Airly, please update your API key

Home Assistant asks you to reauthenticate the Airly integration, or the log shows the message "Authentication failed for Airly, please update your API key".

#### Description

Your API key is no longer accepted by Airly. This happens, for example, when the key was revoked or regenerated on the [Airly for developers](https://developer.airly.org/) page.

#### Resolution

1. Generate a new API key on the [Airly for developers](https://developer.airly.org/) page.
2. If Home Assistant shows a reauthentication prompt, select it and enter the new API key.
3. Otherwise, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Airly**, select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**. Enter the new API key.

If the new key is rejected with the message "No Airly measuring stations in this area.", the station near your location is no longer available. See the resolution for unavailable sensors.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
