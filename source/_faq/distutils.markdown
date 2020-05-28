---
title: "distutils.errors.DistutilsOptionError"
description: "distutils.errors.DistutilsOptionError: must supply either home or prefix/exec-prefix -- not both"
ha_category: Installation
---

The problem which leads to `distutils.errors.DistutilsOptionError: must supply either home or prefix/exec-prefix -- not both` is a known issue if you're on a Mac using Homebrew to install Python. Please follow [these instructions](https://github.com/Homebrew/brew/blob/master/docs/Homebrew-and-Python.md#note-on-pip-install---user) to resolve it.
