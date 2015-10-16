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

<head>

<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.2/isotope.pkgd.js"></script>


<style>
img {
    margin:5px;
}

.isotope-item {
    z-index: 2;
}
.isotope-hidden.isotope-item {
    pointer-events: none;
    z-index: 1;
}
.isotope,
.isotope .isotope-item {
    -webkit-transition-duration: 0.8s;
    -moz-transition-duration: 0.8s;
    transition-duration: 0.8s;
}
.isotope {
    -webkit-transition-property: height, width;
    -moz-transition-property: height, width;
    transition-property: height, width;
}
.isotope .isotope-item {
    -webkit-transition-property: -webkit-transform, opacity;
    -moz-transition-property: -moz-transform, opacity;
    transition-property: transform, opacity;
}
</style>

<script type="text/javascript">
$(window).load(function(){
    var $container = $('.componentContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.componentFilter a').click(function(){
        $('.componentFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 
});
</script>

</head>

Components add support for devices, automation, and much much more to Home Assistant. The following things are supported out-of-the-box.

## {% linkable_title Entities %}

Entities are things that you want to observe within Home Assistant. Support for these things are provided by the entity components [Light](/components/light.html), [Switch](/components/switch.html), [Thermostat](/components/thermostat.html), [Media player](/components/media_player.html), [Device tracker](/components/device_tracker.html), and [Sun](/components/sun.html).



<div class="componentFilter">
	<a href="#" data-filter="*" class="btn current">All</a>
	<a class="btn" href="#" data-filter=".sensor">Sensor</a>
	<a class="btn" href="#" data-filter=".switch">Switch</a>
	<a class="btn" href="#" data-filter=".media">Media player</a>
	<a class="btn" href="#" data-filter=".presence">Presence</a>
</div>


<script type="text/javascript">
$(document).on('ready',function(){

var data = [
    {"name": "Raspberry", "type": "switch", "image": "raspberry-pi.png", "details": "switch.rpi_gpio.html"},
    {"name": "LimitlessLED", "type": "light", "image": "dialog-information.png", "details": "light.limitlessled.html"},
    {"name": "Insteon", "type": "switch", "image": "insteon.png", "details": "isy994.html"},
    {"name": "Owntracks", "type": "presence", "image": "owntracks.png", "details": "device_tracker.owntracks.html"},
    {"name": "Kodi", "type": "media", "image": "kodi.png", "details": "media_player.kodi.html"},
    {"name": "MPD", "type": "media", "image": "mpd.png", "details": "media_player.mpd.html"},
    {"name": "Arduino", "type": "sensor", "image": "arduino.png", "details": "sensor.arduino.html"},
    {"name": "Arduino", "type": "switch", "image": "arduino.png", "details": "switch.arduino.html"},
    {"name": "MQTT", "type": "sensor", "image": "mqtt.png", "details": "sensor.mqtt.html"},
    {"name": "MQTT", "type": "switch", "image": "mqtt.png", "details": "switch.mqtt.html"},
    ];

$.map(data, function(component, index) {
    console.log(component.name, component.type, component.image, component.description);

$("div.componentContainer").append('<div class="' + component.type + '">' + 
'<img src="/images/supported_brands/' + component.image + '" class="brand" />' + '<p>' + component.name + '</p>' + '</div></div>');
});

});
</script>

<div class="componentContainer"></div>




<p class='note'>
Support for these services is provided by the Home Assistant community and not the service providers.
</p>

## {% linkable_title Organization %}
| Type | Description
| ---- | -----------
| [Group](/components/group.html) | Allows grouping of entities
| [Scene](/components/scene.html) | Allow defining preferred state of a set of entities

## {% linkable_title Automation %}

| Type | Description
| ---- | -----------
| [Automation](/components/automation.html) | Allow for automating service calls when a specific state is met.
| [Script](/components/script.html) | Allow user to define scripts to run from within Home Assistant.
| [Zone](/components/zone.html) | Allow user to define zones within Home Assistant.
| [Device sun light trigger](/components/device_sun_light_trigger.html) | Slowly fade in the lights to compensate the setting sun. Also turns on lights when you get home after dark.
| [Simple alarm](/components/simple_alarm.html) | Let the lights blink red when the lights turn on while no one is home.

## {% linkable_title Misc %}

| Type | Description
| ---- | -----------
| [Configurator](/components/configurator.html) | Component used by other components to get configuration from the user.
