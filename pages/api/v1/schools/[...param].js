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
async function findStudent(school_id) {
  for (let i = 0; i < students.length; i++) {
    const search = await students[i].find(s => s.school_id === school_id);
    console.log(search);

    if (search) return search;
  }
}


export default async function handler(req, res) {
  const {
    query: { param },
    method
  } = req;

  switch (param[1]) {
    case 'students':
      console.log('students');
      switch (method) {
        case 'GET':
          var result = await findStudent(param[0]);
          res.status(200).json(result);
          break;
      }
    default:
      console.log('something else');
      break;
  }
}