---
title: "Windows Support"
description: "Windows Support"
redirect_from: /ecosystem/appdaemon/windows/
---

AppDaemon runs under windows and has been tested with the official 3.5.2 release of Python. There are a couple of caveats however:

- The `-d` or `--daemonize` option is not supported owing to limitations in the Windows implementation of Python.
- Some internal diagnostics are disabled. This is not user visible but may hamper troubleshooting of internal issues if any crop up

AppDaemon can be installed exactly as per the instructions for every other version using pip3.

## Windows Under the Linux Subsystem

Windows 10 now supports a full Linux bash environment that is capable of running Python. This is essentially an Ubuntu distribution and works extremely well. It is possible to run AppDaemon in exactly the same way as for Linux distributions, and none of the above Windows Caveats apply to this version. This is the recommended way to run AppDaemon in a Windows 10 and later environment.
