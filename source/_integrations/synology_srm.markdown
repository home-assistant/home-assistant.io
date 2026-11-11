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

## Migrating from YAML configuration

If you previously configured Synology SRM in YAML, follow these steps to switch to setup through the UI:

1. Note the entity IDs of the devices you track, then remove the `synology_srm` device tracker platform for this router from `configuration.yaml`.
2. Remove those devices' entries from `known_devices.yaml`. Keep entries used by other legacy trackers.
3. Restart Home Assistant to stop the legacy scanner and release the removed trackers' entity IDs.
4. Add Synology SRM using the configuration steps above and select the devices you want to track. You must select at least one device.
5. If needed, change the entity IDs of the new trackers to their previous IDs to keep existing person assignments and automations working. If you keep the new IDs instead, update those references to use the new trackers.

## Removing the integration

{% include integrations/remove_device_service.md %}