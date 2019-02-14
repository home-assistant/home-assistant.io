---
layout: page
title: "Sisyphus"
description: "Instructions on how to integrate your Sisyphus Kinetic Art Table within Home Assistant."
date: 2018-05-06 22:26
sidebar: true
comments: false
sharing: true
footer: true
logo: sisyphus.png
ha_category: Hub
featured: false
ha_release: 0.75
ha_iot_class: "Local Push"
---

The [Sisyphus](https://sisyphus-industries.com/) integration for Home Assistant allows you to observe and control your Sisyphus Kinetic Art Table.

Each table appears in Home Assistant as a Light and a Media Player.

The light can be used to sleep/wake the table or adjust the brightness of the table light.

The media player can be used to sleep/wake the table, play/pause, move between tracks, or toggle shuffle on and off. The "volume" control adjusts the table's speed.

There are two ways to configure this component. For the automatic discovery of your table(s), simply add the following to your `configuration.yaml`:

```yaml
# This will auto-detect all Sisyphus tables on your local network.
sisyphus:
```

Auto-detection can be a little slow, so if your table has a fixed IP address or hostname, you may add a list of tables in your `configuration.yaml`. For example:

```yaml
# This will skip auto-detection and add only the listed tables
sisyphus:
  - name: 'TABLE_NAME'
    host: 'TABLE_IP_OR_HOSTNAME'
  - name: 'ANOTHER_TABLE_NAME'
    host: 'ANOTHER_TABLE_IP_OR_HOSTNAME'
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
