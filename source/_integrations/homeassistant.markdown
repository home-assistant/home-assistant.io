---
title: Home Assistant Core
description: Set up core Home Assistant settings, automation triggers, and generic actions.
ha_release: 0.0
ha_category:
  - Other
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: homeassistant
ha_platforms:
  - scene
ha_integration_type: system
related:
  - docs: /docs/configuration/basic/
    title: Basic information
  - docs: /docs/configuration/
  - docs: /docs/configuration/customizing-devices/
---

The **Home Assistant Core** {% term integration %} provides generic implementations like the generic `homeassistant.turn_on` action.

## Editing the General Settings in YAML

The Home Assistant Core integration is also responsible for the general settings. These settings are defined during onboarding, but you can change them later under {% my general title="**Settings** > **System** > **General**" %}. For the detailed steps, refer to [Basic settings](/docs/configuration/basic/).

If you prefer editing in YAML, you can define your general settings in the {% term "`configuration.yaml`" %} file.
Note that for some of the settings, these can't be edited from the UI if they were defined in YAML. They will be grayed out or inaccessible.

<p class='img'>
    <img class="no-shadow" src='/images/docs/configuration/coordinates-defined-in-yaml.png' alt='Screenshot showing coordinates cannot be edited because they are defined in configuration.yaml file'>
    Screenshot showing coordinates cannot be edited because they are defined in configuration.yaml file.
</p>

To get started with the general settings in YAML, follow these steps:

1. Copy the following information to your {% term "`configuration.yaml`" %} file.

    ```yaml
    homeassistant:
      name: Home
      latitude: 32.87336
      longitude: 117.22743
      elevation: 430
      radius: 100
      unit_system: metric
      currency: USD
      country: US
      time_zone: "America/Los_Angeles"
      allowlist_external_dirs:
        - "/usr/var/dumping-ground"
        - "/tmp"
      allowlist_external_urls:
        - "http://images.com/image1.png"
      media_dirs:
        media: "/media"
        recordings: "/mnt/recordings"
      debug: false
    ```

2. Edit each entry to fit your home.

{% configuration %}
name:
  description: Name of the location where Home Assistant is running.
  required: false
  type: string
latitude:
  description: Latitude of your location required to calculate the time the sun rises and sets.
  required: false
  type: float
longitude:
  description: Longitude of your location required to calculate the time the sun rises and sets.
  required: false
  type: float
elevation:
  description: Altitude above sea level in meters. Impacts sunrise data.
  required: false
  type: integer
radius:
  description: Radius in meters defining your locations area. Impacts location awareness.
  required: false
  type: integer
unit_system:
  description: "`metric` for Metric, `us_customary` for US Customary. This also sets temperature_unit, Celsius for Metric and Fahrenheit for US Customary"
  required: false
  type: string
temperature_unit:
  description: "Override temperature unit set by unit_system. `C` for Celsius, `F` for Fahrenheit."
  required: false
  type: string
time_zone:
  description: "Pick your time zone from the column **TZ** of [Wikipedia's list of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)"
  required: false
  type: string
currency:
  description: "Pick your currency code from the column **Code** of [Wikipedia's list of ISO 4217 active codes](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)"
  required: false
  type: string
  default: "EUR"
external_url:
  description: "The URL that Home Assistant is available on from the internet. For example: `https://example.duckdns.org:8123`. Note that this setting may only contain a protocol, hostname and port; using a path is not supported. This can also be configured by navigating to **{% my network title="Settings > System > Network" %}**."
  required: false
  type: string
internal_url:
  description: "The URL that Home Assistant is available on from your local network. For example: `http://192.168.0.10:8123`. Note that this setting may only contain a protocol, hostname and port; using a path is not supported. This can also be configured by navigating to **{% my network title="Settings > System > Network" %}**."
  required: false
  type: string
customize:
  description: "[Customize](#editing-entity-settings-in-yaml) entities."
  required: false
  type: string
customize_domain:
  description: "[Customize](#editing-entity-settings-in-yaml) all entities in a domain."
  required: false
  type: string
customize_glob:
  description: "[Customize](#editing-entity-settings-in-yaml) entities matching a pattern."
  required: false
  type: string
allowlist_external_dirs:
  description: "Extra folders that integrations are allowed to read from or write to, on top of the defaults. By default, the `www` folder inside your configuration directory and every folder listed under `media_dirs` are already allowed, and you do not need to repeat them here. Only add directories outside of those defaults."
  required: false
  type: list
allowlist_external_urls:
  description: List of external URLs that can be fetched. URLs can match specific resources (e.g., `http://10.10.10.12/images/image1.jpg`) or a relative path that allows access to resources within it (e.g., `http://10.10.10.12/images` would allow access to anything under that path)
  required: false
  type: list
media_dirs:
  description: A mapping of local media sources and their paths on disk.
  required: false
  type: map
language:
  description: "Default language used by Home Assistant. This may, for example, influence the language used by voice assistants. The language should be specified as an RFC 5646 language tag, and must be a language which Home Assistant is translated to."
  required: false
  type: string
  default: "en"
country:
  description: "Country in which Home Assistant is running. This may, for example, influence radio settings to comply with local regulations. The country should be specified as an ISO 3166.1 alpha-2 code. Pick your country from the column **Code** of [Wikipedia's list of ISO 31661 alpha-2 officially assigned code codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)"
  required: false
  type: string
debug:
  description: Enable Home Assistant's built-in debug, which can help locate misbehaving integrations by enabling run-time checks for implementation errors. It can block many unsafe thread operations from crashing the system. Enabling debug has a slight performance impact on the system and is not recommended for long-term use.
  required: false
  type: boolean
  default: false
webrtc:
  description: A [custom list of STUN and TURN servers for WebRTC video streaming](#custom-stun-and-turn-servers).
  required: false
  type: map
{% endconfiguration %}

## Editing entity settings in YAML

The Home Assistant Core integration is also responsible for entity settings.
By default, all of your devices will be visible and have a default icon determined by their domain. You can customize the look and feel of your front page by altering some of these parameters. This can be done by overriding attributes of specific entities.

Most of these settings can be changed from the UI. For the detailed steps, refer to [Customizing entities](/docs/configuration/customizing-devices/).

If you prefer editing in YAML, you can define your general settings in the {% term "`configuration.yaml`" %} file.

### Possible values

{% configuration customize %}
friendly_name:
  description: Name of the entity as displayed in the UI.
  required: false
  type: string
entity_picture:
  description: URL to use as picture for entity.
  required: false
  type: string
icon:
  description: "Any icon from [Material Design Icons](https://pictogrammers.com/library/mdi/). Prefix name with `mdi:`, ie `mdi:home`. Note: Newer icons may not yet be available in the current Home Assistant release."
  required: false
  type: string
assumed_state:
  description: For switches with an assumed state two buttons are shown (turn off, turn on) instead of a switch. By setting `assumed_state` to `false` you will get the default switch icon.
  required: false
  type: boolean
  default: true
device_class:
  description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
  required: false
  type: device_class
  default: None
unit_of_measurement:
  description: Defines the units of measurement, if any. This will also influence the graphical presentation in the history visualization as continuous value. Sensors with missing `unit_of_measurement` are showing as discrete values.
  required: false
  type: string
  default: None
initial_state:
  description: Sets the initial state for automations, `on` or `off`.
  required: false
  type: boolean
  default: None
{% endconfiguration %}

### Device class

Devices classes categorize certain entities and influence how these are shown in the dashboard. Some device classes categorize by measurement type, such as sensors or binary sensors. Other device classes categorize into more specific types. For example, a cover can be a blind or a curtain. For a given platform, the device class influences what is shown in the user interface. For example: humidifier has two device classes, humidifier and dehumidifier. If the device class is set to `humidifier`, the UI shows **Humidifying**. If it is set to `dehumidifier`, it shows **Drying**.

Device class is currently supported by the following platforms:

- [Binary sensor](/integrations/binary_sensor/#device-class)
- [Button](/integrations/button/#device-class)
- [Cover](/integrations/cover/#device-class)
- [Event](/integrations/event/#device-class)
- [Humidifier](/integrations/humidifier/#device-class)
- [Media player](/integrations/media_player/#device-class)
- [Number](/integrations/number/#device-class)
- [Sensor](/integrations/sensor#device-class)
- [Switch](/integrations/switch/#device-class)
- [Update](/integrations/update/#device-class)
- [Valve](/integrations/valve/#device-class)

For a list of the supported device classes, refer to the documentation of the platform.

### Manual customization

{% important %}
If you implement `customize`, `customize_domain`, or `customize_glob`, in your {% term "`configuration.yaml`" %} file, you must make sure it is done inside of `homeassistant:` or it will fail.
{% endimportant %}

```yaml
homeassistant:
  name: Home
  unit_system: metric
  # etc

  customize:
    # Add an entry for each entity that you want to overwrite.
    thermostat.family_room:
      entity_picture: https://example.com/images/nest.jpg
      friendly_name: Nest
    switch.wemo_switch_1:
      friendly_name: Toaster
      entity_picture: /local/toaster.jpg
    switch.wemo_switch_2:
      friendly_name: Kitchen kettle
      icon: mdi:kettle
    switch.rfxtrx_switch:
      assumed_state: false
    media_player.my_media_player:
      source_list:
        - Channel/input from my available sources
  # Customize all entities in a domain
  customize_domain:
    light:
      icon: mdi:home
    automation:
      initial_state: "on"
  # Customize entities matching a pattern
  customize_glob:
    "light.kitchen_*":
      icon: mdi:description
    "scene.month_*_colors":
      icon: mdi:other
```

## Custom STUN and TURN servers

It's possible to override the default list of STUN and TURN servers which are used to initiate WebRTC streaming.
Each STUN or TURN server can be configured as described in the table below.

{% configuration webrtc %}
ice_servers:
  description: List of STUN and TURN server configurations
  required: true
  type: list
  keys:
    url:
      description: STUN or TURN server URLs. This can either be a single URL or a list of URLs.
      required: true
      type: string
    username:
      description: Username for TURN server authentication
      required: false
      type: string
    credential:
      description: Credential for TURN server authentication
      required: false
      type: string
{% endconfiguration %}

### WebRTC configuration example

{% important %}
If you implement `webrtc` in your {% term "`configuration.yaml`" %} file, you must make sure it is done inside of `homeassistant:` or it will fail.
{% endimportant %}

```yaml
homeassistant:
  name: Home
  unit_system: metric
  # etc

  webrtc:
    ice_servers:
    # Add an entry for each STUN or TURN server
    - url:
      - "stun:stun.example.com:19302"
      - "stun:stun2.example.com:12345"
    - url: "turn:turn.domain.com"
      username: "username"
      credential: "abc123"
```

{% include integrations/triggers.md %}

{% include integrations/actions.md %}

## Home Assistant Core automation examples

You can use these core triggers to react to events, state changes, schedules, and Home Assistant lifecycle events.

{% include docs/paste_yaml_tip.md %}

### Automation: send a notification when Home Assistant starts

If you restart Home Assistant for an update or maintenance, this automation lets you know when it is ready again. It sends a message to your phone as soon as startup finishes.

- **Trigger**: Home Assistant
  - **Event**: Start
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when Home Assistant starts" %}

{% example %}
automation: |
  alias: "Notify when Home Assistant starts"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Home Assistant has started."
{% endexample %}

{% enddetails %}

### Automation: save persistent states before Home Assistant shuts down

If you are about to restart or stop Home Assistant, this automation tells Home Assistant to save persistent states right away. This can be useful before planned maintenance.

- **Trigger**: Home Assistant
  - **Event**: Shutdown
- **Action**: Save persistent states

{% details "YAML example for saving persistent states before shutdown" %}

{% example %}
automation: |
  alias: "Save persistent states before shutdown"
  triggers:
    - trigger: homeassistant
      event: shutdown
  actions:
    - action: homeassistant.save_persistent_states
{% endexample %}

{% enddetails %}

### Automation: send a reminder when a door stays open for 5 minutes

If a door stays open longer than expected, this automation sends a message to your phone. It uses the **State** trigger to wait until the entity stays in the `on` state for 5 minutes.

- **Trigger**: State
  - **Entity**: Back door sensor (`binary_sensor.back_door`)
  - **To**: `on`
  - **For**: 5 minutes
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a door-left-open reminder" %}

{% example %}
automation: |
  alias: "Remind me when the back door stays open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.back_door
      to: "on"
      for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The back door has been open for 5 minutes."
{% endexample %}

{% enddetails %}
