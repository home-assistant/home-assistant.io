---
title: Airthings
description: Instructions on how to integrate Airthings into Home Assistant.
ha_category:
  - Environment
  - Health
  - Sensor
ha_release: '2021.10'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
  - '@LaStrada'
ha_domain: airthings
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates Airthings sensors into Home Assistant.

[Airthings](https://www.airthings.com/) provide different sensors for measuring the air quality. The focus specially on Radon sensors.

Requires Airthings hardware and a valid Airthings Dashboard login.

## Prerequisites

Airthings API setup (needed to acquire the required ID and Secret for the Home Assistant Airthings Integration).

1. Login [here](https://dashboard.airthings.com/integrations/api-integration) to find your credentials.
2. Select [Integrations](https://dashboard.airthings.com/integrations/api-integration) from the left side-bar.
3. Click on "Request API Client" in order to set up an API connection.
4. Name your API connection (e.g., "Home Assistant"). Note: The name field has a character limit and longer names will be truncated.
5. Give the connection an accurate description.
6. Select a Resource Scope.
7. Select an access Type, i.e., Confidential.
8. Select a flow type.
9. Set enable to "on".
10. Save the settings.

Upon saving the settings, you will be presented with a generated id and secret.

The Airthings integration can now be activated using the generated id and secret that you have just created.

{% include integrations/config_flow.md %}
