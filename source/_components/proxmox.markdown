---
layout: page
title: "Proxmox VE"
description: "Access and control your Proxmox VE within Home Assistant."
date: 2019-03-18 22:21
sidebar: true
comments: false
sharing: true
footer: true
logo: proxmoxve.png
ha_category: System Monitor
ha_release: 0.91
ha_iot_class: Local Polling
---

This `proxmox` component allows getting various statistics from your [Proxmox VE](https://www.proxmox.com/en/proxmox-ve).

## {% linkable_title Configuration %}

To use the `proxmox` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
proxmox:
   host: IP_ADDRESS
   username: USERNAME
   password: PASSWORD
```

{% configuration %}
host:
  description: The IP address of the Proxmox VE to monitor.
  required: true
  type: string
port:
  description: The port number on which the Proxmox VE web interface is reachable.
  required: false
  default: 8006
  type: integer
verify_ssl:
  description: Whether to do strict validation on SSL certificates of the Proxmox VE.
  required: false
  default: true
  type: boolean
username:
  description: An user to connect to the Proxmox VE.
  required: true
  type: string
password:
  description: The password of the user to connect to the Proxmox VE.
  required: true
  type: string
realm:
  description: The authentication realm of the Proxmox VE user.
  required: false
  default: pam
  type: string
nodes:
  description: List of the Proxmox VE nodes to monitor
  required: false
  default: all nodes
  type: list
vms:
  description: List of the VMIDs of virtual machines and containers to monitor.
  required: false
  default: all virtual machines and containers
  type: list
{% endconfiguration %}
