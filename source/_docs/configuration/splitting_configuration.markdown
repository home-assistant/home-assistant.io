---
title: "Splitting up the configuration"
description: "Splitting the configuration.yaml into several files."
---

So you've been using Home Assistant for a while now and your `configuration.yaml` file brings people to tears or you simply want to start off with the distributed approach, here's how to split the `configuration.yaml` into more manageable (read: humanly readable) pieces.

First off, several community members have sanitized (read: without API keys/passwords etc) versions of their configurations available for viewing, you can see a list of them [here](/examples/#example-configurationyaml).

As commenting code doesn't always happen, please read on for the details.

Now despite the logical assumption that the `configuration.yaml` will be replaced by this process it will in fact remain, albeit in a much less cluttered form.

In this lighter version we will still need what could be called the core snippet:

```yaml
homeassistant:
  # Name of the location where Home Assistant is running
  name: "My Home Assistant Instance"
  # Location required to calculate the time the sun rises and sets
  latitude: 37
  longitude: -121
  # 'metric' for Metric, 'imperial' for Imperial
  unit_system: imperial
  # Pick yours from here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  time_zone: "America/Los_Angeles"
  customize: !include customize.yaml
```

Note that each line after `homeassistant:` is indented two (2) spaces. Since the configuration files in Home Assistant are based on the YAML language, indentation and spacing are important. Also note that seemingly strange entry under `customize:`.

`!include filename.yaml` is the statement that tells Home Assistant to insert the contents of `filename.yaml` at that point. This is how we are going to break a monolithic and hard to read file (when it gets big) into more manageable chunks.

Now before we start splitting out the different components, let's look at the other integrations (in our example) that will stay in the base file:

```yaml
history:
frontend:
logbook:
http:
  api_password: "ImNotTelling!"

ifttt:
  key: ["nope"]

mqtt:
  broker: 127.0.0.1
```

As with the core snippet, indentation makes a difference. The integration headers (`mqtt:`) should be fully left aligned (aka no indent), and the parameters (`broker:`) should be indented two (2) spaces.

While some of these integrations can technically be moved to a separate file they are so small or "one off's" where splitting them off is superfluous. Also, you'll notice the # symbol (hash/pound). This represents a "comment" as far as the commands are interpreted. Put another way, any line prefixed with a `#` will be ignored. This makes breaking up files for human readability really convenient, not to mention turning off features while leaving the entry intact.

Now, lets assume that a blank file has been created in the Home Assistant configuration directory for each of the following:

```text
automation.yaml
zone.yaml
sensor.yaml
switch.yaml
device_tracker.yaml
customize.yaml
```

`automation.yaml` will hold all the automation integration details. `zone.yaml` will hold the zone integration details and so forth. These files can be called anything but giving them names that match their function will make things easier to keep track of.

Inside the base configuration file add the following entries:

```yaml
automation: !include automation.yaml
zone: !include zone.yaml
sensor: !include sensor.yaml
switch: !include switch.yaml
device_tracker: !include device_tracker.yaml
```

Nesting `!include`s (having an `!include` within a file that is itself `!include`d) will also work.

Some integrations support multiple top-level `!include`s, this includes integrations defining an IoT domain, e.g. `light`, `switch`, `sensor` as well as the `automation`, `script` and `template` integrations, if you give a different label to each one. Configuration for other integrations can instead be split up by using packages. To learn more about packages, see the [Packages](/docs/configuration/packages) page.

Example of multiple top-level keys for the `light` platform.

```yaml
light:
- platform: group
  name: "Bedside Lights"
  entities:
    - light.left_bedside_light
    - light.right_bedside_light

# define more light groups in a separate file
light groups: !include light-groups.yaml

# define some light switch mappings in a different file
light switches: !include light-switches.yaml
```

where `light-groups.yaml` might look like:

```yaml
- platform: group
  name: "Outside Lights"
  entities:
    - light.porch_lights
    - light.patio_lights
 ```

with `light-switches.yaml` containing:

```yaml
- platform: switch
  name: "Patio Lights"
  entity_id: switch.patio_lights
  
- platform: switch
  name: "Floor Lamp"
  entity_id: switch.floor_lamp_plug
```

Alright, so we've got the single integrations and the include statements in the base file, what goes in those extra files?

Let's look at the `device_tracker.yaml` file from our example:

```yaml
- platform: owntracks
- platform: nmap_tracker
  home_interval: 3
  hosts: 192.168.2.0/24

  track_new_devices: true
  interval_seconds: 40
  consider_home: 120
```

This small example illustrates how the "split" files work. In this case, we start with two (2) device tracker entries (`owntracks` and `nmap`). These files follow ["style 1"](/getting-started/devices/#style-2-list-each-device-separately) that is to say a fully left aligned leading entry (`- platform: owntracks`) followed by the parameter entries indented two (2) spaces.

This (large) sensor configuration gives us another example:

{% raw %}

```yaml
### sensor.yaml
### METEOBRIDGE #############################################
- platform: tcp
  name: "Outdoor Temp (Meteobridge)"
  host: 192.168.2.82
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[2]}}"
  unit: C
- platform: tcp
  name: "Outdoor Humidity (Meteobridge)"
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[3]}}"
  unit: Percent

#### STEAM FRIENDS ##################################
- platform: steam_online
  api_key: ["not telling"]
  accounts:
    - 76561198012067051

#### TIME/DATE ##################################
- platform: time_date
  display_options:
    - "time"
    - "date"
- platform: worldclock
  time_zone: Etc/UTC
  name: "UTC"
- platform: worldclock
  time_zone: America/New_York
  name: "Ann Arbor"
```

{% endraw %}

You'll notice that this example includes a secondary parameter section (under the steam section) as well as a better example of the way comments can be used to break down files into sections.

All of the above can be applied when splitting up files using packages. To
learn more about packages, see the [Packages](/docs/configuration/packages) page.

That about wraps it up.

If you have issues checkout `home-assistant.log` in the configuration directory as well as your indentations. If all else fails, head over to our [Discord chat server][discord] and ask away.

## Debugging configuration files

If you have many configuration files, Home Assistant provides a CLI that allows you to see how it interprets them, each installation type has its own section in the common-tasks about this:

- [Operating System](/common-tasks/os/#configuration-check)
- [Container](/common-tasks/container/#configuration-check)
- [Core](/common-tasks/core/#configuration-check)
- [Supervised](/common-tasks/supervised/#configuration-check)

## Advanced Usage

We offer four advanced options to include whole directories at once. Please note that your files must have the `.yaml` file extension; `.yml` is not supported.

This will allow you to `!include` files with `.yml` extensions from within the `.yaml` files; without those `.yml` files being imported by the following commands themselves.

- `!include_dir_list` will return the content of a directory as a list with each file content being an entry in the list. The list entries are ordered based on the alphanumeric ordering of the names of the files.
- `!include_dir_named` will return the content of a directory as a dictionary which maps filename => content of file.
- `!include_dir_merge_list` will return the content of a directory as a list by merging all files (which should contain a list) into 1 big list.
- `!include_dir_merge_named` will return the content of a directory as a dictionary by loading each file and merging it into 1 big dictionary.

These work recursively. As an example using `!include_dir_list automation`, will include all 6 files shown below:

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
    trigger:
      platform: state
      entity_id: device_tracker.iphone
      to: "home"
    action:
      service: light.turn_on
      target:
        entity_id: light.entryway
  - alias: "Automation 2"
    trigger:
      platform: state
      entity_id: device_tracker.iphone
      from: "home"
    action:
      service: light.turn_off
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
trigger:
  platform: state
  entity_id: device_tracker.iphone
  to: "home"
action:
  service: light.turn_on
  target:
    entity_id: light.entryway
```

`automation/presence/automation2.yaml`

```yaml
alias: "Automation 2"
trigger:
  platform: state
  entity_id: device_tracker.iphone
  from: "home"
action:
  service: light.turn_off
  target:
    entity_id: light.entryway
```

It is important to note that each file must contain only **one** entry when using `!include_dir_list`.

### Example: `!include_dir_named`

`configuration.yaml`

```yaml
{% raw %}
alexa:
  intents:
    LocateIntent:
      action:
        service: notify.pushover
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
          {% endif %}{% endraw %}
```

can be turned into:

`configuration.yaml`

```yaml
alexa:
  intents: !include_dir_named alexa/
```

`alexa/LocateIntent.yaml`

```yaml
{% raw %}
action:
  service: notify.pushover
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
    {%- endfor -%}{% endraw %}
```

`alexa/WhereAreWeIntent.yaml`

```yaml
{% raw %}
speech:
  type: plaintext
  text: >
    {%- if is_state('device_tracker.iphone', 'home') -%}
      iPhone is home.
    {%- else -%}
      iPhone is not home.
    {% endif %}{% endraw %}
```

### Example: `!include_dir_merge_list`

`configuration.yaml`

```yaml
automation:
  - alias: "Automation 1"
    trigger:
      - platform: state
        entity_id: device_tracker.iphone
        to: "home"
    action:
      - service: light.turn_on
        target:
          entity_id: light.entryway
  - alias: "Automation 2"
    trigger:
      - platform: state
        entity_id: device_tracker.iphone
        from: "home"
    action:
      - service: light.turn_off
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
  trigger:
    - platform: state
      entity_id: device_tracker.iphone
      to: "home"
  action:
    - service: light.turn_on
      target:
        entity_id: light.entryway
- alias: "Automation 2"
  trigger:
    - platform: state
      entity_id: device_tracker.iphone
      from: "home"
  action:
    - service: light.turn_off
      target:
        entity_id: light.entryway
```

It is important to note that when using `!include_dir_merge_list`, you must include a list in each file (each list item is denoted with a hyphen [-]). Each file may contain one or more entries.

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
  name: Hallway
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

You want to go the advanced route and split your automations, but still want to be able to create {% my automations title="automations in the UI" %}?
In a chapter above we write about nesting `!includes`. Here is how we can do that for automations.

Using labels like `manual` or `ui` allows for using multiple keys in the config:

`configuration.yaml`

```yaml

# My own handmade automations
automation manual: !include_dir_merge_list automations/

# Automations I create in the UI
automation ui: !include automations.yaml
```

[discord]: https://discord.gg/c5DvZ4e
