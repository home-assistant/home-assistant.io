---
title: FortiOS
description: Instructions on how to use Fortinet FortiOS to track devices in Home Assistant.
ha_category:
  - Presence detection
ha_iot_class: Local Polling
ha_release: 0.97
ha_domain: fortios
ha_platforms:
  - device_tracker
ha_codeowners:
  - '@kimfrellsen'
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The FortiOS presence detection enables Home Assistant to track devices with a MAC address connected to a FortiGate from [Fortinet](https://www.fortinet.com).

The {% term integration %} relies on the [fortiosapi](https://pypi.org/project/fortiosapi/). It has been verified on FortiGate appliances and FortiGate VM running FortiOS v. 6.4.x (up to 6.4.8), 7.0.x (up to 7.0.4) and 7.2.0.  
The minimum version supported is FortiOS 6.4.3.

All devices with a MAC address identified by FortiGate would be tracked, this covers both Ethernet and Wi-Fi devices, including devices detected by LLDP.

The {% term integration %} is based on the Home Assistant `device_tracker` platform.

### Example configuration

This example uses the FortiOS {% term integration %} as a device tracker, with an API token and does not verify the SSL certificate.
Add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml
device_tracker:
  - platform: fortios
    host: YOUR_HOST
    token: YOUR_API_USER_KEY
```

{% configuration %}
host:
  description: Hostname or IP address of the FortiGate. Optionally port name can be added like this "10.10.10.10:443". Remember quotes if port number is added.
  required: true
  type: string
token:
  description: "See: [Generate an API token for FortiOS](https://docs.fortinet.com/document/forticonverter/6.2.0/online-help/866905/connect-fortigate-device-via-api-token) for how to create an API token. This integration only needs read access to a FortiGate, so configure the API user to only to have limited and read-only access."
  required: true
  type: string
verify_ssl:
  description: If the SSL certificate should be verified. In most home cases users do not have a verified certificate.
  required: false
  type: boolean
  default: false
{% endconfiguration %}
