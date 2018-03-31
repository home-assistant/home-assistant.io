---
layout: page
title: "Handling visibility"
description: "Instructions on how to handle visibility with your component."
date: 2016-07-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

Generally, when creating a new entity for Home Assistant you will want it to be a class that inherits the [homeassistant.helpers.entity.Entity](https://github.com/home-assistant/home-assistant/blob/master/homeassistant/helpers/entity.py) class. If this is done, visibility will be handled for you. 
You can set a suggestion for your entity's visibility by setting the `hidden` property by doing something similar to the following.

```python
self.hidden = True
```

This will SUGGEST that the active frontend hides the entity. This requires that the active frontend support hidden cards (the default frontend does) and that the value of hidden be included in your attributes dictionary (see above). The Entity abstract class will take care of this for you.

Remember: The suggestion set by your component's code will always be overwritten by user settings in the `configuration.yaml` file. This is why you may set hidden to be `False`, but the property may remain `True` (or vice-versa).
