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
ha_integration_type: integration
---

The `twitter` notification platform uses [Twitter](https://twitter.com) to deliver notifications from Home Assistant.

## Setup

Make sure you have a developer account registered with Twitter, then go to [Twitter Apps](https://developer.twitter.com/en/portal/dashboard) and create an application. If you don't have a developer account you need to apply for one, it can take some time to get approved.

### App permissions

If you do not perform this step, your application will only receive read permissions and will not be able to post tweets on behalf of your account on Twitter.

1. Visit "Settings" of the application.
2. Click on `Set up` under "User authentication settings".
3. Check the box for `OAuth 1.0a`.
4. Set the app permission to `Read and write`.
5. Enter a `callback` and `website` URL and click save.

It does not matter for the integration what you enter as a callback or website URL.

### Generate tokens and secrets

1. Visit "Keys and tokens" of the application.
2. Click on `Regenerate` under "Consumer keys" to get your **Consumer Key** and **Consumer Secret**.
3. Click on `Regenerate` under "Access Tokens and Secret" to get your **Access Token** and **Access Token Secret**.

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
