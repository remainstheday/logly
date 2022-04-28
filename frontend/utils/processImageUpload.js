export default async function processImage(file) {
  const url = `https://api.cloudinary.com/v1_1/djfxpvrca/image/upload`; // TODO: refactor this to use .env
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  xhr.open("POST", url, true);
  // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      return response.secure_url;
    }
  };

  fd.append("upload_preset", "ekqp8s1g");
  fd.append("file", file[0]);
  xhr.send(fd);
}
