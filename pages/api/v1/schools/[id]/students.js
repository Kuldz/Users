import { PrismaClient } from "@prisma/client"

/*
const studentArray = [
  {
    email: "artur.kaasik@tptlive.ee",
    firstname: "Artur",
    lastname: "Kaasik",
    school_id: 123,
    class_id: 321
  },

  {
    email: "harri.sink@tptlive.ee",
    firstname: "Harri",
    lastname: "Sink",
    school_id: 456,
    class_id: 654
  },
  {
    email: "martin.kangsepp@tptlive.ee",
    firstname: "Martin",
    lastname: "Kangsepp",
    school_id: 456,
    class_id: 654
  }
] */

export default async function handler (req, res) {
  const {
    query: { id },
    method
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "GET": {
      // Filter studentArray by school ID
      // const students = studentArray.filter(s => s.school_id.toString() === id)
      const students = await prisma.student.findUnique({
        where: {
          id: parseInt(id)
        }
      })
      // Return OK status and students array
      res.status(200).json({ students })
      break
    }

    case "DELETE": {
      await res.status(202)
      await prisma.student.delete({
        where: {
          id: id
        }
      })
      break
    }

    default:
      res.status(405)
      break
  }
}
