export default function OrderStatusBadge({ status }: { status: string }) {
    const isDelivered = status.toLowerCase() === 'delivered';
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${isDelivered ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-700'
            }`}>
            {status}
        </span>
    );
};