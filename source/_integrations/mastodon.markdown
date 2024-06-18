---
title: Mastodon
description: Instructions on how to add Instapush notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.67
ha_codeowners:
  - '@fabaff'
ha_domain: mastodon
ha_iot_class: Cloud Push
ha_platforms:
  - notify
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `mastodon` platform uses [Mastodon](https://joinmastodon.org/) to deliver notifications from Home Assistant.

### Setup

Go to **Preferences** in the Mastodon web interface, then to **Development** and create a new application.
If you want to grant only required accesses, uncheck all checkboxes then check only **read:accounts** and **write:statuses**.

### Configuration

To add Mastodon to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: mastodon
    access_token: !secret mastodon_access_token
    client_id: !secret mastodon_client_id
    client_secret: !secret mastodon_client_secret
```

{% configuration %}
name:
  description: "The optional parameter name allows multiple notifiers to be created. The notifier will bind to the service notify.NOTIFIER_NAME."
  required: false
  type: string
  default: notify
access_token:
  description: Your Mastodon access token.
  required: true
  type: string
client_id:
  description: Your Mastodon client ID
  required: true
  type: string
client_secret:
  description: Your Mastodon client secret.
  required: true
  type: string
base_url:
  description: URL of the Mastodon instance to use.
  required: false
  type: string
  default: https://mastodon.social
{% endconfiguration %}

### Usage

Mastodon is a notify platform, and can be used by calling notify service as described in the [notify documentation](/integrations/notify/). It will toot messages using 
your account. An optional **target** parameter can be given to specify whether your toot will be public, private, unlisted, or direct. 

| Service attribute      | Optional | Description |
| ---------------------- | -------- | ----------- |
| `message`              |       no | Body of the notification.
| `target`               |      yes | If not used, will default to account setting. `public`: post will be public, `unlisted`: post will be public but not appear on the public timeline, `private`: post will only be visible to followers, and `direct`: post will only be visible to mentioned users. 
| `data`                 |      yes | See below for extended functionality. 

### Service data

The following attributes can be placed inside `data` for extended functionality. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `media`                |      yes | Attach an image or video to the message.
| `media_warning`        |      yes | If an image or video is attached, `True`: will marked the media as sensitive. `False` is default.
| `content_warning`      |      yes | Text will be be shown as a warning before the text of the status. If not used, no warning will be displayed.

### Example service call

This will post a message to Mastodon. Visibility will default to your account's setting. 

```yaml
- service: notify.mastodon
  message: "A toot from Home Assistant"
```

### Example service call - private

This will post a message to Mastodon, but visibility is marked as `private` so only followers will see it.

```yaml
- service: notify.mastodon
  message: "A private toot from Home Assistant"
  target: private
```

### Example service call - with media

This will post a message to Mastodon that includes an image.

```yaml
- service: notify.mastodon
  message: "A media toot from Home Assistant"
  data:
    media: /config/www/funny_meme.png
```

### Example service call - with media and content warning to hide post behind a warning

This will post a message to Mastodon that includes an image and a target of `unlisted`, so it doesn't show in the public timeline.

```yaml
- service: notify.mastodon
  message: "A media toot from Home Assistant"
  target: unlisted
  data:
    media: /config/www/funny_meme.png
    content_warning: "This might not be funny enough"
```

For more on how to use notifications in your automations, please see the [getting started with automation page](/getting-started/automation/).
