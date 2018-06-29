---
layout: page
title: "Mastodon"
description: "Instructions on how to add Instapush notifications to Home Assistant."
date: 2018-03-25 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mastodon.png
ha_category: Notifications
ha_release: 0.67
---


The `mastodon` platform uses [MAstodon](https://joinmastodon.org/) to delivery notifications from Home Assistant.

Go to **Preferences** in the Mastodon web interface, then to **Development** and create a new application.

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
