---
title: "Updated release schedule"
description: "We're adding a beta period of a week before marking each release as final."
date: 2018-03-24 00:01:00
date_formatted: "March 24, 2018"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
og_image: /images/blog/2018-03-release-schedule/social.png
---

So this weekend we're going to shake things a little up. Instead of releasing a new version today, we've released a beta version of the new version: 0.66.0.beta0. After a week of being in beta, the version will be promoted to be the new stable release. While the beta is live, we will accept contributions on the dev branch for the next version as usual.

<p class='img'>
<img
    src='/images/blog/2018-03-release-schedule/release-schedule-diagram.png'
    alt='Diagram showing the updates release cycle containing a week extra time before release.'
>
Diagram of the new release schedule
</p>

The goal is to create a more stable first release without the need for a quick follow up hot fix. So if you want to be able to access the new features faster but don't mind the risk of running into the occasional bug, get yourself on the beta channel today:

 - Hass.io users will be able to enable the dev channel in the system settings.
 - For Docker users, the beta's will be published under the `rc` tag.
 - Beta's are also published to PyPi. Because it is a beta release, it will not be installed by Pip unless explictely specified in the install command: `pip3 install --pre --upgrade homeassistant`.

The documentation for the beta version can be found at [https://rc.home-assistant.io/](https://rc.home-assistant.io/).

If you find issues with either the code or the docs of the pre-release, please open an issue in the [appropriate place](/help/#bugs-feature-requests-and-alike) or, even better, submit a pull request to fix it.
