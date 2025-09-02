---
title: PlayStation Network
description: Instructions on enabling PlayStation Network support for your Home Assistant
ha_category:
  - Binary sensor
  - Media player
  - Sensor
ha_release: 2025.7
ha_iot_class: Cloud Polling
ha_domain: playstation_network
ha_platforms:
  - binary_sensor
  - diagnostics
  - image
  - media_player
  - notify
  - sensor
ha_codeowners:
  - '@jackjpowell'
  - '@tr4nt0r'
ha_config_flow: true
ha_quality_scale: bronze
ha_integration_type: service
related:
  - url: https://playstation.com/
    title: Playstation
ha_dhcp: true
---

The **PlayStation Network** {% term integration %} enables you to seamlessly integrate information from your currently playing game in Home Assistant.

## About PlayStation Network

PlayStation Network (PSN) is a digital media entertainment service provided by [Sony Interactive Entertainment](https://en.wikipedia.org/wiki/Sony_Interactive_Entertainment). It allows users to enjoy a variety of gaming-related services such as purchasing games, downloading content, and connecting with other players.

## How you can use this integration

The **PlayStation Network** {% term integration %} lets you integrate information about your currently playing game into Home Assistant. You can display the game title and cover art in your Home Assistant dashboards.

## Prerequisites

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

## Supported functionality

### Media players

- **PlayStation Console**: One Media Player will be created for any [supported PlayStation console](#supported-devices) you have connected to the PlayStation Network. The artwork and title of the currently playing game will be populated.

### Sensors

- **Online ID**: Shows your PlayStation Network ID and current profile picture.
- **Trophy level**: Displays your current PlayStation trophy level.
- **Next Level**: Shows your progress toward the next PlayStation trophy level as a percentage.
- **Platinum trophies**: Shows the total number of Platinum trophies you’ve earned. These are awarded for unlocking all other trophies in a game.
- **Gold trophies**: Displays your total count of Gold trophies, earned for major achievements within games.
- **Silver trophies**: Indicates the number of Silver trophies you've collected, typically for mid-level accomplishments.
- **Bronze trophies**: Shows how many Bronze trophies you've earned, usually for basic or early-game achievements.
- **Last online**: Displays the time when you were last seen online.
- **Online status**: Indicates your current availability on the PlayStation Network. Status options include *Online*, *Offline*, *Away*, and *Online on PS App*.
- **Now playing**: Shows the title of the game you are currently playing.
  
### Binary sensors

- **Subscribed to PlayStation Plus**: Indicates if you have an active PlayStation Plus membership.

### Image

- **Avatar**: Displays your current avatar.
- **Share profile**: Generates a QR code with a shareable link to your profile.
- **Now playing**: Displays the current game title image if you are playing a game.

### Notifiers

The **PlayStation Network** integration creates a notify entity for every friend in your friend list and for each group you are a member of.  
You can send messages to a friend or group using the `notify.send_message` {% term action %}.

For more information on using notifications, refer to the [Getting Started with Automation](/getting-started/automation/) page.

## Track online status of friends

The **PlayStation Network integration** allows tracking the online status of your friends. To add a friend, go to {% my integration domain="playstation_network" title="**Settings** > **Devices & services** > **PlayStation Network**" %} and select **{% icon "mdi:plus" %} Add friend**.

After adding a friend, a new device will be created with the following entities:

### Sensor

- **Online ID**: Shows the friend's PlayStation Network ID with their current profile picture.
- **Online status**: Indicates the friend's current availability on the PlayStation Network.
- **Last online**: Displays the time the friend was last seen online.
- **Now playing**: Shows the title of the game the friend is currently playing.

### Image

- **Avatar**: Displays the friend's current avatar.
- **Now playing**: Displays the current game title image if the friend is playing a game.

## Data updates

This integration retrieves data from the PlayStation Network every 30 seconds to ensure timely updates.

Friend status updates occur every 180 seconds. If more than 20 friends are configured, the update interval will be gradually increased to avoid exceeding API rate limits.

## Known limitations

PlayStation Network imposes a rate limit of 300 requests per 15 minutes.

This integration makes 3 requests per data update (every 30 seconds). This presently is well under the rate limit, but leaves room to add additional requests as the integration develops.

Please keep these limits in mind to avoid exceeding the PlayStation Network request allowance.

The Active state for each device is only reported via the API for the last used device. For example, if you start playing a game on your PS4 and without powering down, launch a game on your PS5, the API will only report your PS5 status.

## Supported devices

The following devices are known to be supported by the integration:

- PlayStation 5
- PlayStation 4
- PlayStation 3
- PlayStation Vita
- PlayStation PC

## Unsupported devices

The following devices are not supported by the integration:

- PlayStation Portable
- Other PlayStation system variants (PlayStation TV) or older systems that do not support the PlayStation Network

## Use cases

You can display your currently playing game as artwork on your dashboard.

## Remove integration

This integration can be removed by following these steps:

{% include integrations/remove_device_service.md %}
