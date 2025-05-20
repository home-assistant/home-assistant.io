---
title: Google Air Quality
description: Instructions on how to integrate Google Air Quality into Home Assistant.
ha_category:
  - Sensor
ha_release: 2025.7
ha_iot_class: Cloud Poll
ha_config_flow: true
ha_codeowners:
  - '@Thomas55555'
ha_platforms:
  - sensor
ha_integration_type: integration
ha_domain: google_air_quality
ha_quality_scale: bronze
---

The **Google Air Quality** {% term integration %} provides Air quality data through the Google Air Quality API.

## Prerequisites

You need to configure developer credentials to allow Home Assistant to access your Google Account.
These credentials are the same as the ones for [Google Sheets](/integrations/google_sheets), [Nest](/integrations/nest), [YouTube](/integrations/youtube), and [Google Mail](/integrations/google_mail).
These are not the same as *Device Auth* credentials previously recommended for [Google Calendar](/integrations/google).
Additionally, you have to create a *Billing Account*. At the time of writing this documentation, Google allows 10,000 API calls per month for free.

{% important %}
This integration polls every 60 minutes. Here is an overview about how many API calls are performed per month in dependence of the amount of coordinates:

Coordinates | API calls per month
----------- | -------------------
1           | 800
2           | 1,600
3           | 2,400
4           | 3,200
5           | 4,000
10          | 8,000
12          | 9,600

Consider each restart of Home Assistant is an additional API call, per coordinate/entry.

You can set up a [budget](https://cloud.google.com/billing/docs/how-to/budgets) for your billing account. This does not limit your costs, but you can get an alert when you reach the budget.
You may want to setup [disable billing with notifications](https://cloud.google.com/billing/docs/how-to/disable-billing-with-notifications). This can still produce costs between incurring costs and receiving budget notifications.

You are always self aware of the costs.
{% endimportant %}

{% include integrations/google_client_secret.md %}

{% include integrations/config_flow.md %}

{% include integrations/google_oauth.md %}

## Known limitations

- Currently only the Universal Air Quality Index (UAQI) is supported as Air Quality Index.

## Supported functionality

### Sensor

The integration will create the following sensors:

- Universal Air Quality Index
  *Google's AQI. 100 is the best air quality and 0 the worst.*
- Category
   *The current air quality in words. Possible values: Excellent air quality, Good air quality, Moderate air quality, Low air quality, Poor air quality*
- PM10
  *Inhalable particulate matter (<10µm)*
- PM2.5
  *Fine particulate matter (<2.5µm)*

## Troubleshooting

If you have an error with your credentials, you can delete them in the [Application Credentials](/integrations/application_credentials/) user interface.

## Removing the integration

{% include integrations/remove_device_service.md %}

