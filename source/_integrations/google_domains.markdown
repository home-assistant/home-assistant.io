---
title: Google Domains
description: Keep your computer registered with the Google Domains dynamic DNS.
ha_category:
  - Network
ha_release: 0.57
ha_domain: google_domains
---

With the Google Domains integration you can keep your Google Domains records up to date.

## Configuration

To use the integration in your installation, use the **Configuration** > **Integrations** menu:

### Setup via the Integrations menu

1. In the **Configuration** > **Integrations** menu, click **+** and then select `Google Domains` from the pop-up menu.
2. In the pop-up box, enter the domain you want to use DDNS with and the credentials given to you in the **Synthetic records** > **Dynamic DNS** section of your domain in [Google Domains](https://domains.google.com/registrar/).
3. Submit.

To edit an entry, you will need to delete and re-add it.

You can repeat the process for as many domains as you want. There will be an entry in the Home Assistant logs if the domain and/or the credentials are incorrect.

### Migrating from YAML
For those migrating their configuration from YAML, you will need to remove the YAML configuration before starting Home Assistant and reconfigure Google Domains using the **Integrations** menu via the steps listed above.
