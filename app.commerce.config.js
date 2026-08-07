const { defineConfig } = require("@adobe/aio-commerce-lib-app/config");

module.exports = defineConfig({
  metadata: {
    description:
      "A custom Adobe Commerce application. Fill description for your app.",
    displayName: "oop-ext",
    id: "oop-ext",
    version: "1.0.0",
  },
  eventing: {
    commerce: [
      {
        events: [
          {
            description: "Use case description for the event.",
            fields: [{ name: "*" }],
            label: "Sample Event",
            name: "plugin.sample_event",
            runtimeActions: ["my-package/handle-sample-event"],
          },
        ],
        provider: {
          description: "A description for your Commerce Events provider.",
          label: "Commerce Events Provider",
        },
      },
    ],
    external: [
      {
        events: [
          {
            description: "Use case description for the event.",
            label: "Sample Event",
            name: "be-observer.sample_event",
            runtimeActions: ["my-package/handle-sample-event"],
          },
        ],
        provider: {
          description: "A description for your External Events provider.",
          label: "External Events Provider",
        },
      },
    ],
  },
  installation: {
    // customInstallationSteps: [
    //   {
    //     description: "Use case description for the step.",
    //     name: "sample-step",
    //     script: "./path/to/script.js",
    //   },
    // ],
  },
  webhooks: [
    {
      category: "modification",
      description: "A sample Commerce Webhook handler.",
      label: "Sample Webhook",
      runtimeAction: "my-package/handle-webhook",
      webhook: {
        batch_name: "my_app",
        hook_name: "sample_hook",
        method: "POST",
        webhook_method: "plugin.sample.event",
        webhook_type: "after",
      },
    },
    {
      category: "modification",
      description: "A sample Commerce Webhook handler using an explicit URL.",
      label: "Sample Webhook with URL",
      webhook: {
        batch_name: "my_app",
        hook_name: "sample_hook_url",
        method: "POST",
        url: "https://example.com/webhook",
        webhook_method: "plugin.sample.event",
        webhook_type: "after",
      },
    },
  ],
});
