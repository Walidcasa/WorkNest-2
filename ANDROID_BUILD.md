# WorkNest Android App — Build Guide

## 1. Install Android Studio
Download from: https://developer.android.com/studio
Install and open it. Accept all SDK licenses.

## 2. Open the Android project
In Android Studio → File → Open → select this folder:
```
apps/web/android
```
Wait for Gradle sync to finish (5-10 minutes first time).

## 3. Run on emulator (test)
- Click the green Play button ▶
- App will open loading: https://work-nest-2-worknest-2.vercel.app

## 4. Build Release APK (for Play Store)
In Android Studio:
- Build → Generate Signed Bundle / APK
- Choose: Android App Bundle (.aab) — required for Play Store
- Create a new keystore (SAVE IT — you need it for all future updates)
- Fill: Key alias, password, your name
- Build type: Release
- Click Finish

The .aab file will be in:
```
apps/web/android/app/release/app-release.aab
```

## 5. Upload to Play Store
1. Go to: https://play.google.com/console
2. Create developer account ($25 one-time)
3. Create new app → App name: "WorkNest"
4. Upload the .aab file
5. Fill store listing (description, screenshots, icon)
6. Submit for review (2-7 days)

## App Details
- Package: com.worknest.app
- Version: 1.0.0
- Loads from: https://work-nest-2-worknest-2.vercel.app
- Android min SDK: 22 (Android 5.1+)

## Update the app
When you update the website (push to GitHub), the app auto-updates too!
No need to re-upload to Play Store for content changes.
For new native features, increment versionCode in build.gradle and re-upload .aab.
