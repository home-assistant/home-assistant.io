---
title: Duke Energy
description: Instructions on how to integrate Duke Energy within Home Assistant.
ha_category:
  - Energy
ha_release: '2024.10'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@hunterjm'
ha_domain: duke_energy
ha_config_flow: true
ha_integration_type: integration
---

The **Duke Energy** {% term integration %} allows you to get energy information from [Duke Energy](https://www.duke-energy.com/).

## Supported devices

Currently, this integration only supports electric meters.

## Prerequisites

You need a Duke Energy account to use this integration. During installation of the integration, you will need the username and password to access your account.

{% include integrations/config_flow.md %}

## Energy

Because Duke Energy only releases usage data with around a 48-hour delay, the integration inserts data into statistic objects.
You can find the statistics in {% my developer_statistics title="**Developer Tools** > **Statistics**"%} and search for "duke_energy".
**This delay means that there will be no data in the energy dashboard for today and likely yesterday** (depending on time of day you are checking).

At the initial setup, the integration pulls historical hourly usage since the account activation. Duke Energy typically only keeps this data for the past 3 years.
After the initial setup, the integration keeps pulling data (twice per day) for the past 30 days to allow for any corrections in the data.

In the configuration of the energy dashboard ({% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}):

1. Select **Add consumption** for the **Electricity grid**.
2. Select **Duke Energy Electric {meter serial number} Consumption** for the **consumed energy**.
