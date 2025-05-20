
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ApiOptions {
  baseUrl?: string;
  headers?: HeadersInit;
}

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: any;
  showErrors?: boolean;
}

const useApi = (options: ApiOptions = {}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = options.baseUrl || '/api';
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers
  };

  const fetchData = useCallback(async <T,>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T | null> => {
    const {
      method = 'GET',
      headers = {},
      body = null,
      showErrors = true
    } = options;

    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
    
    setLoading(true);
    setError(null);

    try {
      const requestOptions: RequestInit = {
        method,
        headers: { ...defaultHeaders, ...headers },
        credentials: 'include'
      };

      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setLoading(false);
      return data as T;
    } catch (err) {
      setLoading(false);

      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      
      if (showErrors) {
        toast.error(errorMessage);
      }
      
      return null;
    }
  }, [baseUrl, defaultHeaders]);

  return {
    loading,
    error,
    fetchData
  };
};

export default useApi;
