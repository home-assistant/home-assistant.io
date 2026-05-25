---
title: Lichess
description: Instructions on how to integrate Lichess with Home Assistant.
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
ha_quality_scale: bronze
---

The **Lichess** {% term integration %} allows you to monitor your [Lichess](https://lichess.org) chess statistics in Home Assistant.

## Prerequisites

You need a Lichess personal API token to use this integration. You can create one on the [Lichess API token page](https://lichess.org/account/oauth/token).

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Token:
  description: Your Lichess personal API token.
{% endconfiguration_basic %}

## Generate an API token

The API token is used to authenticate requests to the Lichess API. To generate an API token, take the following steps:

1. Visit the [Lichess API token page](https://lichess.org/account/oauth/token).
2. When creating the token, make sure **Read preferences** is allowed.

## Supported functionality

### Sensors

The integration creates sensors for your rating in bullet, blitz, rapid, and classical, and also the number of games played in each of these formats.

Entities for number of games played and your rating in Ultra Bullet, Chess960, Crazyhouse, Antichess, Atomic, Horde, King of the Hill, Racing Kings and Three-check are also available but are disabled by default.


## Data updates

The integration {% term polling polls %} the Lichess API every hour to update sensor data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
