export function processCloudinaryFile(file: File): Promise<string> | null {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ekqp8s1g");
    fetch("https://api.cloudinary.com/v1_1/djfxpvrca/auto/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => resolve(data.secure_url))
      .catch((error) => reject(error));
  });
}

export function processCloudinaryImage(file: any) {
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
