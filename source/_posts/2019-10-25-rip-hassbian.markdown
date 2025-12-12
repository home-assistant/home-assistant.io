---
layout: post
title: "R.I.P Hassbian"
description: "The end of Hassbian"
date: 2019-10-26 06:00:00
date_formatted: "October 26, 2019"
author: Fredrik Lindqvist
author_twitter: Landrash
comments: true
categories: Announcements
---

It's time for what was once the simplest way to install Home Assistant to retire.

## R.I.P Hassbian

Some of you will probably wonder why Hassbian is being retired and I'll try to give a proper motivation.
First of is the age-old factor of **time**. I as the lead developer of Hassbian haven't been able to give it the time and attention it requires, and there have been few others that have pushed the project further. The one exception being [@ludeeus] who's done most of the heavy lifting when the image was retooled to use a proper apt package and repository.
Second is that it's no longer the best option for most to use as an installation method. Hass.io has surpassed Hassbian in almost all ways I can imagine.

## Next Step for Hassbian

Since Hassbian has been around for quite a while, there are quite a few users that don't want Hassbian to go away. To make this as easy as possible for those users, here's the plan.

- The repositories [pi-gen] and [hassbian-scripts] hosting the Hassbian projects files will be moved to a new organization.
- A last release will be done by me mid Q4 2019. This image will be hosted under the [pi-gen] repository.
- The [pi-gen] repository will be reworked to work with a standard [raspbian] image with minor modifications for anyone wanting to create their own "Hassbian like" image. This has always been possible, but the current repository is a bit out of date with the current layout of the Raspbian image.
- The [hassbian-scripts] package will get a final release and will continue to be hosted on Gitlab. Some minor changes will be made to reflect the changes to the project.

## Next step for Hassbian users

The Hassbian image has always aimed to be the same as a manual Raspbian Lite installation with some packages added.
There won't really be any big changes for all of the users of Hassbian and for documentation, please refer to the [Manual installation on a Raspberry PI] method.

## Alternatives

If you want to continue using something similar, have a look at the [manual installation on a Raspberry Pi] since it is the base Hassbian was created from.
For everyone else, I would wholeheartedly recommend Hass.io since it is what I personally use now (It's what I had hoped Hassbian could have been but better).

## Last but not least

Last but not least, thank you to all of those who contributed, in any way, to the Hassbian project and image.

[@ludeeus]: https://github.com/ludeeus
[pi-gen]: https://github.com/Hassbian/pi-gen
[hassbian-scripts]: https://github.com/Hassbian/hassbian-scripts
[manual installation on a raspberry pi]: /docs/installation/raspberry-pi/
[raspbian]: https://www.raspberrypi.org/downloads/raspbian/
