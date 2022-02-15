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

export default function studentEmailHandler(req, res) {
    const {
      query: { email },
      method,
    } = req


    switch (method) {
        case "GET":
            var result = students[email];
            res.status(200).json({ result })
      break
    }
}