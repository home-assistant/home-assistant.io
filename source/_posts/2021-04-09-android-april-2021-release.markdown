---
title: "Home Assistant Companion Android App April 2021 Release"
description: "Search/Filter, In-App Log Viewer & Shortcuts in the April 2021 Android Release"
date: 2021-04-08 00:00:00
date_formatted: "April 8, 2021"
comments: true
author: Daniel Shokouhi
categories: Release-Notes
og_image: /images/blog/2021-04-09-android-april-2021/Companion.png
---

Hey Everyone! It's time for the April 2021 Android release. Last month we wrote that we would be aligning our releases closer to Home Assistant core so here we are! Another month went by and the Android app has started to see more contributors coming along. Hopefully, you will join us next month as we can always use more contributors to move forward faster.

## In-App Log Viewer

This release has a new feature that will make viewing and sharing the logs MUCH easier. Some of you may recall the large number of steps needed to get Android logs when you open issues. This usually involved installing [Android Studio](https://developer.android.com/studio) or another app and having to plug your device into a computer to grant some special ADB permissions. This was very difficult to get set up for the average user and just wasn't user-friendly.

We've added a new option to the App Configuration called "Show and Share Logs". It will show all the logs from our app, including debug logs to help troubleshoot issues such as when the location does not update or if the app is using the correct URL. You are not only able to view this log but also share and select from it so you can copy the logs to a [GitHub issue](https://github.com/home-assistant/android/issues/new?assignees=&labels=bug&template=Bug_report.md&title=) for our team to look into.

<p class='img'>
<img src='/images/blog/2021-04-09-android-april-2021/log_viewer.png' alt='Screenshot of in-app log viewer'></a>
Screenshot of In-App Log Viewer
</p>

## Settings Improvements

We have had several improvements made to the overall design of the App Configuration pages to make better use of the space and add some neat features. First and foremost, every setting screen now has a new help icon taking you to the proper place in the [documentation](https://companion.home-assistant.io/) like location settings or even notifications. Just look for the new help icon at the top right-hand corner, if the page does not offer enough information.

As of this release the app now has a total of 71 sensors, given your device supports them all your number may be less. That is a lot of sensors and we don't expect a lot of users to actually use them all. We have added 2 new features to make this page easier to navigate. You can now filter by showing only the enabled sensors to get rid of the sensors you don't want to use, if you have all sensors enabled don't expect to see this filter. You can also perform a search against the list of sensors to find one quickly and manage it.

Notification History now lets you search by the `message` that was sent to the device. Searching will bypass the filter options we have, which limits the view to the last 100 notifications. Filtering and delete options have been moved to the top right-hand corner to make better use of the space.

<p class='img'>
<img src='/images/blog/2021-04-09-android-april-2021/action_bar.png' alt='Screenshot of Sensor Search and Filter'></a>
Screenshot of Sensor Search & Filter.
</p>

## Shortcuts

Sometimes when you open the app you may already know exactly where you want to go. You may find yourself on the same view often to see your cameras or give the nursery a quick look to make sure things are ok. You may even want to quickly see the history of an entity like when the door was last opened. In this release, we have introduced [Android Shortcuts](https://developer.android.com/guide/topics/ui/shortcuts) which will let you get to anywhere in the Home Assistant frontend quickly, directly from your home screen. Shortcuts will look like a separate app on the home screen allowing you to make them easily accessible and even place them into a folder for better organization. You can navigate to any Lovelace [view or dashboard](/dashboards/dashboards-and-views/) including other pages like the [Shopping List](/integrations/shopping_list/). You can also navigate to any entity directly to get more information like the history or see the graph.

There are a few different shortcut types and in the nature of Home Assistant, we have opted not to add static shortcuts because they are static! We support dynamic shortcuts which will show up under the app long-press menu. Once you create a shortcut, you will be able to drag it onto your home screen. There is also support for pinned shortcuts that can be added automatically to your home screen without needing to drag the icon, given your device and launcher support pinned shortcuts. Check out the [documentation](https://companion.home-assistant.io/docs/integrations/android-shortcuts) for more details including known limitations.

<p class='img'>
<img src='/images/blog/2021-04-09-android-april-2021/shortcuts.png' alt='Screenshot of Shortcuts'></a>
Screenshot of Shortcuts
</p>

## Other Changes

Here is a list of the other changes you may notice:

-  [Battery Temperature Sensor](https://companion.home-assistant.io/docs/core/sensors#battery-sensors)
-  Notification command to [turn on the screen](https://companion.home-assistant.io/docs/notifications/notification-commands#screen-on)
-  [BLE Transmitter](https://companion.home-assistant.io/docs/core/sensors#bluetooth-sensors) has a new setting to enable/disable the transmitter so the sensor can remain enabled. This new setting will correspond to the existing notification command.
-  High Accuracy mode has a new zone-based automation feature allowing you to trigger this mode faster. See the [documentation](https://companion.home-assistant.io/docs/core/location#high-accuracy-mode) for more details.

<p class='img'>
<img src='/images/blog/2021-04-09-android-april-2021/high_accuracy_zone.png' alt='Screenshot of High Accuracy Zoning'></a>
Screenshot of High Accuracy Zoning.
</p>

-  Long-pressing an entity in Android's Power Menu will now take you directly to the entity instead of the home page.
-  Covers that support setting the position are also supported in Android's Power Menu.
-  Lots of fixes and improvements in all other areas of the app.

Big thank you to everyone involved. Please keep those bug reports and feature requests coming!

## Changelog

- 2021.4.1 - https://github.com/home-assistant/android/releases/tag/2021.4.1
