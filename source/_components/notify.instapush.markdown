---
layout: page
title: "Instapush"
description: "Instructions on how to add Instapush notifications to Home Assistant."
date: 2015-05-01 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: instapush.png
ha_category: Notifications
ha_release: pre 0.7
---


The `instapush` platform uses [Instapush](https://instapush.im) to delivery notifications from Home Assistant to your Android or iOS device.

The Instapush [Getting Started page](https://instapush.im/home/start/) will guide through the process of creating the required items.

To add Instapush to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: instapush
    api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
    app_secret: ABCDEFGHJKLMNOPQRSTUVXYZ
    event: ABCDEFGHJKLMNOPQRSTUVXYZ
    tracker: ABCDEFGHJKLMNOPQRSTUVXYZ
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **api_key** (*Required*): Your API key for Instapush.
- **app_secret** (*Required*): The secret for your created application.
- **event** (*Required*): The event to push to.
- **tracker** (*Required*): The name of tracker inside Instapush.

To retrieve the needed values for existing settings, log into your account at [https://instapush.im](https://instapush.im) and go to your **Dashboard**. Then click the **APPS** tab, choose an app, and check the **Basic Info** section. The *Application ID* is the `api_key` and `app_secret` is the *Application Secret*.

Assuming that your setup looks look in the image below...

<p class='img'>
  <img src='{{site_root}}/images/screenshots/instapush.png' />
</p>

...then your entry for the `configuration.yaml` file needs to be like this sample.

```yaml
notify:
  platform: instapush
  [...]
  event: msg
  tracker: state
```

It's easy to test your Instapush setup outside of Home Assistant. Assuming you have an event *notification* and a tracker *home-assistant*, just fire a request and check the Instapush dashboard for a new entry.

```bash
curl -X POST \
    -H "x-instapush-appid: YOUR_APP_KEY" \
    -H "x-instapush-appsecret: YOUR_APP_SECRET" \
    -H "Content-Type: application/json" \
      -d '{"event":"notification","trackers":{"home-assistant":"Switch 1"}}' \
    https://api.instapush.im/v1/post
```

For further details, please check the [API](https://instapush.im/developer/rest).

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
