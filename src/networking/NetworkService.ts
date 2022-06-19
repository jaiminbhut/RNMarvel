import { loadingViewRef } from '@/components/LoadingView/LoadingView';
import { strings } from '@/localization';
import { headers, parentUrl } from '@/networking/config';
import { isNull } from '@/utils/helper';
import apisauce from 'apisauce';
import { call, put } from 'redux-saga/effects';

export const apiConfig = () =>
  apisauce.create({
    baseURL: parentUrl,
    timeout: 10000,
    headers,
  });

export function* apiCall(
  api: any,
  payload: any,
  onSuccess: { (data: Object): any },
  onFailure: { (error: string): any },
): any {
  const response = yield call(api, payload);

  yield* handleResponse(
    response,
    (data: any): any => onSuccess(data),
    onFailure,
  );
}

export function* handleResponse(
  response: {
    status: number;
    problem: string;
    data: { message: string; error_description: string; error: string };
  },
  onSuccess: { (data: Object): any },
  onFailure: { (error: string): any },
): any {
  loadingViewRef.current?.hide();

  if (response?.status >= 200 && response?.status < 300) {
    yield put(onSuccess(response.data));
  } else {
    const error = yield call(getError, response);

    yield put(onFailure(error));
  }
}

export function* handleErrorResponse(
  response: {
    problem: string;
    data: { message: string; error_description: string; error: string };
  },
  failureAction: (error: string) => any,
): any {
  loadingViewRef.current?.hide();

  const error = yield call(getError, response);

  yield put(failureAction(error));
}

export function getError(response: {
  problem: string;
  data: { message: string; error_description: string; error: string };
}): any {
  if (response?.problem === 'CLIENT_ERROR') {
    return handleClientError(response);
  }

  if (response?.problem === 'NETWORK_ERROR') {
    return getErrorMessage(response, strings.serverError);
  }

  if (['CONNECTION_ERROR', 'SERVER_ERROR'].includes(response?.problem)) {
    return getErrorMessage(response, strings.serverError);
  }

  return strings.somethingWentWrong;
}

export const handleClientError = (response: any): string => {
  return getErrorMessage(response, strings.somethingWentWrong);
};

export const getErrorMessage = (
  response: {
    data: { message: string; error_description: string; error: string };
  },
  defaultError: string,
): string => {
  let errorMessage: string;

  if (!isNull(response.data?.message)) {
    errorMessage = response.data?.message;
  } else if (!isNull(response.data?.error_description)) {
    errorMessage = response.data?.error_description;
  } else if (!isNull(response.data?.error)) {
    errorMessage = response.data?.error;
  } else {
    errorMessage = defaultError;
  }

  return errorMessage;
};
