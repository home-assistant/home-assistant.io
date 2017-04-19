---
layout: page
title: "Catching up with Reality"
description: "Update your fork with the latest commit."
date: 2016-07-01 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

If you're taking a while developing your feature and would like to catch up with what's in the current Home Assistant `dev` branch, you can use `git rebase` to do so. This will pull the latest Home Assistant changes locally, rewind your commits, bring in the latest changes from Home Assistant and then replay all of your commits on top.

```bash
# Run this from your feature branch
$ git fetch upstream dev  # to pull the latest changes into a local dev branch
$ git rebase upstream/dev # to put those changes into your feature branch before your changes
```

If rebase detects conflicts, you can repeat the following process until all changes have been resolved:

1. `git status` will show you the file with the conflict.
2. Edit the file and resolving the lines between `<<<< | >>>>`
3. Add the modified file `git add <file>` or `git add .`
4. Continue rebase `git rebase --continue`
5. Repeat until you've resolved all conflicts.

There is other workflows that is covered in detail in the [Github documentation](https://help.github.com/articles/fork-a-repo/). Add an additional `remote` after you clone your fork.

```bash
$ git remote add upstream https://github.com/home-assistant/home-assistant.git
```

and then simply `git pull --rebase upstream dev`.

