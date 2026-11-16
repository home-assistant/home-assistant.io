---
title: Karaca Connect
description: Monitor the status of compatible Karaca Connect smart tea makers.
ha_release: 2026.12
ha_domain: karaca_connect
ha_categories: [appliances_cleaning.cooking]
ha_iot_class: Cloud Polling
ha_integration_type: device
---

The **Karaca Connect** integration connects Home Assistant to a supported Karaca smart tea maker through the Karaca Connect cloud service. It lets you monitor the current operating status of your tea maker.

This community-developed integration is not affiliated with or endorsed by Karaca. It uses an undocumented cloud API, so functionality may change if the service is updated.

## Supported devices

The following model has been verified with the original community integration:

- Karaca Çaysever Robotea Pro Connect 4in1

Other Karaca appliances have not been verified and should not be assumed to work.

## Prerequisites

Before configuring the integration, you need:

- A Karaca Connect account.
- A supported device already added to that account using the manufacturer's app.
- An internet connection for Home Assistant and the device.

{% include integrations/config_flow.md %}

Enter the email address and password for your Karaca Connect account. If the account has more than one device, select the device you want to monitor.

## Supported functionality

The first Home Assistant Core version provides a single read-only sensor.

### Sensors

- **Status**: Displays the operating mode reported by the Karaca Connect cloud API.

Other features of the separate community integration, such as initiating tea brewing or changing notification settings, are not included in the initial Home Assistant Core integration.

## Data updates

Home Assistant polls the Karaca Connect cloud API for device status every 60 seconds. The device's status depends on the availability and responsiveness of the manufacturer's cloud service.

## Known limitations

- The integration requires Karaca Connect cloud access and does not communicate locally with the device.
- Only the Karaca Çaysever Robotea Pro Connect 4in1 has been confirmed as supported.
- The cloud API is undocumented and may change without notice.
- This initial integration monitors device status only; it cannot start, stop, or reconfigure the tea maker.
- The separate HACS community integration uses the same domain. Do not run both versions side by side; a migration path has not been verified.

## Troubleshooting

If Home Assistant cannot connect, confirm that the Karaca Connect mobile app can reach the device and that your credentials still work. Also check that Home Assistant can access the internet.

If the sensor is unavailable, the device or the Karaca cloud service might be temporarily unreachable. Try checking the manufacturer's app before making changes in Home Assistant.

## Removing the integration

{% include integrations/remove_device_service.md %}
