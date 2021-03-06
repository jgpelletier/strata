#!/bin/bash

abend()
{
    local message=$1
    echo "fatal: $message" 1>&2
    exit 1
}

files=$(git ls-files -m | wc -l | tr -d ' ')

[ "$files" -ne 1 ] && abend "only one modified file at a time please"

file=$(git ls-files -m)
node "$file" || abend "test is now failing"
name=$(basename $file)

case "$1" in
    tidy)
        git commit -a -m 'Tidy `'$file'`.'$'\n\nSee #351.'
        ;;
    assert)
        git commit -a -m 'Use `assert` in `'$name'`.'$'\n\nSee #351.'
        ;;
    vivify)
        git commit -a -m 'Use `vivify` in `'$name'`.'$'\n\nSee #352.'
        ;;
esac
