---
layout: page
title: "Wink Cover"
description: "Instructions on how to setup the Wink garage doors within Home Assistant."
date: 2016-06-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Cover
ha_release: 0.13
ha_iot_class: "Cloud Polling"
---

Wink Cover garage door functionality varies on the product. Home Assistant can open, close, and view state of GoControl/Linear openers. For Chamberlain MyQ-enabled openers, Home Assistant is limited to show current state (open or closed) only using this Wink cover. This restriction was imposed by Chamberlain for third party control. Wink suggests that MyQ customers should contact Chamberlain directly to inquire about expanding permissions.

The [MyQ Cover](/components/cover.myq/) does provide full functionality for opening and closing Chamberlain MyQ-enabled garage doors. If installed along with the Wink Component, a duplicate garage door entity may exist. In that case, the semi-functional Wink garage door entity can be hidden via customize.yaml.

The requirement is that you have setup [Wink](/components/wink/).

### {% linkable_title Supported cover devices %}

- Bali window treatments
- Lutron shades
- Pella motorized blinds and shades
- GoControl garage door opener
- Chamberlain MyQ (Limited functionality) (No Wink hub required)

<p class='note'>
The above devices are confirmed to work, but others may work as well.
</p>
