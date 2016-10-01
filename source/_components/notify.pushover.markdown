---
layout: page
title: "Pushover"
description: "Instructions how to add Pushover notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: pushover.png
ha_category: Notifications
ha_release: pre 0.7
---


The [Pushover service](https://pushover.net/) is a platform for the notify component. This allows components to send messages to the user using Pushover.

In order to get an API key you need to go to the [Pushover website](https://pushover.net) and register a new application. From the website you can also retrieve your user key.

To use Pushover notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushover
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    user_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): Your API key.
- **user_key** (*Required*): Your user key for Pushover.

This is a quote from the Pushover website regarding free/open source apps:

<blockquote>
  If you are creating a client-side library, application, or open source project that will be redistributed and installed by end-users, you may want to require each of your users to register their own application rather than including your own API token with the software.
</blockquote>

When setting up the application you can use this [icon](https://home-assistant.io/images/favicon-192x192.png).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
