# (run help) - {{title}}

## Quick reference

Run the demo using the default preconfiguration

```
$ demo run
```

Run the demo using command-line options

```
$ demo run -- --option1 arg1 --option2 --option3
```

## Summary

The 'demo run' command executes the code in /run/src using shell scripts in /demo/run.

It forwards logs to the standard output of your shell and it writes them to run.log (stdout) and run.error (stderr).

## General Options

| -------  | --------------------------------------------- |
| --dryrun | Print out the commands that would be executed |
| --help   | Show this guide                               |

## What happens

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

Use a configured run

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

## Configured runs

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

## Help

View this guide

```
$ demo run --help
```
