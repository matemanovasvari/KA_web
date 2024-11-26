@echo off
title Auto Git
pushd "%~dp0"
:begin
set /p selection="1. Push vagy 2. Pull > "

if %selection%==1 (
    git add .
    git status
    echo.
    set /p commit="Add meg a commit messaget > "
    git commit -m "%date% - %commit%"
    git push
    goto :end
) else if %selection%==2 (
    git pull
    goto :end
) else (
    echo Hibás választás!
    goto :begin
)

:end
net helpmsg %errorlevel%
timeout 5 /nobreak > nul
exit /b %errorlevel%