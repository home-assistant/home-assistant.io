---
title: "[Update: decision reversed!] Philips Hue blocks 3rd party lights"
description: "Philips has published a firmware update that blocks pairing of any 3rd party light."
date: 2015-12-12 10:44:00 -0800
date_formatted: "December 12, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories: Public-Service-Announcement
---
**Update Dec 16**: Great news! Philips has decided to [reverse their decision][philips-reverse] and is working on a software update to allow 3rd party light bulbs again.

<p class='img'>
<img src='/images/blog/2015-12-philips-hue-3rd-party/philips-hue-reversed-faq.png'>
Philips Hue FAQ entries regarding reversing the decision.
</p>

*Original post:*

<!--more-->
Philips Hue was one of the first to get smart lights accepted by the mainstream. Their Zigbee-based hub is rock solid, never crashes, great API and worked with other Zigbee light bulbs too. They are a bit expensive but the platform was worth every penny, till now.

Yesterday a thread on [/r/homeautomation][reddit-hue] published that Philips Hue now blocks all but their own bulbs and those of "friends of Hue". I have been able to confirm this in the Philips Hue FAQ (Update Dec 14: they have removed the entries - [mirror here][philips-hue-faq-mirror]):

<p class='img'>
<img src='/images/blog/2015-12-philips-hue-3rd-party/philips-hue-faq.png'>
Philips Hue FAQ entries regarding 3rd party light bulbs.
</p>

This means that after you update your Hue bridge to the latest version:

 - As of now, you can still use your existing paired 3rd party light bulbs
 - You cannot pair new 3rd party light bulbs
 - You're out of luck if for some reason you have to pair existing 3rd party light bulbs again
 - Resetting your hub will force pairing of all your bulbs again

If you own a Philips Hue hub and are using 3rd party light bulbs, make sure you do not upgrade your hub if you want to be able to pair new 3rd party lightbulbs. But do realize that you are sitting on a ticking time bomb.

I have read, but have been unable to confirm it, that resetting your hub will force a software upgrade. So beware of that too.

I will no longer suggest people to buy into the Philips Hue ecosystem.

[philips-reverse]: http://www.developers.meethue.com/documentation/friends-hue-update
[reddit-hue]: https://www.reddit.com/r/homeautomation/comments/3wet8h/fyi_the_hue_hub_is_now_blocking_third_party/
[philips-hue-faq-mirror]: /images/blog/2015-12-philips-hue-3rd-party/mirror.png
