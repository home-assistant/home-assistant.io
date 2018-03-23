---
layout: page
title: "Z-Wave Services"
description: "Services exposed by the Z-Wave component."
date: 2017-09-21 10:59
sidebar: true
comments: false
sharing: true
footer: true
---

The `zwave` component exposes multiple services to help maintain the network. All of these are available through the Z-Wave control panel.

| Service                | Description                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| add_node               | Put the Z-Wave controller in inclusion mode. Allows you to add a new device to the Z-Wave network.                                           |
| add_node_secure        | Put the Z-Wave controller in secure inclusion mode. Allows you to add a new device with secure communications to the Z-Wave network.         |
| cancel_command         | Cancels a running Z-Wave command. If you have started an add_node or remove_node command, and decide you are not going to do it, then this must be used to stop the inclusion/exclusion command. |
| change_association     | Add or remove an association in the Z-Wave network                                                                                           |
| heal_network           | Tells the controller to "heal" the Z-Wave network. Basically asks the nodes to tell the controller all of their neighbors so the controller can refigure out optimal routing.             |
| heal_node              | Tells the controller to "heal" a specific node on the network. Requires `node_id` field. You can also force return route update with `return_routes` field.
| print_config_parameter | Prints Z-Wave node's config parameter value to the (console) log.                                                                            |
| print_node             | Print all states of Z-Wave node.                                                                                                             |
| refresh_entity         | Refresh the Z-Wave entity by refreshing dependent values.                                                                                    |
| refresh_node           | Refresh the Z-Wave node.                                                                                                                     |
| remove_node            | Put the Z-Wave controller in exclusion mode. Allows you to remove a device from the Z-Wave network.                                          |
| rename_node            | Sets a node's name. Requires a `node_id` and `name` field.                                                                                   |
| rename_value           | Sets a value's name. Requires a `node_id`, `value_id`, and `name` field.                                                                     |
| remove_failed_node     | Remove a failed node from the network. The Node should be on the controller's Failed Node List, otherwise this command will fail.            |
| replace_failed_node    | Replace a failed device with another. If the node is not in the controller's Failed Node List, or the node responds, this command will fail. |
| reset_node_meters      | Reset a node's meter values. Only works if the node supports this.                                                                           |
| set_config_parameter   | Lets the user set a config parameter to a node. NOTE: Use the parameter option's `label` string as the `value` for list parameters (e.g., `"value": "Off"`). For all other parameters use the relevant integer `value` (e.g., `"value": 1`). |
| soft_reset             | Tells the controller to do a "soft reset." This is not supposed to lose any data, but different controllers can behave differently to a "soft reset" command. |
| start_network          | Starts the Z-Wave network.                                                                                                                   |
| stop_network           | Stops the Z-Wave network.                                                                                                                    |
| test_network           | Tells the controller to send no-op commands to each node and measure the time for a response. In theory, this can also bring back nodes which have been marked "presumed dead."             |
| test_node              | Tells the controller to send no-op command(s) to a specific node. Requires `node_id` field. You can specify amount of test_messages to send by specifying it with `messages` field. In theory, this could bring back nodes marked as "presumed dead"

The `soft_reset` and `heal_network` commands can be used as part of an automation script to help keep a Z-Wave network running reliably as shown in the example below. By default, Home Assistant will run a `heal_network` at midnight. This is a configuration option for the `zwave` component. The option defaults to `true` but can be disabled by setting `autoheal` to false. If you're having issues with your Z-Wave network, try disabling this automation.

<p class='note'>
Using the `soft_reset` function with some Z-Wave controllers can cause the Z-Wave network to hang.
</p>

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: test at 2:30am
    trigger:
      platform: time
      at: '2:30:00'
    action:
      service: zwave.test_network

  - alias: heal at 2:32am
    trigger:
      platform: time
      at: '2:32:00'
    action:
      service: zwave.heal_network
```
