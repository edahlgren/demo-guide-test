# (run help) - {{title}}

## Quick reference

Run the demo using the default preconfiguration

```
$ demo run
```

## Summary

{{run.description}}

|              |                 |
| -----------  | --------------- |
| ___Input     |
{{#input}}
| {{format}}   | {{description}} |
{{/input}}
| ___Output    |                 | 
{{#output}}
| {{format}}   | {{description}} |
{{/output}}

## Ways to run

Use a preconfigured demo

```
$ demo run <configuration>
```

Manually execute the commands produced by

```
$ demo run <configuration> --dryrun
```

Use your own command-line options

```
$ demo run -- [options...]
```

## Preconfigured Demos

{{#run.preconfigured}}
{{description}}

```
$ demo run {{name}}
```
{{/run.preconfigured}}

## Command-line options

|                 |             |                   |
| --------------- | ----------- | ----------------- |
|                 | (default)   | (description)     |
|___Input         |             |                   |
{{#input}}
| {{options}}     | {{default}} | {{description}}   |
{{/input}}
|___Output        |             |                   |
{{#output}}
| {{options}}     | {{default}} | {{description}}   |
{{/output}}
|___Algorithms    |             |                   |
{{#algorithms}}
| {{options}}     | {{default}} | {{description}}   |
{{/algorithms}}
|___Parameters    |             |                   |
{{#params}}
| {{options}}     | {{default}} | {{description}}   |
{{/params}}


## Examples
{{#run.examples}}

{{description}}

```
$ demo run -- {{&commandline}}
```
{{/run.examples}}
