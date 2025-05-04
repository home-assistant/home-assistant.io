---
title: Arris TG2492LG
description: Instructions on how to integrate Arris TG2492LG routers into Home Assistant.
ha_category:
  - Presence detection
ha_release: 0.109
ha_domain: arris_tg2492lg
ha_codeowners:
  - '@vanbalken'
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: hub
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This platform allows you to detect presence by looking at connected devices to an Arris TG2492LG router.

This is one of the routers provided by:

- [Ziggo](https://www.ziggo.nl/), a cable operator in the Netherlands, to their customers as the Ziggo Connectbox.
- [Virgin Media](https://www.virginmedia.com/), a cable operator in the United Kingdom and Ireland, to their customers as the Hub 3.

{% warning %}
The router prevents the admin user from logging in twice. This can cause problems with accessing the router's configuration pages while this platform is active.
{% endwarning %}

To use this device tracker in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: arris_tg2492lg
    password: YOUR_ADMIN_PASSWORD
```

{% configuration %}
host:
  description: The IP address of your router. The default value is `192.168.178.1`.
  required: false
  type: string
password:
  description: The password for your admin account.
  required: true
  type: string
{% endconfiguration %}

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
