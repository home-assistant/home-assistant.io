---
title: TrueNAS CE
description: Instructions on how to monitor a TrueNAS Community Edition system with Home Assistant.
ha_categories:
  - computers_network.nas_servers
ha_release: "2026.12"
ha_iot_class: Local Polling
ha_codeowners:
  - '@kayl-codes'
ha_domain: truenas_ce
ha_config_flow: true
ha_integration_type: device
ha_platforms:
  - sensor
ha_quality_scale: bronze
---

The **TrueNAS CE** {% term integration %} lets you monitor a [TrueNAS](https://www.truenas.com/) Community Edition system from Home Assistant. It reads the system health and the network traffic of your NAS over the TrueNAS API.

Common use cases include:

- Getting notified when the CPU temperature or the memory usage stays high.
- Following the CPU load and the network traffic of your NAS on a dashboard.
- Getting notified when your NAS can no longer be reached.

## Supported devices

The integration supports systems running TrueNAS Community Edition (formerly TrueNAS SCALE) 25.04 or later.

## Unsupported devices

The following systems are not supported by the integration:

- TrueNAS versions earlier than 25.04, including TrueNAS CORE
- Development and nightly builds of TrueNAS

## Prerequisites

Home Assistant needs to reach TrueNAS over the network and needs an API key. To create the API key:

1. Sign in to the TrueNAS web interface.
2. Go to **Credentials** > **Users**, and either use an existing user or create a dedicated one, for example `HomeAssistant`.
3. Make sure **TrueNAS Access** is turned on for that user. An API key of a user without TrueNAS access is rejected, even though the key itself is valid.
4. Give the user a role that can read the system information. An API key has the privileges of its user. The integration only reads data, and the **Full Admin** role is the simplest way to make sure it can read everything it needs.
5. Create an API key for that user, and copy it. You need it during setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your TrueNAS system, without `https://` or a path. For example, `192.168.1.100`. If TrueNAS uses a non-default HTTPS port, add it after a colon. For example, `192.168.1.100:8443`."
API key:
  description: "The API key you created in the prerequisites."
Verify SSL certificate:
  description: "Whether to verify the SSL certificate of your TrueNAS system. This is turned off by default because TrueNAS comes with a self-signed certificate. Turn it on if your system uses a certificate that Home Assistant can verify."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one device for each TrueNAS system, named after its hostname.

### Sensors

The system sensors are diagnostic entities:

- **Uptime**
  - **Description**: The time your system last started.
- **Temperature**
  - **Description**: The CPU temperature.
  - **Remarks**: Only available if TrueNAS reports a CPU temperature when the integration starts. Virtual machines and hardware without a temperature sensor don't report one.
- **CPU usage**
  - **Description**: How much of the CPU is in use, in percent.
- **CPU load shortterm**, **CPU load midterm**, and **CPU load longterm**
  - **Description**: The system load average over 1, 5, and 15 minutes.
- **Memory usage**
  - **Description**: How much of the physical memory is in use, in percent.
- **Memory total**
  - **Description**: The size of the physical memory.
- **Memory free**
  - **Description**: The memory that is available for use.
- **ARC size**
  - **Description**: The size of the ZFS adaptive replacement cache in memory.

Each network interface has its own traffic sensors. For example, an interface called `eno1` has **eno1 RX** and **eno1 TX**:

- **_Interface_ RX**
  - **Description**: The rate at which the interface receives data.
- **_Interface_ TX**
  - **Description**: The rate at which the interface sends data.

The integration adds these sensors for every interface whose link is up. If an interface appears later, or its link comes up later, the sensors are added without a reload. If TrueNAS no longer reports an interface, its sensors become unavailable.

Memory sizes are shown in GiB and network traffic in MB/s by default. You can change the unit in the settings of each sensor.

## TrueNAS CE automation examples

These examples assume your TrueNAS system has the hostname `truenas`. The entity IDs start with the hostname of your system, so adjust them if yours is different.

{% include docs/paste_yaml_tip.md %}

### Automation: Getting notified when the CPU temperature stays high

This automation sends a notification when the CPU temperature stays above 80 °C for 10 minutes.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Temperature (`sensor.truenas_temperature`)
  - **Above**: `80`
  - **For**: 10 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for the CPU temperature notification" %}

{% example %}
automation: |
  alias: "Notify when the TrueNAS CPU temperature stays high"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.truenas_temperature
      above: 80
      for:
        minutes: 10
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The TrueNAS CPU has been above 80 °C for 10 minutes."
{% endexample %}

{% enddetails %}

### Automation: Getting notified when TrueNAS can't be reached

If a poll fails, the sensors become unavailable. This automation sends a notification when that lasts for 5 minutes.

- **Trigger**: State changed
  - **Entity**: CPU usage (`sensor.truenas_cpu_usage`)
  - **To**: `unavailable`
  - **For**: 5 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for the connection notification" %}

{% example %}
automation: |
  alias: "Notify when TrueNAS can't be reached"
  triggers:
    - trigger: state
      entity_id: sensor.truenas_cpu_usage
      to: "unavailable"
      for:
        minutes: 5
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "TrueNAS has not been reachable for 5 minutes."
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} TrueNAS every 60 seconds. CPU usage, memory usage, free memory, ARC size, temperature, and network traffic are averages over the last minute.

If a poll fails, all sensors become unavailable until a later poll succeeds. To poll at a different interval, you can [define a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval).

## Known limitations

- The integration only reads the system health and the network traffic. It doesn't report pools, disks, datasets, apps, or virtual machines, and it can't control your system.
- Home Assistant doesn't discover TrueNAS on your network, so you add it by entering the host.
- You can't change the host or the API key of an existing entry. To change them, delete the entry and add the integration again.
- Authentication gateways in front of TrueNAS are not supported. Cloudflare Access, Authelia, HTTP basic authentication, and similar services intercept the WebSocket connection before it reaches TrueNAS, so the API key never gets to TrueNAS. Use a local IP address or a VPN instead, or a reverse proxy that only terminates TLS and forwards the WebSocket connection unchanged.

## Troubleshooting

{% details "Setup reports invalid authentication" %}

### Symptom: "Invalid authentication"

When you add the integration, the form shows this error. An integration that was already set up reports "The TrueNAS API key was rejected", and its sensors are unavailable.

#### Description

TrueNAS rejected the API key. This doesn't always mean the key is wrong. TrueNAS also rejects a valid key if **TrueNAS Access** is turned off for its user.

#### Resolution

1. In TrueNAS, go to **Credentials** > **Users**, and check that **TrueNAS Access** is turned on for the user of the key.
2. Check that the API key still exists and hasn't expired. If it has, create a new one.
3. To use a new key, delete the entry and add the integration again.

{% enddetails %}

{% details "Setup reports missing permissions" %}

### Symptom: "The API key's user lacks the permissions to read the system information"

When you add the integration, the form shows this error. An integration that was already set up reports the same problem, and its sensors are unavailable.

#### Description

TrueNAS accepted the API key, but the role of its user doesn't allow reading the system information.

#### Resolution

1. In TrueNAS, go to **Credentials** > **Users**.
2. Give the user of the key a role that can read the system information, such as **Full Admin**.
3. Reload the integration.

{% enddetails %}

{% details "Setup fails to connect" %}

### Symptom: "Failed to connect"

When you add the integration, the form shows this error. An integration that was already set up keeps retrying, and its sensors are unavailable.

#### Description

Home Assistant couldn't open a secure connection to TrueNAS at the host you entered.

#### Resolution

1. Check that you can open the TrueNAS web interface over HTTPS at that host from your network.
2. If **Verify SSL certificate** is turned on, check that your system uses a certificate that Home Assistant can verify. The default self-signed certificate of TrueNAS can't be verified.
3. If you use a reverse proxy or an authentication gateway, try the local IP address of TrueNAS instead. Refer to [Known limitations](#known-limitations).

{% enddetails %}

If a problem remains, turn on [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and reload the integration. When the problem occurs again, turn debug logging off and include the log when you report the issue.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After removing the integration, you can delete the API key in TrueNAS under **Credentials** > **Users** if nothing else uses it.
