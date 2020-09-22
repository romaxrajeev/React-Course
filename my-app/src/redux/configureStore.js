import { Redirect } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import  { Leaders } from './leaders';

export const ConfigureStore = () => {
    //Map each state to each simpler reducer
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}