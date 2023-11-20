---
title: LinknLink
description: Instructions on setting up LinknLink within Home Assistant.
ha_category:
  - Remote
  - Sensor
ha_release: 2023.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@xuanxuan000'
ha_domain: linknlink
ha_config_flow: true
ha_platforms:
  - remote
  - sensor
ha_dhcp: true
ha_integration_type: integration
---

The LinknLink integration allows you to control and monitor LinknLink universal remotes, smart plugs, power strips, switches and sensors. The following devices are supported:

- Sensors: `ehub`, `eTHS`, `eMotion`
- Universal Remotes: `eHub`

{% include integrations/config_flow.md %}

## Entities and subdomains

There is no more need to set up platforms except for custom IR/RF switches. Once the device is configured all entities will be created automatically.

The entities have the same name as the device by default. To change the name, icon, or entity id select the entity on the frontend and click the settings icon in the upper right. You can also disable the entity there if you don't think it is useful. Don't forget to select _Update_ to save your changes when you're done.

The entities are divided into four subdomains:

- [Remote](#remote)
- [Sensor](#sensor)

## Remote

The `remote` entities allow you to learn and send codes with universal remotes. They are created automatically when you configure devices with IR/RF capabilities.

### Learning commands

Use `remote.learn_command` to learn IR and RF codes. These codes are grouped by device and stored as commands in the [storage folder](#learned-codes-storage-location). They can be sent with the `remote.send_command` service later.

| Service data attribute | Optional | Description                           |
| ---------------------- | -------- | ------------------------------------- |
| `entity_id`            | no       | ID of the remote.                     |
| `device`               | no       | Name of the device to be controlled.  |
| `command`              | no       | Names of the commands to be learned.  |
| `command_type`         | yes      | Command type. `ir` (default) or `rf`. |
| `alternative`          | yes      | Toggle command indicator.             |

#### Learning IR codes

To learn IR codes, call `remote.learn_command` with the device name and command to be learned:

```yaml
# Example configuration.yaml entry
script:
  learn_tv_power:
    sequence:
      - service: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

When the LED blinks, point the remote at the LinknLink device and press the button you want to learn.

After this, you can call `remote.send_command` with the same data to send the code. You can also access the code in the storage folder to build a custom IR/RF switch or send it with the prefix `b64:`.

#### Learning RF codes

Learning RF codes takes place in two steps. First call `remote.learn_command` with the `command_type: rf` option:

```yaml
# Example configuration.yaml entry
script:
  learn_car_unlock:
    sequence:
      - service: remote.learn_command
        target:
          entity_id: remote.garage
        data:
          device: car
          command: unlock
          command_type: rf
```

When the LED blinks for the first time, press and hold the button to sweep the frequency. Then wait for the LED to blink again and press the button a second time to capture the code.

The codes will be stored in the same way as the IR codes. You don't need to specify `command_type` to send them because this information is stored in the first byte of the code.

_Tip:_ Select Notifications in the sidebar after calling the service and follow the instructions to make sure you are pressing the button at the right time.

#### Learning a sequence of commands

In order to streamline the learning process, you may want to provide a list of commands to be learned sequentially:

```yaml
# Example configuration.yaml entry
script:
  learn_tv_commands:
    sequence:
      - service: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - turn on
            - turn off
            - volume up
            - volume down
```

After calling this service, you will be prompted to press the buttons in the same order as provided. Check the notifications to stay on track and make sure you are pressing the right button at the right time.

#### Learning an alternative code

Some protocols require a toggle bit to distinguish one button press from another. In such cases, learning an alternative code will significantly increase the response rate of the device.

The toggle bit is common when a button is used for multiple purposes, such as the power button, which can turn the television on and off, and the volume button, which can be used with a short press or a long press.

If the code works sometimes, and sometimes it doesn't, you can try to relearn it with the `alternative: true` option:

```yaml
# Example configuration.yaml entry
script:
  learn_tv_power_button:
    sequence:
      - service: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
          alternative: true
```

When the LED blinks for the first time, press the button you want to learn. Then wait for the LED to blink again and press the same button. This wil cause two different codes will be learned for the same command and they will be sent alternately at each call.

#### Learned codes storage location

The learned codes are stored in `/config/.storage/` in a JSON file called `linknlink_remote_MACADDRESS_codes`. You can open this file with a text editor and copy the codes to set up [custom IR/RF switches](#setting-up-custom-irrf-switches) or to send them as [base64 codes](#sending-a-base64-code), but beware: the files in the .storage folder _should never be edited manually_.

### Sending commands

After learning IR and RF codes with the `remote.learn_command` service, you can use `remote.send_command` to send them. You can also use this service to send base64 codes taken from elsewhere.

| Service data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | no       | ID of the remote.                                                      |
| `command`              | no       | Names of the commands to be sent or base64 codes prefixed with `b64:`. |
| `device`               | yes      | Name of the device to be controlled (optional for base64 codes).       |
| `num_repeats`          | yes      | Number of times to repeat the commands.                                |
| `delay_secs`           | yes      | Interval in seconds between one send and another.                      |

#### Sending a command

To send a command that you've learned, call `remote.send_command` with the device name and the command to be sent:

```yaml
# Example configuration.yaml entry
script:
  tv_power:
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

#### Sending a command repeatedly

Use `num_repeats:` to send the same command multiple times:

```yaml
# Example configuration.yaml entry
script:
  turn_up_tv_volume_20:
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: volume up
          num_repeats: 20
```

#### Sending a sequence of commands

You can provide a list of commands to be sent sequentially:

```yaml
# Example configuration.yaml entry
script:
  turn_on_ac:
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: air conditioner
          command:
            - turn on
            - turn off display
```

#### Sending a base64 code

Sometimes you may want to send a base64 code obtained elsewhere. Use the `b64:` prefix for this:

```yaml
# Example configuration.yaml entry
script:
  turn_on_tv:
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          command: b64:JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
```

#### Sending a sequence of base64 codes

You can send a sequence of base64 codes just like normal commands:

```yaml
# Example configuration.yaml entry
script:
  turn_on_ac:
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          command:
            - b64:JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
            - b64:JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

#### Mixing commands and base64 codes

You can mix commands and base64 codes:

```yaml
# Example configuration.yaml entry
script:
  turn_on_ac:
    sequence:
      - service: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - turn on
            - b64:JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

### Deleting commands

You can use `remote.delete_command` to remove commands that you've learned with the `remote.learn_command` service.

| Service data attribute | Optional | Description                          |
| ---------------------- | -------- | ------------------------------------ |
| `entity_id`            | no       | ID of the remote.                    |
| `device`               | no       | Name of the device.                  |
| `command`              | no       | Names of the commands to be deleted. |

#### Deleting a command

To delete a command, call `remote.delete_command` with the device name and the command to be deleted:

```yaml
# Example configuration.yaml entry
script:
  delete_tv_power:
    sequence:
      - service: remote.delete_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

#### Deleting multiple commands

You can provide a list of commands to be deleted:

```yaml
# Example configuration.yaml entry
script:
  delete_tv_commands:
    sequence:
      - service: remote.delete_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - power
            - source
            - menu
```

## Sensor

The `sensor` entities allow you to monitor LinknLink sensors. These entities are created automatically when you configure a device that has sensors.
