---
title: "Home Assistant Companion Android App: New Features"
description: "What's new with the Home Assistant Companion Android App in 2.3.0"
date: 2020-08-28 00:00:00
date_formatted: "August 28, 2020"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2020-08-28-android-230-release/Companion.png
---

Hey there, it's been so long since we last gave an update on our mobile apps we thought it would be time to give you more updates! This time around we will focus on whats new in the Android app. There have been a few releases so were going to cover everything new up until version 2.3.0 which was just released to the Google Play Store.

## Manage Sensors

Starting from version 2.2.0 there is a new Manage Sensors screen that you can find under App Configuration. Users can now disable sensors they don't want while continuing to receive updates from the sensors they do care about. This includes turning off the Geocoded sensor while keeping location tracking on. Speaking of which the 2 location toggles that used to be found in App Configuration are now located in this new screen. You can expect to see the live data that was recently sent over to your Home Assistant instance as well as the attributes and other sensor details.

<p class='img'>
<img src='/images/blog/2020-08-28-android-230-release/manage_sensors.png' alt='Screenshot of Manage Sensors'></a>
Screenshot of the Manage Sensors.
</p>

<p class='img'>
<img src='/images/blog/2020-08-28-android-230-release/sensor_management.png' alt='Screenshot of Sensor Management'></a>
Screenshot of Sensor Management.
</p>

## New Sensors

We have had quite a bit of sensors get added since we last spoke so here's whats new. Some of these sensors will update their state in your Home Assistant instance upon certain state changes. All of the sensors listed below will also update during the normal 15 minute update interval. To get more details about what to expect from each sensor check out the [docs](https://companion.home-assistant.io/docs/core/sensors).

Available for Google Play Store version only:

- Activity

Available for all users:

- Audio
- Bluetooth
- Do Not Disturb
- Last Reboot
- Light
- Phone
- Pressure
- Proximity
- Next Alarm
- Sim 1 & 2
- Steps
- Storage

## Sensor Enhancements

In addition to all the new sensors mentioned above we also had some improvements to our existing set of sensors. The battery state sensor now includes the battery health as a attribute and will also issue a second update call a few seconds after being plugged in so the state can update faster. The WiFi connection sensor was also updated so the state and certain attributes will update upon any network detected change. This state change also means that if you have multiple access points you will be able to see the device switching in real time.

## NFC

The app now supports reading and writing to NFC tags so you can build automations off scanning the tag. Home Assistant Core 0.114+ is required for this feature. Keep in mind that certain phones will require you to have your phone unlocked before it can read the tag. More details about how it works in the [docs](https://companion.home-assistant.io/docs/integrations/universal-links).

<p class='img'>
<img src='/images/blog/2020-08-28-android-230-release/nfc.png' alt='Screenshot of NFC'></a>
Screenshot of NFC.
</p>

## Template Widget

A new widget was added to give the user full control over creating a template widget with just about any data they want! Users will see the template rendering in real time as they build it. I personally recommend to start building your templates on a desktop as it can feel a bit cumbersome on a phone or tablet. This widget will update every 15 minutes or when it is tapped.

<p class='img'>
<img src='/images/blog/2020-08-28-android-230-release/template_widget.png' alt='Screenshot of the Template Widget'></a>
Screenshot of the Template Widget.
</p>


## Theming

You can now set the theme of the app independently from the device theme. This is useful for users who like a dark theme on their device but use a light theme for Home Assistant. In addition to this change we also had a few more fixes around themes.

<p class='img'>
<img src='/images/blog/2020-08-28-android-230-release/app_theme.png' alt='Screenshot of App Theme selection'></a>
Screenshot of App Theme selection.
</p>

## Additional Improvements

- Support for H265 videos was added
- Entity state widget was enhanced to allow for multiple attributes and a custom separator
- Widgets were enhanced overall to allow material icons
- Notifications can now use `:smiley:` like you can in Discord
- Lots of fixes across the board

Special thanks to [chriss158](https://github.com/chriss158), [colincachia](https://github.com/colincachia), [David-Development](https://github.com/David-Development), [JBassett](https://github.com/JBassett), [klejejs](https://github.com/klejejs), [noam148](https://github.com/noam148), [skynetua](https://github.com/skynetua) and [uvjustin](https://github.com/uvjustin) for all of your contributions. So keep them bug reports and feature requests [coming](https://github.com/home-assistant/android/issues/new/choose), we'll chat again soon!