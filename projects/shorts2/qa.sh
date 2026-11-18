#!/bin/bash
# QA each final mp4: duration, black/freeze detections, integrated loudness
for f in "$@"; do
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  bf=$(ffmpeg -loglevel error -i "$f" -vf "blackdetect=d=0.15:pix_th=0.04,freezedetect=n=0.001:d=1.2" -an -f null - 2>&1 | grep -cE "black_start|freeze_start")
  lu=$(ffmpeg -i "$f" -af ebur128 -f null - 2>&1 | grep -A1 "Integrated" | tail -1 | awk '{print $2}')
  printf "%-34s %6.1fs  black/freeze:%s  LUFS:%s\n" "$(basename $f)" "$d" "$bf" "$lu"
done
