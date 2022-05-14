export default async function processImage(file) {
  const url = "https://api.cloudinary.com/v1_1/djfxpvrca/image/upload";
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("upload_preset", "ekqp8s1g");

  return fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      return data.url;
    });
}
