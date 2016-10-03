---
layout: page
title: "Panel iFrame"
description: "Instructions how to add iFrames in the frontend of Home Assistant."
date: 2015-07-17 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Front end
ha_release: 0.25
---


The `panel_iframe` support allows you to add additional panels to your Home Assistant frontend. The panels are listed in the sidebar and can contain external resources like the web frontend of your router, your monitoring system, or your media server.

<p class='note warning'>If you are accessing home Assistant over HTTPS using SSL, you cannot access HTTP sites through an iframe panel.</p>

To enable Panel iFrames in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
panel_iframe:
  router:
    title: 'Router'
    url: 'http://192.168.1.1'
  fridge:
    title: 'Fridge'
    url: 'http://192.168.1.5'
```

Configuration variables:

- **[panel_name]** (*Required*): Name of the panel.
  - **title** (*Required*): Friendly title for the panel. Will be used in the sidebar.
  - **icon** (*Optional*): Icon for entry. Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.
  - **url** (*Required*): The URL to open.

