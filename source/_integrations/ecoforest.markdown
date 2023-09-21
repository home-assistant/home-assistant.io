---
title: Ecoforest
description: Instructions on how to integrate Ecoforest fireplaces with Home Assistant.
ha_category:
  - Climate
ha_release: 2023.10
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@pjanuario'
ha_domain: ecoforest
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Ecoforest integration allows monitoring and control of local [Ecoforest](https://ecoforest.com) fireplaces in Home Assistant. These fireplaces are manufactured in Spain.

There is currently support for the following device platforms within Home Assistant:

- [Sensor](#sensor)

{% include integrations/config_flow.md discovery=False %}

<div class='note'>
Devices must first be bound to WiFi or LAN using the app or website provided by the device manufacturer. It is not possible to connect devices to WiFi using this integration.
</div>

### Credentials

To configure the Ecoforest integration you will need to enter your Ecoforest credentials which are the same ones you would use with the manufacturer app. The image bellow shows how to obtain the credentials:

- Username: use the serial number of the device as identified by 1.
- Password: use the first 8 characters of the wifi password as identified by 4.

![Ecoforest Credentials](/images/integrations/ecoforest/credentials.png)


## Supported models

Any Ecoforest device working with [Ecoforest Home](https://ecoforesthome.com/) should be supported, this integration is confirmed to support:

- Ecoforest Cordoba Glass (using firmware version `30Abr19_v2z`)

## Sensor

The Ecoforest integration exposes a sensor for the current ambient temperature

- Temperature: Current ambient temperature as read by the device probe.

## Troubleshooting

If you're trying to track down issues with this integration, set up logging for it.

### Debugging

To turn on debug logging in the integration configuration view or modify your `configuration.yaml` file in the `/config` directory and add the following:

```yaml
# Example configuration.yaml with logging for Ecoforest
logger:
  default: warning
  logs:
    homeassistant.components.ecoforest: debug
```
