---
title: Arris TG2492LG
description: Instructions on how to integrate Arris TG2492LG routers into Home Assistant.
ha_category:
  - Presence detection
ha_config_flow: true
ha_release: 0.109
ha_domain: arris_tg2492lg
ha_codeowners:
  - '@vanbalken'
ha_iot_class: Local Polling
ha_platforms:
  - device_tracker
ha_integration_type: hub
related:
  - docs: /integrations/device_tracker/
    title: Device tracker
ha_quality_scale: legacy
---

This {% term integration %} allows you to detect presence by looking at connected devices to an Arris TG2492LG router.

This is one of the routers provided by:

- [Ziggo](https://www.ziggo.nl/), a cable operator in the Netherlands, to their customers as the Ziggo Connectbox.
- [Virgin Media](https://www.virginmedia.com/), a cable operator in the United Kingdom and Ireland, to their customers as the Hub 3.

{% warning %}
The router prevents the admin user from logging in twice. This can cause problems with accessing the router's configuration pages while this platform is active.
{% endwarning %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Arris TG2492LG router (default: 192.168.178.1)."
Password:
  description: "The password of the admin account of your router."
{% endconfiguration_basic %}

## Migrating from YAML configuration

If you previously configured the integration through your {% term "`configuration.yaml`" %} file, the configuration is imported automatically at startup, so your existing setup keeps working without any changes.

A repair issue in {% my integrations title="**Settings** > **Devices & services**" %} is created to guide you through the migration:

1. Remove the `arris_tg2492lg` entry under `device_tracker:` from your {% term "`configuration.yaml`" %} file.
2. Restart Home Assistant.

See the [device tracker integration page](/integrations/device_tracker/) for instructions how to configure the people to be tracked.
