---
layout: page
title: "Cisco Spark"
description: "Instructions how to add CiscoSpark notifications to Home Assistant."
date: 2017-02-20 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ciscospark.png
ha_category: Notifications
ha_release: "0.40"
---

The `ciscospark` notification platform allows you to deliver notifications from Home Assistant to [Cisco Spark](https://ciscospark.com/).

To use this notification platform you need to get a developer token. To obtain a token visit [Spark for Developers](https://developer.ciscospark.com/index.html)

At this time you also need to specify the `Cisco Spark` `roomid`. The `roomid` can also be found at [Spark for Developers](https://developer.ciscospark.com/index.html). Just look in the Documentation under Rooms. 

To enable the Cisco Spark notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: ciscospark
    token: YOUR_DEVELOPER_TOKEN
    roomid: CISCO_SPARK_ROOMID
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **token** (*Required*): Your development token.
- **roomid** (*Required*): The Room ID.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

