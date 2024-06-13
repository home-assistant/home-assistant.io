---
title: Ultraloq
description: Connect and control your Ultraloq Z-Wave series devices using the Z-Wave integration
ha_release: '2022.11'
ha_category:
  - Lock
ha_domain: ultraloq
ha_integration_type: virtual
works_with:
  - zwave
ha_iot_standard: zwave
---

Ultraloq smart locks allow users to enter their homes without a key. The lock can be controlled remotely using the Ultraloq app or by using Home Assistant. U-tec, their parent company, is a member of the Works with Home Assistant partner program. This means they are committed to making sure the Ultraloq Z-Wave products are up-to-date and ready to use with Home Assistant.

Ultraloq Z-Wave Series smart locks work locally and integrate seamlessly with the **Z-Wave** {% term integration %} in Home Assistant (Z-Wave stick required).

To add Ultraloq Z-Wave products, pair them as Z-Wave devices:

{% my add_zwave_device badge domain=page.ha_domain %}

[Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)
