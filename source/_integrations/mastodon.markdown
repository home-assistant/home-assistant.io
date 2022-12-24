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
---

The `mastodon` platform uses [Mastodon](https://joinmastodon.org/) to deliver notifications from Home Assistant.

### Setup

Go to **Preferences** in the Mastodon web interface, then to **Development** and create a new application. This
integration currently only support sending notifications, so the API only has to be able to `write` to the
account.

NB: although the parameter is called `client_id`, the web front-end of (at least) version 4.0.2 calls this parameter
Client key.

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

### Services

#### sending Toots
Sending a Toot is done by calling the service `notify.<name>` with the relevant parameters. Here `<name>` should be
replaced by the name that was given to this integration during configuration.

Example:
```yaml
  action:
    service: notify.NOTIFIER_NAME
    data:
      message: "A message to @john@mastodon.social"
      data:
        visibility: "direct"
        language: "en"
        spoiler_text: "Beware! Spoiler Alert"
```

Parameters to pass are documented below. Additional data can specify different aspects of the Toot that will be sent.

{% configuration %}
message:
  description: "The message to be sent, potentially including the full handles of referenced other Mastodon users."
  required: true
  type: string
  default: ""
visibility:
  description: "determines the scope of how the Toot is going to be sent. Can be any of: ‘direct’ - post will be 
visible only to mentioned users; ‘private’ - post will be visible only to followers; ‘unlisted’ - post will be 
public but not appear on the public timeline; ‘public’ - post will be public (the default)"
  required: false
  type: string
  default: "public"
language:
  description: "Can be set to override automatic language detection. The parameter accepts all valid 
ISO 639-1 (2-letter) or for languages where that do not have one, 639-3 (three letter) language codes."
  required: false
  type: string
spoiler_text:
  description: "Text that should be shown as a warning before the actual message. Readers of this Toot will have
to click a button to reveal the actual message."
  required: false
  type: string
{% endconfiguration %}
