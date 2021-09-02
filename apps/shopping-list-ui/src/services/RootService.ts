import useAxios, { Options } from 'axios-hooks';
import { AxiosError, AxiosPromise, AxiosResponse, Method } from 'axios';
import { useCallback, useMemo } from 'react';

export interface UseAxiosGetResult<T> {
  data: T;
  error?: AxiosError;
  loading: boolean;
  execute: (params?: any) => AxiosPromise;
  response?: AxiosResponse;
}

export function useAxiosGet<T>(endpoint: string, options?: Options): UseAxiosGetResult<T> {
  const defaultOptions = {
    manual: true,
    useCache: false,
    ...(options ?? {}),
  };
  const [{ data, error, loading, response }, rawExecute] = useAxios(endpoint, defaultOptions);
  const execute = useCallback((params?: any) => rawExecute({ params }), [rawExecute]);
  return {
    data: data as T,
    error,
    loading,
    execute,
    response,
  };
}

export function useAxiosDelete<T>(endpoint: string, options?: Options) {
  const defaultOptions = {
    manual: true,
    useCache: false,
    ...(options ?? {}),
  };
  const [{ error, loading, response }, rawExecute] = useAxios<T>(
    {
      url: endpoint,
      method: 'DELETE',
    },
    defaultOptions,
  );
  const execute = useCallback((params?: any) => rawExecute({ params }), [rawExecute]);
  const sanitizedSingleError = useMemo(() => error?.response?.data?.message ?? null, [error]);
  return {
    success: response?.status === 200,
    error: sanitizedSingleError as string | null,
    loading,
    execute,
    response,
  };
}

export function useAxiosPost<B, T>(endpoint: string, options?: Options) {
  return useMutateData<B, T>('POST', endpoint, options);
}
export function useAxiosPut<B, T>(endpoint: string, options?: Options) {
  return useMutateData<B, T>('PUT', endpoint, options);
}
function useMutateData<B, T>(method: Method, endpoint: string, options?: Options) {
  const defaultOptions = {
    manual: true,
    ...(options ?? {}),
  };
  const [{ data, error, loading, response }, executeRaw] = useAxios(
    {
      url: endpoint,
      method: method,
    },
    defaultOptions,
  );
  const sanitizedSingleError = useMemo(() => error?.response?.data?.message ?? null, [error]);
  const sanitizedErrorList = useMemo(() => {
    const messages = error?.response?.data?.messages;
    if (messages != null) {
      const errorMap = new Map<string, string[]>();
      Object.entries(messages)
        .map((entry) => ({
          field: entry[0],
          message: entry[1] as string[],
        }))
        .forEach((entry) => {
          const currentErrorsForField = errorMap.get(entry.field) ?? [];
          entry.message.forEach((m) => currentErrorsForField.push(m));
          errorMap.set(entry.field, currentErrorsForField);
        });
      return errorMap;
    }
    return null;
  }, [error]);
  const execute = useCallback((payload: B, params?: any) => executeRaw({ data: payload, params }), [executeRaw]);
  return {
    data: data as T,
    error: sanitizedSingleError as string | null,
    errors: sanitizedErrorList,
    loading,
    execute,
    response,
  };
}
