// src/services/orderService.ts
import axios from 'axios';
import { Order, Request } from './../app/types/order';

const API_BASE_URL = 'https://fred-server.onrender.com/api';

export const fetchOrders = async (token: string): Promise<(Order | Request)[]> => {
  try {
    // Fetch both order types concurrently
    const [serviceOrdersResponse, requestOrdersResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/service/list/`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${API_BASE_URL}/requests/`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    // Combine the orders from both APIs
    return [...serviceOrdersResponse.data, ...requestOrdersResponse.data];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/auth/signin/';
    }
    throw error;
  }
};

export const takeOrder = async (orderId: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/service/take-order/`,
      { order_id: orderId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleDelete = async (id: number, type: 'order' | 'request', token: string) => {
  try {
    const endpoint = type === 'order' 
      ? `${API_BASE_URL}/service/${id}/`
      : `${API_BASE_URL}/requests/${id}/`;

    await axios.delete(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

// Type guard utility
export const isRequest = (item: Order | Request): item is Request => {
  return 'request_type' in item;
};