---
title: Twitter
description: Instructions on how to add Twitter notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.12
ha_domain: twitter
ha_iot_class: Cloud Push
ha_platforms:
  - notify
---

The `twitter` notification platform uses [Twitter](https://twitter.com) to deliver notifications from Home Assistant.

## Setup

Make sure you have a developer account registered with Twitter, then go to [Twitter Apps](https://apps.twitter.com/app/new) and create an application. If you don't have a developer account you need to apply for one, it can take some time to get approved. Visit "Keys and Access Tokens" of the application to get the details (Consumer Key, Consumer Secret, Access Token and Access Token Secret which needs to be generated). 

## Configuration

To add Twitter to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: twitter
    consumer_key: YOUR_API_KEY
    consumer_secret: YOUR_API_SECRET
    access_token: YOUR_ACCESS_TOKEN
    access_token_secret: YOUR_ACCESS_SECRET
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: "`notify`"
  type: string
consumer_key:
  description: Your Consumer Key (API Key) for the application.
  required: true
  type: string
consumer_secret:
  description: Your Consumer Secret (API Secret) for the application.
  required: true
  type: string
access_token:
  description: Your Access Token for the application.
  required: true
  type: string
access_token_secret:
  description: Your Access Token Secret for the application.
  required: true
  type: string
username:
  description: "Twitter handle without `@` or with `@` and quoting for direct messaging."
  required: false
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
