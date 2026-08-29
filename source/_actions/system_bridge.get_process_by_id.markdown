---
title: "Get process by ID"
action: system_bridge.get_process_by_id
domain: system_bridge
description: "Gets a running process from a System Bridge server by its process ID."
related_actions:
  - system_bridge.get_processes_by_name
---

The **Get process by ID** action returns a single running process from a System Bridge server, looked up by its process ID (PID).

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get a process by its ID from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **System Bridge: Get process by ID**.
6. Select the **Bridge** server and enter the process **ID**.
7. Select **Save**.

This action does not support targets. In the UI, you select the System Bridge server through the **Bridge** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge:
  description: The System Bridge server to talk to.
  required: true
ID:
  description: The ID of the process to get.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.get_process_by_id`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: system_bridge.get_process_by_id
  data:
    bridge: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
    id: 17752
  response_variable: process
{% endexample %}

### Options in YAML

{% options_yaml %}
bridge:
  description: The device ID of the System Bridge server to talk to.
  required: true
  type: string
id:
  description: The ID of the process to get.
  required: true
  type: integer
{% endoptions_yaml %}

## Response data

The response describes the matching process and includes the following fields:

- `id`: The process ID (PID).
- `name`: The name of the process.
- `cpu_usage`: The percentage of CPU the process is using.
- `memory_usage`: The percentage of memory the process is using.
- `created`: The time the process was created, as a Unix timestamp.
- `path`: The path to the executable on the server.
- `status`: The current status of the process, such as `running`.
- `username`: The user the process is running as.
- `working_directory`: The working directory of the process, if available.

An example of the response looks like this:

```yaml
id: 17752
name: steam.exe
cpu_usage: 0.9
created: 1698951361.6117153
memory_usage: 0.23782578821487121
path: C:\Program Files (x86)\Steam\steam.exe
status: running
username: hostname\user
working_directory:
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
