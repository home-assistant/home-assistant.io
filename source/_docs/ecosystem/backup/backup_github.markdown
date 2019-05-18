---
layout: page
title: "Configuration Backup to GitHub"
description: "Instructions on how backup your Home Assistant configuration to GitHub"
date: 2017-01-05 18:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /cookbook/githubbackup/
---

Backing up and regularly syncing your Home Assistant configuration to [GitHub](http://GitHub.com) has several benefits:

- A remote copy of your Home Assistant YAML files in case you need to recover.
- A documented history of your changes for troubleshooting purposes.
- It will help the Home Assistant community learn from your configuration examples.

<p class='note'>
This is not a comprehensive tutorial on using GitHub, more information can be found in the [GitHub Help](https://help.github.com/) pages. This guide assumes the user has an intermediate experience level and is comfortable with such concepts as: navigating the Home Assistant directory structure, logging in as the Home Assistant user, and working with the command line.
</p>

<p class='note'>
This will not create a full backup of your Home Assistant files or your OS. In addition to backing up to Github, you should consider having regular backups of all your Home Assistant configuration files and images of your SD card if applicable.
</p>

### {% linkable_title Important Best Practices %}

Some best practices to consider before putting your configuration on GitHub:

- Extensive use of [`secrets.yaml`](/docs/configuration/secrets/) to hide sensitive information like usernames, passwords, device information, and location.
- Exclusion of some files, including `secrets.yaml` and device-specific information using a [`.gitignore`](https://git-scm.com/docs/gitignore) file.
- Regularly committing your configuration to GitHub to make sure that your backup is up to date.
- Use a README.md to document your configuration and include screenshots of your Home Assistant frontend.

### {% linkable_title Step 1: Installing and Initializing Git %}

In order to put your configuration on GitHub, you must install the Git package on your Home Assistant server (instructions below will work on Raspberry Pi, Ubuntu or any Debian-based system) *Note: this isn't required in Hass.io, it's included as default so proceed to step 2*:

```bash
$ sudo apt-get update
$ sudo apt-get install git
```

### {% linkable_title Step 2: Creating `.gitignore` %}

<p class='note warning'>
Before creating and pushing your Home Assistant configuration to GitHub, please make sure to follow the [`secrets.yaml`](/docs/configuration/secrets/) best practice mentioned above and scrub your configuration for any passwords or sensitive information.
</p>

Creating a `.gitignore` file in your repository will tell Git which files NOT to push to the GitHub server. This should be used to prevent publishing sensitive files to the public. It should contain a list of filenames and pattern matches. This list should include at least your [`secrets.yaml`](/docs/configuration/secrets/) file, device configuration files, and the Home Assistant database/directory structure. The `.gitignore` file should be placed in the root of your Home Assistant configuration directory: `<config dir/.gitignore`.

<p class='note'>
  If you are creating the `.gitignore` file on Windows, make sure that you save the file with Unix line endings (i.e. by using an editor like Notepad++).
</p>

Here is an example that will ignore everything but your YAML configuration.

```bash
# Example .gitignore file for your config dir.
# A * ensures that everything will be ignored.
*

# You can whitelist files/folders with !, these will not be ignored.
!*.yaml
!.gitignore
!*.md

# Ignore folders.
.storage
.cloud
.google.token

# Ensure these YAML files are ignored, otherwise your secret data/credentials will leak.
ip_bans.yaml
secrets.yaml
known_devices.yaml
```

<p class='note'>
  You might read this guide too late and accidentally already have your secrets published. It is not enough to just remove them with a new commit. Git is a version control system and keeps history. You need to delete your repository and start a new one. Also change all passwords and revoke the API keys that were public.
</p>

More information on the layout of the file can be found in the [.gitignore manual](https://git-scm.com/docs/gitignore).

### {% linkable_title Step 3: Preparing your Home Assistant directory for GitHub %}

In your Home Assistant directory, type the following commands as the Home Assistant user, replacing the email address and name with your information:

```bash
$ git init
$ git config user.email "you@example.com"
$ git config user.name "Your Name"
$ git add .
$ git commit
```

After the `git commit` command, you will be asked to enter a message for the commit.  This will add a comment beside each file on GitHub describing the purpose for the commit. In this case, you can enter something like "Initial commit of my Home Assistant configuration". To exit the editor, press `CTRL + C` and then `:wq` which will exit and save the changes. 

### {% linkable_title Step 4: Creating Repository on GitHub %}

- Connect to [GitHub](https://github.com) and login to your account (or create an account if you don't already have one).
- Click "[New Repository](https://github.com/new)" and give your repository a name/description (`Home-AssistantConfig` is used in the example below). You do NOT need to change any other options.
- Click "Create Repository"

### {% linkable_title Step 5: Your initial commit to GitHub %}

Once you are sure you are using `secrets.yaml` and `.gitignore` correctly, it is time to push your configuration to the GitHub Repository that you just created.

In your Home Assistant directory, type the following commands as the Home Assistant user, replacing "username" in the URL with your GitHub username:

```bash
$ git remote add origin https://github.com/username/Home-AssistantConfig
$ git push -u origin master
```

You will be asked to enter your GitHub username and password (or ssh key passphrase if you use [GitHub with ssh](https://help.github.com/categories/ssh/)).

Congratulations, you now have a copy of your current Home Assistant Configuration on GitHub!

### {% linkable_title Step 6: Keeping your repository up to date %}

You should update your repository on a regular basis. Ideally after you make a major configuration change (new device, new component, etc.). The below script will update your repository with any changed configuration files and allow you to add a comment with the commit for tracking purposes:

<p class='note'>
You may need to adjust the paths in the script depending on your Home Assistant configuration.
</p>

`gitupdate.sh`

```bash
#!/bin/bash

cd /home/homeassistant/.homeassistant
source /srv/homeassistant/bin/activate
hass --script check_config

git add .
git status
echo -n "Enter the Description for the Change: " [Minor Update]
read CHANGE_MSG
git commit -m "${CHANGE_MSG}"
git push origin master

exit
```

Every time you run this script, you will be prompted for a comment to describe the change(s) that you are committing. This comment will be displayed beside each changed file on GitHub and will be stored after each commit. You will also be asked to enter your GitHub username and password (or SSH key passphrase if you use [GitHub with SSH](https://help.github.com/categories/ssh/)).

### {% linkable_title Step 7: Configuration file testing %}

[Travis CI](https://travis-ci.org) is a continuous integration testing system that runs every time the code in your repository is updated and allows you to validate that your code works on a fresh install.

- [Authorize Travis CI](https://travis-ci.org/auth) to have access to your GitHub repositories.
- Create the build script that Travis will run to test your repository.
- Create a dummy `secrets.yaml` for Travis.

Example .travis.yml
```yaml
language: python
python:
  - "3.5"
before_install:
  - mv travis_secrets.yaml secrets.yaml
install:
  - pip3 install homeassistant
script:
  - hass -c . --script check_config
```

Since the `secrets.yaml` should _not_ be stored in your repository for security reasons, you won't be able to access it at build time. Creating a dummy `secrets.yaml` is as simple as creating a new file that mimics your existing `secrets.yaml` with the required keys, but not their value.

```yaml
#travis_secrets.yaml
http_api: 000000000000000000000000
home_latitude: 00.00000
home_longitude: 00.0000
home_elevation: 0
```

### {% linkable_title Extra commands %}

You can enter these commands to get a list of the files in your local Git repository and a status of files that have changed but not committed yet:

```bash
$ git ls-files
$ git status
```
Examples:

```bash
homeassistant@raspberrypi:~/.homeassistant $ git ls-files
.gitignore
README.md
automation.yaml
configuration.yaml
customize.yaml
device_tracker.yaml
group.yaml
script.yaml

homeassistant@raspberrypi:~/.homeassistant $ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   .gitignore
        modified:   automation.yaml
        modified:   customize.yaml
        modified:   group.yaml

no changes added to commit (use "git add" and/or "git commit -a")
```
