---
title: Eve Online
description: Instructions on how to integrate Eve Online with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.6
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@ronaldvdmeer'
ha_domain: eveonline
ha_platforms:
  - sensor
ha_integration_type: service
---

The **Eve Online** {% term integration %} allows you to monitor [Eve Online](https://www.eveonline.com/) character data in Home Assistant. Eve Online is a massively multiplayer online game by CCP Games. This integration uses the [Eve Swagger Interface (ESI)](https://esi.evetech.net/) API to retrieve data about your characters.

Each character is added as a separate integration entry, so you can monitor multiple characters at the same time. The integration currently provides wallet, location, and ship data, with support for additional character data planned for future updates.

## Prerequisites

- An Eve Online account. You can create one at [eveonline.com](https://www.eveonline.com/).
- An Eve Online developer application for OAuth2 authentication. Instructions are in the next section.

### Create an Eve Online developer application

For Home Assistant to communicate with Eve Online, you need to create an application at the Eve Online developer portal. This provides you with the application credentials Home Assistant needs to allow you to log in with your Eve Online account.

1. Log in to the [Eve Online Developer Portal](https://developers.eveonline.com/).

2. Select **Manage Applications**.

3. Select **Create Application**.

4. Enter a name and description for your application under **Basic information**.

5. Set the **Callback URL** to: `https://my.home-assistant.io/redirect/oauth` under **Application Settings**.

6. Select the following **Enabled Scopes**:

   - `esi-location.read_location.v1`
   - `esi-location.read_ship_type.v1`
   - `esi-wallet.read_character_wallet.v1`

7. Select **Save**.

8. On the **Your applications** page, note the **Client ID** and **Client Secret**. You will need these during the integration setup in Home Assistant.

{% note %}
The scopes listed above are the minimum required for the current version of the integration. To prepare for future updates, consider also enabling the following scopes on the Eve Online developer portal now. This way, you won't need to update your developer application when a new version of the integration adds support for more character data.

- `esi-characters.read_fatigue.v1`
- `esi-industry.read_character_jobs.v1`
- `esi-location.read_online.v1`
- `esi-mail.read_mail.v1`
- `esi-markets.read_character_orders.v1`
- `esi-skills.read_skillqueue.v1`
- `esi-skills.read_skills.v1`

{% endnote %}

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration setup will next give you instructions to enter the [Application Credentials](/integrations/application_credentials/) (OAuth Client ID and Client Secret) and authorize Home Assistant to access your Eve Online account.

{% configuration_basic %}
Client ID:
  description: "The Client ID from your Eve Online developer application."
Client secret:
  description: "The client secret from your Eve Online developer application."
{% endconfiguration_basic %}

{% note %}
Your client ID and client secret are stored exclusively in your Home Assistant instance and are never shared with the integration developer or any third party. These credentials are used solely to authenticate your Home Assistant with the Eve Online API on your behalf.
{% endnote %}

This integration supports multiple Eve Online characters. You don't need to create another developer application. To add an additional character, add the integration again and log in with a different character.

## Supported functionality

The integration creates one device per character you add.

### Character sensors

- **Wallet balance**
  - **Description**: The ISK balance of your character's wallet.

- **Location**
  - **Description**: The solar system your character is currently in.

- **Ship**
  - **Description**: The ship type your character is currently flying.

## Examples

### Alert when wallet balance drops below a threshold

Keep an eye on your ISK balance with this automation. It triggers when your wallet drops below a set amount, so you can take action before your market orders or industry jobs are affected.

```yaml
- alias: "Alert when wallet balance is low"
  triggers:
    - trigger: numeric_state
      # Replace with your character's wallet balance entity
      entity_id: sensor.my_character_wallet_balance
      below: 100000000
  actions:
    - action: notify.notify
      data:
        message: "Your wallet balance dropped below 100,000,000 ISK."
```

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

#### Symptom

All entities show as unavailable.

#### Description

Every day, the Eve Online servers go offline for routine maintenance from 11:00 to approximately 11:15 UTC (known as "daily downtime"). During this window, all entities will show as unavailable — this is expected and they will recover automatically once the servers come back online.

On patch days, the downtime can last significantly longer than 15 minutes. CCP Games usually announces extended downtime in advance via the [Eve Online status page](https://status.eveonline.com/) and their official channels.

Outside of the daily downtime window, unavailable entities may indicate an unplanned outage or an ESI API issue.

#### Resolution

1. If it is between 11:00 and 11:15 UTC, wait for the daily downtime to end. Entities will recover automatically.
2. Otherwise, check the [Eve Online server status](https://status.eveonline.com/) page to see if there is a known outage.
3. If the status is healthy and the issue persists, check your application credentials at {% my application_credentials title="**Settings** > **Application credentials**" %}.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

To revoke Home Assistant's access to your Eve Online account, you can also delete the developer application on the Eve Online Developer Portal.
