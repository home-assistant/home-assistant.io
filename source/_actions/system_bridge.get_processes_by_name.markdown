---
title: "Get processes by name"
action: system_bridge.get_processes_by_name
domain: system_bridge
description: "Gets the running processes from a System Bridge server that match a name."
related_actions:
  - system_bridge.get_process_by_id
---

The **Get processes by name** action returns a count and a list of the running processes on a System Bridge server whose name matches the name you provide.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get processes by name from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Bridge: Get processes by name**.
6. Select the **Bridge** server and enter the process **Name**.
7. Select **Save**.

This action does not support targets. In the UI, you select the System Bridge server through the **Bridge** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge:
  description: The System Bridge server to talk to.
  required: true
Name:
  description: The name of the process to get.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.get_processes_by_name`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: system_bridge.get_processes_by_name
  data:
    bridge: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    name: "discord"
  response_variable: result
{% endexample %}

### Options in YAML

{% options_yaml %}
bridge:
  description: The device ID of the System Bridge server to talk to.
  required: true
  type: string
name:
  description: The name of the process to get.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains the following fields:

- `count`: The number of matching processes.
- `processes`: A list of the matching processes. Each process includes the
  same fields as the [Get process by ID](/actions/system_bridge.get_process_by_id/) response.

An example of the response looks like this:

```yaml
count: 1
processes:
  - id: 11196
    name: Discord.exe
    cpu_usage: 0.3
    created: 1698951365.770648
    memory_usage: 0.07285296297215042
    path: C:\Users\user\AppData\Local\Discord\app\Discord.exe
    status: running
    username: hostname\user
    working_directory:
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
