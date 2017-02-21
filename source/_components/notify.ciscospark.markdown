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
ha_release: pre 0.7
---

The `Cisco Spark` platform allows you to deliver notifications from Home Assistant to [Cisco Spark](https://ciscospark.com/).

To use this notification platform you need to get a developer token. To obtain a token visit [Spark for Devleopers](https://developer.ciscospark.com/index.html)

At this time you also need to specify the `Cisco Spark` `roomid`. The `roomid` can also be found at [Spark for Devleopers](https://developer.ciscospark.com/index.html). 
Just look in the Doumentation under Rooms. 

To enable the `Cisco Spark` notification in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: ciscospark
    token: <YOUR_DEVELOPER_TOKEN>
    roomid: <CISCO_SPARK_ROOMID>
```
To use notifications, please see the [getting started with automation page](/getting-started/automation/).

