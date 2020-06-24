---
layout: post
title: "Home Assistant Companion for Android 1.8, 1.9 & 1.10"
description: "Today we're releasing a big update for our Android companion app including lots of improvements to notifications, biometrics support and a new geocoded sensor."
date: 2020-06-18 00:00:00
date_formatted: "June 18, 2020"
author: Daniel Shokouhi
comments: true
categories: Release-Notes
og_image: /images/blog/2020-07-android-18-110-release/biometric_small.png
---


There have been lots of more improvements to the Android app since we last had a release post so let's go over some of the highlights!

## Notification Improvements

Throughout the past few releases Android notifications were greatly improved with new features and fixes.

Starting in 1.8.0 we enhanced our image notifications to allow for not only a relative path (i.e. storing in your [`www`][1] folder) but you can also request a snapshot using the [Camera Proxy API][2]. All authentication is handled via the app so you don't need to worry about it. You can also use [click action][3] and [actionable notifications][4] to navigate to a specific lovelace view.

From 1.9.0 you can now create and remove [notification channels][5] on the fly. This is helpful so you can create channels that can override your do not disturb settings, specifically for notifications like the alarm while notifications for your laundry can continue to let you be undisturbed.

In 1.10.0 we further enhanced our notifications to allow for many new options. Users can now change the [LED Color][6], [vibration pattern][7] and [importance][8] of a message. These options can also be used with a channel to help set defaults to allow you to further distinguish between notifications. You can now [group][9] your notifications to help declutter the notification pull down. [Persistent notifications][10] were also introduced so you can't simply swipe away those important notifications, you can pair this with the [`sticky`][11] property so the notification does not disappear. The `message` now allows for [HTML formatting][12] so you can highlight the important parts. Users can also supply an [icon][13] much like they can with an image.  For the unimportant notifications you can set a [timeout][14] so after x amount of seconds the notification is automatically dismissed.

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
          channel: Alarm             # creates a new channel called Alarm that you can manage from your device
          importance: high           # set the channel importance to high
          ledColor: red              # make the LED flash red for this notification
          vibrationPattern: "100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100"     # SOS vibration pattern
          persistent: true           # set to persistent
          sticky: true               # make sure it doesn't dismiss if selected
          clickAction: /lovelace/alarm    # navigate user to the lovelace alarm view
          icon: /local/alarm.jpg     # relative path to the icon
          color: red                 # set the color of the notification to red
          group: alarm               # the group name to group together notifications
          tag: alarm                 # tag is required in order to remove the persistent notification
```


In the above automation example a new channel with the name `Alarm` will be created with a default setting for vibration, LED and importance. This notification will also be persistent and part of a group and tag along with an icon amongst other changes.


## Sensors

Starting with 1.8.0 we have introduced a new [Geocoded sensor][15] that helps translate your GPS location to an actual street address.

<p class='img'>
<img src='/images/blog/2020-07-android-18-110-release/geocoded_sensor.png' alt='Screenshot of the Geocoded Sensor'></a>
Screenshot of the Geocoded Sensor.
</p>

The battery level sensor was split in 1.9.0 to include a [battery state sensor][16] so you can see when your device is actively `charging`, `not_charging`, `discharging` and `full`. You can also distinguish whether its `wireless`, `ac` or `usb`. The state now updates immediately upon being plugged in and unplugged to allow for quicker automations.


## Biometrics

Biometrics were introduced in 1.9.0 to allow the user to lock down the app when they are not using it. Upon launching the app you will see a lockscreen like below requesting for either your fingerprint or face to unlock the app. You can set this feature up by visiting the App Configuration screen inside the app.

<p class='img'>
<img src='/images/blog/2020-07-android-18-110-release/biometric_unlock.png' alt='Screenshot of Biometric Unlock'></a>
Screenshot of Biometric Unlock.
</p>


## Additional Improvements

We have also been hard at working making improvements in other areas of the app:

* [Widgets][17] were enhanced to allow you to select from a list of valid and available services along with the ability to add additional data fields that the service may require.
* In App Configuration the Home Network WiFi SSID option now allows the user to select multiple SSIDs.
* A Cookie Manager was added to our WebView that will allow you to save cookies from sites that you may use in the [webpage card][18].
* More descriptive SSL error messages were added to help users resolve local issues they may encounter while setting up the app.


## Docs

You can always find all the latest examples and details of the mobile app over in the [Companion docs][19]. 


## Finale

In addition to the highlights above, we’ve also fixed a good amount of bugs and made other improvements across the board. Thanks goes to [JBassett](https://github.com/JBassett), [KBerstene](https://github.com/KBerstene), [chriss158](https://github.com/chriss158), [timmmeeeh](https://github.com/timmmeeeh), [timmoo001](https://github.com/timmoo001), [craftykoala](https://github.com/craftykoala),  [jeroenseegers](https://github.com/jeroenseegers), [yoxjames](https://github.com/yoxjames), and [neopilou](https://github.com/neopilou) for their hard work on all of the above.

Enjoy the latest release! Don't forget to leave a rating if you like the app, it will help other users find the app. Also feel free to join the [Android App Beta][20] to get faster access to all the latest fixes and enhancements!

<a href="https://play.google.com/store/apps/details?id=io.homeassistant.companion.android"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_gb/badges/static/images/badges/en_badge_web_generic.png" width="155" style='border: 0;box-shadow: none;'></a>

[1]: https://www.home-assistant.io/integrations/http#hosting-files "Hosting files"
[2]: https://developers.home-assistant.io/docs/api/rest/#get-apicamera_proxycameraentity_id "Camera Proxy API"
[3]: https://companion.home-assistant.io/docs/notifications/notifications-basic/#notification-click-action "Notification Click Action"
[4]: https://companion.home-assistant.io/docs/notifications/actionable-notifications#building-automations-for-notification-actions "Actionable Notification"
[5]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-channels "Notification Channels"
[6]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-led-color "Notification LED Color"
[7]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-vibration-pattern "Notification Vibration Pattern"
[8]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-channel-importance "Notification Importance"
[9]: https://companion.home-assistant.io/docs/notifications/notifications-basic#thread-id-grouping-notifications "Notification Grouping"
[10]: https://companion.home-assistant.io/docs/notifications/notifications-basic#persistent-notification "Persistent Notifications"
[11]: https://companion.home-assistant.io/docs/notifications/notifications-basic#sticky-notification "Sticky Notifications"
[12]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-message-html-formatting "HTML Message Formatting"
[13]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-icon "Notification Icon"
[14]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-timeout "Notification Timeout"
[15]: https://companion.home-assistant.io/docs/core/sensors#geocoded-location-sensor "Geocoded Sensor"
[16]: https://companion.home-assistant.io/docs/core/sensors#battery-sensors "Battery Sensors"
[17]: https://companion.home-assistant.io/docs/core/android-widgets "Android Widgets"
[18]: https://www.home-assistant.io/lovelace/iframe/ "Lovelace Webpage Card"
[19]: https://companion.home-assistant.io/ "Companion Docs"
[20]: https://play.google.com/apps/testing/io.homeassistant.companion.android "Android App Beta"