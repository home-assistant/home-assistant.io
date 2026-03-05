---
title: Hetzner Cloud
description: Instructions on how to integrate Hetzner Cloud with Home Assistant.
ha_category:
  - Binary sensor
ha_iot_class: Cloud Polling
ha_release: 2025.4
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: hetzner
ha_platforms:
  - binary_sensor
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Hetzner Cloud** {% term integration %} allows you to monitor your [Hetzner Cloud](https://www.hetzner.com/cloud) infrastructure from Home Assistant. It connects to the Hetzner Cloud API to track the health status of your load balancer targets.

## Prerequisites

To use the Hetzner Cloud integration, you need an API token for your Hetzner Cloud project.

1. Log in to the [Hetzner Cloud Console](https://console.hetzner.cloud/).
2. Select the project you want to monitor.
3. Go to **Security** > **API tokens**.
4. Select **Generate API token** and create a token with **Read** permissions.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API Token:
  description: "The API token for your Hetzner Cloud project."
{% endconfiguration_basic %}

## Supported functionality

### Binary sensors

The integration creates a binary sensor for each **server** or **IP** target attached to your load balancers. Each sensor shows whether the target is healthy based on the load balancer's health checks.

- **Target health**: Shows the health status of a load balancer target. The sensor is **on** when all health checks for the target report healthy, and **off** when any health check reports unhealthy.

## Known limitations

- **label_selector targets are not supported.** Load balancers using `label_selector` type targets will not produce any entities due to a limitation in the underlying `hcloud` Python library, which does not parse the resolved targets within `label_selector` entries. If you need health monitoring for these targets, switch to direct **server** targets on your load balancer.

## Data updates

The integration polls the Hetzner Cloud API every 60 seconds to update load balancer and target health data.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
