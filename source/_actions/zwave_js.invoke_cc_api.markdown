---
title: "Invoke a Command Class API on a node"
action: zwave_js.invoke_cc_api
domain: zwave_js
description: "Calls a Command Class API directly on a Z-Wave node."
related_actions:
  - zwave_js.set_value
---

Use this action to call a Command Class API directly on a Z-Wave node. In most cases the [Set a value](/actions/zwave_js.set_value/) action does what you need, but some command classes have API methods that can't be reached that way.

Correctly using this action requires advanced knowledge of Z-Wave. Refer to the [Z-Wave JS Command Class documentation](https://zwave-js.github.io/node-zwave-js/#/api/CCs/index) for the available APIs and their arguments.

You can target the action at one or more entities, devices, or areas. At least one of those must be provided.

{% include actions/ui_header.md %}

To invoke a Command Class API from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Invoke a Command Class API on a node**.
6. Select the Z-Wave entities, devices, or areas to target, then set the **Command class**, **Method name**, and **Parameters**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Area ID(s):
  description: The area, or areas, to target. All Z-Wave devices and entities in the area are targeted.
  required: false
Device ID(s):
  description: The device, or devices, to target.
  required: false
Entity ID(s):
  description: The entity, or entities, to target.
  required: false
Command class:
  description: The ID of the command class you want to issue a command to.
  required: true
Endpoint:
  description: The endpoint to call the API on. When set, it is used for all targeted nodes. When not set, the root endpoint (0) is used for devices and areas, and the primary value endpoint is used for each entity.
  required: false
Method name:
  description: The name of the API method to call.
  required: true
Parameters:
  description: A list of parameters to pass to the API method.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zwave_js.invoke_cc_api`. A basic example looks like this:

{% example %}
action: |
  action: zwave_js.invoke_cc_api
  target:
    entity_id: climate.thermostat
  data:
    command_class: 132
    method_name: setInterval
    parameters: [1, 1]
{% endexample %}

### Options in YAML

{% options_yaml %}
area_id:
  description: The area ID, or list of area IDs, to target. All Z-Wave devices and entities in the area are targeted. At least one of entity_id, device_id, or area_id is required.
  required: false
  type: [string, list]
device_id:
  description: The device ID, or list of device IDs, to target. At least one of entity_id, device_id, or area_id is required.
  required: false
  type: [string, list]
entity_id:
  description: The entity ID, or list of entity IDs, to target. At least one of entity_id, device_id, or area_id is required.
  required: false
  type: [string, list]
command_class:
  description: The ID of the command class you want to issue a command to.
  required: true
  type: integer
endpoint:
  description: The endpoint to call the API on. When set, it is used for all targeted nodes. When not set, the root endpoint (0) is used for devices and areas, and the primary value endpoint is used for each entity.
  required: false
  type: integer
method_name:
  description: The name of the API method to call.
  required: true
  type: string
parameters:
  description: A list of parameters to pass to the API method.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- You must target at least one entity, device, or area.
- Refer to the [Z-Wave JS Command Class documentation](https://zwave-js.github.io/node-zwave-js/#/api/CCs/index) for the available methods and parameters.

{% include actions/stuck.md %}

{% include actions/related.md %}
