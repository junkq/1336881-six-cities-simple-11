import { createReducer } from '@reduxjs/toolkit';
import { CITY } from '../mocks/city';
import { reviewItems } from '../mocks/reviews';
import { AuthorizationStatus } from '../types/auth';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { User } from '../types/user';
import { changeCityAction,
  handleOffersAction,
  isLoadingAction,
  handleNearOffersAction,
  handleActiveCardAction,
  handleSortPriceDownAction,
  handleSortPriceUpAction,
  handleSortRatingAction,
  handleSortPopularAction,
  handleLoginAction,
  handleUserDataAction,
} from './actions';

type InitialState = {
  offers: Offer[];
  reviews: Review[];
  currentCity: City;
  isLoading: boolean;
  nearOffer: Offer[];
  activeCard: Offer | undefined;
  popularOffers: Offer[];
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

const initialState: InitialState = {
  offers: [],
  reviews: reviewItems,
  currentCity: CITY,
  isLoading: false,
  nearOffer: [],
  activeCard: undefined,
  popularOffers: [],
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: null,
};

export const mainReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(handleOffersAction, (state, action) => {
      state.offers = action.payload.filter((el) => el.city.name === state.currentCity.name);
      state.popularOffers = state.offers;
    })
    .addCase(isLoadingAction, (state) => {
      state.isLoading = !state.isLoading;
    })
    .addCase(handleNearOffersAction, (state, action) => {
      state.nearOffer = action.payload;
    })
    .addCase(handleActiveCardAction, (state, action) => {
      state.activeCard = action.payload;
    })
    .addCase(handleSortPriceUpAction, (state) => {
      state.offers.sort((a, b) => a.price - b.price);
    })
    .addCase(handleSortPriceDownAction, (state) => {
      state.offers.sort((b, a) => a.price - b.price);
    })
    .addCase(handleSortRatingAction, (state) => {
      state.offers.sort((b, a) => a.rating - b.rating);
    })
    .addCase(handleSortPopularAction, (state) => {
      state.offers = state.popularOffers;
    })
    .addCase(handleLoginAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(handleUserDataAction, (state, action) => {
      state.user = action.payload;
    });
});