#!/bin/bash
# Renders every video dir listed in out/queue.txt that has no final mp4 yet; polls for new entries.
cd "$(dirname "$0")"
touch out/queue.txt out/queue.log
while true; do
  next=""
  while read -r d; do [ -z "$d" ] && continue; n=$(basename "$d"); [ -f "final/$n.mp4" ] || grep -qx "FAIL $d" out/queue.log || { next=$d; break; }; done < out/queue.txt
  if [ -z "$next" ]; then [ -f out/queue.stop ] && exit 0; sleep 15; continue; fi
  if ./make.sh "$next" >> out/queue.log 2>&1 && [ -f "final/$(basename $next).mp4" ]; then echo "OK $next" >> out/queue.log; else echo "FAIL $next" >> out/queue.log; fi
done
