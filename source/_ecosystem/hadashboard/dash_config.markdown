---
layout: page
title: "Dashboard Configuration"
description: "Dashboard Configuration"
release_date: 2016-11-13 15:00:00 -0500
sidebar: true
comments: false
sharing: true
footer: true
---

(All installations)

Hadashboard is a Dashing application, so make sure to read all the instructions on http://dashing.io to learn how to add widgets to your dashboard, as well as how to create new widgets.

Make a copy of `dashboards/example.erb` and call it `main.erb`, then edit this file to reference the items you want to display and control and to get the layout that you want. Leave the original `example.erb` intact and unchanged so that you don't run into problems when trying to update using the git commands mentioned later in "Updating the Dashboard".

The basic anatomy of a widget is this:

``` html
 	<li data-row="" data-col="1" data-sizex="1" data-sizey="1">
      <div data-id="office" data-view="Hadimmer" data-title="Office Lamp"></div>
    </li>
```

- **data-row**, **data-col**: The position of the widget in the grid.
- **data-sizex**, **data-sizey**: The size of the widget in terms of grid tile.
- **data-id**: The homeassitant entity id without the entity type (e.g. `light.office` becomes `office`).
- **data-view**: The type of widget to be used (Haswitch, Hadimmer, Hatemp etc.)
- **data-icon**: The icon displayed on the tile. See http://fontawesome.io for an icon cheatsheet.
- **data-title**: The title to be displayed on the tile.
- ***data-bgcolor*** (optional) - the background color of the widget.

Note that although it is legal in XML terms to split the inner `<div>` like this:

``` html
<li data-row="" data-col="1" data-sizex="1" data-sizey="1">
  <div data-id="office"
        data-view="Hadimmer"
        data-title="Office Lamp">
  </div>
</li>
```

This may break `hapush`'s parsing of the file, so keep to the line format first presented.

Please, refer to the Dashing website for instructions on how to change the grid and tile size, as well as more general instructions about widgets, their properties, and how to create new widgets.

## {% linkable_title Supported Widgets %}

At this time I have provided support for the following Home Assistant entity types.

- switch: Widget type **Haswitch**
- lock: Widget type **Halock**
- devicetracker: Widget type **Hadevicetracker**
- light: Widget type  **Hadimmer**
- cover: Widget type **Hacover**
- input_boolean: Widget type **Hainputboolean**
- scene: Widget type **Hascene**

- **data-ontime** (optional): The amount of time the scene icon lights up when pressed, in milliseconds, default 1000.

### {% linkable_title  script %}

Widget type ***Hascript***

**data-ontime** (optional): The amount of time the scene icon lights up when pressed, in milliseconds, default 1000.

### {% linkable_title mode %}

The `Hamode` widget alows you to run a script on activation and to link it with a specified `input_select` so the button will be highlighted for certain values of that input select. The usecase for this is that I maintain an `input_select` as a flag for the state of the house to simplify other automations. I use scripts to switch between the states, and this feature provides feedback as to the current state by lighting up the appropriate mode button.

A `Hamode` widget using this feature will look like this:

```html
<li data-row="5" data-col="3" data-sizex="2" data-sizey="1">
      <div data-id="day" data-view="Hamode" data-title="Good Day" data-icon="sun-o" data-changemode="Day" data-input="house_mode"></div>
    </li>
```

- **data-changemode**: The value of the `input_select` for which this script button will light up
- **data-input**: The `input_select` entity to use (minus the leading entity type)

### {% linkable_title input_select (read only) %}
Widget type **Hainputselect**

### {% linkable_title sensor %}
Widget type **Hasensor**

Text based output of the value of a particular sensor.

The Hasensor widget supports an additional paramater  `data-unit`. This allows you to set the unit to whatever you want:  Centigrade, %, lux or whatever you need for the sensor in question. For a temperature sensor you will need to explicitly include the degree symbol like this:

```html
data-unit="&deg;F"
```

If omitted, no units will be shown.

### {% linkable_title sensor %}
Widget type **Hameter**

An alternative to the text based `Hasensor` that works for numeric values only.

The Hameter widget supports an additional paramater  `data-unit`. This allows you to set the unit to whatever you want:  Centigrade, %, lux or whatever you need for the sensor in question. For a temperature sensor you will need to explicitly include the degree symbol like this:

```html
data-unit="&deg;F"
```

If omitted, no units will be shown.

### {% linkable_title binary_sensor %}
Widget type **Habinary**

An icon-based option for generic binary sensors. Useful for things like door contact sensors. In addition to the standard widget parameters, Habinary supports two additional parameters:

- **data-iconon**: the icon to display when the sensor state is "on"
- **data-iconoff**: the icon to display when the sensor state if "off"

If no icons are specified, the widget defaults to a flat gray line for "off" and a green bullseye for "on".

### {% linkable_title group %}
Widget type **Hagroup**.

The Hagroup widget uses the homeassistant/turn_on and homeassistant/turn_off API call, so certain functionality will be lost.  For example, you will not be able to use control groups of locks or dim lights.

## {% linkable_title Alarm Control Panel %}

These widgets allow the user to create a working control panel that can be used to control the Manual Alarm Control Panel component (https://home-assistant.io/components/alarm_control_panel.manual). The example dashboard contains an arrangement similar to this:

<p class='img'>
    <img src='/images/hadashboard/alarm_panel.png' />
    The Alarm Panel
</p>

Widget type **Haalarmstatus**

The Haalarmstatus widget displays the current status of the alarm_control_panel entity. It will also display the code as it is being entered by the user.

The data-id must be the same as the alarm_control_panel entity_id in Home Assistant.

Widget type **Haalarmdigit**

The Haalarmdigit widget is used to create the numeric keypad for entering alarm codes.

`data-digit` holds the numeric value you wish to enter. The special value of "-" creates a 'clear' button which will wipe the code and return the Haalarmstatus widget display back to the current alarm state.

`data-alarmentity` holds the data-id of the Haalarmstatus widget, so that the status widget can be correctly updated. It is mandatory for a 'clear' type digit and optional for normal numeric buttons.

Widget type **Haalarmaction**

The Haalarmaction widget creates the arm/disarm/trigger buttons. Bear in mind that alarm triggering does not require a code, so you may not want to put this button near the other buttons in case it is pressed accidentally.

data-action must contain one of the following: arm_home/arm_away/trigger/disarm.

### {% linkable_title weather (requires DarkSky) %}

Widget type **Haweather**.

In order to use the weather widget you must configure the [DarkSky component](/components/sensor.darksky/), and ensure that you configure at least the following monitored conditions in your Home Assistant sensor configuration:

- temperature
- humidity
- precip_probability
- precip_intensity
- wind_speed
- pressure
- wind_bearing
- apparent_temperature
- icon

The `data-id` of the Haweather widget must be set to `weather` or the widget will not work.

The Hatemp widget supports an additional paramater `data-unit`. This allows you to set the unit to whatever you want: Centigrade, Fahrenheit or even Kelvin if you prefer. You will need to explicitly include the degree symbol like this:

```html
data-unit="&deg;F"
```

If omitted, no units will be shown.

### {% linkable_title News %}
Widget type ***News*** (contributed by [KRiS](https://community.home-assistant.io/users/kris/activity))

This is an RSS widget that can be used for displaying travel information, news etc. on the dashboard. The RSS feed will update every 60 minutes. To configure this, first it is necessary to add your desired feeds in `homeassistant/lib/ha_conf.rb` in the `$news_feeds` section. By default it comes with 2 sample feeds:

```ruby
$news_feeds = {
  "Traffic" => "http://api.sr.se/api/rss/traffic/2863",
  "News" => "http://feeds.bbci.co.uk/news/rss.xml",
}
```

You can add as many as you want. The important point is that the key value (e.g. "Traffic" or "News" in the example above is used to tie the feed to your widget in the dashboard file. Here is an example of the Traffic widget that displays the first feed in the list:

```html
<li data-row="3" data-col="2" data-sizex="2" data-sizey="2">
  <div data-id="Traffic" data-view="News" data-title="Traffic" data-interval="30" data-bgcolor="#643EBF">
</li>
```
The value of thee `data-id` tag must match the key value in the `$news_feeds` configuration.

- **data-interval** (optional): The time in seconds that each entry in the RSS feed is displayed before the next one is shown, default is 30 seconds.


**The follwing widget types have been deprecated in favor of the more flexible `Hasensor` and `Hameter` widgets. They will be removed in a future release.**

### {% linkable_title sensor (humidity) %}
Widget type **Hahumidity**.

### {% linkable_title sensor (humidity) %}
Widget type **Hahumiditymeter** (contributed by [Shiv Chanders](https://community.home-assistant.io/users/chanders/activity))

This is an alternative to the the text based humidity widget above, it display the humidity as an animated meter from 0 to 100%.

### {% linkable_title sensor (luminance) %}
Widget type **Halux**.

### {% linkable_title sensor (temperature) %}
Widget type **Hatemp**.

The Hatemp widget supports an additional paramater `data-unit`. This allows you to set the unit to whatever you want:  Centigrade, Fahrenheit or even Kelvin if you prefer. You will need to explicitly include the degree symbol like this:

```html
data-unit="&deg;F"
```
If omitted, no units will be shown.

## {% linkable_title Customizing CSS styles %}
If you want to customize the styles of your dashboard and widgets, there are two options:

1. You can edit the application.scss file (and the individual widget .scss files) directly (not recommended; if you pull down updates from the master repository, your changes might conflict/be overwritten)
1. __Create override files (recommended)__
    1. Create a couple of additional files in the _assets/stylesheets_ directory: `_application_custom.scss` and `_variables_custom.scss`.
    1. Open `application.scss` and go to the bottom of the file. Uncomment the @import line.
    1. Open `_variables.scss` and go to the bottom of the file. Uncomment the @import line.
    1. Write your own SASS styles in `_application_custom.scss` (for general style customization) and `_variables_custom.scss` (for colors). You can customize those files without worrying about your changes getting overwritten if you pull down an update. The most you may have to do, if you update, will be to uncomment the @import lines again from steps 2 and 3.

__Note: The `_variables.scss` file (and your customizations from `_variables_custom.scss`) get imported into nearly every widget's SCSS file, so it is a best practice to define varaibles for colors in `_variables.scss` or `_variables_custom.scss` and reference those variables in the widget SCSS.__

## {% linkable_title Changes and Restarting %}

When you make changes to a dashboard, Dashing and `hapush` will both automatically reload and apply the changes without a need to restart.

Note: The first time you start Dashing, it can take up to a minute for the initial compilation of the pages to occur. You might get a timeout from your browser. If this occurs, be patient and reload. Subsequent reloads will be a lot quicker.

## {% linkable_title Multiple Pages %}

It is possible to have multiple pages within a dashboard. To do this, you can add an arbitary number of gridster divisions (you need at least one).

```html
<div class="gridster"> <!-- Main Panel - PAGE 1 -->
  <some widgets>
</div
<div class="gridster"> <!-- More Stuff - PAGE 2 -->
  <more widgets>
</div
```

The divisions are implicitly numbered from 1 so it is a good idea to comment them. You can then add a widget to switch between pages like so:

```html
<li data-row="1" data-col="1" data-sizex="1" data-sizey="1">
    <div data-id="cpage1" data-view="ChangePage" data-icon="cogs" data-title="Upstairs" data-page="3" data-stagger="false" data-fasttransition="true" data-event-click="onClick"></div>
</li>
```

- ***data-page*** : The name of the page to switch to

## {% linkable_title Multiple Dashboards %}
You can also have multiple dashboards, by simply adding a new .erb file to the dashboards directory and navigating to the dashboards via `http://<IP address>:3030/dashboard-file-name-without-extension`

For example, if you want to deploy multiple devices, you could have one dashboard per room and still only use one hadashboard app installation.
