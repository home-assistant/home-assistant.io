---
title: "Get mesh info"
action: fritz.get_mesh_info
domain: fritz
description: "Returns the mesh topology and host attributes reported by the FRITZ!Box."
related_actions:
  - fritz.dial
  - fritz.set_guest_wifi_password
---

Use this action to get the raw mesh topology and the list of known network devices from your FRITZ!Box. This is handy when you want to build your own templates or dashboards from the mesh data, for example to see which mesh node or Wi-Fi band a device is connected to.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the mesh info from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **FRITZ!Box Tools: Get mesh info**.
6. Select the **FRITZ!Box device** to get the mesh info from.
7. Select **Save**.

### Options in the UI

{% options_ui %}
FRITZ!Box device:
  description: The FRITZ!Box to get the mesh info from. Select the mesh master.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fritz.get_mesh_info`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: fritz.get_mesh_info
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
  response_variable: mesh_info
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The FRITZ!Box to get the mesh info from. Select the mesh master.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns the data as reported by the FRITZ!Box, with two keys:

- `mesh_topology`: The mesh topology, with a `nodes` list. Each node describes a mesh device or network device, including its interfaces and the links between them.
- `hosts_attributes`: A list of all network devices known to the FRITZ!Box, with attributes such as host name, IP address, MAC address, and whether the device is active.

A shortened example of the response looks like this:

```yaml
mesh_topology:
  schema_version: "1.9"
  nodes:
    - uid: n-1
      device_name: fritz.box
      device_model: FRITZ!Box 7530 AX
      is_meshed: true
      mesh_role: master
      node_interfaces:
        - uid: ni-31
          name: LAN:1
          type: LAN
          node_links:
            - state: CONNECTED
              node_1_uid: n-1
              node_2_uid: n-76
hosts_attributes:
  - HostName: printer
    IPAddress: 192.168.178.2
    MACAddress: AA:BB:CC:00:11:22
    Active: true
    InterfaceType: Ethernet
```

## Good to know

- By default, only administrators can use this action. To allow other users, enable [Allow non-admin users to get mesh info](/integrations/fritz/#allow-non-admin-users-to-get-mesh-info) in the integration options.
- Select the FRITZ!Box that acts as mesh master. A mesh repeater cannot provide the mesh topology.
- The FRITZ!Box must support mesh networking.

{% include actions/stuck.md %}

{% include actions/related.md %}
