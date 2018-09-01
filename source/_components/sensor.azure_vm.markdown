---
layout: page
title: "Azure VM Sensor"
description: "Display the status of a Microsoft Azure Virtual Machine within Home Assistant."
date: 2018-08-28 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: azure_virtual_machine.png
ha_category: Sensor
ha_release: 0.77.1
ha_iot_class: "Local Polling"
---

The `azure_vm` sensor shows the current status of a virtual machine hosted in the Microsoft Azure cloud platform. The Microsoft Azure cloud platform can be used to host virtual machines that function as VPN gateways, Email servers etc. Knowing the status of these virtual machines in the Home Assistant dashboard is very useful.

The `azure_vm` platform uses the [azure](../components/azure) component.

To add `azure_vm` sensors to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: azure_vm
    name: hassio-test-vm
    resource_group: hassio-test-resource-group
```

{% configuration %}
name:
  description: The name of the virtual machine.
  required: true
  type: string
resource_group:
  description: The Azure Resource Group hosting the virtual machine.
  required: true
  type: string
{% endconfiguration %}

