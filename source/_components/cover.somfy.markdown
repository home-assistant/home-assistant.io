---
layout: page
title: "Somfy Cover"
description: "Instructions on how to integrate Somfy covers into Home Assistant."
date: 2019-01-02 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: somfy.png
ha_category: Cover
ha_release: 0.95
---

The `somfy` cover platform lets you control covers added to your Tahoma or Connexoon Box in Home Assistant.

Covers will be added automatically. Please refer to the [component](/components/somfy/) configuration on how to setup Somfy.

### Potential duplicate with the Tahoma component
If you use the [tahoma](/component/tahoma) component, you will have to exclude the covers added by this one. Otherwise they will be added twice.

```yaml
# Example configuration.yaml entry
tahoma:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  exclude: ['rts:RollerShutterRTSComponent','rts:CurtainRTSComponent','rts:BlindRTSComponent','rts:VenetianBlindRTSComponent','rts:DualCurtainRTSComponent','rts:ExteriorVenetianBlindRTSComponent','io:ExteriorVenetianBlindIOComponent','io:RollerShutterUnoIOComponent','io:RollerShutterWithLowSpeedManagementIOComponent','io:RollerShutterVeluxIOComponent','io:RollerShutterGenericIOComponent','io:WindowOpenerVeluxIOComponent','io:VerticalExteriorAwningIOComponent','io:HorizontalAwningIOComponent']
```
