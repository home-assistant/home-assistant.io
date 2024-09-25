---
title: Weheat
description: Instructions on setting up Weheat within Home Assistant.
ha_category:
  - Energy
  - Climate
  - Sensor
ha_iot_class: Cloud Polling
ha_release: "2024.10"
ha_config_flow: true
ha_codeowners:
  - '@jesperraemaekers'
  - '@kjell-van-straaten'
ha_domain: weheat
ha_platforms:
  - sensor
ha_integration_type: integration
---

The **Weheat** {% term integration %} allows you to display your [Weheat](https://www.weheat.nl/) devices through Home Assistant.

## Prerequisites

- You need a Weheat account, **username**, and **password**
- When adding the integration in Home Assistant, you will be prompted to enter a **Name**, **Client ID**,  and **Client Secret**.
  - The name is arbitrary, the ID and secret are provided in the [knowledge base](https://support.weheat.nl/s/article/Is-er-een-offici%C3%ABle-Home-Assistant-integratie).
- During setup of the integration in Home Assistant, you will be redirected to the Weheat login provider. Log in using your **username** and **password**.
  - After login, select **link account** to link your account.

{% include integrations/config_flow.md %}

## Entities

### Sensors

The Weheat integration provides the following sensors:

- **Output power**:
- **Input power**:
- **COP**:

