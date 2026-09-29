@echo off
title PB.GPP Surabaya - Dev Server (port 3010)
cd /d "D:\Company Profile\PB.GPP"
echo ============================================
echo  PB.GPP Surabaya - Mode Local
echo  Website : http://localhost:3010
echo  Admin   : http://localhost:3010/admin
echo ============================================
echo.
npm run dev:3010
pause
