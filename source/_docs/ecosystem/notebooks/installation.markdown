---
title: "Installation"
description: "Setup and first steps for Jupyter Notebooks and Home Assistant."
redirect_from: /ecosystem/notebooks/installation/
---

To run Jupyter Notebooks locally, an installation of [Jupyter](http://jupyter.org/) is needed. Consider running Jupyter in a [virtualenv](/docs/installation/virtualenv/) in order to properly manage dependencies.

```bash
$ pip3 install jupyter matplotlib
```

<div class='note warning'>

Certain notebooks hosted in the [Home Assistant notebooks repository](https://github.com/home-assistant/home-assistant-notebooks) require access to a running Home Assistant instance or parts of a Home Assistant installation. If you want to run those notebooks, install Home Assistant with `$ pip3 install homeassistant` as well.

</div>

Run Jupyter from the command line.

```bash
$ jupyter notebook
[I 17:22:18.081 NotebookApp] Writing notebook server cookie secret to /run/user/1000/jupyter/notebook_cookie_secret
[I 17:22:18.921 NotebookApp] Serving notebooks from local directory: /home/fabaff/home-assistant
[I 17:22:18.921 NotebookApp] 0 active kernels 
[I 17:22:18.921 NotebookApp] The Jupyter Notebook is running at: http://localhost:8888/
[I 17:22:18.922 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
```

Open `http://localhost:8888/` in your browser. Press "New" -> "Python3" to open a new notebook.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/jupyter-new.png' />
</p>

You will get an empty notebook with one cell. Cells can contain code or text. To get the output of a cell you need to execute them with "Cell" -> "Run Cells" from the menu or by pressing the Play icon. 

<p class='img'>
  <img src='{{site_root}}/images/screenshots/jupyter-notebook.png' />
</p>

The downloadable version of this notebook is available in the [Home Assistant notebooks repository](https://github.com/home-assistant/home-assistant-notebooks/blob/master/other/first-notebook.ipynb).


As you can see is the Jupyter notebook workflow is very similar to working directly with a Python shell. One advantage of notebooks is that you can go back and forth between cells as you please and save your work.
