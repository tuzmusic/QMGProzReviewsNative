export const createPaymentResponse = {
  intent: "sale",
  payer: {
    payment_method: "paypal"
  },
  transactions: [
    {
      amount: {
        total: "10.00",
        currency: "USD"
      },
      related_resources: []
    }
  ],
  redirect_urls: {
    return_url: "https://prozreviews.com/prozreviews_payment_success",
    cancel_url: "https://prozreviews.com/prozreviews_payment_cancelled"
  },
  id: "PAYID-LVK5JBY3E986231CN238494B",
  state: "created",
  create_time: "2019-08-15T21:54:14Z",
  links: [
    {
      href:
        "https://api.sandbox.paypal.com/v1/payments/payment/PAYID-LVK5JBY3E986231CN238494B",
      rel: "self",
      method: "GET"
    },
    {
      href:
        "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-17V121172D891330P",
      rel: "approval_url",
      method: "REDIRECT"
    },
    {
      href:
        "https://api.sandbox.paypal.com/v1/payments/payment/PAYID-LVK5JBY3E986231CN238494B/execute",
      rel: "execute",
      method: "POST"
    }
  ]
};
