---
title: Cisco Spark
description: Instructions on how to add CiscoSpark notifications to Home Assistant.
logo: ciscospark.png
ha_category:
  - Notifications
ha_release: '0.40'
---

The `ciscospark` notification platform allows you to deliver notifications from Home Assistant to [Cisco Spark](https://ciscospark.com/).

To use this notification platform you need to get a developer token. To obtain a token visit [Spark for Developers](https://developer.ciscospark.com/index.html)

At this time you also need to specify the `Cisco Spark` `roomid`. The `roomid` can also be found at [Spark for Developers](https://developer.ciscospark.com/index.html). Just look in the Documentation under Rooms. 

In order to get notified for all new messages in the room you will need to create a bot. This will post the messages from the bot and mark them as new for you which will alert you. If you use your own personal token the messages are added to the room but no notification is triggered. 
Once you have created the bot through the new App menu you will need to add the bot to the room that you are a member of as well. Now use the bot access token in your configuration below.

To enable the Cisco Spark notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: ciscospark
    token: YOUR_DEVELOPER_TOKEN
    roomid: CISCO_SPARK_ROOMID
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
token:
  description: Your development token.
  required: true
  type: string
roomid:
  description: The Room ID.
  required: true
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
