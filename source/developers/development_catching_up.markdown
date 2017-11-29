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

If it's taking a while to develop your feature, and you want to catch up with what's in the current Home Assistant `dev` branch, you can use `git rebase`. This will pull the latest Home Assistant changes locally, rewind your commits, bring in the latest changes from Home Assistant, and replay all of your commits on top.

```bash
# Run this from your feature branch
$ git fetch upstream dev  # to pull the latest changes into a local dev branch
$ git rebase upstream/dev # to put those changes into your feature branch before your changes
```

If rebase detects conflicts, repeat this process until all changes have been resolved:

1. `git status` shows you the file with the conflict; edit the file and resolve the lines between `<<<< | >>>>`
3. Add the modified file: `git add <file>` or `git add .`
4. Continue rebase: `git rebase --continue`
5. Repeat until you've resolved all conflicts

After rebasing your branch, you will have rewritten history relative to your GitHub fork's branch. When you go to push you will see an error that your history has diverged from the original branch. In order to get your GitHub fork up-to-date with your local branch, you will need to force push, using the following command:

```bash
# Run this from your feature branch
$ git push origin --force
```

Other workflows are covered in detail in the [Github documentation](https://help.github.com/articles/fork-a-repo/). Add an additional `remote` after you clone your fork.

```bash
$ git remote add upstream https://github.com/home-assistant/home-assistant.git
```

Then, `git pull --rebase upstream dev`.

