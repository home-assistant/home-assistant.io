---
description: Instructions on how to integrate a Samsung printer providing SyncThru within Home Assistant.
ha_release: 0.66
ha_domain: syncthru
---

The **Samsung SyncThru Printer** {% term integration %} allows Home Assistant to read current data from a local Samsung printer.  

Depending on device abilities, the following separate sensors are created if supported:

- Whether the printer is online
- Whether the printer is in an error state
- Black, cyan, magenta and yellow toner fill level
- Black, cyan, magenta and yellow drum state
- First to fifth paper input tray state
- First to sixth paper output tray state

In order for a device to be discovered automatically, SSPD / UPnP (under Network settings) must be enabled.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Web interface URL:
  description: "The address of the printer's web interface, for example `http://192.168.1.10`. If you leave out `http://` or `https://`, the integration uses `http://`."
Name:
  description: "Optional. The name of the printer in Home Assistant. If you leave it empty, the integration uses `Samsung` followed by the printer model."
{% endconfiguration_basic %}

## Data updates

The integration {% term polling polls %} the printer every 30 seconds.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
