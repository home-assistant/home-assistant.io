---
title: Lichess
description: Instructions on how to set up the lichess integration
ha_category:
    - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_release: 2026.4
ha_codeowners:
    - '@aryanhasgithub'
ha_domain: lichess
ha_integration_type: service
ha_platforms:
    - sensor
---

The Lichess {% term integration %} allows you to monitor your [Lichess](https://lichess.org) chess statistics in Home Assistant.

This integration requires a Lichess API Token [which you can get from here](https://lichess.org/account/oauth/token).

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Token:
    description: Your Lichess personal API token.
{% endconfiguration_basic %}

### Generate an API Token

The API Token is used to authenticate requests to the Lichess API. To generate an API Token take the following steps:

- Visit the [Lichess API Token Page](https://lichess.org/account/oauth/token).
- When creating the token make sure Read preferences is allowed.

### Sensors

The integration creates sensors for your rating in bullet, blitz, rapid, classical and also the number of games played in each of these formats.

### Data Updates

The integration {% term polling polls %} the Lichess API every hour to update sensor data.

### Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
