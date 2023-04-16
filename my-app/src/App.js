import React, { useState, useEffect } from 'react'
import { Snack } from 'snack-sdk';
import logo from './logo.svg';
import { WebContainer } from '@webcontainer/api';
import './App.css';

function App() {

  const webPreviewRef = React.useRef(null);

  const [snack] = useState(() => {
    return new Snack({
      dependencies: {
        'react-native': {
          version: '0.71.6'
        }
      },
      files: {
        'App.js': {
          type: 'CODE',
          contents: `
          import * as React from 'react';
          import { View, Text } from 'react-native';
          
          export default () => {
            const [text, setText] = React.useState('')
            return (
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff', width: '100%'}}>
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    Hello Snack!
                  </Text>
                  <Text 
                    style={{ textAlign: 'center', backgroundColor: '#0f0', borderWidth: 1, borderStyle: 'solid', borderColor: '#0f0',height: 20, width: 100 }} 
                    onPress={() => setText((text) => text + '点击')}
                  > 按钮点击</Text>
                  <Text>{text}</Text>
                </View>
            )
          };
          `
        }
      },
      webPreviewRef,
    })
  });
  const { webPreviewURL } = snack.getState();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          See React Native
        </a>
        <iframe 
          ref={(c) => (webPreviewRef.current = c?.contentWindow ?? null)}
          src={webPreviewURL} 
          height={500} 
          width={800}
          allow="geolocation; camera; microphone"
          name={'expo-snack'}
        ></iframe>
      </header>
    </div>
  );
}

export default App;
