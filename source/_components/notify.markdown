---
layout: component
title: "Notifications"
description: "Instructions how to add user notifications to Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
---

One of the things most people want at some point in their home automation is to get notified when certain events occur. For this reason there is a `notify` component in Home Assistant.

Home Assistant currently supports a wide range of services for notifications. Please check the sidebar for a full list of platforms.

If your are running into troubles with your notification platform, a simple way to test it is to use **Call Service** from the **Developer Tools**. Choose your service (*notify/xyz*) from the list of **Available services:** and enter something like the sample below into  the **Service Data** field and hit **CALL SERVICE**.

```json
{"message":"A simple test message from HA."}
```

This will send a single message to your notification platform configured in your `configuration.yaml` file.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `title`                |      yes | Can be used to set a title for the message. The default is `Home Assistant`.
| `message`              |       no | Message to send to recipient.


For more automation examples, see the [getting started with automation page](/getting-started/automation/) or the [configuration cookbook](/cookbook).
