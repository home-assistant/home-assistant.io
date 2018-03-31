---
layout: page
title: "LlamaLab Automate"
description: "Instructions on how to add user notifications to Home Assistant."
date: 2016-08-21 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: llamalab_automate.png
ha_category: Notifications
ha_release: 0.27
---


The `llamalab_automate` platform uses Googles Cloud Messaging Services to push messages from Home Assistant to your Android device running the LlamaLab [Automate](https://llamalab.com/automate/) app. This can serve as an alternative to Tasker + AutoRemote.

Go to [https://llamalab.com/automate/cloud/](https://llamalab.com/automate/cloud/) and create a new API key/secret.

To add Automate to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: llamalab_automate
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    to: example@gmail.com
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): Enter the API key for Automate.
- **to** (*Required*): E-Mail address the Automate-Fiber is configured for.
- **device** (*Optional*): Name of the target device to receive the messages.

Receiving cloud messages in Automate:

1. Add a new flow
2. Insert block "Messaging -> Cloud message receive"
3. Insert block "Interface -> Toast show"
4. Connect OK from Flow beginning to IN of Cloud receive
5. Connect OK from Cloud receive to Toast show
6. Connect OK form Toast show to IN of Cloud receive
7. Tap Cloud receive and select the E-Mail account as setup in your configuration
8. Assign a variable name for the Payload
9. Tap Toast show and set the message value to the variable you've specified

If you have multiple devices paired to one Google Mail account and want to control each instance of Automate individually, you can set the notifier to target a specific device. To determine your devices name, add a Cloud Message send block to your flow, tap it and scroll all the way to the bottom. Device names are case sensitive.
