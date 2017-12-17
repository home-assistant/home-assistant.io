---
layout: page
title: "Z-Wave Lock"
description: "Instructions how to setup the Z-Wave Locks within Home Assistant."
date: 2016-05-07 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: z-wave.png
ha_category: Lock
ha_release: 0.19
ha_iot_class: "Local Push"
---

To get your Z-Wave locks working with Home Assistant, follow the instructions for the general [Z-Wave component](/components/zwave/).

Z-Wave locks will expose three services under the lock domain to manage usercodes if the lock supports it:

| Service | Description |
| ------- | ----------- |
| clear_usercode | Clears a usercode at code_slot X. Valid code_slots are 1-254, but max is defined by the lock. |
| get_usercode | Get a usercode from the lock at code_slot. Valid code_slots are 1-254, but max is defined by the lock. |
| set_usercode | Sets usercode to X at code_slot Y. Valid usercodes are at least 4 digits, and max defined by the lock. |
