---
title: "Brother Printer"
description: "Instructions on how to integrate a Brother printer into Home Assistant."
logo: brother.png
ha_category:
  - System Monitor
ha_release: 0.105
ha_iot_class: Local Polling
---

The `Brother Printer` integration allows you to read current data from your local Brother printer.

It usually provides information about the device's state, the left amount of ink or toner and remaining life of drum or other parts of the printer.
The integration monitors every supported part.

## Configuration

To add `Brother Printer` to your installation, go to **Configuration** >> **Integrations** in the UI, click button with `+` sign and from the list of integrations select **Brother Printer**.

{% configuration %}
host:
  description: Manually specify printer's hostname or IP address.
  required: true
  type: string
type:
  description: Specify type of the printer.
  required: false
  default: laser
  type: string
{% endconfiguration %}

<div class="note warning">
  
Some very old Brother printers use different data format and these models are not supported. Integration will show information about that during configuration.

</div>
