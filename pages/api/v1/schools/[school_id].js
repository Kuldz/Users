const students = {
  "artur.kaasik@tptlive.ee": {
    "firstname": "Artur",
    "lastname": "Kaasik",
    "school_id": 123,
    "class_id": 321
  },

  "harri.sink@tptlive.ee": {
    "firstname": "Harri",
    "lastname": "Sink",
    "school_id": 456,
    "class_id": 654
  }
}

export default function studentHandler(req, res) {
  const {
    query: {},
    method,
  } = req;

  switch (method) {
    case "GET":
      students.find(s => s.school_id ===)
  }
}