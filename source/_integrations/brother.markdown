---
title: Brother Printer
description: Instructions on how to integrate a Brother printer into Home Assistant.
ha_category:
  - System Monitor
ha_release: 0.104
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: brother
ha_quality_scale: platinum
---

The `Brother Printer` integration allows you to read current data from your local Brother printer.

It usually provides information about the device's state, the left amount of ink or toner and the remaining life of the drum or other parts of the printer.
The integration monitors every supported part.

## Configuration

To add `Brother Printer` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Brother Printer**.

<div class="note warning">

Some very old Brother printers use different data format and these models are not supported. The integration will show information about that during configuration.

</div>

## Configuring the printer

To set SNMP, navigate to the printer's web interface (for example: `http://192.168.5.6`) and turn it on under Network / Protocol / SNMP.
For some Brother devices, `SNMPv3 read-write access and v1/v2c read-only access` is the option required (under advanced settings).

![SNMP settings on Brother Printer web interface](/images/integrations/brother/brother-printer-webui.png)
