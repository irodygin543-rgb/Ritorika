package ru.retorika.matext;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.speech.tts.TextToSpeech;
import android.util.DisplayMetrics;
import android.view.View;
import android.view.Window;
import android.view.WindowInsetsController;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.util.Locale;

/**
 * «Красноречие» — Native Android / HarmonyOS 4.2 shell tailored for
 * Huawei Mate XT Ultimate Design (tri-fold 6.4" / 7.9" / 10.2").
 *
 * 100% GMS-free, offline-first, seamless fold continuity without Activity restart.
 */
public class MainActivity extends Activity implements TextToSpeech.OnInitListener {

    private WebView webView;
    private TextToSpeech tts;
    private boolean ttsReady = false;
    private boolean pageLoaded = false;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#FAF7F2"));
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        webView.addJavascriptInterface(new MateXTBridge(), "AndroidBridge");
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                pageLoaded = true;
                dispatchPostureToWeb(getResources().getConfiguration());
            }
        });

        try {
            tts = new TextToSpeech(this, this);
        } catch (Throwable ignored) {
            tts = null;
        }

        applySystemBarTheme(false);
        webView.loadUrl("file:///android_asset/www/index.html");
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS && tts != null) {
            int res = tts.setLanguage(new Locale("ru", "RU"));
            ttsReady = (res != TextToSpeech.LANG_MISSING_DATA && res != TextToSpeech.LANG_NOT_SUPPORTED);
            tts.setSpeechRate(0.95f);
        }
    }

    /**
     * Triggered smoothly on Huawei Mate XT fold / unfold / rotation without resetting WebView!
     */
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        if (pageLoaded) {
            webView.postDelayed(() -> dispatchPostureToWeb(newConfig), 60);
        }
    }

    private String computePosture(int widthDp) {
        if (widthDp < 600) {
            return "single"; // 6.4" folded (1008x2232)
        } else if (widthDp < 900) {
            return "dual";   // 7.9" dual screen book mode (2048x2232)
        } else {
            return "triple"; // 10.2" fully unfolded cabinet mode (3184x2232)
        }
    }

    private JSONObject buildDeviceInfoJson(Configuration config) {
        JSONObject obj = new JSONObject();
        try {
            DisplayMetrics dm = getResources().getDisplayMetrics();
            int widthDp = config != null && config.screenWidthDp > 0
                    ? config.screenWidthDp
                    : Math.round(dm.widthPixels / Math.max(1f, dm.density));
            int heightDp = config != null && config.screenHeightDp > 0
                    ? config.screenHeightDp
                    : Math.round(dm.heightPixels / Math.max(1f, dm.density));

            String model = (Build.MANUFACTURER + " " + Build.MODEL).trim();
            obj.put("model", model);
            obj.put("os", "Android/HarmonyOS API " + Build.VERSION.SDK_INT);
            obj.put("widthDp", widthDp);
            obj.put("heightDp", heightDp);
            obj.put("widthPx", dm.widthPixels);
            obj.put("heightPx", dm.heightPixels);
            obj.put("posture", computePosture(widthDp));
        } catch (Throwable ignored) {
        }
        return obj;
    }

    private void dispatchPostureToWeb(Configuration config) {
        if (webView == null) return;
        final String jsonStr = buildDeviceInfoJson(config).toString();
        final String js = "if(window.onMateXTPostureChanged){window.onMateXTPostureChanged(" + JSONObject.quote(jsonStr) + ");}";
        runOnUiThread(() -> webView.evaluateJavascript(js, null));
    }

    @SuppressWarnings("deprecation")
    private void applySystemBarTheme(boolean dark) {
        runOnUiThread(() -> {
            Window window = getWindow();
            if (window == null) return;
            int bg = Color.parseColor(dark ? "#14100E" : "#FAF7F2");
            window.setStatusBarColor(bg);
            window.setNavigationBarColor(bg);
            if (webView != null) {
                webView.setBackgroundColor(bg);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                WindowInsetsController controller = window.getInsetsController();
                if (controller != null) {
                    int lightFlags = WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                            | WindowInsetsController.APPEARANCE_LIGHT_NAVIGATION_BARS;
                    controller.setSystemBarsAppearance(dark ? 0 : lightFlags, lightFlags);
                }
            } else {
                View decor = window.getDecorView();
                int flags = decor.getSystemUiVisibility();
                if (dark) {
                    flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                    }
                } else {
                    flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                    }
                }
                decor.setSystemUiVisibility(flags);
            }
        });
    }

    @Override
    public void onBackPressed() {
        if (webView != null && pageLoaded) {
            webView.evaluateJavascript(
                    "(function(){return window.handleAndroidBack ? window.handleAndroidBack() : false;})()",
                    value -> {
                        if (!"true".equals(value)) {
                            MainActivity.super.onBackPressed();
                        }
                    }
            );
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        if (webView != null) {
            webView.destroy();
        }
        super.onDestroy();
    }

    private class MateXTBridge {

        @JavascriptInterface
        public String getDeviceInfo() {
            return buildDeviceInfoJson(getResources().getConfiguration()).toString();
        }

        @JavascriptInterface
        public void speak(String text) {
            if (tts != null && ttsReady && text != null && !text.trim().isEmpty()) {
                tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "krasnorechie_tts");
            }
        }

        @JavascriptInterface
        public void vibrate(String kind) {
            try {
                Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                if (v == null || !v.hasVibrator()) return;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    if ("err".equals(kind)) {
                        v.vibrate(VibrationEffect.createWaveform(new long[]{0, 28, 45, 28}, -1));
                    } else if ("ok".equals(kind)) {
                        v.vibrate(VibrationEffect.createOneShot(22, VibrationEffect.DEFAULT_AMPLITUDE));
                    } else {
                        v.vibrate(VibrationEffect.createOneShot(10, 80));
                    }
                } else {
                    v.vibrate("err".equals(kind) ? 40 : 15);
                }
            } catch (Throwable ignored) {
            }
        }

        @JavascriptInterface
        public void shareText(String text) {
            if (text == null || text.trim().isEmpty()) return;
            runOnUiThread(() -> {
                Intent share = new Intent(Intent.ACTION_SEND);
                share.setType("text/plain");
                share.putExtra(Intent.EXTRA_SUBJECT, "Красноречие");
                share.putExtra(Intent.EXTRA_TEXT, text);
                startActivity(Intent.createChooser(share, "Поделиться выражением"));
            });
        }

        @JavascriptInterface
        public void setDarkMode(boolean dark) {
            applySystemBarTheme(dark);
        }
    }
}
