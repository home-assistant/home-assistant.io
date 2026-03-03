---
title: "IoT Data Exploration with Jupyter Notebooks"
description: "Tutorial how to get started exploring your data using Jupyter Notebooks, Pandas and Matplotlib."
date: 2016-07-23 18:00:00 +0000
date_formatted: "July 23, 2016"
author: Anton Kireyeu
categories: How-To IoT-Data
og_image: /images/blog/2016-07-data-exploration/graph.png
---

_This is the first blog post by Anton Kireyeu. A new contributor to Home Assistant who will focus on exploring and visualizing Home Assistant data._

As we learned in the recent [blog post by Fabian], all operational data of your Home Assistant application is stored locally and is available for exploration. Our first steps were querying data with the [DB Browser for SQLite], exporting the data extract as a CSV file and graphing in LibreOffice. But what else can be done with this data and what tools are there available?

This post will help you get set up using a few popular data scientist tools to allow you to locally process your data:

 - &nbsp;[Pandas]: an open source tool for data analysis for Python
 - &nbsp;[matplotlib]: a Python plotting library
 - &nbsp;[Jupyter notebook]: application for creation and sharing of documents containing live code, visualizations and explanatory text

<p class='img'>
<img src='/images/blog/2016-07-data-exploration/graph.png'>
One of the graphs created with this tutorial.
</p>

_TL; DR: Use [this Jupyter Notebook][nb-prev] to visualize of your data_

[blog post by Fabian]: /blog/2016/07/19/visualizing-your-iot-data/
[DB Browser for SQLite]: https://sqlitebrowser.org/
[Pandas]: https://pandas.pydata.org/
[matplotlib]: https://matplotlib.org/
[Jupyter notebook]: https://jupyter.org/
[nb-prev]: https://nbviewer.org/github/home-assistant/home-assistant-notebooks/blob/master/other/DataExploration-1/DataExploration-1.ipynb

<!--more-->

### Dependencies

In order to run the provided Jupyter notebook, please make sure you have the following applications/libraries installed on your computer:

- Pandas
- NumPy
- Matplotlib
- SQLAlchemy
- Jupyter

As a Windows user myself, I find the easiest, quickest and most hassle-free way of installing all of these dependencies is to use [WinPython]. This free open-source portable distribution includes all of the dependencies required for this notebook, as well as a few other essential Python libraries you may require for data exploration in the future.

[WinPython]: https://winpython.github.io/

#### Why Jupyter?

While all Home Assistant implementations can have varying setup, components and scripts, the underlying data structure is standardized and well-defined. This allows us to write Python code that is environmentally agnostic. Wrapping it in a Jupyter notebook ensures the code, visualizations and directions/explanations are kept digestible and neatly-packaged. One of the amazing features of Jupyter is the ability to change code as you go along, customizing all outputs and visualizations on the fly!

#### Where do I start?

This tutorial is based around a heavily commented Jupyter Notebook that we created. So to get started, you will have to open that:

 - [download the tutorial Jupyter Notebook][nb-prev] (leads to preview page, from there click download top-right)
 - launch the Jupyter Notebook App
 - Click the 'upload' button to add the downloaded notebook to Jupyter
 - Adjust the `DB_URL` at the beginning of the notebook to point at your Home Assistant database
 - Select in top menu: Cell -> Run All

That’s it! The included code will walk you through importing the required libraries, show running raw SQL against your local database, plotting basic data from the states table, and in the end output a few plots of changes for every entity in your system as well as the mean daily value for the past 20 days.

After just those few steps, you will be greeted with beautiful formatted data like this:

<p class='img'>
<img src='/images/blog/2016-07-data-exploration/graph.png'>
One of the graphs created with this tutorial.
</p>

#### What’s next?

Thanks to the magic of Jupyter, all of the code is customizable: want to selectively display your data, only covering a specific entity? Sure thing! Want to change the properties of the plots? No problem!

While you learn and explore your IoT data, we will be working on providing more ready-to-use Jupyter Notebooks. Feel free to ask questions or provide suggestions. Would you like to see a specific visualization? Is there a particular facet of data you’re interested in? Let’s talk about it, let’s dive into the world of data together!
