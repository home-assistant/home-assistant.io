---
title: Mammotion
description: Instructions on how to integrate Mammotion robotic lawn mowers with Home Assistant.
ha_category:
  - Lawn Mower
ha_release: 2026.01
ha_iot_class: Cloud Push
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

Mammotion logins only allow one device to be logged in at a time. To use this integration you will need to create a separate account just for Home Assistant and share devices to that account.

To create the separate account:

1. Sign up using the Mammotion App with an email address you plan to use just with Home Assistant, SSO such as Google is not officially supported though Google email addresses do work.
2. Sign into your main account and share the devices you want to control with the new account.
3. Sign into the new account and accept the shared devices.

{% include integrations/config_flow.md %}

Use your new account credentials in the the follw

{% configuration_basic %}
Email:
description: Your Mammotion account email
Password:
description: Your Mammotion account password
{% endconfiguration_basic %}

## Lawn mower

The integration will create a lawn mower entity to control the mower. This entity can:

- Pause/Resume mowing
- Return to dock
- Status monitoring

{% enddetails %}

## Known issues
Because Home Assistant now talks to your device, this can sometimes cause issues with making changes using the Mammotion App, though the integration will stop communicating when it sees the device is in setup states, the device will continue to work as expected even if you see a delay visually on your phone when setting up zones, areas or channels. 

If this becomes a problem, disable the integration, perform your changes, then re-enable.

## Troubleshooting

Timeout issues: If you have blocked traffic to China, you will need to unblock it for this integration to work.


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}