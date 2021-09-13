---
title: Contec Controllers
description: Instructions on setting up integration with Contec Controllers.
ha_category:
  - Light
  - Cover
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 0.48
ha_domain: contec_controllers
ha_codeowners:
  - '@havivi1986'
ha_config_flow: true
ha_platforms:
  - cover
  - light
  - binary_sensor
---

The Contec Controllers integration allows you to control the controllers supplied by Contec smart home company:
http://www.contec-touch.com/

## Prerequisites

To use Contec Controller integration, you should have Contec Controllers installed and connected to your home network. You should ask Contec representative for your controllers ip, port and the number of controllers you have.

{% include integrations/config_flow.md %}
