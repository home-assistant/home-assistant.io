---
title: "Incorrect image for virtualization"
description: "More information on why virtualization image marks the installation as unsupported."
---

## The issue

Your Home Assistant OS installation appears to run in a virtualized environment using
a disk image which is not meant to run in a virtualized environment.
 
Home Assistant OS publishes specific images which support being run on a virtualized
system. These are optimized to run in virtual environments, e.g. have guest tools installed
and para-virtualization drivers enabled.

## The solution

You need to reinstall Home Assistant OS using an image which supports being run
on a virtualized system, [see instructions here](/installation/alternative).
