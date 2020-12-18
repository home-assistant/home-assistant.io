---
title: KMTronic
description: Integrate KMTronic devices
ha_category:
  - Switch
ha_release: 0.119
ha_codeowners:
  - '@dgomes'
ha_iot_class: Local Push
ha_domain: kmtronic
featured: false
ha_config_flow: true
---

Integrate [KMtronic devices](https://www.kmtronic.com/) into Home Assistant.

## Configuration

To add a KMtronice device to your installation, make sure they are connected to your home network first. Next, go to **Configuration** >> **Integrations** in the UI. Click the button with `+` sign on the integrations page and from the list of integrations, select **KMtronic** and insert the IP address of your KMtronic device. The integration will detect how many relays your device has, and will create a switch entity for each of the relays.

