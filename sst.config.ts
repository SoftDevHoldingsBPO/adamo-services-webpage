// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "adamo-services",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "us-east-2",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("adamo-services-bucket", {
      access: "public",
    });

    const isProd = $app.stage === "production";

    new sst.aws.Nextjs("adamo-services-app", {
      link: [bucket],
      ...(isProd
        ? {
            customDomain: {
              domainName: "adamoservices.co",
              hostedZone: "adamoservices.co",
            },
          }
        : {}),
      environment: {
        NEXT_PUBLIC_CLOUD_ENV: isProd ? "prod" : "dev",
      },
    });
  },
});
