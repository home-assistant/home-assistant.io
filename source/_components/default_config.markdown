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

This integration is a meta-component and configures a default set of integrations for Home Assistant to load. The integrations that will be loaded are:

[automation](https://www.home-assistant.io/components/automation/)

[cloud](https://www.home-assistant.io/components/cloud/)

[config](https://www.home-assistant.io/components/config/)

[frontend](https://www.home-assistant.io/components/frontend/)

[history](https://www.home-assistant.io/components/history/)

[logbook](https://www.home-assistant.io/components/logbook/)

[map](https://www.home-assistant.io/components/map/)

[mobile_app](https://www.home-assistant.io/components/mobile_app/)

[person](https://www.home-assistant.io/components/person/)

[script](https://www.home-assistant.io/components/script/)

[ssdp](https://www.home-assistant.io/components/ssdp/)

[sun](https://www.home-assistant.io/components/sun/)

[system_health](https://www.home-assistant.io/components/system_health/)

[updater](https://www.home-assistant.io/components/updater/)

[zeroconf](https://www.home-assistant.io/components/zeroconf/)

## {% linkable_title Configuration %}

To integrate this into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
default_config:
```

