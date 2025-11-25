---
title: "Release notes for January 24, 2015"
description: "The release notes for January 24, 2015"
date: 2015-01-24 18:36 0000
date_formatted: "January 24, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

I have just merged the latest version of the development branch into master. Here are some of the highlights of this release:

**Configuration via the frontend**<br>
Phliips Hue will now be auto discovered and uses the new `configurator` component to interact with the user to finish the setup process.

**Wink Hub support**<br>
Thanks to the work done by John McLaughlin and Geoff Norton we now support the lights, switches and sensors that are connected to the Wink hub.

**The getting started guide and component page have been reorganized**<br>
The getting started instructions have been split into separate pages per component and a general overview page. The goal is to have a page per component that describes:

- What it does
- How to set it up
- Which states it maintains
- Which services it provides
- Additional development tips

**More reasonable errors**<br>
Home Assistant should now throw better errors and offer solutions if you do not have the right version of Python 3, forgot to clone the git submodules or install the dependencies.

**Streamlined first launch**<br>
Home Assistant now supports `--open-ui` and `--demo-mode` command line properties to open the browser automatically and have something to show. Home Assistant now supports to be run without a password, allowing the interface to login automatically on launch.
