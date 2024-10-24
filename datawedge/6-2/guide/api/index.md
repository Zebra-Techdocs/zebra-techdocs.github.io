<h2 id="overview">Overview</h2>
<p>The Data Capture API operates primarily through Android intents--specific commands that can be used by other applications to control data capture without the need to directly access the hardware APIs of the device. This guide describes the functionality of the intents supported by DataWedge and their effects on data capture and the DataWedge app itself. </p>
<p><strong>DataWedge 6.2 implements a new structure for launching Android intents that supports multiple intents launched as a single command</strong>. As part of this transition, several new commands are introduced in 6.2 along with a new command syntax. Original commands remain supported in the original syntax, and will be implemented in the new syntax in a future revision. </p>
<h4 id="requirements">Requirements</h4>
<p>This guide assumes experience with Android programming and familiarity with <a href="https://developer.android.com/reference/android/content/Intent.html">Android Intents</a>. It also requires knowledge of DataWedge usage, features and terminology. For more information about DataWedge, see the DataWedge <a href="../setup">Setup Guide</a> and the <a href="../advanced">Advanced Guide</a>. It also might be helpful to read the DataWedge section of the Integrator Guide included with Zebra devices.</p>
<h4 id="interfaces">Interfaces</h4>
<p>An application accesses the original DataWedge APIs by broadcasting an intent, and uses the primary pieces of information in an intent--Action and Data--to specify which API function to perform. </p>
<p><strong>Original DataWedge APIs</strong>: </p>
<ul>
<li><strong>SoftScanTrigger -</strong> used to start, stop or toggle a software scanning trigger</li>
<li><strong>ScannerInputPlugin -</strong> enable/disable the scanner Plug-in used by the active Profile</li>
<li><strong>EnumerateScanners -</strong> returns a list of scanners available on the device</li>
<li><strong>SetDefaultProfile -</strong> sets the specified Profile as the default Profile</li>
<li><strong>ResetDefaultProfile -</strong> resets the default Profile to Profile0</li>
<li><strong>SwitchToProfile -</strong> switches to the specified Profile</li>
</ul>
<p><strong>New APIs in DataWedge 6.2</strong>: </p>
<ul>
<li><strong>DELETE_PROFILE -</strong> used to delete one or more Profiles</li>
<li><strong>GET<em>PROFILES</em>LIST -</strong> returns a list of Profiles in the device</li>
<li><strong>CLONE_PROFILE -</strong> creates a copy of an existing Profile</li>
<li><strong>RENAME_PROFILE -</strong> changes the name of an existing Profile </li>
<li><strong>GET<em>ACTIVE</em>PROFILE -</strong> returns the name of the currently selected Profile</li>
<li><strong>ENABLE_DATAWEDGE -</strong> used to enable/disable the DataWedge app</li>
</ul>
<hr />
<h2 id="apisyntax">API Syntax</h2>
<p>The APIs in the table below are supported only on DataWedge 6.2 and higher. For the exact usage syntax, sample code for each interface follows the table. </p>
<p>New commands are initiated using the <code>setAction</code> method and included as extras using the <code>putExtra</code> method. For example, the JavaScript below sends two intents: one to delete the "MainInventory" profile and another to query DataWedge for the Profiles list:  </p>
<pre><code>    :::javascript
    Intent i = new Intent();
    i.setAction("com.symbol.datawedge.api.ACTION");
    String[] profiles = {"MainInventory"};
    i.putExtra("com.symbol.datawedge.api.DELETE_PROFILE", profiles);
    i.putExtra("com.symbol.datawedge.api.GET_PROFILES_LIST", "");
</code></pre>
<p>When queried, DataWedge broadcasts the answer in a result intent. <strong>To consume the result, the receiving app must first use</strong> <code>RegisterReceiver</code>, and <strong>then use the result filter corresponding to the original intent</strong>. For example, to consume the result of <code>GET_PROFILES_LIST</code>, use <code>RESULT_GET_PROFILES_LIST</code>. </p>
<!-- If no category is set in the receiving intent, the extra default category `android.intent.category.DEFAULT` will be used. -->
<h2 id="datawedge62apis">DataWedge 6.2 APIs</h2>
<table rules="all"
width="100%"
frame="border"
cellspacing="0" cellpadding="4">
<caption class="title"></caption>
<!--
<col width="25%" />
<col width="25%" />
<col width="50%" />
-->
<thead>
<tr>
<th align="left" valign="top">Command</th>
<th align="left" valign="top">Intent Extra(s)</th>
<th align="left" valign="top">Value</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left" valign="top"><p class="table">Delete a Profile</p></td>
<td align="left" valign="top"><p class="table"><strong>com.symbol.datawedge.api.DELETE_PROFILE</strong></p></td>
<td align="left" valign="top"><p class="table">Type: String array<br>Values: List of profiles to be deleted<br> <strong>Note: The “*” character deletes all deletable profiles</strong></p></td>
</tr>
<tr>
<td align="left" valign="top"><p class="table">Query the Profile list</p></td>
<td align="left" valign="top"><p class="table"><strong>com.symbol.datawedge.api.GET_PROFILES_LIST</strong></p></td>
<td align="left" valign="top"><p class="table">Type: String<br>Values: Empty<br>Result: Intent Extra<br>Type: String array list<br>Name: <strong>com.symbol.datawedge.api.RESULT_GET_PROFILES_LIST</strong><br><strong>Note: Does not list hidden profiles</strong></p></td>
</tr>
<tr>
<td align="left" valign="top"><p class="table">Clone a Profile</p></td>
<td align="left" valign="top"><p class="table"><strong>com.symbol.datawedge.api.CLONE_PROFILE</strong></p></td>
<td align="left" valign="top"><p class="table">Type: String array<br>Values: Source profile name, new profile name<br></p></td>
</tr>
<tr>
<td align="left" valign="top"><p class="table">Rename a Profile</p></td>
<td align="left" valign="top"><p class="table"><strong>com.symbol.datawedge.api.RENAME_PROFILE</strong></p></td>
<td align="left" valign="top"><p class="table">Type: String array<br>Values: Profile to be renamed, new name for Profile</p></td>
</tr>
<tr>
<td align="left" valign="top"><p class="table">Get the Active Profile</p></td>
<td align="left" valign="top"><p class="table"><strong>com.symbol.datawedge.api.GET_ACTIVE_PROFILE</strong></p></td>
<td align="left" valign="top"><div><div class="paragraph"><p>Type: String<br>Values: Empty<br> Result: Intent Extra<br>Type: String<br>Name: com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE</p></div></div></td>
</tr>
<tr>
<td align="left" valign="top"><p class="table">Enable/Disable DataWedge</p></td>
<td align="left" valign="top"><p class="table"><strong>com.symbol.datawedge.api.ENABLE_DATAWEDGE</strong></p></td>
<td align="left" valign="top"><div><div class="paragraph"><p>Type: Boolean<br>Values: true/false<br>True = Enabled<br> False = Disabled</p></div></div></td>
</tr>
</tbody>
</table>
<p></div></p>
<hr />
<h3 id="samplecode">Sample Code</h3>
<p>The sample code shown below is for APIs supported only on DataWedge 6.2 and higher. </p>
<h4 id="delete_profile">DELETE_PROFILE</h4>
<pre><code>    :::javascript
    Intent i = new Intent();
    i.setAction("com.symbol.datawedge.api.ACTION");
    String[] profiles = {"MyProfile"};
    i.putExtra("com.symbol.datawedge.api.DELETE_PROFILE", profiles);
</code></pre>
<hr />
<h4 id="get_profiles_list">GET<em>PROFILES</em>LIST</h4>
<pre><code>    :::javascript
    Intent i = new Intent();
    i.setAction("com.symbol.datawedge.api.ACTION");
    i.putExtra("com.symbol.datawedge.api.GET_PROFILES_LIST", "");
    //send intent
    Intent i = getIntent();
    String[] profiles = i.gettExtra("com.symbol.datawedge.api.RESULT_GET_PROFILES_LIST");
</code></pre>
<hr />
<h4 id="clone_profile">CLONE_PROFILE</h4>
<pre><code>    :::javascript
    Intent i = new Intent();
    i.setAction("com.symbol.datawedge.api.ACTION"); 
    String[] values = {"Profile0", "MyProfile"};
    i. putExtra("com.symbol.datawedge.api.CLONE_PROFILE ", values);
</code></pre>
<hr />
<h4 id="rename_profile">RENAME_PROFILE</h4>
<pre><code>    :::javascript
    Intent i = newIntent();
    i.setAction("com.symbol.datawedge.api.ACTION");
    String[] values = {"TestProfile", "MyProfile"};
    i.putExtra("com.symbol.datawedge.api.RENAME_PROFILE ", values);
</code></pre>
<hr />
<h4 id="get_active_profile">GET<em>ACTIVE</em>PROFILE</h4>
<pre><code>    :::javascript
    Intent i = new Intent();
    i.setAction("com.symbol.datawedge.api.ACTION");
    i.putExtra("com.symbol.datawedge.api.GET_ACTIVE_PROFILE", "");
    //send intent
    Intent i = getIntent();
    String profile = i.gettExtra("com.symbol.datawedge.api.RESULT_GET_ACTIVE_PROFILE");
</code></pre>
<hr />
<h4 id="enable_datawedge">ENABLE_DATAWEDGE</h4>
<pre><code>    :::javascript
    Intent i = new Intent();
    i.setAction("com.symbol.datawedge.api.ACTION");
    i.putExtra("com.symbol.datawedge.api.ENABLE_DATAWEDGE", enable);
    //send intent;
</code></pre>
<hr />
<h2 id="legacydatawedgeapis">Legacy DataWedge APIs</h2>
<p>The following APIs are supported on DataWedge 6.x and higher using the syntax described below. They will be reimplemented using the new syntax in a future DataWedge version.  </p>
<h3 id="softscantrigger">SoftScanTrigger</h3>
<p>The SoftScanTrigger API command can be used to start, stop or toggle a software scanning trigger. <strong>Valid only when Barcode Input is enabled in the active Profile</strong>.  </p>
<h4 id="functionprototype">FUNCTION PROTOTYPE</h4>
<pre><code>Intent i = new Intent();
i.setAction(ACTION);
i.putExtra(EXTRA_DATA, "&lt;parameter&gt;");
</code></pre>
<h4 id="parameters">PARAMETERS</h4>
<p><strong>ACTION</strong>: String "com.symbol.datawedge.api.ACTION_SOFTSCANTRIGGER"</p>
<p><strong>EXTRA<em>DATA</strong>: String "com.symbol.datawedge.api.EXTRA</em>PARAMETER"</p>
<p><strong>&lt;parameter&gt;</strong>: The parameter as a string, using any of the following: </p>
<ul>
<li><p>"START_SCANNING" - to start scanning</p></li>
<li><p>"STOP_SCANNING" - to stop scanning</p></li>
<li><p>"TOGGLE_SCANNING" - to toggle between start scanning and stop scanning</p></li>
</ul>
<h4 id="returnvalues">RETURN VALUES</h4>
<p>None.</p>
<p>Error and debug messages will be logged to the Android logging system which then can be viewed and filtered by the logcat command. You can use logcat from an ADB shell to view the log messages, e.g.</p>
<pre><code>$ adb logcat -s DWAPI
</code></pre>
<p>Error messages will be logged for invalid actions and parameters</p>
<h4 id="example">EXAMPLE</h4>
<pre><code>// define action and data strings
String softScanTrigger = "com.symbol.datawedge.api.ACTION_SOFTSCANTRIGGER";
String extraData = "com.symbol.datawedge.api.EXTRA_PARAMETER";
// create the intent
Intent i = new Intent();
// set the action to perform
i.setAction(softScanTrigger);
// add additional info
i.putExtra(extraData, "START_SCANNING");
// send the intent to DataWedge

context.this.sendBroadcast(i);
</code></pre>
<h4 id="comments">COMMENTS</h4>
<p>The received API commands are not queued; API commands are processed immediately. Commands received while the current API command is still being processed may be ignored. For example, attempting to send the soft scan trigger start command immediately after sending the scanner enable command will result in the soft scan trigger command being ignored because the scanner enable will not have had time to complete. In this case, the soft scan trigger command should be delayed sufficiently for the scanner enable to complete; one example of how this could be done is given below.</p>
<pre><code>int triggerDelay = 250; // delay in milliseconds

Handler handler = new Handler();
handler.postDelayed(new Runnable() {
        public void run() {
                // for clarity, assume the following method contains the code in the example above
                startSoftScan();
        }
}, triggerDelay);
</code></pre>
<hr />
<h3 id="scannerinputplugin">ScannerInputPlugin</h3>
<p>The ScannerInputPlugin API command can be used to enable/disable the scanner plug-in being used by the currently active Profile. Disabling the scanner plug-in effectively disables scanning in that Profile, regardless of whether the Profile is associated or unassociated. <strong>Valid only when Barcode Input is enabled in the active Profile</strong>. </p>
<p><strong>Note</strong>: Use of this API changes only the runtime status of the scanner; it does not make persistent changes to the Profile. </p>
<h4 id="functionprototype-1">FUNCTION PROTOTYPE</h4>
<pre><code>Intent i = new Intent();
i.setAction(ACTION);
i.putExtra(EXTRA_DATA, "&lt;parameter&gt;");
</code></pre>
<h4 id="parameters-1">PARAMETERS</h4>
<p><strong>ACTION</strong>: String "com.symbol.datawedge.api.ACTION_SCANNERINPUTPLUGIN"</p>
<p><strong>EXTRA<em>DATA</strong>: String "com.symbol.datawedge.api.EXTRA</em>PARAMETER"</p>
<p><strong>&lt;parameter</strong>&gt;: The parameter as a string, using either of the following:</p>
<ul>
<li>"ENABLE_PLUGIN" - enables the plug-in</li>
<li>"DISABLE_PLUGIN" - disables the plug-in</li>
</ul>
<h4 id="returnvalues-1">RETURN VALUES</h4>
<p>None.</p>
<p>Error and debug messages will be logged to the Android logging system which then can be viewed and filtered by the logcat command. You can use logcat from an ADB shell to view the log messages, e.g.</p>
<pre><code>$ adb logcat -s DWAPI
</code></pre>
<p>Error messages will be logged for invalid actions and parameters. </p>
<h4 id="example-1">EXAMPLE</h4>
<pre><code>// define action and data strings
String scannerInputPlugin = "com.symbol.datawedge.api.ACTION_SCANNERINPUTPLUGIN";
String extraData = "com.symbol.datawedge.api.EXTRA_PARAMETER";

public void onResume() {
        // create the intent
        Intent i = new Intent();
        // set the action to perform
        i.setAction(scannerInputPlugin);
        // add additional info
        i.putExtra(extraData, "DISABLE_PLUGIN");
        // send the intent to DataWedge
        context.this.sendBroadcast(i);
}
</code></pre>
<h4 id="comments-1">COMMENTS</h4>
<p>This Data Capture API intent will allow the scanner plug-in for the current Profile to be enabled or disabled. For example, let’s say that activity A launches and uses the Data Capture API intent to switch to ProfileA in which the scanner plug-in is enabled, then at some point it uses the Data Capture API to disable the scanner plug-in. Activity B is launched. In DataWedge, ProfileB is associated with activity B. DataWedge switches to ProfileB. When activity A comes back to the foreground, in the onResume method, activity A will need to use the Data Capture API intent to switch back to ProfileA, then use the Data Capture API intent again to disable the scanner plug-in, to return back to the state it was in.</p>
<h4 id="note">NOTE</h4>
<p>The above assumes that ProfileA is not associated with any applications/activities, therefore when focus switches back to activity A, DataWedge will not automatically switch to ProfileA therefore activity A must switch back to ProfileA in its onResume method.
Because DataWedge will automatically switch Profile when an activity is paused, it is recommended that this API function be called from the onResume method of the activity.</p>
<hr />
<h3 id="enumeratescanners">EnumerateScanners</h3>
<p>The enumerateScanners API command can be used to get a list of scanners available on the device.</p>
<h4 id="functionprototype-2">FUNCTION PROTOTYPE</h4>
<pre><code>Intent i = new Intent();
i.setAction(ACTION);
</code></pre>
<h4 id="parameters-2">PARAMETERS</h4>
<p><strong>ACTION</strong>: String "com.symbol.datawedge.api.ACTION_ENUMERATESCANNERS"</p>
<h4 id="returnvalues-2">RETURN VALUES</h4>
<p>The enumerated list of scanners will be returned via a broadcast Intent. The broadcast Intent action is "com.symbol.datawedge.api.ACTION_ENUMERATEDSCANNERLIST" and the list of scanners is returned as a string array (see the example below).</p>
<p>Error and debug messages will be logged to the Android logging system which then can be viewed and filtered by the logcat command. You can use logcat from an ADB shell to view the log messages, e.g.</p>
<pre><code>$ adb logcat -s DWAPI
</code></pre>
<p>Error messages will be logged for invalid actions and parameters. </p>
<h4 id="example-2">EXAMPLE</h4>
<pre><code>// first send the intent to enumerate the available scanners on the device
// define action string
String enumerateScanners = "com.symbol.datawedge.api.ACTION_ENUMERATESCANNERS";
// create the intent
Intent i = new Intent();
// set the action to perform
i.setAction(enumerateScanners);
// send the intent to DataWedge
context.this.sendBroadcast(i);

// now we need to be able to receive the enumerate list of available scanners
String enumeratedList = "com.symbol.datawedge.api.ACTION_ENUMERATEDSCANNERLIST";
String KEY_ENUMERATEDSCANNERLIST = "DWAPI_KEY_ENUMERATEDSCANNERLIST";
// Create a filter for the broadcast intent
IntentFilter filter = new IntentFilter();
filter.addAction(enumeratedList);
registerReceiver(myBroadcastReceiver, filter);

// now we need a broadcast receiver
private BroadcastReceiver myBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
                String action = intent.getAction();
                if (action.equals(enumeratedList)) {
                        Bundle b = intent.getExtras();
                        String[] scanner_list = b.getStringArray(KEY_ENUMERATEDSCANNERLIST);
                }
        }
};
</code></pre>
<h4 id="comments-2">COMMENTS</h4>
<p>The scanner and its parameters are set based on the currently active Profile.</p>
<hr />
<h3 id="setdefaultprofile">SetDefaultProfile</h3>
<p>The <code>setDefaultProfile</code> API function can be used to set the specified Profile as the default Profile.</p>
<p><strong>A Profile specified using this method MUST NOT already be associated with another application</strong>. </p>
<h4 id="defaultprofilerecap">DEFAULT PROFILE RECAP</h4>
<p>Profile0 is the generic Profile used when there are no user-created Profiles associated with an application.    </p>
<p>Profile0 can be edited but cannot be associated with an application. That is, DataWedge allows manipulation of plug-in settings for Profile0 but it does not allow assignment of a foreground application. This configuration allows DataWedge to send output data to any foreground application other than applications associated with user-defined Profiles when Profile0 is enabled.</p>
<p>Profile0 can be disabled to allow DataWedge to send output data only to those applications that are associated in user-defined Profiles. For example, create a Profile associating a specific application, disable Profile0 and then scan. DataWedge only sends data to the application specified in the user-created Profile. This places an additional layer of security on DataWedge, permitting data to be sent only to specified applications. </p>
<h4 id="usagescenario">USAGE SCENARIO</h4>
<p>If a launcher application has a list of apps that a user can launch and none has been associated with a DataWedge Profile, the <code>setDefaultProfile</code> method can be used to associate a Profile to any app selected by the user (otherwise Profile0 will be used). When the user-selected app is launched, DataWedge auto-Profile switching will switch to the newly specified Profile. </p>
<p>If the launched app already had an associated DataWedge Profile, the <code>setDefaultProfile</code> method call will be ignored and its previously specified Profile will be loaded. When control is returned to the launcher application, <code>resetDefaultProfile</code> can be used to reset the default Profile.</p>
<h4 id="functionprototype-3">FUNCTION PROTOTYPE</h4>
<pre><code>:::javascript
Intent i = new Intent();
i.setAction(ACTION);
i.putExtra(EXTRA_DATA, "&lt;profile name&gt;");
</code></pre>
<h4 id="parameters-3">PARAMETERS</h4>
<p><strong>ACTION</strong>: String "com.symbol.datawedge.api.ACTION_SETDEFAULTPROFILE"</p>
<p><strong>EXTRA<em>DATA</strong>: String "com.symbol.datawedge.api.EXTRA</em>PROFILENAME"</p>
<p><strong>&lt;profile name</strong>&gt;: The Profile name (a case-sensitive string) to set as the default Profile.</p>
<h4 id="returnvalues-3">RETURN VALUES</h4>
<p>None.</p>
<p>Error and debug messages will be logged to the Android logging system which then can be viewed and filtered by the logcat command. Use logcat from an ADB shell to view the log messages. For example:</p>
<pre><code>$ adb logcat -s DWAPI
</code></pre>
<p>Error messages will be logged for invalid actions, parameters and failures (e.g. Profile not found or associated with an application).</p>
<h4 id="example-3">EXAMPLE</h4>
<pre><code>:::javascript
// define action and data strings
String setDefaultProfile = "com.symbol.datawedge.api.ACTION_SETDEFAULTPROFILE";
String extraData = "com.symbol.datawedge.api.EXTRA_PROFILENAME";

public void onResume() {
        // create the intent
        Intent i = new Intent();
        // set the action to perform
        i.setAction(setDefaultProfile);
        // add additional info
        i.putExtra(extraData, "myProfile");
        // send the intent to DataWedge
        context.this.sendBroadcast(i);
}
</code></pre>
<h4 id="comments-3">COMMENTS</h4>
<p>The API command will have no effect if the specified Profile does not exist or if the specified Profile is already associated with an application. DataWedge will automatically switch Profiles when the activity is paused, so it is recommended that this API function be called from the onResume method of the activity.</p>
<p>Zebra recommends that this Profile be created to cater to all applications/activities that would otherwise default to Profile0. This will ensure that these applications/activities will not inadvertently switch scanner-device configurations. For example, let’s say that Profile0 is the default Profile, and it is configured to use the camera as the barcode scanner. If only the Browser application is used to scan barcodes with the camera, DataWedge always scans with the camera and enters the acquired data into the Browser as expected. But if an application is later launched that changes to a Profile using the blockbuster as the barcode scanner, the Browser application--which is set to use the default Profile--will be unexpectedly reconfigured to use the blockbuster for scanning the next time it's used. <strong>To ensure that the Browser continues to use the camera as the barcode scanner in this scenario, simply create a Profile that specifies the camera as the barcode scanner and associate it with the Browser</strong>.</p>
<hr />
<h3 id="resetdefaultprofile">ResetDefaultProfile</h3>
<p>The <code>resetDefaultProfile</code> API function can be used to reset the default Profile back to Profile0.</p>
<h4 id="functionprototype-4">FUNCTION PROTOTYPE</h4>
<pre><code>:::javascript
Intent i = new Intent();
i.setAction(ACTION);
i.putExtra(EXTRA_DATA);
</code></pre>
<h4 id="parameters-4">PARAMETERS</h4>
<p><strong>ACTION</strong>: String "com.symbol.datawedge.api.ACTION_RESETDEFAULTPROFILE"</p>
<p><strong>EXTRA<em>DATA</strong>: String "com.symbol.datawedge.api.EXTRA</em>PROFILENAME"</p>
<h4 id="returnvalues-4">RETURN VALUES</h4>
<p>None.</p>
<p>Error and debug messages will be logged to the Android logging system, which then can be viewed and filtered by the logcat command. Use logcat from an ADB shell to view the log messages. For example: </p>
<pre><code>$ adb logcat -s DWAPI
</code></pre>
<p>Error messages will be logged for invalid actions, parameters and failures (e.g. Profile not found or associated with an application).</p>
<h4 id="example-4">EXAMPLE</h4>
<pre><code>// define action string
String resetDefaultProfile = "com.symbol.datawedge.api.ACTION_RESETDEFAULTPROFILE";

public void onResume() {
        // create the intent
        Intent i = new Intent();
        // set the action to perform
        i.setAction(resetDefaultProfile);
        context.this.sendBroadcast(i);
}
</code></pre>
<h4 id="comments-4">COMMENTS</h4>
<p>None.</p>
<hr />
<h3 id="switchtoprofile">SwitchToProfile</h3>
<p>The <code>SwitchToProfile</code> API action can be used to switch to the specified Profile, <strong>as long as that profile is not already associated with another application</strong>.</p>
<h4 id="profilesrecap">PROFILES RECAP</h4>
<p>DataWedge is based on Profiles and plug-ins. A Profile contains information on how DataWedge should behave with different applications.</p>
<p>Profile information consists of:</p>
<ul>
<li>Associated application</li>
<li>Input plug-in configurations</li>
<li>Output plug-in configurations</li>
<li>Process plug-in configurations</li>
</ul>
<p>DataWedge includes a default Profile, Profile0, that is created automatically the first time DataWedge runs.</p>
<p>Using Profiles, each application can have a specific DataWedge configuration. For example, each user application can have a Profile which outputs scanned data in the required format when that application comes to the foreground. DataWedge can be configured to process the same set of captured data differently based on the requirements of each application.</p>
<h4 id="note-1">NOTE</h4>
<p>A single Profile may be associated with one or many activities/apps, however, given an activity, only one Profile may be associated with it.</p>
<h4 id="usagescenario-1">USAGE SCENARIO</h4>
<p>Let’s say an application has two activities. ActivityA only requires EAN13 barcodes to be scanned. ActivityB only requires MSR card data. ProfileB is configured to only scan EAN13 barcodes and is left unassociated. ProfileM is configured to only accept MSR input and is left unassociated. When ActivityA launches it uses <code>SwitchToProfile</code> to activate ProfileB. Similarly, when ActivityB launches it uses <code>SwitchToProfile</code> to activate ProfileM.</p>
<p>If another activity/app comes to the foreground, DataWedge auto Profile switching will set the DataWedge Profile accordingly either to the default Profile or to an associated Profile.</p>
<p>When ActivityA (or ActivityB) comes back to the foreground it will use <code>SwitchToProfile</code> to reset the Profile back to ProfileB (or ProfileM).</p>
<h4 id="functionprototype-5">FUNCTION PROTOTYPE</h4>
<pre><code>Intent i = new Intent();
i.setAction(ACTION);
i.putExtra(EXTRA_DATA, "&lt;profile name&gt;");
</code></pre>
<h4 id="parameters-5">PARAMETERS</h4>
<p><strong>ACTION</strong>: String "com.symbol.datawedge.api.ACTION_SWITCHTOPROFILE"</p>
<p><strong>EXTRA<em>DATA</strong>: String "com.symbol.datawedge.api.EXTRA</em>PROFILENAME"</p>
<p><strong>&lt;profile name</strong>&gt;: The Profile name to switch to as a string (case-sensitive).</p>
<h4 id="returnvalues-5">RETURN VALUES</h4>
<p>None.</p>
<p>Error and debug messages will be logged to the Android logging system which then can be viewed and filtered by the logcat command. You can use logcat from an ADB shell to view the log messages, e.g.</p>
<pre><code>$ adb logcat -s DWAPI
</code></pre>
<p>Error messages will be logged for invalid actions, parameters and failures (e.g. Profile not found or associated with an application).</p>
<h4 id="example-5">EXAMPLE</h4>
<pre><code>// define action and data strings
String switchToProfile = "com.symbol.datawedge.api.ACTION_SWITCHTOPROFILE";
String extraData = "com.symbol.datawedge.api.EXTRA_PROFILENAME";

public void onResume() {
        super.onResume();
        // create the intent
        Intent i = new Intent();
        // set the action to perform
        i.setAction(switchToProfile);
        // add additional info
        i.putExtra(extraData, "myProfile");
        // send the intent to DataWedge
        context.this.sendBroadcast(i);
}
</code></pre>
<h4 id="comments-5">COMMENTS</h4>
<p>This API function will have no effect if the specified Profile does not exist or is already associated with an application.</p>
<p>DataWedge has a one-to-one relationship between Profiles and activities; a Profile can be associated only with a single activity. When a Profile is first created, it's not associated with any application, and will not be activated until associated. This makes it possible to create multiple unassociated Profiles.</p>
<p>This API function activates such Profiles.</p>
<p>For example, let's say that ProfileA is unassociated and ProfileB is associated with activity B. If activity A is launched and uses <code>SwitchToProfile</code> function to switch to ProfileA, then ProfileA will be active ehenever activity A is in the foreground. When activity B comes to the foreground, DataWedge will automatically switch to ProfileB. </p>
<p>When activity A returns to the foreground, the app must use <code>SwitchToProfile</code> again to switch back to ProfileA. This would be done in the <code>onResume</code> method of activity A.</p>
<h4 id="notes">Notes</h4>
<ul>
<li>Because DataWedge will automatically switch Profile when the activity is paused, Zebra recommends that this API function be called from the onResume method of the activity.</li>
<li>After switching to a Profile, this unassociated Profile does not get assigned to the application/activity and is available to be used in the future with a different app/activity.</li>
<li>For backward compatibility, DataWedge’s automatic Profile switching is not affected by the above API commands. This why the commands work only with unassociated Profiles and apps.</li>
</ul>
<p>DataWedge auto Profile switching works as follows: </p>
<p><strong>Every second…</strong></p>
<ul>
<li>Sets <strong>newProfileId</strong> to the associated Profile ID of the current foreground activity. </li>
<li>If no associated Profile is found, sets <strong>newProfileId</strong> to the associated Profile ID of the current foreground app. </li>
<li>If no associated Profile is found, sets <strong>newProfileId</strong> to the current default Profile (which  MAY NOT be Profile0). </li>
<li>Checks the <strong>newProfileId</strong> against the <strong>currentProfileId</strong>. If they are different: <ul>
<li>deactivates current Profile</li>
<li>activates new Profile (<strong>newProfileId</strong>)</li>
<li>sets <strong>currentProfileId</strong> = <strong>newProfileId</strong></li></ul></li>
</ul>
<hr />
<p><strong>SEE ALSO</strong>:</p>
<p><a href="https://www.zebra.com/us/en/support-downloads.html">Zebra Support Central</a> | Integrator Guides, Product Manuals, Software Downloads and Support</p>
<p><a href="https://developer.zebra.com/welcome">LaunchPad</a> | Zebra Developer Community</p>
<p><a href="https://developer.android.com/reference/android/content/Intent.html">Intent</a> | Android Developers</p>
<p><a href="http://developer.android.com/guide/components/intents-filters.html">Intents and Intent Filters</a> | Android Developers</p>
<p><a href="http://www.vogella.com/tutorials/AndroidIntent/article.html">Android Intents</a> | Tutorial</p>