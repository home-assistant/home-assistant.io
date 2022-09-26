---
title: Azure DevOps
description: Instructions on how to integrate Azure DevOps with Home Assistant.
ha_category:
  - Sensor
ha_release: 0.114
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@timmo001'
ha_domain: azure_devops
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Azure DevOps integration allows you to control and monitor your
Azure DevOps instance in Home Assistant.

{% include integrations/config_flow.md %}

## Sensors

This integration provides a sensor for Azure DevOps:

- Latest build - This includes attributes with additional info about the build.
