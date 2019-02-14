---
layout: page
title: "Check Home Assistant configuration"
description: "Check your current Home Assistant configuration against a new version."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

You can use this add-on to check whether your configuration files are valid against the new version of Home Assistant before you actually update your Home Assistant installation. This add-on will help you avoid errors due to breaking changes, resulting in a smooth update.

### {% linkable_title How to use this add-on %} 

1. Just start the add-on.
2. Wait (On a Raspberry Pi it can take several minutes).
3. If you see the following output then you are good to go to update Home Assistant: `[Info] Configuration check finished - no error found! :)`.

If you get errors, then you should look for **Breaking Changes** against the version you specified for this add-on and change your configuration accordingly.

### {% linkable_title Add-on configuration %}

```json
{
  "version": "latest"
}
```

{% configuration %}
version:
  description: Version of Home Assistant that you plan to install.
  required: true
  type: string
{% endconfiguration %}
