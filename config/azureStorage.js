const { BlobServiceClient } = require("@azure/storage-blob");

try {
    // Azure Storage configuration
    const account = process.env.STORAGE_ACCOUNT;
    const sas = process.env.SAS_TOKEN;
    const containerName = process.env.CONTAINER_NAME;
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sas}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    module.exports = { containerClient };
} catch (error) {
    console.error("Error configuring Azure Storage:", error.message);
    process.exit(1);
}
