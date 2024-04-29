terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_instance" "app_server" {
  ami           = "ami-0caef02b518350c8b"
  instance_type = "t2.micro"

  user_data = <<-EOF
              #!/bin/bash
              yum install -y docker
              yum install docker-compose-plugin
              systemctl enable docker
              systemctl start docker
              sudo chown $USER /var/run/docker.sock
              docker run -p 80:80 -d nginx
              EOF

  tags = {
    Name = "AppServerInstance"
  }
}

output "public_ip" {
  value = aws_instance.app_server.public_ip
}
