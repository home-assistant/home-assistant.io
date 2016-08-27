---
layout: page
title: "Emulated Hue Bridge"
description: "Emulated Hue Bridge"
sidebar: true
comments: false
sharing: true
footer: true
---

The `emulated_hue` component provides a virtual Philips Hue bridge, written entirely in software,
that allows services that work with the Hue API to interact with Home Assistant
entities. The driving use case behind this functionality is to allow Home
Assistant to work with an Amazon Echo with no set up cost outside of
configuration changes.

To enable the emulated Hue bridge, add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
emulated_hue:
  host_ip: 192.168.1.186
  listen_port: 8300
  off_maps_to_on_domains:
    - script
    - scene
  expose_by_default: true
  exposed_domains:
    - light

# Example customization
homeassistant:
  customize:
    light.bedroom_light:
      # Don't allow light.bedroom_light to be controlled by the
      # emulated Hue bridge
      emulated_hue: false
    light.office_light:
      # Address light.office_light as "back office light"
      emulated_hue_name: "back office light"
```

Configuration variables:

- **host_ip** (*Optional*): The IP address that your Home Assistant installation is
  running on. If you do not specify this option, the component will attempt to
  determine the IP address on its own.

- **listen_port** (*Optional*): The port the Hue bridge API web server will run on. If
  not specified, this defaults to 8300. This can be any free port on your system.

- **off_maps_to_on_domains** (*Optional*): The domains that maps an "off" command to
  an "on" command.
  
  For example, if `script` is included in the list, and you
  ask Alexa to "turn off the *water plants* script," the command will be handled
  as if you asked her to turn on the script.
  
  If not specified, this defaults to the following list:
  
  - `script`
  - `scene`

- **expose_by_default** (*Optional*): Whether or not entities should be exposed via the
  bridge by default instead of explicitly (see the 'echo' attribute later on).
  If not specified, this defaults to true.

- **exposed_domains** (*Optional*): The domains that are exposed by default if
  `expose_by_default` is set to true. If not specified, this defaults to the
  following list:

  - `switch`
  - `light`
  - `group`
  - `input_boolean`
  - `media_player`

The following are attributes that can be applied in the `customize` section:

- **emulated_hue** (*Optional*): Whether or not the entity should be
  exposed by the emulated Hue bridge. The default value for this attribute is controlled
  by the `expose_by_default` option.

- **emulated_hue_name** (*Optional*): The name that the emulated Hue will use.
  The default for this is the entity's friendly name.

### {% linkable_title License %}

Much of this code is based on work done by Bruce Locke on his [ha-local-echo](https://github.com/blocke/ha-local-echo)
project, originally released under the MIT License. The license is reproduced below:

The MIT License (MIT)

Copyright (c) 2016 Bruce Locke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
