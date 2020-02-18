export const getAxiosError = error => {
  // server responded with something other than 2xx
  if (error.response) {
    const { data } = error.response;
    if (data) return data;
  } else if (error.request) {
    // request has been made but no answer was received
    return {
      serverError:
        'Could not get any answer from the server. Please try again.',
    };
  } else {
    // something happened with the request
    return {
      clientError:
        'Something bad happened with the request. Please try again.',
    };
  }
  return {};
};
