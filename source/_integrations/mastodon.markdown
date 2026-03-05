---
title: Mastodon
description: Instructions on how to add Mastodon posts and account statistics to Home Assistant.
ha_category:
  - Notifications
  - Sensor
ha_release: 0.67
ha_codeowners:
  - '@fabaff'
  - '@andrew-codechimp'
ha_domain: mastodon
ha_iot_class: Cloud Polling
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
ha_config_flow: true
ha_quality_scale: silver
---

The **Mastodon** {% term integration %} uses [Mastodon](https://joinmastodon.org/) to post status updates, get account statistics, and mute accounts.

## Use cases

- Posting your local weather station details to your Mastodon account.
- Displaying a count of your followers on your Home Assistant dashboard.
- Receiving a notification when an account you follow publishes a new status.
- Muting accounts when you are busy or away to reduce your timeline.

## Setup

Go to **Preferences** in the Mastodon web interface, then to **Development** and create a new application.

Select at a minimum the following scopes: **read:accounts**, **write:statuses**, **write:media**, and **write:mutes**.

Select **Submit** to create the application and generate the key, secret, and token required for the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of your Mastodon instance, for example `https://mastodon.social`.
Client key:
  description: The client key for the application created within your Mastodon account web interface.
Client secret:
  description: The client secret for the application created within your Mastodon account web interface.
Access token:
  description: The access token for the application created within your Mastodon account web interface.
{% endconfiguration_basic %}

## Sensors

The integration will create the following sensors for the Mastodon account:

- **Followers**: The total number of accounts that follow this account.
- **Following**: The total number of accounts this account follows.
- **Posts**: The total number of posts published by the account.
- **Last post**: When the last post was published
- **Username**: Displays the account username and avatar, plus attributes like display name, bio, and creation date.

Sensors are updated once an hour.

## Binary sensors

- **Bot**: Indicates whether the account performs automated actions, is not actively monitored, or identifies as a bot.
- **Discoverable**: Indicates whether the account is discoverable. Public posts and the profile may be featured or recommended across Mastodon.
- **Indexable**: Indicates whether public posts may appear in search results on Mastodon.
- **Limited**: Indicates whether the account has been [limited](https://docs.joinmastodon.org/admin/moderation/#limit-user) by moderators. Limited accounts are hidden from users on the instance, and their content is not publicly visible.
- **Moved**: Indicates that the account is inactive because the user has moved to a new account.
- **Suspended**: Indicates whether the account has been suspended.
- **Memorial**: Indicates whether the account is marked as a memorial.

## Actions

All Mastodon actions require integration `config_entry_id`. To find it, go to **Developer tools** > **Actions**. Choose the desired action and select your integration from the dropdown. Then switch to YAML mode to see `config_entry_id`.

### Action: Get account

The `mastodon.get_account` action is used to get details of an account. Will only return accounts that are federated with your instance.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mastodon config entry.
  - **Optional**: No

- **Data attribute**: `account_name`
  - **Description**: The account name to get, in the format `@user@instance`.
  - **Optional**: No

### Action: Mute account

The `mastodon.mute_account` action is used to mute an account you follow, which stops their posts appearing in your timeline.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mastodon config entry.
  - **Optional**: No

- **Data attribute**: `account_name`
  - **Description**: The account name to mute, in the format `@user@instance`.
  - **Optional**: No

- **Data attribute**: `duration`
  - **Description**: The duration to mute the account, if omitted the account will be muted indefinitely.
  - **Optional**: Yes

- **Data attribute**: `hide_notifications`
  - **Description**: Hide notifications as well as muting the account, defaults to hide.
  - **Optional**: Yes

### Action: Unmute account

The `mastodon.unmute_account` action is used to unmute a previously muted account.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mastodon config entry.
  - **Optional**: No

- **Data attribute**: `account_name`
  - **Description**: The account name to unmute, in the format `@user@instance`.
  - **Optional**: No

### Action: Post

The `mastodon.post` action posts a status to your Mastodon account.

- **Data attribute**: `config_entry_id`
  - **Description**: The ID of the Mastodon config entry.
  - **Optional**: No

- **Data attribute**: `status`
  - **Description**: The status text to post.
  - **Optional**: No

- **Data attribute**: `visibility`
  - **Description**: If not used, will default to account setting. `public`: post will be public. `unlisted`: post will be public but not appear on the public timeline. `private`: post will only be visible to followers. `direct`: post will only be visible to mentioned users.
  - **Optional**: Yes

- **Data attribute**: `idempotency_key`
  - **Description**: A unique key to prevent duplicate posts for up to one hour. Common strategies include using a hash of the status text or a static string.
  - **Optional**: Yes

- **Data attribute**: `content_warning`
  - **Description**: Text will be shown as a warning before the text of the status. If not used, no warning will be displayed.
  - **Optional**: Yes

- **Data attribute**: `language`
  - **Description**: The language of the post. If not used, the language that is set in the Mastodon account is used.
  - **Optional**: Yes

- **Data attribute**: `media`
  - **Description**: Attach an image or video to the post.
  - **Optional**: Yes

- **Data attribute**: `media_description`
  - **Description**: If an image or video is attached, will add a description for this media for people with visual impairments.
  - **Optional**: Yes

- **Data attribute**: `media_warning`
  - **Description**: If an image or video is attached, `True` will mark the media as sensitive. `False` is default.
  - **Optional**: Yes

{% note %}
Mastodon holds idempotency keys for up to one hour and subsequent posts using the same key will be ignored by your Mastodon instance. If not used, the post will be published without any duplicate check. The timeframe is controlled by your Mastodon instance, not Home Assistant.
{% endnote %}

### Examples

{% details "Example status post action" %}

Example post action that will post a status using your account's default visibility:

{% raw %}

```yaml
- action: mastodon.post
  data:
    config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
    status: "A toot from Home Assistant"
```

{% endraw %}

{% enddetails %}

{% details "Example private post action" %}

This will post a status to Mastodon, but visibility is marked as `private` so only followers will see it.

{% raw %}

```yaml
- action: mastodon.post
  data:
    config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
    status: "A private toot from Home Assistant"
    visibility: private
```

{% endraw %}

{% enddetails %}

{% details "Example status post action avoiding recent duplication" %}

Example post action that will post a status, but ensure that the same status is not posted more than once within one hour. This check is performed by your Mastodon instance.

{% raw %}

```yaml
actions:
  - variables:
      toot: A toot from Home Assistant
  - action: mastodon.post
    data:
      config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
      status: "{{ toot }}"
      idempotency_key: {{ toot | md5 }}
```

{% endraw %}

{% enddetails %}

{% details "Example media post action" %}

This will post a status to Mastodon that includes an image.

{% raw %}

```yaml
- action: mastodon.post
  data:
    config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
    status: "A media toot from Home Assistant"
    media: /config/www/funny_meme.png
```

{% endraw %}

{% enddetails %}

{% details "Example post with media and a content warning that will not be visible in the public timeline" %}

This will post a status to Mastodon that includes an image, with a description, a content warning, and a visibility of `unlisted`, so it doesn't show in the public timeline.

{% raw %}

```yaml
- action: mastodon.post
  data:
    config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
    status: "A media toot from Home Assistant"
    visibility: unlisted
    media: /config/www/funny_meme.png
    media_description: "A funny meme"
    content_warning: "This might not be funny enough"
```

{% endraw %}

{% enddetails %}

{% details "Example of muting an account you follow while you are on holiday" %}

This automation will look for an event in your calendar and mute the specified account while the event is active, and unmute at the end of the event.

{% raw %}

```yaml
alias: Mastodon mute example
description: "Mute a Mastodon account while a calendar event is active"
triggers:
  - trigger: calendar.event_started
    target:
      entity_id: calendar.YOUR_CALENDAR
    id: start
  - trigger: calendar.event_ended
    target:
      entity_id: calendar.YOUR_CALENDAR
    id: end
actions:
  - choose:
      - conditions:
          - condition: trigger
            id:
              - start
        sequence:
          - action: mastodon.mute_account
            data:
              config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
              account_name: "@commute-news@mytown.online"
      - conditions:
          - condition: trigger
            id:
              - end
        sequence:
          - action: mastodon.unmute_account
            data:
              config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
              account_name: "@commute-news@mytown.online"
```

{% endraw %}

{% enddetails %}

For more on how to use notifications in your automations, please see the [getting started with automation page](/getting-started/automation/).

## Known limitations

The integration does not provide functionality to get the stream, favorite, bookmark, or boost posts of that account.

Mastodon account details only show the date of the last status you posted, not the time. If you use the `mastodon.get_account` action to monitor new posts, you should instead watch the `statuses_count` field in the action response for changes.

## Troubleshooting

### Unable to use actions

#### Symptom: “Errors appear in the log when using an action”

When using actions errors relating to permissions are shown in the logs.

#### Description

Actions require specific permissions within your Mastodon account to read or write data.

#### Resolution

Ensure that you have set these appropriately within your Mastodon account, please see the [setup instructions](#setup).

## Removing the integration

This integration follows standard integration removal, once the integration is removed you can remove the application registration (assuming it was only used by this integration) from your Mastodon account by going to **Preferences** in the Mastodon web interface, then to **Development** and deleting the application you created for Home Assistant.

{% include integrations/remove_device_service.md %}
