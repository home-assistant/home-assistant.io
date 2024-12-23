---
title: PlayStation Network
description: Instructions on enabling PlayStation Network support for your Home Assistant
ha_category:
  - Media player
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_domain: playstation_network
ha_platforms:
  - media_player
ha_codeowners:
  - '@jackjpowell'
ha_config_flow: true
ha_integration_type: integration
related:
  - url: https://playstation.com/
    title: Playstation
---

The PlayStation Network {% term integration %} enables you to seamlessly integrate information from your currently playing game in Home Assistant.

## About PlayStation Network

PlayStation Network (PSN) is a digital media entertainment service provided by [Sony Interactive Entertainment](https://en.wikipedia.org/wiki/Sony_Interactive_Entertainment). It allows users to enjoy a variety of gaming-related services such as purchasing games, downloading content, and connecting with other players.

## How you can use this integration

The PlayStation Network integration lets you integrate information about your currently playing game into Home Assistant. You can display the game title and cover art in your Home Assistant dashboards.

## Prerequisites for PlayStation Network integration

- To set up the PlayStation Network integration, you must first have an active PlayStation Network account. You can register for an account at the [Official PlayStation® Site](https://playstation.com/).
- During the setup process in Home Assistant, you will be asked to provide your NPSSO token. You will need to be logged into [playstation.com](https://playstation.com/) to access the token in your browser. You will find a link to retrieve the token in the config flow.

{% include integrations/config_flow.md %}

### Login to PlayStation Network

{% configuration_basic %}
"NPSSO Token":
  description: "Supply your NPSSO token after successfully logging into the PlayStationNetwork in your browser."
  required: true
  type: string
{% endconfiguration_basic %}

## Media Players

- **PlayStation Console**: One Media Player will be created for any PlayStation 5 and one Media Player will be created for any PlayStation 4 console you have connected to the PlayStation Network.

## Data updates

This integration retrieves data from the PlayStation Network every 30 seconds to ensure timely updates.

## Known limitations

PlayStation Network imposes a rate limit of 300 requests per 15 minutes.

This integration makes 3 requests per data update (every 30 seconds). This presently is well under the rate limit, but leaves room to add additional requests as the integration develops.

Please keep these limits in mind to avoid exceeding the PlayStation Network request allowance.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
