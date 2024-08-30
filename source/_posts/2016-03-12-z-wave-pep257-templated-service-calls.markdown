---
title: "0.15: Unforked Open Z-Wave, templated service calls, extended scene support and PEP257 compliance."
description: "Home Assistant 0.15 has arrived."
date: 2016-03-12 10:55:00 -0800
date_formatted: "March 12, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Two weeks has past so here is 0.15! We have been focussing a lot on quality. Making sure the system is more stable and reliable. I usually try to highlight one cool thing in the release notes but this release has 4 exciting announcements!

 - [@fabaff] has upgraded the codebase to follow the PEP257 documentation standard.
 - [@partofthething] has migrated us to use the main Python Open Z-Wave library instead of our forked version.
 - To make our automations more powerful, [@persandstrom] added the option to use templates to dynamically create service calls. This works for automation, Alexa, universal media player, template switch. [Learn more.][services]
 - [@MartinHjelmare] has upgraded our scene support to now support all built-in services and components.

Besides bug fixes, this release also brings:

<img src='/images/supported_brands/hunter-douglas-powerview.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

 - Scene: Converted to a platform based component ([@sander76])
 - Scene: [Hunter Douglas Powerview] now supported ([@sander76])
 - Lock: [MQTT] platform added ([@fabaff])
 - Device Tracker: [OwnTracks] will allow filtering inaccurate GPS locations ([@HydrelioxGitHub])
 - Binary Sensor: Wemo Motion now supported ([@pavoni], [@ryanlaux])

{% raw %}

```yaml
# Example using templates for service and data in service call.
# Works for automation, Alexa, universal media player, template switch.
automation:
  - trigger:
      - platform: state
        entity_id: switch.bathroom
    action:
      service: >
        {% if is_state('switch.bathroom', 'on') %}
          switch.turn_on
        {% else %}
          switch.turn_off
        {% endif %}
      target:
        entity_id: switch.{{ states('input_select.is') }}
```

{% endraw %}

### Backward-incompatible changes

 - Media Player: Attributes to call service play_media has been renamed to
`media_content_type` and `media_content_id`, to match the corresponding media
player state attributes. This change affects automations, scripts and scenes.

[services]: /docs/scripts/service-calls/#use-templates-to-decide-which-service-to-call
[Hunter Douglas Powerview]: /integrations/hunterdouglas_powerview
[MQTT]: /integrations/lock.mqtt/
[OwnTracks]: /integrations/owntracks
[Wemo Motion]: /integrations/wemo
[@fabaff]: https://github.com/fabaff
[@partofthething]: https://github.com/partofthething
[@persandstrom]: https://github.com/persandstrom
[@fabaff]: https://github.com/fabaff
[@persandstrom]: https://github.com/persandstrom
[@PartOfTheThing]: https://github.com/PartOfTheThing
[@sander76]: https://github.com/sander76
[@sander76]: https://github.com/sander76
[@fabaff]: https://github.com/fabaff
[@HydrelioxGitHub]: https://github.com/HydrelioxGitHub
[@MartinHjelmare]: https://github.com/MartinHjelmare
[@pavoni]: https://github.com/pavoni
[@ryanlaux]: https://github.com/ryanlaux
