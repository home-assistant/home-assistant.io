---
title: Fuelprices.dk
description: Example document structure and text blocks for integration documentation.
ha_release: 2025.3
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@MTrab'
ha_domain: dk_fuelprices
ha_integration_type: hub
ha_platforms:
  - sensor
ha_quality_scale: bronze
related:
  - url: https://fuelprices.dk
    title: Fuelprices.dk
---

The **Fuelprices.dk** {% term integration %} uses the **[Fuelprices.dk API](https://fuelprices.dk)** as a source for current fuel price data for Danish fuel providers.

The {% term integration %} provides a sensor with the current pump price for the selected station.
It also provides an *optional* last_update sensor for the selected station.

All station data and prices are as provided by the companies.

## Prerequisites

1. Go to **[Fuelprices.dk](https://fuelprices.dk)**
2. Click **Registrering**
3. Fill in your **name** and **email address**
4. Press **Opret bruger**
5. Check your email for the required API key
   
{% include integrations/config_flow.md %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}


## Companies currently supported

The supported companies can be seen on **[Fuelprices.dk Companies](https://fuelprices.dk/selskaber)**