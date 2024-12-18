---
title: Keyboard
description: Instructions on how to simulate key presses with Home Assistant.
ha_category:
  - Automation
ha_release: pre 0.7
ha_domain: keyboard
ha_iot_class: Local Push
ha_integration_type: integration
ha_quality_scale: legacy
---

The `keyboard` integration simulates key presses on the host machine. It currently offers the following Buttons as a Service (BaaS):

- `keyboard/volume_up`
- `keyboard/volume_down`
- `keyboard/volume_mute`
- `keyboard/media_play_pause`
- `keyboard/media_next_track`
- `keyboard/media_prev_track`

To load this component, add the following lines to your {% term "`configuration.yaml`" %}:

```yaml
keyboard:
```

## Dependencies

You may need to install platform-specific [dependencies for PyUserInput](https://github.com/PyUserInput/PyUserInput#dependencies) in order to use the keyboard component. In most cases this can be done by running:

```bash
pip3 install [package name]
```

### Windows

x64 Windows users may have trouble installing pywin through pip. Using an [executable installer](https://github.com/mhammond/pywin32) should work around this issue.

[Similar installers](https://www.lfd.uci.edu/~gohlke/pythonlibs/#pyhook) (unofficial) for pyhook have been ported to Python 3.4 and should help with x64 pip issues with pyhook.
