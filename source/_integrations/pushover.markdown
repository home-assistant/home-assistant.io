---
title: Pushover
description: Instructions on how to configure and send Pushover notifications via Home Assistant.
ha_category:
  - Notifications
ha_release: pre 0.7
ha_config_flow: true
ha_iot_class: Cloud Push
ha_domain: pushover
ha_platforms:
  - notify
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
---

The [Pushover service](https://pushover.net/) is an integration for the notify platform that allows Home Assistant to send messages or notifications to your own mobile devices—or even those of your family, friends, or colleagues—provided those devices have the Pushover App installed. An API key is required; you simply need to [register an application](https://pushover.net/apps/clone/home_assistant) on the Pushover website. Once registered, your user key can be found on the [Pushover dashboard](https://pushover.net/dashboard). (For more on using notifications in Home Assistant, see the [Notifications](https://www.home-assistant.io/integrations/notify/) documentation.)

{% include integrations/config_flow.md %}

## Pushover API Parameters

<!-- textlint-disable terminology -->
| Field       | Type     | Required | Description                                                                            |
|-------------|----------|----------|----------------------------------------------------------------------------------------|
| message     | string   | yes      | Body of the message (max 1024 characters).                                             |
| title       | string   | no       | Title of the message.                                                                  |
| target      | string   | no       | List of Pushover devices to receive message.                                           |
| url         | string   | no       | URL to show as a clickable link.                                                       |
| url_title   | string   | no       | Text to display for the link.                                                          |
| sound       | string   | no       | Name of the Pushover sound to play (defaults to `pushover`).                           |
| attachment  | string   | no       | Local file path for an attachment (e.g., `/tmp/image.png`).                            |
| priority    | integer  | no       | Priority level (-2 to 2).                                                              |
| ttl         | integer  | no       | Time-to-live in seconds (auto-deletes the message after this period).                  |
| retry       | integer  | no       | Retry interval in seconds for priority 2 messages (minimum 30 seconds).                |
| expire      | integer  | no       | Expiration period in seconds for priority 2 (maximum 10800 seconds).                   |
| html        | boolean  | no       | Set to 1 to enable HTML formatting.                                                    |
<!-- textlint-enable terminology -->

For further details on these parameters, please reference the [Pushover API documentation](https://pushover.net/api).

## Example Automation Action

<!-- textlint-disable terminology -->

```yaml
  - service: notify.pushover
    data:
      message: This is the message
      title: Title of message
      target: pixel9
      data:
        url: https://www.home-assistant.io/
        url_title: Home Assistant Documentation Repo
        sound: pianobar
        attachment: "local/image.png"
```
<!-- textlint-enable terminology -->

In the example above, the message includes a URL, a title for the URL, and an attachment, which must be a local file reference (ex: `/tmp/image.png`). These are all optional parameters. The only required parameter is the message itself.

## Sending Messages to Multiple Devices

To send a message to multiple devices, set them using `target`. These devices must be pre-defined in your [Pushover dashboard](https://pushover.net/dashboard). If one of the entered devices doesn't exist or is disabled in your Pushover account, Pushover will send the message to all your devices. To send to all devices, just leave the target attribute blank.

```yaml
  - service: notify.pushover
    data:
      message: This is the message
      title: Title of message
      target:
        - pixel9
        - johnsmith
      data:
        sound: spacealarm
```

_**Note**: Home Assistant's "Create Automation" UI creates a single target line, i.e., `target: pixel9 johnsmith`. That formatting is also acceptable._

## Auto-Deleting Messages

Using the `ttl` parameter, messages may be set to delete automatically after a certain period of time, which can be useful for messages that at some point outlive their usefulness. The `ttl` parameter specifies a Time to Live in seconds. In the following example, the message will self-delete from the targeted device(s) after 6 hours.

Also note that in this example the sound parameter is not explicitly set, in which case Pushover will use the default `pushover` sound for the message.

```yaml
  - service: notify.pushover
    data:
      message: "Flight AS23 Arrives at 6:30 PM"
      title: "Pick up John at the Airport"
      target:
        - pixel9
        - johnsmith
      data:
        ttl: 21600 
```

## Message Priority

Messages may also be sent with various [priority levels](https://pushover.net/api#priority).  Unless `priority` is explicitly set, Pushover will default to `priority: 0`.

The highest priority is the Emergency Priority (2), which will repeat the notification every x seconds (`retry`) for the duration of y seconds (`expire`). You MUST specify these parameters. The minimal time for the `retry` parameter is 30 seconds. The `expire` parameter has a maximum of 10800 seconds (3 hours). If you target more than one device, you may prefer to enable "Notification dismissal sync" under Advanced Settings in the app so that you can dismiss the alert on all devices simultaneously. Note that the `ttl` parameter cannot be used when priority is set to 2.  

```yaml
- service: notify.pushover
  data:
    message: "This is the message"
    title: "Title of message"
    target: iphone11pro
    data:
      priority: 2
      sound: "siren"
      expire: 300
      retry: 30
```

## Dynamic Messaging with HTML Formatting & Automation Templating

By including the `html: 1` data parameter and applying [Automation Templating](/getting-started/automation-templating/), you can create dynamic, html-formatted messages (up to the 1024-character limit), as in this example.

{% raw %}

```yaml
# Example - HTML formatting with Automation Templating
- service: notify.pushover
  metadata: {}
  data:
    title: Daily Weather Update
    message: >
      {#–– grab raw values ––#} {% set ct =
      states('sensor.outdoor_temp_temperature_measurement') | float %} {% set
      aqi = states('sensor.purpleair_aqi_st_aqi') | int %} {% set cat =
      states('sensor.purpleair_aqi_st_category') %} {#–– pick tempColor ––#}
      {% set tempColor = 
         ct <= 50  and '#00BFFF' or
         ct <= 70  and 'green'  or
         ct <= 85  and 'yellow' or
         ct <= 100 and 'orange' or
                        'red' %}
      {#–– pick aqiColor ––#} {% set aqiColor =
         aqi <=  50 and 'green'  or
         aqi <= 100 and 'yellow' or
         aqi <= 150 and 'orange' or
         aqi <= 200 and 'red'    or
         aqi <= 300 and 'purple' or
                         'maroon' %}
      {#–– pull weather and HVAC state correctly ––#} {% set weatherPhrase =
      states('weather.klhm') | title %} {% set hvacStatus    =
      states('climate.downstairs') %} {#–– build the HTML ––#} <br><font
      color="Cyan"><b>Current Conditions:</b></font><br> <b>{{ weatherPhrase }}</b>
      and <b><font color="{{ tempColor }}">{{ ct }}</font></b>°F, AQI <b><font
      color="{{ aqiColor }}">{{ aqi }}</font> (<font color="{{ aqiColor }}">{{
      cat }}</font>)</b>

      <br><font color="Cyan"><b>Today:</b></font><br> {{
      states('sensor.klhm_today_daytime_forecast') }}

      <br><font color="Cyan"><b>Tonight:</b></font><br> {{
      states('sensor.klhm_today_night_forecast') }}

      <br><font color="Cyan"><b>Tomorrow:</b></font><br> {{
      states('sensor.klhm_tomorrow_daytime_forecast') }}

      <br><font color="Cyan"><b>HVAC:</font> <font color="yellow">{{ hvacStatus}}</font></b>
      <br> Upstairs: <b>{{ states('sensor.upstairs_temperature_measurement') }}°F</b> | Downstairs: <b>{{ states('sensor.downstairs_temperature_measurement') }}°F</b>
    target: pixel9
    data:
      sound: magic
      ttl: 10800
      html: 1

```

{% endraw %}

Which looks like this upon receipt:  

<p class="img">
  <img
    src="/images/integrations/pushover/html_example.jpg"
    alt="Pushover HTML with Automation Templating"
    width="300"><br>
</p>

# Voice Integration

In the following example, the message is triggered from the Alexa integration using `intents`. This example also uses [Automation Templating](/getting-started/automation-templating/) for the message:

<!-- textlint-disable terminology -->
{% raw %}

```yaml
# Example configuration.yaml entries
alexa:
  intents:
    LocateIntent:
      action:
        service: notify.pushover
        data:
          message: "The location of {{ User }} has been queried via Alexa."
          title: "Home Assistant"
          target: pixel
          data:
            sound: falling
            url: "https://www.home-assistant.io/"
            attachment: "/tmp/image.png"
```
{% endraw %}
<!-- textlint-enable terminology -->

