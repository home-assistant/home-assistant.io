---
layout: page
title: "MoloHub"
description: "Instructions on how to setup Molo hub within Home Assistant."
date: 2018-08-21 20:47
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Hub
ha_release: 0.12
---

The `MoloHub` component aims to simplify users to remotely access the local HA control network. As far as we know, Home Assistant runs under the LAN, if you want to access the HA remotely through the WAN, the router under the network where the HA deployment environment is located must supports port mapping, and needs to be directly accessible on the public network after mapping. And generally DDNS is also needed to solve problem with IP changing. But due to the network provider's The complexity of the network environment, and the complexity of the user's own internet environment, it is difficult to systematically summarize a set of general and effective methods to achieve the target. The above technology is more complicated to implement, and the threshold for ordinary users is higher. 

## {% linkable_title Setup %}

To enable the `MoloHub` component in Home Assistant, add the following to your configuration file:

```yaml
# Example for MoloHub setup
molohub:
```

## {% linkable_title Remote Access %}

After Home Assistant has started, you need to authorize the component with a platform before access Home Assistant remotely:

1. Open the Home Assistant frontend.  A new card will display the supported platform to connect
2. Choose one platform, and input your user and password, if both of them are correct. The component card will display the simple information of your account,  But except wechat,  In this case,  you need use WeChat app's `Scan QR Code`  function
3. Visit `MoloHub` homepage [www.molo.cn](http://www.molo.cn/)
4. Click on `Go to HomeAssistant Console` to access the HA homepage remotely 
