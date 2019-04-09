---
layout: page
title: "HASS Configurator"
description: "Browser-based configuration file editor for Home Assistant."
date: 2018-07-16 14:00
sidebar: true
comments: false
sharing: true
footer: true
featured: true
og_image: /images/hassio/screenshots/addon-hass-configurator.png
---

You can use this add-on to add a browser-based file editor to your Hass.io installation.

More information and a standalone version for regular Home Assistant installations can be found in the [GitHub repository](https://github.com/danielperna84/hass-configurator).

<p class='img'>
<img src='/images/hassio/screenshots/addon-hass-configurator.png'>
Screenshot of the HASS Configurator.
</p>

### {% linkable_title Feature list %}

- Web-based editor to modify your files with syntax highlighting and YAML linting.
- Upload and download files.
- Stage, stash and commit changes in Git repositories, create and switch between branches, push to remotes, view diffs.
- Lists with available entities, triggers, events, conditions and services.
- Restart Home Assistant directly with the click of a button. Reloading groups, automations, etc. can be done as well. An API password is required.
- Direct links to Home Assistant documentation and icons.
- Execute shell commands within the add-on container.
- Editor settings are saved in your browser.
- And much more...

### {% linkable_title Add-on Configuration %}

```json
{
  "dirsfirst": false,
  "enforce_basepath": false,
}
```

{% configuration %}
dirsfirst:
  description: List directories before files in the file browser.
  required: true
  type: boolean
  default: false
enforce_basepath:
  description: If set to `true`, access is limited to files within the `/config` directory.
  required: true
  type: boolean
  default: false
{% endconfiguration %}

<p class='note warning'>
Be careful when setting up port forwarding to the configurator while embedding into Home Assistant. If you don't restrict access by requiring authentication and/or blocking based on client IP addresses, your configuration will be exposed to the internet!
</p>


