---
title: Sony PlayStation 4
description: Instructions on how to integrate a Sony PlayStation 4 into Home Assistant.
ha_category:
  - Media player
ha_release: 0.89
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@ktnrg45'
ha_domain: ps4
ha_platforms:
  - media_player
ha_integration_type: integration
---

The `ps4` integration allows you to control a
[Sony PlayStation 4 console](https://www.playstation.com/en-us/explore/ps4/).

## Requirements

- Android or iOS device
- PS4 Second Screen App for [Android](https://play.google.com/store/apps/details?id=com.playstation.mobile2ndscreen&hl=en_US) or [iOS](https://itunes.apple.com/us/app/ps4-second-screen/id1201372796?mt=8) installed on device.

## Set up

1. Download the Second Screen App and make sure that you can find and control your PlayStation 4 normally.

{% important %}
Read the section "Granting Port Access" below before continuing.
{% endimportant %}

1. Navigate to `Settings -> Integrations` and press the plus button in the bottom right corner. Select `PlayStation 4` from the list of integrations.

2. Follow instructions displayed to generate user credentials. You will know this step is completed when a form with fields appears.

3. On the PS4, go to Settings / Mobile App Connection Settings / Add Device, a PIN will be displayed.

4. Pair Home Assistant to your PlayStation 4 by filling in the fields using the PIN from the above step.

- **Note:** To find your correct region refer to the section [Regions](#regions)

## Granting Port Access

The PlayStation 4 integration requires the use of privileged ports during configuration to work correctly, specifically UDP port 987 and TCP port 997. Depending on your OS of your Home Assistant instance, you may need to allow usage of privileged ports manually.

{% warning %}
Do not run your <b>Home Assistant Core</b> instance itself as <b>root</b> or with <b>root/sudo privileges</b> to accomplish this. This would create a security risk for your host system.
{% endwarning %}

There are varying methods to perform this, dependent on your OS that is running Home Assistant. Specifically, your *Python Interpreter*, which runs your Home Assistant instance, needs access to the mentioned ports.

{% note %}
Additional configuration is only required for Home Assistant Core users **not** running on Docker.
{% endnote %}

### Debian-based

Home Assistant installed on a Debian-type OS may require configuration. This section is applicable but not limited to the following operating systems:

- Debian
- Raspbian
- Armbian
- Ubuntu

In terminal run the following command:

```bash
sudo setcap 'cap_net_bind_service=+ep' <python>
```

Replace `<python>` with your **system path** to Python that is running Home Assistant and/or your virtual environment if used. The path **should not** be a **symlink** or be **inside of a virtual environment**.

Example:

```bash
sudo setcap 'cap_net_bind_service=+ep' /usr/bin/python3.5
```

To find your system Python path:

- Add the [System Health](/integrations/system_health/) integration to your {% term "`configuration.yaml`" %}. In a web browser, access your frontend and navigate to the about/logs page "http://<yourhomeassistanturl>/developer-tools/info). In the System Health box, locate the item **python_version** and note the value that is displayed. Then in a terminal run:

  ```bash
  whereis python<version>
  ```

  Replace `<version>` with the value for `python_version` that is shown in the System Health box.

  Example:
  ```bash
  whereis python3.5.3
  ```

  The output which has the directory `/bin/` is likely your system Python path which should look like this `/usr/bin/python3.5`

- If Home Assistant is installed in a virtual environment, use terminal to `cd` to the root/top directory of your environment and run:

  ```bash
  readlink -f bin/python3
  ```
  or
  ```bash
  readlink -f bin/python
  ```

  The output will be your system Python path.

### Docker

When running Home Assistant using Docker, make sure that the Home Assistant container is discoverable by the PS4. This can be achieved by ensuring that the Home Assistant container uses the `host` network driver (by passing `--net=host` to the container when creating, or adding `network_mode: "host"` to your compose file when using `docker-compose`).

## Configuration

{% note %}
The PlayStation 4 integration does not use entries from `configuration.yaml`. You must configure this integration by using `Integrations`
{% endnote %}

## Regions

Some titles will have different SKUs in the PlayStation Store database, depending on your [region](https://www.playstation.com/country-selector/index.html). You must select your specific region in the setup in order to retrieve the cover art for such titles correctly. The integration will attempt to search other databases for the correct title if it cannot be found.

{% important %}
The following regions have no database and can not be used by the integration:
China, Philippines, Serbia, Vietnam.
{% endimportant %}

## Media Data

The PlayStation 4 integration will fetch information about the game or app that is currently running from your region's [PlayStation Store](https://store.playstation.com) database.
  
Occasionally, the integration may fail to get the data at all, or may get incorrect data. To correct this issue, the integration allows for manual editing via any text editor.
  
### Formatting

When the integration retrieves data from the PlayStation Store, it stores it in a JSON file named `.ps4-games.json` in the same directory as where your {% term "`configuration.yaml`" %} file is located. The first line in the file will be `{` and the last line will be `}`. Between these lines, there will be indented entries for each game or app the integration finds. See the following example and table:
  
```json
{
    "CUSA00129": {
        "locked": true,
        "media_content_type": "app",
        "media_image_url": "http://localhost:8123/local/image.jpg",
        "media_title": "Some App"
    },
    "CUSA00123": {
        "locked": false,
        "media_content_type": "game",
        "media_image_url": "https://somerandomurl.com/image.jpg",
        "media_title": "Some Game"
    }
}
```

| Field                | Value   | Description                  |
| -------------------- | ------- | ---------------------------- |
| `locked`             | boolean | Must be `true` or `false`    |
| `media_content_type` | string  | Must be `game` or `app`      |
| `media_image_url`    | string  | Any valid URL for an image   |
| `media_title`        | string  | The title of the game or app |

The data in the example shows 2 entries.

Each entry will begin with the SKU ID of the title, e.g., `CUSA00000` and will have a field named `locked` with a value of `true` or `false` associated with it. The default value will be `false` for each entry. If `locked` is `true`, the integration will not overwrite the data pertaining to that game or app.

The `media_image_url` value can be any valid URL. This includes the `local directory` of your Home Assistant instance. The first entry in the example directs to a file named `image.jpg` located in the `config/www/` directory.
  
### Editing with Text Editor

{% warning %}
Backup a copy of your `.ps4-games.json` file before continuing. If there are errors in the formatting, your file may be deleted.
{% endwarning %}

To edit, simply open the file in a text editor, find the game or app you would like to edit, and edit the value(s) you wish to change and then save the file. The changes will appear the next time you play the game or app on your console. 

## Actions

### Action `select_source`

Opens new application/game and closes currently running application/game. The game/app must be in the entity's source list. Games will be added automatically when you open them normally.

| Data attribute | Optional | Example                    | Description                                                                                                 |
| ---------------------- | -------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `entity_id`            | No       | `media_player.ps4`         | The entity id for your PlayStation 4.                                                                       |
| `source`               | No       | `Some Game` or `CUSA00123` | The game/app you want to open. You can use the title or SKU ID. Using the SKU ID will be the most reliable. |

### Action `send_command`

Emulate button press on PlayStation 4. This emulates the commands available for the PS4 Second Screen App. This is not to be confused with DualShock 4 controller buttons.

| Data attribute | Optional | Example            | Description                           |
| ---------------------- | -------- | ------------------ | ------------------------------------- |
| `entity_id`            | No       | `media_player.ps4` | The entity id for your PlayStation 4. |
| `command`              | No       | `ps`               | The command you want to send.         |

#### Available Commands

Full list of supported commands.

| Command   | Button Emulated    |
| --------- | ------------------ |
| `ps`      | PS (PlayStation)   |
| `ps_hold` | PS Hold/Long Press |
| `option`  | Option             |
| `enter`   | Enter              |
| `back`    | Back               |
| `up`      | Swipe Up           |
| `down`    | Swipe Down         |
| `left`    | Swipe Left         |
| `right`   | Swipe Right        |

## Troubleshooting

### Cover Art Issues
If you are running a game/title on your PS4 that does not display a cover or displays the incorrect cover, post an issue [here](https://github.com/ktnrg45/pyps4-2ndscreen/issues).

Be sure to include the following information:
- Your Country

As well as the exact values for the following attributes found in the state of your PS4 entity.
- media_title
- media_content_id

## Advanced Use

### Ports

This integration uses UDP port 1987 as the source port during runtime. During configuration, the source port will be UDP port 1988. These port assignments can be used to configure firewall rules.

In the event that these ports cannot be used, the ports will fallback to a random port.
