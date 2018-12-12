---
layout: page
title: "Telstra"
description: "Instructions on how to add Telstra API notifications to Home Assistant."
date: 2016-10-19 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: telstra.png
ha_category: Notifications
ha_release: 0.31
---


The `telstra` notification platform allows you to deliver Home Assistant notifications to Australian phone numbers over the [Telstra SMS API](https://dev.telstra.com/content/sms-api-0).

To enable the Telstra notifications in your installation, you must first create an account and API app over at [dev.telstra.com](https://dev.telstra.com/). The free tier allows for a maximum of 1000 free messages.

After your API app is approved, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: telstra
  consumer_key: TELSTRA_API_CONSUMER_KEY_HERE
  consumer_secret: TELSTRA_API_CONSUMER_SECRET_HERE
  phone_number: SMS_RECIPIENT_PHONE_NUMBER_HERE
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **consumer_key** (*Required*): The consumer key of your Telstra API app.
- **consumer_secret** (*Required*): The consumer secret of your Telstra API app.
- **phone_number** (*Required*): The phone number of where the notifications will be sent.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
