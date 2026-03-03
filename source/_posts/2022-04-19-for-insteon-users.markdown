---
layout: post
title: "Hey Insteon users!"
description: "Collection of latest information to help Insteon users transition to Home Assistant."
date: 2022-04-19 00:00:00
date_formatted: "April 19, 2022"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories:
- Announcements
og_image: /images/integrations/insteon/insteon-products.jpg
---

_The US smart home company Insteon abruptly went dark and turned off its cloud. While Insteon products talk locally, the app and voice assistant integrations do not. Without this, users are not able to control and configure their hub and automations don't run._

If you're one of the impacted Insteon users, this post is for you.

The good news is that Home Assistant is able to talk to your Insteon devices via the Insteon hub or modem. You will be able to pair new devices and set up links as you're used to.

The other good news is that Home Assistant works 100% local. There is no cloud necessary for any part of it to function and no one can remotely shut it down.

<p class='img'>
<img src='/images/integrations/insteon/insteon-products.jpg' alt='Overview of supported Insteon modems & hubs'>
Overview of supported Insteon modems & hubs
</p>

There are many different ways to run Home Assistant. The easiest and best way is to [buy a dedicated device to run Home Assistant](/blog/2022/04/16/device-to-run-home-assistant/). Alternatively, if you have a server at home and are familiar with the technology, you can try our [virtual machine](/installation/alternative#install-home-assistant-operating-system) or [Docker container](/installation/alternative#install-home-assistant-container) installations.

Once you have Home Assistant up and running, see [the documentation](https://www.home-assistant.io/integrations/insteon/) for the Insteon integration on how to set it up. It works with the [2413U] USB and [2412S] RS242 flavors of PLM and the [2448A7] USB stick. It has also been tested to work with the [2242] and [2245] Hubs.

[Tom Harris](https://github.com/teharris1) leads the development of the Insteon integration in Home Assistant and he is putting the final touches on a new Insteon page for the Home Assistant interface. This page makes it easier to manage your Insteon network, just like you would have done via the Insteon application. It's expected to be available in 1-2 weeks.

<p class='img'>
<img src='/images/blog/2022-04-for-insteon-users/insteon-panel-1.jpg' alt='Screenshot of the upcoming Insteon page'>
Screenshot of the upcoming Insteon page
</p>

Home Assistant is an open and friendly community which is happy to help new users. Join us on [Discord chat](/join-chat/) or on [our forums](https://www.home-assistant.io/join-chat/) if you get stuck.

If you're looking to connect with other Insteon users, we recommend the [/r/Insteon community on Reddit](https://www.reddit.com/r/insteon/).

To stay up to date on the latest releases of Home Assistant, follow us in [Twitter](https://twitter.com/home_assistant), [Facebook](https://www.facebook.com/homeassistantio) or [subscribe to our newsletter](/newsletter/).

<p class='img'>
<img src='/images/blog/2022-04-for-insteon-users/insteon-panel-2.jpg' alt='Another screenshot of the upcoming Insteon page'>
Another screenshot of the upcoming Insteon page
</p>

[2413U]: https://www.insteon.com/powerlinc-modem-usb
[2412S]: https://www.insteon.com/powerlinc-modem-serial
[2448A7]: https://www.smarthome.com/insteon-2448a7-portable-usb-adapter.html
[2245]: https://www.insteon.com/insteon-hub/
[2242]: https://www.insteon.com/support-knowledgebase/2014/9/26/insteon-hub-owners-manual
