---
title: "Home Assistant Companion for Mac"
description: "Integrate your Mac into Home Assistant."
date: 2020-09-18 00:00:00
date_formatted: "September 18, 2020"
comments: true
author: Tom Brien
author_twitter: tbrien88
categories: Announcements
og_image: /images/blog/2020-09-15-home-assistant-tags/social.png
---

TODO: ADD VIDEO

TODO: CHECK IF CHANGING DISCORD/REPO NAMES


Wow what a birthday week it has been! We've had a [new supervisor release](/blog/2020/09/16/supervisor-joins-the-part), one of the largest and most user-driven core [releases](/blog/2020/09/17/release-115) thanks to the month of What The Heck?! and even seen the the integration of [RFID tags](/blog/2020/09/15/home-assistant-tags) right into the heart of Home Assistant. To finish the week off we've got one last present for all our Mac users, we're announcing the beta release of Home Assistant Companion for Mac. Like a lot of the recent updates to the iOS app, we have [@zacwest](https://github.com/zacwest) to thank for this. Zac has ported the iOS app over to Mac and added some great new features specific to the Mac.

<p class='img'>
<img src='/images/blog/2020-09-18-mac-companion/render.png' alt='Rendered image of the Home Assistant Lovelace interface running full screen on a 16-inch Mac Book Pro'></a>
Rendered image of the Home Assistant Lovelace interface running full screen on a 16-inch Mac Book Pro.
</p>

## Getting the beta

You can get the beta right now from the [home-assistant/ios repository](https://github.com/home-assistant/iOS) just download the [`home-assistant-mac.zip` file from the latest release](https://companion.home-assistant.io/app/mac/latest), unzip and drag it over to your Applications folder. Done!

## Features

Let's start by looking at some of the coolest Mac-specific features of the app, sensors for all your webcams and microphones. Each camera and microphone has its on `binary_sensor` showing whether it is active or not. These can enable some really useful automations, especially for those home working at the moment. You could automatically turn off the radio when starting a call or close the blinds behind you to improve your video quality. To see just how useful this can be in the real world, check out this video of how our very own Frenck is using these sensors in his streaming set up.

TODO: ADD VIDEO EMBED HERE

One huge advantage of running on a Mac compared to a mobile device is the much larger battery. This means we are not constrained by battery saving measures and can address one of the most common gripes with the iOS app, update intervals. On a Mac entity updates are triggered immediately when something changes. You will see this reported by the `sensor.DEVICE_NAME_last_update_trigger` reporting `Signaled`.

### Notifications

Just like the iOS app, you can send notifications to your Mac with services like `notify.mobile_app_DEVICE_NAME`. One small difference is that [critical notifications](https://companion.home-assistant.io/docs/notifications/critical-notifications) are not yet available for the Mac app. However, all our other notifications features like actionable notifications work on the Mac app. To see what is possible, take a look at [the docs](https://companion.home-assistant.io/).

### Interface

Your Mac isn't a mobile so you shouldn't be forced to use an interface designed for a mobile. In the Mac app the App Configuration page has been removed from Home Assistant's sidebar and instead the configuration options and preferences are in the Home Assistant menu on the menu bar right where you'd expect to find them for any other app and all the standard shortcuts work too (just hit `cmd + ,` for preferences). Here you will also find an option to manually send an update to Home Assistant and you can even open extra Home Assistant windows! Finally, on the menu bar you can also find a new Actions menu where you will see all your [actions](https://companion.home-assistant.io/docs/core/actions) and fire them.

### Big Sur Features

Home Assistant Companion for Mac already supports widgets in Big Sur. Right now we have an Actions Widget where you can have up to eight actions. You can also create multiple widgets with different sets of actions. If you have an idea for other widgets you'd like to see, pop over to [the community forums and let us know](https://community.home-assistant.io/t/what-kind-of-ios-14-widgets-would-you-like-to-see/211112/14).

<p class='img'>
<img src='/images/blog/2020-09-18-mac-companion/actions-widget.png' alt='Screenshot of a large Home Assistant Actions widget in Big Sur'></a>
Screenshot of a large Home Assistant Actions widget in Big Sur.
</p>

### Documentation and Support

We are updating the [Companion App docs](https://companion.home-assistant.io) with details for the Mac app. You can also pop over to the [Discord channel](https://discord.com/login?redirect_to=%2Fchannels%2F330944238910963714%2F551871772484698112). If you find a bug or have an idea for a feature please open an issue over on the [GitHub repository](https://github.com/home-assistant/iOS/issues/new/choose).

That's it. All that's left is to wish Home Assistant Happy Birthday one last time and to wait and see what amazing developments the next year brings.

Tom
