---
description: Instructions on how to integrate a Sony Bravia TV into Home Assistant.
ha_release: 0.23
ha_domain: braviatv
---

The **Sony Bravia TV** {% term integration %} allows you to control a [Sony Bravia TV](https://www.sony.com/) from Home Assistant. You can turn the TV on and off, change the volume and the input source, open apps, switch TV channels, and send remote control commands, for example from a dashboard or an {% term automation %}.

## Supported devices

The following devices are known to be supported by the integration:

- Almost all [Sony Bravia TV models from 2013 and newer](https://info.tvsideview.sony.net/en_ww/home_device.html#bravia)

## Unsupported devices

The following devices are not supported by the integration:

- Sony Bravia TV models older than 2013. You can control these TVs with the [HDMI-CEC](/integrations/hdmi_cec/), [Broadlink](/integrations/broadlink/), or [Kodi](/integrations/kodi/) integrations instead.

## Prerequisites

The integration connects to your TV over your local network. Before you add the integration, allow remote control on the TV and choose how Home Assistant authenticates with it.

1. Turn on your TV and connect it to the same network as Home Assistant.
2. On your TV, go to **Settings** > **Network** > **Remote device settings** and enable **Control remotely**.
3. Choose one of the two authentication methods:
   - **Pre-shared key (PSK)**: A secret key that you define on your TV. This method is recommended because it is more reliable and stable. To set it up, go to **Settings** > **Network** > **Home Network Setup** > **IP Control**, set **Authentication** to **Normal and Pre-Shared Key** or **Pre-Shared Key**, and enter a key of your choice.
   - **PIN code**: The TV shows a PIN code on the screen during setup. This method does not require additional settings on the TV.

Menu titles may differ slightly between models. If needed, refer to your model's [manual](https://www.sony.com/electronics/support/manuals). For more information about the authentication methods, see [IP Control Authentication](https://pro-bravia.sony.net/develop/integrate/ip-control/index.html#ip-control-authentication) in the Sony documentation.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your TV. For example, `192.168.1.100`."
Use PSK authentication:
    description: "Enable this option to authenticate with a pre-shared key (PSK) instead of a PIN code."
Use SSL connection:
    description: "Enable this option only if your TV supports an SSL connection."
PIN code:
    description: "The PIN code shown on your TV. Home Assistant only asks for it when you use PIN code authentication. If the TV does not show a PIN code, refer to [Troubleshooting](#troubleshooting)."
PSK:
    description: "The pre-shared key that you defined on your TV. Home Assistant only asks for it when you use PSK authentication."
{% endconfiguration_basic %}

## Supported functionality

The **Sony Bravia TV** integration provides the following entities.

### Media player

The media player {% term entity %} shows whether the TV is on or off, the current input source, the volume level, and the TV channel that is currently playing. You can use it to:

- Turn the TV on and off.
- Set the volume, change it step by step, and mute or unmute the TV.
- Select the input source, such as an HDMI input.
- Play, pause, and stop playback.
- Go to the next or previous track. When you watch TV, this switches to the next or previous channel.
- Open an app or switch to a TV channel. For details, refer to [Opening apps and channels in automations](#opening-apps-and-channels-in-automations).
- Browse the installed apps and TV channels. For details, refer to [Media browser](#media-browser).

#### Media browser

Using the media browser, you can view a list of all installed applications and TV channels and launch them. You can access the media browser from the **Media** section in the Home Assistant side menu or by selecting the **Browse media** button on the media player card.

#### Opening apps and channels in automations

To open an app or switch to a TV channel from an automation or a script, use the [**Play specified media**](/actions/media_player.play_media/) action and select your Bravia TV media player as the target.

The TV selects the best matching application or channel according to the media content ID. Matches can use a channel number, exact app or channel name, part of an app or channel name, or a URI string.

### Remote

The remote {% term entity %} lets you turn the TV on and off and send remote control commands to it, like pressing the buttons on the TV remote. Use the [**Send remote command**](/actions/remote.send_command/) action to send commands.

#### Sending a remote command from an automation

To send a Bravia remote command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select the Bravia TV remote.
6. From the actions shown for that target, select **Send remote command**.
7. Enter the command to send.
8. Select **Save**.

The available commands depend on your TV model. To see the commands your TV supports, send an unsupported command, such as `Test`, and then check {% my logs title="**Settings** > **System** > **Logs**" %}. The log message lists all available commands. You can also find them in the {% term diagnostics %} data, which you can download from the device page under {% my integration domain="braviatv" title="**Settings** > **Devices & services** > **Sony Bravia TV**" %}.

Some commonly used commands are:

- Up
- Down
- Left
- Right
- Confirm
- Return
- Home
- Exit
- Rewind
- Forward
- ActionMenu
- SyncMenu
- Num0
- Num1
- Num2
- Num3
- Num4
- Num5
- Num6
- Num7
- Num8
- Num9

### Buttons

- **Restart**
  - **Description**: Restarts the TV.
- **Terminate apps**
  - **Description**: Closes all applications that are running on the TV.

## Using with Google Cast

The **Sony Bravia TV** {% term integration %} provides information about the power status of the device, current source, and volume. It gives you the ability to control playback, run applications, and send remote control commands. Due to limitations of the Bravia REST API, it does not provide information about the currently playing content in applications (app name, media title, duration, play/pause state, and more). In turn, the [Google Cast](/integrations/cast/) integration does not provide reliable information about the power status of the device (for example, on Home Screen) and does not allow you to control playback in Android apps without [MediaSession](https://developer.android.com/reference/android/media/session/MediaSession) support. However, it can display full information about the content being played in supported apps.

If your TV runs on Android or Google TV, you can use the Google Cast integration together with the Sony Bravia TV integration. For convenience, you can combine the two media players into one using the [Universal Media Player](/integrations/universal/) integration. The universal media player automatically selects the appropriate active media player entity.

{% details "Example YAML configuration" %}

Replace `media_player.sony_tv_native` with your Sony Bravia TV integration media player {% term entity %} ID. Replace `media_player.sony_tv_cast` with your Google Cast integration media player {% term entity %} ID.

```yaml
media_player:
  - platform: universal
    name: Sony TV
    unique_id: sony_tv_combined
    device_class: tv
    children:
      - media_player.sony_tv_native
      - media_player.sony_tv_cast
    active_child_template: >
      {% if state_attr('media_player.sony_tv_native', 'media_content_id') %}
         media_player.sony_tv_native
      {% endif %}
    attributes:
      source: media_player.sony_tv_native|source
      source_list: media_player.sony_tv_native|source_list
    browse_media_entity: media_player.sony_tv_native
    commands:
      turn_off:
        action: media_player.turn_off
        data:
          entity_id: media_player.sony_tv_native
      turn_on:
        action: media_player.turn_on
        data:
          entity_id: media_player.sony_tv_native
      select_source:
        action: media_player.select_source
        data:
          entity_id: media_player.sony_tv_native
          source: "{{ source }}"
      media_play:
        action: media_player.media_play
        target:
          entity_id: media_player.sony_tv_native
      media_pause:
        action: media_player.media_pause
        target:
          entity_id: media_player.sony_tv_native
      media_play_pause:
        action: media_player.media_play_pause
        target:
          entity_id: media_player.sony_tv_native
      media_previous_track:
        action: media_player.media_previous_track
        target:
          entity_id: media_player.sony_tv_native
      media_next_track:
        action: media_player.media_next_track
        target:
          entity_id: media_player.sony_tv_native
```

{% enddetails %}

## Sony Bravia TV automation examples

These examples show how to open apps, switch channels, and send remote commands from automations.

{% include docs/paste_yaml_tip.md %}

### Automation: open YouTube at a set time

This automation opens the YouTube app on the Bravia TV every evening.

- **Trigger**: Time: 19:00
- **Action**: Play specified media
  - **Target**: Bravia TV media player
  - **Media content ID**: `YouTube`
  - **Media content type**: `app`

{% details "YAML example for opening YouTube at a set time" %}

{% example %}
automation: |
  alias: "Open YouTube on the Bravia TV in the evening"
  triggers:
    - trigger: time
      at: "19:00:00"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.bravia_tv
      data:
        media_content_id: "YouTube"
        media_content_type: app
{% endexample %}

{% enddetails %}

### Automation: switch to a TV channel in the morning

This automation switches the Bravia TV to channel 11 on weekday mornings.

- **Trigger**: Time: 07:00
- **Condition**: Time: Monday through Friday
- **Action**: Play specified media
  - **Target**: Bravia TV media player
  - **Media content ID**: `11`
  - **Media content type**: `channel`

{% details "YAML example for switching to a TV channel in the morning" %}

{% example %}
automation: |
  alias: "Switch the Bravia TV to channel 11 on weekday mornings"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.bravia_tv
      data:
        media_content_id: "11"
        media_content_type: channel
{% endexample %}

{% enddetails %}

### Automation: move down in the TV menu after opening the home screen

This automation opens the Bravia TV home screen, waits briefly, and then sends the `Down` command.

- **Trigger**: Time: 20:00
- **Action**: Send remote command
  - **Target**: Bravia TV remote
  - **Command**: `Home`
- **Action**: Wait for time to pass (delay)
  - **Duration**: `00:00:02`
- **Action**: Send remote command
  - **Target**: Bravia TV remote
  - **Command**: `Down`

{% details "YAML example for moving down in the TV menu after opening the home screen" %}

{% example %}
automation: |
  alias: "Move down in the Bravia TV menu after opening home"
  triggers:
    - trigger: time
      at: "20:00:00"
  actions:
    - action: remote.send_command
      target:
        entity_id: remote.bravia_tv
      data:
        command: "Home"
    - delay: "00:00:02"
    - action: remote.send_command
      target:
        entity_id: remote.bravia_tv
      data:
        command: "Down"
{% endexample %}

{% enddetails %}

## Data updates

The **Sony Bravia TV** integration {% term polling polls %} the TV over your local network. When the TV is on, the integration polls it every 10 seconds. When the TV is in standby, the integration polls it every 2 minutes. The integration also refreshes the data when the TV announces itself on the network, for example right after you turn it on.

## Known limitations

- The Bravia REST API does not provide information about the content playing in apps, such as the app name, media title, duration, or play/pause state. While an app is running, the media player shows **Smart TV** as the media title. To get this information, use the integration together with [Google Cast](#using-with-google-cast).
- The available remote commands depend on your TV model.
- Because the integration polls the TV, the TV keeps its network interface active while in standby. This can increase the standby power consumption of the TV to about 15 W. Some applications installed on the TV cause the same behavior. If this matters to you, you can disable polling in the **System options** of the integration and [define a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval) with an automation. The TV state then only updates when that automation runs.

## Troubleshooting

{% details "The TV does not show a PIN code" %}

### Symptom: The TV does not show a PIN code during setup

When you set up the integration with PIN code authentication, the TV does not show a PIN code on the screen.

#### Description

The TV only generates a new PIN code for a device it does not know yet. If you have previously set up this TV with any Home Assistant instance using a PIN code, the TV still has that registration and does not show a new PIN code.

#### Resolution

1. On your TV, go to **Settings** > **Network** > **Remote device settings** > **Deregister remote device** and remove the Home Assistant registration. Menu titles may differ slightly between models. If needed, refer to your model's [manual](https://www.sony.com/electronics/support/manuals).
2. Set up the integration again. The TV now shows a new PIN code.

{% enddetails %}

{% details "The integration logs errors and does not respond to commands" %}

### Symptom: The integration shows errors in the logs and does not respond to commands

From time to time, the TV does not respond to commands from Home Assistant, and {% my logs title="**Settings** > **System** > **Logs**" %} contains messages that end with "the Bravia API service is reloading" or "the Bravia API service is stuck".

#### Description

The system service on the TV that provides the Sony Bravia REST API, called **WebApiCore**, may restart spontaneously or freeze. This happens especially when the TV has not been restarted for a long time or when a demanding application is running. Android TV may also stop the service when the TV runs out of memory. While the service restarts, which takes about 30 seconds, the API is unavailable, and any interaction with the integration results in an error in the logs.

#### Resolution

1. Restart your TV completely. Hold down the **Power** button on the remote control and select **Restart**.
2. To prevent the problem, restart your TV regularly. You can also create an {% term automation %} that restarts the TV automatically, for example every night while the TV is turned off, using the **Restart** button of the integration.
3. If the problem occurs very often, reset the **WebApiCore** service. On your TV, go to **Settings** > **Apps** > **See all apps**, select **WebApiCore**, and then select **Clear data**.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

If you set up the integration with PIN code authentication, Home Assistant stays registered on your TV after you remove the integration. To remove the registration, on your TV, go to **Settings** > **Network** > **Remote device settings** > **Deregister remote device** and remove the Home Assistant entry. If you set up the integration with a pre-shared key (PSK), there is nothing else to clean up on the TV.
