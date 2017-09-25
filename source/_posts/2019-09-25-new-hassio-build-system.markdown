---
layout: post
title: "New hass.io build system"
description: "New build system with docker buildargs for hass.io"
date: 2017-09-21 16:00:00 +0100
date_formatted: "September 21, 2017"
author: Pascal Vizeli
comments: true
categories: Technology
---

Since docker 17.05 it support native a dynamic build envorment. That allow to write standard Dockerfiles that run out of the box. That will be replace our own Template Dockerfiles system now. Thanks to [Frenck][frenk] for help to discovery this new build feature.

With hass.io 0.64 and our Hardware image 1.1 we support only the new system for the build on device feature. We update also our build-scripts and replace that with a [builder docker engine][builder]. This builder make a deploing of a hass.io component very easy. Our builder support all basic function. It exsists other builder from community with more function.

Thanks a lot for all the additional feature and things that had grow around hassio from community projects.

# {% linkable_title What will be new %}

For the end user it change only 1 line in his dockerfile to move from our old template engine to new docker buildargs. We allow now to overwrite the default [build options][build-file] inside our tools with `build.json` file inside add-on project.

Old:
```
FROM %%BASE_IMAGE%%
```

New:
```
ARG BUILD_FROM
FROM $BUILD_FROM
```

Use our easy OTA updater in UI to update the hardware OS to version 1.1

[hassio-hardware-image-release]: https://github.com/home-assistant/hassio-build/releases/tag/1.1
[install]: https://home-assistant.io/hassio/installation/
[builder]: https://github.com/home-assistant/hassio-build/tree/master/builder
[frenck]: https://github.com/frenck
[build-file]: https://home-assistant.io/developers/hassio/addon_config/
