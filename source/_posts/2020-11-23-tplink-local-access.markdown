---
title: "[Better solution!] TP-Link offers way to add local API back"
description: "TP-Link last week decided to publish a firmware upgrade that removed access to the local API. They are partially reverting this decision."
date: 2020-11-23 00:01:00
date_formatted: "November 23, 2020"
author: Paulus Schoutsen
author_twitter: balloob
categories: Public-Service-Announcement
og_image: /images/blog/2020-11-23-tplink/forum-post-send-ticket.png
---

**Update Nov 26:** TP-Link has now announced that they are working on a new firmware that should solve it. DM them on Twitter for info.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;re sorry the recent firmware update has problems for the Kasa community. Since its release, we&#39;ve been busy creating a Beta firmware that&#39;ll enable people to continue to use third-party smart home software &amp; platforms using local APIs. Please DM if you&#39;d like the Beta firmware</p>&mdash; TP-LINK UK (@TPLINKUK) <a href="https://twitter.com/TPLINKUK/status/1331970582901100544?ref_src=twsrc%5Etfw">November 26, 2020</a>
</blockquote>

---

Last week TP-Link released an update for their HS100 and HS110 plugs that removed the local API. This was done because of a "security concern". I put this in quotes because it has not been verified and this reason has been given before when removing interoperability. TP-Link communicated this via Twitter in response to a user voicing their concern.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">There were security vulnerabilities on the plug for the local management, the latest firmware version fixed these security issues. It is suggested to use the TP-Link official App KASA to manage the plug. If you have issues, pls feel free to let us know.</p>&mdash; TP-LINK UK (@TPLINKUK) <a href="https://twitter.com/TPLINKUK/status/1328687659133399043?ref_src=twsrc%5Etfw">November 17, 2020</a>
</blockquote>

Lots of users, rightfully so, got angry. They bought the plugs assuming the local API was a feature. Removing this feature and forcing users through the TP-Link cloud sucks. It removes the one feature why TP-Link stood out among many smart plugs.

After a week of angry users, it looks like TP-Link has listened… _somewhat_. They are offering a temporary solution to roll back the firmware. We haven't found any public documentation, but there are forum posts by their employees [here](https://community.tp-link.com/en/home/forum/topic/236268#topic-reply-523030) and [here](https://community.tp-link.com/en/home/forum/topic/237614#topic-reply-520984) about it.

<p class='img'>
<img src='/images/blog/2020-11-23-tplink/forum-post-send-ticket.png' alt='TP-Link employee on the forums explaining how to downgrade the firmware'>
<a href="https://community.tp-link.com/en/home/forum/topic/236268#topic-reply-523030">Forum post</a> by a TP-Link employee to send in a ticket.
</p>

We are hoping for a better solution, but for now this is what you should do:

1. ~~Submit a ticket to [technical support](https://www.tp-link.com/en/support/contact-technical-support/#E-mail-Support). Make sure to include the MAC address of your plug.~~ We got an update from TP-Link that this step is no longer necessary.
2. Go to the forums and send [this user](https://community.tp-link.com/en/home/uc/info/650029) a message with your TP-Link ID, model number, hardware version and MAC address.

TP-Link, if you're reading along, please reach out to us at hello@home-assistant.io so we can discuss a better long term solution for local control. Happy to talk!
