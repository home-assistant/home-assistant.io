---
title: "Fan"
description: "Instructions on how to setup Fan devices within Home Assistant."
logo: home-assistant.png
ha_category:
  - Fan
ha_qa_scale: internal
ha_release: 0.27
---

The `fan` integration is built for the controlling of fan devices.



## Services

### Fan control services

Available services: `fan.set_speed`, `fan.turn_on`, `fan.turn_off`, `fan.oscillate`, `fan.toggle`, `fan.set_direction`, `fan.xiaomi_miio_set_buzzer_on`, `fan.xiaomi_miio_set_buzzer_off`, `fan.xiaomi_miio_set_led_on`, `fan.xiaomi_miio_set_led_off`, `fan.xiaomi_miio_set_child_lock_on`, `fan.xiaomi_miio_set_child_lock_off`, `fan.xiaomi_miio_set_favorite_level`, `fan.xiaomi_miio_set_led_brightness`, `fan.xiaomi_miio_set_auto_detect_on`, `fan.xiaomi_miio_set_auto_detect_off`, `fan.xiaomi_miio_set_learn_mode_on`, `fan.xiaomi_miio_set_learn_mode_off`, `fan.xiaomi_miio_set_volume`, `fan.xiaomi_miio_reset_filter`, `fan.xiaomi_miio_set_extra_features`, `fan.xiaomi_miio_set_target_humidity`, `fan.xiaomi_miio_set_dry_on`, `fan.xiaomi_miio_set_dry_off`, `fan.wemo_set_humidity`, `fan.wemo_reset_filter_life`, 

<div class='note'>

  Not all fan services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services**.
    
</div>



### Service `fan.set_speed`

Sets fan speed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the entities to set
| `speed` | no | Speed setting


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.set_speed
    data:
      entity_id: fan.living_room,
	    speed: low,

```


### Service `fan.turn_on`

Turns fan on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Names(s) of the entities to turn on
| `speed` | no | Speed setting


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.turn_on
    data:
	    entity_id: fan.living_room,
	    speed: high,

```


### Service `fan.turn_off`

Turns fan off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Names(s) of the entities to turn off


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.turn_off
    data:
	    entity_id: fan.living_room,

```


### Service `fan.oscillate`

Oscillates the fan.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the entities to oscillate
| `oscillating` | no | Flag to turn on/off oscillation


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.oscillate
    data:
	    entity_id: fan.desk_fan,
	    oscillating: true,

```


### Service `fan.toggle`

Toggle the fan on/off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the entities to toggle


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.toggle
    data:
	    entity_id: fan.living_room,

```


### Service `fan.set_direction`

Set the fan rotation.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the entities to toggle
| `direction` | no | The direction to rotate. Either 'forward' or 'reverse'


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.set_direction
    data:
	    entity_id: fan.living_room,
	    direction: forward,

```


### Service `fan.xiaomi_miio_set_buzzer_on`

Turn the buzzer on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_buzzer_on
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_buzzer_off`

Turn the buzzer off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_buzzer_off
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_led_on`

Turn the led on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_led_on
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_led_off`

Turn the led off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_led_off
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_child_lock_on`

Turn the child lock on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_child_lock_on
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_child_lock_off`

Turn the child lock off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_child_lock_off
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_favorite_level`

Set the favorite level.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.
| `level` | no | Level, between 0 and 16.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_favorite_level
    data:
	    entity_id: fan.xiaomi_miio_device,
	    level: 1,

```


### Service `fan.xiaomi_miio_set_led_brightness`

Set the led brightness.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.
| `brightness` | no | Brightness (0 = Bright, 1 = Dim, 2 = Off)


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_led_brightness
    data:
	    entity_id: fan.xiaomi_miio_device,
	    brightness: 1,

```


### Service `fan.xiaomi_miio_set_auto_detect_on`

Turn the auto detect on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_auto_detect_on
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_auto_detect_off`

Turn the auto detect off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_auto_detect_off
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_learn_mode_on`

Turn the learn mode on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_learn_mode_on
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_learn_mode_off`

Turn the learn mode off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_learn_mode_off
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_volume`

Set the sound volume.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.
| `volume` | no | Volume, between 0 and 100.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_volume
    data:
	    entity_id: fan.xiaomi_miio_device,
	    volume: 50,

```


### Service `fan.xiaomi_miio_reset_filter`

Reset the filter lifetime and usage.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_reset_filter
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_extra_features`

Manipulates a storage register which advertises extra features. The Mi Home app evaluates the value. A feature called "turbo mode" is unlocked in the app on value 1.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.
| `features` | no | Integer, known values are 0 (default) and 1 (turbo mode).


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_extra_features
    data:
	    entity_id: fan.xiaomi_miio_device,
	    features: 1,

```


### Service `fan.xiaomi_miio_set_target_humidity`

Set the target humidity.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.
| `humidity` | no | Target humidity. Allowed values are 30, 40, 50, 60, 70 and 80.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_target_humidity
    data:
	    entity_id: fan.xiaomi_miio_device,
	    humidity: 50,

```


### Service `fan.xiaomi_miio_set_dry_on`

Turn the dry mode on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_dry_on
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.xiaomi_miio_set_dry_off`

Turn the dry mode off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name of the xiaomi miio entity.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.xiaomi_miio_set_dry_off
    data:
	    entity_id: fan.xiaomi_miio_device,

```


### Service `fan.wemo_set_humidity`

Set the target humidity of WeMo humidifier devices.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Names of the WeMo humidifier entities (1 or more entity_ids are required).
| `target_humidity` | no | Target humidity. This is a float value between 0 and 100, but will be mapped to the humidity levels that WeMo humidifiers support (45, 50, 55, 60, and 100/Max) by rounding the value down to the nearest supported value.


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.wemo_set_humidity
    data:
	    entity_id: fan.wemo_humidifier,
	    target_humidity: 56.5,

```


### Service `fan.wemo_reset_filter_life`

Reset the WeMo Humidifier's filter life to 100%.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Names of the WeMo humidifier entities (1 or more entity_ids are required).


#### Automation example

```yaml
automation:
trigger:
  platform: time
  at: "07:15:00"
action:
  - service: fan.wemo_reset_filter_life
    data:
	    entity_id: fan.wemo_humidifier,

```


  