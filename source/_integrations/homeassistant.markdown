---
title: Home Assistant Core Integration
description: Description of the homeassistant integration.
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
      external_url: "https://www.example.com"
      internal_url: "http://homeassistant.local:8123"
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
  description: "The URL that Home Assistant is available on from the internet. For example: `https://example.duckdns.org:8123`. Note that this setting may only contain a protocol, hostname and port; using a path is not supported."
  required: false
  type: string
internal_url:
  description: "The URL that Home Assistant is available on from your local network. For example: `http://homeassistant.local:8123`. Note that this setting may only contain a protocol, hostname and port; using a path is not supported."
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
  description: List of folders that can be used as sources for sending files.
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

## Actions

The `homeassistant` integration provides actions for controlling Home Assistant itself, as well as generic controls for any entity.

### Action `homeassistant.check_config`

Reads the configuration files and checks them for correctness, but **does not** load them into Home Assistant. Creates a persistent notification and log entry if errors are found.

### Action `homeassistant.reload_all`

Reload all YAML configuration that can be reloaded without restarting Home Assistant.

It calls the `reload` action on all domains that have it available. Additionally,
it reloads the core configuration (equivalent to calling
`homeassistant.reload_core_config`), themes (`frontend.reload_themes`), and custom Jinja (`homeassistant.reload_custom_templates`).

Prior to reloading, a basic configuration check is performed. If that fails, the reload
will not be performed and will raise an error.

### Action `homeassistant.reload_custom_templates`

Reload all Jinja templates in the `config/custom_templates` directory. Changes to these templates
will take effect the next time an importing template is rendered.

### Action `homeassistant.reload_config_entry`

Reloads an integration config entry.

| Data attribute | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `entity_id`    | List of entity ids used to reference a config entry.       |
| `area_id`      | List of area ids used to reference a config entry.         |
| `device_id`    | List of device ids used to reference a config entry.       |
| `entry_id`     | A single config entry id used to reference a config entry. |

### Action `homeassistant.reload_core_config`

Reloads the core configuration under `homeassistant:` and all linked files. Once loaded the new configuration is applied. New `customize:` information will be applied the next time the state of the entity gets updated.

### Action `homeassistant.restart`

Restarts the Home Assistant instance (also reloading the configuration on start).

This will also do a configuration check before doing a restart. If the configuration check fails then Home Assistant will not be restarted, instead a persistent notification with the ID `persistent_notification.homeassistant_check_config` will be created. The logs will show details on what failed the configuration check.

### Action `homeassistant.stop`

Stops the Home Assistant instance. Home Assistant must be restarted from the Host device to run again.

### Action `homeassistant.set_location`

Update the location of the Home Assistant default zone (usually "Home").

| Data attribute | Optional | Description                 |
| -------------- | -------- | --------------------------- |
| `latitude`     | no       | Latitude of your location.  |
| `longitude`    | no       | Longitude of your location. |
| `elevation`    | yes      | Elevation of your location. |

#### Example

```yaml
actions:
  - action: homeassistant.set_location
    data:
      latitude: 32.87336
      longitude: 117.22743
      elevation: 120
```

### Action `homeassistant.toggle`

Generic action to toggle devices on/off. Same usage as the
`light.toggle`, `switch.toggle`, etc. actions. The difference with this
action compared the others, is that is can be used to mix different domains,
for example, a light and a switch can be toggled in a single action.

| Data attribute | Optional | Description                                   |
| -------------- | -------- | --------------------------------------------- |
| `entity_id`    | yes      | The entity_id of the device to toggle on/off. |

#### Example

```yaml
actions:
  - action: homeassistant.toggle
    target:
      entity_id: 
        - light.living_room
        - switch.tv
```

### Action `homeassistant.turn_on`

Generic action to toggle devices on. Same usage as the
`light.turn_on`, `switch.turn_on`, etc. actions. The difference with this
action compared the others, is that is can be used to mix different domains,
for example, a light and a switch can be turned on in a single action.

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `entity_id`    | yes      | The entity_id of the device to turn on. |

#### Example

```yaml
actions:
  - action: homeassistant.turn_on
    target:
      entity_id:
        - light.living_room
        - switch.tv
```

### Action `homeassistant.turn_off` 

Generic action to toggle devices off. Same usage as the
`light.turn_off`, `switch.turn_off`, etc. actions. The difference with this
action compared the others, is that is can be used to mix different domains,
for example, a light and a switch can be turned off in a single action.

| Data attribute | Optional | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `entity_id`    | yes      | The entity_id of the device to turn off. |

#### Example

```yaml
actions:
  - action: homeassistant.turn_off
    target:
      entity_id:
        - light.living_room
        - switch.tv
```

### Action `homeassistant.update_entity`

Force one or more entities to update its data rather than wait for the next scheduled update.

| Data attribute | Optional | Description                                             |
| -------------- | -------- | ------------------------------------------------------- |
| `entity_id`    | no       | One or multiple entity_ids to update. It can be a list. |

#### Example

```yaml
actions:
  - action: homeassistant.update_entity
    target:
      entity_id:
      - light.living_room
      - switch.coffe_pot
```

### Action `homeassistant.save_persistent_states`

Save the persistent states (for entities derived from RestoreEntity) immediately.
Maintain the normal periodic saving interval.

Normally these states are saved at startup, every 15 minutes and at shutdown.
