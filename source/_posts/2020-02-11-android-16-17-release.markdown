---
layout: post
title: "Home Assistant Companion for Android 1.6 and 1.7"
description: "Today we're releasing a big update for our Android companion app including actionable notifications, requesting location updates, sensors and more"
date: 2020-02-11 00:00:00
date_formatted: "February 11, 2020"
author: Robbie Trencheny
author_twitter: robbie
comments: true
categories: Release-Notes
og_image: /images/blog/2020-02-android-16-17-release/garage.png
---

Over the last week, we've released some awesome new features and improvements to Home Assistant Companion for Android. I wanted to take a moment to highlight some of the recent things that we introduced in 1.6 and 1.7.

## Actionable notifications

Now you can define action buttons to attach to a notification dynamically. When you click one of those buttons, an event is fired back to Home Assistant so you can take action based on the button chosen.

Here's an example to check with a user if they want to close the garage door after it has been left open for 30 minutes:

```yaml
automation:
  - alias: "Notify apps when the garage door opens"
    trigger:
      platform: state
      entity_id: cover.garage_door
      from: "closed"
      to: "open"
      for: ‘0:30:00’
    action:
      service: notify.mobile_app_robbies_pixel_5
      data:
        message: "The garage has been left open"
        data:
          image: https://www.home-assistant.io/images/merchandise/shirt-frontpage.png
          actions:
            - action: "close_garage" # The key you are sending for the event
              title: "Close Garage Door" # The button title

  - alias: "Close the garage when notification action is tapped"
    trigger:
      platform: event
      event_type: mobile_app_notification_action
      event_data:
        action: close_garage
    action:
      service: cover.close_cover
      target:
        entity_id: cover.garage_door
```

After adding these automations, whenever your garage door remains open for 30 minutes, your device will get a notification that looks like this:

![A notification showing an open garage](/images/blog/2020-02-android-16-17-release/garage.png)

When you press that close garage button… your garage will close!

We are planning to expand notifications over the next few versions to continue to match the existing functionality available in the iOS app. That includes things like sending text back to Home Assistant and critical alerts.

## Requesting location updates via notification

You can now send a notification with just the message `request_location_update` and once it reaches your device, it will update its current location in Home Assistant. Be careful using this too much though, as it can drain your battery.

## Sensors

New in version 1.7, we have added the first sensors to the app. For now, you will find the following new sensors:

- Battery percentage
- Battery state
- Current Wi-Fi network information

We plan to keep expanding sensors in the near future to add things like cellular status and more.

## Docs

Thanks to a few dedicated volunteers and a mad dash, [we have a newly refreshed docs website](https://companion.home-assistant.io/). It’s using the latest version of [Docusaurus](https://docusaurus.io/), which means it’s got a new coat of paint and even dark mode support. So much easier on the eyes!

In addition to the tooling updates, we’ve also begun documenting Android and iOS differences. Keep an eye out for the Android and Apple logos to denote what works where.

Over time we plan to bring Android and iOS as close together, in terms of features and the ways they interact with Home Assistant, as much as possible. To allow using both platforms in the same way, so that users who are using both platforms, or switching platforms, can use them without any modifications.

## Finale

In addition to the highlights above, we’ve also killed an impressive amount of bugs. Thanks goes to [JBassett](https://github.com/JBassett), [KBerstene](https://github.com/KBerstene), [quthla](https://github.com/quthla) and [neopilou](https://github.com/neopilou) for their work on all of the above.

Enjoy the new release! Don't forget to leave a rating if you like the app, it will help other users find the app.

<a href="https://play.google.com/store/apps/details?id=io.homeassistant.companion.android"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png" width="155" style='border: 0;box-shadow: none;'></a>
