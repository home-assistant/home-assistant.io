---
title: FortiOS
description: Monitor your Fortinet FortiGate firewall and track devices connected to your network from Home Assistant.
ha_category:
  - Network
  - Presence detection
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.97
ha_domain: fortios
ha_platforms:
  - device_tracker
  - sensor
ha_codeowners:
  - '@kimfrellsen'
ha_integration_type: hub
related:
  - docs: /integrations/device_tracker/
    title: Device tracker
---

The **FortiOS** {% term integration %} connects Home Assistant to your [Fortinet](https://www.fortinet.com) FortiGate firewall. It tracks devices connected to your network and monitors the performance of your firewall, giving you presence detection and system health information all in one place.

The integration has been verified on FortiGate appliances and FortiGate VM running FortiOS 6.4.x/7.0.x/7.2.x/7.4.x/7.6.x/8.0.x. The minimum supported version is FortiOS 6.4.3.

## Prerequisites

Before adding the integration, you need to create an API access token on your FortiGate:

1. Log in to your FortiGate web interface.
2. Go to **System** > **Administrators**.
3. Select **Create New** > **REST API Admin**.
4. Give the account a name, for example, **Home Assistant**.
5. Under **Trusted Hosts**, enter the IP address of your Home Assistant instance to restrict access.
6. For **Administrator Profile**, assign a read-only profile. The integration only needs read access.
7. Select **OK**. Copy and save the generated API token, as it is only shown once.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of your FortiGate firewall.
Port:
  description: The HTTPS management port of your FortiGate firewall. The default is `443`.
Access token:
  description: The API access token you generated on your FortiGate device.
Virtual domain (VDOM):
  description: The virtual domain to connect to. The default is `root`. If you are not using virtual domains, leave this as the default.
Verify SSL certificate:
  description: Whether to verify the SSL certificate of the FortiGate. In most home setups, you will not have a certificate signed by a public certificate authority, so this can be left disabled.
{% endconfiguration_basic %}

## Supported functionality

### Entities

#### Sensors

The **FortiOS** integration provides the following sensors for monitoring the performance of your FortiGate:

- **CPU usage**: The current CPU load of the firewall, in percent.
- **Memory usage**: The current memory usage of the firewall, in percent.
- **Sessions**: The total number of active network sessions, combining both IPv4 and IPv6 sessions.
- **Session rate**: The rate at which new sessions are being established, in sessions per second, combining both IPv4 and IPv6.

#### Device tracker

The integration tracks all devices with a MAC address that your FortiGate can see. This includes devices connected via Ethernet and Wi-Fi, as well as devices discovered through <abbr title="Link Layer Discovery Protocol">LLDP</abbr>.

Each tracked device exposes the following attributes:

- **IP address**: The current IPv4 address of the device.
- **IPv6 address**: The current IPv6 address of the device, if available.
- **Hostname**: The hostname of the device, if available.
- **Last seen**: The time the device was last seen on the network.
- **Hardware vendor**: The vendor of the device's hardware.
- **Hardware type**: The type of hardware.
- **OS name**: The operating system running on the device, if detectable.
- **OS version**: The version of the operating system, if detectable.

## Data updates

The **FortiOS** integration {% term polling polls %} your FortiGate every 30 seconds for system performance data and connected device information. Devices are considered active if they have been seen in the last 5 minutes.

## Known limitations

- The integration requires FortiOS 6.4.3 or later.
- API access must be enabled on the FortiGate, and the API token must have read access to the device.

## Troubleshooting

### Can't set up the integration

#### Symptom: "Failed to connect to the FortiOS device"

The integration cannot reach your FortiGate.

#### Resolution

To resolve this issue, try the following steps:

1. Verify that you can reach the FortiGate from your Home Assistant instance by checking the host and port settings.
2. If you are using a custom port, make sure it matches the HTTPS port configured on the FortiGate.
3. Check that your FortiGate's REST API is enabled and accessible from the IP address of your Home Assistant instance. If you set trusted hosts when creating the API token, make sure your Home Assistant IP address is listed.

#### Symptom: "Invalid authentication token"

The access token is not accepted by the FortiGate.

#### Resolution

To resolve this issue, try the following steps:

1. Make sure you copied the full token correctly. The token is only shown once when created.
2. If you are unsure, create a new API token on the FortiGate and use that instead.

#### Symptom: "The FortiOS version is not supported"

Your FortiGate is running a version of FortiOS that is too old.

#### Resolution

The integration requires FortiOS 6.4.3 or later. Upgrade your FortiGate firmware to a supported version.

### Devices are not showing up

Make sure your FortiGate can see the devices you are expecting. Devices need to have a MAC address visible to the FortiGate. Check the **FortiView** > **Sources** page on your FortiGate to confirm the devices appear there.

Discovered entities in Home Assistant are disabled by default to avoid cluttering your entity list. When you want an entity to be visible in Home Assistant, you need to enable it.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
