import { PrismaClient } from "@prisma/client"

/*
const schools = [
  {
    id: 1,
    name: "Tallinna Polütehnikum",
    address: "Pärnu mnt 57a, 10135 Tallinn",
    student_id: [1, 2],
    class_id: [5, 6]
  },
  {
    id: 2,
    name: "Gustav Adolfi Gümnaasium",
    address: "Suur-Kloostri 16, 10133 Tallinn",
    student_id: [3, 4],
    class_id: [3, 4]
  },
  {
    id: 3,
    name: "Jüri Gumnaasium",
    address: "Laste 3, Rae, 75301 Harju maakond",
    student_id: [5, 6],
    class_id: [1, 2]
  }
] */

export default async function schoolIDHandler (req, res) {
  const {
    method
  } = req

  const prisma = new PrismaClient()

  switch (method) {
    case "DELETE": {
      await prisma.school.delete({
        where: {
          id: parseInt(req.query.id)
        }
      })
      res.status(204)
      break
    }
  }
}
