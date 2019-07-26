# (share|sync help) - {{title}}

## Quick reference

Access a copy of the /root/src directory from your shared directory outside of the demo

```
$ demo share /root/src
```

Sync changes made to /root/src in your shared directory with /root/src inside the demo

```
$ demo sync /root/src
```

Or share and sync your current directory

```
$ cd /root/src
$ demo share
$ demo sync
```

## Summary

Both 'demo share' and 'demo sync' execute rsync.

'demo share' syncs files to your shared directory outside the demo. 'demo sync' syncs changes you made in your shared directory back to the same directories inside the demo.

## General Options

| ------------- | ----------------------------------------------------- |
| --complete    | Match directories completely, deleting files at the desination that don't exist anymore at the source. Same behavior as 'rsync --delete'. Use with caution |
| --dryrun      | Print out the commands that would be executed         |
| --verbose, -v | Show rsync output (copied files)                      |
| --help        | Show this guide                                       |

## What happens

When you run 'demo shell' to enter a demo, you choose or configure a shared directory. If you change the contents of /shared in the demo, those changes will immediately show up in your shared directory outside of the demo, and vice versa.

'demo share' uses rsync to efficiently copy a directory in the demo (e.g. /root/src) to the same directory in /shared (e.g. /shared/root/src). Use this command to access any demo files from the shared directory (outside of the demo) using your favorite file editors and local tools.

'demo sync' uses rsync efficiently copy a directory in /shared (e.g. /shared/root/src) back to the same directory in the demo (e.g. /root/src). Use this command to pull changes you made in the shared directory (outside of the demo) back inside the demo.

## Example

Share a repository of code in /root/src

```
$ demo share /root/src/repo
```

Edit the files in your shared directory outside of the demo. Then pull in the changes

```
$ demo sync /root/src/repo
```

Rebuild and run the demo with the changes

```
$ demo build
$ demo run
```

## About this workflow

The files inside the demo are likely owned by a different user (e.g. root) than the files outside the demo (e.g. your user ID). When you run 'demo share', files are not only efficiently copied, they are also changed so you own them and therefore can modify them outside of the demo. When you run 'demo sync', files are changed back to the user in the demo so you can also easily access them there.

Some tools do this automatically, like the unison tool and network filesystems. We use rsync because:

- It's stable
- It makes it clear what's happening
- You choose when to sync (only when needed)
- It requires no special setup or permissions on your local computer

If you want to keep some directories in the demo and your shared directory automatically in sync, you can easily write a script that runs 'demo share' and 'demo sync' in a loop. We don't provide a script so you can choose how to watch files for changes, how to handle sync errors, and how to handle syncing when it takes a long time.

## Help

View this guide

```
$ demo share --help
$ demo sync --help
```
