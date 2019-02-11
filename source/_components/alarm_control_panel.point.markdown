---
layout: page
title: "Minut Point Alarm Control Panel"
description: "Control Alarm state for Minut Point."
date: 2019-02-11
sidebar: true
comments: false
sharing: true
footer: true
logo: minut.png
ha_category: Alarm
ha_release: 0.88
ha_iot_class: "Cloud Polling"
ha_qa_scale: silver
---

The `point` alarm control panel platform gives users the ability to
control a Point home alarm system.

You must have the [`Point` component](/components/point/) configured
to use this platform. After configuring that component, the homes defined
in Point will automatiacally appear as alarm control panels.

<p class="note">
The Point only supports Arm/Disarm so there is no difference between `Arm Home`
and `Arm Away`.
</p>
