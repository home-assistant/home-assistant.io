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
body_id: components-page
---

<p class='note'>
Support for these components is provided by the Home Assistant community.
</p>

{% assign components = site.components | sort: 'title' %}
{% assign categories = components | sort: 'ha_category' | map: 'ha_category' %}

<div class="filter-button-group">
  <a href='#' class="btn current" data-filter="*">All</a>

  {% comment %} Jekyll 2.5.2 does not support the uniq filter :/ {% endcomment %}
  {% assign category_printed = '' %}

  {% for category in categories %}
    {% if category and category != 'Other' %}
      {% unless category_printed contains category %}
        <a href='#' class="btn" data-filter=".{{ category | slugify }}">{{ category }}</a>
        {% assign category_printed = category_printed | append: ',' | append: category %}
      {% endunless %}
    {% endif %}
  {% endfor %}

  <a href='#' class="btn" data-filter=".{{ 'Other' | slugify }}">Other</a>
</div>

<div id="componentContainer">
  {% for component in components %}
    {% if component.ha_category %}
      <a href='{{ component.url }}' class='{{ component.ha_category | slugify }}'>
        <div class='img-container'>
          {% if component.logo %}
            <img src='/images/supported_brands/{{ component.logo }}'>
          {% endif %}
        </div>
        <div class='title'>{{ component.title }}</div>
        <div class='category'>{{ component.ha_category }}</div>
      </a>
    {% endif %}
  {% endfor %}
</div>

{% comment %}
## Not done yet

{% for component in components %}
  {% unless component.ha_category %}
<p>{{ component.title }}</p>
  {% endunless %}
{% endfor %}
{% endcomment %}

## {% linkable_title Organization %}
| Type | Description
| ---- | -----------
| [Group](/components/group.html) | Allows grouping of entities
| [Scene](/components/scene.html) | Allow defining preferred state of a set of entities
| [Zone](/components/zone.html) | Allow defining zones on the map

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
| [Discovery](/components/discovery.html) | Discover and configure new devices.


<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.2/isotope.pkgd.js"></script>
<script type="text/javascript">
$(window).load(function(){
    var $container = $('#componentContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });

    $('.filter-button-group a').click(function() {
        $('.filter-button-group .current').removeClass('current');
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
