---
title: Govee lights local
description: Instructions on how to integrate Govee lights with Govee local API
ha_category:
  - light
ha_release: 2024.2
ha_iot_class: Local Push
ha_codeowners:
  - '@Galorhallen'
ha_domain: govee_light_local
ha_config_flow: true
ha_platforms:
  - light
ha_integration_type: integration
---

Integrates [Govee](https://www.govee.com/) lights into Home Assistant using Local API control.

To enable local control on your Govee device, refer to the instructions available [here](https://app-h5.govee.com/user-manual/wlan-guide).

{% include integrations/config_flow.md %}

## Supported devices

H600D,
H6046,
H6047,
H6051,
H6052,
H6056,
H6059,
H6061,
H6062,
H6065,
H6066,
H6067,
H6069,
H606A,
H6072,
H6073,
H6076,
H6078,
H6079,
H607C,
H6087,
H6088,
H608A,
H608B,
H608D,
H60A1,
H610A,
H610B,
H6110,
H6117,
H612A,
H612F,
H6144,
H6159,
H615A,
H615B,
H615C,
H615D,
H615E,
H6163,
H6168,
H6172,
H6173,
H6175,
H6176,
H618A,
H618C,
H618E,
H618F,
H619A,
H619B,
H619C,
H619D,
H619E,
H619Z,
H61A0,
H61A1,
H61A2,
H61A3,
H61A5,
H61A8,
H61B2,
H61B5,
H61BA,
H61BC,
H61BE,
H61C3,
H61C5,
H61D3,
H61D5,
H61E0,
H61E1,
H61E5,
H61E6,
H61F5,
H6640,
H6641,
H7012,
H7013,
H7020,
H7021,
H7028,
H7033,
H7037,
H7038,
H7039,
H7041,
H7042,
H7050,
H7051,
H7052,
H7055,
H705A,
H705B,
H705C,
H705D,
H705E,
H705F,
H7060,
H7061,
H7062,
H7063,
H7065,
H7066,
H706A,
H706B,
H706C,
H7075,
H70A1,
H70A2,
H70A3,
H70B1,
H70B3,
H70BC,
H70C1,
H70C2,
H70C4,
H70C5,
H70D1,
H805C

{% note %}
Some scenes may not be supported from all devices. If you find a scene that's not working with a specific model, please open an issue at the [underling library](https://github.com/Galorhallen/govee-local-api/issues)
{% endnote %}
