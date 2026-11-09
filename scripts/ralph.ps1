param(
    [string]$Action = "status",
    [string]$TaskId = ""
)

$PrdPath = Join-Path $PSScriptRoot "..\prd.json"
$ProgressPath = Join-Path $PSScriptRoot "..\progress.txt"

if (-not (Test-Path $PrdPath)) {
    Write-Error "prd.json not found at $PrdPath"
    exit 1
}

$prd = Get-Content $PrdPath -Raw | ConvertFrom-Json

if ($Action -eq "status") {
    Write-Host "================ Ralph Loop Status ================" -ForegroundColor Cyan
    Write-Host "Project: $($prd.project) (v$($prd.version))"
    Write-Host ""
    
    $pending = 0
    $done = 0
    foreach ($task in $prd.tasks) {
        $color = if ($task.status -eq "done") { "Green" } elseif ($task.status -eq "in_progress") { "Yellow" } else { "Gray" }
        Write-Host "[$($task.status.ToUpper())] $($task.id): $($task.title)" -ForegroundColor $color
        if ($task.status -eq "done") { $done++ } else { $pending++ }
    }
    Write-Host ""
    Write-Host "Summary: $done completed, $pending pending / in progress." -ForegroundColor Cyan
    Write-Host "===================================================" -ForegroundColor Cyan
}
elseif ($Action -eq "next") {
    $nextTask = $prd.tasks | Where-Object { $_.status -eq "pending" } | Select-Object -First 1
    if ($null -eq $nextTask) {
        Write-Host "All tasks in prd.json are completed! 🎉" -ForegroundColor Green
        exit 0
    }
    Write-Host "Next Ralph Task to execute:" -ForegroundColor Yellow
    Write-Host "ID: $($nextTask.id)" -ForegroundColor White
    Write-Host "Title: $($nextTask.title)" -ForegroundColor White
    Write-Host "Priority: $($nextTask.priority)" -ForegroundColor White
    Write-Host "Acceptance Criteria:" -ForegroundColor White
    foreach ($c in $nextTask.acceptanceCriteria) {
        Write-Host "  - $c" -ForegroundColor DarkGray
    }
}
elseif ($Action -eq "complete") {
    if ([string]::IsNullOrWhiteSpace($TaskId)) {
        Write-Error "Specify -TaskId to mark complete, e.g.: .\scripts\ralph.ps1 -Action complete -TaskId TASK-005"
        exit 1
    }
    $target = $prd.tasks | Where-Object { $_.id -eq $TaskId }
    if ($null -eq $target) {
        Write-Error "Task '$TaskId' not found in prd.json"
        exit 1
    }
    $target.status = "done"
    $prd | ConvertTo-Json -Depth 5 | Set-Content -Path $PrdPath -Encoding utf8
    
    $timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    $logEntry = "[$timestamp] COMPLETED $($target.id): $($target.title)"
    Add-Content -Path $ProgressPath -Value $logEntry
    Write-Host "Marked $($target.id) as DONE and logged to progress.txt" -ForegroundColor Green
}
