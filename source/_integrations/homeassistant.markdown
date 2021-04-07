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
ha_iot_class:
---

The Home Assistant integration provides generic implementations like the generic `homeassistant.turn_on`.

## Services

The `homeassistant` integration provides services for controlling Home Assistant itself, as well as generic controls for any entity.

### Service `homeassistant.check_config`

Reads the configuration files and checks them for correctness, but **does not** load them into Home Assistant. Creates a persistent notification and log entry if errors are found.

### Service `homeassistant.reload_config_entry`

Reloads an integration config entry.

| Service data attribute    | Description                                           |
|---------------------------|-------------------------------------------------------|
| `entity_id`               | List of entity ids used to reference a config entry.  |
| `area_id`                 | List of area ids used to reference a config entry.    |
| `device_id`               | List of device ids used to reference a config entry.  |

### Service `homeassistant.reload_core_config`

Reloads the core configuration under `homeassistant:` and all linked files. Once loaded the new configuration is applied. New `customize:` information will be applied the next time the state of the entity gets updated.

### Service `homeassistant.restart`

Restarts the Home Assistant instance (also reloading the configuration on start). 

This will also do a configuration check before doing a restart. If the configuration check fails then Home Assistant will not be restarted, instead a persistent notification with the ID `persistent_notification.homeassistant_check_config` will be created. The logs will show details on what failed the configuration check.

### Service `homeassistant.stop`

Stops the Home Assistant instance. Home Assistant must be restarted from the Host device to run again.

### Service `homeassistant.set_location`

Update the location of the Home Assistant default zone (usually "Home").

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `latitude`                |       no | Latitude of your location.                            |
| `longitude`               |       no | Longitude of your location.                           |

#### Example

```yaml
action:
  service: homeassistant.set_location
  data:
    latitude: 32.87336
    longitude: 117.22743
```

### Service `homeassistant.toggle` 

Generic service to toggle devices on/off under any domain. Same usage as the light.turn_on, switch.turn_on, etc. services.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       yes | The entity_id of the device to toggle on/off.         |

#### Example

```yaml
action:
  service: homeassistant.toggle
  target:
    entity_id: light.living_room
```

### Service `homeassistant.turn_on` 

Generic service to turn devices on under any domain. Same usage as the light.turn_on, switch.turn_on, etc. services.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       yes | The entity_id of the device to turn on.               |

#### Example

```yaml
action:
  service: homeassistant.turn_on
  target:
    entity_id: light.living_room
```

### Service `homeassistant.turn_off` 

Generic service to turn devices off under any domain. Same usage as the light.turn_on, switch.turn_on, etc. services.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       yes | The entity_id of the device to turn off.              |

#### Example

```yaml
action:
  service: homeassistant.turn_off
  target:
    entity_id: light.living_room
```

### Service `homeassistant.update_entity` 

Force one or more entities to update its data rather than wait for the next scheduled update.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | One or multiple entity_ids to update. It can be a list.  |

#### Example

```yaml
action:
  service: homeassistant.update_entity
  target:
    entity_id:
    - light.living_room
    - switch.coffe_pot
```
