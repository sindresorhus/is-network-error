import {expectType} from 'tsd';
import isNetworkError from './index.js';

expectType<boolean>(isNetworkError(new TypeError('Failed to fetch')));
