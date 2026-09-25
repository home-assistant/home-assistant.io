---
title: TrueNAS
description: Instructions on how to integrate TrueNAS within Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.9
ha_iot_class: Local Polling
ha_domain: truenas_ce
ha_codeowners:
  - '@kayl-codes'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **TrueNAS** {% term integration %} lets you monitor a [TrueNAS](https://www.truenas.com/) SCALE system from Home Assistant, using TrueNAS's native JSON-RPC 2.0 WebSocket API.

Common use cases include:

- Monitor system health (CPU, load, memory, temperature, ARC hit ratio, uptime), pools, disks and datasets.
- Get notified before a certificate expires, or before a pool/disk problem becomes critical, via TrueNAS's own alerts.
- Keep track of cloud sync, replication, rsync and snapshot task results without checking the TrueNAS UI.
- Monitor UPS status and network interface throughput.

## Prerequisites

You need a TrueNAS SCALE system running **25.04 or later**, reachable from Home Assistant over the network (a local IP address or VPN is strongly recommended over a reverse proxy — see [Known limitations](#known-limitations)).

### Create an API key

1. Sign in to the TrueNAS web UI.
2. Go to **Credentials** > **Users**, and either use an existing user or create a dedicated one (for example `HomeAssistant`).
3. On TrueNAS 25.04+, an API key is tied to a user account and inherits that user's privileges. This integration only reads data, so the account only needs read access to the resources you want to monitor; **TrueNAS Access** must be enabled for the user regardless of role. The **Full Admin** role is the simplest way to make sure every monitored resource is readable, but a more restricted role may also work. A key whose user has TrueNAS Access disabled fails to authenticate even though the key itself is valid.
4. Create an API key for that user and copy it — you will need it during setup.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The TrueNAS hostname or IP address, without scheme or path (for example `192.168.1.100`). A non-default port can be appended with a colon (`192.168.1.100:8888`)."
API key:
  description: "The API key created above."
Verify SSL certificate:
  description: "Whether to verify the TLS certificate presented by TrueNAS. Keep this enabled unless you know why you need to disable it."
Skip disabled cron jobs:
  description: "Skip cron jobs that are disabled in TrueNAS."
Data size unit:
  description: "Whether dataset, pool and memory sensors report sizes in `GB` (base 1000) or `GiB` (base 1024)."
{% endconfiguration_basic %}

## Supported functionality

### Sensors

System (CPU, load, memory, temperature, ARC hit ratio, uptime), pools, disks, datasets, certificates (expiry time and days remaining), directory services connectivity, network interfaces, UPS, cloud sync/replication/rsync/snapshot task status, alerts, and app statistics (live CPU, memory, network and block I/O usage).

## Known limitations

- **Authentication gateways in front of TrueNAS are not supported.** Cloudflare Access, Authelia, HTTP basic auth and similar SSO/auth proxies intercept the WebSocket handshake before it reaches TrueNAS, so the API key never gets a chance to authenticate. Use a local IP address or VPN instead, or a plain TLS-terminating reverse proxy that forwards the WebSocket upgrade untouched.
- **TrueNAS development/nightly builds are not supported.** The integration is tested against stable TrueNAS releases.
- A background job that starts and finishes between two polls (for example a scheduled replication/rsync/snapshot task) may only be sampled in its final state. Lowering the poll interval reduces the chance of missing the transient state.

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs stop the debug logging again.

### "Login failed, invalid API key"

This usually does not mean the key is wrong — it means the key's user has TrueNAS Access disabled. See [Create an API key](#create-an-api-key) above.

## Remove the integration

{% include integrations/remove_device_service.md %}
