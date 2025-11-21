---
title: Mammotion
description: Instructions on how to integrate Mammotion robotic lawn mowers with Home Assistant.
ha_category:
  - Lawn Mower
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mikey0000'
ha_domain: mammotion
ha_platforms:
  - lawn_mower
ha_integration_type: integration
ha_quality_scale: bronze
---

The Mammotion integration provides BLE and Wi-Fi connectivity with Mammotion products from Home Assistant.

## Prerequisites

Mammotion logins only allow one device to be logged in at a time. To use this integration you will need to create a separate account just for Home Assistant:

To create the separate account:

1. Sign up via the Mammotion App with a new email address and password, SSO such as google is not supported.
2. Sign into your main account and share the products you want to control with the new account.
3. Sign into the new account and accept the shared products.


{% configuration_basic %}
Username:
description: Your Mammotion account ID/email
Password:
description: Your Mammotion account password
{% endconfiguration_basic %}

### Lawn mower

The integration will create a lawn mower entity to control the mower. This entity can:

- Pause mowing
- Return to dock
- Status monitoring



{% enddetails %}
