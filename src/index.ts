/**
 * NOTE(keanulee): Ideally we would just `import '@babel/polyfill'` and rely
 * on babel-preset-env's useBuiltIns
 * (https://babeljs.io/docs/en/babel-preset-env#usebuiltins) to detect language
 * features, but webcomponents-sd-ce-pf.js already imports some language
 * features, such as Symbol, which conflicts with '@babel/polyfill'. So
 * instead, we just import the features we know we need.
 */
import 'regenerator-runtime/runtime';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import './components/root/root.component';
