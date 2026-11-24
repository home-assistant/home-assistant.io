---
description: Instructions on how to integrate Yardian device within Home Assistant.
ha_release: 2023.9
ha_domain: yardian
---

The **Yardian** {% term integration %} allows you to control your [Yardian Smart Sprinkler Controller](https://yardian.com/products/yardian-pro-smart-sprinkler-controller/).

There is currently support for the following platforms within Home Assistant:

- Switch - Allows you to view the status of zones and control them.
- Binary sensor - Shows watering status along with standby and freeze prevent diagnostics. Per-zone enabled diagnostics are provided but [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

{% include integrations/config_flow.md %}

During the configuration, you will have to manually set the **Host** and the **Access Token**. You can find them inside your [Yardian App](https://yardian.com/app/).

![Yardian Host/Token Location](/images/integrations/yardian/yardian_config_flow.jpg)

## Supported functionality

The **Yardian** integration provides the following entities.

### Binary sensors

- **Watering running**: Is `on` when a zone is currently irrigating.
- **Standby**:  Is `on` when the controller is in standby mode.
- **Freeze prevent**: Turns on when the controller enables freeze prevention.
- **Zone enabled**: `On` if a zone is enabled. These entities are disabled by default and created per zone.

### Button

- **Stop all irrigation**: Enabled by default. Pressing this button entity will immediately stop any currently active zone.
  
## Actions

{% include integrations/actions.md %}

## Troubleshooting

### Updating the access token

If Home Assistant reports an authentication error, go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Yardian**, and follow the reauthentication prompt. Enter the current access token from your [Yardian app](https://yardian.com/app/).

Home Assistant validates the token for the same controller and keeps your existing devices, entities, and settings.

If you changed the access token and no prompt appears, reload the Yardian integration to check the token again. Temporary connection failures are retried automatically and do not require reauthentication.

## Removing the integration

To remove Yardian from Home Assistant, delete its integration entry. You can continue to use your controller in the Yardian app.

{% include integrations/remove_device_service.md %}
