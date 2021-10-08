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
---

The `mastodon` platform uses [Mastodon](https://joinmastodon.org/) to deliver notifications from Home Assistant.

### Setup

Go to **Preferences** in the Mastodon web interface, then to **Development** and create a new application.

### Configuration

To add Mastodon to your installation, add the following to your `configuration.yaml` file:

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

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
