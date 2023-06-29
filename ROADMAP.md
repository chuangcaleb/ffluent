
# ffluent

## CLI

- init
  - initialise a workspace
    - project title in prose
    - project name in slug
    - flow variants: basic writer / advanced technical
    - config file (commented out)
    - ? git
      - checkin output dir?
    - ? template: (3-Act, !4-Act, 5-Act, 6-Act, 12-Point Hero’s Journey)
  - Use `inquirer` package
  - Throw warnings to if not empty directory
- bundle
  - compile files
  - VS Code to watch for event and run BetterFountain bundle PDF script
- options
  - verbosity: error/warning/info/silent

## .ffluent.config options

- title: project title !(My Story)
- output: output dir (out/[projectName].fountain)
- source: source dir (src/)
- markdown: scan for markdown files instead of fountain (false)
- depth: max depth of src directory to walk (6)
- isNestedOutput
  - enabled: whether output has nested sections (true)
  - nestedOutputTitleTemplate: “projectTitleOnly” | “sectionTitleOnly” | “both” (“both”)
  - nestedOutputTitleSeparator: separator to use between components, if plural “ - ”
  - last modified metadata
- useLatestDate: uses the latest date of atomic file // use last modified
- stats: metadata stats for different sections
- prefixHeadings
- slugify 'title' | [depths, where neg is reverse direction] | all | none (none)

> use `{NAME}` format for templating

```js
"[fountain]": {
  "editor.wordWrap": "wordWrapColumn",
  "files.trimTrailingWhitespace": true,
  "files.trimFinalNewlines": false
}
```

(_meta.json)(<https://nextra.site/docs/guide/organize-files>)

## TODO

- [x] Handle yaml
  - allows comments
  - more intuitive for non-technical users
- [x] special files
  - [x] +cover fountain file to order first
    - warning: "+"-files are reserved names. if you need to specify a "+"-file in the meta.yaml sequence, then consider to not use the "+"-prefix.
    - will not be marked in implicit section headings
  - [x] config json/yaml file
- [x] handle whitespace
- [] implicit section headings (level according to depth)
- [] JSON schema
- [] require other .fountain files
