---
title: Jellyfin
description: Instructions on how to integrate the Jellyfin integration into Home Assistant.
ha_category:
  - Media Player
  - Media Source
  - Sensor
ha_release: '2021.12'
ha_iot_class: Local Polling
ha_codeowners:
  - '@j-stienstra'
  - '@ctalkington'
ha_config_flow: true
ha_domain: jellyfin
ha_platforms:
  - diagnostics
  - media_player
  - sensor
ha_integration_type: service
---

The Jellyfin integration exposes a [Jellyfin](https://jellyfin.org/) server as a Media Source in Home Assistant.
Support is currently limited to music, movie and tvshow libraries only. Other libraries will not appear in the Media Browser. This integration has been tested with Jellyfin server version 10.6.4 and later.

Additionally, this integration sets up every media session connected to the Jellyfin
server as a media player in Home Assistant to provide media controls for each session.

Browsing media inside Home Assistant in a player's context provides all libraries
of type Movie and Series.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of the Jellyfin server. Please supply the full URL including the protocol and optional webroot. For example `https://media.example.com`, `http://10.1.1.100:8096` or `http://home.example.com/jellyfin`.
Username:
  description: The Jellyfin user whose libraries you want to retrieve.
Password:
  description: The password of the supplied user.
{% endconfiguration_basic %}
