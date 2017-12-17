---
layout: page
title: "Twitter"
description: "Instructions how to add Twitter notifications to Home Assistant."
date: 2016-01-27 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: twitter.png
ha_category: Notifications
ha_release: 0.12
---


The `twitter` platform uses [Twitter](https://twitter.com) to deliver notifications from Home Assistant.

Go to [Twitter Apps](https://apps.twitter.com/app/new) and create an application. Visit "Keys and Access Tokens" of the application to get the details ("Consumer Key", "Consumer Secret", "Access Token" and "Access Token Secret" which needs to be generated).

To add Twitter to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: twitter
    consumer_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    consumer_secret: ABCDEFGHJKLMNOPQRSTUVXYZ
    access_token: ABCDEFGHJKLMNOPQRSTUVXYZ
    access_token_secret: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **consumer_key** (*Required*): Your "Consumer Key" (API Key) for the application.
- **consumer_secret** (*Required*): Your "Consumer Secret" (API Secret) for the application.
- **access_token** (*Required*): Your "Access Token" for the application.
- **access_token_secret** (*Required*): Your "Access Token Secret" for the application.
- **username** (*Optional*): Twitter handle without `@` or with `@` and quoting for direct messaging.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
