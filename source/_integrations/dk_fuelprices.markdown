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
ha_integration_type: integration
ha_quality_scale: bronze
related:
  - url: https://fuelprices.dk
    title: Fuelprices.dk
---

The **Fuelprices.dk** {% term integration %} uses the [Fuelprices.dk API](https://fuelprices.dk) as a source for current fuel price data for Danish fuel providers.<br/>

{% include integrations/config_flow.md %}

{% configuration_basic  %}
API key:
  description: The API key acquired from [Fuelprices.dk](https://fuelprices.dk/registrer)
{% endconfiguration_basic  %}

## Companies currently supported

The supported companies can be seen on [Fuelprices.dk Companies](https://fuelprices.dk/selskaber)