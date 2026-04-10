import { Link } from "react-router";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2026-04-05",
    status: "delivered",
    total: 159.98,
    items: 3,
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2026-04-06",
    status: "shipped",
    total: 89.99,
    items: 2,
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-003",
    date: "2026-04-07",
    status: "processing",
    total: 199.97,
    items: 4,
    trackingNumber: null,
  },
];

export function OrdersPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-[#10B981]" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-[#F59E0B]" />;
      case "processing":
        return <Clock className="h-5 w-5 text-[#6B7280]" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      delivered: "bg-[#10B981] hover:bg-[#059669]",
      shipped: "bg-[#F59E0B] hover:bg-[#D97706]",
      processing: "bg-[#6B7280] hover:bg-[#4B5563]",
    };
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filterOrders = (status?: string) => {
    if (!status) return mockOrders;
    return mockOrders.filter((order) => order.status === status);
  };

  const OrderCard = ({ order }: { order: typeof mockOrders[0] }) => (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {getStatusIcon(order.status)}
            <h3 className="text-lg" style={{ fontWeight: 600 }}>
              Order {order.id}
            </h3>
          </div>
          <p className="text-sm text-[#6B7280]">
            Placed on {new Date(order.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        {getStatusBadge(order.status)}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-[#6B7280]">Total Amount</p>
          <p className="text-lg" style={{ fontWeight: 600 }}>
            ${order.total.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-[#6B7280]">Items</p>
          <p className="text-lg" style={{ fontWeight: 600 }}>
            {order.items}
          </p>
        </div>
      </div>

      {order.trackingNumber && (
        <div className="mb-4 p-3 bg-[#F9FAFB] rounded-lg">
          <p className="text-xs text-[#6B7280] mb-1">Tracking Number</p>
          <p className="text-sm" style={{ fontWeight: 500 }}>
            {order.trackingNumber}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button asChild className="flex-1 bg-[#111827] hover:bg-[#1F2937]">
          <Link to={`/orders/${order.id}`}>View Details</Link>
        </Button>
        {order.status === "delivered" && (
          <Button variant="outline">Leave Review</Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8" style={{ fontWeight: 600 }}>
        My Orders
      </h1>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {filterOrders("processing").map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="shipped" className="space-y-4">
          {filterOrders("shipped").map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          {filterOrders("delivered").map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
