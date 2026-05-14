const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/v1';

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('worknest_token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

export const authApi = {
  login: (data: any) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
};

export const dashboardApi = {
  getFinances: () => apiRequest('/finances'),
  getEmployees: () => apiRequest('/employees'),
  getProjects: () => apiRequest('/projects'),
  getClients: () => apiRequest('/clients'),
  getAiInsights: () => apiRequest('/ai/insights'),
};

export const clarityApi = {
  getTransactions: (query = {}) => apiRequest('/transactions', { method: 'GET' }),
  getCashSummary: () => apiRequest('/transactions/summary'),
  getTodayActivities: () => apiRequest('/activities/today'),
  getFocusScore: () => apiRequest('/activities/focus-score'),
  getBreakdown: () => apiRequest('/activities/breakdown'),
};
