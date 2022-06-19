/* eslint-disable no-restricted-syntax */
import { goBack, navigate, resetRoot } from '@/navigation/NavigationRef';
import { NativeModules } from 'react-native';
import { ArgType } from 'reactotron-core-client';
import Reactotron, { ReactotronReactNative } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

let scriptHostname: string = '';

if (__DEV__) {
  const scriptURL = NativeModules.SourceCode.scriptURL;

  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

type ReactotronProps = ReactotronReactNative;

const reactotron: ReactotronProps = Reactotron.configure({
  name: 'RNMarvel',
  host: scriptHostname,
})
  .useReactNative({
    asyncStorage: true,
    editor: true,
    errors: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    overlay: true,
  })
  .use(sagaPlugin({}))
  .use(reactotronRedux())
  .connect();

Reactotron.onCustomCommand({
  title: 'Reset Root Store',
  description: 'Resets the MST store',
  command: 'resetStore',
  handler: () => {
    // @ts-ignore
    console.tron.log('resetting store');
  },
});

Reactotron.onCustomCommand({
  title: 'Reset Navigation State',
  description: 'Resets the navigation state',
  command: 'resetNavigation',
  handler: () => {
    // @ts-ignore
    console.tron.log('resetting navigation state');
    resetRoot({ index: 0, routes: [] });
  },
});

Reactotron.onCustomCommand({
  command: 'navigateTo',
  handler: (args: any) => {
    const { route } = args;

    if (route) {
      console.log(`Navigating to: ${route}`);
      navigate(route);
    } else {
      console.log('Could not navigate. No route provided.');
    }
  },
  title: 'Navigate To Screen',
  description: 'Navigates to a screen by name.',
  args: [
    {
      name: 'route',
      type: ArgType.String,
    },
  ],
});

Reactotron.onCustomCommand({
  title: 'Reset Navigation State',
  description: 'Resets the navigation state',
  command: 'resetNavigation',
  handler: () => {
    // @ts-ignore
    console.tron.log('resetting navigation state');
    resetRoot({ index: 0, routes: [] });
  },
});

Reactotron.onCustomCommand({
  title: 'Go Back',
  description: 'Goes back',
  command: 'goBack',
  handler: () => {
    // @ts-ignore
    console.tron.log('Going back');
    goBack();
  },
});

// @ts-ignore
console.tron = Reactotron;

export default reactotron;
