---
title: Avocent Direct PDU
description: Instructions on how to integrate Avocent Direct PDU into Home Assistant.
ha_category:
  - DIY
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@wgprojects'
ha_domain: avocent_dpdu
ha_platforms:
  - switch
ha_integration_type: hub
---

This integration supports some 8-outlet and 16-outlet power strip "PDU"s from Avocent. Select the number of outlets your PDU has.

The username and password should be the same as those used in the manufacturer's website if they have been changed from the default values.

### Supported devices:

* DPDU101 (tested)
* DPDU102
* DPDU103
* DPDU201
* DPDU202
* DPDU203

#### Switches:
The 8 or 16 Switch/Outlet entities will be constructed based on configuration.

Their names will be obtained from the PDU.


