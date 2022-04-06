export default function emailValidator (rule, value, callback) {
  try {
    fetch(`/api/v1/students?email=${value}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (res.status === 200) {
          callback(new Error("Email is not unique!"))
        } else if (res.status === 404) {
          callback()
        }
      })
  } catch (error) {
    callback(error)
  }
}
