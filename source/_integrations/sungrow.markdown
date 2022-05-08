---
title: Sungrow
description: Instructions on how to integrate Sungrow solar inverter within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 2022.6
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: sungrow
ha_platforms:
  - sensor
ha_codeowners:
  - '@dasBasti'
ha_integration_type: integration
---

The `sungrow` platform uses the [Sungrow Modbus Client](https://pypi.org/project/sungrow-modbus-client/) to allow you to get details from your Sungrow solar power setup and integrate these in your Home Assistant installation.

<div class='note'>

The `solaredge` platform will update the site overview every 5 minutes.

</div>

{% include integrations/config_flow.md %}

## Compatible devices

Known to work: SG5.0RT
Should work: SG30KTL-M, SG30KTL-M-V31, SG33KTL-M, SG36KTL-M, SG33K3J, SG49K5J, SG34KJ, LP_P34KSG, SG50KTL-M-20, SG60KTL, SG80KTL, SG80KTL-20, SG60KU-M, SG5KTL-MT, SG6KTL-MT, SG8KTL-M, SG10KTL-M, SG10KTL-MT, SG12KTL-M, SG15KTL-M, SG17KTL-M, SG20KTL-M, SG80KTL-M, SG111HV, SG125HV, SG125HV-20, SG33CX, SG40CX, SG50CX, SG110CX, SG30KTL, SG10KTL, SG12KTL, SG15KTL, SG20KTL, SG30KU, SG36KTL, SG36KU, SG40KTL, SG40KTL-M, SG50KTL-M, SG60KTL-M, SG60KU