---
description: Instructions on how to integrate Pi-hole with Home Assistant.
ha_release: 0.28
ha_domain: pi_hole
---

The **Pi-hole** {% term integration %} allows you to retrieve statistics and interact with a
[Pi-hole](https://pi-hole.net/) system.

{% include integrations/config_flow.md %}

During the setup, it will ask for the following:

| Item | Description | Example |
| ---- | ----------- | ------- |
| `Host` | The IP or domain name of your Pi-hole. | 192.168.1.1 |
| `Port` | Port used to get to the admin page, typically `80` for `http` connections and `443` for `https` connections. | 80 |
| `Location` | The path to the admin page. This is ignored for the Pi-hole version 6 API. | /admin |
| `App password or API key` | The credential used to authenticate with Pi-hole. See below for details on where to find it for Pi-hole v6 and for older versions. | `585a2fe...` |
| `Uses an SSL certificate` | Whether your Pi-hole uses a certificate, typically true for `https` connections and false for `http`. | {% icon "openmoji:check-mark" %} |
| `Verify SSL certificate` | Whether to verify your Pi-hole's certificate. Ignored in Pi-hole API version 5. | {% icon "openmoji:check-mark" %} |

The combined host, port, and location should take you to the login page of Pi-hole. Using the example above, it would be `http://192.168.1.1:80/admin`.

### Pi-hole v6 and later


For Pi-hole v6 and later, the integration uses an app password. To find it, log into your Pi-hole and go to **Settings** > **Web Interface/API**. Switch from **Basic** to **Expert** mode, then select **Configure app password**. Your admin login password may be used instead, but this is not recommended. 

For Pi-hole v5 and earlier, see below.


### Pi-hole v5 and earlier

For Pi-hole versions before v6, the integration uses an _API token_ if the Pi-hole was password-protected. To find it, go to **Settings** > **API** and select **Show API token**.

{% include integrations/actions.md %}

## Switches

The integration creates a switch for the Pi-hole allowing you to toggle ad-blocking on and off.

## Sensors

The integration provides nine sensors with statistics about DNS queries, blocked domains, and clients. Some sensor names differ between Pi-hole v5 and v6:

<!-- textlint-disable terminology -->

- **Ads blocked today** (v5) / **Ads blocked** (v6): Number of blocked DNS queries.
- **Ads percentage blocked today** (v5) / **Ads percentage blocked** (v6): Percentage of DNS queries that were blocked.
- **Seen clients**: Total number of clients seen by Pi-hole.
- **DNS queries today** (v5) / **DNS queries** (v6): Number of DNS queries processed.
- **Domains blocked**: Number of domains on the blocklist.
- **DNS queries cached**: Number of DNS queries answered from the cache.
- **DNS queries forwarded**: Number of DNS queries forwarded to upstream DNS servers.
- **DNS unique clients**: Number of unique clients (active clients in v6).
- **DNS unique domains**: Number of unique domains queried.

<!-- textlint-enable terminology -->

In Pi-hole v5, the sensors labeled *today* report daily statistics. Pi-hole v6 uses counters without the daily distinction.
