// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "adamo-services",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "us-east-1",
    };
  },
  async run() {
    const cloudfront = await import("aws-cdk-lib/aws-cloudfront");

    const bucket = new sst.aws.Bucket("adamo-services-bucket", {
      access: "public",
    });

    const isProd = $app.stage === "production";
    const domainName = isProd
      ? "adamoservices.co"
      : "9997648bd26c4c0f.adamoservices.co";

    new sst.aws.Nextjs("adamo-services-app", {
      link: [bucket],
      customDomain: {
        domainName,
        hostedZone: "adamoservices.co",
      },
      server: {
        environment: {
          NEXT_PUBLIC_CLOUD_ENV: $app.stage === "production" ? "prod" : "dev",
        },
      },
      cdk: {
        distribution: {},
      },
    });
  },
});
