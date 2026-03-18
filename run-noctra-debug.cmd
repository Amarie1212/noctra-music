@echo off
setlocal
cd /d "%~dp0"
echo Running workspace debug build:
echo %CD%\apps\desktop\dist\win-unpacked\NOCTRA.exe
echo.
"%CD%\apps\desktop\dist\win-unpacked\NOCTRA.exe"
echo.
echo Process exited with code %ERRORLEVEL%
pause
