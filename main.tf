provider "aws" {
  region = "eu-west-2"  # Change this to your preferred region
}

resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "arn:aws:s3:::${var.bucket_name}/*"
      },
    ]
  })
}


output "website_endpoint" {
  value       = aws_s3_bucket.website_bucket.website_endpoint
  description = "The website endpoint URL"
}