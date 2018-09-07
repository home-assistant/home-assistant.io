---
layout: page
title: "LaMetric"
description: "Instructions on how to integrate LaMetric with Home Assistant."
date: 2017-04-02 13:28
sidebar: true
comments: false
sharing: true
footer: true
logo: lametric.png
ha_category: Hub
ha_release: 0.49
---

[LaMetric Time](http://lametric.com) is a smart clock that can be used to access applications, listen to web radio and display notifications.

There is currently support for the following device types within Home Assistant:

- [Notify](/components/notify.lametric)

The LaMetric Time can only be accessed by authorized applications. Therefore, each application that wants to access the LaMetric time needs to be registered at the LaMetric Developer web page. Sign Up and login to the developer web page. Click the Create button in the upper right corner, then select Notification App and click Create again. Enter an app name, a description and a redirect URL. Finally, click Save to create the application. For the newly created app you will obtain a client id and a client secret that is required in the following configuration.

```yaml
# configuration.yaml example
lametric:
  client_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
  client_secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
