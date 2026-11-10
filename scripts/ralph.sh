#!/usr/bin/env bash
# Ralph Loop Runner (Bash)
ACTION=${1:-status}
TASK_ID=$2

PRD_FILE="$(dirname "$0")/../prd.json"
PROGRESS_FILE="$(dirname "$0")/../progress.txt"

if [ ! -f "$PRD_FILE" ]; then
  echo "Error: prd.json not found."
  exit 1
fi

case "$ACTION" in
  status)
    echo "================ Ralph Loop Status ================"
    node -e '
      const fs = require("fs");
      const prd = JSON.parse(fs.readFileSync(process.argv[1]));
      let done = 0, pending = 0;
      prd.tasks.forEach(t => {
        console.log(`[${t.status.toUpperCase()}] ${t.id}: ${t.title}`);
        if (t.status === "done") done++; else pending++;
      });
      console.log(`\nSummary: ${done} done, ${pending} pending.`);
    ' "$PRD_FILE"
    ;;
  next)
    node -e '
      const fs = require("fs");
      const prd = JSON.parse(fs.readFileSync(process.argv[1]));
      const next = prd.tasks.find(t => t.status === "pending");
      if (!next) {
        console.log("All tasks completed!");
        process.exit(0);
      }
      console.log(`Next Task: [${next.id}] ${next.title}`);
      next.acceptanceCriteria.forEach(c => console.log(`  - ${c}`));
    ' "$PRD_FILE"
    ;;
  complete)
    if [ -z "$TASK_ID" ]; then
      echo "Usage: ./scripts/ralph.sh complete <TASK_ID>"
      exit 1
    fi
    node -e '
      const fs = require("fs");
      const prdFile = process.argv[1];
      const progressFile = process.argv[2];
      const taskId = process.argv[3];
      const prd = JSON.parse(fs.readFileSync(prdFile));
      const target = prd.tasks.find(t => t.id === taskId);
      if (!target) {
        console.error(`Task ${taskId} not found`);
        process.exit(1);
      }
      target.status = "done";
      fs.writeFileSync(prdFile, JSON.stringify(prd, null, 2));
      const timestamp = new Date().toISOString();
      fs.appendFileSync(progressFile, `\n[${timestamp}] COMPLETED ${target.id}: ${target.title}`);
      console.log(`Task ${taskId} marked as DONE.`);
    ' "$PRD_FILE" "$PROGRESS_FILE" "$TASK_ID"
    ;;
  *)
    echo "Unknown action: $ACTION. Use: status, next, or complete <TASK_ID>"
    ;;
esac
