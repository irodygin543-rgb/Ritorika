-keep class ru.retorika.matext.MainActivity$MateXTBridge { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
