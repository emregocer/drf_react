# drf_react

## drf_api

A Django REST api that uses jwt tokens to authenticate users.\
Uses djoser for auth endpoints and django-rest-framework-simplejwt for tokens.

## react_client

Client for the Django REST API, uses Redux and Redux-Saga.\
Redux is used for most of the state management except for some ui elements like menus.\
Redux-Saga is used for authentication flow, API calls and for snackbar ui changes.\
API saga is in utils/apiSaga, handles actions that have CALL_API key.\
It is inspired from [this redux middleware](https://github.com/reduxjs/redux/blob/master/examples/real-world/src/middleware/api.js) of redux real-world example.\
apiSaga also refreshes tokens and blocks new token refresh requests while it's refreshing.\
Material-UI is used for interface, formik and yup for the forms and client side validation.
