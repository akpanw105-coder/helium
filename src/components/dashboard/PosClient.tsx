"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Banknote,
  Building,
  Printer,
} from "lucide-react";
import { processSaleAction, CheckoutInput } from "@/actions/sale-actions";

interface ProductWithStock {
  id: string;
  name: string;
  generic_name?: string;
  sku: string;
  barcode?: string;
  selling_price: number;
  dosage_form: string;
  requires_prescription: boolean;
  total_stock: number;
}

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  maxAvailable: number;
}

export function PosClient({ products }: { products: ProductWithStock[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [prescribedBy, setPrescribedBy] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "POS / Card" | "Bank Transfer">("Cash");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [completedSale, setCompletedSale] = useState<{ receiptNumber: string; total: number } | null>(null);

  // Filter products by name, molecule, SKU or barcode
  const filteredProducts = products.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.generic_name && p.generic_name.toLowerCase().includes(q)) ||
      p.sku.toLowerCase().includes(q) ||
      (p.barcode && p.barcode.includes(q))
    );
  });

  const addToCart = (product: ProductWithStock) => {
    if (product.total_stock <= 0) {
      alert("This item has zero unexpired stock on hand.");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        if (existing.quantity >= product.total_stock) {
          alert(`Cannot add more than available unexpired stock (${product.total_stock}).`);
          return prev;
        }
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            productName: product.name,
            quantity: 1,
            unitPrice: product.selling_price,
            maxAvailable: product.total_stock,
          },
        ];
      }
    });
  };

  const updateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId) {
          if (newQty > item.maxAvailable) {
            alert(`Only ${item.maxAvailable} units available.`);
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    setErrorMsg(null);

    const payload: CheckoutInput = {
      items: cart.map((c) => ({
        productId: c.productId,
        productName: c.productName,
        quantity: c.quantity,
        unitPrice: c.unitPrice,
      })),
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
      paymentMethod,
      discountAmount,
      prescribedBy: prescribedBy || undefined,
      notes: notes || undefined,
    };

    try {
      const res = await processSaleAction(payload);
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setCompletedSale({
          receiptNumber: res.receiptNumber || "HEL-REC",
          total,
        });
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
        setPrescribedBy("");
        setDiscountAmount(0);
        setNotes("");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "An unexpected error occurred during sale processing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Catalog & Search Column (2 Cols) */}
      <div className="lg:col-span-2 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#a8b8d0] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search medicines by brand name, generic name, SKU or barcode..."
            className="w-full bg-[#0a1628] border border-[#152a52] text-xs text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#00c8e0] shadow-sm placeholder:text-[#a8b8d0]/60"
          />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
          {filteredProducts.map((p) => {
            const hasStock = p.total_stock > 0;
            return (
              <div
                key={p.id}
                onClick={() => hasStock && addToCart(p)}
                className={`bg-[#0a1628]/90 border rounded-xl p-4 transition-all flex flex-col justify-between ${
                  hasStock
                    ? "border-[#152a52] hover:border-[#00c8e0]/60 cursor-pointer hover:shadow-lg hover:shadow-[#00c8e0]/5"
                    : "border-zinc-800/60 opacity-60 cursor-not-allowed"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white leading-snug">{p.name}</h4>
                    {p.requires_prescription && (
                      <span className="text-[9px] font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-400/20 shrink-0">
                        Rx
                      </span>
                    )}
                  </div>
                  {p.generic_name && (
                    <div className="text-[11px] text-[#a8b8d0] italic mt-0.5 line-clamp-1">
                      {p.generic_name}
                    </div>
                  )}
                  <div className="text-[10px] text-[#a8b8d0] mt-1 font-mono">
                    SKU: {p.sku} • {p.dosage_form}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#152a52]/60 flex items-center justify-between">
                  <div className="text-xs font-extrabold text-[#00c8e0]">
                    ₦{Number(p.selling_price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px]">
                    {hasStock ? (
                      <span className="text-emerald-400 font-semibold">{p.total_stock} in stock</span>
                    ) : (
                      <span className="text-red-400 font-semibold">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart & Checkout Column (1 Col) */}
      <div className="bg-[#0a1628] border border-[#00c8e0]/20 rounded-2xl p-5 flex flex-col justify-between h-[calc(100vh-140px)] sticky top-20 shadow-xl">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#152a52]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#00c8e0]" />
              <h3 className="text-sm font-bold text-white">Dispensing Cart</h3>
            </div>
            <span className="text-xs text-[#00c8e0] font-mono bg-[#00c8e0]/10 px-2 py-0.5 rounded-full">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>

          {/* Cart Items List */}
          <div className="mt-3 space-y-2.5 overflow-y-auto max-h-[220px] pr-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-[#050d1a] border border-[#152a52] rounded-xl p-2.5 flex items-center justify-between text-xs"
                >
                  <div className="flex-1 pr-2">
                    <div className="font-semibold text-white truncate">{item.productName}</div>
                    <div className="text-[10px] text-[#a8b8d0]">
                      ₦{item.unitPrice.toLocaleString()} each
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 rounded bg-[#0f2040] hover:bg-[#152a52] text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-white min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 rounded bg-[#0f2040] hover:bg-[#152a52] text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-1 rounded text-red-400 hover:bg-red-500/10 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-[#a8b8d0]">
                Cart is empty. Select products from the left to begin sale.
              </div>
            )}
          </div>

          {/* Customer & Prescription Details */}
          <div className="mt-4 pt-3 border-t border-[#152a52] space-y-2">
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer Name (Optional)"
              className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-lg px-3 py-1.5 focus:border-[#00c8e0] focus:outline-none"
            />
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Phone (for receipt SMS / WhatsApp)"
              className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-lg px-3 py-1.5 focus:border-[#00c8e0] focus:outline-none"
            />
            <input
              type="text"
              value={prescribedBy}
              onChange={(e) => setPrescribedBy(e.target.value)}
              placeholder="Prescribing Physician / Clinic"
              className="w-full bg-[#050d1a] border border-[#152a52] text-xs text-white rounded-lg px-3 py-1.5 focus:border-[#00c8e0] focus:outline-none"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="mt-3">
            <div className="text-[11px] font-semibold text-[#a8b8d0] mb-1.5">Payment Method</div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "Cash", icon: Banknote, label: "Cash" },
                { id: "POS / Card", icon: CreditCard, label: "POS Card" },
                { id: "Bank Transfer", icon: Building, label: "Transfer" },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 border transition-all ${
                      isSelected
                        ? "bg-[#00c8e0]/20 border-[#00c8e0] text-[#00c8e0]"
                        : "bg-[#050d1a] border-[#152a52] text-[#a8b8d0] hover:text-white"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Totals & Checkout Button */}
        <div className="pt-3 border-t border-[#152a52] space-y-2.5">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] p-2 rounded-lg flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {completedSale && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-xl space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>Sale Completed Successfully!</span>
              </div>
              <div className="text-[11px] text-[#a8b8d0]">
                Receipt: <span className="font-mono text-white">{completedSale.receiptNumber}</span>
              </div>
              <div className="text-[11px] text-[#a8b8d0]">
                Total Paid: ₦{completedSale.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-[#a8b8d0]">
              <span>Subtotal:</span>
              <span>₦{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-white pt-1 border-t border-[#152a52]">
              <span>Total Payable:</span>
              <span className="text-[#00c8e0]">
                ₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={cart.length === 0 || loading}
            onClick={handleCheckout}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1a6cf6] to-[#00c8e0] text-white font-bold text-xs shadow-lg shadow-[#00c8e0]/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Processing FEFO Stock Deduction..." : `Complete Sale (₦${total.toLocaleString()})`}
          </button>
        </div>
      </div>
    </div>
  );
}

