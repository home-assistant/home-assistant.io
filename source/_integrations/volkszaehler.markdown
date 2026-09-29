---
title: Volkszaehler
description: Instructions on how to integrate Volkszaehler sensors into Home Assistant.
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.78
ha_domain: volkszaehler
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: legacy
ha_config_flow: true
---

The **Volkszaehler** {% term integration %} is consuming the system information provided by the [Volkszaehler](https://wiki.volkszaehler.org/) API.

{% include integrations/config_flow.md %}

The following configuration options are available:

{% configuration_basic %}
Host:
  description: The IP address or hostname of the Volkszaehler server. For example, `192.168.1.100` or `volkszaehler.local`.
Port:
  description: The port number of the Volkszaehler server. The default is `80`.
UUID:
  description: The UUID of the channel to monitor. In the Volkszaehler Web UI, select the information icon next to the channel to find it.
{% endconfiguration_basic %}

Each channel adds sensors for average power, consumption, maximum power, and minimum power. To monitor another channel, select **Add channel** to add it as a subentry of the Volkszaehler integration.

## Migrating from YAML configuration

If you previously configured this integration in {% term "`configuration.yaml`" %}, the configuration is imported automatically when Home Assistant starts. A repair issue is created to remind you that YAML configuration is deprecated.

The `monitored_conditions` setting is not imported. The config flow creates all four sensors for each channel.

After the import, remove the Volkszaehler sensor configuration from {% term "`configuration.yaml`" %} and restart Home Assistant.
