---
title: Honeywell Lyric
description: Instructions on how to integrate Honeywell Lyric thermostats within Home Assistant.
logo: honeywell.png
ha_category:
  - Climate
ha_release: 0.107
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@shellster'
---

The `lyric` climate platform integrates Home Assistant with [Honeywell Home](https://developer.honeywellhome.com/) (Lyric) climate systems.  

It uses the [python-lyric](https://github.com/bramkragten/python-lyric) client library. It does not currently support leak detector devices.

If your setup thermostat cannot be added when you log into the [Honeywell Home](https://developer.honeywellhome.com/) website, your thermostat is _not_ supported by this component.  Perhaps you are looking for one of the other Honeywell modules instead. This module specifically supports and is tested with Lyric T5 and T6. Some people have also stated that it works with T9, but it hasn't been extensively tested.

## Configuration

### Setup Developer Account and Keys
- Visit [Honeywell Developers](http://developer.honeywell.com/), and sign in. Create an account if you don’t have one already.
- Fill in account details.
- Submit changes
- Click “[My Apps](http://developer.honeywell.com/user/me/apps)” at top of page, under your account.
- Click “[Create New App](http://developer.honeywell.com/user/me/apps/add)”
- Fill in details:
- App name. Can be anything, I use Home Assistant.
- In the “Callback URL” enter the address to your Home Assistant instance: “https://yourhomeassistant:8123/api/lyric/authenticate”. If you have base_url in your HTTP config, use this URL. Otherwise use your local IP. For instance, if your Home Assistant is not using TLS and is located at `192.168.1.150` on port `8123`, you would enter the URL: `http://192.168.1.150:8123/api/lyric/authenticate`
- Click “Save Changes”
- On the apps page, click on the just created app.
- The “Consumer Key” and “Consumer Secret” are shown now. These will be used as client_id and client_secret below.

Once Home Assistant is started, a configurator will pop up asking you to log into your Lyric account.

### Configuration File

```yaml
# Example configuration.yaml entry
lyric:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```


{% configuration %}
client_id:
  description: Your Lyric developer client id.
  required: true
  type: string
client_secret:
  description: The location or locations you would like to include devices from. If not specified, this will include all locations in your Lyric account.
  required: true
  type: string
{% endconfiguration %}
