---
title: Portainer
description: Instructions on how to integrate Portainer with Home Assistant.
ha_category:
  - Binary sensor
ha_release: 0.41
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: portainer
ha_config_flow: true
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The Portainer {% term integration %} is used as an interface to the [Portainer API](https://docs.portainer.io/api).
Portainer is a lightweight management UI that allows you to easily manage your Docker containers, images, networks, and volumes. It works on every Docker host or Swarm cluster.

The Portainer API provides a way to manage Docker containers, images, networks, and volumes. It allows you to interact programmatically with your Docker host or Swarm cluster.

## Prerequisites

Before you can configure Portainer within Home Assistant, you need an Access Token. Create a Portainer Access Token by following these steps:

1. Log in to your Portainer instance.
2. Go to your user profile by clicking on your username in the top right corner and select `My Account`.
3. Goto the section `Access Tokens`.
4. Click on `Add Access Token` to create a new key.
5. Copy the generated Access Token.
6. In Home Assistant, go to the Portainer integration configuration and paste the Access Token into the appropriate field.

{% include integrations/config_flow.md %}

## Supported functionality

{% note %}
This integration is currently being actively developed and tested. More platforms and features will be added in.
{% endnote %}

There is currently support for the following device types within Home Assistant:

- Binary sensor - for monitoring the status of Portainer services.

