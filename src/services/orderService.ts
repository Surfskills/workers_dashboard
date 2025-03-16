// src/services/orderService.ts
import axios from 'axios';
import { Order, Request } from './../app/types/order';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchOrders = async (token: string): Promise<Order[]> => {
  try {
    // Add filtering to exclude offers with 'accepted' and 'completed' statuses
    const serviceOrdersResponse = await axios.get(
      `${API_BASE_URL}/workers/available-offers/`,
      {
        headers: { Authorization: `Bearer ${token}` },
        // Add params to filter out both 'accepted' and 'completed' offers
        params: {
          exclude_statuses: ['accepted', 'completed']
        }
      }
    );

    return serviceOrdersResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/auth/signin/';
    }
    throw error;
  }
};

export const completeOrder = async (
  offerId: number,
  offerType: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/workers/accepted-offers/${offerId}/complete/`,
      {
        offer_id: offerId,
        offer_type: offerType,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const uploadFiles = async (
  files: File[],
  token: string,
  uploadType: string,
  objectId: string | number
) => {
  try {
    const formData = new FormData();
    // Append additional required fields
    formData.append("upload_type", uploadType);
    formData.append("object_id", objectId.toString());
    // Append each file
    files.forEach((file) => formData.append("files", file));

    const response = await axios.post(
      `${API_BASE_URL}/workers/upload-files/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Let the browser set the correct Content-Type boundary automatically
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

// Function to fetch accepted orders (new function)
export const fetchAcceptedOrders = async (token: string): Promise<Order[]> => {
  try {
    const acceptedOrdersResponse = await axios.get(`${API_BASE_URL}/workers/accepted-offers/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(acceptedOrdersResponse.data); 
    return acceptedOrdersResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/auth/signin/';
    }
    throw error;
  }
};

export const takeOrder = async (offerId: number, offerType: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/workers/accept-offer/`,
      { 
        offer_id: offerId,
        offer_type: offerType  // Add this parameter
      },
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



// Function to return an order
export const returnOrder = async (offerId: number, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/workers/accepted-offers/${offerId}/return_offer/`,
      { offer_id: offerId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Return the response data
  } catch (error) {
    // Log the error for debugging purposes
    throw error; // Rethrow the error for handling in your component
  }
};


// Type guard utility
export const isRequest = (item: Order | Request): item is Request => {
  return 'request_type' in item;
};


