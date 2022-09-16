<h2 id="enumerate_scanners">ENUMERATE_SCANNERS</h2>
<p>Introduced in DataWedge 6.3. </p>
<p>Generates a numbered list (index) of scanners available on the device. </p>
<p><strong>IMPORTANT</strong>: The scanner index is not fixed for all devices. It varies depending on the number of supported internal and/or external scanners installed and/or connected to the device at the time the index is generated. </p>
<h3 id="functionprototype">Function Prototype</h3>
<pre><code>Intent i = new Intent();
i.setAction("com.symbol.datawedge.api.ACTION");
i.putExtra("com.symbol.datawedge.api.ENUMERATE_SCANNERS", "");
</code></pre>
<h3 id="parameters">Parameters</h3>
<p><strong>ACTION</strong> [String]: "com.symbol.datawedge.api.ENUMERATE_SCANNERS"</p>
<h3 id="returnvalues">Return Values</h3>
<p>The enumerated list of scanners is returned via the broadcast intent <code>com.symbol.datawedge.api.ACTION_ENUMERATEDSCANNERLIST</code>. The list of scanners is returned as a string array (see below).</p>
<h3 id="bundleextras">Bundle Extras</h3>
<p><strong>SCANNER_NAME</strong> [String]: </p>
<p><strong>SCANNER_INDEX</strong> [String]:  </p>
<p><strong>SCANNER<em>CONNECTION</em>STATE</strong> [String]: </p>
<p><strong>SCANNER_IDENTIFIER</strong> [String]: in each scanner info bundle for each scanner supported in the device (introduced in DataWedge 6.5). Both parameters are supported in DataWedge 6.6; the scanner identifier value takes precedence if an index also is referenced in the code.  </p>
<p><strong>Possible values</strong>:</p>
<ul>
<li><strong>AUTO</strong> - Automatic scanner selection</li>
<li><strong>INTERNAL_IMAGER</strong> - Built-in imager scanner</li>
<li><strong>INTERNAL_LASER</strong> - Built-in laser scanner</li>
<li><strong>INTERNAL_CAMERA</strong> - Built-in camera scanner</li>
<li><strong>SERIAL_SSI</strong> - Pluggable Z-back scanner for ET50/ET55 </li>
<li><strong>BLUETOOTH_SSI</strong> - RS507 Bluetooth scanner</li>
<li><strong>BLUETOOTH_RS6000</strong> - RS6000 Bluetooth scanner</li>
<li><strong>BLUETOOTH_DS3678</strong> - DS3678 Bluetooth scanner</li>
<li><strong>PLUGABLE_SSI</strong> - Serial SSI scanner RS429 (for use with WT6000)</li>
<li><strong>PLUGABLE<em>SSI</em>RS5000</strong> - Serial SSI scanner RS5000 (for use with WT6000)</li>
<li><strong>USB<em>SSI</em>DS3608</strong> - DS3608 pluggable USB scanner</li>
</ul>
<p>Error and debug messages are logged to the Android logging system, which can be viewed and filtered by the logcat command. Use logcat from an ADB shell to view the log messages:</p>
<pre><code>:::term
$ adb logcat -s DWAPI
</code></pre>
<p>Error messages are logged for invalid actions and parameters. </p>
<h2 id="examplecode">Example Code</h2>
<h3 id="enumeratescanners">Enumerate scanners</h3>
<pre><code>//
//  Call before sending the enumeration query
//
public void registerReciever(){
    IntentFilter filter = new IntentFilter();
    filter.addAction("com.symbol.datawedge.api.RESULT_ACTION");//RESULT_ACTION
    filter.addCategory(Intent.CATEGORY_DEFAULT);
    registerReceiver(enumeratingBroadcastReceiver, filter);
}
//
// Send the enumeration command to DataWedge
//
public void enumerateScanners(){
    Intent i = new Intent();
    i.setAction("com.symbol.datawedge.api.ACTION");
    i.putExtra("com.symbol.datawedge.api.ENUMERATE_SCANNERS", "");
    this.sendBroadcast(i);
}

public void unRegisterReciever(){
    unregisterReceiver(enumeratingBroadcastReceiver);
}

//
// Create broadcast receiver to receive the enumeration result
//
private BroadcastReceiver enumeratingBroadcastReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        Log.d(TAG, "Action: " + action);
        if(action.equals("com.symbol.datawedge.api.RESULT_ACTION")){
            //
            // enumerate scanners
            //
            if(intent.hasExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS")) {
            ArrayList&lt;Bundle&gt; scannerList = (ArrayList&lt;Bundle&gt;) intent.getSerializableExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS");
            if((scannerList != null) &amp;&amp; (scannerList.size() &gt; 0)) {
                for (Bundle bunb : scannerList){
                    String[] entry = new String[4];
                    entry[0] = bunb.getString("SCANNER_NAME");
                    entry[1] = bunb.getBoolean("SCANNER_CONNECTION_STATE")+"";
                    entry[2] = bunb.getInt("SCANNER_INDEX")+"";

                    entry[3] = bunb.getString("SCANNER_IDENTIFIER");

                    Log.d(TAG, "Scanner:" + entry[0]  + " Connection:" + entry[1] + " Index:" + entry[2] + " ID:" + entry[3]);
                    }
                }
            }
        }
    }
};
</code></pre>
<h3 id="getscannerdetails">Get scanner details</h3>
<pre><code>// RESULT_ACTION_EXTRA_ENUMERATE_SCANNERS

if(intent.hasExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS")) {
    Log.d(TAG, "&gt;&gt;&gt; RESULT_ACTION_EXTRA_ENUMERATE_SCANNERS &lt;&lt;&lt;");
    ArrayList&lt;Bundle&gt; scannerList = (ArrayList&lt;Bundle&gt;) intent.getSerializableExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS");
    if((scannerList != null) &amp;&amp; (scannerList.size() &gt; 0)) {
        for ( Bundle bunb: scannerList) {

            String ScannerName = bunb.getString("SCANNER_NAME");
            int ScannerIndex = bunb.getInt("SCANNER_INDEX"));
            Boolean ScannerConnectionState = bunb.getBoolean("SCANNER_CONNECTION_STATE");
            String ScannerId = bunb.getString("SCANNER_IDENTIFIER");

        }
    }
}
</code></pre>
<!-- 11/14/17- COMMENTED AND REPLACED WITH SAMPLE ABOVE, PER ENG. 

    // First send the intents to enumerate the available scanners on the device:
    i.setAction("com.symbol.datawedge.api.ACTION");
    i.putExtra("com.symbol.datawedge.api.ENUMERATE_SCANNERS", "");
    this.sendBroadcast(i);

    // define action string:
    String enumerateScanners = "com.symbol.datawedge.api.ACTION";

    // create the intent:
    Intent i = new Intent();

    // set the action to perform:
    i.setAction(enumerateScanners);

    // send the intent to DataWedge:
    this.sendBroadcast(i);

    // enable the app to receive the enumerated list of available scanners:
    String enumeratedList = "com.symbol.datawedge.api.ACTION";

    // create a filter for the broadcast intent
    IntentFilter filter = new IntentFilter();
        filter.addAction(enumeratedList);
        filter.addCategory(Intent.CATEGORY_DEFAULT);  // NOTE: REQUIRED for DW6.2 and higher
        registerReceiver(myBroadcastReceiver, filter);

    // create a broadcast receiver
    private BroadcastReceiver myBroadcastReceiver = new BroadcastReceiver() {
       @Override
       public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            Log.d(TAG, "Action: " + action); 

             if(action.equals("com.symbol.datawedge.api.RESULT_ACTION")){
                Bundle b = intent.getExtras();

    // enumerate scanners
    if(intent.hasExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS")) {
        ArrayList<Bundle> scannerList = (ArrayList<Bundle>) intent.getSerializableExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS");
    if((scannerList != null) && (scannerList.size() > 0)) {
        for ( Bundle bunb: scannerList)
            Log.d(TAG,"Scanner:"+bunb.getString("SCANNER_NAME")+" Connection:"+bunb.getBoolean("SCANNER_CONNECTION_STATE")+" Index:"+bunb.getInt("SCANNER_INDEX"));
                    }
                }
            }
        }
    };
 -->
<!--      // The following code provided by engineering on 6/26/17 [TUT-14724]
         // Integrated with main code sample as indicated below: 

    //Enumerate Scanners (send request)
        Intent i = new Intent();
        i.setAction("com.symbol.datawedge.api.ACTION");
        i.putExtra("com.symbol.datawedge.api.ENUMERATE_SCANNERS", "");
        this.sendBroadcast(i); //this line added; those above were already present in sample


    //Enumerate Scanners (receive results)
    private BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            Log.d(TAG, "Action: " + action); //THIS LINE ADDED TO SAMPLE

            //THE REMAINING CODE (BELOW) REPLACED THE 
            // "REMAINDER OF THE ORIGINAL SAMPLE" (FARTHER BELOW) 

            if(action.equals("com.symbol.datawedge.api.RESULT_ACTION")){
                Bundle b = intent.getExtras();

                // enumerate scanners
                if(intent.hasExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS")) {
                    ArrayList<Bundle> scannerList = (ArrayList<Bundle>) intent.getSerializableExtra("com.symbol.datawedge.api.RESULT_ENUMERATE_SCANNERS");
                    if((scannerList != null) && (scannerList.size() > 0)) {
                        for ( Bundle bunb: scannerList)
                            Log.d(TAG,"Scanner:"+bunb.getString("SCANNER_NAME")+" Connection:"+bunb.getBoolean("SCANNER_CONNECTION_STATE")+" Index:"+bunb.getInt("SCANNER_INDEX"));
                    }
                }
            }
        }
    };

    //"REMAINDER"
                        if (action.equals(enumeratedList)) {
                            Bundle b = intent.getExtras();
                            String[] scanner_list = b.getStringArray(KEY_ENUMERATEDSCANNERLIST);
                    }
            }
    };
-->
<h3 id="comments">Comments</h3>
<p>The scanner and its parameters are set based on the currently active Profile.</p>
<hr />
<p><strong>SEE ALSO</strong>:</p>
<p><a href="https://www.zebra.com/us/en/support-downloads.html">Zebra Support Central</a> | Integrator Guides, Product Manuals, Software Downloads and Support</p>
<p><a href="https://developer.zebra.com/welcome">LaunchPad</a> | Zebra Developer Community</p>
<p><a href="https://developer.android.com/reference/android/content/Intent.html">Intent</a> | Android Developers</p>
<p><a href="http://developer.android.com/guide/components/intents-filters.html">Intents and Intent Filters</a> | Android Developers</p>
<p><a href="http://www.vogella.com/tutorials/AndroidIntent/article.html">Android Intents</a> | Tutorial</p>