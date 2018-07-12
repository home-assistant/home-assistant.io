---
layout: page
title: "Pushetta"
description: "Instructions on how to add Pushetta notifications to Home Assistant."
date: 2015-11-10 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pushetta.png
ha_category: Notifications
ha_release: pre 0.7
---


The `pushetta` notify platform uses [Pushetta](http://www.pushetta.com) to delivery notifications from Home Assistant to your devices.

To retrieve the API token, log into your account at [http://www.pushetta.com](http://www.pushetta.com) and go to your **Dashboard**. Create a new  channel by clicking on **Channels** and then **Add a Channel**.

To enable Pushetta notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: pushetta
    api_key: YOUR_API_KEY
    channel_name: YOUR_CHANNEL_NAME
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): Your API key for Pushetta.
- **channel_name** (*Required*): The name of your channel.
- **send_test_msg** (*Optional*): Disable/enable the test message send on Home Assistant's startup to test the API key and the existence of the channel. Default to `False`.

It's easy to test your Pushetta setup outside of Home Assistant. Assuming you have a channel *home-assistant*, just fire a request and check the channel page in the dashboard for a new message.

```bash
curl -X POST \
    -H "Authorization: Token YOUR_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{ \"body\" : \"Hello World\", \"message_type\" : \"text/plain\" }" \
    http://api.pushetta.com/api/pushes/home-assistant/
```

For further details, please check the [API](http://pushetta.com/pushetta-api/).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
