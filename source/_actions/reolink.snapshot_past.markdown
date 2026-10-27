---
title: "Take camera snapshot from past"
action: reolink.snapshot_past
domain: reolink
description: "Takes a snapshot from a past moment in time out of the recordings of a camera and stores it in a file."
related_actions:
  - reolink.ptz_move
  - reolink.play_chime
  - camera.snapshot
---

Use this action to take a still image out of the recordings of a Reolink camera and save it to a file, for example to capture what happened a few seconds before motion was detected. A regular snapshot always shows the current moment.

{% include actions/ui_header.md %}

To take a snapshot from the past from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Reolink camera entity you want to capture, for example **Fluent**.
6. From the actions shown for that target, select **Take camera snapshot from past**.
7. Set the **Timestamp** you want the snapshot from and the **Filename** where the snapshot is saved.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Timestamp:
  description: The moment in time to take the snapshot from, in the local time of Home Assistant.
  required: true
Filename:
  description: The full path to the file where the snapshot is saved.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `reolink.snapshot_past`. A basic example looks like this:

{% example %}
action: |
  action: reolink.snapshot_past
  target:
    entity_id: camera.front_door_fluent
  data:
    timestamp: "2025-09-29 14:30:00"
    filename: "/config/www/front_door.jpg"
{% endexample %}

This saves the image recorded by `camera.front_door_fluent` at 14:30:00 on 29 September 2025 to `/config/www/front_door.jpg`.

### Options in YAML

{% options_yaml %}
timestamp:
  description: The moment in time to take the snapshot from, in the local time of Home Assistant, such as 2025-09-29 14:30:00.
  required: true
  type: string
filename:
  description: The full path to the file where the snapshot is saved.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="camera" %}

## Good to know

- The camera needs to record to an SD card or to an NVR/Home Hub, and a recording has to exist for the moment you ask for. If the camera was not recording at that moment, the action fails.
- The snapshot is taken from the first video frame in the 10 seconds following the **Timestamp**, so the image can be slightly later than the moment you ask for.
- The resolution follows the camera entity you target: the **Fluent** camera entity gives a low-resolution image, the **Clear** camera entity a high-resolution one.
- The path in **Filename** must be inside a directory that Home Assistant is allowed to write to. By default, the `www` folder in your configuration directory and each configured [media directory](/integrations/homeassistant/#media_dirs) are allowed, so a path like `/config/www/front_door.jpg` or `/media/front_door.jpg` works without extra setup. To save somewhere else, such as `/tmp`, add that directory to [`allowlist_external_dirs`](/integrations/homeassistant/#allowlist_external_dirs) in the [`homeassistant:`](/integrations/homeassistant/) section of your {% term "`configuration.yaml`" %} file.
- Folders in the path that do not exist yet are created for you.
- The **Timestamp** is entered in the local time of Home Assistant and converted to the time zone of the camera automatically.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: save the moment just before a person was detected

Take a snapshot of the situation five seconds before a person was detected, so the image shows the person approaching instead of the situation after the event was reported.

- **Trigger**: A person is detected
- **Action**: Take camera snapshot from past
  - **Target**: Front door camera, Fluent stream
  - **Timestamp**: five seconds ago
  - **Filename**: a path that includes the current date and time

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Save a snapshot of the moment just before a person was detected"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door_person
        to: "on"
    actions:
      - action: reolink.snapshot_past
        target:
          entity_id: camera.front_door_fluent
        data:
          timestamp: "{{ (now() - timedelta(seconds=5)).isoformat() }}"
          filename: "/config/www/front_door_{{ now().strftime('%Y%m%d-%H%M%S') }}.jpg"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
