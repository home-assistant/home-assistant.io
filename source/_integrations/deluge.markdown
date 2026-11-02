---
description: Instructions on how to integrate Deluge within Home Assistant.
ha_release: 0.57
ha_domain: deluge
---

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Prerequisites

To be able to use this integration, you need to do the following:

1. Enable the following option in deluge settings: Daemon > Allow Remote Connections
2. When set up, the daemon has an account called localclient. Refer [here](https://dev.deluge-torrent.org/wiki/UserGuide/Authentication) to get the password for the local client or add a line in the auth file with your own username and password. Use one of those credentials from there to authenticate the integration with the daemon.

{% include integrations/config_flow.md %}

## Sensor

The `deluge` platform allows you to monitor your downloads with [Deluge](https://deluge-torrent.org/) from within Home Assistant and setup automation based on the information.

## Switch

The `deluge` switch platform allows you to control your [Deluge](https://deluge-torrent.org/) client from within Home Assistant. The platform enables you switch all your torrents in pause, and then unpause them all.
