---
title: "Home Assistant Companion Apps: New and Upcoming Features"
description: "What's new and what's in the works with the companion apps"
date: 2020-08-05 00:00:00
date_formatted: "August 5, 2020"
comments: true
author: Daniel Shokouhi & Tom Brien
author_twitter: tbrien88
categories: Release-Notes
og_image: /images/blog/2020-08-05-mobile-apps-new-features/Companion-new-upcoming.png
---

Hi, it's been a while since we let you know about all the great things you can do with the Home Assistant Companion Apps for Android and iOS, so let's rectify that now as there are so many exciting updates. Before we get started on that though, iOS users should take a moment to read [this blog post](/blog/2020/07/28/ios-app-migration) which has some important information about a small change coming up.

## A note on privacy

Currently we use Google's Firebase notification service for sending notifications to your device and also for tracking crashes. We did this because of simplicity, due to how notifications work on iOS we can't use just any server to send notifications, in fact there is a pretty narrow choice. Using Firebase allowed us to keep costs low, which Nabu Casa then covered so people are able to use it at no cost. However, many people were uncomfortable about this and would prefer an app that did not rely on Google's servers. Well we hear you and we are actively looking at moving to other providers. While we have not completed this work yet, we just wanted to let you know it is something that is being actively developed and hopefully we will have more news very soon.

## Android minimal app

On a related note, we are delighted to say we now offer a way to install a minimal version of the Android app that is completely free of any reliance on Google. This version of the app does not have location tracking or notifications. We hope that by providing this version of the app more developers will be excited about contributing to the app in general. You can find the APK on the [release](https://github.com/home-assistant/android/releases) page up on GitHub starting from version 2.1.0.

## What's New(ish)

The short answer is lots! The Android and iOS apps are developed by separate teams so while the features are similar, they are not identical and do not follow a common road map. Android changes are up next, [click here to jump to the iOS update](#ios)

### Android

#### Notification Improvements

Throughout the past few releases Android notifications were greatly improved with new features and fixes.

Starting in 1.8.0 we enhanced our image notifications to allow for not only a relative path (i.e. storing in your [`www`](/integrations/http#hosting-files) folder) but you can also request a snapshot using the [Camera Proxy API](https://developers.home-assistant.io/docs/api/rest/#get-apicamera_proxycameraentity_id). All authentication is handled via the app so you don't need to worry about it. You can also use [click action](https://companion.home-assistant.io/docs/notifications/notifications-basic/#notification-click-actio) and [actionable notifications](https://companion.home-assistant.io/docs/notifications/actionable-notifications#building-automations-for-notification-actions) to navigate to a specific lovelace view.

From 1.9.0 you can now create and remove [notification channels](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-channels) on the fly. This is helpful so you can create channels that can override your do not disturb settings, specifically for notifications like the alarm while notifications for your laundry can continue to let you be undisturbed.

In 1.10.0 we further enhanced our notifications to allow for many new options. Users can now change the [LED Color](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-led-color), [vibration pattern](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-vibration-pattern) and [importance](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-channel-importance) of a message. These options can also be used with a channel to help set defaults to allow you to further distinguish between notifications. You can now [group](https://companion.home-assistant.io/docs/notifications/notifications-basic#thread-id-grouping-notifications) your notifications to help declutter the notification pull down. [Persistent notifications](https://companion.home-assistant.io/docs/notifications/notifications-basic#persistent-notification) were also introduced so you can't simply swipe away those important notifications, you can pair this with the [`sticky`](https://companion.home-assistant.io/docs/notifications/notifications-basic#sticky-notification) property so the notification does not disappear. The `message` now allows for [HTML formatting](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-message-html-formatting) so you can highlight the important parts. Users can also supply an [icon](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-icon) much like they can with an image.  For the unimportant notifications you can set a [timeout](https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-timeout) so after x amount of seconds the notification is automatically dismissed.

```yaml
automation:
  - alias: "Alarm triggered"
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


#### Sensors

Starting with 1.8.0 we have introduced a new [Geocoded sensor](https://companion.home-assistant.io/docs/core/sensors#geocoded-location-sensor) that helps translate your GPS location to an actual street address.

<p class='img'>
<img src='/images/blog/2020-08-05-mobile-apps-new-features/geocoded_sensor.png' alt='Screenshot of the Geocoded Sensor'></a>
Screenshot of the Geocoded Sensor.
</p>

The battery level sensor was split in 1.9.0 to include a [battery state sensor](https://companion.home-assistant.io/docs/core/sensors#battery-sensors) so you can see when your device is actively `charging`, `not_charging`, `discharging` and `full`. You can also distinguish whether it's `wireless`, `ac` or `usb`. The state now updates immediately upon being plugged in and unplugged to allow for quicker automations.


#### Biometrics

Biometrics were introduced in 1.9.0 to allow the user to lock down the app when they are not using it. Upon launching the app you will see a lockscreen like below requesting for either your fingerprint or face to unlock the app. You can set this feature up by visiting the App Configuration screen inside the app.

<p class='img'>
<img src='/images/blog/2020-08-05-mobile-apps-new-features/biometric_unlock.png' alt='Screenshot of Biometric Unlock'></a>
Screenshot of Biometric Unlock.
</p>


#### Additional Improvements

We have also been hard at working making improvements in other areas of the app:

- There are now 2 [widgets](https://companion.home-assistant.io/docs/integrations/android-widgets) that you can set up, with Entity State being the latest addition. The Entity State widget will display the state and any attribute of the selected entity. It will update once every 30 minutes or when tapped. The Service Call widget was also enhanced to allow you to select from a list of valid and available services along with the ability to add additional data fields that the service may require.
- In App Configuration the Home Network WiFi SSID option now allows the user to select multiple SSIDs.
- A Cookie Manager was added to our WebView that will allow you to save cookies from sites that you may use in the [webpage card](/dashboards/iframe/).
- More descriptive SSL error messages were added to help users resolve local issues they may encounter while setting up the app.
- Device ID is now sent with the event data for actionable notifications.

### iOS

Firstly, we should say a hello to Zac ([@zacwest](https://github.com/zacwest)) who has joined the iOS team and contributed a huge amount of code in the last couple of months. In fact, Zac has rewritten much of the underlying code of the app in that time, so while it may look much the same, behind the scenes it's almost a new app! Some features that are now in the iOS app are:

#### Stability

Making the app reliable and eliminating bugs was a big focus. You won’t have to pull-to-refresh as often, sensors update more reliably, and editing things like actions and notifications won’t accidentally delete them.

Whether it is to turn on the lights when you get home at night, or send a someone a notification that you're leaving work and how long the journey should take, we know that this is what a lot of people use the app for the most and we also know the performance has not been 100 % and that changes in recent versions of iOS seem to have made this work. There have been a huge number of changes to work around these issues (unfortunately Apple's CoreLocation framework is something of a black box), we now sanity check the location data before sending it to Home Assistant, checking if the accuracy is acceptable or if an update from a minute ago has better accuracy. We also try and get a new update when accuracy is bad. While we still use significant location changes (such as changing cell tower) to wake the app up from the background, we now automatically discard the data they provide and attempt to get a higher accuracy GPS location.

#### Empowering Notifications

Notifications are some of the more powerful ways you can interact with the app, and they are now even more powerful. [Camera notifications](https://companion.home-assistant.io/docs/notifications/dynamic-content) will now stream via HTTP Live Streaming (HLS) instead of the older MJPEG standard when you have the `stream` integration enabled, giving you a more live experience; camera notifications also show up in the right aspect ratio; you can add per-action URLs that should be launched for each action of a notification; relative URLs (like `/lovelace-tacos/0`) will now open within the app without kicking you out to Safari.

<p class='img'>
<img src='/images/blog/2020-08-05-mobile-apps-new-features/ios-notification-examples.png' alt='Screenshot of new notification example triggers and service calls'></a>
Screenshot of example triggers and service calls for notifications.
</p>

#### More frequent sensor updates while using the app

A lot of people have asked for the sensors to be updated more frequently. The problem we have is while the app is in the background it is asleep as part of iOS's efforts to preserve battery. However, while you're using the app it should be able to send data frequently. You can now set a desired frequency of sensor updates while you have the app open. This can be as slow as every hour or as fast as every 20 seconds! Hopefully this will be a huge improvement for people using iPads as wall-mounted kiosks.

#### No more duplicate integrations

Previously when you removed and reinstalled the app you would get a new `..._2` integration in Home Assistant along with a new set of sensors like `sensor.freds_iphone_2`. This was a pain! Especially for our amazing beta testers who often went through the app's onboarding process several times in a day to check for bugs (THANK YOU!). Now the app registers its unique ID with Home Assistant, this means in most cases when you reinstall or reset up the app it should just pick and use the old integration and entities.

#### Usability

Another avenue of improvement is making things a bit easier. You’ll now find example triggers and service calls when configuring notification categories and actions within the app; theme color choices should always come through; you can adjust things like the zoom factor of the pages or how often sensors update if the app remains open; and more! You will definitely want to dig into the [releases](https://github.com/home-assistant/iOS/releases) or play around in the app’s settings.

#### A look ahead at iOS 14

Coming to iOS 14 is Widgets, and no doubt there’s some huge potential here. A good analogy for what they can do is to think of them as Apple Watch complications; relatively static displays that can be updated with a multitude of data. One thing we’d love is to get an idea of the information and displays you’re interested in seeing here as Widgets get built out over the next few months. Please let us know any ideas you have on [this thread](https://community.home-assistant.io/t/what-kind-of-ios-14-big-sur-widgets-would-you-like-to-see).

iOS 14 is also introducing [Local Push Connectivity](https://developer.apple.com/documentation/networkextension/local_push_connectivity), which adds support for push notifications on your local network that do not require a trip to the cloud. This, like Critical Alerts, requires explicit approval from Apple, but we’re hopeful about improving the experience with your boats and RVs!

## That's it, almost

Wow, thanks for reading all the way down here! Everything you've read about wouldn't be possible without a very dedicated team of volunteers. In addition to the highlights above, we’ve also fixed a good amount of bugs and made other improvements across the board. Thanks goes to [JBassett](https://github.com/JBassett), [KBerstene](https://github.com/KBerstene), [chriss158](https://github.com/chriss158), [timmmeeeh](https://github.com/timmmeeeh), [timmoo001](https://github.com/timmoo001), [craftykoala](https://github.com/craftykoala), [jeroenseegers](https://github.com/jeroenseegers), [yoxjames](https://github.com/yoxjames), and [neopilou](https://github.com/neopilou) on the Android side and [robbiet480](https://www.github.com/robbiet480) and [zacwest](https://www.github.com/zacwest) on iOS.

Two last things, firstly a reminder that you can find our complete docs for the apps on [their own site](https://companion.home-assistant.io). Secondly, as you're the kind of person that reads whole blog posts (well done again!) you might be the perfect beta tester for our apps, if you think you could help out, you can sign up for the Android app [here](https://play.google.com/apps/testing/io.homeassistant.companion.android) or the iOS app [here](https://companion.home-assistant.io/app/ios/beta).
