---
title: SEMS
description: Instructions on how to integrate your SEMS portal account within Home Assistant.
ha_category:
  - Sensor
ha_release: 2023.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: sems
ha_dhcp: false
ha_platforms:
  - sensor
ha_integration_type: integration
---

The SEMS Portal integration allows you to integrate and retrieve data about your devices in the [SEMS Portal](https://www.semsportal.com/) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

<p class='note'>
To ensure the SEMS Portal integration works seamlessly with Home Assistant, we recommend setting up a dedicated SEMS account. This prevents login conflicts due to session limitations. Here's how you can set it up:
</p>

## Creating a Dedicated SEMS Account

1. **Log into SEMS Portal**: Visit [SEMS Portal](https://www.semsportal.com/) and sign in with your main account credentials.

2. **Access Management Tab**: On the SEMS Portal dashboard, find and click on the `Management` tab.

3. **Navigate to Your Plant**: Under the Management section, select your power plant by clicking on the plant name listed.

4. **Add a New Account**: In the `Visitors` section, you'll find an option to `Add a new account`. Click this to proceed.

5. **Finalize Account Setup**: Follow the prompts to create the account. Remember to note down the username and password for the integration setup.

6. **Retrieve Your Power Plant ID**: Your Power Plant ID is essential for integration. It can be found in the address bar when viewing your plant on the SEMS portal.

7. **Enter Details in Home Assistant**: Use the newly created SEMS account credentials and your Power Plant ID to configure the SEMS Portal Integration in Home Assistant.

Remember to keep the login credentials secure and use them only for Home Assistant to avoid session conflicts.

{% include integrations/config_flow.md %}

## Sensor

Once you have enabled the [SEMS Portal Integration](/integrations/sems), you can start using the sensor platform.