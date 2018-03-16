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

Wink cover/garage door functionality depends on the product you're using.  With GoControl/Linear Home Assistant can open, close, and view state.  Chamberlain is currently limited to view only.  Meaning Home Assistant will only show the current state of the door and control has been disabled (by Chamberlain).  If you have a Chamberlain garage door, and would like to control it via Home Assistant, please contact Chamberlain and request that they re-enabled third-party control.

The following quote is from Wink.

> As part of our agreement with Chamberlain, third-party access to control Chamberlain garage doors has been restricted. Please contact Chamberlain directly to inquire about permissions.

The requirement is that you have setup [Wink](/components/wink/).


### {% linkable_title Supported cover devices %}

- Bali window treatments
- Lutron shades
- Pella motorized blinds and shades
- GoControl garage door opener
- Chamberlain (Limited functionality) (No Wink hub required)

<p class='note'>
The above devices are confirmed to work, but others may work as well.
</p>

