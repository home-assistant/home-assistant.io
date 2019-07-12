---
title: "Sony PlayStation 4"
description: "Instructions on how to integrate a Sony PlayStation 4 into Home Assistant."
logo: ps4.png
ha_category:
  - Media Player
ha_release: 0.89
ha_iot_class: Local Polling
---

The `ps4` integration allows you to control a
[Sony PlayStation 4 console](https://www.playstation.com/en-us/explore/ps4/).

- This integration supports controlling a single PlayStation 4 for your instance. Additional consoles may be supported in a future release.

## Requirements

- Android or iOS device
- PS4 Second Screen App for [Android](https://play.google.com/store/apps/details?id=com.playstation.mobile2ndscreen&hl=en_US) or [iOS](https://itunes.apple.com/us/app/ps4-second-screen/id1201372796?mt=8) installed on device.

## Set up

1. Download the Second Screen App and make sure that you can find and control your PlayStation 4 normally.

<p class='note'>
  Read the section "Granting Port Access" below before continuing.
</p>

2. Navigate to `Configuration -> Integrations` and select `Configure` for `PlayStation 4`.

3. Follow instructions displayed to generate user credentials. You will know this step is completed when a form with fields appears.

4. Pair Home Assistant to your PlayStation 4 by filling in the fields.
- **Note:** To find your correct region refer to the section [Regions](#regions)

## Granting Port Access

The PlayStation 4 integration requires the use of privileged ports to work correctly, specifically UDP port 987 and TCP port 997. Depending on your OS of your Home Assistant instance you may need to allow usage of privileged ports manually.

<p class='note warning'>
  Do not run your <b>Home Assistant</b> instance itself as <b>root</b> or with <b>root/sudo privileges</b> to accomplish this. This would create a security risk for your host system.
</p>

There are varying methods to perform this, dependent on your OS that is running Home Assistant. Specifically, your *Python Interpreter* which runs your Home Assistant instance needs access to the mentioned ports.

<p class='note'>
  If your Home Assistant device is running <b>Hass.io</b> on <b>HassOS</b>, it does not require additional configuration.
</p>

### Debian-based
Home Assistant installed on a Debian-type OS may require configuration. This section is applicable but not limited to the following operating systems:

- Debian
- Hassbian
- Rassbian
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

- Add the [System Health](/components/system_health/) integration to your `configuration.yaml`. In a web browser access your frontend and navigate to the about/logs page "http://<yourhomeassistanturl>/dev-info). In the System Health box locate the item **python_version** and note the value that is displayed. Then in terminal run:

  ```bash
  whereis python<version>
  ```

  Replace `<version>` with the value for `python_version` that is shown in the System Health box.

  Example:
  ```bash
  whereis python3.5.3
  ```

  The output which has the directory `/bin/` is likely your system python path which should look like this `/usr/bin/python3.5`

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

<p class='note'>
  The PlayStation 4 integration does not use entries from `configuration.yaml`. You must configure this integration by using `Integrations`
</p>

## Regions

Some titles will have different SKUs in the PlayStation Store database depending on your region. You must select your specific region in the setup in order to retrieve the cover art for such titles correctly. The integration will attempt to search other databases for the correct title if it cannot be found, although it will take longer to do so and may fetch an incorrect cover.

|  Available Regions                                                          | Unavailable Regions        |
| --------------------------------------------------------------------------- | -------------------------- |
| Argentina, Australia, Austria, Bahrain, Belgium, Brazil, Bulgaria,          | China, Japan, Phillipines, |
| Canada, Chile, Columbia, Costa Rica, Croatia, Cyprus, Czech Republic,       | Serbia, Ukraine, Vietnam   |
| Denmark, Ecuador, El Salvador, Finland, France, Germany, Greece, Guatemala, |                            |
| Honduras, Hong Kong, Hungary, Iceland, India, Indonesia, Ireland, Israel,   |                            |
| Italy, Korea, Kuwait, Lebanon, Luxembourg, Malta, Maylasia, Mexico,         |                            |
| Middle East, Nederland, New Zealand, Nicaragua, Norway, Oman, Panama,       |                            |
| Peru, Poland, Portugal, Qatar, Romania, Russia, Saudi Arabia, Singapore,    |                            |
| Slovakia, Slovenia, South Africa, Spain, Sweden, Switzerland, Taiwan,       |                            |
| Thailand, Turkey, United Arab Emirates, United Kingdom, United States       |                            |

<p class='note'>
  The regions which are unavailable have no database or have formatting in the database which can not be used by the component.
</p>

## Services

### Service `send_command`

Emulate button press on PlayStation 4. This emulates the commands available for the PS4 Second Screen App. This is not to be confused with DualShock 4 controller buttons.

| Service data attribute | Optional | Example                      | Description                           |
| ---------------------- | -------- | ---------------------------- | ------------------------------------- |
| `entity_id`            | No       | `media_player.playstation_4` | The entity id for your PlayStation 4. |
| `command`              | No       | `ps`                         | The command you want to send.         |

#### Available Commands

Full list of supported commands.

| Command  | Button Emulated  |
| -------- | ---------------- |
| `ps`     | PS (PlayStation) |
| `option` | Option           |
| `enter`  | Enter            |
| `back`   | Back             |
| `up`     | Swipe Up         |
| `down`   | Swipe Down       |
| `left`   | Swipe Left       |
| `right`  | Swipe Right      |

## Media Data Services

  The following services are provided to correct/edit the data for games and apps which the PS4 Integration displays/retrieves 
  incorrectly or can not find.
  
  Each media title will have an attribute named `locked` with a value of `True` or `False` associated to it. If locked is True the data 
  will not change automatically. You can set locked to True if you confirm that the details/attributes of the media title are correct.
  Using services which edit the data of a media title, automatically set the locked  attribute to True. If locked is set to False, the
  Integration will attempt to get the current media information from the PlayStation Store. 
  
  Items in the Playstation Store are continually changing. Games are often re-released which results in a slight modification to the
  Title in addition to new cover art. Often the original game is replaced by the re-released version.

### Service `add_media`

Manually add media data to source list. Media data will be locked and not be updated automatically.

| Service data attribute | Optional | Example                                 | Description                                                                                                                 |
| ---------------------- | -------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `media_content_id`     | No       | `CUSA00123`                             | The ID or the PlayStation Store SKU ID of the title.                                                                        |
| `media_title`          | No       | `A Title: The Name`                     | The name for the media title.                                                                                               |
| `media_image_url`      | Yes      | `http://localhost:8123/local/image.jpg` | A remote or local URL directing to an image that will be  displayed. You may use images in the local (/config/www/) folder. |
| `media_content_type`   | Yes      | `Game`                                  | The type of media. Must be 'game' or 'app'. Defaults to 'game'.                                                             |

### Service `remove_media`

Remove media data from source list.

| Service data attribute | Optional | Example                                 | Description                                                                  |
| ---------------------- | -------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| `media_content_id`     | No       | `CUSA00123`                             | The ID or the PlayStation Store SKU ID of the title. Must be in source list. |

### Service `lock_media`

Lock media data attributes to prevent automatic updates to media data. Media data will be locked and not be updated automatically.

| Service data attribute | Optional | Example                                 | Description                                                                  |
| ---------------------- | -------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| `media_content_id`     | No       | `CUSA00123`                             | The ID or the PlayStation Store SKU ID of the title. Must be in source list. |

### Service `lock_current_media`

Lock the attributes of the media which is currently playing. Media data will be locked and not be updated automatically.

| Service data attribute | Optional | Example                                 | Description                       |
| ---------------------- | -------- | --------------------------------------- | --------------------------------- |
| `entity_id`            | No       | `media_player.playstation_4`            | The entity that is playing media. |

### Service `unlock_media`

Unlock the attributes of the media which is currently playing. Media data will be updated automatically.

| Service data attribute | Optional | Example                                 | Description                                                                  |
| ---------------------- | -------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| `media_content_id`     | No       | `CUSA00123`                             | The ID or the PlayStation Store SKU ID of the title. Must be in source list. | 

### Service `unlock_current_media`

Unlock the attributes of the media which is currently playing. Media data will be updated automatically.

| Service data attribute | Optional | Example                                 | Description                       |
| ---------------------- | -------- | --------------------------------------- | --------------------------------- |
| `entity_id`            | No       | `media_player.playstation_4`            | The entity that is playing media. |

### Service `edit_media`

Edit or correct media data attributes. Media data will be locked and not be updated automatically.

| Service data attribute | Optional | Example                                 | Description                                                                                                                 |
| ---------------------- | -------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `media_content_id`     | No       | `CUSA00123`                             | The ID or the PlayStation Store SKU ID of the title. Must be in source list.                                                |
| `media_title`          | Yes      | `A Title: The Name`                     | The name for the media title.                                                                                               |
| `media_image_url`      | Yes      | `http://localhost:8123/local/image.jpg` | A remote or local URL directing to an image that will be  displayed. You may use images in the local (/config/www/) folder. |
| `media_content_type`   | Yes      | `Game`                                  | The type of media. Must be 'game' or 'app'. Defaults to 'game'.     

### Service `edit_current_media`

Edit or correct the attributes of the media which is currently playing. Media data will be locked and not be updated automatically.

| Service data attribute | Optional | Example                                 | Description                                                                                                                 |
| ---------------------- | -------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | No       | `media_player.playstation_4`            | The entity that is playing media.                                                                                           |
| `media_title`          | Yes      | `A Title: The Name`                     | The name for the media title.                                                                                               |
| `media_image_url`      | Yes      | `http://localhost:8123/local/image.jpg` | A remote or local URL directing to an image that will be  displayed. You may use images in the local (/config/www/) folder. |
| `media_content_type`   | Yes      | `Game`                                  | The type of media. Must be 'game' or 'app'. Defaults to 'game'.                                                             |

## Media Data
Media data is stored when your PlayStation 4 console is playing a game or an app. The integration will automatically add the media to the source list for your PS4 entities when a new media is playing on your console. Data that is stored includes the PlayStation Store ID of the media, the title, and a url to the cover art of the media. Occasionally, the integration will not be able to retrieve the media data from the PlayStation Store. You may edit data that is incorrect by using services, or manually with a text editor.

To edit data with a text editor:

1. Backup a copy of the file if you don't want to lose your sources.
2. Open the file in your configuration directory: `config/.ps4.games.json`

3. Edit an entry. Example of an unedited file:
```json
{
    "CUSA00129": {
        "locked": false,
        "media_content_type": "game",
        "media_image_url": "https://google.com/image.jpg",
        "media_title": "Netflix"
    },
    "CUSA00123": {
        "locked": false,
        "media_content_type": "game",
        "media_image_url": null,
        "media_title": "Something"
    }
}
```
Here we want to edit the entry with the "Netflix" title. We want to correct the "media_content_type" as it is not a game but actually an app.
Also the image is not correct, so we will edit the "media_image_url". You can specify an image file saved in your `config/www/` directory as well as any valid remote url. To use a saved image file type in `"your/HA/IP/Address:yourport/local/thefile"`. See the example below if you need help.

Make sure to not deviate from the format of these entries.
To have the PS4 integration load your edited entry you must changed the "locked" value from "false" to "true". Example:

```json
{
    "CUSA00129": {
        "locked": true,
        "media_content_type": "app",
        "media_image_url": "http://localhost:8123/local/image.jpg",
        "media_title": "Netflix"
    },
    "CUSA00123": {
        "locked": false,
        "media_content_type": "game",
        "media_image_url": null,
        "media_title": "Something"
    }
}
```

4. Restart your Home Assistant

If issues arise you may delete the file but your entities will have no sources available until they are added again by the integration.

## Troubleshooting

### Cover Art Issues
If you are running a game/title on your PS4 that does not display a cover or displays the incorrect cover, post an issue [here](https://github.com/ktnrg45/pyps4-homeassistant/issues).

Be sure to include the following information:
- Your Country

As well as the exact values for the following attributes found in the state of your PS4 entity.
- media_title
- media_content_id
