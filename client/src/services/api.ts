export interface HealthResponse {
  status: string;
  service: string;
  environment: string;
  uptime: number;
  timestamp: string;
}

export interface DbHealthResponse {
  status: string;
  database: {
    connected: boolean;
    driver: string;
    message: string;
  };
  timestamp: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchHealth(): Promise<HealthResponse> {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/health` : `${API_BASE_URL}/api/health`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API health check failed with status: ${response.status} (${response.statusText})`);
  }

  return response.json();
}

export async function fetchDbHealth(): Promise<DbHealthResponse> {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/health/db` : `${API_BASE_URL}/api/health/db`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Database health check failed with status: ${response.status}`);
  }

  return response.json();
}
