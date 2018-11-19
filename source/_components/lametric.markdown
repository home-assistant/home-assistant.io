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

## {% linkable_title Setup Steps %}

LaMetric needs an OAuth2 `client_id` and `client_secret` from the LaMetric developer portal to use it with Home Assistant.
These are the steps to take:

1. Log in with your LaMetric device account to [developer.lametric.com](https://developer.lametric.com).
2. Hit the Create button and choose [Notification](https://developer.lametric.com/applications/createsource).
3. Fill in the form. You can put almost anything in the fields, they just need to be populated:
  * App Name: Home Assistant 
  * Description: Home Assistant
  * Privacy Policy: http://localhost/
  * Check all permission boxes
  * Hit Save
4. You should be directed to your [Notification Apps list](https://developer.lametric.com/applications/sources), click on "Home Assistant", copy your client ID and client Secret and paste into the Home Assistant configuration block in the previous section.
5. Set up some notifications in Home Assistant by following the instructions on the [Lametric Notify](/components/notify.lametric) page.
6. Save all configuration files and restart Home Assistant.
