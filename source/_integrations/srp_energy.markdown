---
title: SRP Energy
description: How to integrate SRP Energy within Home Assistant.
ha_category:
  - Energy
ha_release: 2020.12
ha_iot_class: Cloud Polling
ha_domain: srp_energy
ha_codeowners:
  - '@briglx'
  - '@ammmze'
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: service
---

The **SRP Energy** {% term integration %} shows information from SRP hourly energy usage report for their customers.

You need a username, password, and account ID which you can create at [SRP](https://www.srpnet.com).

{% include integrations/config_flow.md %}

## Energy

Because utilities release usage/cost data with a delay, the integration inserts data into statistic objects.
You can find the statistics in {% my developer_statistics title="**Settings** > **Developer tools** > **Statistics**"%} and search for "srp".

{% note %}
Because of this delay, you won't see data for today in the Energy dashboard, and yesterday's data may take a few hours to appear completely.
{% endnote %}

At the initial setup, the integration pulls hourly data for the last month.

In the configuration of the energy dashboard ({% my config_energy title="**Settings** > **Dashboards** > **Energy**" %}):

For electricity:

1. Select **Add consumption** under **Electricity grid**.
2. Select **SRP {custom name} electric consumption** for **consumed energy**.
3. Select the radio button to **Use an entity tracking the total costs**.
4. Select **SRP {custom name} electric cost** for **entity with the total costs**.

## Known limitations

- There is a delay, typically up to a day.
- The sum of SRP's hourly cost data for any given day tends to differ by up to a few cents from the daily cost shown on their website.

## Troubleshooting

- Before opening an issue, ensure you can access the energy usage section or dashboard on your utility website, and verify that the data is up to date there.
- In your energy dashboard in Home Assistant, make sure you use the statistics and not the sensors.

## Removing the integration

{% include integrations/remove_device_service.md %}

If you remove the integration, the statistics are not automatically deleted.
You can find and delete the statistics in {% my developer_statistics title="**Settings** > **Developer tools** > **Statistics**"%} and search for "srp".
