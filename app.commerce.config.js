const { defineConfig } = require("@adobe/aio-commerce-lib-app/config");

module.exports = defineConfig({
  metadata: {
    description:
      "A custom Adobe Commerce application. Fill description for your app.",
    displayName: "oop-ext",
    id: "oop-ext",
    version: "1.0.0",
  },

  adminUiSdk: {
    registration: {
      menuItems: [
        {
          id: 'order_enrichment_admin::apps',
          title: 'Order Enrichment',
          isSection: true,
          sortOrder: 100,
        },
        {
          id: 'order_enrichment_admin::enriched_orders',
          title: 'Enriched Orders',
          parent: 'order_enrichment_admin::apps',
          sortOrder: 1,
        },
      ],
    },
  },
});
