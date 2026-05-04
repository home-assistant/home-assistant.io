---
title: OpenAQ
description: Instructions on how to integrate OpenAQ air quality data within Home Assistant.
ha_category:
  - Health
ha_release: 2026.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jeeftor'
ha_domain: openaq
ha_platforms:
  - sensor
ha_integration_type: service
---

The **OpenAQ** {% term integration %} uses the [OpenAQ](https://openaq.org/) service to monitor recent air quality measurements from public monitoring locations.

OpenAQ collects public air quality data from many providers around the world. In Home Assistant, you can add one or more OpenAQ monitoring locations and create sensors for the latest supported measurements reported by each location.

## Prerequisites

You need an OpenAQ API key. Sign up for an API key from the [OpenAQ Explorer registration page](https://explore.openaq.org/register). You can manage your API key from your [OpenAQ Explorer account settings](https://explore.openaq.org/account).

Treat your API key like a password. Do not share it or publish it in screenshots, logs, or public configuration examples.

## Configuration

{% include integrations/config_flow.md %}

During setup, enter your OpenAQ API key. Home Assistant validates the key before creating the integration entry.

After the integration is added, add at least one monitoring location:

1. Under **Settings** > **Devices & services**, select the **OpenAQ** integration.
2. Select **Add monitoring location**.
3. Choose how to find the monitoring location:
   - **Location**: Select a point on the map, set a search radius, and choose one of the returned monitoring locations. The default radius is 10000 meters, and the maximum radius is 25000 meters.
   - **Location ID**: Enter a known OpenAQ location ID directly.
4. Select the monitoring location to add.

You can add multiple OpenAQ monitoring locations to the same OpenAQ integration entry. The same OpenAQ location can only be added once, even across multiple OpenAQ integration entries.

## Supported functionality

The OpenAQ integration creates sensor entities for supported measurements that have a numeric latest value at the selected monitoring location.

Supported sensor measurements:

- Black carbon
- Carbon dioxide
- Carbon monoxide
- Nitrogen dioxide
- Nitrogen monoxide
- Nitrogen oxides
- Ozone
- PM1
- PM2.5
- PM10
- Sulphur dioxide

Home Assistant uses the unit reported by OpenAQ when creating sensor states. Common concentration units, such as parts per million, parts per billion, milligrams per cubic meter, and micrograms per cubic meter, are mapped to Home Assistant units.

## Data updates

OpenAQ data is polled every 10 minutes.

Each update fetches the selected monitoring location, the latest measurements for that location, and the sensors available at that location. If Home Assistant cannot reach OpenAQ during an update, the entities for that monitoring location become unavailable until a later update succeeds.

## Known limitations

OpenAQ does not include every air quality monitoring location or provider in the world. Available measurements depend on the selected monitoring location and the data provided to OpenAQ.

Sensors are created for supported measurements that have a numeric latest value when the monitoring location is set up. If a supported measurement is missing, has no latest value, or reports a non-numeric value, Home Assistant does not create an entity for it. Reload the integration after OpenAQ starts reporting a supported latest value for that location.

Unsupported OpenAQ parameters are ignored.

## Troubleshooting

### Invalid authentication

If setup reports invalid authentication, confirm that your OpenAQ API key is correct. You can view or rotate your key from your [OpenAQ Explorer account settings](https://explore.openaq.org/account).

### No monitoring locations found

If the location search does not find a monitoring location, try a larger radius or move the map point closer to a known monitoring station. The maximum search radius is 25000 meters.

You can also add a monitoring location by entering its OpenAQ location ID directly.

### Rate limit exceeded

If Home Assistant reports that the OpenAQ rate limit was exceeded, wait and try again later. If you use the same API key with other tools, those requests also count toward your OpenAQ API usage.

### Expected sensors are missing

Sensors are only created for supported parameters that have a numeric latest value at the selected OpenAQ monitoring location. Check the monitoring location in OpenAQ to confirm that it reports the expected parameter and has recent data.

If OpenAQ starts reporting a supported parameter after the monitoring location was added, reload the OpenAQ integration in Home Assistant.

## Removing the integration

To remove OpenAQ from Home Assistant:

1. Under **Settings** > **Devices & services**, select the **OpenAQ** integration.
2. Select the three-dot menu.
3. Select **Delete**.

Removing the integration removes the OpenAQ integration entry and its monitoring location sensors from Home Assistant. It does not delete your OpenAQ account or API key.
