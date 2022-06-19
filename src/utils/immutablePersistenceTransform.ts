/**
 * Transformer to use seamless-immutable with redux-persist
 * More info: https://github.com/rt2zz/redux-persist/issues/133#issuecomment-299298148
 */
import R from 'ramda';
import Immutable from 'seamless-immutable';

// is this object already Immutable?
const isImmutable = R.has('asMutable');

// change this Immutable object into a JS object
const convertToJs = (state: {
  asMutable: (arg0: { deep: boolean }) => Object;
}) => state.asMutable({ deep: true });

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = R.when(isImmutable, convertToJs);

// convert this JS object into an Immutable object
const toImmutable = (raw: Object) => Immutable(raw);

// the transform interface that redux-persist is expecting
export default {
  out: (state: { asMutable: (arg0: { deep: boolean }) => Object }) => {
    return toImmutable(state);
  },
  in: (raw: { asMutable: (arg0: { deep: boolean }) => Object }) =>
    fromImmutable(raw),
};
