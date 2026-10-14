---
title: ChirpStack
description: Connect ChirpStack LoRaWAN applications to Home Assistant.
ha_category:
  - Network
ha_release: 2026.11
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: chirpstack
ha_integration_type: hub
---

The **ChirpStack** {% term integration %} connects your [ChirpStack](https://www.chirpstack.io/) LoRaWAN network to Home Assistant. Select a tenant and its applications to make their devices available to LoRaWAN device integrations.

ChirpStack manages the connection. Device integrations create the sensors and controls for supported models. For example, a supported temperature sensor can supply readings to a heating automation.

## Supported devices

Device support depends on the installed LoRaWAN device integrations. This connection integration does not create entities or actions itself.

## Prerequisites

- A running ChirpStack v4 server with devices registered in an application.
- Access from Home Assistant to the server's gRPC API. A reverse proxy that exposes only the web interface is not sufficient.
- Device event retention enabled in ChirpStack so Home Assistant can receive device events.
- A ChirpStack API key with access to the tenant and its applications, devices, and device profiles.
- The tenant UUID if your key is restricted to one tenant. You can find it in the URL after opening the tenant in ChirpStack.

Create an API key in ChirpStack's **API keys** page, either at server level or inside the tenant. A read-only key can receive data, but device commands require write access.

Use ChirpStack's global device profiles with a recognized device identity so Home Assistant can identify the manufacturer and model. A device with an unrecognized profile will not be exposed by a device integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Endpoint:
  description: "The ChirpStack gRPC address, including the scheme and port but no path, such as `http://192.168.1.20:8080`. Use `https://` for a TLS endpoint with a trusted certificate."
API key:
  description: "The API key created in ChirpStack."
Tenant:
  description: "Select a tenant from the list. For a tenant-scoped key, enter its UUID instead. This step is skipped when the key can list exactly one tenant."
Applications:
  description: "Select one or more applications. Only devices in these applications are available to Home Assistant."
{% endconfiguration_basic %}

Add another ChirpStack integration entry to connect another tenant. Home Assistant discovers matching device integrations from the selected applications. Confirm those integrations to add their supported devices.

## Data updates

Device readings arrive through ChirpStack's live event stream. The integration checks for added and removed devices every 30 seconds. If the connection fails, Home Assistant retries it automatically. If ChirpStack rejects the API key, Home Assistant asks you to authenticate again.

## Known limitations

- ChirpStack v3 and gRPC-Web endpoints are not supported.
- Devices must use a recognized manufacturer and model identity in their device profile.
- Devices added while Home Assistant is offline are discovered after reconnection. The integration does not recover missed measurements.
- A sleeping sensor updates when it next transmits. Connecting the integration does not make the sensor transmit immediately.

The integration uses the [`lorawan-connection`](https://github.com/home-assistant-libs/lorawan-connection) Python library and its ChirpStack backend.

## Troubleshooting

{% details "Cannot connect" %}

### Symptom: Setup reports a connection error

#### Description

Home Assistant cannot reach the ChirpStack gRPC API.

#### Resolution

Check the endpoint scheme and port, firewall rules, and reverse proxy configuration. Being able to open the ChirpStack web interface does not confirm that the gRPC API is reachable.

{% enddetails %}

{% details "API key rejected" %}

### Symptom: Setup rejects the API key

#### Description

The key cannot access the selected tenant or applications.

#### Resolution

Check that the key has access to the selected tenant, applications, devices, and device profiles. A tenant-scoped key cannot list tenants, so supply the tenant UUID when asked.

{% enddetails %}

{% details "No devices or readings appear" %}

### Symptom: Devices are missing or sensor readings remain unknown

#### Description

Device discovery requires a recognized model. Readings require incoming device events.

#### Resolution

Check that the applications contain devices and that their profiles identify a model supported by a Home Assistant device integration. A custom payload formatter does not provide the manufacturer and model identity.

If devices appear but readings remain unknown, check that ChirpStack retains device events and that the Home Assistant and ChirpStack clocks are synchronized. Readings update when an uplink arrives.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the ChirpStack entry disconnects that tenant from Home Assistant and removes its devices from the corresponding device integrations. It does not delete devices or applications from ChirpStack.
