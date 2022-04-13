export default function teacherEmailValidator (rule, value, callback) {
  try {
    fetch(`/api/v1/teachers?email=${value}`, {
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
