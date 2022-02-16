const schools = [
    {
        "id": 1,
        "name": "Tallinna Pol�tehnikum",
        "address": "P�rnu mnt 57a, 10135 Tallinn"
    },
    {
        "id": 2,
        "name": "Gustav Adolfi G�mnaasium",
        "address": "Suur-Kloostri 16, 10133 Tallinn"
    },
    {
        "id": 3,
        "name": "J�ri G�mnaasium",
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