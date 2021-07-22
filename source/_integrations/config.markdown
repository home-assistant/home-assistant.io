---
title: Configuration
description: Instructions on how to setup the configuration panel for Home Assistant.
ha_category:
  - Front End
ha_release: 0.39
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: config
ha_platforms:
  - scene
---

The `config` integration is designed to display panels in the frontend to configure and manage parts of Home Assistant.

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
config:
```

### Integrations

This section enables you to manage integrations for devices such as Philips Hue and Sonos from within Home Assistant.

### Users

This section enables you to manage your Home Assistant users.

### General

This section enables you to manage the name, location, and unit system of your Home Assistant installation.

### Server Control

This section enables you to control Home Assistant from within Home Assistant. Check your configuration, reload the core, groups, scripts, automations, and the Home Assistant process itself with a single mouse click.

<p class='img'>
  <img src='/images/screenshots/server-management.png' />
</p>

### Persons

This section enables you to associate users with their device tracker entities using the person component.

### Entities

This section enables you to override the name, change the entity ID or disable an entity in Home Assistant.

### Areas

This section enables you to organize entities to physical areas of your home.

### Automation

This section enables you to create and modify automations from within Home Assistant, without needing to write out the YAML code.

### Script

Similar to the automation editor, this section enables you to create and modify scripts from within Home Assistant, without needing to write out the YAML code.

### Z-Wave

This section enables you to control your Z-Wave network and devices from within Home Assistant. You can add and remove devices, as well as change device specific configuration variables.

### Customizations

This section enables you to customize entities within Home Assistant. Use this to set friendly names, change icons, and modify other attributes.
