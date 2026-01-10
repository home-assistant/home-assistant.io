---
title: unRAID
description: Instructions on how to integrate your unRAID server with Home Assistant.
ha_category:
  - Sensor
  - System monitor
ha_release: "2026.2"
ha_iot_class: Local Polling
ha_codeowners:
  - "@ruaan-deysel"
ha_domain: unraid
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
ha_quality_scale: platinum
---

The **unRAID** {% term integration %} allows you to monitor and control your [unRAID](https://unraid.net/) server from Home Assistant. This integration connects via the unRAID GraphQL API, which is available in unRAID 7.2.0 and newer.

{% include integrations/config_flow.md %}

## Prerequisites

Before setting up this integration, you need to generate an API key on your unRAID server:

1. Log in to your unRAID web interface.
2. Go to **Settings** > **Management Access** > **API Keys**.
3. Select **Add API Key**.
4. Set the **Role** to **ADMIN** (required for full functionality).
5. Copy the generated API key for use during setup.

{% important %}
The API key must have the **ADMIN** role to access all features. A key with lower permissions may result in limited functionality.
{% endimportant %}

## Configuration options

The following options are available during setup:

{% configuration_basic %}
Server IP or Hostname:
  description: The IP address (like `192.168.1.100`) or hostname of your unRAID server.
API Key:
  description: The API key generated from your unRAID server with ADMIN role permissions.
HTTP Port:
  description: The HTTP port (default 80). Only change if modified in unRAID **Settings** > **Management Access**.
HTTPS Port:
  description: The HTTPS port (default 443). Only change if modified in unRAID **Settings** > **Management Access**.
{% endconfiguration_basic %}

## Supported functionality

The **unRAID** integration provides the following entities.

### Sensors

#### System sensors

The integration creates the following system-level sensors:

- **CPU usage**: Current CPU utilization percentage
- **RAM usage**: Current memory usage with free/used/total in attributes
- **CPU temperature**: Processor temperature (if available)
- **CPU power**: Processor power consumption in watts (if available)
- **Uptime**: System uptime as a timestamp
- **Active notifications**: Count of unread notifications on the unRAID server

#### Array sensors

- **Array state**: Current state of the disk array (like Started or Stopped)
- **Array usage**: Percentage of array capacity used with detailed size attributes
- **Parity check progress**: Progress percentage during parity operations

#### Disk sensors

For each disk in your array (including parity, data, and cache disks):

- **Temperature**: Current disk temperature
- **Usage**: Disk usage percentage with size details in attributes

#### Share sensors

For each user share configured on your server:

- **Usage**: Share usage percentage with free/used/total size attributes

#### Flash drive sensor

- **Flash usage**: USB flash drive usage for the unRAID boot device

#### UPS sensors

If your unRAID server has a UPS connected:

- **Battery level**: Current UPS battery percentage
- **Load**: UPS load percentage
- **Runtime**: Estimated remaining battery runtime
- **Power**: Current power draw in watts

## Data updates

The integration polls your unRAID server for updates. The default polling interval is 30 seconds. You can [define a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval) if needed.

{% note %}
Frequent polling will prevent disks from spinning down. Consider increasing the polling interval if disk spin-down is important to you.
{% endnote %}

## Known limitations

- Requires unRAID 7.2.0 or newer (GraphQL API v4.21.0+)
- The API key must have ADMIN role for full functionality
- Some sensors may not be available depending on your hardware configuration (like CPU temperature, which requires motherboard support)

## Troubleshooting

### Cannot connect error

#### Symptom: "Cannot connect to server"

When trying to set up the integration, the form shows a connection error.

#### Description

This means Home Assistant cannot reach your unRAID server on the network.

#### Resolution

To resolve this issue, try the following steps:

1. Verify the IP address or hostname is correct and reachable from Home Assistant.
2. Ensure the correct HTTP/HTTPS ports are configured.
3. Check that your unRAID server is running and accessible on your network.

### Invalid authentication error

#### Symptom: "Invalid API key"

When trying to set up the integration, the form shows an authentication error.

#### Description

This means the API key provided is incorrect or does not have sufficient permissions.

#### Resolution

To resolve this issue, try the following steps:

1. Verify the API key is correct and has not expired.
2. Ensure the API key has the ADMIN role assigned.
3. Try generating a new API key in unRAID **Settings** > **Management Access** > **API Keys**.

### Unsupported version error

#### Symptom: "Unsupported unRAID version"

When trying to set up the integration, the form shows a version compatibility error.

#### Description

This integration requires unRAID 7.2.0 or newer with GraphQL API support.

#### Resolution

Update your unRAID server to version 7.2.0 or later.

### Missing sensors

#### Symptom: Some sensors are not available

Expected sensors are missing from the integration.

#### Description

Some sensors require specific hardware or configuration to be available.

#### Resolution

Check the following requirements:

- **CPU temperature**: Requires motherboard sensor support
- **CPU power**: Requires processor power monitoring support
- **UPS sensors**: Requires a UPS connected and configured in unRAID

## Removing the integration

{% include integrations/remove_device_service.md %}

After removing the integration, you may optionally delete the API key from your unRAID server under **Settings** > **Management Access** > **API Keys**.
