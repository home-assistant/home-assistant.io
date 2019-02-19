---
layout: page
title: "BOM Radar Loop"
description: "Instructions for integrating bomradarloop within Home Assistant"
date: 2019-02-18 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
logo: home-assistant.png
ha_release: 0.88
ha_iot_class: "depends"
---

The `bomraradarloop` platform uses the Australian Bureau of Meteorology radar web service as a source to generate an animated radar image using the camera component.

## {% linkable_title Configuration %}

To enable `bomradarloop` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: bomradarloop
    location: yourlocation
```

See below for a list of valid `location` values, and subsitute one for `yourlocation`.

{% configuration %}
location:
  description: Required unless `id` is specified (see below for notes and a list of valid locations).
  required: true
  type: string
name:
  description: Allows you to override the Home Assistant-generated name of the camera.
  required: false
  type: string
id:
  description: Allows you to manually specify a BOM Radar ID (`location` _or_ `id` may be defined -- not both).
  required: false
  type: integer
delta:
  description: Time in seconds between adjacent frames in the animated GIF. Optional if `location` is defined; required if `id` is defined.
  required: false
  type: integer
frames:
  description: Number of frames in the animated GIF. Optional if `location` is defined; required if `id` is defined.
  required: false
  type: integer
filename:
  description: Periodically save the animated GIF image to this filesystem path.
  required: false
  type: string
{% endconfiguration %}

### {% linkable_title Valid `location` values %}

Here are the valid radar `location` names.

```yaml
Adelaide
Albany
AliceSprings
Bairnsdale
Bowen
Brisbane
Broome
Cairns
Canberra
Carnarvon
Ceduna
Dampier
Darwin
Emerald
Esperance
Geraldton
Giles
Gladstone
Gove
Grafton
Gympie
HallsCreek
Hobart
Kalgoorlie
Katherine
Learmonth
Longreach
Mackay
Marburg
Melbourne
Mildura
Moree
MorningtonIs
MountIsa
MtGambier
Namoi
Newcastle
Newdegate
NorfolkIs
NWTasmania
Perth
PortHedland
SellicksHill
SouthDoodlakine
Sydney
Townsville
WaggaWagga
Warrego
Warruwi
Watheroo
Weipa
WillisIs
Wollongong
Woomera
Wyndham
Yarrawonga
```

## {% linkable_title Examples %}

### {% linkable_title Using `location` and `name` %}

Example `configuration.yaml` entry to display the `Townsville` radar with a camera named `mytowsvilleradar`:

```yaml
camera:
  - platform: bomradarloop
    name: mytownsvilleradar
    location: Townsville
```

### {% linkable_title Using `id`, `delta` and `frames` %}

In the event BOM creates a new radar, or a radar's ID changes, you may define a custom `id` along with corresponding `delta` and `frames` values. You may also specify custom `delta` and `frames` values, along with a valid `location`, to override the default values for an existing radar. NOTE: You cannot define `location` and `id` in the same entity; you must specify one or the other. If 'id' is specified, 'delta' and 'frames' values _must_ be provided. If 'location' is specified, 'delta' and 'frames' _may_ be provided to override the default values.

To find a live radar ID (e.g. for the `Townsville` radar), visit the BOM website's page for the radar in your browser and note the URL: `http://www.bom.gov.au/products/IDR733.loop.shtml`. The ID is the number following `IDR` (i.e. `733`) in the URL. You can also see, at the bottom of the radar image, a rotating set of times corresponding to the frames of the BOM's Javascript-driven animation. The number of minutes (in seconds) between these times corresponds to the `bomradarloop`'s `delta` value, and the number of frames corresponds to `frames`. At the time of writing, the `Townsville` radar loop is composed of 4 frames at 10-minute (600 second) intervals. Since these are also the default values, this configuration block

```yaml
camera:
  - platform: bomradarloop
    location: Townsville
```

means the same as this one

```yaml
camera:
  - platform: bomradarloop
    id: 733
    frames: 4
    delta: 600
```

### {% linkable_title Using `filename` %}

This option can be specified to generate an animated GIF file of the radar imagery and save it to the given filesystem path.

Example `configuration.yaml` entry to display the `Sydney` radar and save the animated GIF to a file named `sydneyradar.gif` to the filesystem path accessible as `/local/sydneyradar.gif` via Home Assistant's web server:

```yaml
camera:
  - platform: bomradarloop
    id: Sydney
    filename: /config/www/bomradar/sydneyradar.gif
```
