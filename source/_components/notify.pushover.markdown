---
layout: page
title: "Notifications"
description: "Instructions how to add user notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
logo: pushover.png
ha_category: Notify
---

<img src='/images/supported_brands/pushover.png' class='brand pull-right' />
The [PushOver service](https://pushover.net/) is a platform for the notify component. This allows components to send messages to the user using PushOver.

To use PushOver notifications, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: pushover
  api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  user_key: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): This parameter is optional but should be configured, in order to get an API key you should go to https://pushover.net and register a new application.
- **user_key** (*Required*): To retrieve this value log into your account at https://pushover.net

This is a quote from the pushover website regarding free/open source apps:
> "If you are creating a client-side library, application, or open source project that will be redistributed and installed by end-users, you may want to require each of your users to register their own application rather than including your own API token with the software."

When setting up the application you can use this [icon](https://home-assistant.io/images/favicon-192x192.png).

For more automation examples, see the [getting started with automation page]({{site_root}}/components/automation.html).

