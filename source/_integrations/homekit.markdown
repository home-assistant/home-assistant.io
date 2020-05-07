---
title: HomeKit Bridge
description: Instructions on how to set up the HomeKit Bridge integration in Home Assistant.
ha_category:
  - Voice
ha_release: 0.64
ha_iot_class: Local Push
ha_domain: homekit
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
---

The HomeKit Bridge integration allows you to forward entities from Home Assistant to Apple HomeKit, so they can be controlled from Apple's Home app and Siri. Please make sure that you have read the [considerations](#considerations) listed below to save you some trouble later. However if you do encounter issues, check out the [troubleshooting](#troubleshooting) section.

<div class="note">

  If you want to control `HomeKit` only devices with Home Assistant, check out the [HomeKit controller](/integrations/homekit_controller/) component.

</div>

<div class="note warning">

If you are using the official Home Assistant images or running Home Assistant Core on Docker, HomeKit is ready to go out of the box. If you are running Home Assistant in a manual virtual environment or on a NAS without Docker, you may need to install or upgrade dependencies for HomeKit to function.

HomeKit requires openssl 1.1.0 or later as the HomeKit Accessory Protocol (HAP) uses the `ChaCha20` stream cipher and the `Poly1305` authenticator.

It might be necessary to install an additional package:
`sudo apt-get install libavahi-compat-libdnssd-dev`

</div>

To add `HomeKit Bridge` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **HomeKit Bridge**.

If you need to use the `entity_config`, `ip_address`, or `advertise_ip` configuration options, `HomeKit Bridge` must be configured via your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry configuring HomeKit
homekit:
- filter:
    include_domains:
      - alarm_control_panel
      - light
      - media_player
    include_entities:
      - binary_sensor.living_room_motion
  entity_config:
    alarm_control_panel.home:
      code: 1234
    binary_sensor.living_room_motion:
      linked_battery_sensor: sensor.living_room_motion_battery
      low_battery_threshold: 31
    light.kitchen_table:
      name: Kitchen Table Light
    lock.front_door:
      code: 1234
    media_player.living_room:
      feature_list:
        - feature: on_off
        - feature: play_pause
        - feature: play_stop
        - feature: toggle_mute
    switch.bedroom_outlet:
      type: outlet
    camera.back_porch:
      support_audio: True
- name: HASS Bridge 2
  port: 56332
  filter:
    include_domains:
      - light
```

{% configuration %}
  homekit:
    description: HomeKit configuration.
    required: true
    type: map
    keys:
      auto_start:
        description: Flag if the HomeKit Server should start automatically after the Home Assistant Core Setup is done. ([Disable Auto Start](#disable-auto-start))
        required: false
        type: boolean
        default: true
      port:
        description: Port for the HomeKit extension.
        required: false
        type: integer
        default: 51827
      name:
        description: Need to be individual for each instance of Home Assistant using the integration on the same local network. Between `3` and `25` characters. Alphanumeric and spaces allowed.
        required: false
        type: string
        default: '`Home Assistant Bridge`'
      ip_address:
        description: The local network IP address. Only necessary if the default from Home Assistant does not work.
        required: false
        type: string
      safe_mode:
        description: Only set this parameter if you encounter issues during pairing. ([Safe Mode](#safe-mode))
        required: false
        type: boolean
        default: false
      zeroconf_default_interface:
        description: By default, zeroconf will attempt to bind to all interfaces. For systems running using network isolation or similar, this may result HomeKit not being seen on the network. Change this option to `true` if HomeKit cannot be discovered.
        required: true
        type: boolean
        default: false
      advertise_ip:
        description: If you need to override the IP address used for mDNS advertisement. (For example, using network isolation in Docker and together with an mDNS forwarder like `avahi-daemon` in reflector mode)
        required: false
        type: string
      filter:
        description: Filters for entities to be included/excluded from HomeKit. ([Configure Filter](#configure-filter))
        required: false
        type: map
        keys:
          include_domains:
            description: Domains to be included.
            required: false
            type: list
          include_entities:
            description: Entities to be included.
            required: false
            type: list
          exclude_domains:
            description: Domains to be excluded.
            required: false
            type: list
          exclude_entities:
            description: Entities to be excluded.
            required: false
            type: list
      entity_config:
        description: Configuration for specific entities. All subordinate keys are the corresponding entity ids to the domains, e.g., `alarm_control_panel.alarm`.
        required: false
        type: map
        keys:
          '`<ENTITY_ID>`':
            description: Additional options for specific entities.
            required: false
            type: map
            keys:
              name:
                description: Name of the entity to show in HomeKit. HomeKit will cache the name on the first run so the accessory must be [reset](#resetting-accessories) for any change to take effect.
                required: false
                type: string
              linked_battery_sensor:
                description: The `entity_id` of a `sensor` entity to use as the battery of the accessory. HomeKit will cache an accessory's feature set on the first run so a device must be [reset](#resetting-accessories) for any change to take effect.
                required: false
                type: string
              low_battery_threshold:
                description: Minimum battery level before the accessory starts reporting a low battery.
                required: false
                type: integer
                default: 20
              code:
                description: Code to `arm / disarm` an alarm or `lock / unlock` a lock. Only applicable for `alarm_control_panel` or `lock` entities.
                required: false
                type: string
                default: '`<No code>`'
              feature_list:
                description: Only for `media_player` entities. List of feature dictionaries to add for a given entity. Comparable to the platform schema.
                required: false
                type: list
                keys:
                  feature:
                    description: Name of the feature to add to the entity representation. Valid features are `on_off`, `play_pause`, `play_stop` and `toggle_mute`. The media_player entity must support the feature to be valid.
                    required: true
                    type: string
              type:
                description: Only for `switch` entities. Type of accessory to be created within HomeKit. Valid types are `faucet`, `outlet`, `shower`, `sprinkler`, `switch` and `valve`. HomeKit will cache the type on the first run so a device must be [reset](#resetting-accessories) for any change to take effect.
                required: false
                type: string
                default: '`switch`'
              stream_address:
                description: Only for `camera` entities. The source IP address to use when streaming to RTP clients. If your Home Assistant host has multiple interfaces, selecting a specific IP may be necessary.
                required: false
                type: string
                default: local IP from Home Assistant
              stream_source:
                description: Only for `camera` entities. A URL, file or other valid FFmpeg input string to use as the stream source, rather than the default camera source. Required for camera entities that do not natively support streaming (MJPEG). If `-i` is not found in the stream source, it is prepended to construct the FFmpeg input.
                required: false
                type: string
                default: stream source from camera entity
              support_audio:
                description: Only for `camera` entities. Whether the camera supports audio. Audio is disabled unless this flag is set to `True`.
                required: false
                type: boolean
                default: '`False`'
              max_width:
                description: Only for `camera` entities. Maximum width supported by camera. Used when generating advertised video resolutions.
                required: false
                type: integer
                default: 1920
              max_height:
                description: Only for `camera` entities. Maximum height supported by camera. Used when generating advertised video resolutions.
                required: false
                type: integer
                default: 1080
              max_fps:
                description: Only for `camera` entities. Maximum fps supported by camera. Used when generating advertised video resolutions.
                required: false
                type: integer
                default: 30
              audio_map:
                description: Only for `camera` entities. FFmpeg [stream selection mapping](https://ffmpeg.org/ffmpeg.html#Stream-selection) for the audio-only stream. Selects the first audio stream in the input stream by default. If your input stream has multiple audio streams, this may need to be adjusted.
                required: false
                type: string
                default: '`0:a:0`'
              video_map:
                description: Only for `camera` entities. FFmpeg [stream selection mapping](https://ffmpeg.org/ffmpeg.html#Stream-selection) for the video-only stream. Selects the first video stream in the input stream by default. If your input stream has multiple video streams, this may need to be adjusted.
                required: false
                type: string
                default: '`0:v:0`'
              audio_packet_size:
                description: Only for `camera` entities. RTP packet size used for streaming audio to HomeKit clients.
                required: false
                type: integer
                default: 188
              video_packet_size:
                description: Only for `camera` entities. RTP packet size used for streaming video to HomeKit clients.
                required: false
                type: integer
                default: 1316
              video_codec:
                description: Only for `camera` entities. FFmpeg video codec for transcoding. `copy` option reduces CPU load when video source already encoded with `H264` (MPEG4). `h264_omx` option is only available with custom FFmpeg builds and enables GPU Hardware acceleration on Raspberry Pi.
                required: false
                type: string
                default: libx264
                available options: copy, libx264, h264_omx
              audio_codec:
                description: Only for `camera` entities. FFmpeg audio codec for transcoding. `copy` option reduces CPU load when audio source already encoded with `libopus`.
                required: false
                type: string
                default: libopus
                available options: copy, libopus
{% endconfiguration %}


## Setup

To enable the HomeKit integration in Home Assistant, add the following to your configuration file:

```yaml
# Example for HomeKit setup
homekit:
```

After Home Assistant has started, the entities specified by the filter are exposed to HomeKit if they are [supported](#supported-components). To add them:

1. Open the Home Assistant frontend. A new card will display the pairing QR code and the `pin code` as seen in the example below. Note: If pin code is not displayed, check "Notifications" (the bell icon) in the lower-left of the Home Assistant UI.
2. Open the `Home` app.
3. Click `Add Accessory`, then scan the QR code or select `Don't Have a Code or Can't Scan?` and choose the `Home Assistant Bridge`.
4. Confirm that you are adding an `Uncertified Accessory` by clicking on `Add Anyway`.
5. Enter the `PIN` code (skip this step if you scanned the QR code).
6. Follow the setup by clicking on `Next` and lastly `Done` in the top right-hand corner.
7. The `Home Assistant` Bridge and the Accessories should now be listed in the `Home` app.

After the setup is completed, you should be able to control your Home Assistant integrations through Apple's Home and Siri.

<p class='img'>
  <img src='/images/screenshots/homekit_pairing_example.png' />
</p>

## Move Home Assistant install

If you like to retain your HomeKit pairing through a move to a new Home Assistant device or installation, besides copying the configurations files you need to copy the `.storage/homekit.*` file inside your configurations directory. Keep in mind though that the file is usually hidden by default, depending on your operating system.

Before you copy it, make sure to stop the old and new Home Assistant instances first entirely, otherwise it won't work.

## Considerations

### Accessory ID

Currently, this integration uses the `entity_id` to generate a unique `accessory id (aid)` for `HomeKit`. The `aid` is used to identify a device and save all configurations made for it. This, however, means that if you decide to change an `entity_id` that does not have a `unique_id`, all configurations for this accessory made in the `Home` app will be lost.

### Device Limit

The HomeKit Accessory Protocol Specification only allow a maximum of 150 unique accessories (`aid`) per bridge. Be mindful of this when configuring the filter(s). If you plan on exceeding the 150 device limit, it is possible to create multiple bridges. If you need specific configuration for some entities via `entity_config` be sure to add them to a bridge configured via `YAML`.

### Persistence Storage

Unfortunately `HomeKit` doesn't support any persistent storage - only the configuration for accessories that are added to the `Home Assistant Bridge` are kept. To avoid problems, it is recommended to use an automation to always start `HomeKit` with at least the same entities setup. If for some reason some entities are not set up, their configuration will be deleted. (State unknown or similar will not cause any issues.)

A common situation might be if you decide to disable parts of the configuration for testing. Please make sure to disable `auto start` and `turn off` the `Start HomeKit` automation (if you have one).

## Disable Auto Start

Depending on your setup, it might be necessary to disable `Auto Start` for all accessories to be available for `HomeKit`. Only those entities that are fully set up when the `HomeKit` integration is started, can be added. To start `HomeKit` when `auto_start: false`, you can call the service `homekit.start`.

If you have Z-Wave entities you want to be exposed to HomeKit, then you'll need to disable auto start and then start it after the Z-Wave mesh is ready. This is because the Z-Wave entities won't be fully set up until then. This can be automated using an automation.

<div class='note'>

Please remember that you can only have a single `automation` entry. Add the automation to your existing automations.

</div>

{% raw %}
```yaml
# Example for Z-Wave
homekit:
  auto_start: false

automation:
  - alias: 'Start HomeKit'
    trigger:
      - platform: event
        event_type: zwave.network_ready
      - platform: event
        event_type: zwave.network_complete
      - platform: event
        event_type: zwave.network_complete_some_dead
    action:
      - service: homekit.start
```
{% endraw %}

For a general delay where your integration doesn't generate an event, you can also do:

{% raw %}
```yaml
# Example using a delay after the start of Home Assistant
homekit:
  auto_start: false

automation:
  - alias: 'Start HomeKit'
    trigger:
      - platform: homeassistant
        event: start
    action:
      - delay: 00:05  # Waits 5 minutes
      - service: homekit.start
```
{% endraw %}

In some cases it might be desirable to check that all entities are available before starting `HomeKit`. This can be accomplished by adding an additional `binary_sensor` as follows:

{% raw %}
```yaml
# Example checking specific entities to be available before start
homekit:
  auto_start: false

automation:
  - alias: 'Start HomeKit'
    trigger:
      - platform: homeassistant
        event: start
    action:
      - wait_template: >-
          {% if not states.light.kitchen_lights %}
            false
          {% elif not states.sensor.outside_temperature %}
            false
          # Repeat for every entity
          {% else %}
            true
          {% endif %}
        timeout: 00:15  # Waits 15 minutes
        continue_on_timeout: false
      - service: homekit.start
```
{% endraw %}

## Configure Filter

By default, no entity will be excluded. To limit which entities are being exposed to `HomeKit`, you can use the `filter` parameter. Keep in mind only [supported components](#supported-components) can be added.

{% raw %}
```yaml
# Example filter to include specified domains and exclude specified entities
homekit:
  filter:
    include_domains:
      - alarm_control_panel
      - light
    exclude_entities:
      - light.kitchen_light
```
{% endraw %}

Filters are applied as follows:

1. No includes or excludes - pass all entities
2. Includes, no excludes - only include specified entities
3. Excludes, no includes - only exclude specified entities
4. Both includes and excludes:
   * Include domain specified
      - if domain is included, and entity not excluded, pass
      - if domain is not included, and entity not included, fail
   * Exclude domain specified
      - if domain is excluded, and entity not included, fail
      - if domain is not excluded, and entity not excluded, pass
      - if both include and exclude domains specified, the exclude domains are ignored
   * Neither include or exclude domain specified
      - if entity is included, pass (as #2 above)
      - if entity include and exclude, the entity exclude is ignored

## Safe Mode

The `safe_mode` option should only be used (and only works) if you encounter issues during the pairing. ([Pairing hangs - zeroconf error](#pairing-hangs---zeroconf-error)).

To use `safe_mode`, add the option to your `homekit` configuration:

```yaml
homekit:
  safe_mode: true
```

Restart your Home Assistant instance. If you don't see a `pincode`, follow the [guide](#deleting-the-homekitstate-file) here. Now you should be able to pair normally.

<div class="note warning">

To avoid any errors, after you have successfully paired your Home Assistant Bridge, remove the `safe_mode` option from your configuration and restart Home Assistant.

</div>

## Docker Network Isolation

The `advertise_ip` option can be used to run this integration even inside an ephemeral Docker container with network isolation enabled, e.g., not using the host network.

You may also need to set `zeroconf_default_interface` to `true`.

To use `advertise_ip`, add the option to your `homekit` configuration:

```yaml
homekit:
  advertise_ip: "STATIC_IP_OF_YOUR_DOCKER_HOST"
  zeroconf_default_interface: true
```

Restart your Home Assistant instance. This feature requires running an mDNS forwarder on your Docker host, e.g., `avahi-daemon` in reflector mode. This kind of setup most likely requires `safe_mode` during the bridge setup.

## Firewall

If you have a firewall configured on your Home Assistant system, make sure you open the following ports:

- UDP: 5353 
- TCP: 51827

## Supported Components

The following integrations are currently supported:

| Component | Type Name | Description |
| --------- | --------- | ----------- |
| alarm_control_panel | SecuritySystem | All security systems. |
| automation / input_boolean / remote / scene / script / vacuum | Switch | All represented as switches. |
| binary_sensor | Sensor | Support for `co2`, `door`, `garage_door`, `gas`, `moisture`, `motion`, `occupancy`, `opening`, `smoke` and `window` device classes. Defaults to the `occupancy` device class for everything else. |
| camera | Camera | All camera devices. **HomeKit Secure Video is not supported at this time.** |
| climate | Thermostat | All climate devices. |
| cover | GarageDoorOpener | All covers that support `open` and `close` and have `garage` or `gate` as their `device_class`. |
| cover | WindowCovering | All covers that support `set_cover_position`. |
| cover | WindowCovering | All covers that support `open_cover` and `close_cover` through value mapping. (`open` -> `>=50`; `close` -> `<50`) |
| cover | WindowCovering | All covers that support `open_cover`, `stop_cover` and `close_cover` through value mapping. (`open` -> `>70`; `close` -> `<30`; `stop` -> every value in between) |
| device_tracker / person | Sensor | Support for `occupancy` device class. |
| fan | Fan | Support for `on / off`, `direction` and `oscillating`. |
| fan | Fan | All fans that support `speed` and `speed_list` through value mapping: `speed_list` is assumed to contain values in ascending order. The numeric ranges of HomeKit map to a corresponding entry of `speed_list`. The first entry of `speed_list` should be equivalent to `off` to match HomeKit's concept of fan speeds. (Example: `speed_list` = [`off`, `low`, `high`]; `off` -> `<= 33`; `low` -> between `33` and `66`; `high` -> `> 66`) |
| light | Light | Support for `on / off`, `brightness` and `rgb_color`. |
| lock | DoorLock | Support for `lock / unlock`. |
| media_player | MediaPlayer | Represented as a series of switches which control `on / off`, `play / pause`, `play / stop`, or `mute` depending on `supported_features` of entity and the `mode` list specified in `entity_config`. |
| media_player | TelevisionMediaPlayer | All media players that have `tv` as their `device_class`.  Represented as Television and Remote accessories in HomeKit to control `on / off`, `play / pause`, `select source`, or `volume increase / decrease`, depending on `supported_features` of entity. Requires iOS 12.2/macOS 10.14.4 or later. |
| sensor | TemperatureSensor | All sensors that have `Celsius` or `Fahrenheit` as their `unit_of_measurement` or `temperature` as their `device_class`. |
| sensor | HumiditySensor | All sensors that have `%` as their `unit_of_measurement` and `humidity` as their `device_class`. |
| sensor | AirQualitySensor | All sensors that have `pm25` as part of their `entity_id` or `pm25` as their `device_class` |
| sensor | CarbonMonoxideSensor | All sensors that have `co` as their `device_class` |
| sensor | CarbonDioxideSensor | All sensors that have `co2` as part of their `entity_id` or `co2` as their `device_class` |
| sensor | LightSensor | All sensors that have `lm` or `lx` as their `unit_of_measurement` or `illuminance` as their `device_class` |
| switch | Switch | Represented as a switch by default but can be changed by using `type` within `entity_config`. |
| water_heater | WaterHeater | All `water_heater` devices. |

## Troubleshooting

### Resetting when created via YAML

 1. Delete the `HomeKit Bridge` integration in the **Integrations** screen.
 2. **Restart** Home Assistant.
 3. The configuration will be automaticlly reimported from YAML.
 4. Pair the bridge.

### Resetting when created via the **Integrations** screen

 1. Delete the `HomeKit Bridge` integration in the **Integrations** screen.
 2. Recreate the `HomeKit Bridge` integration in the **Integrations** screen.
 3. Pair the bridge.

### Errors during pairing

If you encounter any issues during pairing, make sure to add the following to your `configuration.yaml`

```yaml
logger:
  default: warning
  logs:
    homeassistant.components.homekit: debug
    pyhap: debug
```

Follow the above instructions for `Resetting`

### Minimal Configuration

If pairing still fails after trying the steps in ([Errors during pairing](#errors-during-pairing)), it may be caused by a specific entity.  Try resetting with a minimal configuration:

```yaml
homekit:
  filter:
    include_entities:
      - demo.demo
```

#### PIN doesn't appear as persistent status

You might have paired the `Home Assistant Bridge` already. If not, follow the above instructions for `Resetting`

#### `Home Assistant Bridge` doesn't appear in the Home App (for pairing)

This is often setup and network related. Make sure to check the other issues below as well, but things that might work include:
- Check your router configuration
- Try with Wi-Fi **and** LAN
- Change the default [port](#port)

Remember that the iOS device needs to be in the same local network as the Home Assistant device for pairing.

#### `Home Assistant Bridge` doesn't appear in the Home App (for pairing) - Docker

Set `network_mode: host` in your `docker-compose.yaml`. If you have further problems this [issue](https://github.com/home-assistant/home-assistant/issues/15692) might help.

You can also try to use `avahi-daemon` in reflector mode together with the option `advertise_ip`, see above.

#### `Home Assistant Bridge` doesn't appear in the Home App (for pairing) - VirtualBox

Configure the network mode as `networkbridge`. Otherwise the Home Assistant Bridge won't be exposed to the network.

#### Pairing hangs - zeroconf error

Pairing eventually fails, you might see and an error message `NonUniqueNameException`. Add the `safe_mode` option to your configuration, see [safe_mode](#safe-mode).

If [safe_mode](#safe-mode) is not successful, you likely need to enable `zeroconf_default_interface: true` and set a unique name such as `name: MyHASS42`.
  
If you had previously paired (even unsuccessfully), you may need to delete your `.homekit.state` file in order to able to successfully pair again. See [Errors during pairing](#errors-during-pairing).

#### Pairing hangs - only works with debug configuration

Pairing works fine when the filter is set to only include `demo.demo`, but fails with normal configuration. See [specific entity doesn't work](#specific-entity-doesnt-work)

#### Pairing hangs - no error

1. Make sure that you don't try to add more than 150 accessories, see [device limit](#device-limit). In rare cases, one of your entities doesn't work with the HomeKit component. Use the [filter](#configure-filter) to find out which one. Feel free to open a new issue in the `home-assistant` repository, so we can resolve it.
2. Check logs, and search for `Starting accessory Home Assistant Bridge on address`. Make sure Home Assistant Bridge hook up to a correct interface. If it did not, explicitly set `homekit.ip_address` configuration variable.

#### Duplicate AID found when attempting to add accessory

Two of your entities share the same `entity_id`. Either resolve this or configure the [filter](#configure-filter) to exclude them.

### Issues during normal use

#### Some of my devices don't show up - Z-Wave / Discovery

See [disable auto start](#disable-auto-start)

#### My entity doesn't show up

Check if the domain of your entity is [supported](#supported-components). If it is, check your [filter](#configure-filter) settings. Make sure the spelling is correct, especially if you use `include_entities`.

#### HomeKit doesn't work on second Home Assistant instance

To use the HomeKit integration with to different Home Assistant instances on the same local network, you need to set a custom name for at least one of them. [config/name](#name)

#### Specific entity doesn't work

Although we try our best, some entities don't work with the HomeKit integration yet. The result will be that either pairing fails completely or all Home Assistant accessories will stop working. Use the filter to identify which entity is causing the issue. It's best to try pairing and step by step including more entities. If it works unpair and repeat until you find the one that is causing the issues. To help others and the developers, please open a new issue here: [home-assistant/issues/new](https://github.com/home-assistant/home-assistant/issues/new?labels=component:%20homekit)

#### Accessories are all listed as not responding

See [specific entity doesn't work](#specific-entity-doesnt-work)

#### Accessory not responding - after restart or update

See [device limit](#device-limit)

#### Accessory not responding - randomly

Unfortunately, that sometimes happens at the moment. It might help to close the `Home` App and delete it from the cache. Usually, the accessory should get back to responding after a few minutes at most.

#### Accessories not responding / behaving unusual - Upgrade from `0.65.x`

To fix this, you need to unpair the `Home Assistant Bridge`, delete the `.homekit.state` file ([guide](#deleting-the-homekitstate-file)) and pair it again. This should only be an issue if you're upgrading from `0.65.x` or below.

#### The linked battery sensor isn't recognized

Try removing the entity from HomeKit and then adding it again. If you are adding this configuration option to an existing entity in HomeKit, any changes you make to this entity's configuration options won't appear until the accessory is removed from HomeKit and then re-added. See [resetting accessories](#resetting-accessories).

#### My media player is not showing up as a television accessory

Media Player entities with `device_class: tv` will show up as Television accessories on  devices running iOS 12.2/macOS 10.14.4 or later. If needed, try removing the entity from HomeKit and then adding it again, especially if the `media_player` was previously exposed as a series of switches. Any changes, including changed supported features, made to an existing accessory won't appear until the accessory is removed from HomeKit and then re-added. See [resetting accessories](#resetting-accessories).

#### Can't control volume of your TV media player?

The volume and play/pause controls will show up on the Remote app or Control Center. If your TV supports volume control through Home Assistant, you will be able to control the volume using the side volume buttons on the device while having the remote selected on screen.

#### Camera video is not streaming

Ensure that the [`ffmpeg`](/integrations/ffmpeg) integration is configured correctly. Verify that your stream is directly playable with `ffplay <stream_source>` or [VLC Media Player](https://www.videolan.org/). If you have changed your camera's entity configuration, you may need to [reset the accessory](#resetting-accessories).

#### Camera audio is not streaming

Make sure `support_audio` is `True` in the camera's entity configuration.

#### HomeKit stalls or devices respond slowly with many cameras

HomeKit updates each camera snapshot sequentially when there are multiple cameras on a bridge. The HomeKit update methodology can lead to the app stalling or taking a while to update. To avoid this problem, limit each `HomeKit Bridge` to 6 cameras and create a new `HomeKit Bridge` for additional cameras.

#### Resetting accessories

On Home Assistant `0.97.x` or later, you may use the service `homekit.reset_accessory` with one or more entity_ids to reset accessories whose configuration may have changed. This can be useful when changing a media_player's device class to `tv`, linking a battery, or whenever Home Assistant adds support for new HomeKit features to existing entities.

On earlier versions of Home Assistant, you can reset accessories by removing the entity from HomeKit (via [filter](#configure-filter)) and then re-adding the accessory.

With either strategy, the accessory will behave as if it's the first time the accessory has been set up, so you will need to restore the name, group, room, scene, and/or automation settings.
