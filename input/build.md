# (build help) - {{title}}

## Quick reference

Build the source code in /root/src using the default build configuration

```
$ demo build
```

Build cleanly, removing object files and old binaries first

```
$ demo build --clean
```

## Summary

The 'demo build' command builds the code in /run/src using shell scripts in /demo/run and build files in /run/src.

It forwards logs to the standard output of your shell and it writes them to build.log (stdout) and build.error (stderr).

## General Options

| -------- | ----------------------------------------------------- |
| --clean  | Remove old build artifacts before attempting to build |
| --dryrun | Print out the commands that would be executed         |
| --help   | Show this guide                                       |

## What happens

{{build.description}}

### Input

| -------- | ------------ |
{{#source.preconfigured}}
{{#build_files}}
| {{name}} | {{file}}     |
{{/build_files}}
{{/source.preconfigured}}

### Output

| ----------------------- |
{{#source.preconfigured}}
{{#build_artifacts}}
| {{name}} | {{file}}     |
{{/build_artifacts}}
{{/source.preconfigured}}

## Ways to build

Use a preconfigured build

```
$ demo build <configuration>
```

Manually execute the commands produced by

```
$ demo build <configuration> --dryrun
```

## Configured builds

{{#build.preconfigured}}
{{description}}

```
$ demo build {{name}}
```
{{/build.preconfigured}}

## Help

View this guide

```
$ demo build --help
```
