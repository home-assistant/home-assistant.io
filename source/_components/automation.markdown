---
layout: page
title: "Automation"
description: "Instructions on how to setup automation within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_qa_scale: internal
ha_release: 0.7
---

Please see the [docs section](/docs/automation/) for in-depth
documentation on how to use the automation component.

Starting with 0.28 your automation rules can be controlled with the frontend.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/automation-switches.png' />
</p>

This allows one to reload the automation without restarting Home Assistant
itself. If you don't want to see the automation rule in your frontend use
`hide_entity: true` to hide it.
You can also use `initial_state: 'false'` so that the automation
is not automatically turned on after a Home Assistant reboot.

```yaml
automation:
  - alias: Door alarm
    hide_entity: true
    initial_state: 'true'
    trigger:
      - platform: state
  ...
```
