import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const websiteBucket = new cdk.aws_s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
    });
    const originAccessIdentity = new cdk.aws_cloudfront.OriginAccessIdentity(this, 'OAI');
    websiteBucket.addToResourcePolicy(new cdk.aws_iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [websiteBucket.arnForObjects('*')],
      principals: [originAccessIdentity.grantPrincipal],
    }));
const s3Origin = origins.S3BucketOrigin.withOriginAccessIdentity(websiteBucket, {
  originAccessIdentity
})
    const cloudFrontDist = new cdk.aws_cloudfront.Distribution(this, 'WebsiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: s3Origin,
        compress: true,
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
    new cdk.aws_s3_deployment.BucketDeployment(this, 'DeployWebsite', {
      sources: [cdk.aws_s3_deployment.Source.asset('dist')],
      destinationBucket: websiteBucket,
      distribution: cloudFrontDist,
      distributionPaths: ['/*'],
    });
    new cdk.CfnOutput(this, 'WebsiteBucketName', {
      value: websiteBucket.bucketName,
    });
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${cloudFrontDist.domainName}`,
    });
  }
}