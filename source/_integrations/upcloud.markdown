---
description: Instructions on how to integrate UpCloud within Home Assistant.
ha_release: 0.65
ha_domain: upcloud
---

The **UpCloud** {% term integration %} allows you to access the information about your [UpCloud](https://upcloud.com/) servers from Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Switch](#switch)

## Setup

Set up your API user credentials in your [UpCloud control panel](https://hub.upcloud.com/).

{% include integrations/config_flow.md %}

## Binary sensor

A binary sensor {% term entity %} is set up for all discovered servers.

## Switch

A switch {% term entity %} is set up for all discovered servers. You can use the switch to control (start/stop) them.
