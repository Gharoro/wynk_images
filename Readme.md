## Description

This service provides a RESTful API for uploading, processing, and managing images. The API handles image uploads, performs basic processing (such as resizing and format conversion), and stores the processed images in Cloudinary. The metadata of each image is persisted in a PostgreSQL database using TypeORM.

## Installation

```bash
$ git clone https://github.com/Gharoro/wynk_images.git
$ cd wynk_images
$ npm install
$ 
$ rename .env.example to .env and update contents with yours
```

## Running the app

```bash
# development
$ npm run dev

# production
$ npm start
```
