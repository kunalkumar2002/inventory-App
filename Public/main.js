function deleteProduct(id) {
  const result = confirm("do you really want to delete this - ");

  if (result) {
    fetch("/delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  } else {
    return;
  }
}
