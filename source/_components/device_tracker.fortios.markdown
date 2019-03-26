
The `FortiOS` platform allows Home Assistant to track devices identified by a FortiGate from [Fortinet](https://www.fortinet.com).

All devices with a MAC address identified by FortiGate would be tracked, this covers both Ethernet and WiFi devices, incl. devices detected by LLDP.

The component is based on the `device_tracker` platform


```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: fortios
    host: 192.168.0.1
    token: XXX 
    verify_ssl: False
```

{% configuration %}
  host:
    description: Hostname or IP address of the FortiGate
    required: true
    type: string
  token:
    description: API token. See [Fortinet Devloper Network](https://fndn.fortinet.com) for how to create a API token.
    required: true
    type: string
  verify_ssl:
    description: if the SSL certificate should be verified. In most home cases users do not have a verified certificate. Default=False.
    required: false
    type: boolean
{% endconfiguration %}
