---
title: "Android 2021.12: Wear OS Beta!"
description: "Wear OS Beta, Instant Update Widgets and more!"
date: 2021-12-20 00:00:00
date_formatted: "December 20, 2021"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2021-12-21-android-december-2021/Companion.png
---


![Screenshot of the Android app](/images/blog/2021-12-21-android-december-2021/Companion.png)

Hey Everyone! It's time for the December 2021 Android release. It has been a while since the last Android release as the team has been very busy working on many new and exciting features. To kick things off we would like to announce that there is now a Wear OS app that you can find in the Play Store alongside todays phone app release!

<a href="https://play.google.com/store/apps/details?id=io.homeassistant.companion.android&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" style="display:inline-block"><img width="200" class="download-badge" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" style='box-shadow:none;border:0'></a>

## Wear OS Beta

For the past couple of months the Android repo has been seeing a lot new contributors coming and bringing in some amazing work. There is now a Wear OS Beta app released in the Play Store! A big thank you to [leroyboerefijn], [dshokouhi], [JBassett], [Kisty], [apo-mak],
[SkechyWolf] and [HunterX86] for all your hard work! A lot of work has been done to share the codebase between the phone and the watch because we wanted the watch to also have a standalone experience in case you are not near your phone. The app will remain as a Beta for several months but we feel in its current state it is ready for you to enjoy. The reason we have decided to keep it with a beta label for now is because there is more work to be done and some of the underlying libraries being used have not received a stable release yet.

![Screenshot of Wear OS on wrist](/images/blog/2021-12-21-android-december-2021/wear.jpg)

As of today you can login to the app using either the watch or you can open up the phone app and head over to App Configuration and login using the new Wear OS settings section! Once you are logged in you will see a brief loading screen while we get your entities ready. To avoid some of the loading delays we have a Favorites feature that will allow you to add your most used entities to appear at the top of the app for quick and easy access. You can add/remove these entities using the Settings screen in the watch app or you can add/remove and change the order using the phone app. We highly recommend setting up your favorite entities as they will be available during the loading process.

<p class='img'>
<img src='/images/blog/2021-12-21-android-december-2021/wear_home.png' alt='Screenshot of Wear OS Home Screen'>
Screenshot of Wear OS Home Screen
</p>

The Wear OS app also offers a tile for even faster access to execute or toggle your devices without needing to open the app. You can select up to 7 entities to toggle or execute inside the settings portion of the app. We recommend using custom MDI icons to easily distinguish between your entities as the default will make it hard to tell apart when you have 2 lights side by side.

<p class='img'>
<img src='/images/blog/2021-12-21-android-december-2021/wear_tile.png' alt='Screenshot of Wear OS Tile'>
Screenshot of Wear OS Tile
</p>

Initial support for sensors has also been added! Upon logging in the default battery sensors will be registered in your Home Assistant server. The app will wait for a network connection to provide an update so you won't have to worry about it constantly maintaining a connection. Soon we will be looking into adding a UI to enable/disable sensors as well as evaluating all current phone sensors and adding whichever ones we can!

One thing to keep in mind is that its important to ensure both the phone and watch are on the same version in order for some of the features to work as expected. Feel free to [join the beta] and help development by finding bugs and submitting feature requests! Be on the look out for future updates to the Wear OS app!

<p class='img'>
<img src='/images/blog/2021-12-21-android-december-2021/phone_wear.png' alt='Screenshot of Wear OS Settings in Phone app'>
Screenshot of Wear OS Settings in Phone app
</p>

## Websockets and Instant Widget Updates

A very big internal feature was also added to both apps this release and that is the introduction of websockets! Websockets is one of the many APIs that Home Assistant offers. With this new API the app can now do cool things like register for entity updates to have instant widgets! Previous versions of the app relied on the Home Assistant REST API to do things like get an entity state or execute a service call. Now with websockets the app will no longer need to poll the server requesting for entity updates as needed, instead we now get a constant stream of entity updates. This allows us to keep your widgets up to date with the latest state or template and also allows us to keep the Android Power Menu up to date. The Wear OS app also benefits by having instant updates on the home screen.

<p class='img'>
<img src='/images/blog/2021-12-21-android-december-2021/instant_updates.gif' alt='GIF of instant updates'>
GIF of instant updates
</p>

There is still a lot more to be done with respect to websockets but the good news is that foundation is there for more developers to come and consume the API. We have already seen some interest and PRs so I would expect this feature to improve even further over time! Big thank you to [JBassett] for getting this done!


## Theme and UI Updates

In this release we had a lot of changes being done to the overall theme of the app to better fit with the design of the Home Assistant frontend theme. The status and navigation bar will now match your theme of choice. The overall loading experience has also had some improvements to align more closely to the browser loading experience. Thank you to [LasseRosenow] for all your hard work here!

With the release of [Jetpack Compose] we have decided to start migrating all UI elements to Compose. If you are familiar with Android Development then you will remember that the UI is always built with XML and then referenced in your activities/fragments. Now with Compose, XML is no longer needed and bulding robust UI's becomes a breeze. We find these new libraries to be very easy to use and it has allowed us to improve upon our internal architecture to make things easier for new and upcoming features.

In the phone app the entire onboarding experience has been rewritten in Compose, including a brand new welcome screen to help first time users understand what Home Assistant is all about. The notification detail page found in notification history has also received a compose update. The Wear OS home screen is actually built using compose including the new settings screens found in the phone app.

<p class='img'>
<img src='/images/blog/2021-12-21-android-december-2021/welcome.png' alt='Screenshot of welcome screen'>
Screenshot of welcome screen
</p>

## Other Changes

With so many changes since the last update its impossible to list all of the other cool new features but here is a list of some welcomed improvements:

-  New sensor to report the state of [High Accuracy Mode] by [dshokouhi]
-  New notification parameters to change the [Status Bar Icon] and also to [alert once] for any given notification by [dshokouhi]
-  New [WebView] settings to keep the screen on and to auto play videos by [dshokouhi] and [skynetua]
-  New [notification command] to keep the screen on by [skynetua]
-  Updated notification commands to accept URL encoding in extras by [mvn23]
-  [BLE Transmitter] improvements to power output and adverister mode by [Alfiegerner] and [amadeo-alex]
-  Quick Settings Tile limit increased from 5 to 12 by [dshokouhi]
-  Support for Android 12 by [dshokouhi]
-  Updated design for Media Player Widget by [jannis3005]

<p class='img'>
<img src='/images/blog/2021-12-21-android-december-2021/media_player.png' alt='Screenshot of Media Player Widget'>
Screenshot of Media Player Widget
</p>

-  Support for cookie based authentication by [duncf]
-  Setting to always try the internal URL first. This is helpful to those who like to leave location off by [dshokouhi]
-  Support for entity category and state class in sensors by [dshokouhi]


Big thank you to everyone involved. Please keep those bug reports and feature requests coming! Be sure to watch the State of the Open Home address for what to expect in 2022 and a live demo of some of the features above!

<lite-youtube videoid="6ZMXE5PXPqU" videotitle="State of the Open Home 2021" videoStartAt="9291" posterquality="maxresdefault"></lite-youtube>

## Changelog

- 2021.5.1 - https://github.com/home-assistant/android/releases/tag/2021.5.1
- 2021.6.2 - https://github.com/home-assistant/android/releases/tag/2021.6.2
- 2021.9.0 - https://github.com/home-assistant/android/releases/tag/2021.9.0
- 2021.10.0 - https://github.com/home-assistant/android/releases/tag/2021.10.0
- 2021.12.0 - https://github.com/home-assistant/android/releases/tag/2021.12.0
- 2021.12.1 - https://github.com/home-assistant/android/releases/tag/2021.12.1

[leroyboerefijn]: https://github.com/leroyboerefijn
[dshokouhi]: https://github.com/dshokouhi
[JBassett]: https://github.com/JBassett
[Kisty]: https://github.com/Kisty
[apo-mak]: https://github.com/apo-mak
[SkechyWolf]: https://github.com/SkechyWolf
[HunterX86]: https://github.com/HunterX86
[LasseRosenow]: https://github.com/LasseRosenow
[jannis3005]: https://github.com/jannis3005
[mvn23]: https://github.com/mvn23
[Alfiegerner]: https://github.com/Alfiegerner
[amadeo-alex]: https://github.com/amadeo-alex
[duncf]: https://github.com/duncf
[skynetua]: https://github.com/skynetua
[High Accuracy Mode]: https://companion.home-assistant.io/docs/core/sensors#high-accuracy-mode
[Status Bar Icon]: https://companion.home-assistant.io/docs/notifications/notifications-basic#notification-status-bar-icon
[alert once]: https://companion.home-assistant.io/docs/notifications/notifications-basic#alert-once
[WebView]: https://companion.home-assistant.io/docs/integrations/android-webview
[notification command]: https://companion.home-assistant.io/docs/notifications/notification-commands
[BLE Transmitter]: https://companion.home-assistant.io/docs/core/sensors#bluetooth-sensors
[Jetpack Compose]: https://android-developers.googleblog.com/2021/07/jetpack-compose-announcement.html
[join the beta]: https://play.google.com/apps/testing/io.homeassistant.companion.android
