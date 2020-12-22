---
title: Jellyfin
description: Instructions on how to integrate the Jellyfin integration into Home Assistant.
ha_category:
  - Media Source
ha_release: '2021.1'
ha_iot_class: Local Polling
ha_codeowners:
  - '@j-stienstra'
ha_config_flow: true
ha_domain: jellyfin
---

The Jellyfin integration exposes a [Jellyfin](https://jellyfin.org/) server as a Media Source in Home Assistant.
Support is currently limited to music libraries only. Other libraries will not appear in the Media Browser. This integration has been tested with Jellyfin server version 10.6.4, but should support older versions as well.

## Configuration

The Jellyfin integration is configured through the Home Assistant user interface. In the Configuration page, select Integrations and click on the `+` button and choose Jellyfin.

{% configuration_basic %}
URL:
  description: The URL of the Jellyfin server. Please supply the full URL including the protocol and optional webroot. For example `https://media.example.com`, `http://10.1.1.100:8096` or `http://home.example.com/jellyfin`.
Username:
  description: The Jellyfin user whose libraries you want to retrieve.
Password:
  description: The password of the supplied user.
{% endconfiguration_basic %}

## Jellyfin server configuration

The Jellyfin integration retrieves media items from your Jellyfin libraries using an Artist -> Album -> Track hierarchy. In order for the Media Browser to display thumbnails for artists and albums, Jellyfin has to include metadata for artists and albums. This is not enabled by default.

To enable this, navigate to the Jellyfin dashboard and select Plugins. Choose which provider you would like to use for metadata retrieval (AudioDB and MusicBrainz are the two default providers) and select Settings. Enable the checkbox for "Enable this provider for metadata searches on artists and albums.".
