---
description: Connect ChirpStack LoRaWAN applications to Home Assistant.
ha_release: 2026.11
ha_domain: chirpstack
---

The **ChirpStack** {% term integration %} connects your [ChirpStack](https://www.chirpstack.io/) LoRaWAN network to Home Assistant. Select a tenant and its applications to make their devices available to [LoRaWAN](/integrations/lorawan/) device integrations.

## Supported devices

Install a LoRaWAN device integration to add sensors or controls for its supported models.

## Prerequisites

- A running ChirpStack v4 server with devices registered in an application.
- Access from Home Assistant to the server's gRPC API. If you use a reverse proxy, configure it to forward gRPC traffic.
- Device event retention enabled in ChirpStack.
- A ChirpStack API key with access to the tenant and its applications, devices, and device profiles.
- The tenant UUID if your key is restricted to one tenant. You can find it in the URL after opening the tenant in ChirpStack.

Create an API key in ChirpStack's **API keys** page, either at server level or inside the tenant. A read-only key can receive data, but device commands require write access.

Use a device profile linked to the matching model in ChirpStack's global device catalog so Home Assistant can identify the manufacturer and model.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Endpoint:
  description: "The ChirpStack server address, such as `http://192.168.1.20:8080`. You can paste a URL from the ChirpStack web interface; Home Assistant keeps the scheme, host, and port. Use `https://` for a secure connection with a trusted certificate."
API key:
  description: "The API key created in ChirpStack."
Tenant:
  description: "Select a tenant from the list. For a tenant-scoped key, enter its UUID instead. This step is skipped when the key can list exactly one tenant."
Applications:
  description: "Select one or more applications. Only devices in these applications are available to Home Assistant."
{% endconfiguration_basic %}

Home Assistant discovers device integrations for the selected applications. Confirm them to add supported devices. To connect another tenant, add another ChirpStack entry.

## Data updates

Device readings arrive through ChirpStack's live event stream. The integration checks for added and removed devices every 30 seconds. If the connection fails, Home Assistant retries it automatically. If ChirpStack rejects the API key, Home Assistant asks you to authenticate again.

## Known limitations

- ChirpStack v3 and gRPC-Web endpoints are not supported.
- Devices must use a recognized manufacturer and model identity in their device profile.
- Measurements sent while Home Assistant is offline are not recovered.

## Troubleshooting

{% details "Cannot connect" %}

### Symptom: Setup reports a connection error

#### Description

Home Assistant cannot reach the ChirpStack gRPC API.

#### Resolution

Check the endpoint scheme and port, firewall rules, and reverse proxy configuration. The proxy must forward gRPC traffic as well as the web interface.

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

Home Assistant cannot identify the device model or has not received a reading.

#### Resolution

Check that the applications contain devices and that their profiles identify a model supported by a Home Assistant device integration. A custom payload formatter does not provide the manufacturer and model identity.

If devices appear but readings remain unknown, check that ChirpStack retains device events and that the Home Assistant and ChirpStack clocks are synchronized. Readings update when an uplink arrives.

{% enddetails %}

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing the ChirpStack entry disconnects that tenant from Home Assistant and removes its devices from the corresponding device integrations. It does not delete devices or applications from ChirpStack.
