// src/services/orderService.ts
import axios from 'axios';
import { Order, Request } from './../app/types/order';

const API_BASE_URL = 'https://fred-server.onrender.com/api';

export const fetchOrders = async (token: string): Promise<Order[]> => {
  try {
    const serviceOrdersResponse = await axios.get(`${API_BASE_URL}/workers/available-offers/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return serviceOrdersResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/auth/signin/';
    }
    throw error;
  }
};

// Function to fetch accepted orders (new function)
export const fetchAcceptedOrders = async (token: string): Promise<Order[]> => {
  try {
    const acceptedOrdersResponse = await axios.get(`${API_BASE_URL}/workers/accepted-offers/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return acceptedOrdersResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/auth/signin/';
    }
    throw error;
  }
};

export const takeOrder = async (offerId: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/workers/accept-offer/`,
      { offer_id: offerId }, // Update order_id to offer_id
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const handleDelete = async (id: number, type: 'order' | 'request', token: string) => {
  try {
    const endpoint =
      type === 'order'
        ? `${API_BASE_URL}/service/${id}/`
        : `${API_BASE_URL}/requests/${id}/`;

    await axios.delete(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};

// New functions to add

// Function to complete an order
export const completeOrder = async (orderId: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/service/complete-order/`,
      { order_id: orderId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to return an order
export const returnOrder = async (offerId: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/service/return-offer/`,
      { offer_id: offerId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Type guard utility
export const isRequest = (item: Order | Request): item is Request => {
  return 'request_type' in item;
};


