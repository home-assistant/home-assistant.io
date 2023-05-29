---
title: Trello
description: Instructions on how to set up the Trello integration in Home Assistant.
ha_release: 2023.3.0
ha_category: Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: trello
ha_platforms:
  - sensor
ha_codeowners:
  - '@scottg489'
ha_integration_type: service
---

The Trello integration allows you to track the number of cards in the lists on a [Trello](https://trello.com/) board.

## Prerequisites

Before setting up this integration, you need to get credentials by creating an Integration in Trello's
[Power-Up Admin Portal](https://trello.com/power-ups/admin/).

{% details "Create Integration and associated API key and Token" %}

1. Ensure you're logged in to [Trello](https://trello.com/) in your browser.
2. Visit the [Power-Up Admin Portal](https://trello.com/power-ups/admin/) and select **New** near the top right.
3. Fill out all fields except the **Iframe connector URL**.
4. Select **Create** near the bottom right.
5. You should be taken to the **API key** page. Select **Generate a new API key** and select **Generate API key** if a
   dialog pops up.
6. Record the **API key** at the top of the page. *This will be the first of two credentials you'll need.*
7. At the end of the paragraph to the right of your **API key**, select the **Token** link to "... manually generate a Token."
8. You should be taken to a page with text at the top saying **"Would you like to give the following application access to your account?"**.
   Select the **"Allow"** button near the bottom right of the page.
9. On the following page, record your **Token**. *This will be the last credential you'll need.*

After you have both your **API Key** and **Token** you can start the integration setup.

{% enddetails %}


{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}
{% configuration_basic %}
Board names:
  description: A service will be created for each board you select and an associated entity for each list in that board. The entity's value will be the number of cards in that list.
{% endconfiguration_basic %}
