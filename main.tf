provider "aws" {
  region = "eu-west-2"  # Change this to your preferred region
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "website_bucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.website_bucket,
    aws_s3_bucket_public_access_block.website_bucket,
  ]

  bucket = aws_s3_bucket.website_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "website_bucket" {
  depends_on = [
    aws_s3_bucket_acl.website_bucket,
  ]
  bucket = aws_s3_bucket.website_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = [
          aws_s3_bucket.website_bucket.arn,
          "${aws_s3_bucket.website_bucket.arn}/*"
        ]
      }
    ]
  })
}

output "website_endpoint" {
  value       = aws_s3_bucket.website_bucket.website_endpoint
  description = "The website endpoint URL"
}

