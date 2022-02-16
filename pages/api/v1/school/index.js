const schools = [
    {
        "id": 1,
        "name": "Tallinna Polütehnikum",
        "address": "Pärnu mnt 57a, 10135 Tallinn"
    },
    {
        "id": 2,
        "name": "Gustav Adolfi Gümnaasium",
        "address": "Suur-Kloostri 16, 10133 Tallinn"
    },
    {
        "id": 3,
        "name": "Jüri Gümnaasium",
        "address": "Laste 3, Rae, 75301 Harju maakond"
    }
]

export default function schoolIDHandler(req, res) {
    const {
        query: method
    } = req

    switch (method) {
        case "GET":
            var result = schools; // or schools[schools], I haven't gotten to check
            res.status(200).json(result);
        break;
    }
}