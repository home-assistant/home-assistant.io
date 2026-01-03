---
title: HomeKit Bridge
description: Instructions on how to set up the HomeKit Bridge integration in Home Assistant.
featured: true
ha_category:
  - Voice
ha_release: 0.64
ha_iot_class: Local Push
ha_domain: homekit
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_zeroconf: true
ha_platforms:
  - diagnostics
ha_integration_type: integration
---

The HomeKit Bridge integration allows you to make your Home Assistant entities available in Apple HomeKit,
so they can be controlled from Apple's Home app and Siri; even if those devices do not natively support HomeKit.

Please make sure that you have read the [considerations](#considerations) listed below to save you
some trouble later. However, if you do encounter issues, check out the
[troubleshooting](#troubleshooting) section.

{% tip %}
If you want to control HomeKit-only devices with Home Assistant,
check out the [HomeKit Device](/integrations/homekit_controller/) integration, 
which provides the possibility to pull HomeKit-enabled devices into Home Assistant.
{% endtip %}

{% include integrations/config_flow.md %}

## Manual configuration

If you want make specific changes to the way entities are published to HomeKit, override the
IP address the HomeKit integration uses to communicate with your network or change the
IP address the HomeKit uses to advertise itself to the network, then you will need to configure the
HomeKit integration using an entry in your {% term "`configuration.yaml`" %} file.

This is an example entry of how that would look:

```yaml test
# Example configuration.yaml entry configuring HomeKit
homekit:
  - filter:
      include_domains:
        - alarm_control_panel
        - light
        - media_player
      include_entity_globs:
        - binary_sensor.*_occupancy
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
      sensor.some_co_sensor:
        co_threshold: 1000
      sensor.some_co2_sensor:
        co2_threshold: 1000
  - name: HASS Bridge 2
    port: 21065
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
    port:
      description: Port for the HomeKit extension. If you are adding more than one instance they need to have different values for port.
      required: false
      type: integer
      default: 21063
    name:
      description: Needs to be unique for each instance of Home Assistant using the integration on the same local network. Between `3` and `25` characters. Alphanumeric and spaces allowed.
      required: false
      type: string
      default: '`Home Assistant Bridge`'
    ip_address:
      description: The local network IP address. Only necessary if the default from Home Assistant does not work.
      required: false
      type: string
    mode:
      description: HomeKit can expose an entity via a bridge, or a single entity as an accessory which is needed for Television Media Players. ([Accessory mode](#accessory-mode))
      required: false
      type: string
      default: '`bridge`'
    advertise_ip:
      description: If you need to override the IP address(es) used for mDNS advertisement. (For example, using network isolation in Docker and together with an mDNS forwarder like `avahi-daemon` in reflector mode)
      required: false
      type: list
    filter:
      description: Filters for entities to be included/excluded from HomeKit. ([Configure Filter](#configure-filter))
      required: false
      type: map
      keys:
        include_domains:
          description: Domains to be included.
          required: false
          type: list
        include_entity_globs:
          description: Include all entities matching a listed pattern (e.g., `binary_sensor.*_motion`).
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
        exclude_entity_globs:
          description: Exclude all entities matching a listed pattern (e.g., `sensor.*_motion`).
          required: false
          type: list
        exclude_entities:
          description: Entities to be excluded.
          required: false
          type: list
    entity_config:
      description: Configuration for specific entities. All subordinate keys are the corresponding entity ids of the domains, e.g., `alarm_control_panel.alarm`.
      required: false
      type: map
      keys:
        '`ENTITY_ID`':
          description: Additional options for specific entities.
          required: false
          type: map
          keys:
            name:
              description: Name of the entity to show in HomeKit. HomeKit will cache the name on the first run so the accessory must be [reset](#resetting-accessories) for any change to take effect.
              required: false
              type: string
            linked_battery_sensor:
              description: The `entity_id` of a `sensor` entity to use as the battery of the accessory.
              required: false
              type: string
            linked_doorbell_sensor:
              description: The `entity_id` of a `binary_sensor` or `event` entity to use as the doorbell sensor of a `lock` or `camera` accessory to enable doorbell notifications.
              required: false
              type: string
            linked_humidity_sensor:
              description: The `entity_id` of a `sensor` entity to use as the humidity sensor of the humidifier/dehumidifier accessory.
              required: false
              type: string
            linked_motion_sensor:
              description: The `entity_id` of a `binary_sensor` or `event` entity to use as the motion sensor of the camera accessory to enable motion notifications.
              required: false
              type: string
            linked_obstruction_sensor:
              description: The `entity_id` of a `binary_sensor` entity to use as the obstruction sensor of the garage door (cover) accessory to enable obstruction state tracking.
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
              description: Only for `switch` entities. Type of accessory to be created within HomeKit. Valid types are `faucet`, `outlet`, `shower`, `sprinkler`, `switch` and `valve`.
              required: false
              type: string
              default: '`switch`'
            stream_count:
              description: Only for `camera` entities. The number of simultaneous streams the camera can support.
              required: false
              type: integer
              default: 3
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
              description: Only for `camera` entities. Maximum FPS (frames per second) supported by camera. Used when generating advertised video resolutions.
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
              description: Only for `camera` entities. FFmpeg video codec for transcoding. `copy` option reduces CPU load when video source is already encoded with `H264` (MPEG4). `h264_v4l2m2m` can be used with supported hardware, e.g., the Raspberry Pi, to offload encoding to hardware. The `h264_omx` option is only available with custom FFmpeg builds and enables GPU Hardware acceleration on Raspberry Pi.
              required: false
              type: string
              default: libx264
              available options: copy, libx264, h264_v4l2m2m, h264_omx
            video_profile_names:
              description: Only for `camera` entities. FFmpeg video profile names for transcoding, only relevant if `video_codec` isn't `copy`. Some encoders, e.g., the Raspberry Pi's `h264_v4l2m2m`, don't use the standard `["baseline", "main", "high"]` profile names but expects `["0", "2", "4"]` instead. Use this option to override the default names, if needed.
              required: false
              type: list
              default: ["baseline", "main", "high"]
            audio_codec:
              description: Only for `camera` entities. FFmpeg audio codec for transcoding. `copy` option reduces CPU load when audio source is already encoded with `libopus`.
              required: false
              type: string
              default: libopus
              available options: copy, libopus
            co_threshold:
              description: Only for `sensor` entities with `device_class` `carbon_monoxide`. Used as the threshold value once HomeKit will warn/notify the user.
              required: false
              type: integer
              default: 25
            co2_threshold:
              description: Only for `sensor` entities with `device_class` `carbon_dioxide` or `co2` in `entity_id`. Used as the threshold value once HomeKit will warn/notify the user.
              required: false
              type: integer
              default: 1000
    devices:
      description: Include device triggers for all matching device ids. Configuration in the UI via Options is recommended instead.
      required: false
      type: list                
{% endconfiguration %}

## Setup

To enable the HomeKit Bridge integration in Home Assistant, add the following to your configuration file:

```yaml
# Example for HomeKit setup
homekit:
```

After Home Assistant has started, the entities (depending on the filter) are exposed to HomeKit if they are [supported](#supported-integrations). To add them:

1. Open the Home Assistant frontend. A new card will display the pairing QR code and the `pin code` as seen in the example below. Note: If pin code is not displayed, check "Notifications" (the bell icon) in the lower-left of the Home Assistant UI.
2. Open the Apple `Home` app.
3. Click `Add Accessory`, then scan the QR code or select `Don't Have a Code or Can't Scan?` and choose the `Home Assistant Bridge`.
4. Confirm that you are adding an `Uncertified Accessory` by clicking on `Add Anyway`.
5. Enter the `PIN` code (skip this step if you scanned the QR code).
6. Follow the setup by clicking on `Next` and lastly `Done` in the top right-hand corner.
7. The `Home Assistant Bridge` and the Accessories should now be listed in the `Home` app.

After the setup is completed, you should be able to control your Home Assistant integrations through Apple's Home and Siri.

<p class='img'>
  <img src='/images/screenshots/homekit_pairing_example.png' />
</p>

## Move Home Assistant install

If you would like to retain your HomeKit pairing when moving to a new Home Assistant device or installation, besides copying the configuration files you also need to copy the `.storage/homekit.*` file inside your configuration directory. Keep in mind that the folder is usually hidden by default, depending on your operating system.

Before you copy it, make sure to stop the old and new Home Assistant instances first entirely, otherwise it won't work.

## Considerations

### Accessory ID

Currently, this integration uses the `entity_id` to generate a unique `accessory id (aid)` for `HomeKit`. The `aid` is used to identify a device and save all configurations made for it. This, however, means that if you decide to change an `entity_id` that does not have a `unique_id`, all configurations for this accessory made in the `Home` app will be lost.

### Device Limit

The HomeKit Accessory Protocol Specification only allows a maximum of 150 unique accessories (`aid`) per bridge. Be mindful of this when configuring the filter(s). If you plan on exceeding the 150 devices limit, it is possible to create multiple bridges. If you need specific configuration for some entities via `entity_config` be sure to add them to a bridge configured via `YAML`.

### Multiple HomeKit instances

If you create a HomeKit integration via the UI (i.e., **Settings** > **Devices & services**), it must be configured via the UI **only**. While the UI currently offers limited configuration options, any attempt to configure a HomeKit instance created in the UI via the {% term "`configuration.yaml`" %} file will result in another instance of HomeKit running on a different port.

It is recommended to only edit a HomeKit instance in the UI that was created in the UI, and likewise, only edit a HomeKit instance in YAML that was created in YAML.

### Accessory mode

When exposing a Camera, Activity based remote (a `remote` that supports activities), Lock, or Television media player (a `media_player` with device class `tv` or `receiver`) to HomeKit, `mode` must be set to `accessory`, and the relevant `include` filter should be setup to only include a single entity.

To quickly add all accessory mode entities in the UI:

1. Create a new bridge via the UI (i.e., **{% my config_flow_start title="Settings > Devices & services" domain=page.ha_domain %}**).
2. Select `media_player`, `remote`, `lock`, and `camera` domains.
3. Complete the flow as normal.
4. Additional HomeKit entries for each entity that must operate in accessory mode will be created for each entity that does not already have one.
5. If you have already created another HomeKit bridge for the non-accessory mode entities, the new bridge can safely be removed.
6. [Pair each bridge or accessory](#setup).

To add a single entity in accessory mode:

1. Create a new bridge via the UI (i.e., **{% my config_flow_start title="Settings > Devices & services" domain=page.ha_domain %}**)
2. Before pairing the bridge, access the options for the bridge.
3. Change the mode to `accessory`
4. Select the entity.
5. Complete the options flow
6. [Pair the accessory](#setup).

## Configure Filter

By default, all entities except hidden entities and categorized entities (config, diagnostic, and system entities) are included. To limit which entities are being exposed to `HomeKit`, you can use the `filter` parameter. Keep in mind only [supported integrations](#supported-integrations) can be added.

```yaml
# Example filter to include specified domains and exclude specified entities
homekit:
  filter:
    include_domains:
      - alarm_control_panel
      - light
    include_entity_globs:
      - binary_sensor.*_occupancy
    exclude_entities:
      - light.kitchen_light
```

{% include common-tasks/filters.md %}

Hidden entities and categorized entities (config, diagnostic, and system entities) are not included unless they are explicitly matched by `include_entity_globs` or `include_entities` or selected in the UI in include mode.

## Docker Network Isolation

The `advertise_ip` option can be used to run this integration even inside an ephemeral Docker container with network isolation enabled, e.g., not using the host network.

You may need to set the default network interfaces Home Assistant uses, in its [network configuration](/integrations/network).

To use `advertise_ip`, add the option to your `homekit` configuration:

```yaml
homekit:
  advertise_ip: "STATIC_IP_OF_YOUR_DOCKER_HOST"
```

Restart your Home Assistant instance. This feature requires running an mDNS forwarder on your Docker host, e.g., `avahi-daemon` in reflector mode.

## Firewall

If you have a firewall configured on your Home Assistant system, make sure you open the following ports:

- UDP: 5353
- TCP: 21063 (or the configured/used `port` in the integration settings).

## Supported integrations

The following integrations are currently supported:

| Integration                                                   | Type Name              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alarm_control_panel                                           | SecuritySystem         | All security systems.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| automation / input_boolean / remote / scene / script / vacuum | Switch                 | All represented as switches.                                                                                                                                                                                                                                                                                                                                                                                                                 |
| input_select / select                                         | Switch                 | Represented as a power strip with buttons for each option.                                                                                                                                                                                                                                                                                                                                                                                   |
| binary_sensor                                                 | Sensor                 | Support for `co2`, `door`, `garage_door`, `gas`, `moisture`, `motion`, `occupancy`, `opening`, `smoke` and `window` device classes. Defaults to the `occupancy` device class for everything else.                                                                                                                                                                                                                                            |
| camera                                                        | Camera                 | All camera devices. **HomeKit Secure Video is not supported at this time.**                                                                                                                                                                                                                                                                                                                                                                  |
| climate                                                       | Thermostat             | All climate devices.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| cover                                                         | GarageDoorOpener       | All covers that support `open` and `close` and have `garage` or `gate` as their `device_class`.                                                                                                                                                                                                                                                                                                                                              |
| cover                                                         | WindowCovering         | All covers that support `set_cover_position`.                                                                                                                                                                                                                                                                                                                                                                                                |
| cover                                                         | Door                   | All covers that support `set_cover_position` and have `door` as their `device_class`.                                                                                                                                                                                                                                                                                                                                                        |
| cover                                                         | WindowCovering         | All covers that support `open_cover` and `close_cover` through value mapping. (`open` -> `>=50`; `close` -> `<50`)                                                                                                                                                                                                                                                                                                                           |
| cover                                                         | WindowCovering         | All covers that support `open_cover`, `stop_cover` and `close_cover` through value mapping. (`open` -> `>70`; `close` -> `<30`; `stop` -> every value in between)                                                                                                                                                                                                                                                                            |
| device_tracker / person                                       | Sensor                 | Support for `occupancy` device class.                                                                                                                                                                                                                                                                                                                                                                                                        |
| fan                                                           | Fan                    | Support for `on / off`, `direction` and `oscillating`.                                                                                                                                                                                                                                                                                                                                                                                       |
| fan                                                           | Fan                    | All fans that support `speed` and `speed_list` through value mapping: `speed_list` is assumed to contain values in ascending order. The numeric ranges of HomeKit map to a corresponding entry of `speed_list`. The first entry of `speed_list` should be equivalent to `off` to match HomeKit's concept of fan speeds. (Example: `speed_list` = [`off`, `low`, `high`]; `off` -> `<= 33`; `low` -> between `33` and `66`; `high` -> `> 66`) |
| humidifier                                                    | HumidifierDehumidifier | Humidifier and Dehumidifier devices.                                                                                                                                                                                                                                                                                                                                                                                                         |
| light                                                         | Light                  | Support for `on / off`, `brightness` and `rgb_color`.                                                                                                                                                                                                                                                                                                                                                                                        |
| lock                                                          | DoorLock               | Support for `lock / unlock`. A doorbell event / sensor can be linked with `linked_doorbell_sensor`.                                                                                                                                                                                                                                                                                                                                                                                                             |
| media_player                                                  | MediaPlayer            | Represented as a series of switches which control `on / off`, `play / pause`, `play / stop`, or `mute` depending on `supported_features` of entity and the `mode` list specified in `entity_config`.                                                                                                                                                                                                                                         |
| media_player                                                  | TelevisionMediaPlayer  | All media players that have `tv` as their `device_class`.  Represented as Television and Remote accessories in HomeKit to control `on / off`, `play / pause`, `select source`, or `volume increase / decrease`, depending on `supported_features` of entity. Requires iOS 12.2/macOS 10.14.4 or later.                                                                                                                                       |
| media_player                                                  | ReceiverMediaPlayer    | All media players that have `receiver` as their `device_class`.  Represented as Receiver and Remote accessories in HomeKit to control `on / off`, `play / pause`, `select source`, or `volume increase / decrease`, depending on `supported_features` of entity. Requires iOS 12.2/macOS 10.14.4 or later.                                                                                                                                   |
| sensor                                                        | TemperatureSensor      | All sensors that have `°C` or `°F` as their `unit_of_measurement` and `temperature` as their `device_class`.                                                                                                                                                                                                                                                                                                                                 |
| sensor                                                        | HumiditySensor         | All sensors that have `%` as their `unit_of_measurement` and `humidity` as their `device_class`.                                                                                                                                                                                                                                                                                                                                             |
| sensor                                                        | AirQualitySensor       | All sensors that have `gas`/`pm10`/`pm25` as part of their `entity_id` or `gas`/`pm10`/`pm25`/`nitrogen_dioxide`/`volatile_organic_compounds` as their `device_class`. The VOC mappings use the IAQ guidelines for Europe released by the WHO (World Health Organization).                                                                                                                                                                   |
| sensor                                                        | CarbonMonoxideSensor   | All sensors that have `carbon_monoxide` as their `device_class`                                                                                                                                                                                                                                                                                                                                                                                           |
| sensor                                                        | CarbonDioxideSensor    | All sensors that have `co2` as part of their `entity_id` or `carbon_dioxide` as their `device_class`                                                                                                                                                                                                                                                                                                                                                    |
| sensor                                                        | LightSensor            | All sensors that have `lm` or `lx` as their `unit_of_measurement` or `illuminance` as their `device_class`                                                                                                                                                                                                                                                                                                                                   |
| switch                                                        | Switch                 | Represented as a switch by default but can be changed by using `type` within `entity_config`.                                                                                                                                                                                                                                                                                                                                                |
| water_heater                                                  | WaterHeater            | All `water_heater` devices.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| device_automation                                             | DeviceTriggerAccessory | All devices that support triggers.                                                                                                                                                                                                                                                                                                                                                                                                           |
| valve                                                         | Valve                 | All `valve` devices.                                                                                                                                                                                                                                                                                                                                                                                                                         |

# Device triggers

Devices that support triggers can be added to the bridge by accessing options for the bridge in **{% my integrations title="Settings > Devices & services" %}**. To use this feature, Advanced Mode must be enabled in your user profile.

Bridged device triggers are represented as a single press button on stateless programmable switches. This allows a HomeKit automation to run when a device trigger fires. Because the Apple Home app currently only shows the number of the button and not the name, users may find it easier to identify the name of the button in the `Eve for HomeKit` app.

## iOS Remote Widget

Entities exposed as `TelevisionMediaPlayer` and `ReceiverMediaPlayer` are controllable within the Apple Remote widget in
Control Center. Play, pause, volume up and volume down should work out of the box depending on the `supported_features`
of the entity. However, if your television can be controlled in other ways outside of the `media_player` entity, (e.g.,
performing actions to an IR blaster), it is possible to build an automation to take advantage of these events.

When a key is pressed within the Control Center Remote widget, the event `homekit_tv_remote_key_pressed` will be fired.
The key name will be available in the event data in the `key_name` field. Example:

```yaml
automation:
  triggers:
    - trigger: event
      event_type: homekit_tv_remote_key_pressed
      event_data:
        key_name: arrow_right

  # Send the arrow right key via a broadlink IR blaster
  actions:
    - action: broadlink.send
      host: 192.168.1.55
      packet: XXXXXXXX
```

## Events

The HomeKit integration emits `homekit_state_change` events. These events can be used in automations to know when an entity's state was changed from HomeKit.

```yaml
# Example for handling a HomeKit event
automation:
  triggers:
    - trigger: event
      event_type: homekit_state_change
      event_data:
        entity_id: cover.garage_door
        action: open_cover
  actions:
    - action: persistent_notification.create
      data:
        message: "The garage door got opened via HomeKit"
```

## Troubleshooting

### All or some devices are intermittently unresponsive

HomeKit relies heavily on your home hub to keep track of Bluetooth devices. Additionally, each home hub has to keep track of every HomeKit accessory that you bridge. If you have many accessories, notably cameras or Bluetooth devices, **consider disabling HomeKit on older home hubs**.

#### The below testing was conducted with Home Assistant 2021.6 (HAP-python 3.5.0) and iOS/tvOS 14.6

The following home hubs showed strong results when testing with 400 accessories:

- HomePod
- HomePod Mini
- Apple TV 4k Gen 2 (best results when using Ethernet instead of Wi-Fi)

The following home hubs showed strong results when testing with 300 accessories:

- Apple TV 4k Gen 1 (best results when using ethernet instead of Wi-Fi)

The following home hubs have been reported to have trouble with a large number of accessories:

- Apple TV HD
- Various iPad models

### Resetting when created via YAML

 1. Delete the `HomeKit` integration in the **{% my integrations %}** panel.
 2. **Restart** Home Assistant.
 3. The configuration will be automatically reimported from YAML.
 4. [Pair the bridge or accessory](#setup).

### Resetting when created via the **Integrations** panel

 1. Delete the `HomeKit` integration in the **Integrations** panel.
 2. Recreate the `HomeKit` integration in the **Integrations** panel.
 3. [Pair the bridge or accessory](#setup).

### Errors during pairing

If you encounter any issues during pairing, make sure to add the following to your {% term "`configuration.yaml`" %} to try and identify the issue(s).

```yaml
logger:
  default: warning
  logs:
    homeassistant.components.homekit: debug
    pyhap: debug
```

Follow the above instructions for resetting.

### Minimal Configuration

If pairing still fails after trying the steps in ([Errors during pairing](#errors-during-pairing)), it may be caused by a specific entity. Try resetting with a minimal configuration like:

```yaml
homekit:
  filter:
    include_entities:
      - demo.demo
```

#### PIN doesn't appear as persistent status

You might have paired the `Home Assistant Bridge` already. If not, follow the above instructions for resetting.

#### `Home Assistant Bridge` doesn't appear in the Home App (for pairing)

This is often setup and network related. Make sure to check the other issues below as well, but things that might work include:

- Check your router configuration
- Try with Wi-Fi **and** LAN
- Change the default [port](#port)

Remember that the iOS device needs to be in the same local network as the Home Assistant device for pairing.

#### `Home Assistant Bridge` doesn't appear in the Home App (for pairing) - Docker

Set `network_mode: host` in your `docker-compose.yaml`. If you have further problems this [issue](https://github.com/home-assistant/core/issues/15692) might help.

You can also try to use `avahi-daemon` in reflector mode together with the option `advertise_ip`, see above.

#### `Home Assistant Bridge` doesn't appear in the Home App (for pairing) - VirtualBox

Configure the network mode as `networkbridge`. Otherwise the Home Assistant Bridge won't be exposed to the network.

#### Accessory does not appear in the Home App (for pairing) - Libvirt QEMU/KVM virtual machine with macvtap adapter

Please see the [Zero-configuration networking](/integrations/zeroconf/#troubleshooting) integration for more details.

#### Pairing hangs - zeroconf error

Pairing eventually fails, you might see the error message, `NonUniqueNameException`, you likely need to enable `default_interface: true` in the `zeroconf` integration configuration and set a unique name such as `name: MyHASS42`.
  
If you had previously paired (even unsuccessfully), you may need to delete your `.homekit.state` file in order to able to successfully pair again. See [Errors during pairing](#errors-during-pairing).

#### Pairing hangs - only works with debug configuration

Pairing works fine when the filter is set to only include `demo.demo`, but fails with normal configuration. See [specific entity doesn't work](#specific-entity-doesnt-work)

#### Pairing hangs - no error

1. Make sure that you don't try to add more than 150 accessories, see [device limit](#device-limit). In rare cases, one of your entities doesn't work with the HomeKit integration. Use the [filter](#configure-filter) to find out which one. Feel free to open a new issue in the `home-assistant` repository, so we can resolve it.
2. Check logs, and search for `Starting accessory Home Assistant Bridge on address`. Make sure Home Assistant Bridge connected to a correct interface. If it did not, explicitly set `homekit.ip_address` configuration variable.

### Issues during normal use

#### Bridge spontaneously unpairs

Multiple users have reported that iOS 12 and earlier devices will spontaneously remove pairings. Ensure all iOS devices that have administrator access to the Home are running iOS 13 or later. If you cannot update the device to iOS 13, disable `Home` in the device iCloud settings.

#### My entity doesn't show up

Check if the domain of your entity is [supported](#supported-integrations). If it is, check your [filter](#configure-filter) settings. Make sure the spelling is correct, especially if you use `include_entities`.

#### HomeKit doesn't work on second Home Assistant instance

To use the HomeKit integration with multiple different Home Assistant instances on the same local network, you need to set a custom name for at least one of them. [config/name](#name)

#### Specific entity doesn't work

Although we try our best, some entities don't work with the HomeKit integration yet. The result will be that either pairing fails completely or all Home Assistant accessories will stop working. Use the filter to identify which entity is causing the issue. It's best to try pairing and step by step including more entities. If it works, unpair and repeat until you find the one that is causing the issues. To help others and the developers, please open a new issue here: [core/issues/new](https://github.com/home-assistant/core/issues/new)

If you have any iOS 12.x devices signed into your iCloud account, media player entities with `device_class: tv` or `device_class: receiver` may trigger this condition. Filtering the entity or signing the iOS 12.x device out of iCloud should resolve the issue after restarting other devices.

#### Accessories are all listed as not responding

There were reports where the IGMP settings in a router were causing issues with HomeKit. This resulted in a situation where all of the Home Assistant HomeKit accessories stopped responding a few minutes after Home Assistant (re)started. Double check your router's IGMP settings if you experience this issue. The default IGMP settings typically work best.

See [specific entity doesn't work](#specific-entity-doesnt-work)

#### Accessory not responding - after restart or update

See [resetting accessories](#resetting-accessories) and [Unpairing and Re-pairing](#unpairing-and-re-pairing).

#### The linked battery sensor isn't recognized

Try removing the entity from HomeKit and then adding it again. If you are adding this configuration option to an existing entity in HomeKit, any changes you make to this entity's configuration options won't appear until the accessory is removed from HomeKit and then re-added. See [resetting accessories](#resetting-accessories).

#### My media player is not showing up as a television or receiver accessory

Media Player entities with `device_class: tv` or `device_class: receiver` will show up as Television or Receiver accessories on devices running iOS 12.2/macOS 10.14.4 or later. If needed, try removing the entity from HomeKit and then adding it again, especially if the `media_player` was previously exposed as a series of switches. Any changes, including changed supported features, made to an existing accessory won't appear until the accessory is removed from HomeKit and then re-added. See [resetting accessories](#resetting-accessories).

The [Universal Media Player](/integrations/universal/#harmony-remote-example) has an example of how it can be used to wrap existing entities to enable them to be used as a Television accessory in HomeKit.

#### Can't control volume of your TV media player?

The volume and play/pause controls will show up on the Remote app or Control Center. If your TV supports volume control through Home Assistant, you will be able to control the volume using the side volume buttons on the device while having the remote selected on screen.

#### Camera video is not streaming

Ensure that the [`ffmpeg`](/integrations/ffmpeg) integration is configured correctly. Verify that your stream is directly playable with `ffplay <stream_source>` or [VLC Media Player](https://www.videolan.org/). If you have changed your camera's entity configuration, you may need to [reset the accessory](#resetting-accessories).

#### Camera streaming is unstable or slow 

If your camera supports native H.264 streams, Home Assistant can avoid converting the video stream, which is an expensive operation. To enable native H.264 streaming when configured via YAML, change the `video_codec` to `copy`. To allow native H.264 streaming when setting up HomeKit via the UI, go to **Settings** > **Devices & services** in the UI, click **Options** for your HomeKit Bridge, and check the box for your camera on the `Cameras that support native H.264 streams` screen.

#### Multiple camera streams

Multiple streams can be configured with the `stream_count` configuration option.

#### Camera audio is not streaming

Make sure `support_audio` is `True` in the camera's entity configuration.

#### Camera motion notifications

A motion sensor can be linked via the `linked_motion_sensor` configuration setting to enable motion notifications.

#### Doorbell button notifications

A doorbell sensor can be linked via the `linked_doorbell_sensor` configuration setting to enable motion notifications.

#### HomeKit stalls or devices respond slowly with many cameras

HomeKit camera snapshots tie up the HomeKit connection during snapshots. To avoid this problem, create a separate `HomeKit` instance in [Accessory Mode](#mode) for each camera.

#### Resetting accessories

You may use the `homekit.reset_accessory` action with one or more entity IDs to reset accessories whose configuration may have changed. This can be useful when changing a media player's device class to `tv`, linking a battery, or whenever Home Assistant adds support for new HomeKit features to existing entities.

On earlier versions of Home Assistant, you can reset accessories by removing the entity from HomeKit (via [filter](#configure-filter)) and then re-adding the accessory.

With either strategy, the accessory will behave as if it's the first time the accessory has been set up, so you will need to restore the name, group, room, scene, and/or automation settings.

#### Unpairing and Re-pairing

The HomeKit integration remembers a public key for each paired device. Occasionally, the public key for a device pairing will be missing because of pairing failures. Suppose one or more devices show the accessory as unavailable. In that case, it may be necessary to unpair and re-pair the device to ensure the integration has the public key for each paired client. The `homekit.unpair` action will forcefully remove all pairings and allow re-pairing with the accessory. When setting up HomeKit from the UI, this avoids the sometimes time-consuming process of deleting and create a new instance.

The accessory will behave as if it's the first time the accessory has been set up, so you will need to restore the name, group, room, scene, and/or automation settings.

#### Air Quality Sensor Entities

HomeKit provides five values to represent air quality: Excellent, Good, Fair, Inferior, and Poor. For PM2.5 sensor entities in Home Assistant, the raw density value (µg/m3) is used to determine the corresponding value based on the [2024 US AQI](https://www.epa.gov/system/files/documents/2024-02/pm-naaqs-air-quality-index-fact-sheet.pdf) standard. The mapping is as follows:

| HomeKit   | US AQI                                   | PM2.5 µg/m³   |
|-----------|------------------------------------------|---------------|
| Excellent | Good (0-50)                              | 0.0 to 9.0    |
| Good      | Moderate (51-100)                        | 9.1 to 35.4   |
| Fair      | Unhealthy for Sensitive Groups (101-150) | 35.5 to 55.4  |
| Inferior  | Unhealthy (151-200)                      | 55.5 to 125.4 |
| Poor      | Very Unhealthy (201+)                    | 125.5+        |
