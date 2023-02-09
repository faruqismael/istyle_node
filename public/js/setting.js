function deleteItem(id, url) {
  fetch(url + id, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) window.location.reload();
    })
    .catch((err) => err.message);
}
