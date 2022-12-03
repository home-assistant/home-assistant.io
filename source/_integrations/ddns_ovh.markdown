---
title: Dynamic DNS for OVH
description: Keep your computer registered with the OVH.com dynamic DNS.
ha_category:
  - Network
ha_iot_class: Cloud Polling
ha_domain: ddns_ovh
ha_release: 2023
ha_integration_type: integration
---

With the `ddns_ovh` integration you can keep your current IP address in sync with your [OVH.com](https://www.ovh.com) domain.

Integration can work in two modes based on `triggered_by_event` configuration setting:

1. default or `triggered_by_event=false` - automatic which periodically (once per minute) invokes OVH DDNS service which based on the caller's IP assigns it to appropriate domain

2. `triggered_by_event=true` - requires external component which discovers external IP address and broadcasts it by firing `external_ip_provided_event` event. The event is handled by `ddns_ovh` component and invokes OVH DDNS service with the IP to assign it to appropriate domain. The event data sent by external component has to match the following json: `{ "ip": "X.X.X.X" }`. This mode can be helpful if your ISP is doing some kind of proxy that hides your routers IP public address. External component that discovers or publish public IP address of router can be the router itself for example it can be visible in Home Assistant thanks to [UPnP](/integrations/upnp) integration.

Information about configuration of dynamic DNS for a domain name can be found under following [link](https://docs.ovh.com/ie/en/domains/hosting_dynhost/).

To use the integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ddns_ovh:
  domain: subdomain.domain.com
  username: YOUR_DYN_HOST_USERNAME_SUFFIX
  password: YOUR_DYN_HOST_PASSWORD
```

{% configuration %}
  domain:
    description: Your fully qualified domain name (FQDN) provided during Dynamic DNS configuration on OVH dashboard
    required: true
    type: string
  username:
    description: Username suffix of DynHost created during Dynamic DNS configuration on OVH dashboard
    required: true
    type: string
  password:
    description: Password created during Dynamic DNS configuration on OVH dashboard
    required: true
    type: string
  timeout:
    description: Timeout (in seconds) for the API calls.
    required: false
    type: integer
    default: 10
  triggered_by_event:
    description: If set to true, the component will wait for "external_ip_provided_event" event with IP address, which will be used to notify OVH DDNS service
    required: false
    type: boolean
    default: false
{% endconfiguration %}
