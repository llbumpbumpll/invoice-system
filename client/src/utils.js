
export const formatBaht = (amount) => {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
    }).format(amount);
};

export const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
        const d = new Date(dateStr);
        return new Intl.DateTimeFormat('th-TH', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(d);
    } catch (e) {
        return dateStr;
    }
};
