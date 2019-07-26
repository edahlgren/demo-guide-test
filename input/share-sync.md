# (share|sync help) - {{title}}

Make a directory accessible in a shared directory outside this demo, and sync any changes you made there back to the same directory in the demo

## Quick reference

Access a copy of /root/src from a shared directory outside the demo

```
$ demo share /root/src
```

Sync changes you made in a shared directory so they appear in /root/src in the demo

```
$ demo sync /root/src
```

Access an exact copy of /root/src from a shared directory, deleting files in the shared directory if necessary

```
$ demo share /root/src --completely
```

Sync changes to /root/src completely, deleting files under /root/src in the demo if necessary

```
$ demo sync /root/src --completely
```

You can execute the same commands on the current directory

```
$ cd /root/src
$ demo share
```

```
$ cd /root/src
$ demo sync --completely
```

## Summary

When you run 'demo shell' to enter a demo, you choose or configure a shared directory, whose contents will show up in the demo under /shared. When you change the contents of your shared directory, your changes will also appear in /shared, and vice versa.

'demo share' uses rsync to efficiently copy a directory in the demo (e.g. /root/src) to the same directory in /shared (e.g. /shared/root/src). Use this command to access demo files from your shared directory outside the demo, allowing you to view and change the demo files directly on your computer, using your favorite editors and tools.

'demo sync' uses rsync to efficiently copy a directory in /shared (e.g. /shared/root/src) back to the same directory in the demo (e.g. /root/src). Use this command to pull changes you made in your shared directory back into the demo.

## Example

Share a repository of code in /root/src

```
$ demo share /root/src/repo
```

Edit the files in your shared directory outside of the demo. Then pull in the changes

```
$ demo sync /root/src/repo
```

Rebuild and run the default configuration with your changes

```
$ demo build && demo run
```

## Why this workflow

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
```

Same as above

```
$ demo sync --help
```
