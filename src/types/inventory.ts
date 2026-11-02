export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  generic_name?: string;
  brand?: string;
  category_id?: string;
  category?: ProductCategory;
  description?: string;
  sku: string;
  barcode?: string;
  manufacturer?: string;
  dosage_form: string;
  strength?: string;
  unit_of_measurement: string;
  cost_price: number;
  selling_price: number;
  reorder_level: number;
  requires_prescription: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  batches?: MedicineBatch[];
  total_stock?: number;
}

export interface MedicineBatch {
  id: string;
  product_id: string;
  batch_number: string;
  manufacturing_date?: string;
  expiry_date: string;
  purchase_price: number;
  selling_price: number;
  initial_quantity: number;
  current_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  payment_terms?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_id?: string;
  supplier?: Supplier;
  status: "Draft" | "Ordered" | "Partially Received" | "Received" | "Cancelled";
  total_amount: number;
  invoice_number?: string;
  notes?: string;
  ordered_by?: string;
  received_by?: string;
  ordered_at?: string;
  received_at?: string;
  created_at: string;
  updated_at: string;
  items?: PurchaseItem[];
}

export interface PurchaseItem {
  id: string;
  purchase_order_id: string;
  product_id: string;
  product?: Product;
  quantity_ordered: number;
  quantity_received: number;
  unit_cost: number;
  total_cost: number;
  batch_number?: string;
  expiry_date?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  full_name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Sale {
  id: string;
  receipt_number: string;
  customer_id?: string;
  customer?: Customer;
  customer_name?: string;
  subtotal: number;
  discount_amount: number;
  total_amount: number;
  payment_method: "Cash" | "POS / Card" | "Bank Transfer" | "Split" | "Credit";
  payment_status: "Paid" | "Pending" | "Refunded";
  prescribed_by?: string;
  staff_id?: string;
  notes?: string;
  created_at: string;
  items?: SaleItem[];
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  product?: Product;
  batch_id?: string;
  batch?: MedicineBatch;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  product?: Product;
  batch_id?: string;
  batch?: MedicineBatch;
  movement_type: "Purchase" | "Sale" | "Adjustment" | "Return" | "Expired" | "Damaged" | "Transfer";
  quantity: number;
  previous_quantity: number;
  new_quantity: number;
  reason?: string;
  reference_id?: string;
  staff_id?: string;
  created_at: string;
}

export interface StockAdjustment {
  id: string;
  product_id: string;
  product?: Product;
  batch_id?: string;
  batch?: MedicineBatch;
  adjustment_type: "Increase" | "Decrease" | "Damaged" | "Expired" | "Audit Discrepancy";
  quantity: number;
  reason: string;
  staff_id?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  staff_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, any>;
  created_at: string;
}

