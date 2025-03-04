---
title: Russound RIO
description: Instructions on how to integrate Russound RIO devices into Home Assistant.
ha_category:
  - Media player
ha_release: 0.49
ha_iot_class: Local Push
ha_domain: russound_rio
ha_platforms:
  - diagnostics
  - media_player
ha_codeowners:
  - '@noahhusby'
ha_config_flow: true
ha_integration_type: integration
ha_quality_scale: silver
ha_zeroconf: true
---

The Russound RIO {% term integration %} allows you to control Russound devices that make use of the RIO protocol.

The platform automatically discovers all enabled zones and sources. Each zone is added as a media player device with the enabled sources available as inputs. Media information is supported if the selected source reports it. The integration allows you to navigate presets, control volume of all zones, and play radio stations all from your Home Assistant dashboard.

## Supported devices

This integration allows you to connect the following controllers:

- Russound MBX-PRE
- Russound MBX-AMP
- Russound MCA-C3
- Russound MCA-C5
- Russound MCA-66
- Russound MCA-88
- Rusosund MCA-88x
- Russound XSource
- Russound XZone4
- Russound XZone70V
- Russound XStream-X5

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: The IP address of your device can be found by navigating to the device on the [Russound app](https://www.russound.com/russound-app) and selecting `Settings`. If you are using a third-party RS232 to IP adapter, refer to the user manual about finding the IP address.
Port:
    description: The port of your device. This is `9621` on all devices except for the XZone4, which uses ports 9621-9624. The port may be different if a RS232 to IP adapter is used.
{% endconfiguration_basic %}

## Data updates

Russound RIO devices push data directly to Home Assistant, enabling immediate updates for device state changes, media information, and playback status.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Troubleshooting

### There is a delay on getting the current status

Some older Russound devices have a slight delay before posting a new status to Home Assistant. 
This can be resolved by updating the unit to the latest firmware.
