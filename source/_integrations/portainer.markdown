---
title: Portainer
description: Instructions on how to integrate Portainer with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Switch
ha_release: '2025.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: portainer
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Portainer** {% term integration %} is used as an interface to the [Portainer API](https://docs.portainer.io/api).
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

There is currently support for the following device types within Home Assistant:

- Binary sensor - for monitoring the status of Portainer services.
- Switch - for turning on and off containers.
- Sensor - for monitoring various elements of containers and endpoints.
- Button - for restarting containers.

## Data updates

The integration normally updates every 60 seconds. For more detailed steps on how to define a custom polling interval, follow the procedure below.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, consider deleting the Portainer access token.
