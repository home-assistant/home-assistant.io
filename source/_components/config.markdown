---
layout: page
title: "Config"
description: "Instructions on how to setup the configuration panel for Home Assistant."
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

### {% linkable_title General %}

This section enables you to control Home Assistant from within Home Assistant. Check your configuration, reload the core, groups, and automation, and the Home Assistant process itself. With a single mouse click.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/server-management.png' />
</p>

### {% linkable_title Customization %}

This section enables you to customize entities within Home Assistant. Use this to set friendly names, change icons, hide entities, and modify other attributes.

### {% linkable_title Automation %}

This section enables you to create and modify automations from within Home Assistant, without needing to write out the yaml code.

### {% linkable_title Script %}

Similar to the automation editor, this section enables you to create and modify scripts from within Home Assistant, without needing to write out the yaml code.

### {% linkable_title Z-Wave %}

This section enables you to control your Z-Wave network and devices from within Home Assistant. You can add and remove devices, as well as change device specific configuration variables.
