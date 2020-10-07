---
title: "Quick Open Dialog"
description: "Dialog for quickly accessing entities or running common commands"
---

You can access the "Quick Open Command Bar" dialog (similar to VSCode or Chrome Devtools) from anywhere in Home Assistant using hotkeys.

<p class='img'>
  <img src='/images/docs/quick-open/quick-open-dialog.gif' alt='Quick open dialog'>
  Quick open bar for accessing entities and running commands
</p>

## Hotkeys

| Mode  | Hotkey (Mac) | Hotkey (Win)
| ------------- | ------------- |------------- |
| Entity Filter | Ctrl+P | ⌘+P |
| Command | Ctrl+Shift+P | ⌘+Shift+P |

## Switching Modes

<p class='img'>
  <img src='/images/docs/quick-open/quick-open-switch-modes.gif' alt='Quick open dialog'>
  Switch modes without losing filter text
</p>

When the dialog has already been launched, you can switch to other modes without losing your filter text.

| Current Mode | Action | Switches to Mode |
| ------------- | ------------- | ------------- |
| Entity Filter | Use [hotkey](#hotkeys) (or prepend ">" to input field) | Command
| Command | Use [hotkey](#hotkeys) (or remove ">" from input field) | Entity Filter

## Entity Filter Mode 
*Hotkey: Ctrl+P (or ⌘+P)*

Similar to Developer Tools -> States view, but more lightweight, and accessible from anywhere in the application.

<p class='img'>
  <img src='/images/docs/quick-open/quick-open-entity-filter.gif' alt='Quick open dialog'>
  Filter for entities in quick open dialog's entity filter mode
</p>

Once launched, start typing your entity id (or ["bits and pieces" of your entity id](#search-by-bits-and-pieces-rather-than-complete-substring)) to get back a filtered list of entities.

Clicking on an entity will open the "More Info" dialog for that entity. This is helpful when, say, you are in the middle of writing an automation and need some quick insight about an entity but don't want to navigate away to Developer Tools.

## Command Mode
*Hotkey: Ctrl+Shift+P (or ⌘+Shift+P)*

<p class='img'>
  <img src='/images/docs/quick-open/quick-open-command-bar.gif' alt='Quick open dialog'>
  Run commands in quick open dialog's command mode
</p>

In this mode, you are given a list of commands that can be run without needing to navigate to the appropriate panel in the UI.

Currently-supported commands:

| Command  | Action | Examples
| ------------- | ------------- | ------------- |
| "Reload {domain}" | Calls `{domain}.reload` | <ul><li>"Reload Scripts" calls `script.reload`</li><li>"Reload Scenes" calls `scene.reload`</li><li>etc...</li></ul> |

## Tips

### Search by "bits and pieces" rather than complete substring

In Developer Tools -> States, if you're trying to find "light.chandelier" you would have to type out a complete, exact substring to match it (e.g. "light.cha" or "chandel").

But the Quick Open Dialog checks *each letter* of your filter, finding entities that contain those letters, _in that order_. So, you can instead use "bits and pieces" of the entity id to narrow down matches more quickly (e.g. "ligcha", "ltlier", or "ltcdl").

This is similar to many modern developer-based applications like Sublime, VSCode, Chrome Devtools and GitHub file search do "quick file filter" searches.

This can be really helpful when you have LOTS of entities with the same substring (e.g. "\*.living_room_\*"), but you only care about a particular _domain_. For example, rather than type out "media_player.living_" to narrow down media players in your living room, you can just type, say, "med.livroom" and get back the same set with less typing.