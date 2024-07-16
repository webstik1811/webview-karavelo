import WebView from 'react-native-webview';
import React, {useRef} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

export default () => {
  //const link = 'https://quagga2-react-example-hax72clwm.now.sh/';
  //const link = 'https://generic-weblink.web.app/66960b2044f18000121a3f1a';
  const link = 'https://customer.eu.clearquote.io/6696c1c1602fc100120febfc';

  const webviewRef = useRef(null);

  // Define the JavaScript code to inject
  const injectedJavaScript = `
    function handleMessage(event) {
      const jsonObject = JSON.parse(event.data);
      window.ReactNativeWebView.postMessage(JSON.stringify(jsonObject));
      window.removeEventListener('message', handleMessage);
    }
    
    window.addEventListener('message', handleMessage);
    true;
  `;

  const onComplete = message => {
    console.log(message);
  };

  return (
    <WebView
      ref={webviewRef}
      source={{uri: link}}
      mediaPlaybackRequiresUserAction={false}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled={true}
      onMessage={event => {
        // Received message from WebView
        const message = JSON.parse(event.nativeEvent.data);
        onComplete(message);
      }}
      originWhitelist={['*']}
      startInLoadingState={true}
      renderLoading={() => (
        <Spinner visible={true} textContent={'Loading...'} />
      )}
      mediaCapturePermissionGrantType={'grant'}
      allowsInlineMediaPlayback={true}
    />
  );
};
