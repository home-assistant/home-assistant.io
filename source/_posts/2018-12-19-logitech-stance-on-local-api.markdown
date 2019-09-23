---
title: "Logitech's stance on local APIs"
description: "Change of mind, Logitech is now committed to maintaining their local XMPP API for the Harmony Hub."
date: 2018-12-19 00:01:00
date_formatted: "December 19, 2018"
author: Paulus Schoutsen
author_twitter: balloob
categories: Public-Service-Announcement
---

#### This post originally talked about Logitech not willing to support local APIs after removing their private, but widely used, local API. This decision has been reversed and this blog post is no longer applicable to Logitech. More information on the events can be found [in this blogpost][blog-remove-api].

Logitech has decided to remove a widely used local API of their Logitech Harmony hub. We've been tracking the story [here][blog-remove-api]. This has caused a lot of commotion among our users, and users of other smart home solutions, that integrated with the Logitech Harmony hub and all of a sudden were surprised with a broken smart home. Not a nice way to start the already busy holiday season!

Since it's 2018, a lot of these discussions are playing out on Twitter. While browsing the discussions, we came across this statement by a senior manager for product marketing for Logitech Smart Home, [Todd Walker]:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Currently, we do not plan to add support for local control.</p>&mdash; Todd Walker (@ToddW_Logitech) <a href="https://twitter.com/ToddW_Logitech/status/1075222154726100993?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

We have a lot of opinions about this, but felt that they were appropriately covered by Twitter user, and contributor to Home Assistant, [Jon Maddox]:

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">You realize that any kind of device like this…with only cloud control…is an inferior experience right?<br><br>Why would you mandate the latency that round trip cloud requests incur? Please try harder to make the product better, not usurping more control over it.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075275432243666945?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">The Harmony smart assistant skills are limited to 1 hub. Will you guys be resolving that? <br><br>Your official implementations of things we’ve accomplished ourselves, are actually inferior.<br><br>I think people would be less upset if the case was different.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075275973086625792?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Why should we buy more than one Harmony hub if only one of them works with Alexa? We utilized the local api to create our own supported experience that allows for private, secure, faster, and more than 1 hub.<br><br>That means we BUY more than 1 hub. That’s a really great thing.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075276431985467392?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">And lastly, (to get it all off my chest 😄), locking down a local API and forcing users to a complete cloud solution is not more secure. <br><br>Home networks are trusted zones. Corporate clouds have proven time and time again to be revealed as less than secure.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075276977022689282?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">I can be responsible for my own home network. I cannot be sure that yours is. <br><br>Consider embracing these users. Create an authenticated local API. Local control is the only guaranteed private, secure, and RELIABLE way to control the future of devices at home.</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/1075277380267229184?ref_src=twsrc%5Etfw">December 19, 2018</a>
</blockquote>

[blog-remove-api]: /blog/2018/12/17/logitech-harmony-removes-local-api/
[Todd Walker]: https://twitter.com/ToddW_Logitech
[Jon Maddox]: https://twitter.com/maddox
