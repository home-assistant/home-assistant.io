---
title: Gandi.net
description: Keep your computer registered with the gandi live dns dynamic updater.
ha_category:
  - Network
ha_iot_class: "Cloud Polling"
ha_release: 2021.7
ha_codeowners:
  - '@flexy2dd'
ha_domain: gandi_livedns
---

With the Gandi.net integration, you can keep your [Gandi.net](https://www.gandi.net) LiveDNS record up to date.

## Prerequisites

Setup requires a unique Gandi API Key. If you don’t have one yet, you can generate your production API key from the API Key Page in the Security section.

<div class='note'>
Note that it does not create the initial DNS record but only updates it; you will still have to do this manually.
</div>

[Gandi.net account page](https://account.gandi.net/fr).

{% include integrations/config_flow.md %}

### Service `gandi_livedns.update_record`

The integration runs at regular intervals, but can also be started manually by using the service `gandi_livedns.update_records` under services.
