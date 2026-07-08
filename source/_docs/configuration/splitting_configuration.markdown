---
title: "Splitting the configuration file"
description: "Keep your configuration.yaml manageable by splitting it into smaller, focused files using the !include directive."
related:
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/packages
    title: Using packages to organize configuration files
---

If you configure Home Assistant using YAML, your {% term "`configuration.yaml`" %} file can grow large over time. You can split it into smaller, focused files using the `!include` directive.

{% note %}
Most Home Assistant features are configured through the UI and don't require editing the `configuration.yaml` at all. This page is for you if you use YAML-based configuration and want to keep your files organized.
{% endnote %}

## Example configuration files for inspiration

First off, several community members have sanitized (read: without API keys/passwords) versions of their configurations available for viewing. You can see a [list of example configuration on GitHub](https://github.com/search?q=topic%3Ahome-assistant-config&type=Repositories).

As commenting code doesn't always happen, please read on to learn in detail how configuration files can be structured.

## How splitting works

The `configuration.yaml` file stays in place when you split it. You move parts of its content into separate files and reference them with `!include`.

A fresh `configuration.yaml` includes several entries that should not be removed:

```yaml
# Loads a standard set of integrations. Keep this entry.
default_config:

# These files store automations, scripts, and scenes created in the UI.
automation: !include automations.yaml
script: !include scripts.yaml
scene: !include scenes.yaml
```

If you have added customizations or packages, there may also be a `homeassistant:` key. Any `!include` statements under it, such as for `customize:` or `packages:`, should stay nested inside it.

The included file must contain valid YAML for the location where it is included. You do not repeat the parent key inside the included file.

For example, if `configuration.yaml` contains:

```yaml
customize: !include customize.yaml
```

Then `customize.yaml` contains only the entries that belong under `customize:`:

```yaml
light.living_room:
  friendly_name: "Living Room"
  icon: mdi:ceiling-light

switch.patio:
  friendly_name: "Patio Switch"
```

You can apply the same pattern to any integration:

```yaml
switch: !include switch.yaml
sensor: !include sensor.yaml
```

Give files names that match their purpose, so they are easier to find and maintain.

Nesting `!include` statements also works. A file that is itself included can use `!include` to pull in further files.

### Indentation

Home Assistant configuration files use YAML, where indentation is significant. Always use 2 spaces per level.

As a general rule:

- Top-level keys (like `homeassistant:`, `mqtt:`, or `sensor:`) are fully left-aligned with no indent.
- Keys nested under a parent are indented 2 spaces.
- List items (`-`) are indented to the correct level, followed by a single space before the value.

```yaml
# Top-level key: no indent
sensor:
  # Nested key: 2 spaces
  - platform: template
    sensors:
      living_room_temp:
        friendly_name: "Living room temperature"
```

Incorrect indentation is one of the most common reasons a configuration file fails to load.

### Comments

A `#` symbol marks a comment. Anything after it on that line is ignored by Home Assistant. Comments are useful for adding context or temporarily disabling a line without deleting it.

```yaml
# Automations for public transport notifications
automation public transport: !include public-transport-automation.yaml
```

### Multiple top-level keys

Some integrations support multiple top-level keys, letting you split their configuration across several files. Each key must have a different label. This applies to IoT domain integrations such as `light`, `switch`, and `sensor`, as well as `automation`, `script`, and `template`.

If an integration does not support multiple top-level keys, use [Packages](/docs/configuration/packages) instead.

#### Example of multiple top-level keys

Here is an example using `light`. The first key keeps some entries inline, and the other keys use `!include` to pull in separate files:

`configuration.yaml`

```yaml
light:
  - platform: group
    name: "Bedside Lights"
    entities:
      - light.left_bedside_light
      - light.right_bedside_light

# More light groups in a separate file
light groups: !include light-groups.yaml

# Light switch mappings in a different file
light switches: !include light-switches.yaml
```

`light-groups.yaml`

```yaml
- platform: group
  name: "Outside Lights"
  entities:
    - light.porch_lights
    - light.patio_lights
```

`light-switches.yaml`

```yaml
- platform: switch
  name: "Patio Lights"
  entity_id: switch.patio_lights

- platform: switch
  name: "Floor Lamp"
  entity_id: switch.floor_lamp_plug
```

The same pattern works for `automation`:

```yaml
# Automations managed in the UI
automation ui: !include automations.yaml

# Automations written by hand
automation manual: !include automations_manual.yaml
```

### Using packages

Configuration can also be organized using [Packages](/docs/configuration/packages), which let you group all the configuration for a specific feature or room into a single file.

## Debugging configuration files

If you have many configuration files, Home Assistant provides a CLI that allows you to see how it interprets them. Each installation type has its own section in the common-tasks about this:

- [Operating System](/common-tasks/os/#configuration-check)
- [Container](/common-tasks/container/#configuration-check)

<a id="advanced-usage"></a>
## Including entire directories

You can also include entire directories at once using four directory-level include options. The directory-level options only scan for files with the `.yaml` extension. Files with the `.yml` extension are ignored.

You can still use `!include` to load `.yml` files directly from within your `.yaml` files.

- `!include_dir_list` returns the content of a directory as a list with each file content being an entry in the list. The list entries are ordered based on the alphanumeric ordering of the names of the files.
- `!include_dir_named` returns the content of a directory as a dictionary that maps filenames to file contents.
- `!include_dir_merge_list` returns the content of a directory as a list by merging all files (which should contain a list) into a single list.
- `!include_dir_merge_named` returns the content of a directory as a dictionary by loading each file and merging it into a single dictionary.

These work recursively. For example, `!include_dir_list automation` includes all 6 files shown below:

```bash
.
└── .homeassistant
    ├── automation
    │   ├── lights
    │   │   ├── turn_light_off_bedroom.yaml
    │   │   ├── turn_light_off_lounge.yaml
    │   │   ├── turn_light_on_bedroom.yaml
    │   │   └── turn_light_on_lounge.yaml
    │   ├── say_hello.yaml
    │   └── sensors
    │       └── react.yaml
    └── configuration.yaml (not included)
```

### Example: `!include_dir_list`

`configuration.yaml`

```yaml
automation:
  - alias: "Automation 1"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        to: "home"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.entryway
  - alias: "Automation 2"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        from: "home"
    actions:
      - action: light.turn_off
        target:
          entity_id: light.entryway
```

can be turned into:

`configuration.yaml`

```yaml
automation: !include_dir_list automation/presence/
```

`automation/presence/automation1.yaml`

```yaml
alias: "Automation 1"
triggers:
  - trigger: state
    entity_id: device_tracker.iphone
    to: "home"
actions:
  - action: light.turn_on
    target:
      entity_id: light.entryway
```

`automation/presence/automation2.yaml`

```yaml
alias: "Automation 2"
triggers:
  - trigger: state
    entity_id: device_tracker.iphone
    from: "home"
actions:
  - action: light.turn_off
    target:
      entity_id: light.entryway
```

Each file must contain only **one** entry when using `!include_dir_list`.

### Example: `!include_dir_named`

`configuration.yaml`

```yaml
alexa:
  intents:
    LocateIntent:
      actions:
        action: notify.pushover
        data:
          message: "Your location has been queried via Alexa."
      speech:
        type: plaintext
        text: >
          {%- for state in states.device_tracker -%}
            {%- if state.name.lower() == User.lower() -%}
              {{ state.name }} is at {{ state.state }}
            {%- endif -%}
          {%- else -%}
            I am sorry. Pootie! I do not know where {{User}} is.
          {%- endfor -%}
    WhereAreWeIntent:
      speech:
        type: plaintext
        text: >
          {%- if is_state('device_tracker.iphone', 'home') -%}
            iPhone is home.
          {%- else -%}
            iPhone is not home.
          {% endif %}
```

can be turned into:

`configuration.yaml`

```yaml
alexa:
  intents: !include_dir_named alexa/
```

`alexa/LocateIntent.yaml`

```yaml
actions:
  action: notify.pushover
  data:
    message: "Your location has been queried via Alexa."
speech:
  type: plaintext
  text: >
    {%- for state in states.device_tracker -%}
      {%- if state.name.lower() == User.lower() -%}
        {{ state.name }} is at {{ state.state }}
      {%- endif -%}
    {%- else -%}
      I am sorry. Pootie! I do not know where {{User}} is.
    {%- endfor -%}
```

`alexa/WhereAreWeIntent.yaml`

```yaml
speech:
  type: plaintext
  text: >
    {%- if is_state('device_tracker.iphone', 'home') -%}
      iPhone is home.
    {%- else -%}
      iPhone is not home.
    {% endif %}
```

### Example: `!include_dir_merge_list`

`configuration.yaml`

```yaml
automation:
  - alias: "Automation 1"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        to: "home"
    actions:
      - action: light.turn_on
        target:
          entity_id: light.entryway
  - alias: "Automation 2"
    triggers:
      - trigger: state
        entity_id: device_tracker.iphone
        from: "home"
    actions:
      - action: light.turn_off
        target:
          entity_id: light.entryway
```

can be turned into:

`configuration.yaml`

```yaml
automation: !include_dir_merge_list automation/
```

`automation/presence.yaml`

```yaml
- alias: "Automation 1"
  triggers:
    - trigger: state
      entity_id: device_tracker.iphone
      to: "home"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.entryway
- alias: "Automation 2"
  triggers:
    - trigger: state
      entity_id: device_tracker.iphone
      from: "home"
  actions:
    - action: light.turn_off
      target:
        entity_id: light.entryway
```

When using `!include_dir_merge_list`, you must include a list in each file (each list item is denoted with a hyphen (`-`)). Each file may contain one or more entries.

### Example: `!include_dir_merge_named`

`configuration.yaml`

```yaml
group:
  bedroom:
    name: "Bedroom"
    entities:
      - light.bedroom_lamp
      - light.bedroom_overhead
  hallway:
    name: "Hallway"
    entities:
      - light.hallway
      - thermostat.home
  front_yard:
    name: "Front Yard"
    entities:
      - light.front_porch
      - light.security
      - light.pathway
      - sensor.mailbox
      - camera.front_porch
```

can be turned into:

`configuration.yaml`

```yaml
group: !include_dir_merge_named group/
```

`group/interior.yaml`

```yaml
bedroom:
  name: "Bedroom"
  entities:
    - light.bedroom_lamp
    - light.bedroom_overhead
hallway:
  name: "Hallway"
  entities:
    - light.hallway
    - thermostat.home
```

`group/exterior.yaml`

```yaml
front_yard:
  name: "Front Yard"
  entities:
    - light.front_porch
    - light.security
    - light.pathway
    - sensor.mailbox
    - camera.front_porch
```

### Example: Combine `!include_dir_merge_list` with `automations.yaml`

Do you want to split your automations, while still being able to create them in {% my automations title="**Settings** > **Automations & scenes**" %}? Here is how you can do that for automations.

Using labels like `manual` or `ui` allows for using multiple keys in the config:

`configuration.yaml`

```yaml

# My own handmade automations
automation manual: !include_dir_merge_list automations/

# Automations I create in the UI
automation ui: !include automations.yaml
```

## Example configuration files for inspiration

Several community members have shared versions of their configurations without sensitive information, like API keys and passwords. You can see a [list of example configurations on GitHub](https://github.com/search?q=topic%3Ahome-assistant-config&type=Repositories).

[discord]: https://discord.gg/home-assistant
