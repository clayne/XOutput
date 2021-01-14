Get-EventLog Application -EntryType Error -After ([DateTime]::Today.AddDays(-1)) | Format-Table -Wrap -Autosize | Out-File (Join-Path $PSScriptRoot "Windows EventLog errors.txt")