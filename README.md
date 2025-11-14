# cloudX Website

Een moderne, strakke website voor het cloudX project - de opvolger van AWS Cloud9.

## 🚀 Features

- **Responsive Design**: Werkt perfect op desktop, tablet en mobiel
- **Moderne Animaties**: Smooth scroll animations en hover effecten
- **Performance Optimized**: Lightweight, snelle laadtijd
- **SEO Ready**: Semantic HTML en meta tags
- **Toegankelijk**: WCAG 2.1 compliant

## 📁 Project Structuur

```
cloudx-website/
├── index.html          # Hoofdpagina
├── styles.css          # Alle styling en animaties
├── script.js           # Interactieve functionaliteit
└── README.md           # Deze file
```

## 🎨 Design Features

- **Color Scheme**: Modern gradient design met primary (#FF6B35) en secondary (#004E89)
- **Typography**: System fonts voor optimale leesbaarheid
- **Sections**:
  - Hero met architecture diagram
  - Features grid
  - Timeline voor "How it Works"
  - Architecture overzicht
  - Getting Started met code voorbeelden
  - Service Catalog producten
  - CTA en footer

## 🌐 Hosting Opties

### Optie 1: Amazon S3 + CloudFront (Aanbevolen voor AWS)

**Voordelen**: Schaalbaar, snel, HTTPS support, lage kosten

```bash
# Maak een S3 bucket
aws s3 mb s3://cloudx-website --region eu-west-1

# Enable static website hosting
aws s3 website s3://cloudx-website \
  --index-document index.html \
  --error-document index.html

# Upload de bestanden
aws s3 sync . s3://cloudx-website \
  --exclude ".git/*" \
  --exclude "README.md"

# Maak bucket public
aws s3api put-bucket-policy \
  --bucket cloudx-website \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::cloudx-website/*"
    }]
  }'

# Optioneel: CloudFront distributie voor HTTPS en CDN
aws cloudformation deploy \
  --template-file cloudfront-template.yaml \
  --stack-name cloudx-website-cdn \
  --parameter-overrides \
    BucketName=cloudx-website \
    DomainName=cloudx.easytocloud.com
```

### Optie 2: AWS Amplify (Eenvoudigste optie)

```bash
# Installeer Amplify CLI
npm install -g @aws-amplify/cli

# Initialiseer Amplify in de project directory
amplify init

# Add hosting
amplify add hosting

# Kies "Hosting with Amplify Console"
# Deploy
amplify publish
```

### Optie 3: GitHub Pages (Gratis)

1. Push de website naar een GitHub repository
2. Ga naar Settings > Pages
3. Selecteer de main branch
4. De site is beschikbaar op `https://username.github.io/repository-name`

### Optie 4: Vercel (Zeer eenvoudig)

```bash
# Installeer Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Optie 5: Netlify (Drag & Drop)

1. Ga naar [netlify.com](https://netlify.com)
2. Sleep de website folder naar het dashboard
3. Klaar! Site is direct live

## 🔧 CloudFormation Template voor S3 + CloudFront

Maak een `cloudfront-template.yaml`:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: CloudX Website - S3 + CloudFront

Parameters:
  BucketName:
    Type: String
    Description: S3 bucket name for website
  DomainName:
    Type: String
    Description: Custom domain name (optional)
    Default: ''

Conditions:
  HasCustomDomain: !Not [!Equals [!Ref DomainName, '']]

Resources:
  WebsiteBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: index.html
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false

  BucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref WebsiteBucket
      PolicyDocument:
        Statement:
          - Sid: PublicReadGetObject
            Effect: Allow
            Principal: '*'
            Action: s3:GetObject
            Resource: !Sub '${WebsiteBucket.Arn}/*'

  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        DefaultRootObject: index.html
        Origins:
          - DomainName: !GetAtt WebsiteBucket.DomainName
            Id: S3Origin
            CustomOriginConfig:
              HTTPPort: 80
              HTTPSPort: 443
              OriginProtocolPolicy: http-only
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ViewerProtocolPolicy: redirect-to-https
          AllowedMethods:
            - GET
            - HEAD
            - OPTIONS
          CachedMethods:
            - GET
            - HEAD
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
          MinTTL: 0
          DefaultTTL: 86400
          MaxTTL: 31536000
          Compress: true
        CustomErrorResponses:
          - ErrorCode: 404
            ResponseCode: 200
            ResponsePagePath: /index.html
        ViewerCertificate:
          CloudFrontDefaultCertificate: !If [HasCustomDomain, false, true]
        Aliases: !If
          - HasCustomDomain
          - [!Ref DomainName]
          - !Ref AWS::NoValue

Outputs:
  WebsiteURL:
    Value: !GetAtt WebsiteBucket.WebsiteURL
    Description: S3 Website URL
  CloudFrontURL:
    Value: !GetAtt CloudFrontDistribution.DomainName
    Description: CloudFront Distribution URL
  DistributionId:
    Value: !Ref CloudFrontDistribution
    Description: CloudFront Distribution ID
```

## 🔄 Updates Deployen

### S3 Deployment Script

Maak een `deploy.sh` script:

```bash
#!/bin/bash
set -e

BUCKET_NAME="cloudx-website"
DISTRIBUTION_ID="your-cloudfront-distribution-id"

echo "🚀 Deploying cloudX website..."

# Upload files
aws s3 sync . s3://${BUCKET_NAME} \
  --exclude ".git/*" \
  --exclude "*.sh" \
  --exclude "README.md" \
  --exclude "*.yaml" \
  --delete

# Set cache control headers
aws s3 cp s3://${BUCKET_NAME}/index.html s3://${BUCKET_NAME}/index.html \
  --metadata-directive REPLACE \
  --cache-control "max-age=0, no-cache, no-store, must-revalidate" \
  --content-type "text/html"

aws s3 cp s3://${BUCKET_NAME}/styles.css s3://${BUCKET_NAME}/styles.css \
  --metadata-directive REPLACE \
  --cache-control "max-age=31536000, public" \
  --content-type "text/css"

aws s3 cp s3://${BUCKET_NAME}/script.js s3://${BUCKET_NAME}/script.js \
  --metadata-directive REPLACE \
  --cache-control "max-age=31536000, public" \
  --content-type "application/javascript"

# Invalidate CloudFront cache
if [ ! -z "$DISTRIBUTION_ID" ]; then
  echo "🔄 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id ${DISTRIBUTION_ID} \
    --paths "/*"
fi

echo "✅ Deployment complete!"
```

Maak het script executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🎯 Custom Domain Setup

### Met Route 53

```bash
# Maak een hosted zone
aws route53 create-hosted-zone \
  --name cloudx.easytocloud.com \
  --caller-reference $(date +%s)

# Maak DNS records voor CloudFront
aws route53 change-resource-record-sets \
  --hosted-zone-id YOUR_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "cloudx.easytocloud.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z2FDTNDATAQYW2",
          "DNSName": "YOUR_CLOUDFRONT_DOMAIN.cloudfront.net",
          "EvaluateTargetHealth": false
        }
      }
    }]
  }'
```

### SSL Certificate (ACM)

```bash
# Request certificate in us-east-1 (required for CloudFront)
aws acm request-certificate \
  --domain-name cloudx.easytocloud.com \
  --validation-method DNS \
  --region us-east-1

# Follow email/DNS validation instructions
# Add certificate ARN to CloudFront distribution
```

## 🧪 Local Development

Voor local testing, gebruik een simpele HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (met npx)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Open browser naar `http://localhost:8000`

## 📊 Performance Optimizations

De website is al geoptimaliseerd, maar voor extra performance:

1. **Minify CSS/JS** (optioneel):
```bash
# Installeer minifiers
npm install -g csso-cli terser

# Minify CSS
csso styles.css -o styles.min.css

# Minify JS
terser script.js -o script.min.js -c -m

# Update references in index.html
```

2. **Enable Compression**: Wordt automatisch gedaan door CloudFront/S3

3. **Add Images**: Gebruik WebP formaat voor betere compressie

## 🔍 SEO Optimalisatie

Voeg deze meta tags toe aan `<head>` in index.html voor betere SEO:

```html
<!-- Open Graph -->
<meta property="og:title" content="cloudX - Modern Remote Development">
<meta property="og:description" content="De natuurlijke opvolger van AWS Cloud9. Gebruik VSCode lokaal met AWS EC2 voor naadloze remote development.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://cloudx.easytocloud.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="cloudX - Modern Remote Development">
<meta name="twitter:description" content="De natuurlijke opvolger van AWS Cloud9">

<!-- Additional SEO -->
<link rel="canonical" href="https://cloudx.easytocloud.com">
```

## 📝 Aanpassingen

### Kleuren aanpassen
Wijzig CSS variabelen in `styles.css`:
```css
:root {
    --primary: #FF6B35;      /* Hoofdkleur */
    --secondary: #004E89;    /* Secundaire kleur */
    --accent: #1A659E;       /* Accent kleur */
}
```

### Content wijzigen
Alle content staat in `index.html` en kan direct worden aangepast.

### Analytics toevoegen
Voeg Google Analytics of Plausible toe in de `<head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Contributing

Pull requests zijn welkom! Voor grote wijzigingen, open eerst een issue.

## 📄 License

MIT License - Zie [cloudX-proxy repository](https://github.com/easytocloud/cloudX-proxy)

## 🔗 Links

- GitHub: [easytocloud/cloudX-proxy](https://github.com/easytocloud/cloudX-proxy)
- easytocloud: [https://easytocloud.com](https://easytocloud.com)

---

Made with ❤️ by easytocloud
