---
title: Sisyphus
description: Instructions on how to integrate your Sisyphus Kinetic Art Table within Home Assistant.
ha_category:
  - Hub
  - Light
  - Media player
ha_release: 0.75
ha_iot_class: Local Push
ha_codeowners:
  - '@jkeljo'
ha_domain: sisyphus
ha_platforms:
  - light
  - media_player
ha_integration_type: integration
ha_quality_scale: legacy
---

The [Sisyphus](https://sisyphus-industries.com/) integration for Home Assistant allows you to observe and control your Sisyphus Kinetic Art Table.

There is currently support for the following device types within Home Assistant:

- **Light** - Can be used to sleep/wake the table or adjust the brightness of the table light.
- **Media player** - Can be used to sleep/wake the table, play/pause, move between tracks, or toggle shuffle on and off. The "volume" control adjusts the table's speed.

The light and media players will be automatically added for each of your Sisyphus tables, if the Sisyphus integration is configured.

There are two ways to configure this integration. For the automatic discovery of your table(s), add the following to your {% term "`configuration.yaml`" %}:

```yaml
# This will auto-detect all Sisyphus tables on your local network.
sisyphus:
```

Auto-detection can be a little slow, so if your table has a fixed IP address or hostname, you may add a list of tables in your {% term "`configuration.yaml`" %}. For example:

```yaml
# This will skip auto-detection and add only the listed tables
sisyphus:
  - name: 'TABLE_NAME'
    host: "TABLE_IP_OR_HOSTNAME"
  - name: 'ANOTHER_TABLE_NAME'
    host: "ANOTHER_TABLE_IP_OR_HOSTNAME"
```

{% configuration %}
name:
  description: The name by which the table should appear in Home Assistant
  required: true
  type: string
host:
  description: The hostname or IP address of the table
  required: true
  type: string
{% endconfiguration %}
