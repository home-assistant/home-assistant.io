---
title: Apple TV
description: Instructions on how to integrate Apple TV devices into Home Assistant.
ha_category:
  - Multimedia
  - Media Player
  - Remote
ha_iot_class: Local Push
ha_release: 0.49
ha_domain: apple_tv
---

The `apple_tv` platform allows you to control an Apple TV (3rd and 4th generation). See the [remote platform](/integrations/apple_tv#remote) if you want to send remote control buttons, e.g., arrow keys.

There is currently support for the following device types within Home Assistant:

- Media Player
- [Remote](#remote)

<div class='note'>
Currently, you must have Home Sharing enabled for this to work. Support for pairing Home Assistant with your device will be supported in a later release.
</div>

## Configuration

To use this component, you must first install some system libraries and a compiler. For Debian or a similar system, this should be enough:

```shell
sudo apt-get install build-essential libssl-dev libffi-dev python-dev
```

If you want to discover new devices automatically, just make sure you have `discovery:` in your `configuration.yaml` file. To manually add one or more Apple TVs to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
apple_tv:
  - host: IP_1
    login_id: LOGIN_ID_1
    name: NAME_1
    start_off: START_OFF_1
    credentials: CREDENTIALS_1
  - host: IP_2
    login_id: LOGIN_ID_2
    name: NAME_2
    start_off: START_OFF_2
    credentials: CREDENTIALS_2
```

{% configuration %}
host:
  description: The IP-address of the device.
  required: true
  type: string
login_id:
  description: An identifier used to login to the device, see below.
  required: true
  type: string
name:
  description: The name of the device used in the frontend.
  required: false
  type: string
start_off:
  description: Set to true if the device should start in fake standby.
  required: false
  type: boolean
  default: false
credentials:
  description: Credentials used for AirPlay playback.
  required: false
  type: string
{% endconfiguration %}

In order to connect to the device, you need a *login id*. The easiest way to obtain this identifier is to use the `apple_tv_scan` service (described below). Additional information about `start_off` and `credentials` can also be found under the guides section.

## Guides

### Scanning for devices

Make sure Home Sharing is enabled on the Apple TV.

To scan for devices and determine the `login_id`, open the developer tools by selecting the hammer icon in the sidebar. Once in the developer tools select **services**.

<img src='/images/screenshots/developer-tools.png' />

Select `apple_tv` as domain and `apple_tv_scan` as service then press the button:

<img src='/images/integrations/apple_tv/scan_start.jpg' />

Scanning will be done for three seconds and notification will be shown in the state view with all found devices:

<img src='/images/integrations/apple_tv/scan_result.jpg' />

Alternatively, you may use the application ``atvremote``. Install it with ``pip3 install --upgrade pyatv`` in your Home Assistant environment (note: do *not* use sudo). Then run ``atvremote scan`` to scan for all devices (try again if a device is missing):

```bash
$ atvremote scan
Found Apple TVs:
 - Apple TV at 10.0.10.22 (login id: 00000000-1234-5678-9012-345678901234)

Note: You must use 'pair' with devices that have home sharing disabled
```

Just copy and paste the `login_id` from the device you want to add. For more details about `atvremote`, see: [this page](https://postlund.github.io/pyatv).

### Setting up device authentication

If you, when playing media with `play_url`, get the following error message:

“This AirPlay connection requires iOS 7.1 or later, macOS 10.10 or later, or iTunes 11.2 or later.”

then device authentication is required, open the developer tools by selecting the hammer icon in the sidebar. Once in the developer tools select **services**.

<img src='/images/screenshots/developer-tools.png' />

Select `apple_tv` as domain, `apple_tv_authenticate` as service and enter `{"entity_id": "XXX"}` into "Service Data", but replace XXX with the entity id of your device (e.g., `media_player.apple_tv`). Press the button and hopefully you are presented with an input dialog asking for a pin code:

<img src='/images/integrations/apple_tv/auth_start.jpg' />

If no dialog appears, go back to the states view and display it from there (press `CONFIGURE` as displayed in the image):

<img src='/images/integrations/apple_tv/auth_pin.jpg' />

A PIN code should now be visible on your TV, just enter it into the dialog and press "Confirm". You should see if it succeeded in the state view. Copy the credentials and insert it into your configuration (make sure you copy everything, it should be 81 characters) after ``credentials:`` with no line-break:

```yaml
# Example configuration.yaml entry
apple_tv:
  - host: 10.0.0.20
    login_id: 00000000-1234-5678-9012-345678901234
    credentials: 1B8C387DDB59BDF6:CF5ABB6A2C070688F5926ADB7C010F6DF847252C15F9BDB6DA3E09D6591E90E5
```

Restart Home Assistant, and you should now be able to use `play_url` as before.

### My Apple TV turns on when I restart Home Assistant

The Apple TV will automatically turn on if a request is sent to it, e.g., if a button is pressed, something is streamed to it via AirPlay or if current state (currently playing) is accessed. This is how Apple has designed it, and it will cause problems if you are using HDMI-CEC. Every time Home Assistant is started, a new request is sent to the device to figure out what is currently playing. When using CEC, this will wake up your TV and other devices you have configured.

So, if your TV is randomly turning on, this is probably the reason. As stated, this is by design, and there is no real fix for it. There's also no known way to turn off the Apple TV via the protocol used for communication. You have the following options:

- Do not use this platform
- Disable HDMI-CEC on your Apple TV
- Use "fake standby"

The first two points are quite obvious. Fake standby is a concept implemented in this platform that disables all requests to the device and makes it appear as being "off" in the web interface. This will make sure that the device is not woken up, but it will of course not show any information or allow you to control it. It is however easy to turn it on (or off) in the web interface or to use an automation with `turn_on`. To make it more useful, you can write automations that turn it on or off depending on some other device, like the input source on your receiver.

To put a device into fake standby when starting Home Assistant, add `start_off: true` to your configuration.

<div class='note warning'>
Turning the device on/off in the user interface will *not* turn the physical device on/off according to the description above.
</div>

## Services

### Service `apple_tv_authenticate`

To play media on an Apple TV with device authentication enabled (e.g., ATV4 with tvOS 10.2+), Home Assistant must be properly authenticated. This method starts the process and presents the credentials needed for playback as a persistent notification. Please see guide above for usage.

| Service data attribute | Optional | Description                                                        |
| ---------------------- | -------- | ------------------------------------------------------------------ |
| `entity_id`            | yes      | String or list of strings that point at `entity_id`s of Apple TVs. |

### Service `apple_tv_scan`

Scans the local network for Apple TVs. All found devices are presented as a persistent notification.

## Remote

The `apple_tv` remote platform allows you to send remote control buttons to an Apple TV. It is automatically setup when an Apple TV is configured.

At the moment, the following buttons are supported:

- up
- down
- left
- right
- menu
- top_menu
- select

A typical service call for press several buttons looks like this.

```yaml
service: remote.send_command
data:
  entity_id: remote.apple_tv
  command:
    - left
    - left
    - menu
    - select
```
