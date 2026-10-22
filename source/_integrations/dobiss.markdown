---
title: Dobiss
description: Control lights connected to a Dobiss NXT controller.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: "2026.11"
ha_config_flow: true
ha_codeowners:
  - '@koen-fermax'
ha_domain: dobiss
ha_platforms:
  - light
ha_integration_type: hub
---

The Dobiss integration connects Home Assistant to a [Dobiss](https://www.dobiss.com/) NXT controller using its local developer API. You can turn lights on and off and adjust the brightness of dimmable lights.

## Supported devices

The integration supports light outputs connected to NXT, DALI, relay, universal dimmer, and 0–10 V modules, when those outputs are configured as lights in Dobiss. It has been tested with NXT firmware 4.40.

## Unsupported devices

Controllers without the NXT developer API are not supported. RGB controllers, Zigbee devices, covers, temperature zones, and sensors are not exposed by this integration.

## Prerequisites

1. Connect your Home Assistant system and Dobiss NXT controller to the same network.
2. Sign in to the NXT web interface as an administrator.
3. In the general settings, enable the API. Refer to the [Dobiss developer API instructions](https://support.dobiss.com/books/nl-dobiss-nxt/page/developer-api).
4. Copy the API shared secret to use during setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The controller's local hostname or IP address, such as `dobiss.local` or `192.168.1.20`. You can include a port, such as `192.168.1.20:8080`. Do not include `http://`, `https://`, or a path."
API secret:
  description: "The shared secret from the API settings on the NXT controller. This is different from the administrator password."
Use HTTPS:
  description: "Enable this if your local controller provides HTTPS with a certificate trusted by Home Assistant. This option is disabled by default."
{% endconfiguration_basic %}

## Supported functionality

### Lights

Each supported output appears as a light with its configured Dobiss name.

- Switch lights on and off.
- Adjust brightness for dimmable outputs.

You can use the standard [light actions](/integrations/light/) in automations and scripts.

## Data updates

The integration requests light states through the local REST API every 10 seconds. After the controller accepts a command from Home Assistant, the displayed state updates immediately. The next poll confirms or corrects that state. Changes made with physical buttons appear after the next poll.

When you turn on a dimmer without specifying a brightness, the immediate display uses its current nonzero brightness or 100% if it was off. The next poll reports the controller's actual brightness.

## Known limitations

The integration uses polling and does not subscribe to WebSocket updates. Reload the integration after adding or renaming outputs in Dobiss. Dobiss scenes and automations are not imported.

The HACS integration [kesteraernoudt/dobiss](https://github.com/kesteraernoudt/dobiss) uses the same integration domain. Automatic migration from that integration is not supported. Before replacing it, back up your Home Assistant configuration and remove the existing custom integration. Check any dashboards, automations, and scripts that refer to its entities after setting up this integration.

## Troubleshooting

{% details "Cannot connect to the controller" %}

### Symptom

Setup reports that it cannot connect, or lights become unavailable.

#### Description

Home Assistant cannot retrieve the controller's light states.

#### Resolution

Check the controller address, network access, and whether the developer API is enabled. Check that the controller and output modules are online. If you enabled **Use HTTPS**, use a certificate trusted by Home Assistant and a hostname that matches the certificate.

{% enddetails %}

{% details "Authentication fails" %}

### Symptom

Setup reports an authentication error.

#### Description

The controller rejects the API credentials.

#### Resolution

Enter the API shared secret from the controller settings, rather than the administrator password. If the secret has changed, remove the integration and add it again with the new secret.

{% enddetails %}

## Removing the integration

Remove the integration through Home Assistant using the following steps.

{% include integrations/remove_device_service.md %}

Removing the integration does not alter the controller configuration. You can disable the developer API in Dobiss if no other application uses it.
