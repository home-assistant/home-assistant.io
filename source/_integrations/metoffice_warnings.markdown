---
title: Met Office Weather Warnings
description: Instructions on how to integrate Met Office weather warnings for UK regions into Home Assistant.
ha_category:
  - Weather
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ianByrne'
ha_domain: metoffice_warnings
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Met Office Weather Warnings** {% term integration %} lets you monitor active weather warnings issued by the [Met Office](https://www.metoffice.gov.uk/) for regions across the United Kingdom. It uses the Met Office's publicly available [RSS feeds](https://weather.metoffice.gov.uk/guides/rss) to retrieve current warnings, including severity levels, warning types, and validity periods.

This integration is separate from the [Met Office](/integrations/metoffice/) weather integration, which provides weather forecasts and conditions. You can use both integrations side by side.

{% note %}
The Met Office RSS feed license requires that a functional link to the full warning on the Met Office website is displayed alongside any feed data. Each warning provided by this integration includes a `link` attribute for this purpose. When displaying warning data on a dashboard, make sure to include this link.
{% endnote %}

## Prerequisites

No account or API key is required. The Met Office weather warnings RSS feed is publicly accessible. Your Home Assistant instance needs internet access to reach the Met Office website.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Region:
    description: "The UK region to monitor for weather warnings. You can choose from 16 regional options (such as **London & South East England**, **Highland & Eilean Siar**, or **Northern Ireland**) or select **UK** for nationwide warnings. For a full list of available regions, refer to the [Met Office RSS feeds page](https://weather.metoffice.gov.uk/guides/rss)."
{% endconfiguration_basic %}

You can add the integration multiple times to monitor warnings for different regions.

## Supported functionality

### Entities

The integration provides the following entity for each configured region.

#### Sensors

- **Weather warnings**
  - **Description**: Shows the date and time the Met Office last updated the warnings feed for the selected region. Active weather warnings are available as attributes on this sensor.
  - **Attributes**:
    - `warnings`: A list of active warnings, where each warning includes:
      - `level`: The severity level (_Yellow_, _Amber_, or _Red_)
      - `warning_type`: The type of warning (such as _Rain_, _Wind_, _Snow_, or _Ice_)
      - `start`: The start time of the warning
      - `end`: The end time of the warning
      - `description`: A text summary of the warning
      - `link`: A URL to the full warning details on the Met Office website

## Data updates

The integration {% term polling polls %} the Met Office RSS feed once every hour.

## Known limitations

- This integration only covers the United Kingdom.
- Only weather warnings are provided. For weather forecasts and conditions, use the [Met Office](/integrations/metoffice/) integration.
- Warning details (level, type, and validity times) are extracted from the RSS feed text. In rare cases, changes to the feed format could affect parsing.

## Troubleshooting

### Can't connect during setup

If you see a "Cannot connect" error during setup, make sure your Home Assistant instance has internet access and can reach `weather.metoffice.gov.uk`.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
