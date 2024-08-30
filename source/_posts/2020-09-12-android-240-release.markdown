---
title: "Home Assistant Companion Android App Release 2.4.0"
description: "What's new with the Home Assistant Companion Android App in 2.4.0"
date: 2020-09-12 00:00:00
date_formatted: "September 12, 2020"
comments: true
author: Daniel Shokouhi
categories:
- Release-Notes
- Core
og_image: /images/blog/2020-09-12-android-240-release/Companion.png
---

Hey there, I hope everyone has been enjoying the last release of the Android app. We have another update coming up where we felt it's time to give everyone a heads up before release. There are several new changes done that you will immediately notice after installing the update to 2.4.0, so we wanted to cover what's new. You can expect this release to be available in the Google Play Store tomorrow.

## Current and Future Backward-incompatible changes

Sometimes when we move really fast, we may move a bit too fast. While we had fun adding all the new sensors, we didn't stop to think about the new user experience and how we are making a burden on them by having non-static attributes for some of the sensors. In reality, these attributes are a state and we need to treat them as such. If we don't, there will be a need to use templates that are not user-friendly. We wanted to fix this issue and be courteous to our current users, so we have made a few changes. Some of which take place in this release and some in the following release after 2.4.0.

The first major change in this release is that the app will no longer send needless updates to your Home Assistant instance when there is nothing new to report state-wise. This helps cut down on the amount of data that gets sent out. Some attributes attached to some sensors update outside of the state, to combat this change, we have split those attributes to become their own sensor. For example, the audio sensor had an attribute to tell if headphones were currently plugged into the device. This, by itself, is a state change and thus now a binary sensor.

We have opted to keep the existing attributes where they are for this release, this way they do not break existing templates. However, they may trigger slower until you move to the new sensor. All of the new sensors are also disabled by default (with the exception of battery), so you may want to enable the ones you care for. The following sensors have had their attributes split up:

- Audio Sensor - All attributes. The sensor name for new users is changed to `Ringer Mode` to better align with what the state represents.
- Battery State Sensor - All attributes.
- Bluetooth Connection - Only `is_bt_on` now has its own binary sensor. The other attributes update with the state.
- Storage Sensor - External storage attributes. The new sensor will behave the same as the current storage sensor, which is now labeled as Internal Storage.
- WiFi Connection - All attributes with the exception of `is_hidden`.

These attributes mentioned above will be removed in the next release. Please make your switch to the new sensors now to avoid the breaking change then.

Attributes have also had a slight breaking change as we are now sending the correct data type for the attribute. Previously they were all sent as a string, which meant binary values needed to be wrapped in quotes.

The Geocoded location sensor also had its attribute of `Location` split into the attributes they reflect as `latitude` and `longitude`.

## Foreground Service Worker

We have seen issues where some of the sensors do not update reliably; There were times when the sensor worker could not run. We have gone ahead and converted this to become a foreground service, which means from time to time, you will see a low priority notification when the sensors are updating. This low priority notification does not make a sound and just appears briefly in the status bar. We felt this to be a good compromise instead of having to use a persistent notification.

If you are on Android Oreo or later you can minimize or turn off the channel completely. Please keep in mind that doing that, may affect the update reliability. Google's recommendation was to make it low priority and if you have seen recent updates to the Google Phone and Calendar apps you have already seen this described behavior.

<p class='img'>
<img src='/images/blog/2020-09-12-android-240-release/foreground_service.png' alt='Screenshot of Foreground Service'></a>
Screenshot of the Foreground Service.
</p>

## New Sensors

We have new sensors added this time around. All of the below sensors are disabled by default:

- Doze mode - Android 6.0+ only, a binary sensor to represent the state of doze mode.

<p class='img'>
<img src='/images/blog/2020-09-12-android-240-release/doze_state.png' alt='Screenshot of Doze Mode'></a>
Screenshot of Doze Mode.
</p>

- Interactive - A binary sensor that represents whether or not the device is being interacted with.
- Power Save mode - A binary sensor that turns on when the device reports it's in power-saving mode. Most manufacturers allow this to be user-configurable on the device.
- Public IP - A sensor that shows the public IP address of the device.

## Other Changes

We have also spent time making improvements in other areas of the application:

- Several more location improvements have been made.
- Sensors are hidden on devices that do not have them.
- General improvements to the app architecture to help developers understand the flow.
- More localization improvements.
- General improvements to the settings screen.

Special thanks to [JBassett](https://github.com/JBassett), [chriss158](https://github.com/chriss158), [anyuta1166](https://github.com/anyuta1166) and [skynetua](https://github.com/skynetua) for all of your contributions. So keep them bug reports and feature requests [coming](https://github.com/home-assistant/android/issues/new/choose), we'll chat again next time!