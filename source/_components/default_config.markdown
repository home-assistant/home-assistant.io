---
layout: page
title: "Default Config"
description: "The default config integration will initate a default configuration for Home Assistant."
date: 2019-02-15 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category:
  - Other
ha_release: 0.88
---

This integration is a meta-component and configures a default set of integrations for Home Assistant to load. The integrations that will be loaded can be found [here](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/components/default_config/manifest.json).

## {% linkable_title Configuration %}

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
default_config:
```

