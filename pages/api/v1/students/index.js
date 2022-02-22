const students = {
  "artur.kaasik@tptlive.ee": {
    id: 1,
    firstname: "Artur",
    lastname: "Kaasik",
    school_id: 123,
    class_id: 321
  },

  "harri.sink@tptlive.ee": {
    id: 2,
    firstname: "Harri",
    lastname: "Sink",
    class_id: 654,
    school_id: 456
  }
}

export default function studentEmailHandler (req, res) {
  const {
    query: { email },
    method
  } = req

  switch (method) {
    case "GET": {
      const result = students[email]
      res.status(200).json(result)
      break
    }
  }
}
