---
layout: page
title: "Twitter"
description: "Instructions on how to add Twitter notifications to Home Assistant."
date: 2016-01-27 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: twitter.png
ha_category: Notifications
ha_release: 0.12
---


The `twitter` notification platform uses [Twitter](https://twitter.com) to deliver notifications from Home Assistant.

## {% linkable_title Setup %}

Go to [Twitter Apps](https://apps.twitter.com/app/new) and create an application. Visit "Keys and Access Tokens" of the application to get the details (Consumer Key, Consumer Secret, Access Token and Access Token Secret which needs to be generated).

## {% linkable_title Configuration %}

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
