---
title: Configuration
description: Instructions on how to setup the configuration panel for Home Assistant.
ha_category:
  - Front end
ha_release: 0.39
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: config
ha_platforms:
  - scene
ha_integration_type: system
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Config** {% term integration %} is designed to display the **Settings** panels in the frontend to configure and manage parts of Home Assistant.

This is an internal integration and is enabled by default.

The **Settings** menu provides access to the following panels:

### Home Assistant Cloud

Enables you to connect to [Home Assistant Cloud](https://support.nabucasa.com/hc/articles/26260474250269) to use features such as secure remote access, voice assistants, or cloud storage for backups.

### Devices & services

Enables you to manage integrations for devices such as Philips Hue and Sonos from within Home Assistant.

### Automation & Scenes

Enables you to create and modify automations, scenes, scripts, and blueprints from within Home Assistant.

### Areas, labels & zones

Enables you to organize entities according to physical or conceptual areas of your home.

### Add-ons

Enables you to install and use additional standalone third-party software packages. Add-ons can only be installed on Home Assistant OS.

### Dashboards

Enables you to add new [dashboards](/dashboards) and manage existing ones.

### Voice assistants

Enables you to create and manage [voice assistants](/voice_control/).

### Tags

Allows you to set up NFC tags and QR codes.

### People

Allows you to manage who can access Home Assistant and what rights they have to configure it.

### System

Allows you to define things like time zone and location of your system but also to view logs, create backups, or add external network storage.

### About

Allows you to view the {% my info title="version information" %}.
