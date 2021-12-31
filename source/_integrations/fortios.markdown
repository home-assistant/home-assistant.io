---
title: "FortiOS"
description: "Instructions on how to use Fortinet FortiOS to track devices in Home Assistant."
ha_category: "Presence Detection"
ha_iot_class: "Local Polling"
ha_release: "0.97"
ha_domain: fortios
ha_platforms:
  - device_tracker
ha_codeowners:
  - '@kimfrellsen'
---

The FortiOS presence detection enables Home Assistant to track devices with a MAC address connected to a FortiGate from [Fortinet](https://www.fortinet.com).

The integration relies on the [fortiosapi](https://pypi.org/project/fortiosapi/).  
The integration has been verified on FortiGate appliances and FortiGate VM running FortiOS v. 6.4.x (up to 6.4.8) and 7.0.x (up to 7.0.4).  
The integration uses this API: ```<host>:<port>/api/v2/monitor/user/device/query``` which is only available in FortiOS 6.4.3 and later. So minimum supported version is on FortiOS 6.4.3.

All devices with a MAC address identified by FortiGate would be tracked, this covers both Ethernet and Wi-Fi devices, including devices detected by LLDP.

The integration is based on the Home Assistant `device_tracker` platform.

### Example Configuration:
This example uses the FortiOS integration as device tracker, with API token and does not verify the SSL certificate.
```yaml
# Example configuration.yaml
device_tracker:
  - platform: fortios
    host: YOUR_HOST
    token: YOUR_API_USER_KEY
```

{% configuration %}
host:
  description: Hostname or IP address of the FortiGate. Optionally portname can be added like this "10.10.10.10:443". Remember qoutes if portnumber is added.
  required: true
  type: string
token:
  description: See: [Generate an API token for FortiOS](https://docs.fortinet.com/document/forticonverter/6.2.0/online-help/866905/connect-fortigate-device-via-api-token) for how to create an API token. This integration only needs read access to a FortiGate, so configure the API user to only to have limited and read-only access.
  required: true
  type: string
verify_ssl:
  description: If the SSL certificate should be verified. In most home cases users do not have a verified certificate.
  required: false
  type: boolean
  default: false  
{% endconfiguration %}
