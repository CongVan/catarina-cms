export default ({ env }) => ({
  "import-export-entries": {
    enabled: true,
  },
  "request-id": {
    enabled: true,
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  ckeditor: {
    enabled: true,
    config: {
      plugin: {
        // strapiTheme: false,
      },
      editor: {
        toolbar: {
          shouldNotGroupWhenFull: true,
        },
      },
    },
  },
  upload: {
    config: {
      provider: "strapi-provider-upload-minio-ce",
      providerOptions: {
        accessKey: env("MINIO_ACCESS_KEY"),
        secretKey: env("MINIO_SECRET_KEY"),
        bucket: env("MINIO_BUCKET"),
        endPoint: env("MINIO_ENDPOINT"),
        port: env("MINIO_PORT"),
        useSSL: env("MINIO_USE_SSL"),
        host: env("MINIO_HOST"),
        folder: env("MINIO_FOLDER"),
      },
    },
  },
});
