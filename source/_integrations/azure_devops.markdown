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
---

The `azure_devops` integration allows you to control and monitor your
Azure DevOps instance in Home Assistant.

## Configuration

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Azure DevOps**.
After completing the configuration flow, the Azure DevOps
integration will be available.

## Sensors

This integration provides a sensor for Azure DevOps:

- Latest build - This includes attributes with additional info about the build.
