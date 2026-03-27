---
title: Eve Online
description: Instructions on how to integrate Eve Online with Home Assistant.
ha_release: "2026.5"
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ronaldvdmeer'
ha_domain: eveonline
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Eve Online** {% term integration %} allows you to monitor [Eve Online](https://www.eveonline.com/) server status and character data in Home Assistant. Eve Online is a massively multiplayer online game by CCP Games. This integration uses the [Eve Swagger Interface (ESI)](https://esi.evetech.net/) API to retrieve data about the Tranquility server and your characters.

## Prerequisites

- An Eve Online account. You can create one at [eveonline.com](https://www.eveonline.com/).
- An Eve Online developer application for OAuth2 authentication. Instructions for that are in the next step.

### Create an Eve Online developer application

For Home Assistant to communicate with Eve Online, you need to create an application at the Eve Online developer portal. This provides you with the application credentials Home Assistant needs to allow you to log in with your Eve Online account.

1. Log in to the [Eve Online Developer Portal](https://developers.eveonline.com/).

2. Select **Create New Application**.

3. Enter a name and description for your application.

4. Under **Connection Type**, select **Authentication & API Access**.

5. Add the following **Permissions (Scopes)**:

   - `esi-location.read_location.v1`
   - `esi-location.read_ship_type.v1`
   - `esi-location.read_online.v1`
   - `esi-skills.read_skills.v1`
   - `esi-skills.read_skillqueue.v1`
   - `esi-clones.read_clones.v1`
   - `esi-wallet.read_character_wallet.v1`
   - `esi-characters.read_standings.v1`
   - `esi-characters.read_corporation_roles.v1`
   - `esi-killmails.read_killmails.v1`

6. Set the **Callback URL** to:

   `https://my.home-assistant.io/redirect/oauth`

7. Select **Create Application**.

8. On the application details page, note the **Client ID** and **Secret Key**. You will need these during the integration setup in Home Assistant.

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the callback URL
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.

{% enddetails %}

{% include integrations/config_flow.md %}

## Supported functionality

The integration creates two devices: one for the Tranquility server, and one for each character you add.

### Server sensors

- **Players online**
  - **Description**: The number of players currently online on Tranquility.

- **Server version**
  - **Description**: The current server version of Tranquility.

- **Start time**
  - **Description**: The time the server was last started.

### Server binary sensors

- **Server VIP mode**
  - **Description**: Whether the Tranquility server is in VIP mode.
  - **Remarks**: This entity is disabled by default.

### Character sensors

- **Wallet balance**
  - **Description**: The ISK balance of your character's wallet.

- **Skill points**
  - **Description**: The total number of skill points your character has.

- **Skill queue**
  - **Description**: The number of skills currently in your character's skill queue.

- **Current ship**
  - **Description**: The name of the ship type your character is currently flying.

- **Location**
  - **Description**: The solar system your character is currently in.

- **Clone location**
  - **Description**: The station or structure where your character's active clone is located.

- **Security status**
  - **Description**: Your character's current security status.

- **Corporation**
  - **Description**: The corporation your character is a member of.

- **Alliance**
  - **Description**: The alliance your character's corporation belongs to.

- **Birthday**
  - **Description**: The date your character was created.

- **Current ship name**
  - **Description**: The custom name of your character's current ship.

- **Unread mail**
  - **Description**: The number of unread mail messages.
  - **Remarks**: This entity is disabled by default.

- **Jump fatigue**
  - **Description**: Your character's jump fatigue expiry time.
  - **Remarks**: This entity is disabled by default.

- **Active implants**
  - **Description**: The number of active implants your character has.
  - **Remarks**: This entity is disabled by default.

### Character binary sensors

- **Online**
  - **Description**: Whether your character is currently online.

## Using multiple characters

This integration supports multiple Eve Online characters. You don't need to create another developer application. To add an additional character, add the integration again and log in with a different character.

## Data updates

The integration {% term polling polls %} data from the Eve Online ESI API every 60 seconds.

## Known limitations

- The integration only connects to the Tranquility server (the main live server). Singularity (test server) is not supported.
- Some character data may be delayed due to ESI API caching.

## Troubleshooting

### OAuth2 callback error

If you get an error during the OAuth2 login flow, make sure the **Callback URL** in your Eve Online developer application is set to exactly:

`https://my.home-assistant.io/redirect/oauth`

Also ensure that [My Home Assistant](/integrations/my) is correctly configured and can reach your Home Assistant instance.

### Entities show as unavailable

If all entities become unavailable, the ESI API may be experiencing downtime. Check the [Eve Online server status](https://login.eveonline.com/) page. If the issue persists, try reauthenticating via **Settings** > **Devices & services** > **Eve Online** > **Reconfigure**.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
