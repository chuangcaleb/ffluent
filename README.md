<img align="left" width="130" src="./logo/ffluent-v1.svg"/>

# `ffluent`

**CLI to bundle atomic [Fountain](https://www.fountain.io) screenplay files**

 <br />

> I expect the average `ffluent` user to be a non-technical screenwriter, so I'll go slowly in layman terms – this may just be exactly what you need! Do skip forward to parts that are relevant to you.

|**`ffluent` is a tool that automatically combines multiple smaller `.fountain` files.**|
|-|

<!-- Of course, there are simple configurations you obviously need to set, like *organizing sequence of scenes*, and you get to take advantage of other Quality-of-Life bells-and-whistles. -->

## Purpose

### The problem

**[Fountain](https://www.fountain.io)** is the perfect screenwriting tool: it is *a simple **markup syntax** that allows screenplays to be written, edited, and shared in plain, human-readable text*.

<pre style='white-space:pre-wrap'>
EXT. WET MARKET - DAY

The stalls and crowds pack the LABYRINTHIAN plaza like sardines. Merchants periodically CRY their latest bargains aloud.

JOE
(half-shouting)
How are we supposed to find Uncle Ken in here?
</pre>

> tl;dr, [Markup files](https://www.markdownguide.org/getting-started/#why-use-markdown) are **Versatile** + **Portable** + **Robust** + **Future-proof**. [Fountain](https://www.fountain.io) is **non-proprietary** and **[intuitive](https://fountain.io/syntax/)** to use. It is **easily exported** to `.pdf`, `.fdx`, and more.

The only roadblock for me is that you are required by Fountain's workflow design to have your entire script to be in a single `.fountain` file. In practice, a typical 2-hour movie screenplay is about **120 pages long**. What I've noticed was:

- To compare scenes:
  - Random scrolling to arbitrary locations, back and forth
- To swap around chunks of script:
  - Dragging across hundreds-of-lines of text in order to copy-and-paste
- To temporarily stash currently-unused/incompatible scenes that may have potential, or at least to keep as reference:
  - Commenting/boneyard-ing out, or dumping aside, entire sections into another text file, hard to keep track of what is where

This is where `ffluent` comes in.

### The solution

| `ffluent` is an **extension**, a **superset** of the Fountain workflow that is supercharged with *programming principles*.|
|-|

To combat the issues above, we introduce the concept of the [single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle): instead of **one large** entity/file having a hundred roles — *instead, we should have **one hundred smaller** components that have a **single responsibility each**.* This is great, because now each component is **atomic** and **modular**.

However, if all our content is spread out across different `.fountain` files, how are we going to assemble them together? There is solved with the coding practice of using [bundlers](https://snipcart.com/blog/javascript-module-bundler). *Bundlers organize and combine many files of code into one file.*

| **`ffluent` is simply a Command Line Interface (CLI) tool that automatically organizes and combines multiple `.fountain` files into one main `output.fountain` file.**|
|-|

That's the main idea. And it's dead simple to actually implement.

Of course, there are simple configurations you obviously need to set, like organizing *sequence of scenes*, and other Quality-of-Life bells-and-whistles.

<!--
### The benefits

That is, instead of writing everything in one long `.fountain` file, it would save you a lot of time and management effort if you split your screenplay across multiple files. Perhaps one file is dedicated to one scene. Now:

- Each scene can be ***identified** and **evaluated** individually*
  - Then it's clearer to spot errors/weaknesses, or to spot promising scenes for further development
  - Furthermore, since each scene is now a separate file, you can track their metadata separately, like *file size* and *last modified*
- Each scene/section can *easily be **compared***
  - You can compare files size-by-side in a split editor. You can quickly tell when one scene is way longer than another.
- Each scene/section can *trivially be **plug-and-play***
  - With quick simple tweaks to a configuration/layout utility file, you can make big changes to your final product:
    - Exclude/include individual scenes by commenting out lines of text
    - Swap scene order by swapping lines of text
    - Manage different versions of scene sequences
    - And you can do this at whatever level of abstraction you have:

- semantic naming for each component
-->

## Installation

### Pre-requisites

<!-- You will need to understand the following before proceding:

- [Fountain](https://www.markdownguide.org/getting-started/)
  - A simple markup syntax that allows screenplays to be written, edited, and shared in plain, human-readable text
  - `ffluent` completely relies on this. Read their example `.fountain` screenplays to first get fluent in the language!-->

- [Node.js](https://www.freecodecamp.org/news/how-to-install-node-js-and-npm-on-windows-2/)
  - One of the most popular coding "runtime environments"
  - This is what allows you to effortlessly install `ffluent`, get updates and actually run `ffluent`

It is recommended that you use (and get used to) the following tools. You don't need them, but `ffluent` was built to be used with these tools in mind:

- [Visual Studio Code](https://code.visualstudio.com/)
  - A text editor. *THE* text editor. You can use Notepad. But life can be better.
  - Usually used for coding, as for my day job. But it's so versatile.
- [Better Fountain](https://marketplace.visualstudio.com/items?itemName=piersdeseilligny.betterfountain)
  - An extension for Visual Studio Code which supercharges it with features to boost the Fountain screenplays writing experience.

### Quick Start

1. Open [VS Code's integrated terminal](https://code.visualstudio.com/docs/terminal/basics), or a Command Prompt/Terminal app of your choice.

2. Ensure Node.js is installed. Type the following text and enter it:

```sh
node -v
# If Node is installed, you should get a response that looks like this:
# v20.2.0
```

3. Navigate to or create the file directory that you want to use as your workspace.

- In VS Code, just use the `File: Open Folder` command
- In a Terminal, you will need to use the `cd` command

4. Install `ffluent` in your workspace. It will take a moment to download.

```sh
npm install ffluent
```

5. Write some `.fountain` files in your `./src` directory!

<!-- 5. Initialize your workspace with a template (optional, but recommended)

```sh
npm run ffluent init
``` -->
6. Run the bundle command

<!-- TODO: correct npx vs npm run, when ffluent init always ensures a lifecycle script -->
```sh
npx ffluent bundle
```
<!-- Use `npm run bundle` if you have a package.json -->
Advanced, you can bind this to a hotkey with VS Code Tasks.

## Features

### `ffluent bundle` : Combine Fountain files

**Combines together and organizes *source files*, then writes the product to a *destination directory*.**

### `ffluent init` : Initialize project workspace

**Scaffolds the project workspace according to a template.**

WIP. You'll be able to instantly prepare a new project in your workspace with boilerplate files... according to preset templates from a question-and-answer flow!

<!-- TODO: ### The `ffluent` workspace -->

### What `ffluent` isn't/doesn't have — and what you may need

**A substitute for Fountain.**
In fact, it's encouraged that if you only have 5-10 pages of script, just go vanilla and use a long `.fountain` file. But if you want more fine-grained control, you will need to first be fluent in Fountain, before `ffluent` makes any sense. Think of `ffluent` to Fountain as french fries are to raw potatoes.

**A text editor / an application**.
`ffluent` is not concerned how you produce your source files; its sole (single)-responsibility is to bundle them. There are many great text editor applications out there, like [VS Code](https://code.visualstudio.com/).

**An Export to PDF function**.
Again, there are already many great existing "`.fountain` to `.?????`" converters/exporters out there. I'm personally using Better Fountain's as it's part of my workflow. It's on the Roadmap to find some way to "*hook*" onto an external tool automatically as part of the `ffluent` workflow.

**A version control feature**.
Many paid proprietary tools offer version control/backups. As a programmer, we are familiar with `git`, a technical, fine-grained version control tool. But if you're less technical, [Google Drive for Desktop](https://www.google.com/drive/download/) or [Dropbox Backup](https://www.dropbox.com/backup) are amazing non-technical solutions for syncing specific file directories to the cloud.

## Is `ffluent` for you?

**Use `ffluent` if:**

- 🎬 **You are writing a feature-length screenplay**
  - You will definitely be thankful when you're barely halfway at Page 50 with 10k+ words and 100 plot threads to weave
- 🆓 **You are broke. Or cheap. Or both.**
  - Free. Markdown is free. Fountain is free. VS Code is free. Better Fountain is free. `ffluent` is free. You just need to learn ;)
- 🔧 **You have *some* technical programming knowledge/experience**
  - You will need to do some extra readings and step outside of your comfort zone,
- 🛠️ **You have *advanced* technical programming knowledge/experience**
  - The `ffluent` workflow will feel right at home for you, as it does for me
  - You'll be able to take advantage of tools like `git` and `Find and Replace (Regex)`!
  - Plus, what paid software can beat your keybind-supercharged IDE.
- 👥 **You can get help from someone who has technical programming knowledge/experience**
  - Honestly, it's the setup that seems the most daunting. But it's just a few trivial keystrokes for someone who's familiar with code.
  - Read through this whole document together, and get guidance on how to crucial tasks! You'll be a wiz in no time!
- ⛲️ **You already use Fountain**
  - You know all the insane benefits of a markup syntax. You understand the struggle of vanilla Fountain. You are willing to learn something new to take it to the next level.

**Don't use `ffluent` if:**

- 🩳 **You are writing a 2-10 minute short**
  - Just use one `.fountain` file. Anything more is over-engineering
- 💰 **You have money to splurge**
  - Yea, knock yourself out with some big proprietary product's monthly subscription. Seriously, they're paid and industry standard for a reason. Unless you enjoy the writing experience with `ffluent` better. I do.
- 👵 **You've never touched the Terminal prompt in your life**
  - If you have a bad track record with technology, then you may want to give this a pass! I know arts and coding are very uncommon pairings. Try out Google Docs instead of Microsoft Word!

<!-- ### Advanced Use Cases

- git
  - git branches
-->

### Similar Projects + Alternatives

- [Highland 2](https://www.highland2.app/)
  - Made by the creator of Fountain itself. Features its own text editor app, WYSIWYG, "Revision Mode" and analysis tools. Since everything is wrapped in a nice bow, it's probably the best Fountain-writing app if you're not technical.
- [Obsidian](https://obsidian.md/)
  - You can take the `ffluent` workflow even further with `[[ links ]]` to reference markdown notes. And then the idea is that you have `.fountain` files in your Obsidian workspace as notes themselves. Everything interlinks.
  - Have yet to try this out, but I think this is the next step going forward.

## Why the name, "ffluent"?

It had all started with the image of **converging fountain streams**.

I found the word for this is **confluent**, defined as:

> **confluent** (adjective)
>
> marked by or exhibiting **confluence**;</br>
> *flowing together* or *coming together*
>
> – [Confluent Definition & Meaning - Merriam-Webster](https://www.merriam-webster.com/dictionary/confluent>)

**The purpose of `ffluent` is to bundle atomic files together into one main output file**, so this seemed like a fitting choice. [Peter Randall-Page's sculpture entitled "Fountain Confluence"](https://kusserusa.com/portfolio/confluence-brunnen) is exactly what I had envisioned in mind.

But all the dictionary words are already trademarked names. Besides, I've found out after a few candidates that three syllables is too long. So I've shortened it to simply "fluent".

This adds a second layer of connection: being "fluent" means to be highly skilled (in speaking a language), while screenplays are linguistic works.

And finally, to add the connection with Fountain. I had candidates for project names, like "fountain-confluent" (the official verbose-name of the project) and "founfluent". But since "fluent" starts with an *F*, the same letter as "Fountain", I've elected to go for the simpler `ffluent`.

Then, adding the extra "f" to `ffluent` also makes the project stand out amongst other similar-named projects and search engine results!

The logo captures that initial image of streams flowing and converging into one main stream. It was clearer to see in the first design iteration, that the streams are actually back-to-back capital letter F's, where their bases converge. I also find myself preferring dividing my story and source directory into four main folders for the 4-act structure, so I actually have four streams converging into one main one!

### Contributing

WIP. But tldr, pull requests for anything at all are welcome!
