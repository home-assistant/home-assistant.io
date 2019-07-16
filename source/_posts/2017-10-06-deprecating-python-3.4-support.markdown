---
title: "Deprecating Python 3.4 support"
description: "Starting release 0.55, Python 3.4 support will be deprecated. Support is planned to be removed at the beginning of 2018."
date: 2017-10-06 0:36 +0000
date_formatted: "October 6, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories: Technology
---

**Update February 16, 2018**:
Home Assistant 0.64 will be the last release to support Python 3.4. Starting with release 0.65, Home Assistant will require a minimum version of Python 3.5.3.

---

Starting with our next release, 0.55, we will deprecate Python 3.4 support. The current plan is to remove support for Python 3.4 at the beginning of 2018.

Python 3.5 was released on September 13th, 2015. It has since then become the default Python installation on the stable releases of Debian, Ubuntu, Raspbian and Hassbian. Our other own operating system, Hass.io, is more advanced and is already running the greatly improved Python 3.6.

The jump to Python 3.5 as a minimum version is driven by the Home Assistant core, which is based on asyncio. Starting with Python 3.5, asyncio got improved support in the language with dedicated keywords `async` and `await`. As this is the proper way of doing async in Python, we're seeing a move by async libraries to either only support the new syntax from the beginning or dropping support for the Python 3.4 approach. Not moving along means an increased maintenance burden as we cannot use the latest releases of our libraries. Next to that it will prevent our users from being able to leverage the bug fixes and performance improvements that come with Python 3.5.

#### Hass.io
If you're running Hass.io, you don't have to do anything. Your system will always stay up to date.

#### Hassbian
If you're running Hassbian it's recommended that you make a backup of your configuration files and restore them on a fresh install. Upgrading an existing installation isn't recommended.

#### Windows
If you're on Windows, you're fine as our minimum version for Windows has been 3.5 for a while now.

#### Other Debian based systems
If you're running a Debian based system, follow [these instructions][dist-upgrade] to upgrade.

[dist-upgrade]: https://linuxconfig.org/raspbian-gnu-linux-upgrade-from-jessie-to-raspbian-stretch-9
