---
title: Untappd
description: Instructions on how to show your Untappd beer check-in statistics in Home Assistant.
ha_release: 2026.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: untappd
ha_integration_type: service
ha_category:
  - Sensor
ha_platforms:
  - sensor
ha_quality_scale: bronze
---

The **Untappd** {% term integration %} shows the statistics and latest check-in of your [Untappd](https://untappd.com) account in Home Assistant. Untappd is a social app where you check in the beers you drink, rate them, and earn badges.

For example, you can show your latest beer and its label on a dashboard, or celebrate when you reach a check-in milestone.

## Prerequisites

Untappd only gives access to its API to apps it has approved. Before you can set up the integration, you need your own approved Untappd app:

1. Go to the [Untappd API page](https://untappd.com/api/register) and apply for an API key.
   - As the callback URL, enter `https://my.home-assistant.io/redirect/oauth`.
2. Wait until Untappd approves your app. This can take a while.
3. Take note of the **Client ID** and **Client Secret** of your approved app.
4. In Home Assistant, in {% my integrations title="**Settings** > **Devices & services**" %}, in the top-right three dots {% icon "mdi:dots-vertical" %} menu, select **Application credentials**, and select the button to add an application credential.
5. Select **Untappd**, enter a name, and enter the client ID and client secret from step 3. Then, select **Add**.

{% include integrations/config_flow.md %}

When you add the integration, Home Assistant sends you to Untappd to sign in and allow access to your account.

## Supported functionality

The integration creates one service per Untappd account, with the following entities.

### Sensors

- **Check-ins**
  - **Description**: The total number of check-ins on your account.
- **Unique beers**
  - **Description**: The number of different beers you have checked in.
- **Badges**
  - **Description**: The number of badges you have earned.
- **Friends**
  - **Description**: The number of friends you have on Untappd.
- **Last check-in**
  - **Description**: The date and time of your latest check-in.
- **Last beer**
  - **Description**: The name of the beer of your latest check-in. The entity picture shows the label of the beer.
- **Last brewery**
  - **Description**: The brewery of the beer of your latest check-in.
- **Last rating**
  - **Description**: The rating you gave in your latest check-in.
  - **Remarks**: Unknown when you did not rate the beer.

## Untappd automation examples

Here is an idea to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Celebrate a check-in milestone

Get a notification on your phone when you reach 1,000 check-ins.

- **Trigger**: Numeric state of **Check-ins** above 999
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a check-in milestone notification" %}

{% example %}
automation: |
  alias: "Celebrate 1000 Untappd check-ins"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.hopsfan_check_ins
      above: 999
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          Cheers! You just reached 1,000 check-ins on Untappd.
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} Untappd every 15 minutes. A new check-in can take up to 15 minutes to show up in Home Assistant.

## Known limitations

- Untappd limits each app to 100 API requests per hour. The integration uses 8 of them per hour for each account. If you use the same app for other tools, they share this limit.
- The integration only shows your own account. It cannot show the check-ins of your friends.
- Check-ins cannot be created from Home Assistant.

## Troubleshooting

{% details "Setting up the integration fails" %}

### Symptom: "Error while obtaining access token"

After you sign in to Untappd and allow access, the setup stops with an error about the access token.

#### Description

Untappd did not accept the application credentials, or the callback URL of your Untappd app does not match the one Home Assistant uses.

#### Resolution

1. Check that the callback URL of your Untappd app is `https://my.home-assistant.io/redirect/oauth`.
2. Delete the Untappd credentials in the [Application credentials](/integrations/application_credentials/) interface, and add them again with the client ID and client secret of your app.
3. Add the integration again.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, you can also revoke the access of your app to your account in your Untappd account settings.
