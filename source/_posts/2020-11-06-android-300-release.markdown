---
title: "Home Assistant Companion Android App Release 3.0.0"
description: "What's new with the Home Assistant Companion Android App in 3.0.0"
date: 2020-11-06 00:00:00
date_formatted: "November 6, 2020"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2020-11-06-android-300-release/Companion.png
---

Hey everyone it's been a little while since we last spoke. We have a brand new Home Assistant Companion for Android release that we are excited to get into your hands and will roll out over the next day or so in the Google Play store.

Before we get into the release details I'd like to mention that this month marks the [1 year anniversary](https://youtu.be/tc17q1Zn0Xs?t=3487) of the Home Assistant Companion app being offered in the Google Play Store! Just to think how far along the entire app has come from its initial alpha state to what is currently being offered in today's release. Can you believe it's already been a year?

It has been pretty busy over on the Android side of things during Hacktoberfest! We have seen a total of 84 pull requests from a wide range of contributors that we are thankful for, so thank you for all of your efforts! In case you missed it we actually had a release shortly after version 2.4.0 but as we did not have an accompanying blog post, we'll cover whats new since we last spoke in this post. All of the features listed below are already documented on the [Companion](https://companion.home-assistant.io/) site, please be sure to check in there for greater details. Before we continue with what's new lets go over the backward-incompatible changes for this release.

## Backward-incompatible changes

In our [last blog post](https://www.home-assistant.io/blog/2020/09/12/android-240-release/) we mentioned that we were going to be breaking up some sensors and their attributes. As of 3.0.0 we have completed this task and no longer have non-static attributes as part of any sensor. If you are missing any data please check the Manage Sensors screen under App Configuration and enable the sensor you were previously using as an attribute.

Another major breaking change in this release is that the widgets were refactored to align with the application architecture. Unfortunately this means that some existing widgets may disappear from your home screen and will need to be recreated. We apologize for this and are unable to bring back the existing widgets that were lost. If you forgot what data was there we do have that saved, more on that down [below](#other-enhancements).

## Onboarding Improvements

The first big change is that our onboarding screen has changed, we now ask the user to enter their preferred device name that gets attached to all entities that are created by the app. This was a source of frustration for some users as this meant that anytime they logged into the app they would then need to rename their entities to the name that they actually want. By default the device name is the device model but that is not meaningful to some users, especially if they have more than one device of the same model.


<p class='img'>
<img src='/images/blog/2020-11-06-android-300-release/onboarding.png' alt='Screenshot of the new onboarding flow'></a>
Screenshot of the new onboarding flow.
</p>


## New Sensors

We have several new sensors to welcome to the app, all of which are disabled by default. The first set of sensors were actually introduced in 2.5.0:

- [Traffic Stat sensors](https://companion.home-assistant.io/docs/core/sensors#traffic-stats-sensor) - Sensors whose state represent the amount of data sent and received by the device. Mobile data may not be accurate, it depends on the data that we get from the API.

The following sensors are new in 3.0.0:

- [Keyguard sensors](https://companion.home-assistant.io/docs/core/sensors#keyguard-sensors) - Sensors that represent various states from the Keyguard API, such as if a device is currently locked or has a password setup. These sensors will update during the periodic 15 minute interval.
- [Last Notification sensor](https://companion.home-assistant.io/docs/core/sensors#last-notification-sensor) - A very powerful sensor that requires a special permission you must grant to read all notifications posted on the device. All attributes of the notification are provided as attributes for the sensor. You can think of this sensor as a great way to integrate any app that posts a notification to your device allowing you to automate around it. Personally I have been using it to integrate a food delivery app, to detect when my order will be delivered and automate around it. This sensor will update as soon as a notification is posted.
- [Last Update Trigger](https://companion.home-assistant.io/docs/core/sensors#last-update-trigger-sensor) - A sensor whose state will represent the reason for the last update that was sent to your Home Assistant instance. This sensor will update anytime an update is sent to your Home Assistant instance.

## Sensor Settings

We didn't stop at just adding new sensors, we also made enhancements to the overall sensor experience. Starting from version 2.5.0 certain sensors have custom settings that can help with what updates actually get sent to your Home Assistant instance.


<p class='img'>
<img src='/images/blog/2020-11-06-android-300-release/location_sensor_settings.png' alt='Screenshot of location settings'></a>
Screenshot of location settings.
</p>

- Next Alarm - This sensor has a setting for an allow list. This means that if you have an app that reports really odd timestamps as an actual alarm, you can now ignore them by telling the app which packages to send reports from. By default the list is blank. Tasker users are recommended to make use of this setting.
- Last Notification - This sensor also has an allow list to let the user create a list of apps from which they want notification data from. By default all notifications are sent to your Home Assistant instance. We highly recommend that you set up an allow list as soon as you can think of one to prevent a high amount of updates. You will be surprised by the amount of data that will show up in a short time period.
- Last Reboot - A bug was discovered where sometimes the timing in the calculation of the device's last reboot could be off causing an unnecessary update. There is now a deadband setting to allow you to adjust the timing to ignore updates. By default this is set to 1 minute, you most likely won't need to change this.
- Location Sensors - All 3 location sensors now have settings to allow you to adjust the minimum accuracy required to send a update to your Home Assistant instance. There is also a setting to adjust the minimum amount of time between updates. This should help a lot of users out who don't get the location results they expect. We recommend changing this setting after you evaluate all of the location fixes in 3.0.0 as location tracking may already be improved without needing to adjust these.
- WiFi BSSID - This sensor has a setting that will allow the user to provide an alias for the currently connected BSSID. Not everyone can remember a MAC address let alone dozens of them. This setting is designed to help out those who use this sensor to make better sense of things without the need for secrets or templates. If you live in a household with multiple access points you may find it useful to set up an alias to help with things like room presence. By default this sensor reports the connected MAC address.


## Android 11 Power Menu

We now integrate with Android 11's power menu device control feature. The following domains are [currently supported](https://companion.home-assistant.io/docs/integrations/android-power-menu):

-  `automation` On/Off
-  `climate` Temperature slider
-  `cover` Open/Close
-  `fan` On/Off, speed slider
-  `input_boolean` On/Off
-  `input_number` Number control slider
-  `light` On/Off, Brightness control slider
-  `lock` Lock/Unlock
-  `scene` Turn on scene
-  `script` Turn on script
-  `switch` On/Off


<p class='img'>
<img src='/images/blog/2020-11-06-android-300-release/power_menu.png' alt='Screenshot of power menu'></a>
Screenshot of power menu.
</p>


## Notification Improvements

There have been several improvements to notifications as well.

- An event gets sent upon a notification being [cleared](https://companion.home-assistant.io/docs/notifications/notification-cleared) along with all notification data.
- Notifications can make use of the alarm stream to bypass a device's ringer mode setting. This can be useful if there is an important event such as an alarm being triggered. Make sure to check the updated Android examples on the [companion site](https://companion.home-assistant.io/docs/notifications/critical-notifications).
- [Text-to-speech notifications](https://companion.home-assistant.io/docs/notifications/notifications-basic#text-to-speech-notifications), with the ability to use the alarm stream if desired. By default it will use the device's music stream. There is also an additional option to temporarily change the volume level to the maximum level while speaking, the level would then restored to what it was previously.
- New device [commands](https://companion.home-assistant.io/docs/notifications/notification-commands) to control your phone: broadcasting an intent to another app, controlling Do Not Disturb and ringer mode.
- Opening another app with an [actionable notification](https://companion.home-assistant.io/docs/notifications/actionable-notifications#building-automations-for-notification-actions), make sure to follow the Android examples.


## Other Enhancements

We have also spent time making improvements to all other areas most notably inside App Configuration:

<p class='img'>
<img src='/images/blog/2020-11-06-android-300-release/settings.png' alt='Screenshot of settings'></a>
Screenshot of settings.
</p>

- App language can now be overridden to match a user's profile, this will impact the name of entities that get added as well as the App Configuration appearance. By default your device will use your phones language however, we noticed some users actually prefer Home Assistant to always be in a different language on their device. With this feature you can now set the language to be one of any that are supported by the app. You can also help us translate the app on [Lokalise](https://lokalise.com/public/145814835dd655bc5ab0d0.36753359/).
- History of recently received notifications, along with all data that was sent
- Notification rate limit information to help you understand if you are about to go over the daily limit.
- Editable widgets, with the ability to delete missing widgets as mentioned in the [backward-incompatible changes](#backward-incompatible-changes). This is really helpful if you ever created a widget and realized you needed to make one more adjustment.
- Widgets now update when the screen turns on to provide faster updates
- A new widget to control any [media player](https://companion.home-assistant.io/docs/integrations/android-widgets#media-player)

<p class='img'>
<img src='/images/blog/2020-11-06-android-300-release/media_player_widget.png' alt='Screenshot of media player widget'></a>
Screenshot of media player widget.
</p>

- Enable/Disable all sensors
- [Events](https://companion.home-assistant.io/docs/integrations/app-events) for entering or exiting a zone along with all location data
- Link to the current release changelog on GitHub
- File upload support for add-ons or person image upload
- The ability to opt out of sending crash reports to help the team investigate crashes. If you decide to opt out please make sure to report issues on GitHub otherwise we may not know the issue exists.
- Lots of location fixes for more accurate reporting
- Lots of bug fixes and other miscellaneous enhancements


Big thank you to everyone involved. Hope you take the time to digest all the new features. Looking forward to all the new use cases and feature requests everyone has been having.

The full changelog can be found on [GitHub](https://github.com/home-assistant/android/releases/tag/3.0.0).
