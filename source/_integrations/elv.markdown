---
title: ELV PCA
description: Instructions on how to integrate ELV PCA 301 switches into Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Polling
ha_release: 0.95
ha_codeowners:
  - '@majuss'
ha_domain: elv
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `pca` switch {% term integration %} allows you to control the state of your [ELV PCA 301 smart switch](https://www.elv.de/funkschaltsteckdose-fuer-energiekostenmonitor-pca-301.html). You need an 868 MHz interface like the [JeeLink](https://www.digitalsmarties.net/products/jeelink) flashed with the [pca-hex firmware](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/firmware/JeeLink_PCA301.hex).

## Configuration

To use your PCA 301 switch or socket in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
elv:
  device: SERIAL_PORT
```

This {% term integration %} will add all PCA 301 switches which are in range. You can read the total used energy in kWh and the current power in Watt.

{% configuration %}
device:
  description: "The path to you serial console. Get it via: `ls /dev/tty*`."
  required: true
  type: string
name: 
  description: Default name for the plugs.
  required: false
  type: string
{% endconfiguration %}
