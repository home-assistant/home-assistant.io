---
title: Mastodon
description: Instructions on how to add Mastodon notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.67
ha_codeowners:
  - '@fabaff'
  - '@andrew-codechimp'
ha_domain: mastodon
ha_iot_class: Cloud Push
ha_platforms:
  - diagnostics
  - notify
  - sensor
ha_integration_type: service
ha_config_flow: true
---

The `mastodon` platform uses [Mastodon](https://joinmastodon.org/) to deliver notifications from Home Assistant.

### Setup

Go to **Preferences** in the Mastodon web interface, then to **Development** and create a new application.
If you want to grant only required accesses, uncheck all checkboxes then check only **read:accounts** and **write:statuses**.

{% include integrations/config_flow.md %}

## Sensors

The integration will create sensors for the Mastodon account showing total followers, following, and posts.

## Notifications

The integration will create a `notify` action matching the name of the integration entry.

### Action usage

Mastodon is a notify platform, and can be used by calling notify action as described in the [notify documentation](/integrations/notify/). It will toot messages using 
your account. An optional **target** parameter can be given to specify whether your toot will be public, private, unlisted, or direct. 

| Data attribute         | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `target`               |      yes | If not used, will default to account setting. `public`: post will be public, `unlisted`: post will be public but not appear on the public timeline, `private`: post will only be visible to followers, and `direct`: post will only be visible to mentioned users. 
| `data`                 |      yes | See below for extended functionality. 

### Action data

The following attributes can be placed inside `data` for extended functionality. 

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `media`                |      yes | Attach an image or video to the message.
| `media_warning`        |      yes | If an image or video is attached, `True`: will marked the media as sensitive. `False` is default.
| `content_warning`      |      yes | Text will be be shown as a warning before the text of the status. If not used, no warning will be displayed.

### Example action

This will post a message to Mastodon. Visibility will default to your account's setting. 

```yaml
- action: notify.mastodon
  message: "A toot from Home Assistant"
```

### Example action - private

This will post a message to Mastodon, but visibility is marked as `private` so only followers will see it.

```yaml
- action: notify.mastodon
  message: "A private toot from Home Assistant"
  target: private
```

### Example action - with media

This will post a message to Mastodon that includes an image.

```yaml
- action: notify.mastodon
  message: "A media toot from Home Assistant"
  data:
    media: /config/www/funny_meme.png
```

### Example action - with media and content warning to hide post behind a warning

This will post a message to Mastodon that includes an image and a target of `unlisted`, so it doesn't show in the public timeline.

```yaml
- action: notify.mastodon
  message: "A media toot from Home Assistant"
  target: unlisted
  data:
    media: /config/www/funny_meme.png
    content_warning: "This might not be funny enough"
```

For more on how to use notifications in your automations, please see the [getting started with automation page](/getting-started/automation/).
