---
description: Instructions on how to use update entities with Home Assistant.
ha_release: 2022.4
ha_domain: update
related:
  - docs: /docs/configuration/customizing-entities/
    title: Customizing devices
  - docs: /dashboards/
    title: Dashboard
---

An update {% term entity %} is an entity that indicates if an update is available for a
device or service. This can be any update, including update of a firmware
for a device like a light bulb or router, or software updates for things like
add-ons or containers.

{% include integrations/building_block_integration.md %}

For a list of {% term integrations %} offering update entities, on the integrations page, select the ["Update" category](/integrations/#update).

## Update states

The {% term state %} of an update {% term entity %} shows whether an update is available. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **Update available** (`on`): A newer version is available.
- **Up-to-date** (`off`): The installed version is the latest version, or you skipped the latest version.

In addition, the entity can have the following states:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The state is not yet known.

The following state attributes are exposed to provide more
information on the update state:

- `title`: The title/name of the available software or firmware. As the device
  name or entity name can be changed in Home Assistant, this title will provide
  the actual name of the software or firmware.
- `installed_version`: The current version that is currently installed and in use.
- `latest_version`: The latest version that is available for installation.
- `skipped_version`: If a version update is skipped, this attribute will be set
  and contains the actual version that was skipped.
- `release_summary`: A summary of the release notes for the update available.
- `release_url`: A link to the full release announcement for the update available.
- `install_phase`: The step an update installation is in. See [Install phases](#install-phases).
- `manual_action`: Set when someone has to do something by hand to install the update. See [Updates that need someone at the device](#updates-that-need-someone-at-the-device).

## Install phases

While an update is installing, some integrations report the step the installation is in, as the `install_phase` attribute. Each item shows the label you see in the Home Assistant interface, followed by the value as Home Assistant stores it.

- **Preparing** (`preparing`)
- **Backing up** (`backing_up`)
- **Waiting** (`waiting`): The installation waits for something else, for example, for a battery-powered device to wake up.
- **Waiting for user** (`waiting_for_user`): The installation can't continue until someone does something by hand, for example, confirm the update on the device's screen.
- **Downloading** (`downloading`)
- **Installing** (`installing`)
- **Restarting** (`restarting`)
- **Finishing** (`finishing`)

## Updates that need someone at the device

Some updates need someone at the device to help, for example, to confirm the update on its screen or to press a button on it. The update can't finish until then, and the device might not work in the meantime.

When the integration knows this in advance, Home Assistant tells you before the update starts, so you can make sure someone is there to help:

- In {% my updates title="**Settings** > **System** > **Updates**" %}, the update shows **Needs your help during the update**.
- The update dialog says what someone will have to do, and when.
- When you start the update, Home Assistant asks you to confirm first.

When it's time to help, the update shows **Waiting for user** and what to do now. It continues once that's done.

While the update is available or installing, the `manual_action` attribute is set.

## Device class

The device class tells Home Assistant whether an update is for the firmware of a device. Home Assistant uses the device class to choose the default name, **Firmware**.

The integration that provides the update entity sets the device class. When you create an update entity yourself with a [template helper](/integrations/template/), you choose the device class.

### Device classes in automations and templates

- Automations: The device class doesn't change how an update entity works in automations.
- Templates: The device class is the `device_class` attribute of the entity. Use the stored value, such as `firmware`. For example, you can [find entities by device class](/docs/templating/patterns/#finding-entities-by-device-class).

### List of available device classes

Each item shows the name you see in the Home Assistant interface, followed by the device class as Home Assistant stores it.

- No device class: A generic software update. This is the default.
- **Firmware** (`firmware`): An update for the firmware of a device.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## Update automation examples

Update entities are useful when you want to stay informed about available updates or take action at the right time. Here are a few examples to help you get started.

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when an update becomes available

If an update for a device or service becomes available, this automation sends a
notification to your phone right away.

- **Trigger**: Update became available
  - **Target**: Office router update
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying you about a new update" %}

{% example %}
automation: |
  alias: "Send a notification when an update becomes available"
  triggers:
    - trigger: update.became_available
      target:
        entity_id: update.office_router_firmware
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Update available"
        message: >
          A new update is available for the office router.
{% endexample %}

{% enddetails %}

### Automation: install an update during the evening if it is still available

If you prefer to install updates at a quieter time, this automation checks each
evening whether an update is still available and starts the installation.

- **Trigger**: Time: 21:00
- **Condition**: Update is available
  - **Target**: Office router update
- **Action**: Install update

{% details "YAML example for installing an update in the evening" %}

{% example %}
automation: |
  alias: "Install an update during the evening if it is still available"
  triggers:
    - trigger: time
      at: "21:00:00"
  conditions:
    - condition: update.is_available
      target:
        entity_id: update.office_router_firmware
  actions:
    - action: update.install
      target:
        entity_id: update.office_router_firmware
{% endexample %}

{% enddetails %}

### Automation: send a notification when an update waits for someone

If an update can't continue until someone does something by hand, such as
confirming it on the device's screen, this automation sends a notification to
your phone.

- **Trigger**: Entity attribute changed
  - **Entity**: Wall tablet update
  - **Attribute**: Install phase
  - **To**: Waiting for user
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when an update waits for someone" %}

{% example %}
automation: |
  alias: "Send a notification when an update waits for someone"
  triggers:
    - trigger: state
      entity_id: update.wall_tablet
      attribute: install_phase
      to: waiting_for_user
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Update waiting"
        message: >
          The wall tablet update waits for someone at the device.
{% endexample %}

{% enddetails %}
