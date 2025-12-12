---
title: "Android Companion 2022.2: Local Push Notifications!"
description: "Local Push Notifications, In-App Changelog and more!"
date: 2022-02-11 00:00:00
date_formatted: "February 11, 2022"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2022-02-android/Companion.png
---


![Screenshot of Companion](/images/blog/2022-02-android/Companion.png)

Hey Everyone! It's time for the next Android release and we are really excited to get this one out. Lots of changes for all versions of the app, including Wear OS and Quest devices.

## Backward-incompatible changes

We have a pretty big release this month with a lot of changes going on. Some of these changes are noticeable as soon as you update the app, so let's cover those first.

### Local Push Notifications

The first major change that we want to cover is for [Local Push Notifications]. Before this release, all notifications were routed via Google. Now notifications can be delivered directly from your Home Assistant server if you have remote access set up. These notifications do not count towards the rate limit and are shown on the device immediately, every time.

<!--more-->

So what's the breaking change? The app needs to establish and maintain a constant connection to your Home Assistant server with WebSockets. In order to do this, we have to create a persistent notification and this can be upsetting to some users.

A persistent notification lets Android know the app has important ongoing tasks where we do not want the background process stopped. The purpose of this notification is identical to our Sensor Worker, which allows the app to continue sending sensor updates while in the background. Just like Sensor Worker, our WebSockets notification also has its own notification channel to allow you to customize the appearance. You are free to minimize (or silence) this notification to hide the icon from appearing in your status bar.

You may also decide to turn off the channel. While there is nothing preventing you from turning it off, if you run into connection issues you will be asked to turn the channel back on.

![Screenshot of websocket settings](/images/blog/2022-02-android/websocket_setting.png)

The persistent notification will contain an actionable button taking you directly to the settings page. From here you can adjust the persistent connection behavior and modify the notification channel. The persistent notification will only be present when an active connection to your server is being maintained.

If you are on the [minimal version] of the app will have the default persistent connection set to "Always" as this is the only way the app can receive notifications from your server. If not, you will have the default setting "Never", where the app will continue to receive notifications from Firebase. If you are on the minimal version you will need to be on Home Assistant Core 2022.2 or later in order to use this feature.

We have seen varying reports from users who either do not notice much of a change in terms of battery usage while others have noticed a big difference. Please feel free to adjust the settings based on your usage and desire for the feature. Some of us developers have opted to keep the option set to "Always" and do not notice much of a change in battery usage. Personally, I keep mine on "Always" and I have not had to change my daily charging habits to enjoy this feature, your experience may be different.

A big thank you to [JBassett] for kicking off this feature and working hard to solve all the reported beta issues! Thank you to [jpelgrom], [SkechyWolf] and [dshokouhi] for helping out in finalizing the user experience.

### Sensor Changes

The remaining backward-incompatible changes in this release are related to 2 sensors offered by all versions of the app.

-  [Do Not Disturb Sensor] - No longer available on devices running Android 5 or lower. This sensor, which was previously offered to all supported Android versions, has been updated to use the official Android API instead of the undocumented one. The Android API is only available on devices running Android 6+. Older devices will no longer see this sensor in the Manage Sensors screen.
-  [Last Used App Sensor] - This sensor previously reported its state as the application label. We realized that this is not always unique, multiple apps can have the exact same name. The state has changed to report the package id which is guaranteed to be unique. The application name is now available as an attribute.

## In-App Changelog

This next feature of the release is also going to be immediately noticeable upon updating as all users will be presented with a changelog once they open the app after an update. This changelog will only be shown after the app has received an update. Some users may only see this once a month while others may see it weekly based on the beta release schedule. The changelog is also accessible under Companion App.

![Screenshot of changelog](/images/blog/2022-02-android/changelog.png)

The changelog prompt will be maintained by contributors of the app as we do not think it will be user friendly to show GitHub commit messages. This allows us to highlight the above backward-incompatible changes to all users so they no longer have surprises going forward. Thank you to [dshokouhi] for adding this feature.

## Wear OS Updates

The Wear OS app continues to grow with more features each release and this month we have some welcomed additions!

-  Breaking Change: The Wear OS app has a breaking change this release to hide non-primary entities from the home screen. The entities will still be accessible if you add them as a [favorite] and also under the "All entities" screen. This change was done to match the behavior of the autogenerated dashboard of the Home Assistant frontend, thank you [jpelgrom].
-  A new tile was added by [leroyboerefijn] that allows you to render any template in the tile. You will need to use the phone app to setup the template tile as the Wear OS keyboard is missing some important keys that are required for templates. You can also set the refresh interval for the tile in settings as well.

![Screenshot of template tile](/images/blog/2022-02-android/template_tile.png)

-  Multi-Factor Authentication is now supported when logging into the watch, thank you [jpelgrom]
-  Areas were added to allow you to view entities by the selected area, thank you [jpelgrom]
-  The shortcuts tile got an enhancement to show the entity friendly name around the icon. If you do not change your entity icons to custom ones you will want to enable this feature. Look in the settings screen to enable this feature, thank you [leroyboerefijn].
-  A new "Sign in on phone" button was added to the Wear OS login screen so you no longer have to enter those long passwords on a small screen. Thank you [jpelgrom]

![Screenshot of sign in on phone](/images/blog/2022-02-android/sign_in_on_phone.png)

-  `button`, `cover`, `fan` and `input_button` domains have been added to the Wear OS app by [jpelgrom]

## Other Changes

-  A new [In Use sensor] for Quest devices was added by [SkechyWolf]. This new sensor turns on only when the headset is worn by the user. It is a bit more precise than using the interactive sensor, which was previously mentioned for this use case.
-  [Device controls] were updated to add support for `button` and `input_button` domains. The `climate` domain was enhanced for supported HVAC modes and proper temperature increments. The More Info pop-up, when a tile is long pressed, is now more reliable. Thanks for these improvements [jpelgrom].
-  [dshokouhi] and [jpelgrom] worked together to remove additional Google Service dependencies from the minimal version
-  A new settings page was added by [dshokouhi] to allow users to easily find Notification Channel settings for the app
-  The Manage Widgets page was updated by [dshokouhi] and [jpelgrom] to have a new design based on Jetpack Compose. It is also now possible to add widgets from the settings page to your home screen, if the device supports it.

![Screenshot of adding widgets](/images/blog/2022-02-android/add_widget.png)

-  A notification command to [update sensors] was added by [dshokouhi]
-  The Manage Shortcuts and Manage Tiles pages had design updates based on Jetpack Compose by [dshokouhi]
-  Notification commands for `command_activity` and `command_broadcast_intent` were updated for more types of intent extras by [moritzgloeckl]
-  The [WiFi state sensor] now receives instant updates on devices that did not have instant updates before, thank you [dshokouhi]
-  [JBassett] has now made it possible to update the Google Play Store listing directly from GitHub
-  Downloading is now supported in the Home Assistant Frontend, thank you [jpelgrom]
-  `button` and `input_button` domain support was added to [quick settings] by [jpelgrom]

Special thank you to all other contributors who have helped in bug fixing and other various under the hood improvements to the code base. Thank you [NotWoods], [joostlek] and [chriss158]. As always please remember to add your feature requests and bugs to GitHub.

## Changelog

- 2022.2.0 - https://github.com/home-assistant/android/releases/tag/2022.2.0
- 2022.2.1 - https://github.com/home-assistant/android/releases/tag/2022.2.1


[dshokouhi]: https://github.com/dshokouhi
[JBassett]: https://github.com/JBassett
[SkechyWolf]: https://github.com/SkechyWolf
[jpelgrom]: https://github.com/jpelgrom
[NotWoods]: https://github.com/NotWoods
[joostlek]: https://github.com/joostlek
[chriss158]: https://github.com/chriss158
[leroyboerefijn]: https://github.com/leroyboerefijn
[moritzgloeckl]: https://github.com/moritzgloeckl
[announced]: https://blogs.windows.com/windows-insider/2021/10/20/introducing-android-apps-on-windows-11-to-windows-insiders/
[Last Used App]: https://companion.home-assistant.io/docs/core/sensors#last-used-app-sensor
[minimal version]: https://companion.home-assistant.io/docs/core/android-flavors
[Firebase]: https://companion.home-assistant.io/docs/notifications/notification-details
[Local Push Notifications]: https://companion.home-assistant.io/docs/notifications/notification-local
[Last Used App Sensor]: https://companion.home-assistant.io/docs/core/sensors#last-used-app-sensor
[Do Not Disturb Sensor]: https://companion.home-assistant.io/docs/core/sensors#do-not-disturb-sensor
[In Use sensor]: https://companion.home-assistant.io/docs/oculus-quest/#sensor-list
[Device controls]: https://companion.home-assistant.io/docs/integrations/android-power-menu
[quick settings]: https://companion.home-assistant.io/docs/integrations/android-quick-settings
[WiFi state sensor]: https://companion.home-assistant.io/docs/core/sensors#connection-type-sensor
[update sensors]: https://companion.home-assistant.io/docs/notifications/notification-commands#update-sensors
[favorite]: https://companion.home-assistant.io/docs/wear-os/#favorites
