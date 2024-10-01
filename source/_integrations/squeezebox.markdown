---
title: Squeezebox (Lyrion Music Server)
description: Instructions on how to integrate a Squeezebox player into Home Assistant.
ha_category:
  - Media player
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: squeezebox
ha_codeowners:
  - '@rajlaud'
ha_config_flow: true
ha_dhcp: true
ha_platforms:
  - media_player
ha_integration_type: integration
---

The Squeezebox integration allows you to control music players from the [Lyrion Music Server](https://lyrion.org/) (LMS) ecosystem.  Lyrion Music Server was previously known as [Logitech Media Server](https://en.wikipedia.org/wiki/Squeezebox_%28network_music_player%29).

The Squeezebox music player ecosystem, which can be controlled through this integration, includes hardware audio players from Logitech, including [Squeezebox 3rd Generation, Squeezebox Boom, Squeezebox Receiver, Transporter, Squeezebox2, Squeezebox and SLIMP3](https://lms-community.github.io/players-and-controllers/hardware-comparison/), and many software emulators like [Squeezelite, SqueezeSlave, SoftSqueeze and SqueezePlay](https://sourceforge.net/projects/lmsclients/files/).

{% include integrations/config_flow.md %}

{% note %}
This platform uses the web interface of the Lyrion Music Server (LMS) to send commands. The default port of the web interface is 9000. It is the same port that you use to access the LMS through your web browser.
{% endnote %}

{% note %}
The integration now supports Lyrion Music Servers behind an HTTPS reverse proxy. Please note that Lyrion Music Server natively only supports HTTP traffic. Unless you have configured a reverse proxy, do not select the `https` option. If you have configured a reverse proxy, remember to update the port number.
{% endnote %}

The Logitech Transporter which have two digital inputs can be activated using a script. The following example turns on the Transporter and activates the toslink input interface:

```yaml
# Turn on Transporter and activate toslink interface
transporter_toslink:
  sequence:
    - action: homeassistant.turn_on
      target:
        entity_id: media_player.transporter
    - action: media_player.play_media
      target:
        entity_id: media_player.transporter
      data:
        media_content_id: "source:toslink"
        media_content_type: "music"
```

### Action `call_method`

Call a custom Squeezebox JSON-RPC API.

See documentation for this interface on `http://HOST:PORT/html/docs/cli-api.html?player=` where HOST and PORT are the host name and port for your Lyrion Music Server.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the Squeezebox entities where to run the API method.
| `command` | no | Command to pass to Lyrion Music Server (p0 in the CLI documentation).
| `parameters` | yes | Array of additional parameters to pass to Lyrion Music Server (p1, ..., pN in the CLI documentation).

This action can be used to integrate any Squeezebox action to an automation.

It can also be used to target a Squeezebox from IFTTT (or Dialogflow, Alexa...).

For example, to play an album from your collection, create an IFTTT applet like this:

- Trigger: Google Assistant, with sentence: `I want to listen to album $`
- Action: JSON post query with such JSON body:
`{ "entity_id": "media_player.squeezebox_radio", "command": "playlist", "parameters": ["loadtracks", "album.titlesearch={{TextField}}"] }`

This can work with title search and basically any thing. The same wouldn't have worked by calling directly Squeezebox server as IFTTT cannot escape the text field.

### Action `call_query`

Call a custom Squeezebox JSON-RPC API. The result of the query will be stored in the 'query_result' attribute of the player.

See documentation for this interface on `http://HOST:PORT/html/docs/cli-api.html?player=` where HOST and PORT are the host name and port for your Lyrion Music Server.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Name(s) of the Squeezebox entities where to run the API method.
| `command` | no | Command to pass to Lyrion Music Server (p0 in the CLI documentation).
| `parameters` | yes | Array of additional parameters to pass to Lyrion Music Server (p1, ..., pN in the CLI documentation).

This action can be used to integrate a Squeezebox query into an automation. For example, in a Python script, you can get a list of albums available by an artist like this:
`hass.services.call("squeezebox", "call_query", { "entity_id": "media_player.kitchen", "command": "albums", "parameters": ["0", "20", "search:beatles", "tags:al"] })`
To work with the results:
`result = hass.states.get("media_player.kitchen").attributes['query_result']`
