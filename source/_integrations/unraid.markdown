---
title: unRAID
description: Instructions on how to integrate your unRAID server with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Switch
  - System monitor
ha_release: "2026.2"
ha_iot_class: Local Polling
ha_codeowners:
  - "@ruaan-deysel"
ha_domain: unraid
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
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
  description: The IP address (for example, `192.168.1.100`) or hostname of your unRAID server.
API Key:
  description: The API key generated from your unRAID server with ADMIN role permissions.
HTTP Port:
  description: The HTTP port (default 80). Only change if modified in unRAID Settings > Management Access.
HTTPS Port:
  description: The HTTPS port (default 443). Only change if modified in unRAID Settings > Management Access.
{% endconfiguration_basic %}

## Sensors

### System sensors

The integration creates the following system-level sensors:

- **CPU usage**: Current CPU utilization percentage
- **RAM usage**: Current memory usage with free/used/total in attributes
- **CPU temperature**: Processor temperature (if available)
- **CPU power**: Processor power consumption in watts (if available)
- **Uptime**: System uptime as a timestamp
- **Active notifications**: Count of unread notifications on the unRAID server

### Array sensors

- **Array state**: Current state of the disk array (for example, Started, Stopped)
- **Array usage**: Percentage of array capacity used with detailed size attributes
- **Parity check progress**: Progress percentage during parity operations

### Disk sensors

For each disk in your array (including parity, data, and cache disks):

- **Temperature**: Current disk temperature
- **Usage**: Disk usage percentage with size details in attributes

### Share sensors

For each user share configured on your server:

- **Usage**: Share usage percentage with free/used/total size attributes

### Flash drive sensor

- **Flash usage**: USB flash drive usage for the unRAID boot device

### UPS sensors (if connected)

If your unRAID server has a UPS connected:

- **Battery level**: Current UPS battery percentage
- **Load**: UPS load percentage
- **Runtime**: Estimated battery runtime remaining
- **Power**: Current power draw in watts

## Binary sensors

### Disk health

For each disk in your array:

- **Disk health**: Indicates if the disk has SMART warnings or errors (problem sensor)

### Array status

- **Array started**: Indicates if the disk array is running
- **Parity check running**: Indicates if a parity operation is in progress
- **Parity valid**: Indicates if parity data is valid (problem sensor when invalid)

### UPS status

- **UPS connected**: Indicates if a UPS is connected and communicating

## Switches

### Docker containers

For each Docker container on your server:

- **Container switch**: Turn Docker containers on/off

### Virtual machines

For each virtual machine on your server:

- **VM switch**: Start/stop virtual machines

## Buttons

### Array controls

- **Start array**: Start the disk array
- **Stop array**: Stop the disk array (requires confirmation)

### Parity controls

- **Start parity check**: Start a non-correcting parity check
- **Start parity check (correcting)**: Start a correcting parity check
- **Pause parity check**: Pause the running parity operation
- **Resume parity check**: Resume a paused parity operation
- **Stop parity check**: Cancel the running parity operation

### Disk controls

For each disk:

- **Spin up**: Spin up the disk
- **Spin down**: Spin down the disk

## Data updates

The integration polls your unRAID server for updates. The default polling interval is 30 seconds. You can [define a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval) if needed.

{% note %}
Frequent polling will prevent disks from spinning down. Consider increasing the polling interval if disk spin-down is important to you.
{% endnote %}

## Known limitations

- Requires unRAID 7.2.0 or newer (GraphQL API v4.21.0+)
- The API key must have ADMIN role for full functionality
- Some sensors may not be available depending on your hardware configuration (for example, CPU temperature requires motherboard support)

## Troubleshooting

### Cannot connect error

- Verify the IP address or hostname is correct and reachable from Home Assistant.
- Ensure the correct HTTP/HTTPS ports are configured.
- Check that your unRAID server is running and accessible on your network.

### Invalid authentication error

- Verify the API key is correct and has not expired.
- Ensure the API key has the ADMIN role assigned.
- Try generating a new API key in unRAID Settings > Management Access > API Keys.

### Unsupported version error

- This integration requires unRAID 7.2.0 or newer.
- Update your unRAID server to the latest version.

### Missing sensors

Some sensors require specific hardware or configuration:

- **CPU temperature**: Requires motherboard sensor support
- **CPU power**: Requires processor power monitoring support
- **UPS sensors**: Requires a UPS connected and configured in unRAID

## Removing the integration

{% include integrations/remove_device_service.md %}

After removing the integration, you may optionally delete the API key from your unRAID server in **Settings** > **Management Access** > **API Keys**.
