fetch("/api/db/insertData", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});