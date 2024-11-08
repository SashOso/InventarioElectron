@echo off
cls

:MENU
cls
echo ================================
echo 1. Subir
echo 2. Clonar
echo 3. Guardar
echo 4. Config
echo 5. Salir
echo ================================
set /p opcion="Opcion: "
if "%opcion%"=="1" goto SUBIR
if "%opcion%"=="2" goto CLONAR
if "%opcion%"=="3" goto GUARDAR
if "%opcion%"=="4" goto CONFIG
if "%opcion%"=="5" goto SALIR
goto MENU


:SUBIR
echo --------------------------------
git init
git add .
echo --------------------------------
set /p commit="Commit: "
echo --------------------------------
git commit -m "%commit%"
echo --------------------------------
set /p repositorio="Repositorio: "
echo --------------------------------
git remote add origin %repositorio%
echo --------------------------------
set /p rama="Rama: "
echo --------------------------------
git push -u origin %rama%
echo --------------------------------
pause
goto MENU

:CLONAR
echo --------------------------------
set /p repositorio="Repositorio: "
echo --------------------------------
git clone %repositorio%
echo --------------------------------
pause
goto MENU


:GUARDAR
echo --------------------------------
git add .
set /p commit="Commit: "
echo --------------------------------
git commit -m "%commit%"
echo -------------------------------
git push
echo --------------------------------
pause
goto MENU


:CONFIG
echo --------------------------------
set /p name="Name: "
git config --global user.name "%name%"
echo --------------------------------
set /p email="Email: "
git config --global user.email "%email%"
echo --------------------------------
pause
goto MENU


:SALIR
cls
exit


