---
title: "One more thing…"
description: "Introducing Home Assistant Companion for macOS."
date: 2020-09-18 08:00:00
date_formatted: "September 18, 2020"
comments: true
author: Tom Brien
author_twitter: tbrien88
categories: Announcements
og_image: /images/blog/2020-09-18-mac-companion/social.png
---

Wow, what a birthday week it has been! We've had a [new supervisor release](/blog/2020/09/16/supervisor-joins-the-party), one of the largest and most user-driven core [releases](/blog/2020/09/17/release-115), thanks to the [month of What The Heck?!](/blog/2020/08/18/the-month-of-what-the-heck/). We even got [RFID tags](/blog/2020/09/15/home-assistant-tags) right into the heart of Home Assistant, but we're not done yet! We have "One more thing…"

## Introducing Home Assistant Companion for macOS

Home Assistant Companion is a new application for Mac to control your Home Assistant instance, exposing your Mac sensors to Home Assistant and to receive notifications.

Like many recent updates to the iOS app, we have [@zacwest](https://github.com/zacwest) to thank for this. Zac has ported the iOS app over to Mac and added some great new features specifically for the Mac.

_If you're a Windows user, don't worry, you can integrate your PC with the great [IOT Link](https://iotlink.gitlab.io/index.html) tool._

<p class='img'>
<img src='/images/blog/2020-09-18-mac-companion/render.png' alt='Rendered image of the Home Assistant Lovelace interface running windowed on a 16-inch Mac Book Pro'></a>
Home Assistant Companion running on a 16-inch Mac Book Pro
</p>

## Trigger automations with your Mac

Home Assistant Companion for macOS adds several new binary sensors for your Mac, showing whether it is active and whether a particular microphone or webcam is in use.

Each camera and microphone has its own `binary_sensor` showing whether it is active or not. These can enable some really useful automations, especially for those home working at the moment. You could automatically turn off the radio when answering a call or close the blinds behind you to improve your video quality. To see just how useful this can be in the real world, check out this video of how our very own Frenck is using these sensors in his streaming set up.

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/ssRVjqS40-0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

The "active" sensor reports whether the Mac is being actively used. In other words that it is not sleeping, not showing a screensaver, not locked and not just sat idle. You can configure the "Time Until Idle" in one-minute steps from a minimum of 1 minute. You'll find this option in the Sensors section of Preferences.

One huge advantage of running on a Mac compared to a mobile device is the much larger battery. This means we are not constrained by battery-saving measures and can address one of the most common gripes with the iOS app, update intervals. On a Mac, entity updates are immediately triggered when something changes. You will see this reported by the `sensor.DEVICE_NAME_last_update_trigger` reporting `Signaled`.

## Home Assistant Widgets (Big Sur only)

Home Assistant Companion for macOS already supports widgets in Big Sur. Right now, we have an Actions Widget where you can have up to eight actions. You can also create multiple widgets with different sets of actions. If you have an idea for other widgets you'd like to see, pop over to [the community forums and let us know](https://community.home-assistant.io/t/what-kind-of-ios-14-widgets-would-you-like-to-see/211112/14).

<p class='img'>
<img src='/images/blog/2020-09-18-mac-companion/actions-widget.png' alt='Screenshot of a large Home Assistant Actions widget in Big Sur'></a>
The large Home Assistant Actions widget in Big Sur.
</p>

## Interface

The Mac app is definitely a _Mac_ app. The App Configuration page has been removed from Home Assistant's sidebar. Instead, the configuration options and preferences are on the menu bar right where you'd expect to find them for any other app and all the standard shortcuts work too (like `⌘,` for Preferences). You can even open multiple Lovelace windows via File > New.

<p class='img'>
<img src='/images/blog/2020-09-18-mac-companion/multi_window.png' alt='Screenshot of two Lovelace windows open side-by-side'></a>
You can have multiple Home Assistant Companion windows open.
</p>

In the menu bar, you will also find an option to manually send an update to Home Assistant and a new Actions menu where you can see all your [actions](https://companion.home-assistant.io/docs/core/actions) and fire them.

## Notifications

Just like the iOS app, you can send notifications to your Mac with services like `notify.mobile_app_DEVICE_NAME`. One small difference is that [critical notifications](https://companion.home-assistant.io/docs/notifications/critical-notifications) are not yet available for the Mac app. However, all our other notifications features like actionable notifications work on the Mac app. To see what is possible, take a look at [the docs](https://companion.home-assistant.io/).

## Documentation and Support

We are updating the [Companion App docs](https://companion.home-assistant.io) with details for the Mac app. You can also pop over to the [Discord channel](https://discord.com/login?redirect_to=%2Fchannels%2F330944238910963714%2F551871772484698112). If you find a bug or have an idea for a feature, please open up an issue on the [GitHub repository](https://github.com/home-assistant/iOS/issues/new/choose).

## Getting the beta

You can get the beta right now from the `home-assistant/ios` repository: download the `home-assistant-mac.zip` file from the [latest release](https://companion.home-assistant.io/app/mac/latest), unzip and drag it over to your Applications folder. Done!

That's it. All that's left is to wish Home Assistant Happy Birthday one last time and to wait and see what amazing developments the next year brings.

Tom
