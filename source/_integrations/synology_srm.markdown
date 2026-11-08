---
description: Instructions on how to integrate Synology SRM routers into Home Assistant.
ha_release: 0.87
ha_domain: synology_srm
related:
  - docs: /docs/configuration/
    title: Configuration file
---

This {% term integration %} allows you to detect presence by looking at connected devices to a [Synology SRM](https://www.synology.com/srm) router.

{% include integrations/config_flow.md %}

For instructions on creating multiple administrators on SRM, please refer to the [Synology Knowledge Center](https://kb.synology.com/en-id/SRM/tutorial/Create_multiple_administrator_accounts_on_Synology_Router).

See the [device tracker integration page](/integrations/device_tracker/) for instructions on how to configure the people to be tracked.

{% note %}
List of models known to be supported:

- RT1900ac
- RT2600ac
- MR2200ac
- RT6600ax
{% endnote %}

## Removing the integration

{% include integrations/remove_device_service.md %}