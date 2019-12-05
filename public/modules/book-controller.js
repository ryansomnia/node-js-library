var Book = require('../../models').Book
var response = require('./response')
const Printer = require('pdfmake')

const path = require('path')
var BookController = function() {

}

BookController.findAll = function(req, res){
    Book.findAll().then(data => {
        if (data){
            return res.json(response.success(data))
          
        }else{
            console.log("koneksi gagal")
        }
    }).catch(error =>{
        return res.json(response.error(500, error.massage))
    });
    
};

BookController.findById = function (req, res) {
    var id = req.params.id
    Book.findOne({ where: { id: id } }).then(entity => {
        if (entity) {
           return res.json(response.success(entity))
        } else {
            throw 'Data not found';
        }
    }).catch(error => {
       return res.json(response.error(500, error.massage))
    })
}


BookController.add = function (req, res) {
    var data = req.body
    console.log(data)
    Book.create(data).then(entity => {
        if (entity) {
            res.json(response.success(entity))
        } else {
            throw 'Create failed';
        }
    }).catch(error => {
        res.json(response.error(500, error.message))
    })
}

BookController.edit = function (req, res) {
    var data = req.body
    Book.findOne({ where: { id: data.id } }).then(entity => {
        if (entity) {
            return entity.update(data)
        } else {
            throw 'Data not found';
        }
    }).then(entity => {
        res.json(response.success(entity))
    }).catch(error => {
        res.json(response.error(500, error.message))
    })
}
BookController.delete = function (req, res) {
    var id = req.params.id
    Book.destroy({ where: { id: id } }).then(affectedRows => {
        if (affectedRows) {
            res.json(response.success(true))
        } else {
            throw 'Delete failed'
        }
    }).catch(error => {
        res.json(response.error(500, error.message))
    })
}

BookController.download = function(req, res){
    Book.findAll().then(entitas=>{

var baris = entitas.map((values)=> ([values.id, values.title, values.publisher, values.price, values.stock]))
var data = [
    
        [
            'id', 'Book Title', 'Publisher', 'Price','Stock'
        ], ...baris
    
]

        var pdfMake = new Printer({
            Roboto: {
                normal: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Regular.ttf'),
                italics: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Italic.ttf'),
                bold: path.resolve('assets', 'fonts', 'roboto', 'Roboto-Bold.ttf'),
            }
        })
        var doc = pdfMake.createPdfKitDocument({
            info: {
                title: 'PDF with External Image',
                author: 'Heriyanto Sitorus',
                subject: 'PDF with External Image',
            },
            content: [
                {
                    text: 'Data Table Book\n\n',
                    style: 'header',
                    alignment: 'center'
                },
             
                {

                    style: 'tableExample',
                    alignment: 'center',
                    
                    table: {
                        
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
                        body:  data         
                    }
                },
        
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                bigger: {
                    fontSize: 15,
                    italics: true
                }
            }
        })
        
        doc.end()
        
        
        res.setHeader('Content-type', 'application/pdf')
        res.setHeader('Content-disposition', 'inline; filename="Data.pdf"')
        
        doc.pipe(res)

    })

}
module.exports = BookController