---
title: Ghost
description: Instructions on how to integrate Ghost with Home Assistant.
ha_category:
  - Sensor
ha_release: '2026.3'
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@johnonolan'
ha_domain: ghost
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
---

The **Ghost** {% term integration %} allows you to monitor your [Ghost](https://ghost.org) publication metrics in Home Assistant, including member counts, revenue, post statistics, and email newsletter performance.

## Prerequisites

- A Ghost site running version 5.0 or later
- A Ghost administrator staff user account

### Create a Ghost Admin API integration

1. In Ghost Admin, go to **Settings** > **Integrations**.
2. Under **Custom Integrations**, select **Add custom integration**.
3. Enter a name, like **Home Assistant**.
4. Copy the **API URL**.
5. Copy the **Admin API Key**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API URL:
    description: "The API URL of your Ghost site. You can find it in the Ghost Admin under **Settings** > **Integrations** > **Custom**."
Admin API Key:
    description: "The Admin API key for your Ghost site. You can find it in the Ghost Admin under **Settings** > **Integrations** > **Custom**."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Ghost** integration provides the following entities.

#### Sensors

##### Member metrics

- **Total Members**: Total number of subscribers
- **Paid Members**: Number of paying subscribers
- **Free Members**: Number of free subscribers
- **Comped Members**: Number of complimentary subscribers

##### Revenue metrics

- **MRR**: Monthly Recurring Revenue (USD)
- **ARR**: Annual Recurring Revenue (USD)

##### Content metrics

- **Published Posts**: Number of published posts
- **Draft Posts**: Number of draft posts
- **Scheduled Posts**: Number of scheduled posts
- **Latest Post**: Title of the most recent post
- **Total Comments**: Total number of comments

##### Email newsletter metrics

- **Latest Email**: Title of the most recent newsletter
- **Latest Email Sent**: Number of emails sent
- **Latest Email Opened**: Number of emails opened
- **Latest Email Open Rate**: Open rate percentage
- **Latest Email Clicked**: Number of link clicks
- **Latest Email Click Rate**: Click rate percentage

##### SocialWeb (ActivityPub) metrics

- **SocialWeb Followers**: Number of Fediverse followers
- **SocialWeb Following**: Number of accounts being followed

##### Newsletter subscribers

For each active newsletter on your Ghost site, an additional sensor is created showing the subscriber count for that newsletter.

## Data updates

The integration {% term polling polls %} your Ghost site every 5 minutes to update sensor data.

## Examples

### Announce milestone member counts

{% raw %}
```yaml
automation:
  - alias: "Member milestone celebration"
    triggers:
      - trigger: state
        entity_id: sensor.my_ghost_site_total_members
    conditions:
      - condition: template
        value_template: "{{ trigger.to_state.state | int % 100 == 0 }}"
    actions:
      - action: notify.mobile_app
        data:
          title: "Milestone reached!"
          message: "You now have {{ trigger.to_state.state }} members!"
```
{% endraw %}

## Known limitations

- Revenue metrics (MRR/ARR) are only available for sites with Stripe connected.
- ActivityPub/SocialWeb metrics require Ghost 6 or later with ActivityPub enabled.

## Troubleshooting

### Invalid API key

#### Symptom: "Invalid API key" error during setup

When trying to set up the integration, you receive an "Invalid API key" error.

##### Description

This error occurs when the API key format is incorrect or the key has been invalidated.

##### Resolution

To resolve this issue, try the following steps:

1. Ensure the API key contains a colon (`:`) separating the key ID from the secret (format: `id:secret`).
2. Verify you copied the Admin API Key, not the Content API Key.
3. Check that the custom integration in Ghost has not been deleted or regenerated.

### Cannot connect to Ghost

#### Symptom: "Cannot connect" error during setup

When trying to set up the integration, you receive a connection error.

##### Description

This error occurs when Home Assistant cannot reach your Ghost site.

##### Resolution

To resolve this issue, try the following steps:

1. Verify the API URL is correct and includes the protocol (for example, `https://example.com`).
2. Ensure your Ghost site is accessible from your Home Assistant instance.
3. Check that no firewall or proxy is blocking the connection.

### Missing revenue data

#### Symptom: MRR and ARR sensors show as unavailable

The MRR (Monthly Recurring Revenue) and ARR (Annual Recurring Revenue) sensors display as unavailable.

##### Description

Revenue sensors require an active Stripe connection with paid members.

##### Resolution

To resolve this issue, check the following:

1. Verify your Ghost site has Stripe connected.
2. Confirm you have at least one paid member.

### Missing SocialWeb/ActivityPub data

#### Symptom: SocialWeb sensors show as unavailable

The SocialWeb followers and following sensors display as unavailable.

##### Description

These sensors require Ghost 6 or later with ActivityPub enabled.

##### Resolution

To resolve this issue, check the following:

1. Verify you are running Ghost 6 or later.
2. Ensure ActivityPub is enabled in your Ghost settings.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
