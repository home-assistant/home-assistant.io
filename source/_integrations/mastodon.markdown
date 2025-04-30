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
  - diagnostics
  - notify
  - sensor
ha_integration_type: service
ha_config_flow: true
---

The `mastodon` platform uses [Mastodon](https://joinmastodon.org/) to post status updates and get account statistics.

### Setup

Go to **Preferences** in the Mastodon web interface, then to **Development** and create a new application.

Check the following scopes **read:accounts**, **write:statuses** and **write:media**.

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

The integration will create sensors for the Mastodon account showing total followers, following, and posts. Sensors are updated once an hour.

## Actions

The Mastodon integration has the following actions:

- `mastodon.post`

{% note %}
The previous `notify.mastodon` service has been deprecated in favor of the new `mastodon.post` action. If you're upgrading from a previous version, you'll need to update your automations to use the new action format shown below.
{% endnote %}

### Action `mastodon.post`

Post a status to your Mastodon account

| Data attribute      | Optional | Description                                                                                                                                                                                                                                                        |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `config_entry_id`   | No       | The ID of the Mastodon config entry to post to.                                                                                                                                                                                                                    |
| `status`            | No       | The status text to post.                                                                                                                                                                                                                                           |
| `visibility`        | Yes      | If not used, will default to account setting. `public`: post will be public, `unlisted`: post will be public but not appear on the public timeline, `private`: post will only be visible to followers, and `direct`: post will only be visible to mentioned users. |
| `content_warning`   | Yes      | Text will be shown as a warning before the text of the status. If not used, no warning will be displayed.                                                                                                                                                          |
| `media`             | Yes      | Attach an image or video to the post.                                                                                                                                                                                                                              |
| `media_description` | Yes      | If an image or video is attached, will add a description for this media for people with visual impairments.                                                                                                                                                        |
| `media_warning`     | Yes      | If an image or video is attached, `True` will mark the media as sensitive. `False` is default.                                                                                                                                                                     |

{% tip %}
You can get your `config_entry_id` by using actions within [Developer Tools](/docs/tools/dev-tools/), using one of the above actions and viewing the YAML.
{% endtip %}

### Examples

{% details "Example status post action" %}

Example post action that will post a status using your account's default visibility:

{% raw %}

```yaml
- action: mastodon.post
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
  config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
  status: "A private toot from Home Assistant"
  visibility: private
```

{% endraw %}

{% enddetails %}

{% details "Example media post action" %}

This will post a status to Mastodon that includes an image.

{% raw %}

```yaml
- action: mastodon.post
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
  config_entry_id: YOUR_MASTODON_CONFIG_ENTITY_ID
  status: "A media toot from Home Assistant"
  visibility: unlisted
  media: /config/www/funny_meme.png
  media_description: "A funny meme"
  content_warning: "This might not be funny enough"
```

{% endraw %}

{% enddetails %}

For more on how to use notifications in your automations, please see the [getting started with automation page](/getting-started/automation/).

## Known limitations

The integration only allows reading the status of the authenticated account and posting to that account. It does not provide functionality to get the stream, favorite, bookmark, or boost posts of that account.

## Removing the integration

This integration follows standard integration removal, once the integration is removed you can remove the application registration (assuming it was only used by this integration) from your Mastodon account by going to **Preferences** in the Mastodon web interface, then to **Development** and deleting the application you created for Home Assistant.

{% include integrations/remove_device_service.md %}
