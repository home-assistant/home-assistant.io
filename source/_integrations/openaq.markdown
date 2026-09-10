---
title: OpenAQ
description: Monitor real-time air quality data from public monitoring stations around the world using OpenAQ.
ha_category:
  - Environment
  - Health
  - Sensor
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

{% include integrations/config_flow.md %}

OpenAQ setup has two parts. First, add the OpenAQ service with your API key. Then, add one or more monitoring locations.

{% configuration_basic %}
API key:
  description: Your OpenAQ API key. You can find it in your [OpenAQ Explorer account settings](https://explore.openaq.org/account). Home Assistant validates the key before creating the integration entry.
{% endconfiguration_basic %}

### Add monitoring locations

After the OpenAQ integration is added, add at least one monitoring location:

1. Under {% my integrations title="**Settings** > **Devices & services**" %}, select the **OpenAQ** integration.
2. Select **Add monitoring location**.
3. Select a point on the map, set a maximum search radius, and select **Submit**. The default radius is 25,000 meters (25 km), which is also the maximum.
4. Choose one of the suggested monitoring locations.

The radius field uses meters because OpenAQ searches by radius in meters. Home Assistant searches outward from the selected map point and shows up to 10 suggested monitoring locations. The suggestions are ranked by distance first. If multiple locations have the same distance, locations with more supported sensor measurements are shown first. The list shows the supported measurement codes and distance for each suggestion. Monitoring locations that do not report any supported measurements are not shown. Monitoring locations that you already added are also not shown. To add another suggested monitoring location, run **Add monitoring location** again.

You can add multiple OpenAQ monitoring locations to the same OpenAQ integration entry. The same OpenAQ location can only be added once, even across multiple OpenAQ integration entries.

## Supported functionality
The **OpenAQ** integration provides the following entities.

### Sensors
The OpenAQ integration creates sensor entities for supported measurements reported by the selected monitoring location. If a supported measurement does not have a latest value, Home Assistant creates the entity with an unknown state until OpenAQ reports a numeric latest value.

Supported sensor measurements:

- BC: Black carbon
- CO: Carbon monoxide
- CO2: Carbon dioxide
- NO: Nitrogen monoxide
- NO2: Nitrogen dioxide
- NOx: Nitrogen oxides
- O3: Ozone
- PM1: Particulate matter 1
- PM2.5: Particulate matter 2.5
- PM10: Particulate matter 10
- SO2: Sulphur dioxide

Home Assistant uses the unit reported by OpenAQ when creating sensor states. Common concentration units, such as parts per million, parts per billion, milligrams per cubic meter, and micrograms per cubic meter, are mapped to Home Assistant units.

OpenAQ measurements can include many decimal places. Home Assistant suggests a sensible display precision for these sensors so dashboards stay readable. The raw state value is not rounded by the integration.

## Data updates

OpenAQ data is {% term polling polled %} every 10 minutes.

When the integration loads, Home Assistant fetches the location details, its available sensors, and the latest measurements. On every subsequent poll, only the latest measurements are fetched. Location and sensor metadata are cached until the integration reloads. If Home Assistant cannot reach OpenAQ during a poll, the entities for that monitoring location become unavailable until the next successful poll.

## Known limitations

OpenAQ does not include every air quality monitoring location or provider in the world. Available measurements depend on the selected monitoring location and the data provided to OpenAQ.

Sensors are created for supported measurements reported by the monitoring location. If a supported measurement is missing from the monitoring location metadata, Home Assistant does not create an entity for it. If OpenAQ reports the supported measurement but no latest value is available, Home Assistant creates the entity with an unknown state.

Unsupported OpenAQ parameters are ignored.

## Troubleshooting

### Invalid authentication

If the setup reports invalid authentication, confirm that your OpenAQ API key is correct. You can view or rotate your key from your [OpenAQ Explorer account settings](https://explore.openaq.org/account).

### No monitoring locations found

If the location search does not find a monitoring location, try a larger radius or move the map point closer to a known monitoring location. The maximum search radius is 25,000 meters.

### Rate limit exceeded

If Home Assistant reports that the OpenAQ rate limit was exceeded, wait and try again later. If you use the same API key with other tools, those requests also count toward your OpenAQ API usage.

### Expected sensors are missing

Sensors are only created for supported parameters reported by the selected OpenAQ monitoring location. Check the monitoring location in OpenAQ to confirm that it reports the expected parameter.

If OpenAQ starts reporting a supported parameter after the monitoring location was added, reload the OpenAQ integration in Home Assistant. If the entity exists but its state is unknown, wait for OpenAQ to report a numeric latest value.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

Removing the integration removes the OpenAQ integration entry and its monitoring location sensors from Home Assistant. It does not delete your OpenAQ account or API key.
