---
title: TrueNAS
description: Instructions on how to integrate TrueNAS within Home Assistant.
ha_category:
  - Sensor
  - Switch
  - Binary sensor
  - Button
  - Update
ha_release: TBD
ha_iot_class: Local Polling
ha_domain: truenas_ce
ha_codeowners:
  - '@kayl-codes'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
  - update
ha_integration_type: device
ha_quality_scale: platinum
---

The **TrueNAS** {% term integration %} lets you monitor and control a [TrueNAS](https://www.truenas.com/) SCALE system from Home Assistant, using TrueNAS's native JSON-RPC 2.0 WebSocket API.

Common use cases include:

- Monitor system health (CPU, load, memory, temperature, ARC hit ratio, uptime), pools, disks and datasets.
- Get notified before a certificate expires, or before a pool/disk problem becomes critical.
- Start, stop and restart virtual machines, containers and services from an automation.
- Trigger replication, rsync, cloudsync and snapshot tasks on demand, or on your own Home Assistant schedule instead of only TrueNAS's built-in scheduler.
- Take an on-demand dataset snapshot, or lock/unlock an encrypted dataset, as part of a backup or security automation.
- Reboot or shut down the system remotely.

## Prerequisites

You need a TrueNAS SCALE system running **25.04 or later**, reachable from Home Assistant over the network (a local IP address or VPN is strongly recommended over a reverse proxy — see [Known limitations](#known-limitations)).

### Create an API key

1. Sign in to the TrueNAS web UI.
2. Go to **Credentials** > **Users**, and either use an existing user or create a dedicated one (for example `HomeAssistant`).
3. On TrueNAS 25.04+, an API key is tied to a user account and inherits that user's privileges. Since this integration performs control actions (reboot/shutdown, start/stop VMs/apps/services, run tasks) in addition to reading data, the user needs **TrueNAS Access** enabled with the **Full Admin** role. A key whose user has TrueNAS Access disabled, or only a restricted role, fails to authenticate even though the key itself is valid.
4. Create an API key for that user and copy it — you will need it during setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The TrueNAS hostname or IP address, without scheme or path (for example `192.168.1.100`). A non-default port can be appended with a colon (`192.168.1.100:8888`)."
API key:
  description: "The API key created above."
Verify SSL certificate:
  description: "Whether to verify the TLS certificate presented by TrueNAS. Keep this enabled unless you know why you need to disable it."
Data size unit:
  description: "Whether dataset, pool and memory sensors report sizes in `GB` (base 1000) or `GiB` (base 1024)."
{% endconfiguration_basic %}

## Configuration options

Most options are offered from the frontend. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **TrueNAS** integration, and select **Configure**.

{% configuration_basic %}
Poll interval:
  description: "How often TrueNAS is queried: 5, 10, 30, 60 (default), 120 or 300 seconds."
Data size unit:
  description: "`GB` (base 1000) or `GiB` (base 1024), applied to all dataset, pool and memory sensors."
Skip disabled cron jobs:
  description: "Hide cron jobs that are disabled in TrueNAS. Enabled by default."
Hide traffic sensors for disconnected network interfaces:
  description: "When enabled, traffic sensors are only created for connected interfaces. Disabled by default."
Monitored groups:
  description: "Enable or disable optional sensor groups (UPS, virtual machines, containers, cloudsync, replication, rsync tasks, snapshot tasks, datasets, directory services). Disabling a group skips its API query and removes its entities. System, network, pools, disks, apps, services and alerts are always monitored."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

System (CPU, load, memory, temperature, ARC hit ratio, uptime), pools, disks, datasets, network interfaces, certificates (expiry time and days remaining), cloudsync/replication/rsync/snapshot tasks, and apps (live CPU, memory, network and block I/O statistics).

### Binary sensors

Pool and disk health, network interface link state, directory services connectivity, container status and certificate-expired status.

### Switches

Enable or disable individual cron jobs.

### Buttons

Run a cron job, pool scrub (start/pause/resume/stop) and a diagnostic on-demand data refresh, independent of the regular poll interval.

### Update

Notifies when a TrueNAS system update is available.

## Actions

{% include integrations/actions.md %}

## Reauthentication

If the stored API key stops working (revoked, deleted, or its user's account disabled on TrueNAS), Home Assistant raises a [repair issue](/integrations/repairs/) instead of leaving every entity unavailable. Open the notification and enter a new API key to reconnect; existing entities, history and long-term statistics are preserved.

## Known limitations

- **Authentication gateways in front of TrueNAS are not supported.** Cloudflare Access, Authelia, HTTP basic auth and similar SSO/auth proxies intercept the WebSocket handshake before it reaches TrueNAS, so the API key never gets a chance to authenticate. Use a local IP address or VPN instead, or a plain TLS-terminating reverse proxy that forwards the WebSocket upgrade untouched.
- **TrueNAS development/nightly builds are not supported.** The integration is tested against stable TrueNAS releases.
- A background job that starts and finishes between two polls (for example a scheduled replication/rsync/snapshot task, or a container restart) may only be sampled in its final state. Lowering the poll interval reduces the chance of missing the transient state.

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs stop the debug logging again. Please also attach the [diagnostics](/integrations/diagnostics) data to the issue report.

### "Login failed, invalid API key"

This usually does not mean the key is wrong — it means the key's user either has TrueNAS Access disabled, or lacks the Full Admin role. See [Create an API key](#create-an-api-key) above.

## Remove the integration

{% include integrations/remove_device_service.md %}
