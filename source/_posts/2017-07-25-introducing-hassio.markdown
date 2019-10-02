---
title: "Introducing Hass.io"
description: "The ultimate home automation hub has arrived."
date: 2017-07-25 00:02:05 +0000
date_formatted: "July 25, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories: Announcements
og_image: /images/hassio/screenshots/dashboard.png
---

**TL;DR:** Today we're introducing [Hass.io]. Hass.io is an operating system that will take care of installing and updating Home Assistant, is managed from the Home Assistant UI, allows creating/restoring snapshots of your configuration and can easily be extended using [Hass.io add-ons][addons] including [Google Assistant] and [Let's Encrypt].

----

Home Assistant is 2 months away from being 4 years old. In that time the Internet of Things has really taken off and we've seen many new devices and services. We saw the introduction of voice assistants like Google Home and new standards like Apple HomeKit.

Some things have been supported natively in Home Assistant, others have been integrated into Home Assistant via third party applications. All these moving parts caused our users to spend a lot of time maintaining their systems and applications instead of automating their homes.

So we decided to take a step back from day-to-day Home Assistant development and see if we could offer a solution that makes updating a breeze for our users. A solution that you can flash to your Raspberry Pi and no longer worry about. A solution that would still be local first and respect the user's privacy.

And this is how [Pascal Vizeli] came up with Hass.io, an operating system based on [ResinOS] and [Docker]. Hass.io will take care of installing and updating Home Assistant, is managed from the Home Assistant UI, allows taking/restoring snapshots of your configuration and can easily be extended using [Hass.io add-ons][addons].

<p class='img'>
<img src='/images/hassio/screenshots/dashboard.png'>
Hass.io dashboard
</p>

To install add-ons, a user can browse the built-in add-on store and install, configure and update any available application. Want to turn your device into a Google Assistant or make your configuration accessible via Samba/Windows networking? Both are a couple of clicks away! ([Video demo - 38s, no audio][install-demo])

At launch we have included a couple of [built-in add-ons][addons] like [Google Assistant], [Let's Encrypt] and [Duck DNS]. Besides our internal add-ons, it is also possible to create and share your own add-on repositories. During our beta period we've already seen some great add-ons being shared: [Homebridge][olivierg], [InfluxDB][bestlibre], [HASS Configurator][danielperna] and [AppDaemon][vkorn].

As we strongly believe in the openness of technology, we are releasing Hass.io as [open source] under the Apache 2.0 license. That way any user can make sure that the code that runs in their homes is secure and safe.

- [Learn more about Hass.io][Hass.io]
- [Install Hass.io][install]
- [Available add-ons][addons]

_Some frequently asked questions are answered below in the read more section._

<div class='videoWrapper'>
<iframe width="560" height="315" src="https://www.youtube.com/embed/XWPluWcYRMI" frameborder="0" allowfullscreen></iframe>
</div>

Hass.io has been built by [Pascal Vizeli], the UI has been made by [Paulus Schoutsen] and [BRUHAutomation] made the introduction video. Big thanks to [Resin.io] for building ResinOS and helping us get started with it. Also a big thanks to the community for early feedback, helping out with the documentation and add-on development ❤️

<!--more-->

#### Will Hass.io be the only way to run Home Assistant?

Hass.io is and will always be optional. You can still run Home Assistant wherever you can run Python.

#### Which devices are supported at launch?

Initially we support the Raspberry Pi 1, 2, 3 and Intel NUC. Advanced users can also [install Hass.io on a Linux server][advanced-install].

#### Can I install packages or scripts on the machine?

No, this is not possible as we're using stateless Docker containers. To install a package you'll have to write a local add-on that interacts with Home Assistant. See [our tutorial][run-local].

#### Can I restore a snapshot on a different device?

Yes, any Hass.io snapshot can be restored on any device.

#### The Hass.io configuration panel contains powerful tools. Why is there no extra security besides the Home Assistant login?

This is in the works. We have already implemented [the backend](https://github.com/home-assistant/hassio/pull/41) and plan to release the UI soon.

#### Is there a roadmap?

We use [Pivotal Tracker] to track things that are in progress and what we might work on.

[Hass.io]: /hassio
[install]: /hassio/installation
[Homebridge]: https://github.com/nfarina/homebridge
[hb-hass]: https://github.com/home-assistant/homebridge-homeassistant
[Pascal Vizeli]: https://github.com/pvizeli/
[Paulus Schoutsen]: https://github.com/balloob/
[ResinOS]: https://resinos.io/
[Docker]: https://www.docker.com/
[addons]: /addons/
[bestlibre]: https://community.home-assistant.io/t/repository-bestlibre-addons-repository/18037
[danielperna]: https://community.home-assistant.io/t/repository-hass-configurator/17838
[olivierg]: https://community.home-assistant.io/t/repository-homebridge-add-on/18569
[vkorn]: https://community.home-assistant.io/t/repository-few-addons/20659
[install-demo]: https://youtu.be/NfyavpAg4as
[BRUHAutomation]: https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w
[open source]: https://github.com/home-assistant/hassio
[Google Assistant]: /addons/google_assistant/
[Let's Encrypt]: /addons/lets_encrypt/
[Duck DNS]: /addons/duckdns/
[advanced-install]: /hassio/installation/#alternative-install-on-generic-linux-server
[Pivotal Tracker]: https://www.pivotaltracker.com/n/projects/2020851
[Resin.io]: https://resin.io
