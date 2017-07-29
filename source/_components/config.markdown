---
layout: page
title: "Config"
description: "Instructions how to setup the configuration panel Home Assistant."
date: 2017-02-24 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Front end
ha_release: 0.39
---

The `config` component is designed to display panels in the frontend to configure and manage parts of Home Assistant.

To enable the configuration panel, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
config:
```

### {% linkable_title Group & Views %}

The **Groups & Views** sections allows you to re-arrange your [groups](/components/group/). Also, you can edit the group's setting and switch between "view" and "group".

<p class='img'>
  <img src='{{site_root}}/images/screenshots/group-views.png' />
</p>


### {% linkable_title Server Management %}

This section enables you to control Home Assistant from within Home Assistant. Check your configuration, reload the core, groups, and automation, and the Home Assistant process itself. With a single mouse click.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/server-management.png' />
</p>


