---
title: EBox
description: Instructions on how to integrate EBox data usage within Home Assistant.
ha_category:
  - Network
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_domain: ebox
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Integrate your [EBox](https://client.ebox.ca/) account information into Home Assistant.

## Configuration

To use your EBox sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ebox
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - before_offpeak_download
     - before_offpeak_upload
     - before_offpeak_total
```

{% configuration %}
username:
  description: Your EBox username.
  required: true
  type: string
password:
  description: Your EBox password.
  required: true
  type: string
name:
  description: The name of the sensor.
  required: false
  default: EBox
  type: string
monitored_variables:
  description: Variables to monitor.
  required: true
  type: list
  keys:
    before_offpeak_download:
      description: Download before offpeak usage
    before_offpeak_upload:
      description: Upload before offpeak usage
    before_offpeak_total:
      description: Total before offpeak usage
    offpeak_download:
      description: Download offpeak usage
    offpeak_upload:
      description: Upload offpeak usage
    offpeak_total:
      description: Total offpeak usage
    download:
      description: Download usage
    upload:
      description: Upload usage
    total:
      description: Total usage
    balance:
      description: Account balance
    limit:
      description: Limit usage
    usage:
      description: Percent usage
{% endconfiguration %}
