---
title: "Quick Bar"
description: "Dialog for quickly accessing entities or running commands."
---

The "Quick Bar" allows you to quickly look up entities or run commands without needing to navigate away from your current view (Similar to the "quick open" feature in VS Code, Chrome Developer Tools, etc).

It can be launched from anywhere in the frontend using [hotkeys](#hotkeys).

<p class='img'>
  <img src='/images/docs/quick-bar/quick-bar-demo.gif' alt='Quick Bar'>
  Quick Bar for accessing entities and running commands
</p>

## Hotkeys

Type these from anywhere (see Notes) in the application to launch the dialog.

| Mode  | Hotkey | Switch Modes
| ------------- | ------------- | ------------- |
| Entity Filter | `e` | Type `>` at start of input to switch to command palette.
| Command Palette| `c` | Remove `>` from start of input to switch to entity filter.

<div class='note'>
  The application must have focus for the hotkey to register. If the dialog doesn't launch, try clicking into an empty part of the main content area of Home Assistant and type it again.
</div>

<div class='note'>
  There is a <a href="https://github.com/home-assistant/frontend/issues/7442">known issue</a> right now where clicking on any links in sidebar will break the shortcuts. For now, you can either click anywhere in the main content area, or type "Esc" or "Shift+Tab" to remove focus from the sidebar. Then shortcuts should work again.
</div>

## Entity Filter

*Hotkey: `e`*

Similar to Developer Tools -> States, but more lightweight and accessible from anywhere in the frontend.

<p class='img'>
  <img src='/images/docs/quick-bar/quick-bar-entity-filter.gif' alt='Quick Bar'>
  Filter for entities in Quick Bar's entity filter mode
</p>

Once launched, start typing your entity id (or ["bits and pieces" of your entity id](#search-by-bits-and-pieces-rather-than-complete-substring)) to get back a filtered list of entities. Clicking on an entity will open the "More Info" dialog for that entity.

This is helpful when, say, you are in the middle of writing an automation and need some quick insight about an entity but don't want to navigate away to Developer Tools.

## Command Palette

*Hotkey: `c`*

Run various commands from anywhere without having to navigate to another view.

<p class='img'>
  <img src='/images/docs/quick-bar/quick-bar-command-mode.gif' alt='Quick Bar'>
  Run commands in Quick Bar's "command palette"
</p>

Currently-supported commands:

| Command  | Action | Examples
| ------------- | ------------- | ------------- |
| "Reload {domain}" | Calls `{domain}.reload` | <ul><li>"Reload Scripts" calls `script.reload`</li><li>"Reload Scenes" calls `scene.reload`</li><li>etc...</li></ul> |

## Disabling Shortcuts

You can enable or disable all of Home Assistant's keyboard shortcuts by going to your User Profile and clicking the "Keyboard Shortcuts" toggle button.

<p class='img'>
  <img src='/images/docs/quick-bar/disable-shortcuts-toggle.png' alt='Toggle for enabling or disabling keyboard shortcuts'>
  Toggle button for enabling/disabling keyboard shortcuts added by Home Assistant.
</p>

## Tips

### Search by "bits and pieces" rather than complete substring

In Developer Tools -> States, if you're trying to find "light.chandelier" you would have to type out a complete, exact substring to match it (e.g., "light.cha" or "chandel").

But the Quick Bar checks *each letter* of your filter, finding entities that contain those letters, _in that order_. So, you can instead use "bits and pieces" of the entity id to narrow down matches more quickly (e.g., "ligcha", "ltlier", or "ltcdl").

This is similar to many modern developer-based applications like Sublime, VSCode, Chrome Developer Tools and GitHub file search do "quick file filter" searches.

This can be really helpful when you have LOTS of entities with the same substring (e.g., "\*.living_room_\*"), but you only care about a particular _domain_. For example, rather than type out "media_player.living_" to narrow down media players in your living room, you can just type, say, "med.livroom" and get back the same set with less typing.

## Troubleshooting

### Dialog doesn't launch using hotkeys

There are a few possible reasons why the quick bar dialog won't launch:

1. You are not an admin user. This is an admin-only feature.
2. The application lost focus. Click into the main content area of the application.
3. You have disabled Keyboard Shortcuts in your User Profile settings.
4. Some other application or browser extension is using or overriding the shortcut. Try disabling the extension.

### A command is missing

The command list only shows commands that are available to you based on your user settings, and loaded integrations.

For example, if you don't have `automations:` in your config, then you won't see the "Reload Automations" command.

If "Advanced Mode" is turned off in User Settings, then any command related to advanced mode will not appear in the list.

If a command is missing that you feel is in error, please create an issue on github.

### Shortcuts interfere with accessibility tools, browser extensions, or are otherwise annoying

You can [disable shortcuts](#disabling-shortcuts) in your User settings.

Please consider submitting an issue explaining why the shortcut was disruptive to you. Keyboard shortcuts are new to Home Assistant, and getting them right is a challenge for any Web application. We rely on user feedback to ensure the experience is minimally-disruptive.
