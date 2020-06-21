---
title: "Perform actions based on input select"
description: "Example playing media to Chromecast based on input select element"
ha_category: Automation Examples
---

This example uses an [`input_select`](/integrations/input_select/) element to pick which mp3 file to play on a [Chromecast](/integrations/cast/).

```yaml
# Define our dropdown list
input_select:
  lullaby:
    name: Lullaby
    options:
      - Rain
      - Babbling Brook
      - None
    initial: None
    icon: mdi:weather-rainy

# Define our media player
media_player:
    - platform: cast
      host: chromecast-nursery
      name: Nursery

automation:
  # If you select "Rain", play the "rain.mp3" file
  - alias: Play Rain Lullaby

    trigger:
      platform: state
      entity_id: input_select.lullaby
      to: "Rain"

    action:
      service: media_player.play_media
      data:
        entity_id: media_player.nursery
        media_content_id: http://fileserver/rain.mp3
        media_content_type: music


  # If you select "Babbling Brook", play the "babbling_brook.mp3" file
  - alias: Play Babbling Brook Lullaby

    trigger:
      platform: state
      entity_id: input_select.lullaby
      to: "Babbling Brook"

    action:
      service: media_player.play_media
      data:
        entity_id: media_player.nursery
        media_content_id: http://fileserver/babbling_brook.mp3
        media_content_type: music

  # If you select "None, turn the Chromecast off
  - alias: Stop the Lullaby

    trigger:
      platform: state
      entity_id: input_select.lullaby
      to: "None"

    action:
      service: media_player.turn_off
      data:
        entity_id: media_player.nursery
```
A little bit more complex example that uses [`input_select`](/integrations/input_select/) and template to decide what to play, and which [Chromecast](/integrations/cast/) to play on.

```yaml
input_select:
  radio_station:
    name: Radio Station
    options:
      - Z88.3
      - Virgin
      - RMC
      - rmcHQ
      - 105
      - None
    initial: None
    icon: mdi:radio
  radio_player:
    name: Radio Player
    options:
      - Mansarda
      - Doccia
      - Bed
      - Bath
      - Salotto
      - Salotto Video
      - None
    initial: None
    icon: mdi:airplay

automation:
  - alias: Stop Streaming Radio
    trigger:
      - platform: state
        entity_id: input_select.radio_station
        to: "None"
    action:
      service: media_player.turn_off
      data_template:
        entity_id: >{% raw %}
            {% if is_state("input_select.radio_player", "Mansarda") %}{% endraw %}
              media_player.bed_2{% raw %}
            {%-elif is_state("input_select.radio_player", "Doccia") %}{% endraw %}
              media_player.bed_3{% raw %}
            {%-elif is_state("input_select.radio_player", "Bed") %}{% endraw %}
              media_player.bed{% raw %}
            {%-elif is_state("input_select.radio_player", "Bath") %}{% endraw %}
              media_player.bath{% raw %}
            {%-elif is_state("input_select.radio_player", "Salotto") %}{% endraw %}
              media_player.salotto{% raw %}
            {%-elif is_state("input_select.radio_player", "Salotto Video") %}{% endraw %}
              media_player.salotto_video{% raw %}
            {% else %}{% endraw %}
              none{% raw %}
            {% endif %}{% endraw %}

  - alias: Stream Radio - Template
    trigger:
      - platform: state
        entity_id: input_select.radio_station
    action:
      - service: media_player.play_media
        data_template:
          entity_id: >{% raw %}
            {% if is_state("input_select.radio_player", "Mansarda") %}{% endraw %}
              media_player.bed_2{% raw %}
            {%-elif is_state("input_select.radio_player", "Doccia") %}{% endraw %}
              media_player.bed_3{% raw %}
            {%-elif is_state("input_select.radio_player", "Bed") %}{% endraw %}
              media_player.bed{% raw %}
            {%-elif is_state("input_select.radio_player", "Bath") %}{% endraw %}
              media_player.bath{% raw %}
            {%-elif is_state("input_select.radio_player", "Salotto") %}{% endraw %}
              media_player.salotto{% raw %}
            {%-elif is_state("input_select.radio_player", "Salotto Video") %}{% endraw %}
              media_player.salotto_video{% raw %}
            {% else %}{% endraw %}
              none{% raw %}
            {% endif %}{% endraw %}
          media_content_id: >{% raw %}
            {% if is_state("input_select.radio_station", "Z88.3") %}{% endraw %}
              http://ice.zradio.org/z/high.mp3{% raw %}
            {%-elif is_state("input_select.radio_station", "Virgin") %}{% endraw %}
              http://icecast.unitedradio.it/Virgin.mp3{% raw %}
            {%-elif is_state("input_select.radio_station", "RMC") %}{% endraw %}
              http://icecast.unitedradio.it/RMC.mp3{% raw %}
            {%-elif is_state("input_select.radio_station", "rmcHQ") %}{% endraw %}
              http://icecast.unitedradio.it/rmcHQ.mp3{% raw %}
            {%-elif is_state("input_select.radio_station", "105") %}{% endraw %}
              http://icecast.unitedradio.it/Radio105.mp3{% raw %}
            {% else %}{% endraw %}
              none{% raw %}
            {% endif %}{% endraw %}
          media_content_type: 'music'
```
