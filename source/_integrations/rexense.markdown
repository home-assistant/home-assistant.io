---
title: Rexense
description: Control switches connected to a Rexense gateway over your local network.
ha_categories:
  - hubs_protocols.smart_home_hubs
ha_iot_class: Local Push
ha_quality_scale: bronze
# Draft target: confirm the first release after the Core integration is accepted.
ha_release: '2026.11'
ha_config_flow: true
ha_codeowners:
  - '@GorgeOu'
ha_domain: rexense
ha_platforms:
  - switch
ha_integration_type: hub
related:
  - docs: /docs/configuration/troubleshooting/
    title: Troubleshooting Home Assistant
---

The **Rexense** {% term integration %} connects Home Assistant to a Rexense gateway on your local network. It lets you turn paired switches on and off and receive their reported state without a cloud account or an MQTT broker.

{% note %}
This page is a draft for the first Rexense Core release. The release in the metadata is provisional; Rexense is not yet included in an official Home Assistant release.
{% endnote %}

## Supported devices

The manufacturer identifies the [RG5100](https://www.rexense.cn/product_cont_51_1819.html), with gateway software version 4.0.0 or later, as the supported gateway. It is available through business sales channels and supports local firmware upgrades. The local API must report `taxonomy_version` 3 or later. Gateway firmware and device model versions are separate requirements.

The TL0001 switch has been tested with device firmware `20260630 17:12` and gateway software version 4.0.0. The integration creates one switch entity for each endpoint that the gateway identifies as a switch with a writable on/off capability.

## Unsupported devices

- Gateways that do not provide device model version 3 or later.
- Devices that are not paired with the gateway.
- Lights, sensors, and other device types that require a different entity platform.

## Prerequisites

1. Connect Home Assistant and the gateway to a network where Home Assistant can reach the gateway.
2. Pair your TL0001 switch with the gateway using the Rexense web interface or the device's pairing instructions.
3. Obtain the gateway's hostname or IP address and WebSocket port. The default port is `8090`.
4. If the gateway requires authentication, obtain an API key from its administrator. Leave the key empty when authentication is disabled.

{% include integrations/config_flow.md %}

Enter the connection settings manually. The proposed first version does not include automatic discovery.

{% configuration_basic %}
Host:
  description: "The gateway's hostname or IP address, without a URL scheme or path."
Port:
  description: "The gateway's WebSocket port. Defaults to `8090`."
API key:
  description: "The complete API key provided by the gateway administrator. Leave empty when authentication is disabled."
Use secure WebSocket (WSS):
  description: "Enable when the gateway provides a secure WebSocket endpoint. Disabled by default."
Verify TLS certificate:
  description: "Validate the gateway's certificate when using WSS. Enabled by default."
{% endconfiguration_basic %}

## Supported functionality

### Switches

Turn a supported switch on or off using its Home Assistant entity. The gateway must report a writable on/off capability for the endpoint.

Endpoints on the same physical device appear together on its device page. Each endpoint has its own entity and stable identity. An endpoint alias configured on the gateway is used as its initial entity name; otherwise, it is named by its endpoint number.

## Data updates

State comes from gateway reports. An accepted command does not establish that the physical switch has changed. If no on/off value has been reported, the entity remains unknown. The integration receives updates through the local connection and does not poll for each state change.

If the connection is lost, entities become unavailable. The client attempts to reconnect and reload the device list. It does not automatically resend earlier control commands.

## Known limitations

- The proposed first version supports the switch platform only.
- Pair devices through the gateway before adding the integration. After pairing additional devices, reload the integration to create their entities.
- Gateway management, device removal, diagnostics, discovery, and additional entity platforms are outside this initial submission.
- To change the gateway address or API key, remove the integration and add it again. This version does not provide a reconfiguration or reauthentication flow.

## Troubleshooting

If setup cannot connect, check the gateway address, WebSocket port, and network access. The gateway's web interface port may differ from its WebSocket port.

If authentication fails, check that you entered the full API key and that the key is still valid. Leave the field empty only when gateway authentication is disabled.

If the gateway is reported as unsupported, check its firmware with the manufacturer. The gateway must provide device model version 3 or later.

If a switch remains unknown, use the gateway interface or a physical control to change its state and check whether the gateway reports the new value. Do not assume an unknown switch is off.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the integration does not unpair devices from the gateway or revoke the API key.
