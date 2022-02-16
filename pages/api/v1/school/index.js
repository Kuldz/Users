const schools = [
    {
        "id": 1,
        "name": "Tallinna Polutehnikum",
        "address": "Parnu mnt 57a, 10135 Tallinn"
    },
    {
        "id": 2,
        "name": "Gustav Adolfi Gumnaasium",
        "address": "Suur-Kloostri 16, 10133 Tallinn"
    },
    {
        "id": 3,
        "name": "Juri Gumnaasium",
        "address": "Laste 3, Rae, 75301 Harju maakond"
    }
]

export default function schoolIDHandler(req, res) {
    const method = req.method;

    switch (method) {
        case "GET":
            var result = schools; // or schools[schools], I haven't gotten to check
            res.status(200).json(result);
        break;
    }
}
