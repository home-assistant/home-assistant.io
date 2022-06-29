---
title: "Introducing Home Assistant CLI aka. hass-cli"
description: "Interact with Home Assistant on a new level"
date: 2019-02-04 00:01:00
date_formatted: "February 4, 2018"
author: Max Rydahl Andersen
author_twitter: maxandersen
categories: Announcements
---

When I started using Home Assistant (HA) I was missing a way to interact with HA via a command
line (CLI). A CLI allows you to utilize the power of auto-completion, scripting and direct access.

Thus I started working on [Home Assistant CLI][github-hass-cli], a project that
was initially started by [Fabian Affolter][@fabaff].

The great thing about `hass-cli` is that it uses the exact same API's as the other UI's and integration uses thus it makes a great complement to the Home Assistant family of tools.

Last week we released version 0.4, which provides majority of the features I was
looking for to do from a CLI.

## Feature highlights:

   - Get configuration info (`hass-cli config`)
   - List, get, edit and delete state for entities (`hass-cli entity`')
   - Query history with relative time ('hass-cli entity history')
   - List and run services (`hass-cli services`)
   - Execute templates locally and remotely (`hass-cli template`)
   - Control over columns, sorting, etc. (`hass-cli --columns attr1,attr2 --sort-by attr3`)
   - Shell completion for most commands and arguments (`hass-cli completion zsh`)
   - Get logs (`hass-cli system log`)
   - Run discovery (`hass-cli discover`)
   - Show map for zone (`hass-cli map`)
   - Call raw api directly (`hass-cli raw`)
   - ... and more

## Usage

For the basic intro to `hass-cli` see the docs at [github][github-hass-cli].

## Installation

Install latest `homeassistant-cli` by pip:

    $ pip3 install homeassistant-cli

or if upgrade use:

    $ pip3 install --upgrade homeassistant-cli

or if you like an isolated install you can use [pipsi][pipsi]

    $ pipsi install --python python3 homeassistant-cli

or if you are adventurous you can build it from [source][github-hass-cli] at.

## Changes since 0.1-0.3

The first thing is that the commands have been cleaned up to be more logcial/explicit.

    $ hass-cli
    ...
    ...
    Commands:
    completion  Output shell completion code for the specified shell (bash or...
    config      Get configuration from a Home Assistant instance.
    discover    Discovery for the local network.
    entity      Get info and operate on entities from Home Assistant.
    event       Interact with events.
    info        Get basic info from Home Assistant.
    map         Print the current location on a map.
    raw         Call the raw API (advanced).
    service     Call and work with services.
    system      System details and operations for Home Assistant.
    template    Render templates on server or locally.

Rather than using generic terms (eg. get, list), the commands are now explicit
and have further sub-commands.

The biggest change is that most operations, by default now use
"table" mode. i.e., instead of getting a yaml or json dump you get a more concise view:

    $ hass-cli entity list winter
    ENTITY                           DESCRIPTION                STATE    
    timer.timer_winter_garden                                   idle     
    group.winter_garden_lights       Winter Garden Lights       off      
    group.winter_garden_motionview   winter garden              off      
    light.winter_garden_light_2      Winter Garden Light 2      off      
    light.winter_garden_light_5      Winter Garden Light 5      off      
    light.winter_garden_light_1      Winter Garden Light 1      off      
    light.winter_garden_light_3      Winter Garden Light 3      off      
    light.winter_garden_light_4      Winter Garden Light 4      off      
    media_player.winter_garden       Winter Garden              paused   
    sensor.lightlevel_winter_garden  Winter Garden Motion       1.0      
    sensor.temperature_winter_garden Winter Garden Temperature  5.0      

On top of better tables you can also use `--sort-by` to sort by an attribute and you can use `--columns` to control which attributes to show.

You can combine it all and do history querying with things like:

    $ hass-cli --sort-by last_changed entity history \
      --since 50m  light.kitchen_light_1 binary_sensor.presence_kitchen
    ENTITY                          DESCRIPTION      STATE
    binary_sensor.presence_kitchen  Kitchen Motion   off
    light.kitchen_light_1           Kitchen Light 1  on
    binary_sensor.presence_kitchen  Kitchen Motion   on
    binary_sensor.presence_kitchen  Kitchen Motion   off
    light.kitchen_light_1           Kitchen Light 1  off

If you still want to get all the glory details you can use `-o yaml` to get the full details.

## Frequently Asked Questions

A few frequent asked questions we've seen the last months are as follows:

### Why would anyone use this ?

This is not removing or trying to compete with existing ways to access Home
Assistant - this is a complementary way to access Home Assistant. If you like to
use CLI's and its power of auto-completion you'll find `hass-cli` to be awesome;
if not and you prefer the browser UI you just continue using it. We still use it
for normal interactions, but when we want to be fast or script things `hass-cli`
is great.

### Why not just use the REST API's directly via curl or similar ?

You can most definitely use `curl` or similar to access REST API directly - it's
basically what `hass-cli` does behind the scenes. `hass-cli` give though a few
advantages. Firstly that you do not need to remember the exact commands,
`hass-cli` have contextual help and auto completion to make it super easy to
type out. Finally over time as `hass-cli` will get support for utilizing the
more extensive websocket API's `hass-cli` will be more consistent and simpler to
use than using "raw" access via `curl`.

### Does this only work with HTTPS and hass.io ?

No, it works with *any* Home Assistant that has REST API exposed - something
that is done by default. In short - if you can access Home Assistant with your
browser and see the UI `hass-cli` can communicate and control it too.

Thus http, https, hass.io, non-hass.io, etc. are all supported by `hass-cli`

### Do I need to install Home Assistant to use this ?

No, `hass-cli` does not require Home Assistant installed on the computer you
want to run it on. It should run on any install with Python 3.5 or higher on all
major operating systems.

### Does this work with client-generated certificates ?

It should, but we have not yet been able to verify it. If you would like to help
us try it run with `--cert <certificate.pem>` and let us know if it works on
issue [#66][client-cert-git].

## Next steps

Personally the next feature I would like to add is more specific support for
system control commands (like refreshing groups, restarting, etc.) but also for
accessing hass.io add-ons. Also having an easy way to hook into the event bus
(via websocket) to see what is happening live.

What would you like to see ?

## Feedback

If you have questions for feedback you can put a comment on this blog, use the
[hass-cli forum thread][forum-thread-hasscli] or open issues or pull-requests at
[github][github-hass-cli].

Have fun!

[Max Rydahl Andersen][@maxandersen]


[pipsi]: https://github.com/mitsuhiko/pipsi
[github-hass-cli]: https://github.com/home-assistant/home-assistant-cli
[github-hass-issues]: https://github.com/home-assistant/home-assistant-cli/issues
[@fabaff]: https://github.com/fabaff
[forum-thread-hasscli]: https://community.home-assistant.io/t/resurrected-feature-home-assistant-cli/84107
[client-cert-git]: https://github.com/home-assistant/home-assistant-cli/issues/66
[@maxandersen]: https://xam.dk/about
