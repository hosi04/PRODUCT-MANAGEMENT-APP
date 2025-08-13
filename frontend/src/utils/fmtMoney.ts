export const fmtMoneyByCurrency = (
    value: number | string | null | undefined,
    symbol = "₫",
    locale = "vi-VN"
) => {
    const num = Number(value);
    if (isNaN(num)) return `—`;
    return `${num.toLocaleString(locale)} ${symbol}`;
};