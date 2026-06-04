import { apiClient, USE_MOCKS } from '../api/client';

export async function getOrMock<T>(url: string, mock: T): Promise<T> {
  if (USE_MOCKS) return mock;
  try {
    const { data } = await apiClient.get<T>(url);
    return data;
  } catch (error) {
    console.warn(`Falling back to mock data for ${url}`, error);
    return mock;
  }
}
