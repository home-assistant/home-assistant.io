---
title: Portainer
description: Instructions on how to integrate Portainer with Home Assistant.
ha_category:
  - Binary sensor
ha_release: '2025.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: portainer
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - switch
  - button
ha_integration_type: integration
ha_quality_scale: bronze
---

The Portainer {% term integration %} is used as an interface to the [Portainer API](https://docs.portainer.io/api).
Portainer is a lightweight management UI that allows you to easily manage your Docker containers, images, networks, and volumes. It works on every Docker host or Swarm cluster.

The Portainer API provides a way to manage Docker containers, images, networks, and volumes. It allows you to interact programmatically with your Docker host or Swarm cluster.

## Prerequisites

Before you can configure Portainer within Home Assistant, you need a few things:

- have Portainer installed and a user with administrator rights on Portainer.
- An access token. 

Create a Portainer Access Token by following these steps:

1. Log in to your Portainer instance.
2. To create an access token, follow the steps in the [Portainer documentation](https://docs.portainer.io/api/access).
3. Copy the generated Access Token and store it somewhere safe, you will need it in the next steps.

{% include integrations/config_flow.md %}

## Supported functionality

{% note %}
This integration is currently being actively developed and tested. More platforms and features will be added in the future.
{% endnote %}

There is currently support for the following device types within Home Assistant:

- Binary sensor - for monitoring the status of Portainer services.
- Switch - for turning on and off containers.
- Button - for restarting containers.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, consider deleting the Portainer access token.
