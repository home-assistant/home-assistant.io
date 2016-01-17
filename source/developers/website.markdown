---
layout: page
title: "Website home-assistant.io"
description: "home-assistant.io web presence"
date: 2015-06-17 08:00
sidebar: false
comments: false
sharing: true
footer: true
---

The home of Home Assistant is [https://home-assistant.io](https://home-assistant.io). This is the place where we provide documentation and additional details about Home Assistant for end users and developers. 

home-assistant.io is using [Octopress](http://octopress.org/). To get more details, please checkout the [documentation](http://octopress.org/docs/). That means that creating a new page is simple. The pages are written in [markdown](http://daringfireball.net/projects/markdown/), you don't need to care about HTML or alike.

To work on the website the process is no different to working on Home Assistant itself.

- Fork the home-assistant.io [git repository](https://github.com/balloob/home-assistant.io).
- Create/edit/update a page in the directory `source/_components/` for your platform/component. 
- To test changes to home-assistant.io locally, run ``rake preview`` and navigate to http://127.0.0.1:4000.
- Create a Pull Request (PR) against the **next** branch of home-assistant.io.

For a platform page it would be the fastest way to make a copy of an existing page and edit it. The [component overview](/components/) is generated automatically, so there is no need to add a link to that your page.

### {% linkable_title Code %}
To take advantage of the build-in features of Octopress to display code snipplets, just use the default markdown syntax. Please use `$` and `#` if it's a command and to differ from output.

```bash
Here goes the code...
```

If you want to display line numbers, add the following snipplets somewhere on your page. 

```
{::options coderay_line_numbers="table" /}
```

### {% linkable_title Images, icons, and logos %}
The images which are displayed on the pages are stored in various directories according their purpose. 

| Type         | Location                                      |
| :----------- |:----------------------------------------------|
| screen shots | source/images/screenshots                     |
| logos        | source/images/supported_brands                |

Not everything (product, component, etc.) has a logo, to show something for internal parts of Home Assistant we are using the [Material Design Icons](https://materialdesignicons.com/). 

