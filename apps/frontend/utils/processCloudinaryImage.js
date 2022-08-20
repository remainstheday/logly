export default function processCloudinaryImage(file) {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );
    fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => resolve(data.secure_url))
      .catch((error) => reject(error));
  });
}
