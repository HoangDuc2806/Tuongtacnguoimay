import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, Lock, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { useStore } from "../store/useStore";
import { toast } from "sonner";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    clearCart();
    toast.success("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8" style={{ fontWeight: 600 }}>
        Checkout
      </h1>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
          {[
            { id: "shipping", label: "Shipping" },
            { id: "payment", label: "Payment" },
            { id: "review", label: "Review" },
          ].map((s, index) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === s.id
                      ? "bg-[#F59E0B] text-white"
                      : index < ["shipping", "payment", "review"].indexOf(step)
                      ? "bg-[#10B981] text-white"
                      : "bg-[#E5E7EB] text-[#6B7280]"
                  }`}
                >
                  {index < ["shipping", "payment", "review"].indexOf(step) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="text-sm" style={{ fontWeight: 500 }}>
                  {s.label}
                </span>
              </div>
              {index < 2 && (
                <div className="flex-1 h-0.5 bg-[#E5E7EB] mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-xl mb-6" style={{ fontWeight: 600 }}>
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="NY" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>

                <Button
                  className="w-full bg-[#111827] hover:bg-[#1F2937]"
                  onClick={() => setStep("payment")}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-xl mb-6" style={{ fontWeight: 600 }}>
                Payment Method
              </h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                <div className="flex items-center space-x-2 p-4 border border-[#E5E7EB] rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                  <CreditCard className="h-5 w-5 text-[#6B7280]" />
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-6 p-4 bg-[#F9FAFB] rounded-lg">
                <Lock className="h-5 w-5 text-[#10B981]" />
                <p className="text-sm text-[#6B7280]">
                  Your payment information is secure and encrypted
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("shipping")}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-[#111827] hover:bg-[#1F2937]"
                  onClick={() => setStep("review")}
                >
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-xl mb-6" style={{ fontWeight: 600 }}>
                Review Your Order
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm mb-1" style={{ fontWeight: 500 }}>
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#6B7280]">Qty: {item.quantity}</p>
                      {item.selectedSize && (
                        <p className="text-xs text-[#6B7280]">Size: {item.selectedSize}</p>
                      )}
                    </div>
                    <span className="text-sm" style={{ fontWeight: 500 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("payment")}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 bg-[#10B981] hover:bg-[#059669]"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-6 sticky top-24">
            <h2 className="text-lg mb-6" style={{ fontWeight: 600 }}>
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#6B7280] truncate mr-2">
                    {item.name} x{item.quantity}
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Subtotal</span>
                <span style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Shipping</span>
                <span style={{ fontWeight: 500 }}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Tax</span>
                <span style={{ fontWeight: 500 }}>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span style={{ fontWeight: 600 }}>Total</span>
                <span className="text-xl" style={{ fontWeight: 600 }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
