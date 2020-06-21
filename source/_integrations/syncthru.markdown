---
title: Samsung SyncThru Printer
description: Instructions on how to integrate a Samsung printer providing SyncThru within Home Assistant.
ha_category:
  - System Monitor
ha_iot_class: Local Polling
ha_release: 0.66
ha_codeowners:
  - '@nielstron'
ha_domain: syncthru
---

The Samsung SyncThru Printer platform allows you to read current data from your local Samsung printer.

It usually provides information about the device's state, the left amount of ink or toner and the state of paper trays.
The platform automatically monitors every supported part.

If you wish not to include certain monitored values specify the values that you would like to see in the front-end via the `monitored_conditions` setting.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: syncthru
    resource: http://my-printer.address
    name: My Awesome Printer
```

{% configuration %}
  resource:
    description: The address for connecting to the printer. Equal to the SyncThru Webservice address.
    required: true
    default: false
    type: string
  name:
    description: A user specified name for the printer. Defaults to "Samsung Printer" and the friendly name will be the name of the printer model.
    required: false
    default: Samsung Printer
    type: string
{% endconfiguration %}

The following information is displayed in separate sensors, if it is available:

 - Black, cyan, magenta and yellow toner fill level
 - Black, cyan, magenta and yellow drum state
 - First to fifth paper input tray state
 - First to sixth paper output tray state

<div class="note warning">
Note that this component or parts thereof may not work if the language of your printer is not configured to be English.
</div>
