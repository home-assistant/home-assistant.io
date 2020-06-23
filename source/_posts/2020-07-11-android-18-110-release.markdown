---
layout: post
title: "Home Assistant Companion for Android 1.8 - 1.10"
description: "Today we're releasing a big update for our Android companion app including lots of improvements to notifications, biometrics support and a new geocoded sensor."
date: 2020-03-11 00:00:00
date_formatted: "July 11, 2020"
author: Daniel Shokouhi
comments: true
categories: Release-Notes
og_image: /images/blog/2020-07-android-18-110-release/biometric_unlock.png
---

There have been lots of more improvements to the android app since we last had a release post so lets go over some of the highlights!

## 1.8.0

Starting with 1.8.0 we have introduced a new [Geocoded sensor](https://companion.home-assistant.io/docs/core/sensors#geocoded-location-sensor) that helps translate your GPS location to an actual street address. We also enhanced our image notifications to allow for not only a relative path (i.e. storing in your [`www`](https://www.home-assistant.io/integrations/http#hosting-files) folder) but you can also request a snapshot using the [Camera Proxy API](https://developers.home-assistant.io/docs/api/rest/#get-apicamera_proxycameraentity_id). All authentication is handled via the app so you don't need to worry about it. You can also use the [click action](https://companion.home-assistant.io/docs/notifications/notifications-basic/#notification-click-action) and [actionable notifications](https://companion.home-assistant.io/docs/notifications/actionable-notifications#building-automations-for-notification-actions) to navigate to a specific lovelace view. [Widgets](https://companion.home-assistant.io/docs/core/android-widgets) were also enhanced to allow you to select from a list of valid services and the ability to add data fields.

![Geocoded sensor](/images/blog/2020-07-android-18-110-release/geocoded_sensor.png)

```yaml
automation:
  - alias: Notify motion in frontyard
    trigger:
      platform: state
      entity_id: binary_sensor.frontyard_motion
      to: 'on'
    action:
      service: notify.mobile_app_pixel_4_xl
      data:
        message: "Motion detected in the frontyard"
        data:
          image: /local/frontyard.jpg       # load the image stored in the www directory
          clickAction: /lovelace/cameras    # upon selecting the notification, navigate to the cameras view
```

After adding this automation, you will receive a notification when there is motion in the frontyard with an image. Upon selecting it you will be navigated to the lovelace view for your cameras.

## 1.9.0

In 1.9.0 we added support for allowing the user to enter multiple SSID's for the internal connection. You can also now lock the app using biometrics like fingerprint or face unlock for more security. Users can also now create and remove [notification channels](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-channels) on the fly. This is helpful so you can create channels that can override your do not disturb settings specifically for the alarm while notifications for your laundry can continue to let you be undisturbed. The battery level sensor was also split to include a [battery state sensor](https://companion.home-assistant.io/docs/core/sensors#battery-sensors) so you can see when your device is actively charging, whether its wireless, ac or usb. The state also updates immediately upon being plugged in and unplugged to allow for quicker automations.

![Biometric unlock](/images/blog/2020-07-android-18-110-release/biometric_unlock.png)

```yaml
automation:
  - alias: Alarm triggered
    trigger:
      platform: state
      entity_id: alarm_control_panel.home
      to: triggered
    action:
      service: notify.mobile_app_pixel_4_xl
      data:
        message: "Front alarm triggered"
        data:
          channel: Alarm       # creates a new channel called Alarm that you can manage from your device
```

This automation will create a new channel called "Alarm" that you can manage and override do not disturb settings as well as setting a unique ringtone.  You can also send `message: remove_channel` to the same `channel` to remove it from your device.

## 1.10.0

In 1.10.0 we further enhanced our notifications to allow for many new options. Users can now change the [LED Color](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-led-color), [vibration pattern](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-vibration-pattern) and [importance](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-channel-importance) of a message. These options can also be used with a channel to help set defaults to allow you to further distinguish between notifications. You can now [group](https://companion.home-assistant.io/docs/notifications/notifications-basic#thread-id-grouping-notifications) your notifications to help declutter the notification pull down. [Persistent notifications](https://companion.home-assistant.io/docs/notifications/notifications-basic#persistent-notification) were also introduced so you can't simply swipe away those important notifications, you can pair this with the [`sticky`](https://companion.home-assistant.io/docs/notifications/notifications-basic#sticky-notification) property so the notification does not disappear. The `message` now allows for [HTML formatting](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-message-html-formatting) so you can highlight the important parts. Users can also supply an [icon](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-icon) much like they can with an image.  For the unimportant notifications you can set a [timeout](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-timeout) so after x amount of seconds the notification is automatically dismissed.

```yaml
automation:
  - alias: Alarm triggered
    trigger:
      platform: state
      entity_id: alarm_control_panel.home
      to: triggered
    action:
      service: notify.mobile_app_pixel_4_xl
      data:
        message: "Front alarm <b>triggered</b>"     # some HTML formatting to highlight the alert
        data:
          channel: Alarm       # creates a new channel called Alarm that you can manage from your device
          importance: high
          ledColor: red
          vibrationPattern: "100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100"     # SOS vibration pattern
          persistent: true           # set to persistent
          sticky: true               # make sure it doesn't dismiss if selected
          clickAction: /lovelace/alarm
          icon: /local/alarm.jpg
          color: red
          group: alarm               # the group name to group together notifications
          tag: alarm                 # tag is required in order to remove the persistent notification
```

In the above automation example a new channel with the name `Alarm` will be created with a default setting for vibration, LED and importance. This notification will also be persistent and part of a group and tag along with an icon amongst other changes.

In addition to the notification enhancements we have made several improvements around some of the error messages people may see as they try to setup the app. Specifically you should see more details about SSL issues that should hopefully lead you in the right direction to fix the issue. We added a new cookie manager so you can save those cookies from custom cards that require it, along with the ability to save logins in the webview and some more biometric improvements.

## Docs

You can always find all the latest examples and details of the mobile app over in the [Companion docs](https://companion.home-assistant.io/). 


## Finale

In addition to the highlights above, we’ve also fixed a good amount of bugs and made other improvements across the board. Thanks goes to [JBassett](https://github.com/JBassett), [KBerstene](https://github.com/KBerstene), [chriss158](https://github.com/chriss158), [timmmeeeh](https://github.com/timmmeeeh), [timmoo001](https://github.com/timmoo001), [craftykoala](https://github.com/craftykoala),  [jeroenseegers](https://github.com/jeroenseegers), [yoxjames](https://github.com/yoxjames), and [neopilou](https://github.com/neopilou) for their hard work on all of the above.

Enjoy the latest release! Don't forget to leave a rating if you like the app, it will help other users find the app. Also feel free to join the [Android App Beta](https://play.google.com/apps/testing/io.homeassistant.companion.android) to get faster access to all the latest fixes and enhancements!

<a href="https://play.google.com/store/apps/details?id=io.homeassistant.companion.android"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png" width="155" style='border: 0;box-shadow: none;'></a>
