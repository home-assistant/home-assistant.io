---
layout: page
title: "Website home-assistant.io"
description: "home-assistant.io web presence"
date: 2015-06-17 08:00
sidebar: true
comments: false
sharing: true
footer: true
---

The website you're reading now is the home of Home Assistant: [https://home-assistant.io](https://home-assistant.io). This is the place where we provide documentation and additional details about Home Assistant for end users and developers.

home-assistant.io is built using [Jekyll](http://github.com/mojombo/jekyll). The pages are written in [markdown](http://daringfireball.net/projects/markdown/); to add a page you don't need to know about HTML or the like.

The process for working on the website is no different from working on Home Assistant itself. You work on your change and propose it via a pull request.

To test your changes locally, you need to install the **Ruby** dependencies (gems):

- [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) if you don't have it already.
- Install `bundler`, which is a dependency manager for Ruby: `gem install bundler`
- In your home-assistant.io root directory, run `bundle` to install the gems you need.

Then you can work on the documentation:

- Fork home-assistant.io [git repository](https://github.com/home-assistant/home-assistant.github.io).
- Create/edit/update a page in the directory `source/_components/` for your platform/component.
- Test your changes to home-assistant.io locally: run ``rake preview`` and navigate to [http://127.0.0.1:4000](http://127.0.0.1:4000)
- Create a Pull Request (PR) against the **next** branch of home-assistant.io if your documentation is for a new feature, platform, or component.
- Create a Pull Request (PR) against the **current** branch of home-assistant.io if you fix stuff, create Cookbook entries, or expand existing documentation.

For a platform page, the fastest way is to make a copy of an existing page and edit it. The [component overview](/components/) is generated automatically, so there is no need to add a link to your page.

### {% linkable_title Embedding Code %}

You can use the default markdown syntax to generate syntax highlighted code. For inline code wrap your code in \`. For multi line syntax wrap your code like this:

```text
\`\`\`yaml
sensor:
  platform: template
\`\`\`
```

Note that you can replace `text` next to \`\`\` with the language that is within the block.

When you're writing code that is to be executed on the terminal, prefix it with `$`.

### {% linkable_title Images, icons, and logos %}

The images which are displayed on the pages are stored in various directories according to their purpose.

| Type         | Location                                      |
| :----------- |:----------------------------------------------|
| screenshots  | source/images/screenshots                     |
| logos        | source/images/supported_brands                |

Not everything (product, component, etc.) has a logo. To show something for internal parts of Home Assistant we are using the [Material Design Icons](https://materialdesignicons.com/).
