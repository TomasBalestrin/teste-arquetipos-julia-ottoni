export interface HotmartWebhookPayload {
  hottok: string;
  event: string;
  data: {
    buyer: {
      email: string;
      name?: string;
    };
    purchase: {
      transaction: string;
      status: string;
      price: {
        value: number;
      };
    };
    product: {
      id: number;
    };
  };
}

export type HotmartEvent =
  | "PURCHASE_APPROVED"
  | "PURCHASE_COMPLETE"
  | "PURCHASE_REFUNDED"
  | "PURCHASE_CANCELED";
