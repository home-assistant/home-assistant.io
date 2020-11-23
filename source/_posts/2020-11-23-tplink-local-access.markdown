---
title: "TP-Link offers way to add local API back"
description: "TP-Link last week decided to publish a firmware upgrade that removed access to the local API. They are partially reverting this decision."
date: 2020-11-23 00:01:00
date_formatted: "November 23, 2020"
author: Paulus Schoutsen
author_twitter: balloob
categories: Public-Service-Announcement
og_image: /images/blog/2020-11-23-tplink/forum-post-send-ticket.png
---

Last week TP-Link released an update for their HS100 and HS110 plugs that removed the local API. This was done because of a "security concern". I put this in quotes because it has not been verified and this reason has been given before when removing interopability.

Lots of users got, rightfully so, angry. They bought the plugs assuming the local API was a feature. Removing this feature and forcing users through the TP-Link cloud is unacceptable.

It looks like TP-Link has listened… _somewhat_. They are offering a temporary solution to rollback the firmware. We haven't found any public documentation but there are forum posts by their employees [here](https://community.tp-link.com/en/home/forum/topic/236268#topic-reply-523030) and [here](https://community.tp-link.com/en/home/forum/topic/237614#topic-reply-520984) about it.

<p class='img'>
<img src='/images/blog/2020-11-23-tplink/forum-post-send-ticket.png' alt='TP-Link employee on the forums explaining how to downgrade the firmware'>
<a href="https://community.tp-link.com/en/home/forum/topic/236268#topic-reply-523030">Forum post</a> by a TP-Link employee to send in a ticket.
</p>

We are hoping for a better solution, but for now this is what you should do:

1. Submit a ticket at [technical support](https://www.tp-link.com/nl/support/contact-technical-support/#E-mail-Support)
2. Go to the forums and send [this user](https://community.tp-link.com/en/home/uc/info/650029) a message with your ticket ID and MAC address.

TP-Link, if you're reading along, please reach out to us at hello@home-assistant.io so we can discuss a better long term solution for local control. Happy to talk!
