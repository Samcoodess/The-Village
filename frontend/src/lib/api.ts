import { Elder, CallSession, VillageAction, DemoConfig } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} - ${error}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Elder endpoints
  async getElder(elderId: string): Promise<Elder> {
    return this.request<Elder>(`/api/elder/${elderId}`);
  }

  async getElderHistory(elderId: string, limit: number = 10): Promise<CallSession[]> {
    return this.request<CallSession[]>(`/api/elder/${elderId}/history?limit=${limit}`);
  }

  // Call endpoints
  async startCall(elderId: string): Promise<CallSession> {
    return this.request<CallSession>('/api/call/start', {
      method: 'POST',
      body: JSON.stringify({ elder_id: elderId }),
    });
  }

  async endCall(callId: string): Promise<CallSession> {
    return this.request<CallSession>(`/api/call/${callId}/end`, {
      method: 'POST',
    });
  }

  async getCall(callId: string): Promise<CallSession> {
    return this.request<CallSession>(`/api/call/${callId}`);
  }

  async listCalls(elderId?: string, limit: number = 20): Promise<CallSession[]> {
    const params = new URLSearchParams();
    if (elderId) params.append('elder_id', elderId);
    params.append('limit', limit.toString());

    return this.request<CallSession[]>(`/api/calls?${params}`);
  }

  // Village endpoints
  async triggerVillageAction(action: VillageAction): Promise<VillageAction> {
    return this.request<VillageAction>('/api/village/trigger', {
      method: 'POST',
      body: JSON.stringify(action),
    });
  }

  async listVillageActions(callId?: string, status?: string): Promise<VillageAction[]> {
    const params = new URLSearchParams();
    if (callId) params.append('call_id', callId);
    if (status) params.append('status', status);

    return this.request<VillageAction[]>(`/api/village/actions?${params}`);
  }

  // Demo endpoints
  async resetDemo(): Promise<void> {
    return this.request<void>('/api/demo/reset', {
      method: 'POST',
    });
  }

  async simulateConcern(concernType: string, severity: string): Promise<void> {
    return this.request<void>('/api/demo/simulate-concern', {
      method: 'POST',
      body: JSON.stringify({ concern_type: concernType, severity }),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
