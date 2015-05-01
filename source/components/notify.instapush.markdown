---
layout: page
title: "Notifications"
description: "Instructions how to add user notifications to Home Assistant."
date: 2015-05-01 18:00
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/instapush.png' class='brand pull-right' />
The instapush platform uses [Instapush](https://instapush.im) to delivery notifications from Home Assistant to your Android or iOS device.

The Instapush [Getting Started page](https://instapush.im/home/start/) will guide through the process of creating the required items.

```yaml
# Example configuration.yaml entry
notify:
    platform: instapush
    # Get those by creating a new application, event, and tracker on https://instapush.im
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    app_secret: ABCDEFGHJKLMNOPQRSTUVXYZ
    event: ABCDEFGHJKLMNOPQRSTUVXYZ
    tracker: ABCDEFGHJKLMNOPQRSTUVXYZ
```

To retrieve those values for existing settings, log into your account at https://instapush.im and go to your **Dashboard**. Then click **APPS** tab, choose an app, and check the **Basic Info** section. The *Application ID* is the ``api_key`` and ``app_secret`` is the *Application Secret*.
 
It's easy to test your Instapush setup outside of Home Assistant. Assuming you have an event *notification* and a tracker *home-assistant*, just fire a request and check the Instapush dashboard for a new entry.

```bash
curl -X POST \
    -H "x-instapush-appid: YOUR_APP_KEY" \
    -H "x-instapush-appsecret: YOUR_APP_SECRET" \
    -H "Content-Type: application/json" \
      -d '{"event":"notification","trackers":{"home-assistant":"Switch 1"}}' \
    https://api.instapush.im/v1/post
```
For further details, please check the [API](https://instapush.im/developer/rest)

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation.html).
