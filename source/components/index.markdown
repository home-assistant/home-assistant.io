---
layout: page
title: "Components"
description: "List of the built-in components of Home Assistant."
date: 2014-12-21 13:35
sidebar: false
comments: false
sharing: true
footer: true
is_homepage: true
---

Components add support for devices, automation, and much much more to Home Assistant. The following things are supported out-of-the-box.

## {% linkable_title Entities %}

Entities are things that you want to observe within Home Assistant. Support for these things are provided by the entity components [Light](/components/light.html), [Switch](/components/switch.html), [Thermostat](/components/thermostat.html), [Media player](/components/media_player.html), [Device tracker](/components/device_tracker.html), and [Sun](/components/sun.html).


<!-- 1. column LIGHT AND ENVIRONMENT -->
<div class="grid-wrapper">
  <div class="grid">
    <div class="grid__item one-half lap-one-whole palm-one-whole usp">
      <div class="grid">

        <div class="grid__item one-whole lap-two-half">
          <h2 class="title" id='light'>Light and environment</h2>
	    <p></p>

<table>

<tr>
  <td><a href='/components/light.hue.html'><img src='/images/supported_brands/philips_hue.png' class='brand overview' /></a></td>
  <td><a href='/components/light.hue.html'>Philips Hue</a> turns lights on, controls brightness, and color.</td>
</tr>

<tr>
  <td><a href='/components/thermostat.nest.html'><img src='/images/supported_brands/nest_thermostat.png' class='brand overview' /></a></td>
  <td><a href='/components/thermostat.nest.html'>Nest thermostats</a> displays current temperature and control target temperature/away mode.</td>
</tr>

<tr>
  <td></td>
  <td><a href='/components/thermostat.heat_control.html'>Heat Control</a> reads a temperature sensor and control a heater switch.</td>
</tr>

<tr>
  <td><a href='/components/switch.wemo.html'><img src='/images/supported_brands/belkin_wemo.png' class='brand overview' /></a></td>
  <td><a href='/components/switch.wemo.html'>WeMo switches</a> controls and reads the usage statistics from Insight switches.</td>
</tr>

<tr>
  <td></td>
  <td><a href='/components/sensor.temper.html'>TEMPer sensors</a> reads the current temperature.</td>
</tr>

<tr>
  <td><a href='/components/light.limitlessled.html'><img src='/images/supported_brands/dialog-information.png' class='brand overview' /></a></td>
  <td><a href='/components/light.limitlessled.html'>LimitlessLED</a> controls your LimitlessLED lights.</td>
</tr>

<tr>
  <td><a href='/components/switch.edimax.html'><img src='/images/supported_brands/edimax.png' class='brand overview' /></a></td>
  <td><a href='/components/switch.edimax.html'>Edimax switches</a> controls the state.</td>
</tr>

<tr>
  <td><a href='/components/sensor.efergy.html'><img src='/images/supported_brands/efergy.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.efergy.html'>Efergy Engage hubs</a> monitors home energy use.</td>
</tr>

<tr>
  <td><a href='/components/sensor.dht.html'><img src='/images/supported_brands/dht.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.dht.html'>DHTxx</a> reads the temperature and humidity.</td>
</tr>

<tr>
  <td><a href='/components/light.blinkstick.html'><img src='/images/supported_brands/blinkstick.png' class='brand overview' /></a></td>
  <td><a href='/components/light.blinkstick.html'>Blickstick</a> controls your Blinkstick lights or device.</td>
</tr>

</table>
        </div>
      </div>
    </div>
<!-- 2. column DEVICES AND PROTOCOLS -->
    <div class="grid__item one-half lap-one-whole palm-one-whole usp">
      <div class="grid">

        <div class="grid__item one-whole lap-two-hald">
          <h2 class="title" id='devices'>Devices and protocols</h2>
            <p></p>
<table>

<tr>
  <td><a href='/components/sensor.mysensors.html'><img src='/images/supported_brands/mysensors.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.mysensors.html'>MySensors</a> integrates MySensors sensors.</td>
</tr>

<tr>
  <td><a href='/components/switch.rpi_gpio.html'><img src='/images/supported_brands/raspberry-pi.png' class='brand overview' /></a></td>
  <td>Raspberry PI <a href='/components/switch.rpi_gpio.html'>switch</a> controls and <a href='/components/sensor.rpi_gpio.html'>sensor</a> reads the values of GPIOs.</td>
</tr>

<tr>
  <td><a href='/components/isy994.html'><img src='/images/supported_brands/insteon.png' class='brand overview' /></a></td>
  <td><a href='/components/isy994.html'>Insteon</a> controls devices connected with the ISY994 controller.</td>
</tr>

<tr>
  <td><a href='/components/isy994.html'><img src='/images/supported_brands/x10.gif' class='brand overview' /></a></td>
  <td><a href='/components/isy994.html'>X10</a> controls devices connected with the ISY994 controller.</td>
</tr>

<tr>
  <td><a href='/components/arduino.html'><img src='/images/supported_brands/arduino.png' class='brand overview' /></a></td>
  <td><a href='/components/arduino.html'>Arduino</a> controls digital pins and read from analog pins.</td>
</tr>

<tr>
  <td></td>
  <td><a href='/components/sensor.rfxtrx.html'>RFXtrx</a> sensors monitors values from RFXtrx devices.</td>
</tr>

<tr>
  <td><a href='/components/mqtt.html'><img src='/images/supported_brands/mqtt.png' class='brand overview'/></a></td>
  <td><a href='/components/mqtt.html'>MQTT</a> allows sending and recieving MQTT messages, incl. <a href='/components/switch.mqtt.html'>switches</a> and <a href='/components/sensor.mqtt.html'>sensors</a>.</td>
</tr>

<tr>
  <td><a href='/components/sensor.arest.html'><img src='/images/supported_brands/arest.png' class='brand overview' /></a></td>
  <td>aREST <a href='/components/sensor.arest.html'>sensors</a> observe and <a href='/components/switch.arest.html'>switches</a> controls the pins of aREST enabled devices.</td>
</tr>

<tr>
  <td><a href='/components/sensor.rest.html'><img src='/images/supported_brands/rest.png' class='brand overview' /></a></td>
  <td>REST <a href='/components/sensor.rest.html'>sensors</a> observe RESTful enabled devices or services.</td>
</tr>

</table>

        </div>
      </div>
    </div>
  </div>
</div>


<!-- 1. column PRESENCE DETECTION -->
<div class="grid-wrapper">
  <div class="grid">
    <div class="grid__item one-third lap-one-whole palm-one-whole usp">
      <div class="grid">

        <div class="grid__item one-whole lap-two-thirds">
          <h2 class="title" id='presence'>Presence detection</h2>
            <p>Offers presence detection by looking at connected devices or by scanning the network.</p>
<table>
<tr>
  <td><a href='/components/device_tracker.actiontec.html'><img src='/images/supported_brands/actiontec.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.actiontec.html'>Actiontec routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.aruba.html'><img src='/images/supported_brands/aruba.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.aruba.html'>Aruba routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.asuswrt.html'><img src='/images/supported_brands/asus.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.asuswrt.html'>ASUSWRT routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.ddwrt.html'><img src='/images/supported_brands/ddwrt.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.ddwrt.html'>DD-WRT routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.luci.html'><img src='/images/supported_brands/openwrt.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.luci.html'>OpenWRT routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.owntracks.html'><img src='/images/supported_brands/owntracks.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.owntracks.html'>OwnTracks devices</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.mqtt.html'><img src='/images/supported_brands/mqtt.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.mqtt.html'>MQTT devices</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.netgear.html'><img src='/images/supported_brands/netgear.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.netgear.html'>Netgear routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.tomato.html'><img src='/images/supported_brands/network-wired-disconnected.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.tomato.html'>Tomato routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.tplink.html'><img src='/images/supported_brands/tp-link.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.tplink.html'>TP-Link routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.thomson.html'><img src='/images/supported_brands/technicolor.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.thomson.html'>Thomson routers</a></td>
</tr>

<tr>
  <td><a href='/components/device_tracker.nmap_scanner.html'><img src='/images/supported_brands/network-workgroup.png' class='brand overview' /></a></td>
  <td><a href='/components/device_tracker.nmap_scanner.html'>NMap network scanning</a></td>
</tr>

</table>

        </div>
      </div>
    </div>
<!-- 2. column MEDIA PLAYERS -->
    <div class="grid__item one-third lap-one-whole palm-one-whole usp">
      <div class="grid">

        <div class="grid__item one-whole lap-two-thirds">
          <h2 class="title" id='media-player'>Media player</h2>
            <p>Controls your media player (Playback and Volume) and get details about the played track.</p>

<table>

<tr>
  <td><a href='/components/media_player.denon.html'><img src='/images/supported_brands/denon.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.denon.html'>Denon Network Receivers</a></td>
</tr>

<tr>
  <td><a href='/components/media_player.cast.html'><img src='/images/supported_brands/google_cast.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.cast.html'>Google Cast</a></td>
</tr>

<tr>
  <td><a href='/components/media_player.kodi.html'><img src='/images/supported_brands/kodi.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.kodi.html'>Kodi</a></td>
</tr>

<tr>
  <td><a href='/components/media_player.itunes.html'><img src='/images/supported_brands/itunes.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.itunes.html'>iTunes</a></td>
</tr>

<tr>
  <td><a href='/components/media_player.squeezebox.html'><img src='/images/supported_brands/logitech.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.squeezebox.html'>Logitech Squeezebox</a></td>
</tr>

<tr>
  <td><a href='/components/media_player.mpd.html'><img src='/images/supported_brands/mpd.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.mpd.html'>Music Player Daemon (MPD)</a></td>
</tr>

<tr>
  <td><a href='/components/media_player.plex.html'><img src='/images/supported_brands/plex.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.plex.html'>Plex</a></td>
</tr>

<tr>
  <td><a href='/components/media_player.sonos.html'><img src='/images/supported_brands/sonos.png' class='brand overview' /></a></td>
  <td><a href='/components/media_player.sonos.html'>Sonos devices</a></td>
</tr>

</table>

        </div>
      </div>
    </div>
<!-- 3. column CAMERAS AND VARIOUS -->
    <div class="grid__item one-third lap-one-whole palm-one-whole usp">
      <div class="grid">
        <div class="grid__item one-whole lap-two-thirds">
         <h2 class="title" id='camera'>Cameras and various other entities</h2>
           <p>Camera allows you to see what going in real-time. Other entities report the current state and/or let you control it.</p>

<table>
<tr>
  <td><a href='/components/switch.hikvision.html'><img src='/images/supported_brands/hikvision.png' class='brand overview' /></a></td>
  <td><a href='/components/switch.hikvision.html'>Hikvision</a> controls the motion detection setting.</td>
</tr>

<tr>
  <td><a href='/components/camera.generic.html'><img src='/images/supported_brands/camera-web.png' class='brand overview' /></a></td>
  <td><a href='/components/camera.generic.html'>IP camera</a> integrates a generic IP camera or image url.</td>
</tr>

  <td><a href='/components/camera.foscam.html'><img src='/images/supported_brands/foscam.png' class='brand overview' /></a></td>
  <td><a href='/components/camera.Foscam.html'>Foscam</a> let you see your live stream.</td>
</tr>

<tr>
  <td><a href='/components/sensor.sabnzbd.html'><img src='/images/supported_brands/sabnzbd.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.sabnzbd.html'>SABnzbd clients</a> monitors queue and download speeds.</td>
</tr>

<tr>
  <td><a href='/components/sensor.systemmonitor.html'><img src='/images/supported_brands/utilities-system-monitor.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.systemmonitor.html'>System Monitor</a> tracks CPU, memory, and disk usage on the host machine.</td>
</tr>

<tr>
  <td><a href='/components/sensor.transmission.html'><img src='/images/supported_brands/transmission.png' class='brand overview' /></a></td>
  <td>
    <a href='/components/sensor.transmission.html'>Transmission</a> monitors status/speeds and <a href='/components/switch.transmission.html'>changes</a> the speed limits.
  </td>
</tr>

<tr>
  <td><a href='/components/switch.command_switch.html'><img src='/images/supported_brands/utilities-terminal.png' class='brand overview' /></a></td>
  <td>Command line <a href='/components/switch.command_switch.html'>switches</a> and <a href='/components/sensor.command_sensor.html'>sensors</a> issues command line commands to do or the get something.</td>
</tr>

<tr>
  <td><a href='/components/sensor.glances.html'><img src='/images/supported_brands/glances.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.glances.html'>Glances</a> tracks system information on remote hosts.</td>
</tr>

</table>

        </div>
      </div>
    </div>
  </div>
</div>

<p class='note'>
Support for these devices is provided by the Home Assistant community and not
the manufacturers of these devices.
</p>

## {% linkable_title Hubs %}

Home Assistant integrates with a variety of third party Home Automation hubs and networks. It allows you to control the connected switches, lights and sensors via Home Assistant. Click on the following logos for setup instructions:

[<img src='/images/supported_brands/z-wave.png' class='brand' alt="Zwave" />](/components/zwave.html)
[<img src='/images/supported_brands/telldus_tellstick.png' class='brand' alt="Tellstick" />](/components/tellstick.html)
[<img src='/images/supported_brands/vera.png' class='brand' alt="Vera" />](/components/vera.html)
[<img src='/images/supported_brands/wink.png' class='brand' alt="Wink" />](/components/wink.html)
[<img src='/images/supported_brands/universal_devices.png' class='brand' alt="ISY994" />](/components/isy994.html)
[<img src='/images/supported_brands/modbus.png' class='brand' alt="Modbus" />](/components/modbus.html)
[<img src='/images/supported_brands/verisure.png' class='brand' alt="Verisure" />](/components/verisure.html)

<p class='note'>
Support for these devices is provided by the Home Assistant community and not
the manufacturers of these devices.
</p>

## {% linkable_title Services %}

<!-- 1. column INTERNALS -->
<div class="grid-wrapper">
  <div class="grid">
    <div class="grid__item one-third lap-one-whole palm-one-whole usp">
      <div class="grid">

        <div class="grid__item one-whole lap-two-thirds">
          <h2 class="title" id='internal'>Internals</h2>
            <p>Those services offers you a wide range of possibilities out-of-box.</p>
<table>

<tr>
  <td><a href='/components/history.html'><img src='/images/supported_brands/x-office-presentation.png' class='brand overview' /></a></td>
  <td><a href='/components/history.html'>History</a> track the state of entities and allow users to browse through.</td>
</tr>

<tr>
  <td><a href='/components/conversation.html'><img src='/images/supported_brands/system-users.png' class='brand overview' /></a></td>
  <td><a href='/components/conversation.html'>Conversation</a> process textual commands like ones received by speech-to-text engines.</td>
</tr>

<tr>
  <td><a href='/components/discovery.html'><img src='/images/supported_brands/system-search.png' class='brand overview' /></a></td>
  <td><a href='/components/discovery.html'>Discovery</a> scans the network for supported devices.</td>
</tr>

<tr>
  <td><a href='/components/logbook.html'><img src='/images/supported_brands/accessories-text-editor.png' class='brand overview' /></a></td>
  <td><a href='/components/logbook.html'>Logbook</a> provides a logbook-style view on the Entity history.</td>
</tr>

<tr>
  <td><a href='/components/browser.html'><img src='/images/supported_brands/web-browser.png' class='brand overview' /></a></td>
  <td><a href='/components/browser.html'>Browser</a> opens URLs on the host machine.</td>
</tr>

<tr>
  <td><a href='/components/downloader.html'><img src='/images/supported_brands/emblem-downloads.png' class='brand overview' /></a></td>
  <td><a href='/components/downloader.html'>Downloader</a> allows downloading URLs to the host machine.</td>
</tr>

<tr>
  <td><a href='/components/keyboard.html'><img src='/images/supported_brands/input-keyboard.png' class='brand overview' /></a></td>
  <td><a href='/components/keyboard.html'>Keyboard</a> simulate key presses on the host machine.</td>
</tr>

<tr>
  <td><a href='/components/sensor.time_date.html'><img src='/images/supported_brands/clock.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.time_date.html'>Time & Date</a> displays the time and the date and <a href='/components/sensor.worldclock.html'>Worldclock</a> from a different time zone.</td>
</tr>

</table>

        </div>
      </div>
    </div>
<!-- 2. column NOITIFICATIONS -->
    <div class="grid__item one-third lap-one-whole palm-one-whole usp">
      <div class="grid">

        <div class="grid__item one-whole lap-two-thirds">
          <h2 class="title" id='notify-service'>Notifications</h2>
            <p>Allows you to send customized messages to the given service.</p>

<table>

<tr>
  <td><a href='/components/notify.file.html'><img src='/images/supported_brands/text-x-generic.png' class='brand overview' /></a></td>
  <td><a href='/components/notify.file.html'>File</a></td>
</tr>

<tr>
  <td><a href='/components/notify.nma.html'><img src='/images/supported_brands/nma.png' class='brand overview' /></a></td>
  <td><a href='/components/notify.nma.html'>Notify My Android (NMA)</a></td>
</tr>

<tr>
  <td><a href='/components/notify.instapush.html'><img src='/images/supported_brands/instapush.png' class='brand overview' /></a></td>
  <td><a href='/components/notify.instapush.html'>Instapush</a></td>
</tr>

<tr>
  <td><a href='/components/notify.pushbullet.html'><img src='/images/supported_brands/pushbullet.png' class='brand overview' /></a></td>
  <td><a href='/components/notify.pushbullet.html'>PushBullet</a></td>
</tr>

<tr>
  <td><a href='/components/notify.pushover.html'><img src='/images/supported_brands/pushover.png' class='brand overview' /></a></td>
  <td><a href='/components/notify.pushover.html'>PushOver</a></td>
</tr>

<tr>
  <td><a href='/components/notify.slack.html'><img src='/images/supported_brands/slack.png' class='brand' /></a></td>
  <td><a href='/components/notify.slack.html'>Slack</a></td>
</tr>

<tr>
  <td><a href='/components/notify.smtp.html'><img src='/images/supported_brands/smtp.png' class='brand' /></a></td>
  <td><a href='/components/notify.smtp.html'>E-Mail</a></td>
</tr>

<tr>
  <td><a href='/components/notify.syslog.html'><img src='/images/supported_brands/applications-system.png' class='brand overview' /></a></td>
  <td><a href='/components/notify.syslog.html'>Syslog</a></td>
</tr>

<tr>
  <td><a href='/components/notify.xmpp.html'><img src='/images/supported_brands/xmpp.png' class='brand overview' /></a></td>
  <td><a href='/components/notify.xmpp.html'>Jabber (XMPP)</a></td>
</tr>

</table>

        </div>
      </div>
    </div>
<!-- 3. column WEB SERVICES -->
    <div class="grid__item one-third lap-one-whole palm-one-whole usp">
      <div class="grid">
        <div class="grid__item one-whole lap-two-thirds">
         <h2 class="title" id='web-service'>Web services</h2>
           <p>The web services displays data grabbed from an external source or interact with them.</p>

<table>

<tr>
  <td><a href='/components/sensor.openweathermap.html'><img src='/images/supported_brands/openweathermap.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.openweathermap.html'>OpenWeatherMap</a> displays current meteorological data or weather forecast.</td>
</tr>

<tr>
  <td><a href='/components/sensor.forecast.html'><img src='/images/supported_brands/weather-few-clouds.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.forecast.html'>Forecast.io</a> displays current meteorological data.</td>
</tr>

<tr>
  <td><a href='/components/sensor.bitcoin.html'><img src='/images/supported_brands/bitcoin.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.bitcoin.html'>Bitcoin</a> displays details about the Bitcoin Network.</td>
</tr>

<tr>
  <td><a href='/components/sensor.swiss_public_transport.html'><img src='/images/supported_brands/appointment-new.png' class='brand overview' /></a></td>
  <td><a href='/components/sensor.swiss_public_transport.html'>Swiss Public Transport</a> displays Swiss timetable data for traveling.</td>
</tr>

<tr>
  <td><a href='/components/ifttt.html'><img src='/images/supported_brands/ifttt.png' class='brand overview' /></a></td>
  <td><a href='/components/ifttt.html'>IFTTT</a> allows the triggering of recipes.</td>
</tr>

</table>

        </div>
      </div>
    </div>
  </div>
</div>


<p class='note'>
Support for these services is provided by the Home Assistant community and not
the service providers.
</p>

## {% linkable_title Organization %}
| Type | Description
| ---- | -----------
| [Group](/components/group.html) | Allows grouping of entities
| [Scene](/components/scene.html) | Allow defining preferred state of a set of entities

## {% linkable_title Automation %}

| Type | Description
| ---- | -----------
| [Automation](/components/automation.html) | Allow for automating service calls when a specific state is met
| [Script](/components/script.html) | Allow user to define scripts to run from within Home Assistant
| [Zone](/components/zone.html) | Allow user to define zones within Home Assistant
| [Device sun light trigger](/components/device_sun_light_trigger.html) | Slowly fade in the lights to compensate the setting sun. Also turns on lights when you get home after dark.
| [Simple alarm](/components/simple_alarm.html) | Let the lights blink red when the lights turn on while no one is home.

## {% linkable_title Misc %}

| Type | Description
| ---- | -----------
| [Configurator](/components/configurator.html) | Component used by other components to get configuration from the user.
