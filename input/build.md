# (build help) - {{title}}

## Quick reference

Build the source code in /root/src

```
$ demo build
```

Build cleanly, removing object files and old binaries first

```
$ demo build --clean
```

## Ways to build

Use a preconfigured build

```
$ demo build <configuration>
```

Manually execute the commands produced by

```
$ demo build --dryrun
```

## Preconfigured builds

{{#build.preconfigured}}
{{description}}

```
$ demo build {{name}}
```
{{/build.preconfigured}}

## Build files

{{#source.preconfigured}}
### {{name}}

{{#build_files}}
{{.}}
{{/build_files}}
{{/source.preconfigured}}
