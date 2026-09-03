---
title: "Read access log"
action: iseo_argo_ble.read_access_log
domain: iseo_argo_ble
description: "Reads the entries your ISEO lock has recorded since the last read."
since: "2026.10"
---

The **Read access log** action reads the entries your ISEO Argo lock has recorded since the last read, and reports the most recent one of each kind on the lock's **Access log** entity.

Home Assistant normally reads the log by itself: when it notices the door has been opened, and after you unlock the door from Home Assistant. Because the door state is only checked every 30 seconds, a door that is opened and closed again within that time is not noticed, and its entries sit unread on the lock until the next read. This action is how you fetch them without waiting.

It is also useful right after you set the lock up, to pull in whatever your lock recorded before Home Assistant knew about it.

{% include actions/ui_header.md %}

To read the access log from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ISEO Argo BLE: Read access log**.
6. Select what you want to control. Under **By target**, select the lock whose log you want to read.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The ISEO lock, or locks, whose access log you want to read.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `iseo_argo_ble.read_access_log`. A basic example looks like this:

{% example %}
action: |
  action: iseo_argo_ble.read_access_log
  target:
    entity_id: lock.front_door
{% endexample %}

This reads whatever `lock.front_door` has recorded since the last read.

### Options in YAML

{% options_yaml %}
entity_id:
  description: >
    The entity ID, or list of entity IDs, of the ISEO locks whose access log
    you want to read.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Reading the log clears it. Your lock hands over everything recorded since the last read and then never offers those entries again, so a read after a quiet spell can return a long history at once. Only the most recent entry of each kind is reported, so the backlog is not replayed as though it had just happened.
- Reading connects to the lock over Bluetooth. Close the Argo app on all phones first, because the lock only accepts one connection at a time.
- If Home Assistant has already noticed the lock is unreachable, its entity is unavailable and this action quietly does nothing, as actions do for any unavailable entity. If the lock only goes out of range once the read is under way, the action reports an error. Either way the entries stay on the lock and arrive with the next successful read.
- A read that fails part way through still reports whatever it managed to read. The lock hands over each page only once, so those entries would otherwise be lost.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Catch up on the access log every morning

Every morning, the night's entries are read so they show up in the logbook even if the door was opened and closed too quickly to be noticed.

- **Trigger**: Time
  - **At**: 07:00:00
- **Action**: ISEO Argo BLE: Read access log
  - **Target**: Front door (`lock.front_door`)

{% example %}
automation: |
  alias: "Catch up on the front door access log"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: iseo_argo_ble.read_access_log
      target:
        entity_id: lock.front_door
{% endexample %}

### Automation: Check the log when you get home

When you arrive home, the log is read so you can see whether anyone came to the door while you were out.

- **Trigger**: State of a person changes to **Home**
- **Action**: ISEO Argo BLE: Read access log
  - **Target**: Front door (`lock.front_door`)

{% example %}
automation: |
  alias: "Read the front door access log on arrival"
  triggers:
    - trigger: state
      entity_id: person.me
      to: home
  actions:
    - action: iseo_argo_ble.read_access_log
      target:
        entity_id: lock.front_door
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
